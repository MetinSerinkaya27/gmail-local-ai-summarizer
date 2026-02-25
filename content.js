console.log("🕵️‍♂️ Yerel AI Ajanı tetikte, e-posta açılmasını bekliyor...");

function injectButton() {
    // 1. Eğer butonumuz zaten sayfadaysa, tekrar eklememek için işlemi durdur
    if (document.querySelector('#ai-ozetle-btn')) return;

    // 2. Gmail'in üst araç çubuğunu (Yanıtla, Yönlendir vb.) bul
    const toolbar = document.querySelector('.iH > div');

    if (toolbar) {
        console.log("🎯 E-posta ekranı tespit edildi! Buton yerleştiriliyor...");

        // 3. Butonumuzu oluşturuyoruz
        const btn = document.createElement('div');
        btn.id = 'ai-ozetle-btn';
        btn.innerHTML = '✨ AI Özetle';
        
        // 4. Butonun CSS (Görünüm) Ayarları
        btn.style.cssText = `
            display: inline-block;
            background-color: #fbbc04;
            color: #1f1f1f;
            font-weight: bold;
            padding: 6px 16px;
            margin-left: 15px;
            border-radius: 18px;
            cursor: pointer;
            font-family: "Google Sans", Roboto, Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3);
            transition: all 0.2s;
            position: relative; 
            z-index: 99999;
            pointer-events: auto;
        `;

        // 5. Üzerine gelince büyüme efekti
        btn.addEventListener('mouseenter', () => {
            if (btn.innerHTML === '✨ AI Özetle') btn.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');

        // 6. Tıklama Olayı: Metni Çek ve Arka Plana (Beyne) Gönder
        btn.addEventListener('click', (e) => {
            e.preventDefault();   
            e.stopPropagation();  

            console.log("🔍 E-posta metni taranıyor...");
            
            // Gmail'deki e-posta gövdelerini (metinleri) bul
            const emailBodies = document.querySelectorAll('.a3s'); 
            
            if (emailBodies.length > 0) {
                // Zincirdeki en son e-postayı al
                const latestEmail = emailBodies[emailBodies.length - 1]; 
                
                // HTML etiketlerini çöpe at ve gereksiz boşlukları temizle
                let rawText = latestEmail.innerText;
                let cleanText = rawText.replace(/\n\s*\n/g, '\n').trim();

                console.log("📦 Metin paketlendi, Arka Plan'a (Beyne) gönderiliyor...");
                
                // Havalı UX Hareketi: Butonu geçici olarak bekleme moduna al
                const originalText = btn.innerHTML;
                const originalColor = btn.style.backgroundColor;
                btn.innerHTML = '⏳ Özetleniyor...';
                btn.style.backgroundColor = '#e8eaed'; // Gri renk
                btn.style.color = '#5f6368';
                btn.style.transform = 'scale(1)';
                btn.style.cursor = 'wait';

                // Chrome'un mesajlaşma ağıyla metni background.js'e fırlatıyoruz
                chrome.runtime.sendMessage({ 
                    gorev: "metni_ozetle", 
                    metin: cleanText 
                }, (cevap) => {
                    // Beyinden (background.js) cevap gelince butonu eski haline getir
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = originalColor;
                    btn.style.color = '#1f1f1f';
                    btn.style.cursor = 'pointer';

                    // Gelen cevabı konsola ve ekrana yazdır
                    console.log("🧠 Beyinden gelen yanıt:", cevap.durum);
                    alert("Yapay zeka beyni: " + cevap.durum);
                });

            } else {
                alert("❌ Hata: E-posta metni bulunamadı!");
            }
        }, true); // Tıklamayı en erken aşamada yakala

        // 7. Butonu Gmail araç çubuğuna yerleştir
        toolbar.appendChild(btn);
    }
}

// 8. Gmail SPA (Tek Sayfa Uygulaması) olduğu için 1 saniyede bir kontrol et
setInterval(injectButton, 1000);