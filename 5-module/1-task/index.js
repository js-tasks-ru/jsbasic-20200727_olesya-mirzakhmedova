function hideSelf() {
  let button = document.querySelector('.hide-self-button');

  button.addEventListener('click', (event) => {
    button.hidden = true;
  });
}
