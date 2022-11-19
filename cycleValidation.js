
let collectedgraphComponentMatrix=[];
let graphComponentMatrix = [];

// for (let i = 0; i < rows; i++) {
//     let row = [];
//     for (let j = 0; j < columns; j++) {
//         //more than one child relation dependency
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }

function isGraphCyclic(graphComponentMatrix) {
    let visited = [];
    let dfsvisited = [];

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < columns; j++) {

            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsVisitedRow);
    }

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < columns; j++) {

            if(visited[i][j]==false){
             let response=  dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsvisited)
             if(response===true)  return [i,j];
            }
        }

    }
    return null;
}

///. start -> visited -true, dfsvisited- true
// end=dfs-false
// if(visited[i][j]==true) -> already explored go back return
//  cycledetection condition -> if(vi[i][j]==true&&fdsvisited[i][j]==true)-> cyclic
function dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsvisited) {
    visited[i][j] = true;
    dfsvisited[i][j] = true;

    for (let children = 0; children < graphComponentMatrix[i][j].length; children++) {
        let [crid, ccid] = graphComponentMatrix[i][j][children];
        if (visited[crid][ccid] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, crid, ccid, visited, dfsvisited);
            if (response === true) return true;   //// cycle found so return imimdiately no need to explore more

        }
        else if (dfsvisited[crid][ccid] === true) {
            return true;
        }
    }

    dfsvisited[i][j] = false;

    return false;
}