for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellprop] = getactiveCell(address);
            let enteredData = activeCell.innerText;

            if (enteredData === cellprop.value) return;

            cellprop.value = enteredData;
            // If data modified update the data and break parent child relation and make formula empty
            removeFromParent(cellprop.formula);
            cellprop.formula = "";

            updateChildrenCells(address);
        })
    }

}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e) => {
    let inputFormula = formulaBar.value;
    if (e.key === "Enter" && formulaBar.value) {
        // If formula change then change it ,break past relation and builld new child parent relationship
        let address = addressBar.value;
        let [cell, cellprop] = getactiveCell(address);
        if (inputFormula !== cellprop.formula) removeFromParent(cellprop.formula);



        addChildToGraphComponent(inputFormula, address);
        //check formula is cyclic or not ,
        let  CyclicResponse = isGraphCyclic(graphComponentMatrix);
        if (CyclicResponse) {
          //  alert(" Your formula is cyclic ");
          let responces=confirm("your formula is Cyclic ,Do you want to trace your cycle");
           while(responces===true)
           {
               // keep on tracking color until user is satishfied.
              await isGraphCyclicTrachPath(graphComponentMatrix,CyclicResponse);// I want to wait ti see the color
                responces=confirm("your formula is Cyclic ,Do you want to trace your cycle");

           }
          removeChildFromGraphComponent(inputFormula, address);
            return;
        }
        let evaluatedValue = evaluateFormula(inputFormula);


        setCellUIandCellProp(evaluatedValue, inputFormula, address);
        addParentChildRelation(inputFormula);
        updateChildrenCells(address);
    }
})

function removeChildFromGraphComponent(inputFormula, childAddress) {
    let [crid, ccid] = decodeRowAndCol(childAddress);
    let encoderFormula = inputFormula.split(" ");

    for (let i = 0; i<encoderFormula.length; i++) {
        let asciiValue =  encoderFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRowAndCol(encoderFormula[i]);

            graphComponentMatrix[prid][pcid].pop();

        }
    }
}


function addChildToGraphComponent(inputformula, childAddress) {
    let [crid, ccid] = decodeRowAndCol(childAddress);
    let encoderFormula = inputformula.split(" ");
    console.log(encoderFormula);
    for (let i = 0;i< encoderFormula.length; i++) {
        let asciiValue = encoderFormula[i].charCodeAt(0);
         
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRowAndCol(encoderFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

function updateChildrenCells(parentAddress) {

    let [parentcell, parentcellprop] = getactiveCell(parentAddress);
    let children = parentcellprop.children;

    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        let [childcell, childcellprop] = getactiveCell(childAddress);
        let childFormula = childcellprop.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIandCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}

function addParentChildRelation(formula) {
    let childAddress = addressBar.value;
    let encoderFormula = formula.split(" ");
    for (let i = 0; i < encoderFormula.length; i++) {
        let asciiValue = encoderFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellprop] = getactiveCell(encoderFormula[i]);
            cellprop.children.push(childAddress);
        }
    }
}

function removeFromParent(formula) {
    let childAddress = addressBar.value;
    let encoderFormula = formula.split(" ");
    for (let i = 0; i < encoderFormula.length; i++) {
        let asciiValue = encoderFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellprop] = getactiveCell(encoderFormula[i]);
            let index = cellprop.children.indexOf(childAddress);
            cellprop.children.splice(index, 1);
        }
    }
}

function evaluateFormula(formula) {

    let encoderFormula = formula.split(" ");
    for (let i = 0; i < encoderFormula.length; i++) {
        let asciiValue = encoderFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellprop] = getactiveCell(encoderFormula[i]);
            encoderFormula[i] = cellprop.value;
            console.log(sheetDB);
        }
    }
    let decodedFormula = encoderFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIandCellProp(evaluatedValue, formula, address) {

    let [cell, cellprop] = getactiveCell(address);
    cell.innerText = evaluatedValue;
    cellprop.value = evaluatedValue;
    cellprop.formula = formula;
}