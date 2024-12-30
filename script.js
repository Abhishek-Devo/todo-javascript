document.addEventListener("DOMContentLoaded",()=>{


let inputBox=document.getElementById("todo-input")
console.log(inputBox)

const todoList = document.getElementById("taskItems");

let allTasks=JSON.parse(localStorage.getItem("todos")) || [];

allTasks.forEach(task => {
    renderTask(task);   
   

});



let buttonRef = document.getElementById("submitBtn").addEventListener("click",()=>{
    let inputBoxData=inputBox.value.trim();
    console.log(inputBoxData)

    //create a new task
    let task={
        id:Date.now(),
        text:inputBoxData,
        completed:false,
    }
    //add new task to the array
    allTasks.push(task);
    saveTaskToStorage();

    //render updated list on screen
    renderTask(task);
    inputBox.value="";

})

//function to render task list on screen
function renderTask(task){
    const li=document.createElement('li');
    li.setAttribute('task-id',task.id)
    
    if(task.completed){
        li.classList.add('completed')
    }

    li.innerHTML=`<span>${task.text}<span>
    <button>Delete</button>`

    li.addEventListener("click",(e)=>{
        //if event is on delete button just return
        if (e.target.tagName==="BUTTON") return;

        task.completed = !task.completed;
        li.classList.toggle("completed")
        saveTaskToStorage();
    })

    //delete button event handling
    li.querySelector("button").addEventListener("click",(e)=>{
            e.stopPropagation();
            allTasks=allTasks.filter((t)=>{
                t.id != task.id;
            })
            li.remove();
            saveTaskToStorage();    })
    todoList.appendChild(li);
    
}

//save updated Task list to local storage
function saveTaskToStorage(){
    localStorage.setItem("todos",JSON.stringify(allTasks));
}
})

