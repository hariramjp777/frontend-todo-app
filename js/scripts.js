const add = document.getElementById("add-btn");
const txtInput = document.querySelector(".txt-input");
const checkboxes = document.querySelectorAll(".cb-input");
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("input", function () {
    complete(this);
  });
});
add.addEventListener("click", addTodo);

function addTodo() {
  const item = txtInput.value.trim();
  if (item) {
    console.log(item);
    txtInput.value = "";
  }
  txtInput.focus();
}

function complete(checkbox) {
  if (checkbox.checked) {
    checkbox.parentElement.classList.add("checked");
  } else {
    checkbox.parentElement.classList.remove("checked");
  }
}
