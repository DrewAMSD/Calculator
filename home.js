const addButton = document.getElementById("add1");
addButton.addEventListener("click", add1);

const subtractButton = document.getElementById("subtract1");
subtractButton.addEventListener("click", subtract1);

function add1() {
  let divNum = Number(document.getElementById("number").innerHTML);
  document.getElementById("number").innerHTML = divNum + 1;
}

function subtract1() {
  let divNum = Number(document.getElementById("number").innerHTML);
  document.getElementById("number").innerHTML = divNum - 1;
}
