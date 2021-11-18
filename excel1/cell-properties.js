//storage
let collectedSheetDB=[];

 let sheetDB =[];

{
    let addSheetButton=document.querySelector(".sheet-add-icon");
    addSheetButton.click();
    //handleSheetProperties();
}
// for (let i = 0; i < rows; i++) {
//     let sheetRow = [];
//     for (let j = 0; j < columns; j++) {
//         let cellProp = {
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor: "#000000",
//             backgroundColor: "#000000",  //just for indigatio purpose default values
//             value:"",
//             formula:"",
//             children:[]
//         }
//         sheetRow.push(cellProp);
//     }

//     sheetDB.push(sheetRow);
// }
let addressBar = document.querySelector(".address-bar");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let backgroundColor = document.querySelector(".b-color-prop");
let fontColor = document.querySelector(".font-color-prop");
 
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightALign = alignment[2];


let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";
// Application of two way binding



////attack click listners

bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellprop] = getactiveCell(address);

    //modification >>>

    cellprop.bold = !cellprop.bold; //data change
    cell.style.fontWeight = cellprop.bold ? "bold" : "normal"; // UI change 1
    bold.style.backgroundColor = cellprop.bold ? activeColorProp : inactiveColorProp;  // UI change II
})


italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellprop] = getactiveCell(address);

    //modification >>>

    cellprop.italic = !cellprop.italic; //data change
    cell.style.fontStyle = cellprop.italic ? "italic" : "normal"; // UI change 1
    italic.style.backgroundColor = cellprop.italic ? activeColorProp : inactiveColorProp;  // UI change II
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellprop] = getactiveCell(address);

    //modification >>>

    cellprop.underline = !cellprop.underline; //data change
    cell.style.textDecoration = cellprop.underline ? "underline" : "none"; // UI change 1
    underline.style.backgroundColor = cellprop.underline ? activeColorProp : inactiveColorProp;  // UI change II
})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellprop] = getactiveCell(address);
    cellprop.fontSize = fontSize.value;
    cell.style.fontSize = cellprop.fontSize + "px";
    fontSize.value = cellprop.fontSize;
})
fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellprop] = getactiveCell(address);
    cellprop.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellprop.fontFamily;
    fontFamily.value = cellprop.fontFamily;
})

fontColor.addEventListener("change", (e) => {

    let address = addressBar.value;
    let [cell, cellprop] = getactiveCell(address);
    cellprop.fontColor = fontColor.value;
    cell.style.color = cellprop.fontColor;
    fontColor.value = cellprop.fontColor;

})
backgroundColor.addEventListener("change", (e) => {

    let address = addressBar.value;
    let [cell, cellprop] = getactiveCell(address);
    cellprop.backgroundColor = backgroundColor.value;
    cell.style.backgroundColor = cellprop.backgroundColor;
    backgroundColor.value = cellprop.backgroundColor;

})

alignment.forEach((alignElement) => {
    alignElement.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellprop] = getactiveCell(address);
        let alignValue = e.target.classList[0];
        cellprop.alignment = alignValue; // DATA change
        cell.style.textAlign = cellprop.alignment;  //UI 1
        switch (alignValue) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightALign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightALign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightALign.style.backgroundColor = activeColorProp;
                break;

        }
        
    })
})


let allCells=document.querySelectorAll(".cell");
for(let i=0;i<allCells.length;i++)
{
    addListnerToAttachCellProperties(allCells[i]);
}

function addListnerToAttachCellProperties(cell){
    cell.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [rid, cid] = decodeRowAndCol(address);
        let cellprop=sheetDB[rid][cid];
       
        // apply cell properties
        cell.style.fontWeight = cellprop.bold ? "bold" : "normal"; // UI change 1
        cell.style.fontStyle = cellprop.italic ? "italic" : "normal"; // UI change 1
        cell.style.textDecoration = cellprop.underline ? "underline" : "none"; // UI change 1
        cell.style.fontSize = cellprop.fontSize + "px";
        cell.style.fontFamily = cellprop.fontFamily;
        cell.style.color = cellprop.fontColor;
        cell.style.backgroundColor = cellprop.backgroundColor=== "#000000"? "transparant": cellprop.backgroundColor;
        cell.style.textAlign = cellprop.alignment;  //UI 1


        //Apply UI props container
        bold.style.backgroundColor = cellprop.bold ? activeColorProp : inactiveColorProp;  // UI change II
        italic.style.backgroundColor = cellprop.italic ? activeColorProp : inactiveColorProp;  // UI change II
        underline.style.backgroundColor = cellprop.underline ? activeColorProp : inactiveColorProp;  // UI change II
        
        fontColor.value = cellprop.fontColor;
        backgroundColor.value = cellprop.backgroundColor;
        switch (cellprop.alignment) { // UI change 11
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightALign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightALign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightALign.style.backgroundColor = activeColorProp;
                break;

        }
        let formulaBar=document.querySelector(".formula-bar");
        formulaBar.value=cellprop.formula;
        cell.innerText=cellprop.value;
    })
}

function getactiveCell(address) {
    let [rid, cid] = decodeRowAndCol(address);
    // Access cell and storage object

    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRowAndCol(address) {
    let rid = Number(address.slice(1)) - 1;
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid, cid];
}