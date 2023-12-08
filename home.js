let main_number = document.getElementById("main_number");
let operator = document.getElementById("operator");
let operator_number = document.getElementById("operater_number");
const plus_button = document.getElementById("plus_button");

let num = 0;
let num2 = 0;
let operator_string = "";
let second_operation = false;

main_number.innerHTML = num;
plus_button.addEventListener("click", change_operator_plus);
add1Button.addEventListener("click", add1);
subtract1Button.addEventListener("click", subtract1);

function change_operator_plus() {
  second_operation = true;
  operator_string = "+";
  operator.innerHTML = operator_string;
}
