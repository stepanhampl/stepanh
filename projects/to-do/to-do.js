var buttonAdd = document.getElementById("buttonAdd");
var buttonClear = document.getElementById("buttonClear");
var inputTask = document.getElementById("inputTask");
var list = document.getElementById("list");
var idNum = 0;
var deleteLine = 0;

buttonAdd.onclick = function () {
    if (inputTask.value.length > 0) {
        list.insertAdjacentHTML("beforeend",
            `
            <span id=span${++idNum}>
            <li>
            <span id=spaninspan${idNum}>${inputTask.value}</span>
            <button id=buttonStrike${idNum} onClick="getId(this.id)">X</button>
            <button id=buttonDelete${idNum} onClick="getId(this.id)">smazat</button>
            </li>
            </span>
`
        );
        document.getElementById("inputTask").value = "";
    }
};

document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && inputTask.value.length > 0 && inputTask === document.activeElement) {
        list.insertAdjacentHTML("beforeend",
            `
            <span id=span${++idNum}>
            <li>
            <span id=spaninspan${idNum}>${inputTask.value}</span>
            <button id=buttonStrike${idNum} onClick="getId(this.id)">X</button>
            <button id=buttonDelete${idNum} onClick="getId(this.id)">smazat</button>
            </li>
            </span>
            `
        );
        document.getElementById("inputTask").value = "";
    }
});

buttonClear.onclick = function (element) {
    list.innerHTML = ""
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Delete") {
        list.innerHTML = ""
    }
});

function getId(id) {
    var separatedNumId = parseInt(id.match(/\d+/g));
    var button = document.getElementById(id);
    var spanToStrike = document.getElementById(`spaninspan${separatedNumId}`);
    // console.log(window.getComputedStyle(spanToStrike, null).textDecoration)
    if (id.search("buttonStrike") > -1) {
        if (window.getComputedStyle(spanToStrike, null).textDecoration.search("line-through")!=-1) {
            spanToStrike.style.textDecoration = "none"
        } else {
            spanToStrike.style.textDecoration = "line-through";
        }
    }
    else if (id.search("buttonDelete") > -1) {
        var spanToDelete = document.getElementById(`span${separatedNumId}`);
        spanToDelete.parentNode.removeChild(spanToDelete);
    }
}