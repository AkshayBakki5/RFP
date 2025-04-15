const products = [
    {
        id: 1,
        name: "Run Lite Performance Trainer",
        price: 3499.00,
        description: "High-performance running shoe designed for optimal comfort and speed.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/product-1.jpg", "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg"],
        category: "running",
        rating: 4
    },
    {
        id: 2,
        name: "Urban Stride Comfort Sneaker",
        price: 4299.00,
        description: "Stylish and comfortable sneaker perfect for urban lifestyle.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/product-2.jpg", "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg"],
        category: "casual",
        rating: 4
    },
    {
        id: 3,
        name: "Flex Zone Training Shoe",
        price: 3799.00,
        description: "Versatile training shoe with advanced flexibility and support.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/product-3.jpg", "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg"],
        category: "training",
        rating: 3.5
    },
    {
        id: 4,
        name: "Pro Grip Athletic Runner",
        price: 4599.00,
        description: "Professional-grade running shoe with superior grip and cushioning.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/product-4.jpg", "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg"],
        category: "running",
        rating: 4.5
    },
    {
        id: 5,
        name: "Street Style Classic Trainer",
        price: 3999.00,
        description: "Classic street-style trainer with modern comfort features.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/product-5.jpg", "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg"],
        category: "casual",
        rating: 4
    },
    {
        id: 6,
        name: "Tempo Max Performance Shoe",
        price: 4199.00,
        description: "High-intensity performance shoe for maximum athletic output.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/product-6.jpg", "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg"],
        category: "training",
        rating: 4
    },
    {
        id: 7,
        name: "Lite Stride Comfort Sneaker",
        price: 3650.00,
        description: "Lightweight comfort sneaker for everyday wear.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/product-7.jpg", "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg"],
        category: "casual",
        rating: 3.5
    },
    {
        id: 8,
        name: "Nike Air Jordan",
        price: 7999.00,
        description: "Iconic basketball shoe with Air cushioning for ultimate performance.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/exclusive-shoe.png", "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg"],
        category: "basketball",
        rating: 4.8
    }
];

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, size, quantity) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: quantity,
            image: product.images[0]
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    alert(`${product.name} added to cart!`);
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Rating stars generator
function generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fa fa-star" aria-hidden="true"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
        } else {
            stars += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
    }
    return stars;
}

// Menu toggle
function shoeMenuToggle() {
    const MenuItems = document.getElementById("MenuItems");
    if (MenuItems) {
        MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "200px" : "0px";
    }
}

// Enhanced Search functionality with Shoes Collections API
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchSuggestions = document.getElementById('search-suggestions');

    if (!searchInput || !searchBtn || !searchSuggestions) return;

    async function showSuggestions() {
        const searchTerm = searchInput.value.toLowerCase();
        searchSuggestions.innerHTML = '';
        if (searchTerm.length < 2) return;

        try {
            const response = await fetch('https://shoes-collections.p.rapidapi.com/shoes', {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                    'x-rapidapi-key': '4564b6ff18msh0fefc0e82b3159ap1c1970jsn0d1a6116bde5'
                }
            });
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            const suggestions = data
                .filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                )
                .slice(0, 5);

            suggestions.forEach(product => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.className = 'suggestion-item';
                suggestionDiv.innerHTML = `
                    <img src="${product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}" alt="${product.name}">
                    <span>${product.name}</span>
                    <small>₹${product.price.toFixed(2)}</small>
                `;
                suggestionDiv.addEventListener('click', () => {
                    window.location.href = `shoe-product-detail.html?id=${product.id}`;
                });
                searchSuggestions.appendChild(suggestionDiv);
            });
        } catch (error) {
            console.error('Search API error:', error);
            // Fallback to local search
            const localSuggestions = products
                .filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                )
                .slice(0, 5);
            localSuggestions.forEach(product => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.className = 'suggestion-item';
                suggestionDiv.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}">
                    <span>${product.name}</span>
                    <small>₹${product.price.toFixed(2)}</small>
                `;
                suggestionDiv.addEventListener('click', () => {
                    window.location.href = `shoe-product-detail.html?id=${product.id}`;
                });
                searchSuggestions.appendChild(suggestionDiv);
            });
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        window.location.href = `shoe-products.html?search=${encodeURIComponent(searchTerm)}`;
        searchSuggestions.innerHTML = '';
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    searchInput.addEventListener('input', showSuggestions);
    document.addEventListener('click', (e) => {
        if (!searchSuggestions.contains(e.target) && e.target !== searchInput) {
            searchSuggestions.innerHTML = '';
        }
    });
}

// Fetch products from Shoes Collections API
async function fetchProducts(type) {
    try {
        const response = await fetch('https://shoes-collections.p.rapidapi.com/shoes', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                'x-rapidapi-key': '4564b6ff18msh0fefc0e82b3159ap1c1970jsn0d1a6116bde5'
            }
        });
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        let data = await response.json();

        // Filter based on page type
        let filteredProducts = data;
        if (type === 'new-arrivals') {
            // Sort by ID descending (assuming higher IDs are newer)
            filteredProducts = data.sort((a, b) => b.id - a.id).slice(0, 8);
        } else if (type === 'best-sellers') {
            // Simulate best sellers by higher price
            filteredProducts = data.sort((a, b) => b.price - a.price).slice(0, 8);
        } else if (type === 'sale') {
            // Simulate sale by lower price
            filteredProducts = data
                .map(p => ({ ...p, price: p.price * 0.8 }))
                .sort((a, b) => a.price - b.price)
                .slice(0, 8);
        }

        // Map API data to your product structure
        return filteredProducts.map(p => ({
            id: p.id,
            name: p.name || 'Shoe',
            price: p.price || 3000.00,
            description: p.description || 'Comfortable and stylish shoe.',
            sizes: p.sizes || ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
            images: [p.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
            category: p.category || 'general',
            rating: p.rating || 4
        }));
    } catch (error) {
        console.error('Error fetching API data:', error);
        // Fallback to local products
        let fallbackProducts = [...products];
        if (type === 'new-arrivals') {
            fallbackProducts = fallbackProducts.slice(0, 4);
        } else if (type === 'best-sellers') {
            fallbackProducts = fallbackProducts.filter(p => p.rating >= 4).slice(0, 4);
        } else if (type === 'sale') {
            fallbackProducts = fallbackProducts.map(p => ({
                ...p,
                price: p.price * 0.8
            })).slice(0, 4);
        }
        return fallbackProducts;
    }
}

// Render Product List (for shoe-products, new-arrivals, best-sellers, sale)
function renderProductListPage(type = 'all') {
    const productList = document.getElementById('shoe-list');
    const sortSelect = document.getElementById('sort-select');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 8;
    let currentPage = 1;

    async function renderProducts() {
        let productsToRender = type === 'all' ? await fetchProducts('all') : await fetchProducts(type);
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');

        if (searchTerm) {
            document.getElementById('search-input').value = searchTerm;
            productsToRender = productsToRender.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                let sortedProducts = [...productsToRender];
                switch (sortSelect.value) {
                    case 'price-asc':
                        sortedProducts.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-desc':
                        sortedProducts.sort((a, b) => b.price - a.price);
                        break;
                    case 'name':
                        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    default:
                        sortedProducts = [...productsToRender];
                        break;
                }
                currentPage = 1;
                displayProducts(sortedProducts);
                setupPagination(sortedProducts);
            });
        }

        displayProducts(productsToRender);
        setupPagination(productsToRender);
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProducts = products.slice(start, end);

        paginatedProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'col-4';
            productDiv.setAttribute('data-id', product.id);
            productDiv.innerHTML = `
                <a href="shoe-product-detail.html?id=${product.id}">
                    <img src="${product.images[0]}" alt="${product.name}">
                    <h4>${product.name}</h4>
                </a>
                <div class="rating">
                    ${generateRatingStars(product.rating)}
                </div>
                <p>₹${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.getAttribute('data-id');
                fetch(`https://shoes-collections.p.rapidapi.com/shoes/${productId}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                        'x-rapidapi-key': '4564b6ff18msh0fefc0e82b3159ap1c1970jsn0d1a6116bde5'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    const product = {
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        sizes: data.sizes || ['US 7', 'US 8', 'US 9', 'US 10'],
                        images: [data.image]
                    };
                    addToCart(product, product.sizes[0], 1);
                })
                .catch(() => {
                    const product = products.find(p => p.id === parseInt(productId));
                    if (product) addToCart(product, product.sizes[0], 1);
                });
            });
        });
    }

    function setupPagination(products) {
        if (!pagination) return;
        pagination.innerHTML = '';
        const pageCount = Math.ceil(products.length / itemsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            span.addEventListener('click', () => {
                currentPage = i;
                displayProducts(products);
                updatePagination();
            });
            pagination.appendChild(span);
        }
        updatePagination();
    }

    function updatePagination() {
        if (!pagination) return;
        pagination.querySelectorAll('span').forEach((span, index) => {
            span.classList.toggle('active', index + 1 === currentPage);
        });
    }

    renderProducts();
}

// Shoe Detail Page
function renderShoeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const shoeId = urlParams.get('id');

    fetch(`https://shoes-collections.p.rapidapi.com/shoes/${shoeId}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
            'x-rapidapi-key': '4564b6ff18msh0fefc0e82b3159ap1c1970jsn0d1a6116bde5'
        }
    })
    .then(res => res.json())
    .then(data => {
        const shoe = {
            id: data.id,
            name: data.name || 'Shoe',
            price: data.price || 3000.00,
            description: data.description || 'Comfortable and stylish shoe.',
            sizes: data.sizes || ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
            images: [data.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
            category: data.category || 'general',
            rating: data.rating || 4
        };

        document.getElementById('shoe-name').textContent = shoe.name;
        document.getElementById('shoe-price').textContent = `₹${shoe.price.toFixed(2)}`;
        document.getElementById('shoe-description').textContent = shoe.description;
        document.getElementById('shoe-img').src = shoe.images[0];

        const sizeSelect = document.getElementById('size-select');
        sizeSelect.innerHTML = '<option>Select Size</option>';
        shoe.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });

        const smallImgRow = document.getElementById('small-img-row');
        smallImgRow.innerHTML = '';
        shoe.images.forEach(image => {
            const imgCol = document.createElement('div');
            imgCol.className = 'small-img-col';
            imgCol.innerHTML = `<img src="${image}" width="100%" class="small-img">`;
            imgCol.querySelector('.small-img').addEventListener('click', () => {
                document.getElementById('shoe-img').src = image;
            });
            smallImgRow.appendChild(imgCol);
        });

        document.getElementById('add-to-cart-btn').onclick = (e) => {
            e.preventDefault();
            const size = sizeSelect.value;
            const quantity = parseInt(document.getElementById('quantity-input').value);
            if (size === 'Select Size') {
                alert('Please select a size');
                return;
            }
            addToCart(shoe, size, quantity);
        };

        // Related shoes
        fetch('https://shoes-collections.p.rapidapi.com/shoes', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                'x-rapidapi-key': '4564b6ff18msh0fefc0e82b3159ap1c1970jsn0d1a6116bde5'
            }
        })
        .then(res => res.json())
        .then(data => {
            const related = data
                .filter(s => s.id !== shoe.id && (!shoe.category || s.category === shoe.category))
                .sort(() => 0.5 - Math.random())
                .slice(0, 4)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    images: [p.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
                    category: p.category,
                    rating: p.rating || 4
                }));

            const relatedShoesContainer = document.getElementById('related-shoes');
            relatedShoesContainer.innerHTML = '';
            related.forEach(s => {
                const shoeDiv = document.createElement('div');
                shoeDiv.className = 'col-4';
                shoeDiv.setAttribute('data-id', s.id);
                shoeDiv.innerHTML = `
                    <a href="shoe-product-detail.html?id=${s.id}">
                        <img src="${s.images[0]}">
                        <h4>${s.name}</h4>
                    </a>
                    <div class="rating">
                        ${generateRatingStars(s.rating)}
                    </div>
                    <p>₹${s.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-id="${s.id}">Add to Cart</button>
                `;
                relatedShoesContainer.appendChild(shoeDiv);
            });

            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = button.getAttribute('data-id');
                    fetch(`https://shoes-collections.p.rapidapi.com/shoes/${id}`, {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                            'x-rapidapi-key': '4564b6ff18msh0fefc0e82b3159ap1c1970jsn0d1a6116bde5'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        const relatedShoe = {
                            id: data.id,
                            name: data.name,
                            price: data.price,
                            sizes: data.sizes || ['US 7', 'US 8', 'US 9', 'US 10'],
                            images: [data.image]
                        };
                        addToCart(relatedShoe, relatedShoe.sizes[0], 1);
                    });
                });
            });
        });
    })
    .catch(error => {
        console.error('Error fetching shoe details:', error);
        // Fallback to local products
        const shoe = products.find(s => s.id === parseInt(shoeId)) || products[0];
        document.getElementById('shoe-name').textContent = shoe.name;
        document.getElementById('shoe-price').textContent = `₹${shoe.price.toFixed(2)}`;
        document.getElementById('shoe-description').textContent = shoe.description;
        document.getElementById('shoe-img').src = shoe.images[0];

        const sizeSelect = document.getElementById('size-select');
        sizeSelect.innerHTML = '<option>Select Size</option>';
        shoe.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });

        const smallImgRow = document.getElementById('small-img-row');
        smallImgRow.innerHTML = '';
        shoe.images.forEach(image => {
            const imgCol = document.createElement('div');
            imgCol.className = 'small-img-col';
            imgCol.innerHTML = `<img src="${image}" width="100%" class="small-img">`;
            imgCol.querySelector('.small-img').addEventListener('click', () => {
                document.getElementById('shoe-img').src = image;
            });
            smallImgRow.appendChild(imgCol);
        });

        document.getElementById('add-to-cart-btn').onclick = (e) => {
            e.preventDefault();
            const size = sizeSelect.value;
            const quantity = parseInt(document.getElementById('quantity-input').value);
            if (size === 'Select Size') {
                alert('Please select a size');
                return;
            }
            addToCart(shoe, size, quantity);
        };

        // Related shoes
        const relatedShoesContainer = document.getElementById('related-shoes');
        const related = products
            .filter(s => s.id !== shoe.id && s.category === shoe.category)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        relatedShoesContainer.innerHTML = '';
        related.forEach(s => {
            const shoeDiv = document.createElement('div');
            shoeDiv.className = 'col-4';
            shoeDiv.setAttribute('data-id', s.id);
            shoeDiv.innerHTML = `
                <a href="shoe-product-detail.html?id=${s.id}">
                    <img src="${s.images[0]}">
                    <h4>${s.name}</h4>
                </a>
                <div class="rating">
                    ${generateRatingStars(s.rating)}
                </div>
                <p>₹${s.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${s.id}">Add to Cart</button>
            `;
            relatedShoesContainer.appendChild(shoeDiv);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(button.getAttribute('data-id'));
                const relatedShoe = products.find(s => s.id === id);
                if (relatedShoe) {
                    addToCart(relatedShoe, relatedShoe.sizes[0], 1);
                }
            });
        });
    });
}

// Cart Page
function renderCartPage() {
    const cartTable = document.querySelector('.cart-page table');
    const totalPriceTable = document.querySelector('.total-price table');

    if (cartTable && totalPriceTable) {
        let html = `
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
        `;
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `
                <tr>
                    <td>
                        <div class="cart-info">
                            <img src="${item.image}">
                            <div>
                                <p>${item.name}</p>
                                <small>Price: ₹${item.price.toFixed(2)}</small>
                                <small>Size: ${item.size}</small>
                                <a href="#" onclick="removeFromCart(${index}); return false;">Remove</a>
                            </div>
                        </div>
                    </td>
                    <td><input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${index}, this.value)"></td>
                    <td>₹${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });

        cartTable.innerHTML = html;
        const tax = subtotal * 0.18;
        const total = subtotal + tax;
        totalPriceTable.innerHTML = `
            <tr>
                <td>Subtotal</td>
                <td>₹${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Tax (18%)</td>
                <td>₹${tax.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>₹${total.toFixed(2)}</td>
            </tr>
        `;
    }
}

// Payment Page
function renderPaymentPage() {
    const summaryDetails = document.querySelector('.summary-details');
    const subtotalElement = document.getElementById('summary-subtotal');
    const taxElement = document.getElementById('summary-tax');
    const totalElement = document.getElementById('summary-total');

    if (summaryDetails && subtotalElement && taxElement && totalElement) {
        let subtotal = 0;
        summaryDetails.innerHTML = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            summaryDetails.innerHTML += `
                <div class="summary-item">
                    <p>${item.name} (x${item.quantity})</p>
                    <p>₹${itemTotal.toFixed(2)}</p>
                </div>
            `;
        });

        const tax = subtotal * 0.18;
        const total = subtotal + tax;
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        taxElement.textContent = `₹${tax.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }
}

function completePayment() {
    const form = document.getElementById('payment-form');
    if (form && form.checkValidity()) {
        alert('Payment successful! Order placed.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all required fields.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    updateCartDisplay();

    if (document.getElementById('shoe-list')) {
        const pageType = window.location.pathname.includes('new-arrivals') ? 'new-arrivals' :
                         window.location.pathname.includes('best-sellers') ? 'best-sellers' :
                         window.location.pathname.includes('sale-shoes') ? 'sale' : 'all';
        renderProductListPage(pageType);
    } else if (document.getElementById('shoe-name')) {
        renderShoeDetails();
    } else if (document.querySelector('.cart-page')) {
        renderCartPage();
    } else if (document.querySelector('.payment-page')) {
        renderPaymentPage();
    }

    const logoutLink = document.getElementById('logout-link');
    const accountLink = document.querySelector('a[href="account.html"]');
    if (checkLoginStatus()) {
        if (logoutLink) logoutLink.style.display = 'block';
        if (accountLink) accountLink.style.display = 'none';
    } else {
        if (logoutLink) logoutLink.style.display = 'none';
        if (accountLink) accountLink.style.display = 'block';
    }
});