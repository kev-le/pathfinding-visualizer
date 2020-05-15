export function dijkstra(grid, sourceNode, destNode) {

    const srcRow = sourceNode.row
    const srcCol = sourceNode.col
    const destRow = destNode.row
    const destCol = destNode.col

    // this will be the return list
    let visitedNodes = []

    // deep copy of grid so we don't mutate state
    grid = JSON.parse(JSON.stringify(grid))

    // set source node dist = 0, so we can start the algorithm
    grid[srcRow][srcCol].distance = 0

    // represents unvisited nodes, if first element is Inf, then we are trapped
    // if unvisited is empty, then we have not found the destNode
    let unvisitedNodes = grid.flat()

    while (unvisitedNodes.length != 0) {
        // sort the unvisited node so last element is smallest
        unvisitedNodes = unvisitedNodes.sort( (nodeA, nodeB) => { return nodeB.distance - nodeA.distance })

        // pop the last element off
        let currNode = unvisitedNodes.pop()

        if (currNode.isWall) continue
        if (currNode.distance >= 999999) return visitedNodes
        
        visitedNodes.push(currNode)

        if (currNode.row === destRow && currNode.col === destCol){
            return visitedNodes
        }

        grid[currNode.row][currNode.col].isVisited = true

        // update distance of neighbors of currNode
        updateNeighbors(grid, currNode)
    }
    return visitedNodes
}

function updateNeighbors(grid, node) {
    const {row, col} = node
    const directions = [ {nr:row+1, nc:col },
                         {nr:row-1, nc:col },
                         {nr:row, nc:col+1 },
                         {nr:row, nc:col-1 }]

    // look at neighbor nodes in each direction and update distance if not visited yet
    for (const direction of directions) {
        const { nr, nc } = direction
        if (nr >= 0 && nr < grid.length && 
            nc >= 0 && nc < grid[0].length && grid[nr][nc].isVisited === false){
            grid[nr][nc].distance = node.distance + 1
        }
    }
}
