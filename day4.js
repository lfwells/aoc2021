import * as fs from 'fs';

const input = fs.readFileSync("day4.input").toString();

let boards = input.split("\n\n");
let numbers = boards[0].split(",");
boards.shift();

boards = boards.map(board => board.split("\n").map(l => l.split(" ").filter(n => n != "").map(function(n) { return {n:parseInt(n), marked:false};})));

function printBoard(board)
{
    return board.map(l => l.map(n => n.marked ? "X" : n.n).join("\t")).join("\n");
}

function printAllBoards()
{
    console.log(boards.map(printBoard).join("\n\n"));
}

function drawNumber(n)
{
    console.log(`Draw ${n}`);
    boards.forEach(board => {
        board.forEach(line => {
            line.forEach(number => {
                if (number.n == n) number.marked = true;
            });
        });
    });
    //printAllBoards();
}

function boardScore(board)
{
    return board.map(line => line.filter(n => n.marked == false).map(n => n.n).reduce((prev, curr) => prev+curr, 0)).reduce((prev, curr) => prev+curr, 0);
}
let winningBoardIndicies = [];//for part 2
function checkWinner(board, index)
{
    //check horizontals
    if (board.some(line => line.every(n => n.marked)))
    {
        if (winningBoardIndicies.includes(index) == false) winningBoardIndicies.push(index);
        return boardScore(board);
    }

    //check verticals
    let verticals = [];
    for (var i = 0; i < board[0].length; i++)
    {
        verticals.push(board.map(b => b[i]));
    }
    if (verticals.some(line => line.every(n => n.marked)))
    {
        if (winningBoardIndicies.includes(index) == false) winningBoardIndicies.push(index);
        return boardScore(board);
    }


    //check diagonal 1 (not needed)

    //check diagonal 2 (not needed)

}

//part 1
let score = 0;
let lastNumber = 0;
for (var i = 0; i < numbers.length; i++)
//for (var i = 0; i < 6; i++)
{
    lastNumber = numbers[i];
    drawNumber(lastNumber);
    score = boards.map(checkWinner).filter(b => b != undefined).reduce((prev,curr) => prev+curr, 0);
    if (score > 0) break;
}

console.log({part1: score * lastNumber});

//part2
score = 0;
lastNumber = 0;
for (var i = 0; i < numbers.length; i++)
{
    lastNumber = numbers[i];
    drawNumber(lastNumber);
    let scores = boards.map(checkWinner).filter(b => b != undefined);
    console.log(`${scores.length} boards have won now`);
    if (scores.length == boards.length)
        break;
}

console.log({winningBoardIndicies});

let lastWinningBoardScore = boardScore(boards[winningBoardIndicies[winningBoardIndicies.length-1]]);
console.log({part2: lastWinningBoardScore * lastNumber});