console.log("Hello World!");

const container = document.getElementById("container");
const ul = document.createElement("ul");
ul.classList.add("grid", "grid-cols-3", "gap-2", "w-fit");
const arr = Array(9).fill(null);
const resetBtn = document.createElement("button");
let isX = true;
let gameOver = false;
let winner = null;
let moveCount = 0;

const solutions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function calculateWinner(sqr) {
    for (const [a, b, c] of solutions) {
        if (sqr[a] && sqr[a] === sqr[b] && sqr[a] === sqr[c]) {
            return sqr[a];
        }
    }
    return null;
}

function isDraw() {
    return moveCount === 9 && !winner;
}


for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.classList.add("border-2", "border-gray-800", "w-12", "h-12",
        "flex", "items-center", "justify-center",
        "text-3xl", "font-bold", "cursor-pointer",
        "hover:bg-gray-100", "bg-white");
    // li.textContent = i
    li.addEventListener("click", function () {
        if (arr[i] === null) {
            arr[i] = isX ? "X" : "O";
            isX = !isX;
            li.textContent = arr[i];
            li.classList.add(isX ? "text-blue-600" : "text-red-600");
            moveCount++;
            const winner = calculateWinner(arr);
            if (winner) {
                setTimeout(() => {
                alert(winner + " wins!");
            }, 1000);
            } else if (isDraw()) {
                setTimeout(() => {
                alert("It's a draw!");
            }, 1000);
            }
        }
    });
    ul.appendChild(li);
}


resetBtn.textContent = "Reset";
resetBtn.addEventListener("click", function () {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = null;
        ul.children[i].textContent = "";
    }
    isX = true;
    moveCount = 0;
    winner = null;
});
container.appendChild(resetBtn);
container.appendChild(ul)