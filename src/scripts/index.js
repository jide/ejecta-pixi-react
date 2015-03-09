// Shim the DOM for React.

var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;

document.nodeType = DOC_NODE_TYPE;
document.body.nodeType = ELEMENT_NODE_TYPE;

// React checks this for IE.
document.documentElement = {
  style: {
    cssFloat: 'none'
  }
};

// Fake a wrapper node.
var node = new HTMLElement('div');
window.app = node;
node.id = 'app';
node.nodeType = ELEMENT_NODE_TYPE;
node.ownerDocument = document;
node.firstChild = window.canvas;

// Otherwise the canvas does not show up.
window.canvas.style.width = window.innerWidth + 'px';
window.canvas.style.height = window.innerHeight + 'px';

// React uses those to compare with server rendering.
window.canvas.getAttribute = function(attr){
  return this[attr];
};
window.canvas.removeAttribute = function(attr){
  delete this[attr];
};
window.canvas.setAttribute = function(attr, value){
  this[attr] = value;
};

// Helps with hit test.
window.canvas.getBoundingClientRect = function() {
  return {
    top: this.offsetTop, left: this.offsetLeft,
    width: this.offsetWidth, height: this.offsetHeight,
    right: this.offsetWidth, bottom: this.offsetHeight
  };
};

// Better logging.
window.console._log = function(level, args) {
  var txt = level + ':';
  for (var i = 0; i < args.length; i++) {
    var arg = '';
    if (Object.prototype.toString.call(args[i]) === "[object Object]") {
      var seen = [];
      arg = JSON.stringify(args[i], function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) return;
          seen.push(val)
        }
        return val
      });
    }
    else if (typeof args[i] == 'function') {
      arg = args[i].toString();
    }
    else {
      arg = args[i];
    }
    txt += ' ' + arg;
  }
  window.ejecta.log( txt );
};

// Fake a server rendering so that window.canvas will be reused by React.
EjectaReactShim = function(outerHTML) {
  window.canvas['data-reactid'] = outerHTML.match(/ data-reactid="([^"]*)"/)[1];
  window.canvas['data-react-checksum'] = outerHTML.match(/ data-react-checksum="([^"]*)"/)[1];
}

ejecta.include('app.js');
