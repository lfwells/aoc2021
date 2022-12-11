import * as fs from 'fs';
let isPart2 = true;

const input = fs.readFileSync("day5.input").toString();

let lines = input.split("\n").map(l => l.split(" -> ").map(p => p.split(",").map(n => parseInt(n))));

//part 1 only considers horizontal and vertical lines
if (!isPart2)
    lines = lines.filter(l => l[0][0] == l[1][0] || l[0][1] == l[1][1]);
//console.log(lines);

console.log(Math.max(...[10, 20, 30,5]));

let width = Math.max(...lines.map(line => Math.max(...line.map(p=>p[0]))));
let height = Math.max(...lines.map(line => Math.max(...line.map(p=>p[1]))));
let map = [];
console.log({width, height});
for (var y = 0; y <= height; y++)
{
    let row = [];
    for (var x = 0; x <= width; x++)
    {
        row.push(0);
    }
    map.push(row);
}

lines.forEach(line => {
    let source = line[0];
    let destination = line[1];
    let x = source[0];
    let y = source[1];
    do
    {
        //console.log({x,y, destination});
        map[y][x] = map[y][x]+1;
        x += Math.sign(destination[0] - source[0]);
        y += Math.sign(destination[1] - source[1]);
    }
    while (x != destination[0] || y != destination[1]);

    map[y][x] = map[y][x]+1;
});

console.log(map);

//part 1
let part1 = map.map(line => line.filter(p => p >=2).length).reduce((prev, curr)=>prev+curr);
console.log({part1});