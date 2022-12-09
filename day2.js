import * as fs from 'fs';

const input = fs.readFileSync("day2.input").toString();

let moves = input.split("\n").map(l => l.split(" "));

let actions = {
    "forward": [1, 0, 0],
    "down": [0, 0, 1],
    "up": [0, 0, -1]
}

let position = [0, 0, 0];

moves.forEach(move => {
    let action = actions[move[0]];
    let amount = move[1];

    for (let i = 0; i < amount; i++) {
        position[0] += action[0];
        position[1] += action[1]; 
        position[2] += action[2];   
        if (move[0] == "forward")
        {
            position[1] += position[2] * action[0];
        }  
    }
});

console.log({position, part1:position[0]*position[1]});