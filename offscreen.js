import { pipeline, env } from '@huggingface/transformers';

env.allowLocalModels = false;
// CDN linkini sildik. Artık motor doğrudan kendi klasörümüzden çalışacak!
env.backends.onnx.wasm.wasmPaths = chrome.runtime.getURL('/');
class PipelineSingleton {
    static task = 'summarization';
    static model = 'Xenova/distilbart-cnn-6-6';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

chrome.runtime.onMessage.addListener((gelenMesaj, gonderen, cevapVer) => {
    if (gelenMesaj.gorev === "offscreen_ozetle") {
        (async () => {
            try {
                let summarizer = await PipelineSingleton.getInstance((data) => {
                    console.log("⏳ Yükleme Durumu:", data);
                });

                let sonuc = await summarizer(gelenMesaj.metin, {
                    max_new_tokens: 130, 
                    min_new_tokens: 30   
                });

                cevapVer({ durum: sonuc[0].summary_text });
            } catch (error) {
                cevapVer({ durum: "Hata: " + error.message });
            }
        })();
        return true; 
    }
});