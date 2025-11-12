const calc = (() => {
  function add(a, b) {
    return Number(a) + Number(b);
  }
  function sub(a, b) {
    return Number(a) - Number(b);
  }
  function mult(a, b) {
    return Number(a) * Number(b);
  }
  function div(a, b) {
    return Number(a) / Number(b);
  }
  function evaluate(a, b, op) {
    switch (op) {
      case "+":
        return add(a, b);
      case "-":
        return sub(a, b);
      case "/":
        return div(a, b);
      case "*":
        return mult(a, b);
      default:
        break;
    }
  }
  return {
    evaluate,
  };
})();

const screen = document.querySelector(".display-screen");
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const history = document.querySelector(".history");
const decimal = document.querySelector(".decimal");

const functions = document.querySelectorAll(".func");
const equals = document.querySelector(".equals");

numbers.forEach((item) => {
  item.addEventListener("click", (e) => {
    screen.value += e.target.value;
  });
});
decimal.addEventListener("click", (e) => {
  screen.value += ".";
});
clear.addEventListener("click", () => {
  screen.value = "";
});
backspace.addEventListener("click", () => {
  screen.value = screen.value.substring(0, screen.value.length - 1);
});
functions.forEach((item) => item.addEventListener("click", functionsFunction));
equals.addEventListener("click", equalsFunction);

function functionsFunction(e) {
  if (screen.value === "") return;
  if (screen.value[screen.value.length - 1].match(/[\/\*\-\+]/g)) {
    screen.value = screen.value.slice(0, -1);
  }
  let numbers = screen.value.split(/ \-| \+| \/| \* /);
  let operators = screen.value.match(/[\/\*\-\+]/g);
  if (numbers[0] < 0) operators.shift();
  if (numbers[1]) {
    screen.value = calc.evaluate(numbers[0], numbers[1], operators[0]);
  }
  screen.value += ` ${e.target.value} `;
}
function equalsFunction() {
  if (screen.value === "") return;
  let numbers = screen.value.split(/ \-| \+| \/| \* /);
  let operators = screen.value.match(/[\/\*\-\+]/g);
  screen.value = calc.evaluate(numbers[0], numbers[1], operators[0]);
}
