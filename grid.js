let rows=100;
let columns=26;


let addressColumnContainer=document.querySelector(".address-column-name");
let addressBarContainer=document.querySelector(".address-bar");
for(let i=0;i<rows;i++)
{
    let addressCol=document.createElement("div");
    addressCol.innerText=i+1;
    addressCol.setAttribute("class","address-column")
    addressColumnContainer.appendChild(addressCol);
}

let addressRowContainer=document.querySelector(".address-row-name");
    
for(let i=0;i<columns;i++)
{

  let addressRow=document.createElement("div");
  addressRow.innerText=String.fromCharCode(65+i);
  addressRow.setAttribute("class","address-row ");
  addressRowContainer.appendChild(addressRow);  
}


let cellsContainer=document.querySelector(".cell-container")
for(let i=0;i<rows;i++)
{
    let rowContainer=document.createElement("div");
    rowContainer.setAttribute("class","cell-rows");
    for(let j=0;j<columns;j++)
    {
       let cell=document.createElement("div");
       cell.setAttribute("class","cell");
       cell.setAttribute("contenteditable","true");
       cell.setAttribute("rid",i);
       cell.setAttribute("cid",j);
       cell.setAttribute("spellcheck","false");
       rowContainer.appendChild(cell);
       
      addListnerForAddressBarDisplay(cell,i,j);
     }
    cellsContainer.appendChild(rowContainer);
}


function addListnerForAddressBarDisplay(cell,i,j)
{
    cell.addEventListener("click", (e)=>{
        let rowId=i+1;
        let ColId=String.fromCharCode( 65+j);
        addressBarContainer.value=ColId+""+rowId;
    })
}

