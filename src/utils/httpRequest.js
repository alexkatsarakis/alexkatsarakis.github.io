function httpGetAsync(type, url, data, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open(type, url, true); // true for asynchronous
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(data);
}

function Promisify(f) {
  return (type, url, data) =>
    new Promise((resolve, reject) => {
      f(type, url, data, resolve);
    });
}

const httpRequest = Promisify(httpGetAsync);

export default httpRequest;
