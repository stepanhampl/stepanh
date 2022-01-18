// const num0 = document.getElementById("btn0");
// const num1 = document.getElementById("btn1");
// const num2 = document.getElementById("btn2");
// const num3 = document.getElementById("btn3");
// const num4 = document.getElementById("btn4");
// const num5 = document.getElementById("btn5");
// const num6 = document.getElementById("btn6");
// const num7 = document.getElementById("btn7");
// const num8 = document.getElementById("btn8");
// const num9 = document.getElementById("btn9");

// const display = document.getElementById("display");
// const decimal = document.getElementById("decimal");
// const divide = document.getElementById("divide");
// const multiply = document.getElementById("multiply");
// const minus = document.getElementById("minus");
// const plus = document.getElementById("plus");
// const equals = document.getElementById("equals");
// const left = document.getElementById("left");
// const right = document.getElementById("right");
// const undo = document.getElementById("undo");
// const clear = document.getElementById("clear");
// const square = document.getElementById("square");
// const sqrt = document.getElementById("sqrt");

const btn = document.getElementsByClassName("btn");

const funcButtons = ["clear", "undo", "equals"]; //buttons, that don't add their innerHTML to display

// this function executes, what is inside display
function execute(strToExecute){

};

// function that displays HTML content of given element (item), according pressed button
function show(item) {
    item.addEventListener("click", function insideShow() {
        if (funcButtons.indexOf(item.id) > -1) { //say whether item is one of the listed in funcButtons
            switch (item.id){
                case "undo":
                    display.value = display.value.slice(0,-1); //removes last character
                    break;
                case "clear":
                    display.value = "";
                    break;
                case "equals":
                    execute(display.value);
                    break;
            }
        } else { display.value += item.innerHTML }
    });
};

// this should iterate over class btn to add event listeners to execute show() on click
for (let i = 0; i < btn.length; i++) {
    show(btn[i]);
};