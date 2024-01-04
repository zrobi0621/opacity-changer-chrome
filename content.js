chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.opacity !== undefined) {
      document.body.style.opacity = request.opacity;
    }
  });
  