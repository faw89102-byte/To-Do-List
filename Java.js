const text = document.getElementById("input-kegiatan");
const tombol = document.getElementById("btn-tambah");
const ul = document.getElementById("Kegiatan");

// 1. Ambil data lama dari Local Storage (jika ada). Kalau kosong, buat Array baru []
let daftarkegiatan = JSON.parse(localStorage.getItem("list_kegiatan")) || [];

// 2. FUNGSI UNTUK MENAMPILKAN BARANG KE LAYAR
function tampilkanBarang(lakukan) {
    const libaru = document.createElement("li");
    libaru.innerText = "✅ " + lakukan + " "; 

    const tombolHapus = document.createElement("button");
    tombolHapus.innerText = "Hapus";
    tombolHapus.style.color = "red";

    libaru.appendChild(tombolHapus);

    // Fungsi Hapus yang sudah di-upgrade agar menghapus data di Local Storage juga
    tombolHapus.addEventListener("click", function () {
        libaru.remove();
        // Hapus barang dari Array daftarkegiatan
        daftarkegiatan = daftarkegiatan.filter(item => item !== lakukan);
        // Simpan kembali Array yang sudah bersih ke Local Storage (disesuaikan ke daftarkegiatan & list_kegiatan)
        localStorage.setItem("list_kegiatan", JSON.stringify(daftarkegiatan));
    });

    ul.appendChild(libaru);
}

// 3. JALANKAN PERULANGAN: Saat pertama kali web dibuka, tampilkan semua barang yang tersimpan di laci
daftarkegiatan.forEach(function(lakukan) {
    tampilkanBarang(lakukan);
});

// 4. TOMBOL TAMBAH CLIK
tombol.addEventListener("click", function(){
    let textBaru = text.value.trim();
    if(textBaru === "") return; // Jangan masukkan kalau input kosong

    // Tampilkan di layar
    tampilkanBarang(textBaru);

    // Masukkan nama barang baru ke dalam Array daftarkegiatan
    daftarkegiatan.push(textBaru);

    // Simpan Array terbaru ke dalam Local Storage (disesuaikan ke daftarkegiatan & list_kegiatan)
    localStorage.setItem("list_kegiatan", JSON.stringify(daftarkegiatan));

    text.value = "";
});