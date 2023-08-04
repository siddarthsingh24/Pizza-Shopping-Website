// contains the logic for fetching, adding, sorting, searching, deletion, updation
/* It talks to network layer to bring the JSON and then convert 
the JSON into Objects vice-versa
CRUD OPERATIONS
stores the object into product.js
 */

import makenetworkcall from "./api-client.js";
import Product from '../models/product.js'
const productOperations={
    products:[],//key value pair
    carts:[],
    addToCartArray(Product){this.carts.push(Product)},
    removeFromCartArray(Product){this.carts = this.carts.filter(pizza=>pizza.id != Product.id)}
    ,
    getProductsInCart(){
        const productsinbasket=this.products.filter(product=>product.inCart);
        return productsinbasket;
    },
    async loadProducts(){
        const products = await makenetworkcall();
        const pizzaArray=products['Vegetarian'];
        const productArray= pizzaArray.map(pizza=>{
            const currentPizza = new Product(pizza.id,pizza.name,pizza.menu_description,pizza.price,pizza.assets.product_details_page[0].url);
            return currentPizza;
        });
        this.products=productArray;
        console.log('Product Array',productArray);
        return productArray; //Wrap in promise
    },
    sortProducts(){},
    searchProducts(id){
        const product =this.products.find(current=>current.id==id);
        console.log("Product Found: ",product);
        return product;
    }
}
export default productOperations;