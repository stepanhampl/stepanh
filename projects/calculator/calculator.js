const btn = document.getElementsByClassName("btn");
const num = document.getElementsByClassName("num");
const operator = document.getElementsByClassName("operator");

const funcButtons = ["clear", "undo", "equals"];

//str is string to be evaluated, resultEl is element, to which textContent is result shown
function evaluate(str, resultEl) {
    let result = str;
    let subResult = resultEl.textContent + str;
    if (subResult.includes("^")) {
        let index = subResult.indexOf("^");
        let first = subResult.slice(0, index);
        let last = subResult.slice(index + 1, subResult.length);
        result = Math.pow(first, last);
    } else if (subResult.includes("√")) {
        let index = subResult.indexOf("√");
        let first = subResult.slice(0, index);
        let last = subResult.slice(index + 1, subResult.length);
        result = Math.pow(first, 1/last);
    } else {
        result = eval(subResult);
    }
    resultEl.textContent = result;
}

// this should iterate over class btn to add event listeners to execute showNum() on click
function showNum(element) {
    element.addEventListener("click", function () {
        if (!isNaN(element.textContent)) { //say whether element is one of the listed in funcButtons
            input.textContent += element.textContent;
        } else if (funcButtons.indexOf(element.id) > -1) { //say whether element is one of the listed in funcButtons
            switch (element.id) {
                case "undo":
                    input.textContent = input.textContent.slice(0, -1); //removes last character
                    break;
                case "clear": //button "C" restarts the process
                    input.textContent = "";
                    calculation.textContent = "0";
                    break;
                case "equals":
                    input.textContent = evaluate(input.textContent, calculation);
                    break;
            }
        } else { //if operator is pressed
            let written = input.textContent;
            written += element.textContent;
            let str = written.slice(0, written.length - 1);
            evaluate(str, calculation);
            input.textContent = written.slice(- 1);
        };
        ;
    });
};


// makes something with all btn's
for (let i = 0; i < btn.length; i++) {
    showNum(btn[i]);
};



