function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let textDiv = document.querySelector(('#text'));

  button.addEventListener('click', (event) => {
    textDiv.toggleAttribute('hidden');
  });
}
