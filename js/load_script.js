function isLoadedScript(url) {
  return document.querySelectorAll('[src="' + url + '"]').length > 0;
}

function loadScript(url, callback) {
  var script = document.createElement("script")
  script.type = "text/javascript";
  if (script.readyState) { //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { //Others
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  if (!isLoadedScript(url)) { // script file not exist
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}