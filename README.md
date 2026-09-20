# Kopi Nusantara — Halaman Company Profile Responsif

Tugas Studi Kasus Responsive UI (Pertemuan 4) — Front-End Programming (TK23023).

Halaman web statis satu halaman untuk kedai kopi rumahan "Kopi Nusantara", dibangun dengan HTML5 dan CSS3 murni tanpa framework CSS maupun JavaScript.

## Anggota Kelompok

| Nama | NIM |
| Yohanes Phandry | 535250054 |
| Khresnanda Putra Wirawan | 535250071 |
| Kenzie Agustin | 535250079 |
| Elfrandt Goldjer | 535250092 |
| Nicho Louis Salim | 535250095 |



## Struktur Halaman

- **Header / Navigasi** — sticky, dengan menu hamburger pada tampilan mobile
- **Hero** — gambar latar dan tombol menuju daftar menu
- **Menu** — 4 kartu produk berisi foto, deskripsi, dan harga
- **Tentang Kami** — profil singkat usaha
- **Kontak** — alamat, WhatsApp, tautan media sosial, dan formulir pemesanan
- **Footer**

## Penerapan Responsive UI

- Pendekatan **mobile-first**: CSS dasar ditulis untuk layar kecil, lalu diperluas lewat media query.
- **3 breakpoint**: mobile (< 576px), tablet (576px–992px), dan desktop (> 992px).
- **CSS Grid** pada daftar menu (1 → 2 → 4 kolom) dan bagian kontak (1 → 2 kolom).
- **Flexbox** pada navigasi, kartu menu, bagian Tentang Kami, dan tautan media sosial.
- Viewport meta tag disertakan, seluruh gambar responsif (`max-width: 100%; height: auto;`), dan tidak terjadi scroll horizontal pada ukuran layar mana pun.
- Menu hamburger dibuat dengan teknik checkbox CSS, sehingga tetap berfungsi tanpa JavaScript.

## Struktur Berkas

```
index.html    — struktur halaman
style.css     — seluruh styling dan media query
images/       — foto produk dan logo
```

## Cara Menjalankan

Unduh atau clone repositori ini, lalu buka `index.html` di browser. Tidak ada proses build atau dependensi yang perlu dipasang.
