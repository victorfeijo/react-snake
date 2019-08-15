import React from 'react'
import ReactDOM from 'react-dom'
import { Stage, Layer, Rect } from 'react-konva'

class ColoredRect extends React.Component {
  state = {
    color: 'green',
    x: 20,
    y: 20
  }

  componentDidMount() {
    console.log('oi')

    setInterval(() => {
      const { x, y } = this.state

      this.setState({ x: x + 5, y })
    }, 100)
  }

  render() {
    const { color, x, y } = this.state

    return (
      <Rect
        x={x}
        y={y}
        width={20}
        height={20}
        fill={color}
        shadowBlur={5}
      />
    );
  }
}

const App = (_props: any) => (
  <div>
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <ColoredRect />
      </Layer>
    </Stage>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'))
