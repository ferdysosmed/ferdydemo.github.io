// Fungsi ini dipanggil di semua halaman untuk memperbarui angka pada ikon keranjang.
function updateCartIcon() {
  // Ambil data keranjang dari penyimpanan lokal browser.
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;
  const badge = document.getElementById("cart-count");

  if (badge) {
    if (count > 0) {
      // Jika ada item di keranjang, tampilkan angkanya.
      badge.style.display = "block";
      badge.textContent = count;
    } else {
      // Jika keranjang kosong, sembunyikan ikon angka.
      badge.style.display = "none";
    }
  }
}

// Fungsi untuk menampilkan notifikasi sementara (toast).
// Ini bisa dipanggil jika diperlukan.
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  // Styling untuk toast notification
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = "#28a745"; // Warna hijau
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.fontWeight = "bold";
  toast.style.textAlign = "center";
  toast.style.zIndex = 9999;
  
  document.body.appendChild(toast);
  // Hapus notifikasi setelah 2.5 detik
  setTimeout(() => toast.remove(), 2500);
}


// Panggil fungsi updateCartIcon() setiap kali halaman dimuat
// untuk memastikan angka di keranjang selalu update.
document.addEventListener("DOMContentLoaded", function () {
  updateCartIcon();
});
