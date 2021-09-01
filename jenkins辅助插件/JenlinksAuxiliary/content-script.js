(function () {
  console.log('这是 simple-chrome-plugin-demo 的content-script！');
  var list = [...document.getElementsByClassName('form-group')];
  if (!list.length) return;

  try {
    list.forEach(item => {
      if (item.getElementsByClassName('setting-name')[0].innerText === 'branch') {
        item.className += ' JenlinksAuxiliary';
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
