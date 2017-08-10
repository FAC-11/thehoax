var table = document.getElementById('conspiracy-table');


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


function render(err, data) {
  if (err) {
    console.log(err);
  }
  else {
    var searches = JSON.parse(data);
    // console.log(searches);
    searches.forEach(function(search) {
      console.log(search)
      var row = document.createElement('tr');
      var name = document.createElement('td');
      name.innerHTML = search.username;
      row.appendChild(name);

      var conspiracy = document.createElement('td');
      conspiracy.innerHTML = search.search;
      row.appendChild(conspiracy);

      var date = document.createElement('td');
      date.innerHTML = search.searchdate;
      row.appendChild(date);
      table.appendChild(row);
    })
  }
}

httpRequest('/tinfoild', 'GET', render);





// httpRequest(url, 'get', '/getData' cb)
