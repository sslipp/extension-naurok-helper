let isEnabled = false;

function toggleExtension() {
  isEnabled = !isEnabled;
  updateBadge();
}

function updateBadge() {
  chrome.browserAction.setBadgeText({ text: isEnabled ? "ON" : "OFF" });
}

function getActiveStatus() {
  return isEnabled;
}

updateBadge();

chrome.browserAction.onClicked.addListener(toggleExtension);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'toggle') {
    toggleExtension();
    sendResponse({ isActive: isEnabled });
  } else if (message.action === 'getStatus') {
    sendResponse({ isActive: isEnabled });
  } else if (message.action === 'search') {
    if (isEnabled) {
      chrome.tabs.create({ url: message.url });
    }
  }
});
