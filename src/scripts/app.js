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
  _raf: null,

  addRandomSprite: function(event) {
    console.log(event);
  },

  getInitialState: function() {
    return {
      x: 0
    };
  },

  componentDidMount: function() {
    this.tick();
  },

  tick: function() {
    //console.log('tick');
    this.setState({x: this.state.x + 1});
    this._tick = requestAnimationFrame(this.tick);
  },

  render: function() {
    var fontstyle = {font:'40px TimesNewRomanPSMT'};
    return <Stage width={this.props.width} height={this.props.height}>
      <Sprite x={ this.state.x } interactive={ true } click={ this.addRandomSprite } image={ 'images/raspberry.png' } width={this.props.width} height={this.props.height} />
      <Text text="Vector text" x={10} y={10} style={fontstyle} />
    </Stage>;
  }
});

var node = document.getElementById('app');

React.render(<App width={window.innerWidth} height={window.innerHeight} />, node || document.body);
