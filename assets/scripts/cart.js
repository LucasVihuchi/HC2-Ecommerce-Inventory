let offerCards = JSON.parse(localStorage.getItem('offerCards'));

const cartSection = document.querySelector('.cart-section');
const cartTableBody = document.querySelector('.orders-container-body');

if (localStorage.getItem('cartItems') == null) {
}
else {
  let total = 0;
  let cartItems = JSON.parse(localStorage.getItem('cartItems'));
  cartItems.forEach(item => {
    offerCards.forEach(card => {
      if (card.id == item.order) {
        cartTableBody.innerHTML += `
        <tr>
          <td><button class="decrease-btn">-</button>${item.quantity}<button class="increase-btn">+</button></td>
          <td>${card.destination}</td>
          <td>${card.depart}</td>
          <td>R$ ${card.new_price}</td>
        </tr>
        `;
        total += (item.quantity * card.new_price);
      }
    })
  })
  cartSection.innerHTML += `
  <div class="price-n-buy">
    <span>Preço Total: R$ ${total.toFixed(2)}</span>
    <button class="cart-buy-btn">Comprar</button>
  </div>
  `
}