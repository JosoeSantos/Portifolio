let elems = document.querySelectorAll('input, textarea');
window.onload = () => {
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
})
