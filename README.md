# Clearance Web

Web storefront untuk platform e-commerce clearance sale — marketplace barang surplus,
retur, dan overstock. Terhubung ke [Clearance API](https://github.com/wiwinwidiaaan/clearance-api)
(ASP.NET Core) untuk data produk, autentikasi, dan proses order.

## Tech Stack

- **React 18** + **Vite**
- **React Router** — routing antar halaman
- React Context (`useContext`) untuk state Auth & Cart
- CSS murni dengan tema visual "clearance sale / warehouse liquidation"

## Fitur

- 🏬 Katalog produk dengan filter kategori & pencarian
- 🏷️ Kartu produk dengan info diskon, kondisi barang, dan badge flash-sale
- 🛒 Keranjang belanja (drawer geser)
- 🔐 Register & login (JWT, disimpan di localStorage)
- 💳 Checkout terhubung ke backend, dengan validasi stok
- 📋 Riwayat pesanan

## Menjalankan Secara Lokal

```bash
npm install
cp .env.example .env   # sesuaikan VITE_API_BASE_URL kalau backend beda port
npm run dev
```

Buka `http://localhost:3000`. Pastikan [Clearance API](https://github.com/wiwinwidiaaan/clearance-api)
sudah jalan di `http://localhost:8080` (lewat `docker compose up`) supaya katalog produk bisa muncul.

## Struktur Project

```
src/
  api/client.js           -> semua pemanggilan ke backend (fetch + JWT header)
  context/AuthContext.jsx -> state login, simpan token di localStorage
  context/CartContext.jsx -> state keranjang belanja (in-memory)
  components/             -> Navbar, ProductCard, CartDrawer
  pages/                  -> Home (katalog), Login, Register, Checkout, Orders
```

## Alur Data

1. `Home.jsx` fetch `GET /api/products` (endpoint publik).
2. Tambah ke keranjang → disimpan di `CartContext` (hilang saat refresh browser).
3. Checkout → request tetap terkirim meski belum login; kalau token tidak ada/invalid,
   backend menolak (401) dan pesan error ditampilkan di form checkout.
4. `Checkout.jsx` kirim `POST /api/orders/checkout` dengan Bearer token JWT.
5. Backend validasi stok & hitung diskon aktif, lalu mengembalikan detail order.

## Project Terkait

- **[Clearance API](https://github.com/wiwinwidiaaan/clearance-api)** — backend ASP.NET Core
- **[Clearance Mobile](https://github.com/wiwinwidiaaan/clearance-mobile)** — React Native (Android) dengan notifikasi flash-sale

## Lisensi

MIT — bebas dipakai sebagai referensi untuk project Anda sendiri.
