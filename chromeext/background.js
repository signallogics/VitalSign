chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('big.html', {
    'bounds': {
      'width': 1000,
      'height': 700
    }
  });
  chrome.app.window.create('small.html', {
    'bounds': {
      'width': 1000,
      'height': 700
    }
  });
});
