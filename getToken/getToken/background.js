// background.js
chrome.contextMenus.create({
  title: '同步直客开发环境Token',
  onclick: function () {
    getToken('http://192.168.8.42:20002/');
  },
});
chrome.contextMenus.create({
  title: '同步直客测试环境Token',
  onclick: function () {
    getToken('https://zk-test.smartebao.com:20149');
  },
});
chrome.contextMenus.create({
  title: '同步日升开发环境Token',
  onclick: function () {
    getToken('http://192.168.8.92:20002/');
  },
});
chrome.contextMenus.create({
  title: '同步日升测试环境Token',
  onclick: function () {
    getToken('http://192.168.8.92:40000/');
  },
});

function getToken(path) {

  chrome.tabs.query({}, setTab(path));

  function setTab(path) {
    return (tabs) => {
      sendMessageToContentScript(path);

      const targetTab = tabs.filter(item => item.url.indexOf(path) > -1);
      const localTab = tabs.filter(item => item.url.indexOf('http://localhost:958') > -1);

      const url = new URL(targetTab[0].url);
      const host = String(url.host).split(':')[0];

      chrome.cookies.getAll({ domain: host }, cookies => {
        const token = cookies.filter(item => item.name === 'token')[0].value;

        sendMessageToContentScript({ type: 'text', localTab });

        localTab.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { type: 'token', token: `token=${token}` }, function (response) {
            if (callback) callback(response);
          });
        });
      });
    };
  }
}

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}
