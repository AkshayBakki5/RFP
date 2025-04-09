// Product data storage
const products = [
    {
        id: 1,
        name: "Run Lite Performance Trainer",
        price: 3499.00,
        description: "High-performance running shoe designed for optimal comfort and speed.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: [
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg", 
            "images/gallery-4.jpg"
        ]
    },
    {
        id: 2,
        name: "Urban Stride Comfort Sneaker",
        price: 4299.00,
        description: "Stylish and comfortable sneaker perfect for urban lifestyle.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: [
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg", 
            "images/gallery-4.jpg"
        ]
    },
    {
        id: 3,
        name: "Flex Zone Training Shoe",
        price: 3799.00,
        description: "Versatile training shoe with advanced flexibility and support.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: [
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg", 
            "images/gallery-4.jpg"
        ]
    },
    {
        id: 4,
        name: "Pro Grip Athletic Runner",
        price: 4599.00,
        description: "Professional-grade running shoe with superior grip and cushioning.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: [
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg", 
            "images/gallery-4.jpg"
        ]
    },
    {
        id: 5,
        name: "Street Style Classic Trainer",
        price: 3999.00,
        description: "Classic street-style trainer with modern comfort features.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: [
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg", 
            "images/gallery-4.jpg"
        ]
    },
    {
        id: 6,
        name: "Tempo Max Performance Shoe",
        price: 4199.00,
        description: "High-intensity performance shoe for maximum athletic output.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: [
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg", 
            "images/gallery-4.jpg"
        ]
    },
    {
        id: 7,
        name: "Lite Stride Comfort Sneaker",
        price: 3650.00,
        description: "Lightweight comfort sneaker for everyday wear.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: [
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg", 
            "images/gallery-4.jpg"
        ]
    }
];

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, size, quantity) {
    // Check if product already in cart
    const existingProductIndex = cart.findIndex(
        item => item.id === product.id && item.size === size
    );

    if (existingProductIndex > -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: quantity
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function renderProductDetails() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Find product
    const product = products.find(p => p.id === productId);

    if (product) {
        // Update product details
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `₹${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;

        // Populate size dropdown
        const sizeSelect = document.getElementById('size-select');
        sizeSelect.innerHTML = '<option>Select Size</option>';
        product.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });

        // Update gallery images
        const mainImage = document.getElementById('product-img');
        const smallImgContainer = document.querySelector('.small-img-row');
        
        mainImage.src = product.images[0];
        
        smallImgContainer.innerHTML = '';
        product.images.forEach(imageSrc => {
            const imgCol = document.createElement('div');
            imgCol.className = 'small-img-col';
            const img = document.createElement('img');
            img.src = imageSrc;
            img.width = '100%';
            img.className = 'small-img';
            img.onclick = () => {
                mainImage.src = imageSrc;
            };
            imgCol.appendChild(img);
            smallImgContainer.appendChild(imgCol);
        });

        // Add to cart event listener
        document.getElementById('add-to-cart-btn').onclick = () => {
            const sizeSelect = document.getElementById('size-select');
            const quantityInput = document.getElementById('quantity-input');
            
            if (sizeSelect.value === 'Select Size') {
                alert('Please select a size');
                return;
            }

            addToCart(
                product, 
                sizeSelect.value, 
                parseInt(quantityInput.value)
            );
        };
    }
}

function renderCartPage() {
    const cartTableBody = document.querySelector('.cart-page table');
    const totalPriceTable = document.querySelector('.total-price table');

    if (cartTableBody && totalPriceTable) {
        // Clear existing cart rows
        while (cartTableBody.rows.length > 1) {
            cartTableBody.deleteRow(1);
        }

        let subtotal = 0;

        // Populate cart
        cart.forEach((item, index) => {
            const row = cartTableBody.insertRow(-1);
            
            const productCell = row.insertCell(0);
            productCell.innerHTML = `
                <div class="cart-info">
                    <img src="images/product-${item.id}.jpg">
                    <div>
                        <p>${item.name}</p>
                        <small>Price: ₹${item.price.toFixed(2)}</small>
                        <small>Size: ${item.size}</small>
                        <a href="#" onclick="removeFromCart(${index})">Remove</a>
                    </div>
                </div>
            `;

            const quantityCell = row.insertCell(1);
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = 1;
            quantityInput.onchange = () => updateQuantity(index, quantityInput.value);
            quantityCell.appendChild(quantityInput);

            const subtotalCell = row.insertCell(2);
            const itemSubtotal = item.price * item.quantity;
            subtotalCell.textContent = `₹${itemSubtotal.toFixed(2)}`;
            subtotal += itemSubtotal;
        });

        // Update price summary
        const tax = subtotal * 0.18;
        const total = subtotal + tax;

        totalPriceTable.rows[0].cells[1].textContent = `₹${subtotal.toFixed(2)}`;
        totalPriceTable.rows[1].cells[1].textContent = `₹${tax.toFixed(2)}`;
        totalPriceTable.rows[2].cells[1].textContent = `₹${total.toFixed(2)}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartPage();
    updateCartDisplay();
}

function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartPage();
    updateCartDisplay();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on and call appropriate function
    if (document.getElementById('product-name')) {
        renderProductDetails();
    }
    
    if (document.querySelector('.cart-page')) {
        renderCartPage();
    }

    updateCartDisplay();
});




document.addEventListener('DOMContentLoaded', () => {
    const MenuItems = document.getElementById("MenuItems");
    if (MenuItems) {
        MenuItems.style.maxHeight = "0px";
    }

    const ProductImg = document.getElementById("product-img");
    const SmallImg = document.getElementsByClassName("small-img");
    if (ProductImg && SmallImg.length) {
        Array.from(SmallImg).forEach(img => {
            img.onclick = function() {
                ProductImg.src = this.src;
            };
        });
    }

    const productContainers = document.querySelectorAll('.col-4');
    productContainers.forEach(container => {
        const productId = container.getAttribute('data-id');
        if (productId) {
            container.querySelector('img').addEventListener('click', () => {
                window.location.href = `product-detail.html?id=${productId}`;
            });
            container.querySelector('h4').addEventListener('click', () => {
                window.location.href = `product-detail.html?id=${productId}`;
            });
        }
    });
});

function menutoggle() {
    const MenuItems = document.getElementById("MenuItems");
    if (MenuItems) {
        MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "200px" : "0px";
    }
}