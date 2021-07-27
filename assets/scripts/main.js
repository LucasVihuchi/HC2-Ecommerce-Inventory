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
    showGenNotifModal();
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
