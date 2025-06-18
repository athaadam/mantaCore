const formWrapper = document.getElementById('formWrapper');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

showRegister.addEventListener('click', () => {
  formWrapper.style.transform = 'translateX(-100%)';
});

showLogin.addEventListener('click', () => {
  formWrapper.style.transform = 'translateX(0%)';
});
