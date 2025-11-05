# Toko Buku Online — UTS Pemrograman Web 1

##  Identitas
| Nama | NIM | Kelas |
|------|-----|--------|
| **AFDHAL AGISLAM** | *(312410445)* | *(TI 24 A5)* |

---

**Deskripsi singkat**  
Proyek ini adalah aplikasi toko buku sederhana untuk tugas UTS Pemrograman Web 1. Dibangun menggunakan HTML, CSS, dan JavaScript murni (tanpa framework). Fitur utama: login demo, dashboard, katalog/stok buku (grid), tambah stok manual, keranjang & checkout, serta tracking pengiriman (nomor DO).

---

## Demo singkat (fitur utama)
- Halaman Login (akun demo tersedia)
- Dashboard (navigasi)
- Stok / Katalog (grid card dengan cover, judul, jenis barang, harga, stok)
- Tambah stok manual (form)
- Checkout (keranjang, quantity, total)
- Tracking (cek status pengiriman dengan nomor DO)
- Styling modern & responsif (tema biru minimalis)

---

## Cara menjalankan (lokal)
1. Pastikan struktur folder seperti di bawah.  
2. Buka project di **Visual Studio Code**.  
3. Jalankan **Live Server** (klik kanan `index.html` → *Open with Live Server*).  
4. Buka browser ke `http://127.0.0.1:5500/index.html` (atau alamat Live Server yang diberikan).

---

## Struktur folder proyek

```
TUGAS_UTS_WEB1/
├─ assets/
│ └─ logo.png
├─ css/
│ └─ style.css
├─ img/
│ ├─ buku1.png
│ ├─ buku2.png
│ └─ ...
├─ js/
│ ├─ data.js ← data katalog & pesanan & akun demo
│ └─ main.js ← logika utama (render catalog, cart, checkout, tracking)
├─ index.html ← halaman login
├─ dashboard.html
├─ stok.html ← daftar buku / tambah stok
├─ checkout.html
├─ tracking.html
└─ README.md
```


**Screenshot struktur folder (tempelkan file `screenshots/project-structure.png`):**

![Struktur Project](screenshots/project-structure.png)

---

## Penjelasan file penting

### `index.html` — Halaman Login

**Fitur:**
- Input email dan password dengan validasi format
- Alert/pop-up untuk notifikasi error saat login gagal
- Modal box "Lupa Password" dengan form reset password
- Modal box "Daftar" untuk registrasi akun baru

**JavaScript Implementation:**

- Event listener untuk form submission
- Validasi email menggunakan regex
- Pengecekan kredensial dengan array dataPengguna
- Modal manipulation untuk Lupa Password dan Daftar
- Session management dengan sessionStorage

**Validasi:**

- Format email harus valid
- Field tidak boleh kosong
- Password minimal 6 karakter (pada form daftar)
- Konfirmasi password harus sama
- 
**Tujuan:**
Mengamankan akses ke halaman internal.

**Screenshot halaman login**

![Halaman Login](screenshots/index-page.png)

---

### `dashboard.html` — Dashboard
**Menampilkan ringkasan:**

- Jumlah buku tersedia
- Jumlah pesanan
- Tombol navigasi
- Brand + Logo

**Tujuan:**
Sebagai pusat kontrol pengguna.

**Screenshot dashboard**

![Dashboard](screenshots/dashboard-page.png)

---

### `stok.html` — Stok / Katalog
**Pada halaman ini, user dapat:**

**Melihat daftar buku:**

- Judul
- Jenis
- Harga
- Stock
- Tombol tambah keranjang

**Menambahkan buku baru:**

**Tersedia form:**

- ID Buku
- Judul
- Jenis
- Harga
- Stok
- URL Cover (opsional)

**Saat submit:**
- Data baru ditambahkan ke array dataKatalogBuku
- Langsung tampil ke list katalog

**Screenshot katalog**

![Katalog Buku](screenshots/stok-page.png)

---

### `checkout.html` — Checkout / Keranjang
**Menampilkan:**

- Barang yang dipilih
- Total harga
- Input nama & alamat
  
**Saat konfirmasi:**
  
- Data dimasukkan ke dataPesanan
- Stok otomatis dikurangi
- Redirect ke tracking.html
- 
**Screenshot checkout**

![Checkout](screenshots/checkout-page.png)

---

### `tracking.html` — Tracking Pengiriman
**Menampilkan**

- Order ID
- Nama pemesan
- Alamat
- Nomor Delivery Order
- Status (dummy)
  
**Tujuan:**
Mensimulasikan tracking kurir / proses pengiriman.

**Screenshot tracking**

![Tracking](screenshots/tracking-page.png)

---

## Alur Pemesanan ##

- Login lewat index.html
- Masuk ke dashboard
- Klik “Lihat Katalog”
- Pilih buku dan klik Tambah ke Keranjang
- Buka checkout
- Isi data pemesan
- Konfirmasi pesanan
- Lihat tracking status

## Penjelasan File Berdasarkan Folder ##
**1. /css/style.css**

- Berisi styling tampilan:
- Tampilan card buku
- Header branding
- Button
- Layout grid
- Form
- Modal
- Shadow, border, color scheme
CSS ini membuat tampilan modern, clean, dan responsive.

## /js/data.js ##

**Berisi data dummy:**

- Data katalog buku
- Data pesanan
- Akun demo login

## Contoh struktur: ##
```js
{
  id: "B001",
  judul: "Kepemimpinan",
  jenis: "Buku Ajar",
  harga: 95000,
  stok: 10,
  cover: "img/kepemimpinan.png"
}
```
## /js/main.js

**Meng-handle:**
- Menampilkan data buku ke katalog
- Menambah keranjang
- Update stok
- Menampilkan total harga
- Menyimpan data ke array
  
**Meng-handle fitur login:**

 -Validasi input
- Cek email/password
- Redirect ke dashboard
- Modal lupa password
- Modal daftar akun (dummy)

## Desain Tampilan

- Tampilan dibuat modern menggunakan:
- shadow lembut
- warna accent biru
- border radius
- spacing ideal
  
## Keamanan (Basic)

- Login form dicek di frontend:
- filter email kosong
- pattern password
- blok login kosong

## Cara Menjalankan

- Download / clone repository
- Buka folder di VS Code
- Install extension Live Server
- klik index.html → Open with Live Server

## LINK YOUTUBE
https://youtu.be/eLUbtfiJxBc

## Kesimpulan

Project ini berhasil membangun aplikasi pemesanan toko buku berbasis web menggunakan HTML, CSS, dan JavaScript. Fitur utama seperti login, katalog, penambahan buku, keranjang, checkout, dan pelacakan pesanan telah berjalan dengan baik. Struktur file yang rapi, tampilan antarmuka modern, serta logika manipulasi data di sisi frontend menunjukkan pemahaman yang baik terhadap konsep dasar pengembangan web.
