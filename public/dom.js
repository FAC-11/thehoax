function httpRequest (url, reqType, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      cb(xhr.status, xhr.responseType);
    }
  }
  xhr.open(reqType, url, true);
  xhr.send();
}


httpRequest('/tinfoild', 'GET', function(err, data) {
  if (err) console.log(err);
  console.log(data);
});





// httpRequest(url, 'get', '/getData' cb)
