# Fastify Mikroservis Yapısı

Bu proje, Fastify framework'ünü kullanarak oluşturulmuş, çoklu servis desteği, Swagger tabanlı API dokümantasyonu ve merkezi konfigürasyon yönetimi özelliklerine sahip bir mikroservis mimarisidir. Süreç yönetimi için **PM2** tercih edilmiş olup, bu projede **Docker kullanılmamaktadır.**

---

## 🚀 Özellikler

* **Fastify Tabanlı:** Yüksek performans ve düşük overhead ile hızlı API geliştirme.
* **Çoklu Servis Desteği:** Proje içinde bağımsız servisler barındırabilme yeteneği.
* **Swagger Dokümantasyonu:** Her servis için otomatik olarak oluşturulan ve erişilebilir API dokümantasyonu.
* **Merkezi Konfigürasyon Yönetimi:** Ortak ve servise özel konfigürasyonların kolayca yönetilmesi.
* **PM2 Entegrasyonu:** Uygulama süreçlerinin yönetimi, izlenmesi ve otomatik yeniden başlatılması.

---

## 📁 Servisler

Proje, her biri kendi bağımsız mantığına sahip olan aşağıdaki mikroservisleri içerir:

* **`auth`**: Kimlik doğrulama işlemleri ve yetkilendirme akışlarını yönetir.
* **`user`**: Kullanıcı hesaplarının yönetimi, oluşturulması, güncellenmesi ve sorgulanmasından sorumludur.

Her servis kendi bağımsız portunda çalışır.

---

## 🚀 Başlangıç

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Önkoşullar

Başlamadan önce sisteminizde aşağıdaki yazılımların yüklü olduğundan emin olun:

* **Node.js** (LTS sürümü önerilir)
* **npm** (Node.js ile birlikte gelir)
* **PM2** (`npm install -g pm2` ile global olarak yüklenebilir)

### Kurulum

1.  Projeyi klonlayın:

    ```bash
    git clone <proje-deposu-url>
    cd <proje-klasoru>
    ```

2.  Tüm ortak modül bağımlılıklarını yükleyin:

    ```bash
    ./npm-install-all.sh
    ```

    Bu script, projenin kök dizinindeki ve her bir servis altındaki `package.json` dosyalarında tanımlı tüm bağımlılıkları yükleyecektir.

### Servisleri Yönetme (PM2)

Projenin mikroservislerini başlatmak, durdurmak ve izlemek için PM2 kullanırız.

* **Servisleri Başlatma:**
    PM2 kullanarak servisleri başlatmak için:

    ```bash
    pm2 start ecosystem.config.js
    ```

    Bu komut, `ecosystem.config.js` dosyasında tanımlanan tüm servisleri PM2 aracılığıyla başlatacaktır.

* **Çalışan Servisleri Listeleme:**
    Tüm çalışan PM2 süreçlerini ve durumlarını görmek için:

    ```bash
    pm2 list
    ```

* **Servis Loglarını Görüntüleme:**
    Belirli bir servisin veya tüm servislerin loglarını gerçek zamanlı olarak takip etmek için:

    ```bash
    pm2 logs # Tüm servislerin logları
    pm2 logs <servis_adı> # Sadece belirli bir servisin logları (örn: pm2 logs auth)
    ```

* **Servisleri Durdurma:**
    `ecosystem.config.js` dosyasında tanımlanan tüm servisleri durdurmak için:

    ```bash
    pm2 stop ecosystem.config.js
    ```

    Veya tüm PM2 süreçlerini durdurmak için:

    ```bash
    pm2 stop all
    ```

---

## ⚙️ Konfigürasyon Yönetimi

Proje konfigürasyonları merkezi bir şekilde yönetilir. Her servis kendi özel konfigürasyon dosyalarına sahip olabilirken, ortak ve global konfigürasyonlar da mevcuttur. Uygulama ortamına (geliştirme, test, üretim vb.) göre farklı konfigürasyonlar ayarlanabilir. Detaylı bilgi ve konfigürasyon örnekleri için lütfen ilgili konfigürasyon dizinlerine ve dosyalarına göz atın.

---

## 📖 API Dokümantasyonu (Swagger)

Her servis başlatıldığında, otomatik olarak bir **Swagger UI** arayüzü üzerinden API dokümantasyonu sunar. Bu dokümantasyon sayesinde servislerin uç noktalarını, beklenen istek ve yanıt yapılarını kolayca görebilir ve test edebilirsiniz. Servislerinizin çalıştığı portu kullanarak tarayıcınızda erişebilirsiniz. Örneğin:

* **Auth Servisi:** `http://localhost:<auth-servis-portu>/documentation`
* **User Servisi:** `http://localhost:<user-servis-portu>/documentation`

Servislerin hangi portlarda çalıştığını `ecosystem.config.js` dosyasından veya servislerin kendi konfigürasyonlarından öğrenebilirsiniz.

---
