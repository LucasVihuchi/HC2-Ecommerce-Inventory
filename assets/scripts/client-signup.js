const signUpContainer = document.querySelector('.signup-container');

// Register new customer
signUpContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const clientName = document.getElementById('client-name');
    const clientMotherName = document.getElementById('client-mother-name');
    const clientCPF = document.getElementById('client-cpf');
    const clientBirthDay = document.getElementById('client-birthday');
    const clientPhone = document.getElementById('client-phone');
    const clientStreet = document.getElementById('client-street');
    const clientStreetNumber = document.getElementById('client-street-number');
    const clientCEP = document.getElementById('client-cep');
    const clientCity = document.getElementById('client-city');
    const clientState = document.getElementById('client-state');
    const clientCountry = document.getElementById('client-country');
    const clientEmail = document.getElementById('client-email');
    const clientPassword = document.getElementById('client-password');
    const clientPasswordConfirm = document.getElementById('client-password-confirm');

    if (clientPassword.value == clientPasswordConfirm.value) {
        if (localStorage.getItem('clientsDB') == null) {
            localStorage.setItem('clientsDB', `[{\"name\":\"${clientName.value}\",\"cpf\":\"${clientCPF.value}\",\"mother_name\":\"${clientMotherName.value}\",\"birth_date\":\"${clientBirthDay.value}\",\"phone\":\"${clientPhone.value}\",\"email\":\"${clientEmail.value}\",\"password\":\"${clientPassword.value}\",\"adress\":{\"street\":\"${clientStreet.value}\",\"number\":\"${clientStreetNumber.value}\",\"CEP\":\"${clientCEP.value}\",\"city\":\"${clientCity}\",\"state\":\"${clientState.value}\",\"country\":\"${clientCountry.value}\"}}]`);
        }
        else {
            localStorage.setItem('clientsDB', localStorage.getItem('clientsDB').slice(0, -1) + `,{\"name\":\"${clientName.value}\",\"cpf\":\"${clientCPF.value}\",\"mother_name\":\"${clientMotherName.value}\",\"birth_date\":\"${clientBirthDay.value}\",\"phone\":\"${clientPhone.value}\",\"email\":\"${clientEmail.value}\",\"password\":\"${clientPassword.value}\",\"adress\":{\"street\":\"${clientStreet.value}\",\"number\":\"${clientStreetNumber.value}\",\"CEP\":\"${clientCEP.value}\",\"city\":\"${clientCity.value}\",\"state\":\"${clientState.value}\",\"country\":\"${clientCountry.value}\"}}]`);
        }
        genNotifModal.textContent = "Cadastrado com sucesso!";
        showGenNotifModal();
        setTimeout(() => {
            location.reload();
        }, 800);
    }
    else {
        genNotifModal.textContent = "Senhas não conferem!";
        showGenNotifModal();
    }
});