
let downloadbtn=document.querySelector(".download");
let openBtn=document.querySelector(".open");


//download
downloadbtn.addEventListener("click",(e)=>{
    let data=JSON.stringify( [sheetDB,graphComponentMatrix]);
    let file=new Blob([data],{type: "application/json"});
    let a=document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download="SheetData.json";
    a.click();

})


//open Task (upload)

openBtn.addEventListener("click",(e)=>{

    //Open file explorer
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fileReader=new FileReader();
        let files=input.files ;
        let fileObj=files[0];
        fileReader.readAsText(fileObj);
        fileReader.addEventListener("load",(e)=>{
            let readSheetData=JSON.parse(fileReader.result);
            addSheetButton.click(); //create sheet for upload data
            // we can also recieve sheetDB and graphcomponents through click
            sheetDB=readSheetData[0];
            graphComponentMatrix=readSheetData[1];
            collectedSheetDB[collectedSheetDB.length-1]=sheetDB;
            collectedgraphComponentMatrix[collectedgraphComponentMatrix.length-1]=graphComponentMatrix;
         handleSheetProperties(sheet);
        })
    })

})