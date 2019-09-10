import React from 'react'
import ReactDOM from 'react-dom'
import { Stage, Layer, Rect } from 'react-konva'

import './main.scss'

const directions = {
  left: {
    x: 1,
    y: 0,
  },
  up: {
    x: 0,
    y: -1,
  },
  down: {
    x: 0,
    y: 1,
  },
  right: {
    x: -1,
    y: 0,
  },
}

const speed = 5

class ColoredRect extends React.Component {
  state = {
    color: 'green',
    direction: directions.left,
    x: 20,
    y: 20
  }

  componentDidMount() {
    setInterval(() => {
      const { x, y, direction } = this.state

      this.setState({
        x: (x + (speed * direction.x)),
        y: (y + (speed * direction.y)),
      })
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

//TODO: APP IS NOT A STATEFULL COMPONENT
const App = (_props: any) => (
  <div className="app">
    <div className="board">
      <Stage width={400} height={400}>
        <Layer>
          <ColoredRect />
        </Layer>
      </Stage>
    </div>
    <div className="controls">
      <button className="control__btn" onClick={() => this.setState({ direction: directions.left })}>←</button>
      <button className="control__btn" onClick={() => this.setState({ direction: directions.up })}>↑</button>
      <button className="control__btn" onClick={() => this.setState({ direction: directions.down })}>↓</button>
      <button className="control__btn" onClick={() => this.setState({ direction: directions.right })}>→</button>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'))
