


function colorPromise()
{
    return new Promise( (resolve,reject)=>
    {
        setTimeout(()=>{
           resolve();
        },1000);
    })
}

 async function isGraphCyclicTrachPath(graphComponentMatrix,CyclicResponse) {
  let [srcr,srcc]=CyclicResponse;
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
 
 let response = await dfsCycleDetectionTrashPath(graphComponentMatrix, srcr, srcc, visited, dfsvisited)
       if(response==true)
       {
         return Promise.resolve(true);
       }

       return Promise.resolve(false);
}

 
// coloring cells for tracking 
async function dfsCycleDetectionTrashPath(graphComponentMatrix, srcr, srcc, visited, dfsvisited) {
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;
   
    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor="lightblue";
     await colorPromise();

    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [crid, ccid] = graphComponentMatrix[srcr][srcc][children];
        if (visited[crid][ccid] === false) {
            let response = await dfsCycleDetectionTrashPath(graphComponentMatrix, crid, ccid, visited, dfsvisited);
            if (response === true) 
            {
                cell.style.backgroundColor="transparent";
                await colorPromise(); 

                return Promise.resolve(true);
            }  //// cycle found so return imimdiately no need to explore more

        }
        else if (dfsvisited[crid][ccid] === true) {
            let cyclicCell=document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`);
            cyclicCell.style.backgroundColor="grey";
            await colorPromise();
            cyclicCell.style.backgroundColor="transparent";
            await colorPromise();
            cell.style.backgroundColor="transparent";
            return Promise.resolve(true);
        }
    }

    dfsvisited[srcr][srcc] = false;

    return Promise.resolve(false);
}