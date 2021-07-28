// Set default offerCards localstorage if it's not defined yet
if (localStorage.getItem('offerCards') == null) {
  localStorage.setItem('offerCards', "[{\"id\":0,\"img_path\":\"assets/images/offer-cards/avatar.jpg\",\"destination\":\"Pandora\",\"depart\":\"São Paulo\",\"old_price\":49999999.99,\"new_price\":7499999.99},{\"id\":1,\"img_path\":\"assets/images/offer-cards/hoghwarts.jpg\",\"destination\":\"Hoghwarts\",\"depart\":\"Pernambuco\",\"old_price\":9999.99,\"new_price\":999.99},{\"id\":2,\"img_path\":\"assets/images/offer-cards/jurassic-park.jpg\",\"destination\":\"Jurassic Park\",\"depart\":\"Rio Branco\",\"old_price\":2999.99,\"new_price\":2499.99},{\"id\":3,\"img_path\":\"assets/images/offer-cards/mount-olympus.jpg\",\"destination\":\"Monte Olimpo\",\"depart\":\"São Paulo\",\"old_price\":2999.99,\"new_price\":1499.99},{\"id\":4,\"img_path\":\"assets/images/offer-cards/narnia.jpg\",\"destination\":\"Nárnia\",\"depart\":\"Guarda Roupas\",\"old_price\":1999.99,\"new_price\":749.99}]")
}

if (localStorage.getItem('statusLogin') != "true" && localStorage.getItem('statusLogin') != "false") {
  localStorage.setItem('statusLogin', false);
  localStorage.setItem('currentSession', null);
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

// Show/Hide general notification modal
const genNotifModal = document.querySelector('.general-notification-modal');
function showGenNotifModal() {
  genNotifModal.classList.remove('general-notification-modal-hidden');
  setTimeout(() => {
    genNotifModal.classList.add('general-notification-modal-hidden');
  }, 2000);
}