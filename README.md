# Clearance Web Storefront

React + Vite storefront untuk platform clearance sale. Terhubung ke backend ASP.NET Core
yang sudah dibuat sebelumnya.

## Menjalankan Secara Lokal

```bash
npm install
cp .env.example .env   # sesuaikan VITE_API_BASE_URL kalau backend beda port
npm run dev
```

Buka `http://localhost:3000`. Pastikan backend API (`docker compose up`) sudah jalan
di `http://localhost:8080` supaya katalog produk bisa muncul.

## Struktur

```
src/
  api/client.js          -> semua pemanggilan ke backend (fetch + JWT header)
  context/AuthContext.jsx -> state login, simpan token di localStorage
  context/CartContext.jsx -> state keranjang belanja (in-memory, hilang saat refresh)
  components/            -> Navbar, ProductCard, CartDrawer
  pages/                 -> Home (katalog), Login, Register, Checkout, Orders
```

## Alur Data

1. `Home.jsx` fetch `/api/products` (endpoint publik, tidak butuh login).
2. Tambah ke keranjang -> disimpan di `CartContext`, hanya di memori browser.
3. Klik checkout -> kalau belum login, diarahkan ke `/login` dulu.
4. `Checkout.jsx` kirim POST ke `/api/orders/checkout` dengan Bearer token JWT.
5. Backend validasi stok & hitung diskon aktif, lalu balikin order.

## Catatan untuk Belajar Lebih Lanjut

- Cart saat ini disimpan di React state (hilang kalau refresh browser). Untuk
  versi produksi, biasanya disimpan di localStorage atau backend (tabel `Cart`).
- Belum ada halaman detail produk terpisah — bisa ditambah dengan route
  `/products/:id` yang fetch `GET /api/products/{id}`.
- Belum ada notifikasi flash-sale real-time (itu akan datang di bagian Mobile App
  dengan push notification).
