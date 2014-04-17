chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('small.html', {
    'bounds': {
      'width': 800,
      'height': 600
    }
  });
});
