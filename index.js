let main_number = document.getElementById("main_number");
let answer = document.getElementById("answer");
const buttons = document.querySelectorAll(".buttons");
const operator_buttons = document.querySelectorAll(".operator_buttons");
const equal_button = document.getElementById("equal_button");
const clear_button = document.getElementById("clear_button");
const backspace_button = document.getElementById("backspace_button");
const ans_button = document.getElementById("ans_button");

let nums_arr = new Array();
let operators_arr = new Array();
nums_arr.push("");
let ans = "";
let operation = false;
let reset_ans = false;

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

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    if (reset_ans) {
      main_number.innerHTML = "";
      nums_arr = [""];
      reset_ans = false;
    }
    if (main_number.innerHTML.slice(-3) == "ans") {
      operators_arr.push("*");
      main_number.innerHTML += "*";
      nums_arr.push("");
    }
    const buttonText = event.target.textContent;
    let n = nums_arr.length;
    let temp_num = nums_arr[n - 1];
    if (main_number.innerHTML == "0") {
      switch (buttonText) {
        case ".":
          temp_num += buttonText;
          main_number.innerHTML += buttonText;
          break;
        case "(-)":
          temp_num = "-" + temp_num;
          let sub = main_number.innerHTML;
          main_number.innerHTML = "-";
          break;
        default:
          temp_num += buttonText;
          main_number.innerHTML = buttonText;
          break;
      }
    } else {
      switch (buttonText) {
        case ".":
          if (!temp_num.includes(".")) {
            temp_num += buttonText;
            main_number.innerHTML += buttonText;
          }
          break;
        case "(-)":
          if (!temp_num.includes("-")) {
            temp_num = "-" + temp_num;
            let sub = main_number.innerHTML;
            main_number.innerHTML =
              sub.substring(0, sub.length + 1 - temp_num.length) + temp_num;
          }
          break;
        default:
          temp_num += buttonText;
          main_number.innerHTML += buttonText;
          break;
      }
    }
    nums_arr[n - 1] = temp_num;
    operation = false;
  });
});

operator_buttons.forEach((operator_button) => {
  operator_button.addEventListener("click", function (event) {
    if (reset_ans) {
      reset_ans = false;
    }
    const operatorText = event.target.textContent;
    let n = operators_arr.length;
    if (!operation) {
      operators_arr.push(operatorText);
      main_number.innerHTML += operatorText;
      nums_arr.push("");
      operation = true;
    }
  });
});

equal_button.addEventListener("click", function (event) {
  if (!operation) {
    let multDiv = true;
    let count = 0;
    while (operators_arr.length > 0) {
      /*this while loop is probably redundant*/
      for (let j = 0; j < operators_arr.length; j++) {
        if (multDiv) {
          if (operators_arr[j] == "*" || operators_arr[j] == "/") {
            nums_arr[j] = doOperation[operators_arr[j]](
              Number(nums_arr[j]),
              Number(nums_arr[j + 1])
            );
            nums_arr = nums_arr.slice(0, j + 1).concat(nums_arr.slice(j + 2));
            operators_arr = operators_arr
              .slice(0, j)
              .concat(operators_arr.slice(j + 1));
            j--;
          }
          if (j == operators_arr.length - 1) {
            multDiv = false;
          }
        } else {
          nums_arr[j] = doOperation[operators_arr[j]](
            Number(nums_arr[j]),
            Number(nums_arr[j + 1])
          );
          nums_arr = nums_arr.slice(0, j + 1).concat(nums_arr.slice(j + 2));
          operators_arr = operators_arr
            .slice(0, j)
            .concat(operators_arr.slice(j + 1));
          j--;
          if (j >= operators_arr.length - 1) {
            break;
          }
        }
      }
    }
    nums_arr[0] = nums_arr[0].toString();
    main_number.innerHTML = nums_arr[0];
    ans = nums_arr[0];
    answer.innerHTML = "ans = " + ans;
    reset_ans = true;
  }
});

clear_button.addEventListener("click", function (event) {
  nums_arr = [];
  operators_arr = [];
  nums_arr.push("");
  ans = "";
  operation = false;
  reset_ans = false;
  main_number.innerHTML = 0;
  answer.innerHTML = "ans = ";
});

backspace_button.addEventListener("click", function (event) {
  if (nums_arr[nums_arr.length - 1] == "") {
    operation = false;
    operators_arr.pop();
    let sub = main_number.innerHTML;
    main_number.innerHTML = sub.substring(0, sub.length - 1);
    nums_arr.pop();
  } else {
    let n = nums_arr.length;
    let temp = nums_arr[n - 1];
    nums_arr[n - 1] = temp.substring(0, temp.length - 1);
    let sub = main_number.innerHTML;
    main_number.innerHTML = sub.substring(0, sub.length - 1);
    if (nums_arr[n - 1] == "") {
      operation = true;
    }
  }
});

ans_button.addEventListener("click", function (event) {
  if (operation) {
    operation = false;
    nums_arr[nums_arr.length - 1] = ans;
    main_number.innerHTML += "ans";
  } else {
    operators_arr.push("*");
    nums_arr.push(ans);
    main_number.innerHTML += "*" + "ans";
  }
});
