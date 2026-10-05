## 1.hafta Notu
TEMEL KAVRAMLAR 
İnternet'in Temel Yapı Taşları
IP Adresi (Internet Protocol Address): İnternete bağlı her bir cihazı (bilgisayar, sunucu, telefon vb.) tanımlayan, noktalama işaretleriyle ayrılmış benzersiz sayısal etikettir.
DNS (Domain Name System): İnsanların okuyabildiği alan adlarını (google.com gibi), bilgisayarların anladığı IP adreslerine çeviren internetin telefon rehberidir.
Sunucu (Server): Web sitelerini, dosyaları veya uygulamaları barındıran ve internet üzerinden gelen isteklere yanıt veren, sürekli çalışan güçlü bilgisayardır.
HTTP (Hypertext Transfer Protocol): Web tarayıcınız ile bir sunucu arasında web sayfası verilerinin nasıl aktarılacağını belirleyen temel iletişim kuralıdır.
HTTPS (Hypertext Transfer Protocol Secure): HTTP'nin, tarayıcı ile sunucu arasındaki veri iletişimini şifreleyerek güvenli hale getiren sürümüdür.
Web Sitesinin Adresi ve Konumu
Domain (Alan Adı): Bir web sitesinin karmaşık IP adresi yerine kullanılan, akılda kalıcı ve kolay yazılabilen ismidir (örneğin, google.com).
URL (Uniform Resource Locator): Bir web kaynağının (belirli bir sayfa, resim veya dosya) internetteki tam ve spesifik adresini gösteren metin dizesidir.
WWW (World Wide Web): İnternet üzerinde barındırılan ve URL'ler aracılığıyla erişilebilen, birbirine bağlı web sayfaları ve içeriklerden oluşan küresel sistemdir.
Hosting (Barındırma): Bir web sitesinin tüm dosya ve verilerinin, internet üzerinden 7/24 erişilebilir olmasını sağlayan bir sunucuda saklanması hizmetidir.
FTP (File Transfer Protocol): Kendi bilgisayarınız ile bir sunucu arasında dosya yüklemek veya indirmek için kullanılan standart bir ağ protokolüdür.
Web Sayfasının Yapısı ve Görünümü
HTML (Hypertext Markup Language): Bir web sayfasının iskeletini, yani başlıklar, paragraflar, resimler gibi temel içeriğini ve yapısını oluşturan standart işaretleme dilidir.
Etiket (Tag): HTML'de bir elementi (örneğin <p> bir paragraf etiketidir) tanımlamak için kullanılan, küçüktür ve büyüktür (< >) işaretleri arasındaki komutlardır.
CSS (Cascading Style Sheets): HTML ile oluşturulmuş bir web sayfasının renk, yazı tipi, yerleşim gibi görsel stilini ve tasarımını belirlemek için kullanılan dildir.
JavaScript (JS): Web sayfalarına tıklanabilir butonlar, animasyonlar veya form kontrolleri gibi interaktif özellikler ve dinamizm katan programlama dilidir.
Web Geliştirici Rolleri ve Araçları
Front-end (Ön Yüz): Bir web sitesinin kullanıcının tarayıcıda doğrudan gördüğü ve etkileşimde bulunduğu arayüz (tasarım) kısmını geliştiren alandır.
Back-end (Arka Yüz): Bir web sitesinin veritabanı, sunucu işlemleri ve iş mantığı gibi kullanıcı tarafından görülmeyen arka plan sistemlerini geliştiren alandır.
Full-stack (Tam Yığın): Bir web projesinin hem front-end (ön yüz) hem de back-end (arka yüz) geliştirmesini yapabilen uzmanlık alanıdır.
Tarayıcı (Browser): Google Chrome, Firefox gibi, web sayfalarını görüntülememizi ve onlarla etkileşim kurmamızı sağlayan yazılımlardır.
Editör (Kod Editörü): Web geliştiricilerin HTML, CSS gibi kodları yazmak, düzenlemek ve yönetmek için kullandığı özel metin düzenleme programıdır (Örn: VS Code).
WYSIWYG Editör: Kod yazmadan, sürükle-bırak gibi görsel araçlarla web sayfası oluşturmayı sağlayan ve "Ne Görürsen Onu Alırsın" prensibiyle çalışan editörlerdir.
En yaygın alan adı uzantıları aşağıdaki gibidir.
gov (government) Devlet kurumları 
edu (education) Eğitim kurumları 
k12 (kindergarten 12)  Temel eğitim ve ortaöğretim kurumları 
org (organization) Ticari olmayan kuruluşlar
com (company) Ticari kuruluşlar
mil (military)   Askerî kurumlar 
net (network) Servis sunucular 
ac (academic) Akademik kuruluşlar 
int (international) Uluslararası kuruluşlar
info (information) Bilgi içerikli web siteleri 
 biz (business)Ticari kuruluşlar

## 2.hafta Notu

İçerik: Sitenin kalbidir. Yazı, resim ve videoların özgün, doğru ve hedef kitleye uygun olmasıdır.
Tasarım (Layout): Logo, menü ve içeriklerin ekranda nereye, hangi düzende yerleşeceğinin planlanmasıdır.
Biçimsellik: Renk uyumu, kontrast (zıtlık) ve okunabilir yazı tiplerinin (Tipografi) kullanılmasıdır.
İşlevsellik ve Kullanılabilirlik: Sitenin hızlı yüklenmesi, menülerin ve butonların doğru çalışması, kullanıcı dostu (kolay gezinilebilir) olmasıdır.
Güncellik: Sitedeki haber, duyuru ve tarihlerin eski olmaması; modern teknolojiler (HTML5, CSS3) ile yapılmasıdır.
Uygunluk ve Güvenilirlik: İletişim bilgilerinin olması, kırık (çalışmayan) link bulunmaması ve dil bilgisi hatalarının olmamasıdır.
Uyumluluk: Sitenin hem farklı tarayıcılarda (Chrome, Safari vb.) hem de farklı cihazlarda (Mobil, Tablet, PC) bozulmadan çalışmasıdır (Responsive Tasarım / <meta name="viewport"...>).

## 3.hafta Notu

<!DOCTYPE html>: Tarayıcıya HTML5 standartlarını kullandığımızı belirten zorunlu koddur.
<meta name="viewport"...>: Sitenin cep telefonlarında ve tabletlerde bozulmadan, ekrana duyarlı (Responsive) çalışmasını sağlayan etikettir.
Başlık Hiyerarşisi (Kurallar):
Bir sayfada sadece bir tane <h1> (Ana Başlık) kullanılır.
Sıralama atlanamaz. (Örn: <h2>'den sonra <h4> yazılamaz, <h3> gelmelidir).
Başlık etiketleri yazıyı büyütmek için değil, sayfanın içindekiler tablosunu oluşturmak için kullanılır. Yazı büyütme işi CSS ile yapılır.
Anlamsal (Semantic) Etiketler (Çok Önemli):
<header>: Başlık ve Logo alanı.
<nav>: Menü (Link) alanı.
<main>: Sitenin ana içeriği.
<article>: Bağımsız makale/haber bloğu.
<section>: İçerik içindeki alt bölümler.
<aside>: Ana içeriğin yanında duran yan bilgiler (Kenar çubuğu).
<footer>: En alt kısımdaki telif/iletişim alanı.
Anlamsal Metin Biçimlendirme:
<strong>: Kalın yapar ama arama motoruna "bu kelime çok önemli" der.
<em>: İtalik yapar ama "bu kelimeye vurgu yap" der.
<!-- Yorum -->: Tarayıcıda görünmeyen, sadece kodlayıcının gördüğü notlardır.

## 4.hafta Notu

Etiket Seçici (body, h1): HTML etiketinin adıyla doğrudan seçer. Sayfadaki tüm o etiketleri etkiler.
Kimlik (ID) Seçici (#logo): HTML'de id="logo" olan elemanı seçer. Bir sayfada bir ID sadece 1 kez kullanılır. Başına # konur.
Sınıf (Class) Seçici (.gezegen-karti): HTML'de class="gezegen-karti" olan elemanları seçer. Birden fazla elemanda kullanılabilir. Başına . (nokta) konur.
Torun (Descendant) Seçici (.gezegen-karti img): Aralarında boşluk bırakılarak yazılır. Bir kutunun içindeki (ne kadar derinde olursa olsun) elemanları seçer.
Sözde Sınıf (Pseudo-Class) (:hover): Kullanıcı fare ile elemanın üzerine geldiği anki stilini belirler.
Sözde Eleman (Pseudo-Element) (::first-letter, ::selection): Elemanın sadece belirli bir parçasını (ilk harfini veya fareyle seçilen kısmını) hedef alır. Çift iki nokta :: ile yazılır.

## GitHub

- Ana profil: https://github.com/Muhammedokbi
- Proje reposu: https://github.com/Muhammedokbi/OkulSiteProjesi11sinif
