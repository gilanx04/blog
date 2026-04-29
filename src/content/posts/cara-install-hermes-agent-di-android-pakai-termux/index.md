---
title: Cara Install Hermes Agent di Android pakai Termux
published: 2026-04-29
description: Hermes Agent adalah agent AI dari Nous Research. Beda dengan
  chatbot biasa yang cuma jawab pertanyaan, agent ini lebih cocok dipakai buat
  bantu kerja di terminal.
image: cara-install-hermes-agent-di-android-pakai-termux.png
tags:
  - AI
  - Agent
  - Tutorial
  - Android
  - Hermes
  - Termux
category: AI
lang: id
author: Gilanx Cheetz
draft: false
pinned: false
comment: true
---
Saya tulis ini karena kemarin ada teman nanya, “Hermes Agent bisa jalan di Android gak?”

Jawaban pendeknya: bisa.

Jawaban panjangnya: bisa, tapi ada beberapa detail kecil yang kalau kelewat bikin kamu muter di error yang sama terus.

Jadi daripada jawab sepotong-sepotong di chat, saya rapikan sekalian jadi panduan. Ini bukan teori. Ini alur yang saya pakai sendiri waktu pasang di HP.

## Apa itu Hermes AI Agent

Hermes Agent adalah agent AI dari Nous Research. Beda dengan chatbot biasa yang cuma jawab pertanyaan, agent ini lebih cocok dipakai buat bantu kerja di terminal. Kamu kasih instruksi, dia bantu susun langkah, jalanin perintah, lalu lihat hasilnya.

Apakah berarti semua hal bisa otomatis beres? Ya tidak juga. Tetap perlu kamu cek output dan ngerti apa yang lagi dikerjakan. Tapi buat tugas yang berulang, jelas terasa membantu.

## Fungsi Hermes Agent dalam pemakaian nyata

Kalau ditanya dipakai buat apa, yang paling kepakai biasanya ini:

- Bantu nulis boilerplate script supaya gak mulai dari kosong.
- Bantu tugas terminal yang repetitif, misalnya rapikan file atau jalanin urutan command.
- Bantu belajar command line karena kamu bisa langsung lihat contoh dan hasilnya.
- Bantu eksperimen cepat tanpa harus buka laptop dulu.

Saya pribadi paling sering pakai buat dua hal: setup awal project kecil dan bersih-bersih file. Bukan hal glamor, tapi hemat waktu.

## Langkah-langkah install Hermes Agent di Android

### 1) Install Termux dari website F-Droid, bukan Play Store

Ini poin paling penting di tutorial ini. Serius.

> [!WARNING] WARNING
> Install Termux dari website F-Droid. Jangan pakai versi Play Store.
> Versi Play Store sudah lama tidak di-maintain dan sering bikin gagal saat update package.

Kalau sudah install dari F-Droid, buka Termux seperti biasa.

### 2) Update paket dulu di Termux

Jalankan command ini:

```bash
pkg update && pkg upgrade
```

Tunggu sampai selesai. Kalau muncul prompt konfirmasi, tekan Enter saja sampai balik ke prompt terminal. Jangan loncat ke langkah berikutnya sebelum ini beres.

### 3) Install Hermes Agent dengan script resmi

Setelah update selesai, jalankan ini:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Itu script resmi dari repo Hermes Agent. Biarkan proses jalan sampai selesai. Biasanya ada output beberapa baris, jadi sabar dulu dan jangan ditutup aplikasinya.

### 4) Tunggu proses instalasi berakhir

Tidak ada trik di sini. Cukup tunggu.
Kalau internet lagi pelan, memang terasa lama. Selama proses masih jalan, biarkan saja.

### 5) Reload shell

Begitu instalasi selesai, jalankan command ini:

```bash
source ~/.bashrc    # reload shell (atau: source ~/.zshrc)
```

Tujuannya supaya environment yang baru langsung kebaca di sesi terminal sekarang.

### 6) Jalankan setup pertama kali

Lanjutkan dengan:

```bash
hermes setup
```

Ikuti instruksi yang muncul. Setup awal biasanya cuma beberapa pertanyaan dasar.

Kalau sudah lewat tahap ini tanpa error, berarti Hermes Agent sudah siap dipakai.

> [!NOTE] Catatan kecil biar tidak kejebak error yang sama

>Saya tambahkan ini karena biasanya orang mentok di titik yang mirip.

>Pertama, salah sumber Termux. Ini paling sering. Sudah capek debug, ternyata akar masalahnya dari aplikasi awal.

>Kedua, lupa reload shell setelah install. Akhirnya saat ketik `hermes`, muncul `command not found`. Bukan karena gagal install total, tapi karena shell belum refresh.

>Ketiga, buru-buru lanjut padahal `pkg upgrade` belum selesai bersih. Kalau ada paket yang belum tuntas, efeknya bisa muncul di langkah berikutnya dan kelihatan seperti error Hermes, padahal bukan.

## Penutup

Selesai. Sampai sini kamu sudah bisa pasang Hermes Agent di Android lewat Termux dengan alur yang aman.

Terima kasih sudah berkunjung. Semoga panduan ini ngebantu dan gak bikin buang waktu di error yang sama.

Nantikan tutorial berikutnya.
