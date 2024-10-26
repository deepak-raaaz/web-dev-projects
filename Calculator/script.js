function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  let current = document.getElementById("display").value;
  document.getElementById("display").value = current.slice(0, -1);
}

function appendCharacter(character) {
  document.getElementById("display").value += character;
}

function calculate() {
  let expression = document.getElementById("display").value;
  try {
    document.getElementById("display").value = eval(expression);
  } catch {
    document.getElementById("display").value = "Error";
  }
}
