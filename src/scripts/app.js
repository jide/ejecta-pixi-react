var React = require('react/addons');
var ReactPIXI = require('react-pixi');

if (typeof ejecta !== 'undefined') {
  ReactPIXI.Stage.type.prototype.getDOMNode = function() {
    return window.canvas;
  }
};

var Stage = ReactPIXI.Stage;

var Sprite = ReactPIXI.Sprite;
var Text = ReactPIXI.Text;

var App = React.createClass({
  render: function() {
    var fontstyle = {font:'40px TimesNewRomanPSMT'};
    return <Stage width={this.props.width} height={this.props.height}>
      <Sprite image={ 'images/raspberry.png' } width={this.props.width} height={this.props.height} />
      <Text text="Vector text" x={10} y={10} style={fontstyle} />
    </Stage>;
  }
});

var node = document.getElementById('app');

React.render(<App width={window.innerWidth} height={window.innerHeight} />, node || document.body);
