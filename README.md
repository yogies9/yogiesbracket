# Bracket TV Yogies — Static Site (GitHub Pages)

Landing page profesional bertema *Bracket TV Yogies* dengan fitur keranjang sederhana dan **checkout via WhatsApp**.

## Fitur
- Landing page modern (responsif, SEO meta, Open Graph).
- Grid produk dengan tombol **Tambah ke Keranjang**.
- Keranjang (drawer) + qty, total, hapus item, kosongkan.
- Checkout via WhatsApp (ubah nomor di `script.js`).
- **Anti-copy dasar** untuk teks & media (non-foolproof).

## Struktur
```
.
├─ index.html
├─ style.css
├─ script.js
└─ assets/
```

## Deploy ke GitHub Pages
1. Buat repository baru, misal `bracket-tv-yogies`.
2. Upload semua file ini ke root repository.
3. Di **Settings → Pages**, pilih `Deploy from Branch`, branch `main`, folder `/ (root)`.
4. Tunggu hingga URL aktif: `https://<username>.github.io/bracket-tv-yogies/`

## Pengaturan
- Ganti nomor WhatsApp di `script.js` pada konstanta `WA_NUMBER`.
- Ganti logo dan gambar di folder `assets`.
