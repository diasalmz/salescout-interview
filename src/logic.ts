// Implement a function which takes an array of Product and returns unique products sorted by price

type Product = {
    name: string;
    price: number;
};
 
function filterAndSortProducts(products: Product[]): Product[] {
    // Remove duplicates using Map with name as key
    const uniqueProducts = Array.from(
        new Map(products.map(product => [product.name, product])).values()
    );
    
    // Sort by price
    return uniqueProducts.sort((a, b) => a.price - b.price);
}

module.exports = { filterAndSortProducts }