const todoListStored = localStorage.getItem("todos");
let todoList = [];

if (todoListStored === null || JSON.parse(todoListStored).length === 0) {
  const todoListHtml = document.body.querySelector("#todo-list");
  todoListHtml.innerHTML = "Have a nice Day!<br> All tasks are done 😊";
} else {
  todoList = JSON.parse(todoListStored);
  renderTodo();
}

function renderTodo() {
  const todoListHtml = document.body.querySelector("#todo-list");
  todoListHtml.innerHTML = "";

  todoList.forEach((todo) => {
    const i = todoList.indexOf(todo) + 1;
    const newTodoEntry = document.createElement("li");
    const todoCheckbox = document.createElement("input");
    const todoLabel = document.createElement("label");
    todoCheckbox.type = "checkbox";
    todoState(todoCheckbox, todo);
    todoCheckbox.checked = todo.done;
    todoCheckbox.setAttribute("class", "todo-check");
    todoCheckbox.setAttribute("id", "todo" + i);
    newTodoEntry.appendChild(todoCheckbox);
    todoLabel.setAttribute("for", "todo" + i);
    todoLabel.innerText = todo.description;
    newTodoEntry.append(todoLabel);
    newTodoEntry.setAttribute("class", "todo-item");
    todoListHtml.appendChild(newTodoEntry);
  });

  if (todoList === null || todoList.length === 0) {
    const todoListHtml = document.body.querySelector("#todo-list");
    todoListHtml.innerHTML = "Have a nice Day! <br> All tasks are done 😊";
  }
}

function addTodo() {
  todoList = JSON.parse(localStorage.getItem("todos"));
  const todoInput = document.body.querySelector("#todo");
  const todoObj = {
    description: todoInput.value,
    done: false,
  };
  if (todoInput.value === "") {
    alert("write something");
  } else {
    todoList.push(todoObj);
  }
  storeTodo(todoList);
  todoInput.value = "";
  renderTodo();
  document.body.querySelector("#filter-all").checked = true;
}

function todoState(checkbox, todo) {
  checkbox.addEventListener("change", (e) => {
    const newState = e.target.checked;
    todo.done = newState;
    storeTodo(todoList);
  });
}

function removeDoneTodo() {
  todoList = JSON.parse(localStorage.getItem("todos"));
  const newList = [];
  todoList.forEach((todo) => {
    let i = todoList.indexOf(todo);
    if (todo.done === false) {
      newList.push(todo);
    }
  });
  storeTodo(newList);
  todoList = newList;
  renderTodo();
  document.body.querySelector("#filter-all").checked = true;
}

function storeTodo(item) {
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(item));
}

const addBtn = document.body.querySelector("#add-button");
addBtn.addEventListener("click", addTodo);
document.querySelector("#todo").addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    addBtn.click();
  }
});
const delBtn = document.body.querySelector("#delete-button");
delBtn.addEventListener("click", removeDoneTodo);

const filter = document.body.querySelector("#filter-options");
filter.addEventListener("click", (e) => {
  todoList = JSON.parse(localStorage.getItem("todos"));
  let newList = [];
  if (e.target.id === "filter-done") {
    todoList.forEach((todo) => {
      if (todo.done) {
        newList.push(todo);
      }
    });
    todoList = newList;
    if (todoList === null || todoList.length === 0) {
      const todoListHtml = document.body.querySelector("#todo-list");
      todoListHtml.innerHTML = "No Task is finished! 😢";
    } else {
      renderTodo();
    }
  } else if (e.target.id === "filter-open") {
    todoList.forEach((todo) => {
      if (todo.done === false) {
        newList.push(todo);
      }
    });
    todoList = newList;
    renderTodo();
  } else {
    renderTodo();
  }
});
