
//Utility function
function getElementFromString(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}
//Initialise no. of parameters
let addedParamCount=0;
// Hide parambox initially
let paramBox=document.getElementById('parametersBox');
paramBox.style.display=`none`;
 //If the user clicks on json radio button hide the param box and display the json request box
let jsonRadio=document.getElementById(`jsonRadio`);
jsonRadio.addEventListener('click',function(){
    let paramBox=document.getElementById('parametersBox');
paramBox.style.display=`none`;
let requestJsonBox=document.getElementById(`requestJsonBox`);
requestJsonBox.style.display=`block`;
})
// If the user clicks on Custom Parameter radio box hide the json box and display the param box
let paramsRadio=document.getElementById(`paramsRadio`);
paramsRadio.addEventListener(`click`,function(){
    let paramBox=document.getElementById('parametersBox');
    paramBox.style.display=`block`;
    let requestJsonBox=document.getElementById(`requestJsonBox`);
    requestJsonBox.style.display=`none`;
    })
//If the user clicks on add button add more params
let addParam=document.getElementById('addParam');
addParam.addEventListener('click',function(){
    let params=document.getElementById('params');
    let string=` <div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamCount+2}" placeholder="Enter Parameter ${addedParamCount+2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamCount+2}" placeholder="Enter Parameter ${addedParamCount+2} Value">
    </div>
    <button class="btn btn-primary deleteParam"> - </button>
</div>`;
let paramElement=getElementFromString(string);
params.appendChild(paramElement);
let deleteParam=document.getElementsByClassName('deleteParam');
for(item of deleteParam){
    item.addEventListener('click',(e)=>{
        a=confirm("Are u sure u want to delete this");
        // console.log(a);
        if(a==true){
        e.target.parentElement.remove();
    }

    })
}
addedParamCount++;
})


let submit=document.getElementById(`submit`);
submit.addEventListener('click',function(){
    document.getElementById(`responsePrism`).innerHTML=`Fetching Response.....`;
    let url=document.getElementById('url').value;
    let requestType=document.querySelector(`input[name='requestType']:checked`).value;
    let contentType=document.querySelector(`input[name='contentType']:checked`).value;
    

    if(contentType=='params'){
        data={}
        for(let i=0;i<addedParamCount+1;i++){
        if(document.getElementById('parameterKey'+(i+1))!=undefined){
        let key=document.getElementById('parameterKey'+(i+1)).value;
        let value=document.getElementById('parameterValue'+(i+1)).value;
          data[key]=value;
    }
    }
    data=JSON.stringify(data);
}else{
        data=document.getElementById('requestJsonText').value
}
       console.log('url is ',url);
       console.log('requestType is ',requestType);
       console.log('contentType is ',contentType);
       console.log('data is',data); 

       if(requestType=='GET'){
           fetch(url,{
               method:'GET'
           }).then(Response=>Response.text()).then((text)=>{
               document.getElementById('responsePrism').innerHTML=text;
                          Prism.highlightAll();
           })
       }else{
           fetch(url,{
               method:'POST',
               body:data,
               headers:{
                   "Content-type":"application/json; charset=UTF-8"
               }
           }).then((Response)=>Response.text()).then((text)=>{
               document.getElementById('responsePrism').innerHTML=text;
               Prism.highlightAll();
           })
       }
})
