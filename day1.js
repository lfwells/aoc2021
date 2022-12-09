import * as fs from 'fs';

const input = fs.readFileSync("day1.input").toString();

let depths = input.split("\n").map(n => parseInt(n));
let deltas = [];

let windowSize = 3;//part 2
let windowedDepths = [];
for (let i = 0; i < depths.length-windowSize+1; i++) {
    const window = depths.slice(i, i+windowSize);
    console.log({window});
    windowedDepths.push(window.reduce((prev,curr) => prev+curr));
}
console.log(windowedDepths);
depths = windowedDepths;

let prevDepth = depths[0];
for (let i = 1; i < depths.length; i++) {
    const depth = depths[i];
    deltas.push(depth - prevDepth);
    prevDepth = depth;
}

let part1 = deltas.filter(d => d > 0).length;
console.log({part1});