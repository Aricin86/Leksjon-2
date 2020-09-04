
window.onload = startup;


let currentTodoID = 0;
let currentTodos = new Map();
let completedTodos = new Map();


function startup() {
    // Populating current todos
    let todo1 = { title: "Tittel #1", author: "Jane", description: "Do this and that and then some" };
    let todo2 = { title: "Randomly Generated", author: "Joe", description: "More stuff to do." };

    currentTodos.set(todo2, currentTodoID++);
    currentTodos.set(todo1, currentTodoID++);

    // Populating completed todos
    let completed1 = { title: "Solve Mystery", author: "Scooby-Doo", description: "Gather the gang + green van" };
    let completed2 = { title: "Go Shopping", author: "Olav", description: "Go shop stuffs" };
    
    completedTodos.set(completed1, "13.09.1969");
    completedTodos.set(completed2, "06.06.2020");

    fillTodoCards();
    fillCompletedTodoTable();
}



/************/
/** DELETE **/
/************/

/** Fill Todo Cards **/
function fillTodoCards() {

    // Courtesy of https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript
    let sortedTodos = new Map([...currentTodos.entries()].sort((a,b) => b[1] - a[1]));
          
    let emptyTodo = { title: "Empty", author: "", description: "" };
    let tempTodos = [emptyTodo, emptyTodo, emptyTodo];

    let count = 0;
    for (let [key, value] of sortedTodos) {
        tempTodos[count] = key;
        count++;
    }

    let titleCards = ["titleCard1", "titleCard2", "titleCard3"];
    let descCards = ["descCard1", "descCard2", "descCard3"];
    let deleteButtons = ["btnDeleteCardOne", "btnDeleteCardTwo", "btnDeleteCardThree"]
    let completeButtons = ["btnCompleteCardOne", "btnCompleteCardTwo", "btnComleteCardThree"]

    count = 0;
    for (let key of tempTodos) {
        document.getElementById(titleCards[count]).innerHTML = tempTodos[count].title;
        document.getElementById(descCards[count]).innerHTML = tempTodos[count].description;
        document.getElementById(deleteButtons[count]).disabled = (key == emptyTodo);
        document.getElementById(completeButtons[count]).disabled = (key == emptyTodo);
        count++;
    }
}



/** Fill Completed Todos Table **/
function fillCompletedTodoTable() {
    let sortedTodos = currentTodos;

    let sortDateByAscending = document.getElementById("sortByAscending").checked;
    
    if (sortDateByAscending) {
        // Sorting ascending by completion date
        sortedTodos = new Map([...completedTodos.entries()].sort((a,b) => b[1].localeCompare(a[1])));
    }
    else {
        // Sorting descending by completion date
        sortedTodos = new Map([...completedTodos.entries()].sort((a,b) => a[1].localeCompare(b[1])));
    }


    const theTodoTable = document.getElementById("todo-table");

    let emptyTodo = { title: "", author: "", description: "" , date: "" };
    let tempTodos = [emptyTodo, emptyTodo, emptyTodo];

    let count = 0;
    for (let [key, value] of sortedTodos) {
        key.date = value;
        tempTodos[count] = key;
        count++;
    }

    for (let row = 1; row <= 3; row++) {
        theTodoTable.rows[row].cells[0].innerHTML = tempTodos[row-1].title;
        theTodoTable.rows[row].cells[1].innerHTML = tempTodos[row-1].author;
        theTodoTable.rows[row].cells[2].innerHTML = tempTodos[row-1].description;
        theTodoTable.rows[row].cells[3].innerHTML = tempTodos[row-1].date;
    }
}


/************/
/** DELETE **/
/************/

// Delete Card 1:
function deleteCardOne() {
    currentTodos.delete(getCurrentTodoOne());    
    fillTodoCards();
}

// Delete Card 2:
function deleteCardTwo() {
    currentTodos.delete(getCurrentTodoTwo());       
    fillTodoCards();
}

// Delete Card 3:
function deleteCardThree() {
    currentTodos.delete(getCurrentTodoThree()); 
    fillTodoCards();
}



/**************/
/** GETTERS **/
/**************/

function getCurrentTodoOne() {
    let sortedTodos = new Map([...currentTodos.entries()].sort((a,b) => b[1] - a[1]));
    for (let [key, value] of sortedTodos) {
        return key;
    } 
}

function getCurrentTodoTwo() {
    let sortedTodos = new Map([...currentTodos.entries()].sort((a,b) => b[1] - a[1]));
    let count = 0;
    for (let [key, value] of sortedTodos) {
        if (count == 1){
            return key;
        }
        count++;
    } 

}

function getCurrentTodoThree() {
    let sortedTodos = new Map([...currentTodos.entries()].sort((a,b) => b[1] - a[1]));
    let count = 0;
    for (let [key, value] of sortedTodos) {
        if (count == 2){
            return key;
        }
        count++;
    } 
}


/**************/
/** COMPLETE **/
/**************/

// Complete Card 1:
function completeCardOne() {
    let tempTodo = getCurrentTodoOne();

    if (tempTodo.title.length > 0) {
        let newDate = new Date();
        // The zero infront of day and month, courtesy of this post: 
        // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format
        let currentDate = ("0" + newDate.getDate()).slice(-2) + "." + ("0" + (newDate.getMonth() + 1)).slice(-2) + "." + newDate.getFullYear();
        
        
        completedTodos.set(tempTodo, currentDate);

        deleteCardOne();
        fillCompletedTodoTable();
    }
}

// Complete Card 2:
function completeCardTwo() {
    
    let tempTodo = getCurrentTodoTwo();

    if (tempTodo.title.length > 0) {
        let newDate = new Date();
        let currentDate = ("0" + newDate.getDate()).slice(-2) + "." + ("0" + (newDate.getMonth() + 1)).slice(-2) + "." + newDate.getFullYear();
        
        
        completedTodos.set(tempTodo, currentDate);

        deleteCardTwo();
        fillCompletedTodoTable();
    }
}

// Complete Card 3:
function completeCardThree() {
    let tempTodo = getCurrentTodoThree();

    if (tempTodo.title.length > 0) {
        let newDate = new Date();
        let currentDate = ("0" + newDate.getDate()).slice(-2) + "." + ("0" + (newDate.getMonth() + 1)).slice(-2) + "." + newDate.getFullYear();
        
        
        completedTodos.set(tempTodo, currentDate);


        deleteCardThree();
        fillCompletedTodoTable();
    }
}


/********************/
/** NEW TODO POPUP **/
/********************/

/** Opens the New Todo popup **/
function openAddTodoPopup() {
    document.getElementById("addNewTodoForm").style.visibility = "visible";
    document.getElementById("overlay").style.visibility = "visible";
}

/** Closes the New Todo popup **/
function closeAddTodoPopup() {
    document.getElementById("addNewTodoForm").style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";

    // Empties the fields when popup closes
    document.getElementById("inputValueTitle").value = "";
    document.getElementById("inputValueDesc").value = "";
    document.getElementById("inputValueAuthor").value = "";
    document.getElementById("descCharLeft").innerHTML = 30;
}

/** Updates the text that says how many characters are left in the description input area **/
function updateCharLeft() {
    let inputValue = document.getElementById("inputValueDesc").value;
    let numberOfCharUsed = inputValue.length;
    let charLeft = 30 - numberOfCharUsed;
    document.getElementById("descCharLeft").innerHTML = charLeft;
}



/******************/
/** ADD NEW TODO **/
/******************/

/** Adding a New Todo **/
function submitNewTodo() {
    let newTitle = document.getElementById("inputValueTitle").value;

    if (newTitle.length > 0) {
        let newDescription = document.getElementById("inputValueDesc").value;
        let newAuthor = document.getElementById("inputValueAuthor").value;

        let tempTodo = { title: newTitle, author: newAuthor, description: newDescription };
        currentTodos.set(tempTodo, currentTodoID++);
        
        // if (!todo1.title.length > 0) {
        //     todo1 = { title: newTitle, author: newAuthor, description: newDescription };
        // }
        // else if (!todo2.title.length > 0) {
        //     todo2 = { title: newTitle, author: newAuthor, description: newDescription };
        // }
        // else {
        //     todo3 = { title: newTitle, author: newAuthor, description: newDescription };
        // }
        
        fillTodoCards();
    }
    closeAddTodoPopup();
}