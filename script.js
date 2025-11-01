document.addEventListener('DOMContentLoaded', () => {

    // --- (1) EDIT BAGIAN INI ---
    
    // Masukkan nomor WhatsApp Anda (diawali 62, tanpa + atau 0)
    const nomorWhatsApp = '6281234567890'; 

    // Daftar produk Anda
    // Ganti dengan produk, harga, dan gambar Anda
    const products = [
        { 
            id: 1, 
            name: 'Jasa 1000 Followers', 
            price: 50000, 
            image: 'https://via.placeholder.com/300x200.png?text=Jasa+Sosmed' // Ganti URL gambar
        },
        { 
            id: 2, 
            name: 'Aplikasi Premium (1 Bulan)', 
            price: 25000, 
            image: 'https://via.placeholder.com/300x200.png?text=Produk+Digital' // Ganti URL gambar
        },
        { 
            id: 3, 
            name: 'Kelas Murid (Basic)', 
            price: 150000, 
            image: 'https://via.placeholder.com/300x200.png?text=Kelas+Murid' // Ganti URL gambar
        },
        { 
            id: 4, 
            name: 'Jasa 500 Likes', 
            price: 15000, 
            image: 'https://via.placeholder.com/300x200.png?text=Jasa+Likes' // Ganti URL gambar
        },
        // Tambahkan produk lain di sini
    ];

    // --- AKHIR BAGIAN EDIT ---


    let cart = []; // Keranjang belanja
    const productList = document.getElementById('product-list');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Fungsi untuk mengubah angka menjadi format Rupiah
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    }

    // Fungsi untuk menampilkan semua produk
    function displayProducts() {
        productList.innerHTML = ''; // Kosongkan daftar produk
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${formatRupiah(product.price)}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        + Tambah ke Keranjang
                    </button>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    // Fungsi untuk menampilkan isi keranjang
    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<p>Keranjang masih kosong.</p>';
            cartTotalEl.textContent = formatRupiah(0);
            return;
        }

        cartItemsEl.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${formatRupiah(item.price)}</span>
                <button class="remove-item-btn" data-index="${index}">X</button>
            `;
            cartItemsEl.appendChild(cartItem);
        });

        cartTotalEl.textContent = formatRupiah(total);
    }

    // Fungsi untuk menambah produk ke keranjang
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCartDisplay();
        }
    }

    // Fungsi untuk menghapus produk dari keranjang
    function removeFromCart(index) {
        cart.splice(index, 1); // Hapus 1 item pada index yg dipilih
        updateCartDisplay();
    }

    // Fungsi untuk proses Checkout ke WhatsApp
    function checkout() {
        if (cart.length === 0) {
            alert('Keranjang Anda masih kosong!');
            return;
        }

        let message = 'Halo, saya mau pesan:\n\n';
        let total = 0;

        cart.forEach(item => {
            message += `- ${item.name} (${formatRupiah(item.price)})\n`;
            total += item.price;
        });

        message += `\n*Total : ${formatRupiah(total)}*`;
        message += '\n\nMohon info untuk proses pembayarannya. Terima kasih.';

        // Buat link WhatsApp
        const waLink = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(message)}`;
        
        // Arahkan pengguna ke WhatsApp
        window.open(waLink, '_blank');
    }

    // Menambahkan event listener
    
    // 1. Saat tombol "Tambah ke Keranjang" diklik
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        }
    });

    // 2. Saat tombol "Hapus" (X) di keranjang diklik
    cartItemsEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(index);
        }
    });

    // 3. Saat tombol "Beli Sekarang" diklik
    checkoutBtn.addEventListener('click', checkout);

    // Tampilkan produk saat halaman pertama kali dimuat
    displayProducts();
});
