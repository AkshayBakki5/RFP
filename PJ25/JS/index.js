document.addEventListener('DOMContentLoaded', () => {
    const featuredProductsContainer = document.querySelector('.small.container .row');
    
    products.forEach(product => {
        const productElement = `
            <div class="col-4">
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.images[0]}">
                </a>
                <a href="product-detail.html?id=${product.id}">
                    <h4>${product.name}</h4>
                </a>
                <div class="rating">
                    ${generateStarRating(product.rating)}
                </div>
                <p>₹${product.price.toFixed(2)}</p>
            </div>
        `;
        
        featuredProductsContainer.innerHTML += productElement;
    });
});

function generateStarRating(rating) {
    return Array.from({length: 5}, (_, i) => {
        if (i < Math.floor(rating)) {
            return '<i class="fa fa-star" aria-hidden="true"></i>';
        } else if (i < rating) {
            return '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
        } else {
            return '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
    }).join('');
}