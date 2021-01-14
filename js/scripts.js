const todoList = document.querySelector(".todos");
document.addEventListener("DOMContentLoaded", main);
function main() {
  getTodo();
  const add = document.getElementById("add-btn");
  const checkboxes = document.querySelectorAll(".cb-input");
  const clear = document.querySelectorAll(".clear");
  add.addEventListener("click", addTodo);

  console.log(checkboxes);
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("input", function () {
      status(this);
    });
  });
}

function addTodo() {
  const txtInput = document.querySelector(".txt-input");
  const item = txtInput.value.trim();
  if (item) {
    txtInput.value = "";
    saveTodo(item);
  }
  txtInput.focus();
}

function saveTodo(item) {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push({
    item,
    complete: false,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function status(checkbox) {
  const card = checkbox.parentElement.parentElement;
  if (checkbox.checked) {
    card.classList.add("checked");
    console.log([...document.querySelectorAll(".todos .card")].findIndex(card));
    // filterTodo(checkbox.parentElement.nextElementSibling, true);
  } else {
    card.classList.remove("checked");
    // filterTodo(checkbox.parentElement.nextElementSibling, false);
  }
}

function filterTodo(item, completed) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach(function (todo) {
    if (todo.item === item.textContent) {
      todo.complete = completed;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    return null;
  }
  todos.forEach(function (todo) {
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");
    card.classList.add("card");
    button.classList.add("clear");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    item.classList.add("item");
    check.classList.add("check");
    button.classList.add("clear");
    img.setAttribute("src", "./assets/images/icon-cross.svg");
    img.setAttribute("alt", "Clear it");
    cbInput.setAttribute("type", "checkbox");
    item.textContent = todo.item;
    if (todo.complete) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }
    button.appendChild(img);
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(button);
    todoList.appendChild(card);
  });
}
