let main_number = document.getElementById("main_number");
let operator = document.getElementById("operator");
let second_number = document.getElementById("second_number");
let answer = document.getElementById("answer");
const buttons = document.querySelectorAll(".buttons");
const operator_buttons = document.querySelectorAll(".operator_buttons");
const equal_button = document.getElementById("equal_button");

let num1 = "";
let num2 = "";
let ans = "";
let operator_var = "";
let second_operation = false;
let reset_num1 = false;

equal_button.addEventListener("click", function (event) {
  let num1_parse = Number(num1);
  let num2_parse = Number(num2);
  let doOperation = {
    "+": function (x, y) {
      return x + y;
    },
    "-": function (x, y) {
      return x - y;
    },
    "*": function (x, y) {
      return x * y;
    },
    "/": function (x, y) {
      return x / y;
    },
  };
  answer.innerHTML = num1 + " " + operator_var + " " + num2 + " =";
  num1 = doOperation[operator_var](num1_parse, num2_parse);
  num1 = num1.toString();
  ans = num1;
  operator_var = "";
  num2 = "";
  main_number.innerHTML = num1;
  operator.innerHTML = "";
  second_number.innerHTML = "";
  second_operation = false;
  reset_num1 = true;
});

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const buttonText = event.target.textContent;
    if (!second_operation) {
      if (reset_num1) {
        num1 = "";
        reset_num1 = false;
      }
      setNumDiv(1, buttonText);
    } else {
      setNumDiv(2, buttonText);
    }
  });
});

function setNumDiv(x, buttonText) {
  answer.innerHTML = "ans = " + ans + " ";
  let temp_num = x == 1 ? num1 : num2;
  switch (buttonText) {
    case ".":
      if (!temp_num.includes(".")) {
        temp_num += ".";
      }
      break;
    case "(-)":
      if (!temp_num.includes("-")) {
        if (temp_num == "") {
          temp_num = "-";
        } else {
          temp_num = "-" + temp_num;
        }
      } else {
        temp_num = temp_num.substring(1);
      }
      break;
    default:
      if (temp_num == "") {
        temp_num = buttonText;
      } else {
        temp_num += buttonText;
      }
      break;
  }
  if (x == 1) {
    num1 = temp_num;
    main_number.innerHTML = num1;
  } else {
    num2 = temp_num;
    second_number.innerHTML = num2;
  }
}

operator_buttons.forEach((operator_button) => {
  operator_button.addEventListener("click", function (event) {
    answer.innerHTML = "ans = " + ans + " ";
    const operatorText = event.target.textContent;
    second_operation = true;
    operator_var = operatorText;
    operator.innerHTML = operator_var;
  });
});
