# 🚀 Gmail Yerel AI Özetleyici (Gmail Local AI Summarizer)

Bu proje, Gmail üzerindeki e-postalarınızı **%100 yerel (local)** bir şekilde, verilerinizi hiçbir sunucuya göndermeden tarayıcı içinde özetleyen bir Chrome eklentisidir. Gizlilik odaklıdır ve gücünü tarayıcı içi yapay zekadan alır.

## ✨ Öne Çıkan Özellikler

- 🔒 **Tam Gizlilik:** Özetleme işlemi tamamen bilgisayarınızda gerçekleşir. Veriler dışarı sızmaz.
- ⚡ **Offline Kapasite:** Yapay zeka modeli ilk kullanımda indirilir ve önbelleğe alınır. Daha sonra internet bağlantısı olmadan da çalışabilir.
- 🤖 **Transformers.js:** Hugging Face'in en güncel tarayıcı içi yapay zeka teknolojilerini kullanır.
- 📬 **Gmail Entegrasyonu:** Gmail arayüzüne şık bir "AI Özetle" butonu ekleyerek doğal bir deneyim sunar.

---

## 🛠️ Teknik Mimari

Eklenti, Chrome Manifest V3 kısıtlamalarını aşmak için gelişmiş bir mimari kullanır:
- **Content Script:** Gmail DOM yapısına sızıp butonu enjekte eder.
- **Background Service Worker:** Mesaj trafiğini yönetir.
- **Offscreen Document:** Güvenli bir alanda WebAssembly (WASM) motorunu çalıştırarak yapay zeka hesaplamalarını yapar.
- **esbuild:** Tüm kütüphaneleri ve bağımlılıkları tek bir dosyada paketler.

---

## 💻 Kurulum ve Geliştirme

Projeyi yerel ortamınızda çalıştırmak için:

### 1. Hazırlık
Önce bağımlılıkları yükleyin:
```bash
npm install
2. Derleme (Build)
Yapay zeka motorunu ve kodları paketlemek için:

Bash

npm run build
Bu komut hem kodları bundle haline getirir hem de gerekli WASM motor dosyalarını kök dizine kopyalar.

3. Tarayıcıya Yükleme
Chrome'da chrome://extensions/ adresine gidin.

**"Geliştirici Modu"**nu açın.

"Paketlenmemiş öğeyi yükle" butonuna basarak bu proje klasörünü seçin.

🚀 Kullanım Notları
İlk Çalıştırma: Butona ilk tıkladığınızda model (~240MB) indirileceği için kısa bir bekleme süresi olabilir. İlerlemeyi "Service Worker" konsolundan izleyebilirsiniz.

Dil Desteği: Mevcut sürüm distilbart-cnn-6-6 modelini kullanmaktadır ve İngilizce metinlerde en iyi sonucu verir. Türkçe metinler için deneysel sonuçlar üretebilir.

📜 Lisans
Bu proje açık kaynaklıdır ve eğitim amaçlı geliştirilmiştir. İstediğiniz gibi geliştirebilir ve paylaşabilirsiniz.

Geliştirici: [MetinSerinkaya27]