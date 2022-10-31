
var toDoListLength;
const modal = document.querySelector("dialog");

//open the modal to enter details about new To list

function addAnItemToList(e){

    modal.showModal();

}

// save and create new list to previousItem 

function saveValuesToJSON(){
    const newValue =  {
        id : toDoListLength.length + 1,
        title: document.getElementById('title').value, // getting the value from input boxes
        description: document.getElementById('desc').value,
        due_date: document.getElementById('due_date').value,
        due_time: document.getElementById('due_time').value ,
        status : true
    }

    toDoListLength.push(newValue);
    createDynamicList([newValue] , true);

    // close modal , once list is created 
     modal.close();

}

/*function to check whether item is clicked to complete state
completed : it will mark status as completed and notification popsup
open : will stay as open 
*/
function todoStatusCheck(event){
   
    const id = event.target.id.split('_')[1];
    let updateStatus = document.getElementById(`updateStatus_${id}`);
    const item = toDoListLength.find(el => el.id === parseInt(id));

    //marked as completed 
    if(event.target.checked){
        
        updateStatus.innerHTML = "Status : Completed";
        updateStatus.style.color = "green";

        if(item) item.status = false;
           //notify icon to mark as completed
        const notify = document.getElementById("dialogContent");
        notify.innerText = `${item.title} -  marked as completed`;
        notify.style.display = "block"
        setTimeout(() => {
            notify.style.display = "none"
        } , 2000)

    }else{
        updateStatus.innerHTML = "Status : Open";
        updateStatus.style.color = "red";
        if(item) item.status = true;

    }
      
      
     console.log(toDoListLength); // incase post request need to send to server .. finding item to modify the status

}



// common function to create a individual list item
function createDivBox(_mainDiv , value , id){

    const _todoDiv = document.createElement('div');
    _todoDiv.innerHTML = `<div class="standardDiv">
    <i class="fa-sharp fa-solid fa-plus" id="iconButton" onClick="expandDiv(event, ${_mainDiv.getAttribute('id').split('_')[1]})"></i>   
     <div> ${value.title} </div>
     <input type="checkbox" class="checkBox" id="status_${id}" name="status" onclick="todoStatusCheck(event)">
    </div>

    <div class="expandDiv" id=details_${id}>
    <div><b>Description</b> : &nbsp; ${value.description}</div>
    <div><b>Due Date</b> : &nbsp;  ${value.due_date} </div>
    <div><b>Due time </b> : &nbsp ${value.due_time}</div>
    <div class ="status" id="updateStatus_${id}">Status  :&nbsp; ${value.status ? "open" : "completed"}</div>
  </div>`
    return _todoDiv;

}

/*function to expand and minimise the div to see detailed information llike description,
due date/time ans status 
if checkbox is green then status is completed else open 
*/

function expandDiv(event , mainDiv){

        const icon = event.target;
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');
        let _expandDiv =  document.getElementById(`details_${mainDiv}`);


        //logic for expanding to toggle class for font-awesome icon
        if(icon.classList[2] === 'fa-plus'){
            _expandDiv.style.display = 'none';
        }else{
            _expandDiv.style.display = 'block';
        }


}

//create Dynamic list of items
function createDynamicList(response , len = false ){
        let container = document.getElementById('container');
        let _mainDiv =  document.createElement('div');
        _mainDiv.classList.add("mainDiv");
      response.forEach((element, index) => {
        _mainDiv.setAttribute('id' ,`mainDiv_${len ? toDoListLength.length : element.id}`);
        _mainDiv.appendChild(createDivBox(_mainDiv ,element , len ? toDoListLength.length: element.id));
        container.append(_mainDiv);

    });


}




//fetch from xhr
function fetchFromJSONfile(){
    const list = document.getElementById('list');
const xhr = new XMLHttpRequest();
xhr.open('GET' , 'data/todoFile.json');

const load = (event) => {
    const target = event.target;
    const response = JSON.parse(event.target.responseText);
    toDoListLength = response;
    createDynamicList(response);
}
xhr.addEventListener('load' , load);
xhr.send(); //actual request made  , load will be invoked 
}


//main function

function main(){
 
    fetchFromJSONfile();

    // const git_user = 'https://api.github.com/users/geethaPsarathy';
    // const user = fetch(git_user);
    // console.log(user);

    // const message0 = 'Lorem ipsum lorem';
    // const pattern0 = /lorem/g;
    // let match0 = pattern0.exec(message0);
    // while (match0) {
    // console.log(match0 , 's');
    // match0 = pattern0.exec(message0);
    // }

    let arr = [1,2,3,4];
    let fn = () => {
            console.log(arguments);
    }
    fn(1,2,3);


}

main();
