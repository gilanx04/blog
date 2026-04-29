---
title: Install Claude Code di Android Pakai Termux (tanpa proot-distro)
published: 2026-04-29
description: Panduan ini nuntun install Claude Code CLI di Android murni lewat
  Termux  tanpa root, tanpa proot-distro.
image: install-claudecode-di-android-termux-tanpa-proot-distro.png
tags:
  - AI
  - Agent
  - Tutorial
  - Android
  - Claude
  - Termux
category: AI
lang: id
author: Gilanx Cheetz
draft: false
pinned: false
comment: true
---
## Apa yang bakal di-Build?

Panduan ini nuntun install Claude Code CLI di Android murni lewat Termux  tanpa root, tanpa proot-distro. Triknya pakai glibc linker dari OpenClaw yang bikin binary Linux biasa bisa jalan di lingkungan Termux.

**Yang bakal kejadian:**
- Termux di-setup dari nol
- Runtime glibc dipasang buat jalanin binary Linux
- Claude Code CLI di-install dan dikonfigurasi
- Command `claude` siap dipake langsung dari terminal

**Peringatan penting:**
- Jangan pernah `pkg upgrade nodejs` atau `apt upgrade` yang ganti Node.js bawaan Termux  ini bakal bikin Claude break karena beda ABI.
- Selalu update Claude lewat `oa update` atau npm dengan PATH yang udah diset ke wrapper OpenClaw.
- Ini bukan cara resmi dari Anthropic atau Termux. Bisa aja break pas update besar.

---

## Langkah 1: Install Termux dari Sumber yang Bener

Jangan download Termux dari Play Store  versinya udah deprecated dan gak dapet update keamanan.

**Cara yang bener:**

1. Buka F-Droid atau GitHub Releases Termux
2. Download APK terbaru dari:
   - F-Droid: `https://f-droid.org/packages/com.termux/`
   - GitHub: `https://github.com/termux/termux-app/releases`
3. Install APK-nya
4. Buka Termux, kasih permission storage kalo diminta:
   ```sh
   termux-setup-storage
   ```

Kalo udah muncul prompt `$` siap jalan.

---

## Langkah 2: Update Paket dan Install Dependensi Dasar

Sebelum install apa-apa, update dulu repo dan paket yang ada:

```sh
pkg update && pkg upgrade -y
```

Ini bisa makan waktu beberapa menit tergantung koneksi. Kalo ada mirror yang lambat, Termux otomatis pilih yang lebih cepet.

Lanjut install tool yang dibutuhin:

```sh
pkg install -y wget curl proot git
```

**Fungsi masing-masing:**
- `wget` & `curl`: download file dan script installer
- `proot`: emulator environment (dibutuhin buat glibc linker)
- `git`: clone repo atau manage config nanti

Kalo udah selesai, lanjut ke langkah berikutnya.

---

## Langkah 3: Install OpenClaw (Glibc Runtime)

OpenClaw nyediain glibc linker yang bikin binary Linux biasa (yang butuh glibc) bisa jalan di Termux yang aslinya pake bionic libc.

Jalankan bootstrap installer:

```sh
curl -sL myopenclawhub.com/install | bash
```

**Yang terjadi di background:**
1. Script ngecek arsitektur device (harusnya aarch64 buat HP modern)
2. Download dan setup glibc-runner
3. Install Node.js versi glibc (bukan versi Termux bionic)
4. Patch hardcoded path di dependency (`/tmp`, `/bin/sh`, `/usr/bin/env`)
5. Setup wrapper command `oa` buat manage update nanti

Proses ini bisa makan waktu 5-10 menit tergantung koneksi. Kalo selesai, bakal muncul pesan sukses.

**Verifikasi Node.js dari OpenClaw:**

```sh
/data/data/com.termux/files/home/.openclaw-android/bin/node --version
```

Harusnya keluar `v22.x.x` atau lebih baru.

---

## Langkah 4: Install Claude Code CLI

Sekarang install Claude Code pake npm yang udah nyatu sama OpenClaw:

```sh
npm install -g @anthropic-ai/claude-code --ignore-scripts
```

Flag `--ignore-scripts` penting buat skip postinstall yang bisa gagal di environment Termux.

**Masalah yang bakal muncul:**

Kalo langsung coba jalanin `claude --version`, bakal keluar error:

```
Error: claude native binary not installed.
```

Ini karena `--ignore-scripts` tadi skip instalasi native binary. Fix-nya manual:

```sh
node $(npm root -g)/@anthropic-ai/claude-code/install.cjs
```

Script ini download dan setup native binary yang dibutuhin Claude Code.

---

## Langkah 5: Buat Command Global `claude`

Sekarang Claude Code udah terinstall tapi belum bisa dipanggil langsung. Perlu symlink ke PATH Termux.

Cari lokasi CLI wrapper:

```sh
ls /data/data/com.termux/files/usr/lib/node_modules/@anthropic-ai/claude-code/
```

File yang dicari: `cli-wrapper.cjs`

Buat symlink:

```sh
ln -sf /data/data/com.termux/files/usr/lib/node_modules/@anthropic-ai/claude-code/cli-wrapper.cjs /data/data/com.termux/files/usr/bin/claude
```

Biar executable:

```sh
chmod +x /data/data/com.termux/files/usr/bin/claude
```

**Verifikasi instalasi:**

```sh
claude --version
```

Kalo sukses, keluar output kayak:
```
2.1.123 (Claude Code)
```

---

## Langkah 6: Login dan Autentikasi

Pertama kali jalanin `claude`, bakal diminta login. Ada dua cara:

**Cara 1: Browser Flow (Recommended)**

```sh
claude
```

Bakal muncul URL dan device code. Buka URL di browser, masukin code, login dengan akun Anthropic.

**Cara 2: API Key (Kalo punya)**

```sh
export ANTHROPIC_API_KEY="sk-ant-..."
```

Simpen di `.bashrc` atau `.zshrc` biar gak perlu export ulang setiap sesi.

---

## Cara Update Claude Code Nanti

**JANGAN** pake `npm update -g` langsung atau `pkg upgrade`. Ini bisa break environment.

**Cara yang bener:**

Pake command wrapper dari OpenClaw:

```sh
oa update @anthropic-ai/claude-code
```

Atau kalo mau manual:

```sh
export PATH="/data/data/com.termux/files/home/.openclaw-android/bin:$PATH"
npm update -g @anthropic-ai/claude-code
node $(npm root -g)/@anthropic-ai/claude-code/install.cjs
```

Selalu jalankan postinstall script abis update buat pastiin native binary ke-install ulang.

---

## Troubleshooting

**Claude gak dikenali sebagai command**

Cek symlink:
```sh
ls -la /data/data/com.termux/files/usr/bin/claude
```

Kalo gak ada, buat ulang sesuai Langkah 5.

**Error: native binary not installed**

Jalankan ulang postinstall:
```sh
node $(npm root -g)/@anthropic-ai/claude-code/install.cjs
```

**Claude crash atau exit tiba-tiba**

Coba clear cache:
```sh
claude logout
rm -rf ~/.claude
claude
```

**Device code expired**

Generate ulang:
```sh
claude login
```

---

## Struktur File yang Dibuat

```
/data/data/com.termux/files/home/
├── .openclaw-android/
│   ├── bin/
│   │   ├── node          # Node.js glibc wrapper
│   │   ├── npm           # npm wrapper
│   │   └── npx           # npx wrapper
│   ├── patches/          # Patch file buat compatibility
│   └── patch.log         # Log patch yang diterapkan
│
│
/data/data/com.termux/files/usr/
├── bin/
│   └── claude            # Symlink command global
└── lib/node_modules/
    └── @anthropic-ai/claude-code/
        ├── cli-wrapper.cjs
        ├── install.cjs
        └── node_modules/
```

---

## Catatan Tambahan

**Tentang Keamanan**

- Script installer dari third-party (OpenClaw). Review dulu sebelum jalanin `curl | bash` kalo concern soal security.
- API key Anthropic tersimpan lokal. Jangan share folder `~/.claude`.

**Tentang Performa**

- Claude Code di Termux gak secepat di desktop karena limitasi hardware HP.
- Native binary compile buat Linux x86_64, tapi jalan via glibc-wrapper di ARM. Ada overhead kecil.

**Tentang Kompatibilitas**

- Gak semua fitur Claude Code desktop tersedia di Termux.
- Fitur yang butuh GUI atau system call khusus mungkin gak jalan.

---

## Kesimpulan

Claude Code sekarang bisa jalan di Termux tanpa root atau proot-distro penuh. Kuncinya ada di glibc linker dari OpenClaw yang jadi jembatan antara binary Linux dan environment Termux.

Yang perlu diinget:
- Selalu pake `oa update` buat update
- Jangan mix Node.js Termux sama Node.js OpenClaw
- Backup config dan API key regularly

Selamat coding dengan Claude di Termux Android. ;)
