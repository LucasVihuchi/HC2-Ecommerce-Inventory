// Set default offerCards localstorage if it's not defined yet
if (localStorage.getItem('offerCards') == null) {
  localStorage.setItem('offerCards', "[{\"id\":0,\"img_path\":\"assets/images/offer-cards/avatar.jpg\",\"destination\":\"Pandora\",\"depart\":\"São Paulo\",\"old_price\":49999999.99,\"new_price\":7499999.99},{\"id\":1,\"img_path\":\"assets/images/offer-cards/hoghwarts.jpg\",\"destination\":\"Hoghwarts\",\"depart\":\"Pernambuco\",\"old_price\":9999.99,\"new_price\":999.99},{\"id\":2,\"img_path\":\"assets/images/offer-cards/jurassic-park.jpg\",\"destination\":\"Jurassic Park\",\"depart\":\"Rio Branco\",\"old_price\":2999.99,\"new_price\":2499.99},{\"id\":3,\"img_path\":\"assets/images/offer-cards/mount-olympus.jpg\",\"destination\":\"Monte Olimpo\",\"depart\":\"São Paulo\",\"old_price\":2999.99,\"new_price\":1499.99},{\"id\":4,\"img_path\":\"assets/images/offer-cards/narnia.jpg\",\"destination\":\"Nárnia\",\"depart\":\"Guarda Roupas\",\"old_price\":1999.99,\"new_price\":749.99}]")
}

// Return JSON of offer cards
let offerCards = JSON.parse(localStorage.getItem('offerCards'));

// Create offer cards on page load
const offersContainer = document.querySelector('.offers-container');
offerCards.forEach(offerCard => {
  offersContainer.innerHTML += `
    <div id="card${offerCard.id}"class="offer">
      <img src="${offerCard.img_path}" alt="${offerCard.destination}" />
      <div class="offer-info">
        <div class="destiny">
          <h3>${offerCard.destination}</h3>
          <p>Saindo de ${offerCard.depart}</p>
        </div>
        <p class="old-price">De: <span>R$ ${offerCard.old_price}</span></p>
        <p class="new-price">Por: <span>R$ ${offerCard.new_price} </span></p>
        <button name="add-to-cart" class="add-to-cart">Adicionar ao Carrinho</button>
      </div>
    </div>
  `
});


// Add to cart buttons
const offerButtons = document.querySelectorAll('.add-to-cart');
const cartAddModal = document.querySelector('.cart-added-modal');
const cartNotification = document.querySelector('.cart-notification');

// Put orders into localStorage
offerButtons.forEach(button => {
  button.addEventListener('click', () => {
    const order = button.parentElement.parentElement.id.slice(4,);

    if (localStorage.getItem('cartItems') == null) {
      localStorage.setItem('cartItems', `[{\"order\":${order},\"quantity\":1}]`)
    }
    else {
      let done = false;
      let cartItems = JSON.parse(localStorage.getItem('cartItems'));

      cartItems.forEach(item => {
        if (item.order == order) {
          item.quantity += 1;

          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          done = true;
        }
      })
      if (!done) {
        localStorage.setItem('cartItems', `${JSON.stringify(cartItems).slice(0, -1)} ,{\"order\":${order},\"quantity\":1}]`)
      }
    }
    cartAddModal.classList.remove('cart-added-modal-hidden');
    setTimeout(() => {
      cartAddModal.classList.add('cart-added-modal-hidden');
    }, 2000);
    cartNotification.classList.remove('cart-notification-hidden');
  })
})

// Put/Remove notification mark on cart
if (localStorage.getItem('cartItems') == null) {
  cartNotification.classList.add('cart-notification-hidden');
}
else {
  cartNotification.classList.remove('cart-notification-hidden');
}

// Show/Hide back to top button according to scroll position 
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', function () {
  if (window.pageYOffset >= (window.innerHeight / 2)) {
    backToTop.classList.remove('back-to-top-hidden');
  }
  else {
    backToTop.classList.add('back-to-top-hidden');
  }
})

// Show/Hide menu modal on mobile
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.querySelector('.icon-close');
const menuModal = document.querySelector('.menu-modal');

menuIcon.addEventListener('click', function () {
  menuModal.classList.remove('menu-modal-hidden');
});
closeIcon.addEventListener('click', function () {
  menuModal.classList.add('menu-modal-hidden');
});
