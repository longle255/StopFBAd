function removeAds() {
  var ads = $('span:contains(\'Suggested Post\')');
  var p = $(ads[0]).closest('.userContentWrapper');
  $(p).remove();

  ads = $('a.uiStreamSponsoredLink');
  p = $(ads[0]).closest('.userContentWrapper');
  $(p).remove();

  ads = $('span.uiStreamAdditionalLogging');
  p = $(ads[0]).closest('.userContentWrapper');
  $(p).remove();

  ads = $('a:contains(\'Sponsored\')');
  for (var i = 0; i< ads.length;i++){
    var p = $(ads[i]).closest('.userContentWrapper');
    $(p).remove();
    var p = $(ads[i]).closest('.fbUserContent');
    $(p).remove();    
  }

}

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      removeAds();

      lastCheck = Date.now();

      jQuery(window).bind('mousewheel', function (event) {
        if (Date.now() < lastCheck + 1000) {
          return;
        }
        removeAds();
        lastCheck = Date.now()
      });
    }
  }, 10);
});