let offerCards = JSON.parse(localStorage.getItem('offerCards'));

const cartSection = document.querySelector('.cart-section');
const cartTableBody = document.querySelector('.orders-container-body');

let totalPrice = 0;


// Generate cart
if (localStorage.getItem('cartItems') == null) {
}
else if (localStorage.getItem('cartItems') == '[]') {
  localStorage.removeItem('cartItems');
}
else {
  let cartItems = JSON.parse(localStorage.getItem('cartItems'));
  cartItems.forEach(item => {
    offerCards.forEach(card => {
      if (card.id == item.order) {
        cartTableBody.innerHTML += `
        <tr id="item${card.id}">
          <td><button class="decrease-btn">-</button>${item.quantity}<button class="increase-btn">+</button></td>
          <td>${card.destination}</td>
          <td>${card.depart}</td>
          <td>R$ ${card.new_price.toFixed(2)}</td>
        </tr>
        `;
        totalPrice += (item.quantity * card.new_price);
      }
    })
  })
  cartSection.innerHTML += `
  <div class="price-n-buy">
    <span>Preço Total: R$ ${totalPrice.toFixed(2)}</span>
    <div class="price-n-buy-btns">
      <button class="cart-clean-btn">Limpar</button>
      <button class="cart-buy-btn">Comprar</button>
    </div>
  </div>
  `
}

// Decrease number of elements on cart
const totalPriceHTML = cartSection.querySelector(".price-n-buy > span");
const decreaseButtons = document.querySelectorAll('.decrease-btn');
decreaseButtons.forEach(button => {
  button.addEventListener('click', () => {
    let jsonIndex = -1;
    const order = button.parentElement.parentElement.id.slice(4,);
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    cartItems.forEach(cartItem => {
      jsonIndex += 1;
      if (order == cartItem.order) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          button.nextSibling.textContent = parseInt(button.nextSibling.textContent) - 1;
          offerCards.forEach(card => {
            if (card.id == cartItem.order) {
              totalPrice -= card.new_price;
              totalPriceHTML.textContent = `Preço Total: R$ ${totalPrice.toFixed(2)}`;
            }
          });
        }
        else {
          console.log(cartItems.splice(jsonIndex, 1));
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          location.reload()
        }
      }
    });
  });
});

// Increase number of elements on cart
const increaseButtons = document.querySelectorAll('.increase-btn');
increaseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const order = button.parentElement.parentElement.id.slice(4,);
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    cartItems.forEach(cartItem => {
      if (order == cartItem.order) {
        cartItem.quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        button.previousSibling.textContent = parseInt(button.previousSibling.textContent) + 1;
        offerCards.forEach(card => {
          if (card.id == cartItem.order) {
            totalPrice += card.new_price;
            totalPriceHTML.textContent = `Preço Total: R$ ${totalPrice.toFixed(2)}`;
          }
        });
      }
    });
  });
});

if (localStorage.getItem('cartItems') != null) {
  // Clean cart
  const cartCleanButton = document.querySelector('.cart-clean-btn');
  cartCleanButton.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    location.reload();
  });

  // Buy cart
  const cartBuyButton = document.querySelector('.cart-buy-btn');
  cartBuyButton.addEventListener('click', () => {
    if (localStorage.getItem('cartItems') != null && localStorage.getItem('cartItems') != '[]') {
      if (localStorage.getItem('statusLogin') != "true") {
        genNotifModal.textContent = 'Você não está logado!'
      }
      else if (localStorage.getItem('statusLogin') == "true") {
        genNotifModal.textContent = 'Compra feita com suceso!'
        localStorage.removeItem('cartItems');
      }
      showGenNotifModal();
    }
  });
}