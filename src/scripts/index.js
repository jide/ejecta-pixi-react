var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;

document.nodeType = DOC_NODE_TYPE;
document.body.nodeType = ELEMENT_NODE_TYPE;

document.documentElement = {
  style: {
    cssFloat: 'fake'
  }
};

document.getElementById('canvas').style.width = window.innerWidth + 'px';
document.getElementById('canvas').style.height = window.innerHeight + 'px';

ejecta.include('app.js');
