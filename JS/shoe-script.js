let cart = JSON.parse(localStorage.getItem('cart')) || [];
let promoDiscount = 0;
let appliedPromoCode = '';

const products = [
    {
        id: 1,
        name: "Run Lite Performance Trainer",
        price: 3499.00,
        discountPrice: 2799.20, // 20% off
        description: "High-performance running shoe designed for optimal comfort and speed.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/p1.webp", "images/p1-1.webp", "images/p1-2.webp", "images/p1-3.webp"],
        category: "running",
        rating: 4,
        stock: 10
    },
    {
        id: 2,
        name: "Urban Stride Comfort Sneaker",
        price: 4299.00,
        discountPrice: 3439.20,
        description: "Stylish and comfortable sneaker perfect for urban lifestyle.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/p2.webp", "images/p2-1.webp", "images/p2-2.webp", "images/p2-3.webp"],
        category: "casual",
        rating: 4,
        stock: 15
    },
    {
        id: 3,
        name: "Flex Zone Training Shoe",
        price: 3799.00,
        discountPrice: 3039.20,
        description: "Versatile training shoe with advanced flexibility and support.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/p3.webp", "images/p3-1.webp", "images/p3-2.webp", "images/p3-3.webp"],
        category: "training",
        rating: 3.5,
        stock: 8
    },
    {
        id: 4,
        name: "Pro Grip Athletic Runner",
        price: 4599.00,
        discountPrice: 3679.20,
        description: "Professional-grade running shoe with superior grip and cushioning.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/p4.webp", "images/p4-1.webp", "images/p4-2.webp", "images/p4-3.webp"],
        category: "running",
        rating: 4.5,
        stock: 12
    },
    {
        id: 5,
        name: "Street Style Classic Trainer",
        price: 3999.00,
        discountPrice: 3199.20,
        description: "Classic street-style trainer with modern comfort features.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/p5.webp", "images/p5-1.webp", "images/p5-2.webp", "images/p5-3.webp"],
        category: "casual",
        rating: 4,
        stock: 20
    },
    {
        id: 6,
        name: "Tempo Max Performance Shoe",
        price: 4199.00,
        discountPrice: 3359.20,
        description: "High-intensity performance shoe for maximum athletic output.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/p6.webp", "images/p6-1.webp", "images/p6-2.webp", "images/p6-3.webp"],
        category: "training",
        rating: 4,
        stock: 5
    },
    {
        id: 7,
        name: "Lite Stride Comfort Sneaker",
        price: 3650.00,
        discountPrice: 2920.00,
        description: "Lightweight comfort sneaker for everyday wear.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/p7.webp", "images/p7-1.webp", "images/p7-2.webp", "images/p7-3.webp"],
        category: "casual",
        rating: 3.5,
        stock: 18
    },
    {
        id: 8,
        name: "Nike Air Jordan",
        price: 7999.00,
        discountPrice: 6399.20,
        description: "Iconic basketball shoe with Air cushioning for ultimate performance.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        images: ["images/p8.webp", "images/p8-1.webp", "images/p8-2.webp", "images/p8-3.webp"],
        category: "basketball",
        rating: 4.8,
        stock: 3
    }
];

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

function addToCart(product, size, quantity) {
    if (product.stock < quantity) {
        alert(`Sorry, only ${product.stock} units of ${product.name} are in stock.`);
        return;
    }
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
            alert(`Cannot add more than ${product.stock} units of ${product.name} to cart.`);
            return;
        }
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            size: size,
            quantity: quantity,
            image: product.images[0]
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    alert(`${product.name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    renderCartPage();
}

function updateCartQuantity(index, quantity) {
    const product = products.find(p => p.id === cart[index].id) || { stock: 10 };
    quantity = parseInt(quantity);
    if (quantity > product.stock) {
        alert(`Cannot add more than ${product.stock} units of ${cart[index].name} to cart.`);
        cart[index].quantity = product.stock;
    } else if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    renderCartPage();
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function shoeMenuToggle() {
    const MenuItems = document.getElementById("MenuItems");
    if (MenuItems) {
        MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "200px" : "0px";
    }
}

async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.status === 429 && i < retries - 1) {
                console.warn(`Rate limit hit, retrying after ${delay * Math.pow(2, i)}ms`);
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
                continue;
            }
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
        }
    }
}

async function fetchProducts(type = 'all') {
    const productList = document.getElementById('shoe-list');
    if (productList) {
        productList.innerHTML = '<div class="loader">Loading...</div>';
    }
    try {
        const cacheKey = `shoeCache_${type}`;
        const cache = JSON.parse(localStorage.getItem(cacheKey)) || {};
        if (cache.data && Date.now() - cache.timestamp < 3600000) {
            console.log(`Using cached data for ${type}`);
            if (productList) productList.innerHTML = '';
            return cache.data;
        }

        const data = await fetchWithRetry('https://shoes-collections.p.rapidapi.com/shoes', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                'x-rapidapi-key': 'YOUR_NEW_API_KEY_HERE'
            }
        });
        console.log('API response for products:', data);

        let filteredProducts = data;
        if (type === 'new-arrivals') {
            filteredProducts = data.sort((a, b) => b.id - a.id).slice(0, 8);
        } else if (type === 'best-sellers') {
            filteredProducts = data.sort((a, b) => (b.rating || 4) - (a.rating || 4)).slice(0, 8);
        } else if (type === 'sale') {
            filteredProducts = data
                .map(p => ({ ...p, price: p.price * 0.8, discountPrice: p.price * 0.64 }))
                .sort((a, b) => a.discountPrice - b.discountPrice)
                .slice(0, 8);
        }

        const mappedProducts = filteredProducts.map(p => ({
            id: p.id,
            name: p.name || 'Shoe',
            price: p.price || 3000.00,
            discountPrice: p.discountPrice || (p.price * 0.8),
            description: p.description || 'Comfortable and stylish shoe.',
            sizes: p.sizes || ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
            images: [p.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
            category: p.category || 'general',
            rating: p.rating || 4,
            stock: p.stock || 10
        }));

        localStorage.setItem(cacheKey, JSON.stringify({
            data: mappedProducts,
            timestamp: Date.now()
        }));

        if (productList) productList.innerHTML = '';
        return mappedProducts;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        if (productList) {
            productList.innerHTML = '<p>Unable to load products from server. Showing available shoes.</p>';
        }
        let fallbackProducts = [...products];
        if (type === 'new-arrivals') {
            fallbackProducts = fallbackProducts.sort((a, b) => b.id - a.id).slice(0, 8);
        } else if (type === 'best-sellers') {
            fallbackProducts = fallbackProducts.sort((a, b) => b.rating - a.rating).slice(0, 8);
        } else if (type === 'sale') {
            fallbackProducts = fallbackProducts.map(p => ({
                ...p,
                discountPrice: p.discountPrice || (p.price * 0.8)
            })).sort((a, b) => a.discountPrice - b.discountPrice).slice(0, 8);
        }
        return fallbackProducts;
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchSuggestions = document.getElementById('search-suggestions');

    if (!searchInput || !searchBtn || !searchSuggestions) return;

    async function showSuggestions() {
        searchSuggestions.innerHTML = '<div class="loader">Loading...</div>';
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length < 2) {
            searchSuggestions.innerHTML = '';
            return;
        }

        try {
            const data = await fetchWithRetry('https://shoes-collections.p.rapidapi.com/shoes', {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                    'x-rapidapi-key': 'YOUR_NEW_API_KEY_HERE'
                }
            });
            console.log('Search API response:', data);
            const suggestions = data
                .filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                )
                .slice(0, 5);

            searchSuggestions.innerHTML = '';
            suggestions.forEach(product => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.className = 'suggestion-item';
                suggestionDiv.innerHTML = `
                    <img src="${product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}" alt="${product.name}">
                    <span>${product.name}</span>
                    <small>₹${(product.discountPrice || product.price * 0.8).toFixed(2)}</small>
                `;
                suggestionDiv.addEventListener('click', () => {
                    window.location.href = `shoe-product-detail.html?id=${product.id}`;
                });
                searchSuggestions.appendChild(suggestionDiv);
            });
        } catch (error) {
            console.error('Search API error:', error.message);
            searchSuggestions.innerHTML = '';
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
                    <small>₹${product.discountPrice.toFixed(2)}</small>
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

function renderProductListPage(type = 'all') {
    const productList = document.getElementById('shoe-list');
    const sortSelect = document.getElementById('sort-select');
    const pagination = document.getElementById('pagination');
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    const itemsPerPage = 8;
    let currentPage = 1;

    async function renderProducts() {
        let productsToRender = await fetchProducts(type);
        if (searchTerm && type === 'all') {
            productsToRender = productsToRender.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                let sortedProducts = [...productsToRender];
                switch (sortSelect.value) {
                    case 'price-asc':
                        sortedProducts.sort((a, b) => a.discountPrice - b.discountPrice);
                        break;
                    case 'price-desc':
                        sortedProducts.sort((a, b) => b.discountPrice - a.discountPrice);
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
        if (!productList) return;
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
                <p><span style="text-decoration: line-through;">₹${product.price.toFixed(2)}</span> ₹${product.discountPrice.toFixed(2)}</p>
                <p>Stock: ${product.stock}</p>
                <button class="add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const productId = button.getAttribute('data-id');
                try {
                    const data = await fetchWithRetry(`https://shoes-collections.p.rapidapi.com/shoes/${productId}`, {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                            'x-rapidapi-key': 'YOUR_NEW_API_KEY_HERE'
                        }
                    });
                    console.log('Product API response:', data);
                    const product = {
                        id: data.id,
                        name: data.name || 'Shoe',
                        price: data.price || 3000.00,
                        discountPrice: data.discountPrice || (data.price * 0.8),
                        sizes: data.sizes || ['US 7', 'US 8', 'US 9', 'US 10'],
                        images: [data.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
                        description: data.description || 'Comfortable and stylish shoe.',
                        category: data.category || 'general',
                        rating: data.rating || 4,
                        stock: data.stock || 10
                    };
                    addToCart(product, product.sizes[0], 1);
                } catch (error) {
                    console.error('Error fetching product:', error.message);
                    const product = products.find(p => p.id === parseInt(productId));
                    if (product) addToCart(product, product.sizes[0], 1);
                }
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

async function renderShoeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const shoeId = urlParams.get('id');
    const shoeContainer = document.querySelector('.single-product');
    if (!shoeId) {
        if (shoeContainer) {
            shoeContainer.innerHTML = '<p>Error: No product ID specified.</p>';
        }
        return;
    }
    if (shoeContainer) {
        shoeContainer.innerHTML = '<div class="loader">Loading...</div>';
    }

    try {
        const cacheKey = `shoeCache_${shoeId}`;
        const cache = JSON.parse(localStorage.getItem(cacheKey)) || {};
        if (cache.data && Date.now() - cache.timestamp < 3600000) {
            console.log(`Using cached data for shoe ${shoeId}`);
            if (shoeContainer) shoeContainer.innerHTML = '';
            displayShoeDetails(cache.data);
            const related = (await fetchProducts())
                .filter(s => s.id !== cache.data.id && s.category === cache.data.category)
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
            displayRelatedShoes(related);
            return;
        }

        const data = await fetchWithRetry(`https://shoes-collections.p.rapidapi.com/shoes/${shoeId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                'x-rapidapi-key': 'YOUR_NEW_API_KEY_HERE'
            }
        });
        console.log('Shoe API response:', data);
        const shoe = {
            id: data.id,
            name: data.name || 'Shoe',
            price: data.price || 3000.00,
            discountPrice: data.discountPrice || (data.price * 0.8),
            description: data.description || 'Comfortable and stylish shoe.',
            sizes: data.sizes || ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
            images: [data.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', ...products[0].images.slice(1)],
            category: data.category || 'general',
            rating: data.rating || 4,
            stock: data.stock || 10
        };

        localStorage.setItem(cacheKey, JSON.stringify({
            data: shoe,
            timestamp: Date.now()
        }));

        if (shoeContainer) shoeContainer.innerHTML = '';
        displayShoeDetails(shoe);

        const related = (await fetchProducts())
            .filter(s => s.id !== shoe.id && s.category === shoe.category)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
        displayRelatedShoes(related);
    } catch (error) {
        console.error('Error fetching shoe details:', error.message);
        if (shoeContainer) {
            shoeContainer.innerHTML = '<p>Unable to load product details. Showing available shoe.</p>';
        }
        const shoe = products.find(s => s.id === parseInt(shoeId)) || products[0];
        displayShoeDetails(shoe);

        const related = products
            .filter(s => s.id !== shoe.id && s.category === shoe.category)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
        displayRelatedShoes(related);
    }
}

function displayShoeDetails(shoe) {
    const shoeContainer = document.querySelector('.single-product');
    if (shoeContainer) {
        shoeContainer.innerHTML = `
            <div class="row">
                <div class="col-2">
                    <img src="${shoe.images[0]}" width="100%" id="shoe-img">
                    <div class="small-img-row" id="small-img-row">
                        <!-- Additional images will be populated here -->
                    </div>
                </div>
                <div class="col-2">
                    <p>Home / Shoes</p>
                    <h1 id="shoe-name">${shoe.name}</h1>
                    <h4 id="shoe-price"><span style="text-decoration: line-through;">₹${shoe.price.toFixed(2)}</span> ₹${shoe.discountPrice.toFixed(2)}</h4>
                    <div class="rating" id="shoe-rating">
                        ${generateRatingStars(shoe.rating)}
                    </div>
                    <p>Stock: ${shoe.stock}</p>
                    <select id="size-select">
                        <option>Select Size</option>
                    </select>
                    <input type="number" value="1" min="1" id="quantity-input">
                    <a href="#" class="btn" id="add-to-cart-btn" ${shoe.stock === 0 ? 'style="background: #ccc; cursor: not-allowed;"' : ''}>Add to Cart</a>
                    <h3>Product Details <i class="fa fa-indent" aria-hidden="true"></i></h3>
                    <br>
                    <p id="shoe-description">${shoe.description}</p>
                </div>
            </div>
        `;
    }

    const sizeSelect = document.getElementById('size-select');
    shoe.sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    const smallImgRow = document.getElementById('small-img-row');
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
        if (shoe.stock === 0) {
            alert('This item is out of stock.');
            return;
        }
        const size = sizeSelect.value;
        const quantity = parseInt(document.getElementById('quantity-input').value);
        if (size === 'Select Size') {
            alert('Please select a size');
            return;
        }
        addToCart(shoe, size, quantity);
    };
}

function displayRelatedShoes(related) {
    const relatedShoesContainer = document.getElementById('related-shoes');
    if (!relatedShoesContainer) return;
    relatedShoesContainer.innerHTML = '';
    related.forEach(s => {
        const shoeDiv = document.createElement('div');
        shoeDiv.className = 'col-4';
        shoeDiv.setAttribute('data-id', s.id);
        shoeDiv.innerHTML = `
            <a href="shoe-product-detail.html?id=${s.id}">
                <img src="${s.images[0]}" alt="${s.name}">
                <h4>${s.name}</h4>
            </a>
            <div class="rating">
                ${generateRatingStars(s.rating)}
            </div>
            <p><span style="text-decoration: line-through;">₹${s.price.toFixed(2)}</span> ₹${s.discountPrice.toFixed(2)}</p>
            <p>Stock: ${s.stock}</p>
            <button class="add-to-cart-btn" data-id="${s.id}" ${s.stock === 0 ? 'disabled' : ''}>Add to Cart</button>
        `;
        relatedShoesContainer.appendChild(shoeDiv);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = button.getAttribute('data-id');
            try {
                const data = await fetchWithRetry(`https://shoes-collections.p.rapidapi.com/shoes/${id}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                        'x-rapidapi-key': 'YOUR_NEW_API_KEY_HERE'
                    }
                });
                console.log('Related shoe API response:', data);
                const relatedShoe = {
                    id: data.id,
                    name: data.name || 'Shoe',
                    price: data.price || 3000.00,
                    discountPrice: data.discountPrice || (data.price * 0.8),
                    sizes: data.sizes || ['US 7', 'US 8', 'US 9', 'US 10'],
                    images: [data.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
                    description: data.description || 'Comfortable and stylish shoe.',
                    category: data.category || 'general',
                    rating: data.rating || 4,
                    stock: data.stock || 10
                };
                addToCart(relatedShoe, relatedShoe.sizes[0], 1);
            } catch (error) {
                console.error('Error fetching related shoe:', error.message);
                const relatedShoe = products.find(s => s.id === parseInt(id));
                if (relatedShoe) addToCart(relatedShoe, relatedShoe.sizes[0], 1);
            }
        });
    });
}

async function renderFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    if (!featuredProductsContainer) return;
    featuredProductsContainer.innerHTML = '<div class="loader">Loading...</div>';

    try {
        const productsToRender = (await fetchProducts('best-sellers')).slice(0, 4);
        featuredProductsContainer.innerHTML = '';
        productsToRender.forEach(product => {
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
                <p><span style="text-decoration: line-through;">₹${product.price.toFixed(2)}</span> ₹${product.discountPrice.toFixed(2)}</p>
                <p>Stock: ${product.stock}</p>
                <button class="add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>Add to Cart</button>
            `;
            featuredProductsContainer.appendChild(productDiv);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const productId = button.getAttribute('data-id');
                try {
                    const data = await fetchWithRetry(`https://shoes-collections.p.rapidapi.com/shoes/${productId}`, {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                            'x-rapidapi-key': 'YOUR_NEW_API_KEY_HERE'
                        }
                    });
                    console.log('Featured product API response:', data);
                    const product = {
                        id: data.id,
                        name: data.name || 'Shoe',
                        price: data.price || 3000.00,
                        discountPrice: data.discountPrice || (data.price * 0.8),
                        sizes: data.sizes || ['US 7', 'US 8', 'US 9', 'US 10'],
                        images: [data.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
                        description: data.description || 'Comfortable and stylish shoe.',
                        category: data.category || 'general',
                        rating: data.rating || 4,
                        stock: data.stock || 10
                    };
                    addToCart(product, product.sizes[0], 1);
                } catch (error) {
                    console.error('Error fetching product:', error.message);
                    const product = products.find(p => p.id === parseInt(productId));
                    if (product) addToCart(product, product.sizes[0], 1);
                }
            });
        });
    } catch (error) {
        console.error('Error rendering featured products:', error.message);
        featuredProductsContainer.innerHTML = '<p>Unable to load featured products.</p>';
    }
}

function renderCartPage() {
    const cartContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');

    if (!cartContainer) return;

    cartContainer.innerHTML = cart.length === 0 ? '<p>Your cart is empty.</p>' : '';

    let subtotal = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.discountPrice * item.quantity;
        subtotal += itemTotal;
        cartContainer.innerHTML += `
            <div class="cart-row">
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-info">
                        <h4>${item.name}</h4>
                        <p>Size: ${item.size}</p>
                        <p><span style="text-decoration: line-through;">₹${item.price.toFixed(2)}</span> ₹${item.discountPrice.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-quantity">
                    <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${index}, this.value)">
                </div>
                <div class="cart-total">
                    <p>₹${itemTotal.toFixed(2)}</p>
                    <a href="#" onclick="removeFromCart(${index}); return false;">Remove</a>
                </div>
            </div>
        `;
    });

    const cartDiscount = subtotal * 0.10; // 10% cart-wide discount
    const total = subtotal - cartDiscount - promoDiscount;

    if (subtotalElement) subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    if (discountElement) discountElement.textContent = `₹${cartDiscount.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `₹${total.toFixed(2)}`;
}

function applyPromoCode() {
    const promoInput = document.getElementById('promo-code');
    const promoRow = document.getElementById('promo-row');
    const promoDiscountElement = document.getElementById('summary-promo');
    const subtotalElement = document.getElementById('summary-subtotal');
    const discountElement = document.getElementById('summary-discount');
    const totalElement = document.getElementById('summary-total');

    const code = promoInput.value.trim().toUpperCase();
    let discount = 0;

    if (code === 'SAVE10') {
        discount = parseFloat(subtotalElement.textContent.replace('₹', '')) * 0.1;
        alert('Promo code applied: 10% off!');
    } else if (code) {
        alert('Invalid promo code.');
        promoInput.value = '';
        discount = 0;
    }

    promoDiscount = discount;
    appliedPromoCode = discount > 0 ? code : '';

    if (promoRow && promoDiscountElement) {
        promoRow.style.display = discount > 0 ? 'table-row' : 'none';
        promoDiscountElement.textContent = `-₹${promoDiscount.toFixed(2)}`;
    }

    const subtotal = parseFloat(subtotalElement.textContent.replace('₹', '')) || 0;
    const cartDiscount = subtotal * 0.10;
    const total = subtotal - cartDiscount - promoDiscount;

    if (discountElement) discountElement.textContent = `₹${cartDiscount.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `₹${total.toFixed(2)}`;
}

function renderCheckoutPage() {
    const checkoutForm = document.getElementById('checkout-form');
    const summaryDetails = document.querySelector('.summary-details');
    const subtotalElement = document.getElementById('summary-subtotal');
    const promoRow = document.getElementById('promo-row');
    const promoDiscountElement = document.getElementById('summary-promo');
    const discountElement = document.getElementById('summary-discount');
    const totalElement = document.getElementById('summary-total');

    if (!checkoutForm || !summaryDetails) return;

    let subtotal = 0;
    summaryDetails.innerHTML = cart.length === 0 ? '<p>No items in cart.</p>' : '';
    cart.forEach(item => {
        const itemTotal = item.discountPrice * item.quantity;
        subtotal += itemTotal;
        summaryDetails.innerHTML += `
            <div class="summary-item">
                <span>${item.name} (Size: ${item.size}) x ${item.quantity}</span>
                <span>₹${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    const cartDiscount = subtotal * 0.10;
    const total = subtotal - cartDiscount - promoDiscount;

    if (subtotalElement) subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    if (promoRow && promoDiscountElement) {
        promoRow.style.display = promoDiscount > 0 ? 'table-row' : 'none';
        promoDiscountElement.textContent = `-₹${promoDiscount.toFixed(2)}`;
    }
    if (discountElement) discountElement.textContent = `₹${cartDiscount.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `₹${total.toFixed(2)}`;

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }
        if (checkoutForm.checkValidity()) {
            const shippingInfo = {
                fullName: document.getElementById('full-name').value,
                email: document.getElementById('email').value,
                address1: document.getElementById('address1').value,
                address2: document.getElementById('address2').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value,
                phone: document.getElementById('phone').value,
                promoCode: appliedPromoCode,
                promoDiscount: promoDiscount
            };
            localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
            window.location.href = 'payment.html';
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

function renderPaymentPage() {
    const paymentForm = document.getElementById('payment-form');
    const upiField = document.getElementById('upi-id');
    const cardFields = ['card-number', 'cardholder-name', 'expiry-date', 'cvv'];
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const summaryDetails = document.querySelector('.summary-details');
    const subtotalElement = document.getElementById('summary-subtotal');
    const promoRow = document.getElementById('promo-row');
    const promoDiscountElement = document.getElementById('summary-promo');
    const discountElement = document.getElementById('summary-discount');
    const totalElement = document.getElementById('summary-total');

    if (!paymentForm || !summaryDetails) return;

    let subtotal = 0;
    summaryDetails.innerHTML = cart.length === 0 ? '<p>No items in cart.</p>' : '';
    cart.forEach(item => {
        const itemTotal = item.discountPrice * item.quantity;
        subtotal += itemTotal;
        summaryDetails.innerHTML += `
            <div class="summary-item">
                <span>${item.name} (Size: ${item.size}) x ${item.quantity}</span>
                <span>₹${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    const cartDiscount = subtotal * 0.10;
    const total = subtotal - cartDiscount - promoDiscount;

    if (subtotalElement) subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    if (promoRow && promoDiscountElement) {
        promoRow.style.display = promoDiscount > 0 ? 'table-row' : 'none';
        promoDiscountElement.textContent = `-₹${promoDiscount.toFixed(2)}`;
    }
    if (discountElement) discountElement.textContent = `₹${cartDiscount.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `₹${total.toFixed(2)}`;

    if (paymentForm && upiField && paymentMethods) {
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
                cardFields.forEach(field => {
                    const input = document.getElementById(field);
                    input.disabled = selectedMethod !== 'card';
                    input.required = selectedMethod === 'card';
                });
                upiField.disabled = selectedMethod !== 'upi';
                upiField.required = selectedMethod === 'upi';
                if (selectedMethod === 'cod') {
                    cardFields.forEach(field => document.getElementById(field).disabled = true);
                    upiField.disabled = true;
                }
            });
        });

        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
            if (!selectedMethod) {
                alert('Please select a payment method.');
                return;
            }
            if (paymentForm.checkValidity()) {
                const paymentInfo = {
                    method: selectedMethod,
                    cardNumber: selectedMethod === 'card' ? document.getElementById('card-number').value : null,
                    cardholderName: selectedMethod === 'card' ? document.getElementById('cardholder-name').value : null,
                    expiryDate: selectedMethod === 'card' ? document.getElementById('expiry-date').value : null,
                    cvv: selectedMethod === 'card' ? document.getElementById('cvv').value : null,
                    upiId: selectedMethod === 'upi' ? document.getElementById('upi-id').value : null
                };
                localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
                completeOrder();
            } else {
                alert('Please fill in all required payment details.');
            }
        });
    }
}

function renderOrderHistory() {
    const orderHistoryList = document.getElementById('order-history-list');
    if (!orderHistoryList) return;

    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    orderHistoryList.innerHTML = lastOrder ? '' : '<p>No orders yet.</p>';

    if (lastOrder) {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-item';
        orderDiv.innerHTML = `
            <p><strong>Order ID:</strong> ${lastOrder.orderId}</p>
            <p><strong>Date:</strong> ${new Date(lastOrder.orderDate).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ₹${lastOrder.cart.reduce((total, item) => total + item.discountPrice * item.quantity, 0).toFixed(2)}</p>
            <p><strong>Items:</strong></p>
            <ul>
                ${lastOrder.cart.map(item => `<li>${item.name} (Size: ${item.size}) x ${item.quantity}</li>`).join('')}
            </ul>
            <p><strong>Shipping:</strong> ${lastOrder.shippingInfo.address1}, ${lastOrder.shippingInfo.city}, ${lastOrder.shippingInfo.state} ${lastOrder.shippingInfo.zip}</p>
            <p><strong>Payment Method:</strong> ${lastOrder.paymentInfo.method.charAt(0).toUpperCase() + lastOrder.paymentInfo.method.slice(1)}</p>
            ${lastOrder.shippingInfo.promoCode ? `<p><strong>Promo Code:</strong> ${lastOrder.shippingInfo.promoCode} (-₹${lastOrder.shippingInfo.promoDiscount.toFixed(2)})</p>` : ''}
        `;
        orderHistoryList.appendChild(orderDiv);
    }
}

function completeOrder() {
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
    const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
    const orderDetails = {
        cart: [...cart],
        shippingInfo,
        paymentInfo,
        orderDate: new Date().toISOString(),
        orderId: 'SSS' + Math.floor(Math.random() * 1000000)
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    cart = [];
    promoDiscount = 0;
    appliedPromoCode = '';
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('shippingInfo');
    localStorage.removeItem('paymentInfo');
    updateCartDisplay();
    alert(`Order ${orderDetails.orderId} placed successfully!`);
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    setupSearch();

    const logoutLink = document.getElementById('logout-link');
    if (checkLoginStatus() && logoutLink) {
        logoutLink.style.display = 'block';
    }

    if (window.location.pathname.includes('shoe-products.html')) {
        renderProductListPage('all');
    } else if (window.location.pathname.includes('new-arrivals.html')) {
        renderProductListPage('new-arrivals');
    } else if (window.location.pathname.includes('best-sellers.html')) {
        renderProductListPage('best-sellers');
    } else if (window.location.pathname.includes('sale-shoes.html')) {
        renderProductListPage('sale');
    } else if (window.location.pathname.includes('shoe-product-detail.html')) {
        renderShoeDetails();
    } else if (window.location.pathname.includes('index.html')) {
        renderFeaturedProducts();
    } else if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    } else if (window.location.pathname.includes('checkout.html')) {
        renderCheckoutPage();
    } else if (window.location.pathname.includes('payment.html')) {
        renderPaymentPage();
    } else if (window.location.pathname.includes('account.html')) {
        const loginForm = document.getElementById('LoginForm');
        const regForm = document.getElementById('RegForm');
        const orderHistory = document.getElementById('OrderHistory');
        const indicator = document.getElementById('Indicator');

        window.showLogin = function() {
            loginForm.style.display = 'block';
            regForm.style.display = 'none';
            orderHistory.style.display = 'none';
            indicator.style.transform = 'translateX(0%)';
        };

        window.showRegister = function() {
            loginForm.style.display = 'none';
            regForm.style.display = 'block';
            orderHistory.style.display = 'none';
            indicator.style.transform = 'translateX(100%)';
        };

        window.showOrderHistory = function() {
            loginForm.style.display = 'none';
            regForm.style.display = 'none';
            orderHistory.style.display = 'block';
            indicator.style.transform = 'translateX(200%)';
            renderOrderHistory();
        };
    }
});