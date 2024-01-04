document.addEventListener('DOMContentLoaded', function() {
  var opacityRange = document.getElementById('opacityRange');
  var opacityValue = document.getElementById('opacityValue');

  // Get the current tab ID
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabId = tabs[0].id;

    // Get the current opacity value from storage
    chrome.storage.sync.get([tabId.toString()], function(result) {
      var storedOpacity = result[tabId.toString()] || 1;
      opacityRange.value = storedOpacity;
      opacityValue.textContent = storedOpacity;
    });
  });

  // Update the opacity when the range input changes
  opacityRange.addEventListener('input', function() {
    var value = parseFloat(opacityRange.value).toFixed(1);
    opacityValue.textContent = value;

    // Update the opacity of the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tabId = tabs[0].id;
      var opacity = parseFloat(value);
      chrome.tabs.sendMessage(tabId, { opacity: opacity });

      // Save the opacity value to storage
      var data = {};
      data[tabId.toString()] = opacity;
      chrome.storage.sync.set(data);
    });
  });
});