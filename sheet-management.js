let addSheetButton= document.querySelector(".sheet-add-icon");
let sheetFolderContainer=document.querySelector(".sheets-folder-cont");
addSheetButton.addEventListener("click",(e)=>{
    let sheet =document.createElement("div");
    sheet.setAttribute("class","sheet-folder");
     let allSheetFolder=document.querySelectorAll(".sheet-folder");

    sheet.setAttribute("id",allSheetFolder.length);

    sheet.innerHTML=`<div class="sheet-content"> Sheet-${allSheetFolder.length +1}
    </div>`;
   sheetFolderContainer.appendChild(sheet);

   sheet.scrollIntoView();

   createSheetDB();  //storage for every sheet
   CreategraphComponentMatrix(); 
   handleSheetActiveness(sheet);
   handleSheetRemoval(sheet);
   sheet.click();
})
 
function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e)=>{
        if(e.button!==2) return;
 
        let allSheetFolder=document.querySelectorAll(".sheet-folder");
     if(allSheetFolder.length===1)
     {
         alert("One Sheet is necessary!");
         return;
     }

     
     let sheetIdx=sheet.getAttribute("id");
     let response=confirm("Your sheet will be removed permanantly , are you sure?")

     if(response===false)return;

     collectedSheetDB.splice(sheetIdx,1);
     collectedgraphComponentMatrix.splice(sheetIdx,1);
     handleSheetUIAfterRemoving(sheet);
     sheetDB=collectedSheetDB[0];
     graphComponentMatrix=collectedgraphComponentMatrix[0];
     handleSheetProperties();




    })


} 
function handleSheetUIAfterRemoving(sheet)
{
    sheet.remove();
    let allSheetFolder=document.querySelectorAll(".sheet-folder");
for(let i=0;i<allSheetFolder.length;i++)
{
    allSheetFolder[i].setAttribute("id",i);
    let sheetcontent=allSheetFolder[i].querySelector(".sheet-content");
    sheetcontent.innerHTML=`Sheet${i+1}`;
    allSheetFolder[i].style.backgroundColor="transparent";
}
    allSheetFolder[0].style.backgroundColor="grey";

}

function handleSheetDB(sheetIdx){
   sheetDB=collectedSheetDB[sheetIdx];
   graphComponentMatrix=collectedgraphComponentMatrix[sheetIdx];
}

function handleSheetProperties(){
   for(let i=0;i<rows;i++)
   {
       for(let j=0;j<columns;j++)
       {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.click();
       }
   }
// by default clicked oon first cell 

let firtscell=document.querySelector(".cell");
firtscell.click();

   
}
 
function handleActiveSheetUI(sheet)
{
    let allSheetFolder=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolder.length;i++)
    {
        allSheetFolder[i].style.backgroundColor="transparent";

    }
    sheet.style.backgroundColor="grey";
}



function handleSheetActiveness(sheet){
   sheet.addEventListener("click",(e)=>{
       let sheetIdx=Number(sheet.getAttribute("id"));
       handleSheetDB(sheetIdx);
       handleSheetProperties();
       handleActiveSheetUI(sheet);
   })
}


function createSheetDB(){

    
let sheetDB = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < columns; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            backgroundColor: "#000000",  //just for indigatio purpose default values
            value:"",
            formula:"",
            children:[]
        }
        sheetRow.push(cellProp);
    }

    sheetDB.push(sheetRow);
}
collectedSheetDB.push(sheetDB);

}

function CreategraphComponentMatrix()
{
    let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
        //more than one child relation dependency
        row.push([]);
    }
    graphComponentMatrix.push(row);
}
collectedgraphComponentMatrix.push(graphComponentMatrix);
}