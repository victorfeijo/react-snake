import React from 'react'
import ReactDOM from 'react-dom'
import { Stage, Layer, Rect } from 'react-konva'

import './main.scss'

const directions = {
  left: {
    x: -1,
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
    x: 1,
    y: 0,
  },
}

const speed = 20

type Direction = {
  x: number
  y: number
}
type ColoredRectProps = {
  direction: Direction
}

class ColoredRect extends React.Component<ColoredRectProps, any> {
  state = {
    color: 'green',
    x: 80,
    y: 80,
    tail: [
      { x: 60, y: 80 },
      { x: 40, y: 80 },
      { x: 20, y: 80 },
      { x: 0, y: 80 },
    ],
  }

  componentDidMount() {
    setInterval(() => {
      const { x, y, tail } = this.state
      const { direction } = this.props

      const tailCopy = [...tail]
      tailCopy.pop()
      const newTail = [{ x, y }, ...tailCopy]

      this.setState({
        x: (x + (speed * direction.x)),
        y: (y + (speed * direction.y)),
        tail: newTail,
      })
    }, 500)
  }

  render() {
    const { color, x, y, tail } = this.state

    return (
      <>
        <Rect
          x={x}
          y={y}
          width={20}
          height={20}
          fill={color}
          shadowBlur={5}
        />
        {tail.map(piece => (
          <Rect
            x={piece.x}
            y={piece.y}
            width={20}
            height={20}
            fill={color}
            shadowBlur={5}
          />
        ))}
      </>
    );
  }
}

// TODO: APP IS NOT A STATEFULL COMPONENT
class App extends React.Component {
  state = {
    direction: directions.right
  }

  updateDirection = (direction: Direction) => (
    () => this.setState({ direction })
  )

  render() {
    const { direction } = this.state

    return (
      <div className="app">
        <div className="board">
          <Stage width={400} height={400}>
            <Layer>
              <ColoredRect direction={direction} />
            </Layer>
          </Stage>
        </div>
        <div className="controls">
          <button className="control__btn" onClick={this.updateDirection(directions.left)}>←</button>
          <button className="control__btn" onClick={this.updateDirection(directions.up)}>↑</button>
          <button className="control__btn" onClick={this.updateDirection(directions.down)}>↓</button>
          <button className="control__btn" onClick={this.updateDirection(directions.right)}>→</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
