// It is a glue between view and model
// controller- I/O View Layer
// Data Exchange B/w View and Model
import productOperations from "../services/product-operations.js";

async function loadPizzas(){
  const pizzas= await productOperations.loadProducts();
  console.log('Pizzas are',pizzas);
  for (let pizza of pizzas){
    preparePizzaCard(pizza);
    console.log(pizza);
  }
};
loadPizzas();
function preparePizzaCard(pizza)
{
  const outputDiv=document.querySelector('#output');
  const colDiv = document.createElement('div');
  colDiv.className='col-4';
  const cardDiv= document.createElement('div');
  cardDiv.className="card";
  cardDiv.style="width: 18rem";
  colDiv.appendChild(cardDiv);
  const img=document.createElement('img');
  img.src=pizza.url;
  img.className='card-img-top';
  cardDiv.appendChild(img);
  const cardBody = document.createElement('div');
  cardBody.className='card-body';
  cardDiv.appendChild(cardBody);
  const h5= document.createElement('h5');
  h5.className='card-title';
  h5.innerText=pizza.name;
  const pTag=document.createElement('p');
  pTag.className='card-text';
  pTag.innerText=pizza.desc;
  const button=document.createElement('button');
  button.className='btn btn-outline-danger';
  button.innerText='Add to cart';
  button.setAttribute('product-id',pizza.id);
  button.addEventListener('click',addtoCart);
  cardBody.appendChild(h5);
  cardBody.appendChild(pTag);
  cardBody.appendChild(button);
  outputDiv.appendChild(colDiv);
  return outputDiv;
};
function addtoCart() {
    console.log("Add to cart Clicked...",this);
    const currentButton= this;
    const pizzaID= currentButton.getAttribute('product-id');
    console.log("pizza id is ",pizzaID);
    const selectedPizza=productOperations.searchProducts(pizzaID);
    console.log("you have selected pizza: ",selectedPizza);
    selectedPizza.inCart=!selectedPizza.inCart;
    if (selectedPizza.inCart) {
      this.className='btn btn-danger';
      this.innerText="Remove from Cart";
      productOperations.addToCartArray(selectedPizza);      
    }    
    else {
      this.className='btn btn-outline-danger';
      this.innerText='Add to cart';
      productOperations.removeFromCartArray(selectedPizza);
    }
    printBasket();
}

function printBasket(){
  
  const cartproducts=productOperations.getProductsInCart();
  const basket = document.querySelector("#basket");
  basket.innerHTML='';
  for(let product of cartproducts){
    const li=document.createElement("li");
    const prodcard=document.createElement('div');
    prodcard.className='card';
    const cardrow=document.createElement('div');
    cardrow.className='row ';
    const cardname=document.createElement('div');
    cardname.className='col-9 ';
    cardname.innerText=product.name;
    const cardpric=document.createElement('div');
    cardpric.className='col-3';
    cardpric.innerText=product.price;
    
    cardrow.appendChild(cardname);
    cardrow.appendChild(cardpric);
    prodcard.appendChild(cardrow);
    // li.appendChild(prodcard);
    basket.appendChild(prodcard);
    
  }
  var count=productOperations.getProductsInCart().length;
  const cartcount=document.querySelector('#count');
  cartcount.innerHTML=' ';
  const number=document.createElement('h6');
  number.innerText=`${count}`;
  cartcount.appendChild(number);

  const SUBTOTAL=document.querySelector('#subtotalbill');
  const TOTAL=document.querySelector('#totalbill');
  // var total=0;
  //   for (let product of cartproducts) {
    //     total=total+parseFloat(product.price);      
    //   }
    var total = cartproducts.reduce((t,currentprod)=>t+parseFloat(currentprod.price),0);
    var totalwithgst=total*1.18;
    SUBTOTAL.innerText=total;
  TOTAL.innerText=totalwithgst;
  
}

// function addPizzatocart() {
//       const pizzaId=this.getAttribute('product-id');
//       console.log("Current Button Clicked", pizzaId);
//       const pizza=productOperations.searchProducts(pizzaId);
//       console.log("pizza: ",pizza);
//       pizza.isAddedinCart=!pizza.isAddedinCart;
//       if (pizza.isAddedinCart) {
//         this.className='btn btn-danger';
//         this.innerText='Remove from Cart';
//         productOperations.addToCart(pizza);
//       }
//       else{
//         this.className='btn btn-primary';
//         this.innerText='Add In Cart';
//         productOperations.removeFromCart(pizza);
//       }
//       printCart();
// }

