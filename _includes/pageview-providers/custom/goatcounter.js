(function (window, document) {
  var endpoint = '{{ include.endpoint | escape }}';

  function get(path, callback) {
    if (!path) {
      return;
    }

    // GoatCounter expects the complete page path, including its leading slash.
    var url = endpoint + '/counter/' + encodeURIComponent(path) + '.json';
    var request = new XMLHttpRequest();

    request.addEventListener('load', function () {
      if (request.status >= 200 && request.status < 300) {
        try {
          var result = JSON.parse(request.responseText);
          var count = result && result.count != null ? result.count : '0';

          if (typeof callback === 'function') {
            callback(count);
          }
        } catch (error) {
          if (window.console && window.console.warn) {
            window.console.warn('GoatCounter: could not parse the counter response.', error);
          }
        }
      } else if (request.status === 404) {
        // A path with no recorded visits may not have a counter entry yet.
        if (typeof callback === 'function') {
          callback('0');
        }
      } else if (window.console && window.console.warn) {
        window.console.warn('GoatCounter: counter request failed (' + request.status + ').');
      }
    });

    request.addEventListener('error', function () {
      if (window.console && window.console.warn) {
        window.console.warn('GoatCounter: network error while requesting the page counter.');
      }
    });

    request.open('GET', url, true);
    request.send();
  }

  function getAll(selector) {
    var elements = document.querySelectorAll(selector);

    Array.prototype.forEach.call(elements, function (element) {
      var path = element.getAttribute('data-page-path');

      get(path, function (count) {
        element.textContent = count;
        element.setAttribute('itemprop', 'userInteractionCount');
        element.setAttribute('content', count);
      });
    });
  }

  // Keep the same pageview namespace used by the original LeanCloud provider.
  // GoatCounter records visits automatically through count.js; there is no
  // separate increase() call as there was with LeanCloud.
  window.pageview = {
    get: get,
    getAll: getAll
  };
})(window, document);
