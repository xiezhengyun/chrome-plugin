(function () {
  console.log('这是 simple-chrome-plugin-demo 的content-script！');

  var list = [...document.getElementsByClassName('setting-name')];
  if (!list.length) return;

  try {
    for (let i = 0; i < list.length; i++) {
      if (list[i].innerText === 'branch') {
        list[i].parentNode.className += ' JenlinksAuxiliary';
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
