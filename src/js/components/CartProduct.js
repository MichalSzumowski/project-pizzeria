import {select} from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct {
  constructor(menuProduct, element){
    const thisCartProduct = this;

    thisCartProduct.id = menuProduct.id;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.params = menuProduct.params;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.priceSingle = menuProduct.priceSingle;

    thisCartProduct.getElements(element);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();
      
    // console.log('new Cart Product:', thisCartProduct);
  }

  getElements(element){
    const thisCartProduct = this;

    thisCartProduct.dom = {};
    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.amountWidget); 
    thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.price);
    thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.remove);
  }

  initAmountWidget(){
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    //console.log('thisCartProduct.amountWidget:', thisCartProduct.amountWidget, 'thisCartProduct.amount:', thisCartProduct.amount, 'thisCartProduct.dom.amountWidget:', thisCartProduct.dom.amountWidget, 'thisCartProduct.dom.price:', thisCartProduct.dom.price);
    //console.log('szukajka:', thisCartProduct.dom.amountWidget.querySelector(select.widgets.amount.input));
      
    thisCartProduct.dom.amountWidget.querySelector(select.widgets.amount.input).innerHTML = thisCartProduct.amount;
    thisCartProduct.dom.amountWidget.addEventListener('updated', function() {
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
        
      thisCartProduct.dom.amountWidget.querySelector(select.widgets.amount.input).innerHTML = thisCartProduct.amount;

      thisCartProduct.price = thisCartProduct.amount * thisCartProduct.priceSingle;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    }); 
  } 

  remove(){
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });

    thisCartProduct.dom.wrapper.dispatchEvent(event);

    //console.log('remove kliknięto!');
  }

  initActions(){
    const thisCartProduct = this;

    // thisCartProduct.dom.edit.addEventListener('click', );

    thisCartProduct.dom.remove.addEventListener('click', function(event){
      event.preventDefault();
        
      thisCartProduct.remove();
    });
      

  }

  getData(){
    const thisCartProduct = this;
      
    const product = {
      id: thisCartProduct.id,
      name: thisCartProduct.name,
      amount: thisCartProduct.amount,
      price: thisCartProduct.price,
      priceSingle: thisCartProduct.priceSingle,
      params: thisCartProduct.params,
    };
      
    return product;
  }
}

export default CartProduct;