var TodoItems = [];
var TodoList = /** @class */ (function () {
    function TodoList() {
    }
    /*constructor(id : number, task : string, completed : boolean) {
        id = this.id,
        task = this.task,
        completed = this.completed;
    }*/
    //add a new todo item
    TodoList.prototype.addToDo = function (task, dueDate) {
        //assign id
        var newId = (function () {
            if (TodoItems.length === 0) {
                return 1;
            }
            else {
                return TodoItems[TodoItems.length - 1].id + 1;
            }
        })();
        //new todo item
        var newTodo = {
            id: newId,
            task: task,
            completed: false,
            dueDate: dueDate
        };
        //add new todo item to TodoItems array
        TodoItems.push(newTodo);
        console.log("".concat(task, " added with due date: ").concat(dueDate ? dueDate.toISOString() : "No due date"));
    };
    //complete todo item
    TodoList.prototype.completeToDo = function (id) {
        var item = TodoItems.find(function (todo) { return todo.id === id; });
        if (item) {
            item.completed = true;
            console.log("Todo item with ID ".concat(id, " has been marked complete."));
        }
        else {
            console.log("Todo item with ID ".concat(id, " not found."));
        }
    };
    //remove todo
    TodoList.prototype.removeToDo = function (id) {
        //Find index of the provided id
        var indexId = TodoItems.findIndex(function (todo) { return todo.id === id; });
        //Remove the item with the found id
        if (indexId !== -1) {
            TodoItems.splice(indexId, 1);
            console.log("Todo item with ID ".concat(id, " has been removed."));
        }
        else {
            console.log("Invalid id");
        }
    };
    //list todo
    TodoList.prototype.listToDos = function () {
        return TodoItems;
    };
    //filter todos by completed status
    TodoList.prototype.filterTodo = function (completed) {
        var completedTodos = TodoItems.filter(function (TodoItems) { return TodoItems.completed === true; });
        console.log(completedTodos);
    };
    //update task description of a todo item
    TodoList.prototype.updateTaskTodo = function (id, newTask, newDueDate) {
        //find property with id
        var itemToBeUpdated = TodoItems.find(function (todo) { return todo.id === id; });
        //checking if item was found
        if (itemToBeUpdated) {
            itemToBeUpdated.task = newTask;
            console.log("Todo item with ID ".concat(id, " has been updated to: ").concat(newTask));
            if (newDueDate) {
                itemToBeUpdated.dueDate = newDueDate;
            }
        }
        else {
            console.log("Todo item with ID ".concat(id, " not found."));
        }
    };
    //clear completed tasks
    TodoList.prototype.clearCompletedTasks = function (completed) {
        var initialLength = TodoItems.length; //initial length
        TodoItems = TodoItems.filter(function (todo) { return !todo.completed; }); //keep only uncompleted tasks
        var clearedCount = initialLength - TodoItems.length; //calculate how many were cleared
        console.log("".concat(clearedCount, " completed task(s) cleared."));
    };
    return TodoList;
}());
// Example usage
var todoList = new TodoList();
// Adding todo items
todoList.addToDo("Learn TypeScript", new Date("2023-12-31"));
todoList.addToDo("Build a Todo App");
todoList.addToDo("Write Documentation", new Date("2023-11-30"));
// Listing all todos
console.log("All Todos:");
console.log(todoList.listToDos());
// Completing a todo item
todoList.completeToDo(1); // Mark the first task as complete
// Listing completed todos
console.log("Completed Todos:");
todoList.filterTodo(true);
// Updating a task
todoList.updateTaskTodo(2, "Build a Complete Todo App", new Date("2024-01-15"));
// Removing a todo item
todoList.removeToDo(3); // Remove the todo item with ID 3
// Listing remaining todos
console.log("Remaining Todos:");
console.log(todoList.listToDos());
