// Product JS contains the structure of a Pizza Object
// pizza object- id, name, desc, price, rating, image

class Product{
    constructor(id,name,desc,price,url){
        // this keyword contains current calling object
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.url=url;
        this.inCart=false;
    }
    
}
export default Product;
