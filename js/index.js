let elems = document.querySelectorAll('input, textarea');
window.onload = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
      .then((reg) => {
        reg.update().catch(err => console.warn(err));
      }).catch((error) => {
      console.warn('Registration failed with ' + error);
    });
  }
  let hover = document.getElementById('hover-change');
  hover.addEventListener('mouseover', () => {
    hover.innerText = "site";
  });

  hover.addEventListener('mouseout', () => {
    hover.innerText = "produto";
  });

  elems.forEach(checkEmpty)
};

function checkEmpty(elem) {
  if (elem.value) {
    if (elem.value.length > 0) {
      if (!elem.classList.contains('not-empty-input'))
        elem.classList.add('not-empty-input');
      return
    }
  }
  if (elem.classList.contains('not-empty-input'))
    elem.classList.remove('not-empty-input');
}

elems.forEach((elem) => {
  elem.addEventListener('keyup', (ev) => checkEmpty(ev.target))
});
