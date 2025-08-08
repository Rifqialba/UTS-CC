# 🩺 Website E-Commerce Produk Kesehatan

Website ini menampilkan daftar produk kesehatan dengan gambar dan harga, menggunakan infrastruktur AWS dan CI/CD GitHub Actions untuk deployment otomatis.

---

## 📑 Daftar Isi

- [📖 Deskripsi Proyek](#deskripsi-proyek)
- [⚙️ Arsitektur & Infrastruktur](#arsitektur--infrastruktur)
- [🚀 Alur Kerja Aplikasi](#alur-kerja-aplikasi)
- [🔧 Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [⚡ CI/CD dengan GitHub Actions](#cicd-dengan-github-actions)
- [📸 Gambar Konfigurasi](#gambar-konfigurasi)
- [📁 Struktur Direktori](#struktur-direktori)
- [📝 Penutup](#penutup)

---

## 📖 Deskripsi Proyek

Proyek ini adalah sebuah aplikasi web e-commerce sederhana untuk menampilkan produk kesehatan. Data produk diambil dari backend dan disimpan di RDS, sementara gambar diambil dari S3.

---

## ⚙️ Arsitektur & Infrastruktur

Berikut adalah arsitektur yang digunakan:

[User]
|
[Frontend EC2 - Public Subnet] <------ GitHub Actions
|
[Backend EC2 - Private Subnet]
|
[MySQL RDS] + [S3 Bucket]



- Frontend dan backend dipisahkan pada dua EC2 berbeda.
- Backend tidak dapat diakses langsung dari internet (private subnet).
- Semua komponen terhubung dalam satu VPC dengan konfigurasi subnet dan security group.

---

## 🚀 Alur Kerja Aplikasi

1. Pengguna mengakses website dari browser → di-load dari EC2 frontend.
2. Frontend mengirimkan `GET /produk` ke backend.
3. Backend mengambil data dari MySQL RDS.
4. Backend mengirim response JSON → frontend menampilkan gambar dan harga produk.

---

## 🔧 Teknologi yang Digunakan

| Komponen    | Teknologi           |
|------------|---------------------|
| Frontend    | HTML/CSS + JS       |
| Backend     | Node.js             |
| Database    | MySQL RDS           |
| Penyimpanan | AWS S3              |
| Infrastruktur | EC2, VPC, Security Group |
| CI/CD       | GitHub Actions      |
| Monitoring  | Nginx logs, SSH     |

---

## ⚡ CI/CD dengan GitHub Actions

Setiap perubahan di branch `main` akan memicu GitHub Actions untuk:
1. Menyalin file HTML ke EC2 frontend.
2. Me-restart Nginx untuk memuat konten terbaru.

Contoh file `.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend to EC2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Copy frontend to EC2
      uses: appleboy/scp-action@v0.1.4
      with:
        host: ${{ secrets.HOST }}
        username: ec2-user
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        source: "frontend/index.html"
        target: "/var/www/frontend"

    - name: Restart Nginx
      uses: appleboy/ssh-action@v0.1.10
      with:
        host: ${{ secrets.HOST }}
        username: ec2-user
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          sudo systemctl restart nginx


---📸 Gambar Konfigurasi---
<img width="540" height="513" alt="Screenshot 2025-08-08 at 19 19 30" src="https://github.com/user-attachments/assets/a03e954b-9c46-4c67-83d7-cbc0928e6689" />
<img width="540" height="517" alt="Screenshot 2025-08-08 at 19 18 48" src="https://github.com/user-attachments/assets/bfae4fc3-caf9-40b8-ad7f-d717ba3b1120" />
<img width="818" height="84" alt="Screenshot 2025-08-08 at 19 24 04" src="https://github.com/user-attachments/assets/d6fb3926-7029-4acd-8bc8-c558f1303688" />
<img width="815" height="150" alt="Screenshot 2025-08-08 at 19 23 44" src="https://github.com/user-attachments/assets/624c3a1f-2714-48ab-905f-bb1272f2895b" />
<img width="814" height="391" alt="Screenshot 2025-08-08 at 19 23 06" src="https://github.com/user-attachments/assets/02898517-4039-4960-8866-fd7146ee425a" />
<img width="818" height="388" alt="Screenshot 2025-08-08 at 19 22 41" src="https://github.com/user-attachments/assets/8c0e678b-d3bf-4aa4-a168-5c9013dcaaeb" />
<img width="818" height="362" alt="Screenshot 2025-08-08 at 19 22 24" src="https://github.com/user-attachments/assets/1dd43d03-d597-46a1-b22e-68084e3bcc88" />
<img width="1205" height="654" alt="Screenshot 2025-08-07 at 18 30 19" src="https://github.com/user-attachments/assets/ce9bad46-17d2-488b-8154-867a9f1ae20b" />
ps://github.com/user-attachments/assets/528f9ba1-7962-427a-b410-28dc482225e4" />


📝 Penutup
Proyek ini merupakan latihan implementasi DevOps di AWS dengan fokus pada arsitektur infrastruktur, otomatisasi deployment, dan pengembangan aplikasi sederhana berbasis web.
Terima kasih!



