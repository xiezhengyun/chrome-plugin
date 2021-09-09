document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function (tabs) {
    const url = new URL(tabs[0].url);
    const host = String(url.host).split(':')[0];
    var targetUrl = ['http://192.168.8.42:20002', 'https://zk-test.smartebao.com:20149', 'http://192.168.8.92:20002', 'http://192.168.8.92:40000'];
    var isTargetFlag = false;

    for (let i of targetUrl) {
      if ( String(url).indexOf(i) > -1) {
        isTargetFlag = true;
      }
    }
    if (!isTargetFlag) return;

    chrome.cookies.getAll({ domain: host }, cookies => {
      const token = cookies.filter(item => item.name === 'token')[0].value

      sendMessageToContentScript({ type: 'text', cookies});

      chrome.tabs.query({}, function (tabs) {
        tabs = tabs.filter(item => item.url.indexOf('http://localhost:958') > -1);

        sendMessageToContentScript(tabs);

        chrome.tabs.sendMessage(tabs[0].id, { type: 'token', token: `token=${token}` }, function (response) {
          if (callback) callback(response);
        });
      });
    });

  });
});

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}
