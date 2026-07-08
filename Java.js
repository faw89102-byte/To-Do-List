const text = document.getElementById("input-barang");
const tombol = document.getElementById("btn-tambah");
const ul = document.getElementById("keranjang");

// 1. Ambil data lama dari Local Storage (jika ada). Kalau kosong, buat Array baru []
let daftarBelanjaan = JSON.parse(localStorage.getItem("list_barang")) || [];

// 2. FUNGSI UNTUK MENAMPILKAN BARANG KE LAYAR
function tampilkanBarang(namaBarang) {
    const libaru = document.createElement("li");
    libaru.innerText = "✅ " + namaBarang + " "; 

    const tombolHapus = document.createElement("button");
    tombolHapus.innerText = "Hapus";
    tombolHapus.style.color = "red";

    libaru.appendChild(tombolHapus);

    // Fungsi Hapus yang sudah di-upgrade agar menghapus data di Local Storage juga
    tombolHapus.addEventListener("click", function () {
        libaru.remove();
        // Hapus barang dari Array daftarBelanjaan
        daftarBelanjaan = daftarBelanjaan.filter(item => item !== namaBarang);
        // Simpan kembali Array yang sudah bersih ke Local Storage
        localStorage.setItem("list_barang", JSON.stringify(daftarBelanjaan));
    });

    ul.appendChild(libaru);
}

// 3. JALANKAN PERULANGAN: Saat pertama kali web dibuka, tampilkan semua barang yang tersimpan di laci
daftarBelanjaan.forEach(function(barang) {
    tampilkanBarang(barang);
});

// 4. TOMBOL TAMBAH CLIK
tombol.addEventListener("click", function(){
    let textBaru = text.value.trim();
    if(textBaru === "") return; // Jangan masukkan kalau input kosong

    // Tampilkan di layar
    tampilkanBarang(textBaru);

    // Masukkan nama barang baru ke dalam Array daftarBelanjaan
    daftarBelanjaan.push(textBaru);

    // Simpan Array terbaru ke dalam Local Storage (diubah jadi teks dulu)
    localStorage.setItem("list_barang", JSON.stringify(daftarBelanjaan));

    text.value = "";
});