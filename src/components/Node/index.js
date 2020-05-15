import React, { Component } from 'react';

class Node extends Component {

  render() {
    const { 
      row,
      col, 
      key, 
      isSource, 
      isDest, 
      isVisited,
      isWall,
      onMouseDown, 
      onMouseUp, 
      onMouseEnter } = this.props
    let classNames = ['node']

    if (isDest) classNames.push('destinationNode')
    if (isSource) classNames.push('sourceNode')
    if (isVisited && !isDest && !isSource) classNames.push('visited')
    if (isWall) classNames.push('wall')

    classNames = classNames.join(' ')

    return <div 
              id={key}
              className={classNames}
              onMouseDown={() => onMouseDown(row, col)}
              onMouseUp={() => onMouseUp()}
              onMouseEnter={() => onMouseEnter(row, col)}
            />
  }
}
export default (Node);
