$(function() {
    $('.slider-img').slick({
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
    });
    
});

function load() {
    $(".slick").animate({opacity: '1'}, "slow")
}

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


document.getElementById("cart").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
    document.querySelector("body").style.overflow = "hidden";
})

document.getElementById("close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
    document.querySelector("body").style.overflow = "scroll";
})

let products = [
                {
    name: "combo1",
    tag: "combo1",
    price: 5.99,
    inCart: 0
},
{
name: "burger1",
tag: "burger1",
price: 3.99,
inCart: 0
},
                {
    name: "pizza1",
    tag: "pizza1",
    price: 4.45,
    inCart: 0
},
                {
    name: "hotdog1",
    tag: "hotdog1",
    price: 2.59,
    inCart: 0
}
                ]

let carts = document.querySelectorAll('.add-cart');

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers  ;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems =  {
            [product.tag]: product
        }
        
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null ){
        cartCost = parseFloat(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    } else {
    localStorage.setItem("totalCost", product.price);
    }
    
}

 onLoadCartNumbers()
