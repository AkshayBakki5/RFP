// Product Data Structure
const products = [
    {
        id: 1,
        name: "Run Lite Performance Trainer",
        price: 3499.00,
        rating: 4,
        description: "High-performance training shoe designed for optimal comfort and support during intense workouts.",
        images: [
            "images/product-1.jpg",
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg"
        ],
        sizes: ["Small", "Medium", "Large", "XL", "XXL"]
    },
    {
        id: 2,
        name: "Urban Stride Comfort Sneaker",
        price: 4299.00,
        rating: 4,
        description: "Stylish and comfortable urban sneaker perfect for everyday wear and casual outings.",
        images: [
            "images/product-2.jpg",
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg"
        ],
        sizes: ["Small", "Medium", "Large", "XL", "XXL"]
    },
    {
        id: 3,
        name: "Flex Zone Training Shoe",
        price: 3799.00,
        rating: 3.5,
        description: "Flexible training shoe designed to provide maximum mobility and support during dynamic exercises.",
        images: [
            "images/product-3.jpg",
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg"
        ],
        sizes: ["Small", "Medium", "Large", "XL", "XXL"]
    },
    {
        id: 4,
        name: "Pro Grip Athletic Runner",
        price: 4599.00,
        rating: 4.5,
        description: "Advanced running shoe with superior grip and cushioning for long-distance performance.",
        images: [
            "images/product-4.jpg",
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg"
        ],
        sizes: ["Small", "Medium", "Large", "XL", "XXL"]
    },
    {
        id: 5,
        name: "Street Style Classic Trainer",
        price: 3999.00,
        rating: 4,
        description: "Classic street-style trainer that combines fashion and functionality for urban explorers.",
        images: [
            "images/product-5.jpg",
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg"
        ],
        sizes: ["Small", "Medium", "Large", "XL", "XXL"]
    },
    {
        id: 6,
        name: "Tempo Max Performance Shoe",
        price: 4199.00,
        rating: 4,
        description: "High-intensity performance shoe engineered for speed and agility in competitive sports.",
        images: [
            "images/product-6.jpg",
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg"
        ],
        sizes: ["Small", "Medium", "Large", "XL", "XXL"]
    },
    {
        id: 7,
        name: "Lite Stride Comfort Sneaker",
        price: 3650.00,
        rating: 3.5,
        description: "Lightweight comfort sneaker ideal for everyday wear and casual athletic activities.",
        images: [
            "images/product-7.jpg",
            "images/gallery-1.jpg", 
            "images/gallery-2.jpg", 
            "images/gallery-3.jpg"
        ],
        sizes: ["Small", "Medium", "Large", "XL", "XXL"]
    }
];

// Function to generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fa fa-star" aria-hidden="true"></i>';
        } else if (i - rating <= 0.5) {
            stars += '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
        } else {
            stars += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
    }
    return stars;
}

// Function to load product details dynamically
function loadProductDetails() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Find the product
    const product = products.find(p => p.id === productId);

    if (product) {
        // Update main product image
        document.getElementById('product-img').src = product.images[0];

        // Update small images
        const smallImgContainers = document.getElementsByClassName('small-img-col');
        for (let i = 0; i < smallImgContainers.length; i++) {
            const img = smallImgContainers[i].querySelector('img');
            img.src = product.images[i];
        }

        // Update product details
        document.querySelector('.col-2 h1').textContent = product.name;
        document.querySelector('.col-2 h4').textContent = `₹${product.price.toFixed(2)}`;
        document.querySelector('.col-2 p:last-of-type').textContent = product.description;

        // Update rating
        const ratingContainer = document.querySelector('.col-2 .rating');
        ratingContainer.innerHTML = generateStarRating(product.rating);

        // Update size options
        const sizeSelect = document.querySelector('select');
        sizeSelect.innerHTML = '<option>Select Size</option>';
        product.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });

        // Image swap functionality
        const smallImgs = document.getElementsByClassName('small-img');
        const productImg = document.getElementById('product-img');

        for (let i = 0; i < smallImgs.length; i++) {
            smallImgs[i].onclick = function() {
                productImg.src = this.src;
            };
        }
    } else {
        // Redirect or show error if product not found
        window.location.href = 'index.html';
    }
}

// Function to add product links to homepage
function addProductLinks() {
    const productContainers = document.querySelectorAll('.col-4');
    
    products.forEach((product, index) => {
        if (index < productContainers.length) {
            const container = productContainers[index];
            const img = container.querySelector('img');
            const name = container.querySelector('h4');
            
            // Add link to product detail page
            const link = document.createElement('a');
            link.href = `product-detail.html?id=${product.id}`;
            
            // Wrap image in link
            img.parentNode.insertBefore(link, img);
            link.appendChild(img);
            
            // Wrap name in link
            name.parentNode.insertBefore(link.cloneNode(true), name);
            link.appendChild(name);
        }
    });
}

// Run appropriate function based on current page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetails();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        addProductLinks();
    }
});