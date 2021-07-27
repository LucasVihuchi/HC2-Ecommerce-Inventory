const signInSection = document.querySelector('.signin-section');

if (localStorage.getItem('statusLogin') != "true") {
  // Generate login page
  signInSection.innerHTML =
    `
    <h2 class="title">
      Login
    </h2>
    <form class="signin-container">
      <div class="input-container">
        <label class="sr-only" for="client-email">Email</label>
        <input type="email" name="client-email" id="client-email" placeholder="Insira seu email">
        <label class="sr-only" for="client-password">Senha</label>
        <input type="password" name="client-password" id="client-password" placeholder="Insira sua senha">
      </div>
      <button class="signin-btn" type="submit">Entrar</button>
    </form>
  `;

  // Login client
  // localStorage.setItem('clientsDB', "[{\"email\":\"lucas@lucas.com\",\"password\":\"lucas123\"}]");
  const signInForm = document.querySelector(".signin-container");
  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let found = false;
    const emailInput = document.getElementById('client-email');
    const passwordInput = document.getElementById('client-password');
    const clientsList = JSON.parse(localStorage.getItem('clientsDB'));
    if (clientsList != null) {
      clientsList.forEach(client => {
        if (client.email == emailInput.value) {
          found = true;
          if (client.password == passwordInput.value) {
            localStorage.setItem('currentSession', `{\"email\":\"${emailInput.value}\",\"password\":\"${passwordInput.value}\"}`);
            localStorage.setItem('statusLogin', true);
            genNotifModal.textContent = "Logado com sucesso!";
            showGenNotifModal();
            setTimeout(() => {
              location.reload();
            }, 800);
          }
          else {
            genNotifModal.textContent = "Senha incorreta!";
          }
        }
      });
    }
    if (found == false) {
      genNotifModal.textContent = "Cadastro não encontrado!";
    }
    showGenNotifModal();
  });
}
else {
  // Generate logout page
  signInSection.innerHTML =
    `
    <h2 class="title">
      Logout
    </h2>
    <div class="signout-container">
      <p>Você está logado!</p>
      <button class="signout-btn" type="button">Sair</button>
    </div>
  `;

  // Logout client
  const signOutButton = document.querySelector(".signout-btn");
  signOutButton.addEventListener('click', () => {
    localStorage.setItem('currentSession', null);
    localStorage.setItem('statusLogin', false);
    location.reload();
  })
}

