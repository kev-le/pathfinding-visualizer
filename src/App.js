import React, { Component } from 'react';
import './App.css';
import {dijkstra} from './algorithms/dijkstra'
import Node from './components/Node'

const NUM_ROWS = 15
const NUM_COLS = 30
const SOURCE_NODE = {row:10, col:5}
const DESTINATION_NODE = {row:5, col:27}

function createGrid(rowLength, colLength) {
  let grid = []
  for (let row = 0; row < rowLength; row++) {
    let rowArr = []
    for (let col = 0; col < colLength; col++) {
      rowArr.push(createNode({row: row, col: col}))
    }
    grid.push(rowArr)
  }
  return grid
}

function createNode(props) {
  const {row, col } = props
  return {
    row: row,
    col: col,
    isSource: row === SOURCE_NODE.row && col === SOURCE_NODE.col,
    isDest: row === DESTINATION_NODE.row && col === DESTINATION_NODE.col,
    isVisited: false,
    isWall: false,
    distance: 999999
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      mouseDown: false
    }
  }

  componentDidMount() {
    const grid = createGrid(NUM_ROWS, NUM_COLS)
    this.setState({grid})
  }

  startDijkstra() {
    const {grid} = this.state
    const sourceNode = grid[SOURCE_NODE.row][SOURCE_NODE.col]
    const destNode = grid[DESTINATION_NODE.row][DESTINATION_NODE.col]
    const visitedNodes = dijkstra([...grid], sourceNode, destNode)
    this.animateDijkstra(visitedNodes)
  }

  animateDijkstra = (visitedNodes) => {
    for (let i=0; i < visitedNodes.length; i++) {
      setTimeout( () => {
        const node = visitedNodes[i]
        let newGrid = this.state.grid.slice()
        newGrid[node.row][node.col].isVisited = true
        this.setState({grid: newGrid})
      }, 20*i)
    }
  }

  handleMouseDown = (row, col) => {
    this.setState({mouseDown: true})
    this.toggleWall(row, col)
  }

  handleMouseEnter = (row, col) => {
    if (this.state.mouseDown === false) return
    this.toggleWall(row, col)
  }

  handleMouseUp = () => {
    this.setState({mouseDown: false})
  }

  toggleWall = (nodeRow, nodeCol) => {
    const newGrid = [...this.state.grid]
    newGrid[nodeRow][nodeCol].isWall = !newGrid[nodeRow][nodeCol].isWall
    this.setState( {grid: newGrid} )
  }

  render() {
    const {grid} = this.state

    return (
      <div className="App">
        <h1> Path Finding</h1>
        <button onClick={() => this.startDijkstra()}>Start Dijkstra</button>
        {grid.map( (row, rowIdx) => {
          return (
            <div key={"row " + rowIdx} className="row">
              {row.map( (node) => {
                const { row, col, isSource, isDest, isVisited, isWall } = node
                return <Node
                          key={row + ' ' + col}
                          row={row}
                          col={col}
                          isSource={isSource}
                          isDest={isDest}
                          isVisited={isVisited}
                          isWall={isWall}
                          onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                          onMouseUp={() => this.handleMouseUp()}
                          onMouseEnter={(row,col) => this.handleMouseEnter(row, col)}
                       />
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default App;
