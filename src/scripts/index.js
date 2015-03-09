// Shim the DOM for React.

var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;

document.nodeType = DOC_NODE_TYPE;
document.body.nodeType = ELEMENT_NODE_TYPE;

document.documentElement = {
  style: {
    cssFloat: 'fake'
  }
};

var node = new HTMLElement('div');
window.app = node;
node.id = 'app';
node.nodeType = ELEMENT_NODE_TYPE;
node.ownerDocument = document;
node.firstChild = window.canvas;

window.canvas.style.width = window.innerWidth + 'px';
window.canvas.style.height = window.innerHeight + 'px';

window.canvas.getAttribute = function(attr){
  return this[attr];
};
window.canvas.removeAttribute = function(attr){
  delete this[attr];
};
window.canvas.setAttribute = function(attr, value){
  this[attr] = value;
};

window.console = {
  _log: function(level, args) {
    var txt = level + ':';
    for (var i = 0; i < args.length; i++) {
      txt += ' ' + (typeof args[i] !== 'object' ? args[i].toString() : JSON.stringify(args[i]));
    }
    ej.log( txt );
  },
  
  assert: function() {
    var args = Array.prototype.slice.call(arguments);
    var assertion = args.shift();
    if( !assertion ) {
      ej.log( 'Assertion failed: ' + args.join(', ') );
    }
  }
};

EjectaReactShim = function(outerHTML) {
  window.canvas['data-reactid'] = outerHTML.match(/ data-reactid="([^"]*)"/)[1];
  window.canvas['data-react-checksum'] = outerHTML.match(/ data-react-checksum="([^"]*)"/)[1];
}

ejecta.include('app.js');
