var score = document.getElementById("score");
// var score = 0;
// spanScore.innerHTML = score;
var movingOne = document.getElementById("movingOne");
var start = document.getElementById("start");
var timer = document.getElementById("timer")
// var score = document.getElementById("score")
// timer.innerHTML = 5;

start.onclick = function clickStart() {
    var begin = parseInt(timer.innerHTML);
    score.innerHTML = 0;
    movingOne.style.marginTop = 0;
    movingOne.style.marginLeft = 0;
    function clicked() {
        if (timer.textContent == 0) {
            alert(`
            game over 
            score: ${parseInt(score.innerHTML)}
            time set: ${begin}
            points: ${parseInt(parseInt(score.innerHTML) / begin * 100)}
            `);
            timer.innerHTML = parseInt(timer.innerHTML);

        }
        else {
            timer.innerHTML--;
            setTimeout(clicked, 1000);

            movingOne.onclick = function clickMovingOne() {
                score.innerHTML = parseInt(score.innerHTML) + 1;
                var randVhTop = parseInt(Math.random() * 70);
                var randVwLeft = parseInt(Math.random() * 90);
                movingOne.style.marginTop = randVhTop + "vh";
                movingOne.style.marginLeft = randVwLeft + "vw";
            }
        }
    } clicked()
}

// start.onclick = function clickStartGetnTimer() {
// beginningOfTimer = parseInt(timer.innerHTML)
//     function repeat() {
//         if (timer.textContent == 0) { }
//         else {
//             setTimeout(clickStartGetnTimer, 1000);
//         }
//     };repeat()
// }