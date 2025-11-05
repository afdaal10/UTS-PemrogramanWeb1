// js/data.js - data dummy katalog & pesanan
const dataKatalogBuku = [
  { id: "B001", judul: "Perkembangan Anak Usia Dini", penulis: "Afdal Agislam", harga: 90000, stok: 12, cover: "img/perkembangananak.jpg" },
  { id: "B002", judul: "Manajemen Keuangan", penulis: "Rafi Ahmad", harga: 85000, stok: 8, cover: "img/manajemenkeuangan.jpg" },
  { id: "B003", judul: "Mikrobiologi Dasar", penulis: "Velly", harga: 120000, stok: 5, cover: "img/mikrobiologi.jpg" },
  { id: "B004", judul: "Kepemimpinan", penulis: "Natasya", harga: 110000, stok: 6, cover: "img/kepemimpinan.jpg" },
  { id: "B005", judul: "Pengantar Ilmu Komunikasi", penulis: "Prof.Agus", harga: 99000, stok: 10, cover: "img/ilmukomunikasi.jpg" }
];

const dataPesanan = [
  { orderId: "ORD1001", nama: "Salsa Nabila", alamat: "Jl. Merdeka 10, Jakarta", nomorDO: "DO-2025001", tanggalKirim: "2025-10-20", ekspedisi: "JNE Reg", jenisPaket: "Reguler", total: 285000, status: "Dikirim" },
  { orderId: "ORD1002", nama: "Putri Zahwa", alamat: "Jl. Melati 5, Bandung", nomorDO: "DO-2025002", tanggalKirim: "2025-10-22", ekspedisi: "TIKI ONS", jenisPaket: "Kilat", total: 190000, status: "Dalam Perjalanan" }
];

// akun demo (frontend-only)
const akunDemo = { email: "afdhalagislam@gmail.com", password: "uts12345" };
