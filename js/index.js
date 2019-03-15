let elems = document.querySelectorAll('input, textarea');
window.onload = () => {
  if ('serviceWorker' in navigator) {
    console.log('trying to register worker');
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
      .then(function (reg) {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
        reg.update().catch(err => console.log(err));
      }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
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
  console.log('something');
  if (elem.classList.contains('not-empty-input'))
    elem.classList.remove('not-empty-input');
  console.log(elem);
}

elems.forEach((elem) => {
  elem.addEventListener('keyup', (ev) => checkEmpty(ev.target))
});
