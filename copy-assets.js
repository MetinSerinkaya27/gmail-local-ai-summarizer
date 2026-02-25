const fs = require('fs');
const path = require('path');

// Yapay zeka motorunun node_modules içindeki saklandığı yeri buluyoruz
const kaynak = path.join(__dirname, 'node_modules', '@huggingface', 'transformers', 'dist');

// Oradaki .wasm ve .mjs dosyalarını alıp kendi klasörümüze kopyalıyoruz
fs.readdirSync(kaynak).forEach(dosya => {
    if (dosya.endsWith('.wasm') || dosya.endsWith('.mjs')) {
        fs.copyFileSync(path.join(kaynak, dosya), path.join(__dirname, dosya));
    }
});

console.log("⚙️ Motor dosyaları (WASM ve MJS) ana klasöre başarıyla kopyalandı!");