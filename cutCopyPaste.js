let ctrKey;

document.addEventListener("keydown", (e) => {
    ctrKey = e.ctrlKey;
})

document.addEventListener("keyup", (e) => {
    ctrKey = e.ctrlKey;
})

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {

        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleCollectedCell(cell);
    }
}

let copybtn = document.querySelector(".copy");
let cutbtn = document.querySelector(".cut");
let pastebtn = document.querySelector(".paste");


let rangeStorage = [];
function handleCollectedCell(cell) {
    cell.addEventListener("click", (e) => {
        if (!ctrKey) return;

        if (rangeStorage.length >= 2) {
            defaultSelectiveCellUI();
            rangeStorage = [];
        }

        //UI
        cell.style.border = "3px solid grey";

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));

        rangeStorage.push([rid, cid]);

    })
}


function defaultSelectiveCellUI() {
    for (let i = 0; i < rangeStorage.length; i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid #dfe4ea";
    }
}

let copyData = [];

copybtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) return;

    copyData = [];

    let [startRow, startColumn, endRow, endColumn] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1]];

    for (let i = startRow; i <= endRow; i++) {
        let copyRow = [];
        for (let j = startColumn; j <= endColumn; j++) {
            let cellprop = sheetDB[i][j];
            copyRow.push(cellprop);
        }
        copyData.push(copyRow);
    }
    defaultSelectiveCellUI();
})

cutbtn.addEventListener("click", (e) => {

    if (rangeStorage.length < 2) return;


    let [startRow, startColumn, endRow, endColumn] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1]];


    for (let i = startRow; i <= endRow; i++) {

        for (let j = startColumn; j <= endColumn; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);


            let cellprop = sheetDB[i][j];
            cellprop.value = "";
            cellprop.bold = false;
            cellprop.italic = false;
            cellprop.underline = false;
            //cellprop.formula=data.formula;
            cellprop.fontSize = 14;
            cellprop.fontFamily = "monospace";
            cellprop.fontColor = "#000000";
             cellprop.backgroundColor="transparent";
            cellprop.alignment = "left";

         console.log(cellprop.backgroundColor);
            cell.click();
        }

    }
    defaultSelectiveCellUI();
})
pastebtn.addEventListener("click", (e) => {

    if (rangeStorage.length < 2) return;

    let address = addressBar.value;
    let [strtrid, strtcid] = decodeRowAndCol(address);
    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    for (let i = strtrid, r = 0; i <= strtrid + rowDiff; i++, r++) {
        for (let j = strtcid, c = 0; j <= strtcid + colDiff; j++, c++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if (!cell) continue;

            let data = copyData[r][c];
            let cellprop = sheetDB[i][j];


            //db
            cellprop.value = data.value;
            cellprop.bold = data.bold;
            cellprop.italic = data.italic;
            cellprop.underline = data.underline;
            //cellprop.formula=data.formula;
            cellprop.fontSize = data.fontSize;
            cellprop.fontFamily = data.fontFamily;
            cellprop.fontColor = data.fontColor;
            cellprop.backgroundColor = data.backgroundColor;
            cellprop.alignment = data.alignment;


            //UI
            cell.click();
        }
    }

})