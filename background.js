// Gizli sekmeyi (Offscreen) oluşturan fonksiyon
async function createOffscreen() {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['WORKERS'],
        justification: 'AI Model calistirmak icin'
    });
}

chrome.runtime.onMessage.addListener((gelenMesaj, gonderen, cevapVer) => {
    if (gelenMesaj.gorev === "metni_ozetle") {
        (async () => {
            // Önce gizli odayı hazırla
            await createOffscreen();
            
            // Gmail'den gelen metni gizli odadaki (offscreen) yapay zekaya pasla
            chrome.runtime.sendMessage({
                gorev: "offscreen_ozetle",
                metin: gelenMesaj.metin
            }, (cevap) => {
                // Yapay zekadan gelen özeti de Gmail'e (butona) geri yolla!
                cevapVer(cevap);
            });
        })();
        return true; 
    }
});