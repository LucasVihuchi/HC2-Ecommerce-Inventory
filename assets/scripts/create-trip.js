const tripContainer = document.querySelector('.trip-container');

// Crete new trip card
tripContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const tripDestination = document.getElementById('trip-destination');
    const tripDepart = document.getElementById('trip-depart');
    const tripOldPrice = document.getElementById('trip-old-price');
    const tripNewPrice = document.getElementById('trip-new-price');
    const tripImageURL = document.getElementById('trip-image');
    const adminLogin = document.getElementById('admin-login');
    const adminPassword = document.getElementById('admin-password');
    const adminPasswordConfirm = document.getElementById('admin-password-confirm');

    if (adminPassword.value == adminPasswordConfirm.value) {
        if (adminLogin.value == 'admin' && adminPassword.value == 'admin') {
            let id = JSON.parse(localStorage.getItem('offerCards')).length;
            localStorage.setItem('offerCards', localStorage.getItem('offerCards').slice(0, -1) + `,{\"id\":${id},\"img_path\":\"${tripImageURL.value}\",\"destination\":\"${tripDestination.value}\",\"depart\":\"${tripDepart.value}\",\"old_price\":${tripOldPrice.value},\"new_price\":${tripNewPrice.value}}]`);

            genNotifModal.textContent = "Cadastrado com sucesso!";
            showGenNotifModal();
            setTimeout(() => {
                location.reload();
            }, 800);
        }
        else {
            genNotifModal.textContent = "Usuario ou senha incorretos!";
            showGenNotifModal();
        }

    }
    else {
        genNotifModal.textContent = "Senhas não conferem!";
        showGenNotifModal();
    }
});