let num = 0;
let main_number = (document.getElementById("main_number").innerHTML = num);

const addButton = document.getElementById("add1");
addButton.addEventListener("click", add1);

const subtractButton = document.getElementById("subtract1");
subtractButton.addEventListener("click", subtract1);

function add1() {
  num = num + 1;
  document.getElementById("main_number").innerHTML = num;
}

function subtract1() {
  num = num - 1;
  document.getElementById("main_number").innerHTML = num;
}
