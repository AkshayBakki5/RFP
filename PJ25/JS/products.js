const products = [
    {
        id: 1,
        name: "Shoe Cat 1",
        price: 3499,
        rating: 4,
        description: "High-performance athletic shoe designed for comfort and style. Perfect for everyday workouts and casual wear.",
        features: [
            "Lightweight breathable material",
            "Cushioned insole for maximum comfort",
            "Durable rubber outsole",
            "Flexible design for natural movement"
        ],
        images: [
            "images/product-1.jpg",
            "images/gallery-1.jpg",
            "images/gallery-2.jpg",
            "images/gallery-3.jpg"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"]
    },
    {
        id: 2,
        name: "Shoe Cat 2",
        price: 4299,
        rating: 4,
        description: "Premium running shoe with advanced cushioning technology. Ideal for long-distance runners and fitness enthusiasts.",
        features: [
            "Advanced shock absorption",
            "Responsive midsole",
            "Breathable mesh upper",
            "Energy return technology"
        ],
        images: [
            "images/product-2.jpg",
            "images/gallery-1.jpg",
            "images/gallery-2.jpg",
            "images/gallery-3.jpg"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"]
    },
    // Add more products similarly
    {
        id: 3,
        name: "Shoe Cat 3",
        price: 3799,
        rating: 3.5,
        description: "Versatile training shoe suitable for gym and cross-training activities. Provides excellent support and stability.",
        features: [
            "Multi-directional grip",
            "Heel stability support",
            "Padded ankle collar",
            "Lightweight construction"
        ],
        images: [
            "images/product-3.jpg",
            "images/gallery-1.jpg",
            "images/gallery-2.jpg",
            "images/gallery-3.jpg"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"]
    }
];

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}