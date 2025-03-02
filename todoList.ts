interface ITodoItem {
    id : number,
    task : string,
    completed : boolean,
    dueDate? : Date | undefined; //optional property
}

let TodoItems : ITodoItem[] = [];

class TodoList implements ITodoItem {
    id: number;
    task : string;
    completed : boolean;

    /*constructor(id : number, task : string, completed : boolean) {
        id = this.id,
        task = this.task,
        completed = this.completed;
    }*/

    //add a new todo item
    addToDo (task : string, dueDate? : Date) : void {
        //assign id
        let newId : any = (function () {
            if (TodoItems.length === 0){
                return 1 
            } else{
                return TodoItems[TodoItems.length - 1].id + 1;
        }})();
        //new todo item
        let newTodo : ITodoItem = {
            id : newId,
            task : task,
            completed : false,
            dueDate : dueDate
        };
        //add new todo item to TodoItems array
        TodoItems.push(newTodo);
        console.log(`${task} added with due date: ${dueDate? dueDate.toISOString(): "No due date"}`);
    }  
    //complete todo item
    completeToDo (id : number) : void {
        const item = TodoItems.find(todo => todo.id === id);
    if (item) {
        item.completed = true;
        console.log(`Todo item with ID ${id} has been marked complete.`);
    } else {
        console.log(`Todo item with ID ${id} not found.`);
    }}


    //remove todo
    removeToDo(id: number): void {
        //Find index of the provided id
        let indexId: number = TodoItems.findIndex(todo => todo.id === id);
        
        //Remove the item with the found id
        if (indexId !== -1) {
            TodoItems.splice(indexId, 1);
            console.log(`Todo item with ID ${id} has been removed.`);
        } else {
            console.log("Invalid id");
        }
    }
    //list todo
    listToDos() :unknown {
        return TodoItems; 
    }
    //filter todos by completed status
    filterTodo(completed : boolean){
        let completedTodos : unknown[] = TodoItems.filter(TodoItems => TodoItems.completed === true);
        console.log(completedTodos);
    }
    //update task description of a todo item
    updateTaskTodo(id : number, newTask : string, newDueDate? : Date) : void {
        //find property with id
        let itemToBeUpdated : ITodoItem | undefined = TodoItems.find(todo => todo.id === id)
        //checking if item was found
        if (itemToBeUpdated){
            itemToBeUpdated.task = newTask;
            console.log(`Todo item with ID ${id} has been updated to: ${newTask}`);
            if (newDueDate) {
                itemToBeUpdated.dueDate = newDueDate;
            }
        } else {
        console.log(`Todo item with ID ${id} not found.`);
        }
    }
    //clear completed tasks
    clearCompletedTasks(completed : string) : void {
        const initialLength = TodoItems.length; //initial length
        TodoItems = TodoItems.filter(todo => !todo.completed); //keep only uncompleted tasks
        const clearedCount = initialLength - TodoItems.length; //calculate how many were cleared
        console.log(`${clearedCount} completed task(s) cleared.`);
    }
}

//Example usage
const todoList = new TodoList();

//Adding todo items
todoList.addToDo("Learn TypeScript", new Date("2023-12-31"));
todoList.addToDo("Build a Todo App");
todoList.addToDo("Write Documentation", new Date("2023-11-30"));

//Listing all todos
console.log("All Todos:");
console.log(todoList.listToDos());

//Completing a todo item
todoList.completeToDo(1); // Mark the first task as complete

//Listing completed todos
console.log("Completed Todos:");
todoList.filterTodo(true);

//Updating a task
todoList.updateTaskTodo(2, "Build a Complete Todo App", new Date("2024-01-15"));

//Removing a todo item
todoList.removeToDo(3); // Remove the todo item with ID 3

//Listing remaining todos
console.log("Remaining Todos:");
console.log(todoList.listToDos());

