
var addButton = document.getElementById("add-button"),
    clearCompletedButton = document.getElementById("clear-completed-button"),
    emptyList = document.getElementById("empty-button"),
    saveList = document.getElementById("save-button"),
    toEntryBox = document.getElementById("to-do-entry-box"),
    toDoList = document.getElementById("todo-list"),
    loadList = document.getElementById("loadButton")
;


addButton.addEventListener('click', function(){
    addToDoItem();
});

clearCompletedButton.addEventListener('click', function(){
    clearCompletedToDoItems();
});

emptyList.addEventListener('click', function(){
    emptyToDoList();
});

saveList.addEventListener('click', function(){
    saveToDoList();
});

loadList.addEventListener('click', function(){
    alert("alert");
    loadToDoList();
});

//function: add to-do item to the list
function addToDoItem(){
    var itemText = toEntryBox.value;
    newToDoItem(itemText, false);
}

//Define newToDoItem function
function newToDoItem(itemText, completed){
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed){
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

//Define toggleToDoItemState function
function toggleToDoItemState(){
    if( this.classList.contains("completed") ){
        this.classList.remove("completed");
    }else{
        this.classList.add("completed");
    }
}

//Define clear function for completed list items
function clearCompletedToDoItems(){
    var completedToDoItems = toDoList.getElementsByClassName("completed");

    while( completedToDoItems.length > 0 ){
        completedToDoItems.item(0).remove();
    }
}


//Define empty function
function emptyToDoList(){
    var toDoListAll = toDoList.getElementsByTagName("li");
    while( toDoListAll.length > 0){
        toDoListAll.item(0).remove();
    }
}


//Define saveToDoList function
function saveToDoList(){
    var toDoArray = [];

    for (var i=0; i < toDoList.children.length; i++ ){
        var toDo = toDoList.children.item(i);
        
        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        }
    
        toDoArray.push(toDoInfo);
    }

    localStorage.setItem("toDoArray", JSON.stringify(toDoArray) );
}

//function: loadToDoList
function loadToDoList(){
    if(localStorage.getItem("toDoArray") != null){
        var toDoArray = JSON.parse(localStorage.getItem("toDoArray"));

        for(var i=0; i< toDoArray.length; i++ ){
            var toDo = toDoArray[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}
