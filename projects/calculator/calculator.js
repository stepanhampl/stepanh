const btn = document.getElementsByClassName("btn");
// const num = document.getElementsByClassName("num");
// const operator = document.getElementsByClassName("operator");
// const func = document.getElementsByClassName("func");

function calculate() {
    calc = parseFloat(calculation.textContent) + operator.textContent + parseFloat(input.textContent);
    if (operator.textContent == "" && calculation.textContent == 0) {
        calculation.textContent = input.textContent
    } else {
        calculation.textContent = eval(calc); //from 42+23 makes 65
        operator.textContent = "";
    }
    input.textContent = "";
}

function click(element) {
    if (element.classList.contains("num")) { //if it has class "num" besides "btn"
        element.addEventListener("click", function () {
            if (operator.textContent == "" && calculation.textContent != 0) { //if user types number, when operator empty, calculation not 0
                calculation.textContent = 0
            }
            input.textContent += element.textContent //writes the number behind content of input (last span of display)

        })
    } else if (element.id == "sqrt") {
        element.addEventListener("click", function () {
            if (input.textContent != "") { //executes when calculator is cleared 
                calculate();
            }
            operator.textContent = element.textContent; //#operator is middle subdisplay
            calculation.textContent = Math.sqrt(calculation.textContent); //makes square root from #calculation - most left subdisplay

            //delete sqrt after timeout
        })
    }
    else if (element.classList.contains("operator")) { //if it has class "operator" besides "btn"
        element.addEventListener("click", function () {
            if (input.textContent != "") { //executes when calculator is cleared 
                calculate();
            } else if (element.id == "square") {
                calculation.textContent = Math.pow(calculation.textContent, 2);
            }
            operator.textContent = element.textContent;
        })
    } else if (element.classList.contains("func")) {  //if it has class "func" besides "btn"
        element.addEventListener("click", function () {
            switch (element.id) {
                case "undo":
                    input.textContent = input.textContent.slice(0, -1); //removes last character from #input
                    break;
                case "clear": //sets .sub-displays to 0, "", "" 
                    calculation.textContent = 0;
                    operator.textContent = "";
                    input.textContent = "";
                    break;
                case "equals":
                    // calc is intermediate step contains eg.: 42+23
                    calculate()
                    break;
            }
        })
    }
}


// makes something with all btn's
for (let i = 0; i < btn.length; i++) { //iterates through all buttons
    let element = btn[i]; //current element while looping
    click(element);
};