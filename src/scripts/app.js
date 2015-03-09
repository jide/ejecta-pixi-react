var React = require('react');
var ReactPIXI = require('react-pixi');

var Stage = ReactPIXI.Stage;
var Sprite = ReactPIXI.Sprite;
var Text = ReactPIXI.Text;

var App = React.createClass({
  handleClick: function(event) {
    console.log('click');
  },

  render: function() {
    var fontstyle = {font:'40px Times'};
    return <Stage width={window.innerWidth} height={window.innerHeight}>
      <Sprite interactive={ true } touchstart={ this.handleClick } image={'images/raspberry.png'} width={200} height={200} />
      <Text text="Vector text" x={0} y={10} style={fontstyle} />
    </Stage>;
  }
});

if (typeof EjectaReactShim !== 'undefined') {
  EjectaReactShim(React.renderToString(<App />));
};

React.render(<App />, window.app);
