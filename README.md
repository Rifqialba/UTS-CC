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
```

# 📸 Gambar Konfigurasi dan website dapat dilihat pada bagian issue







📝 Penutup
Proyek ini merupakan latihan implementasi DevOps di AWS dengan fokus pada arsitektur infrastruktur, otomatisasi deployment, dan pengembangan aplikasi sederhana berbasis web.
Terima kasih!



