
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  console.log(msg);

  if (msg.type === 'token') {
    document.cookie = msg.token
    console.log('设置token成功')
  }
  // sendResponse('我收到了你的消息！');
});

