import * as fs from 'fs';

const input = fs.readFileSync("day6.input").toString();

let fish = input.split(",").map(n => parseInt(n));

let allDays = []; //cant do this for part 2, too much memory
let day = 0;
let totalDays = 80;//part 1 = 80
do
{
    allDays.push([...fish]);

    fish = fish.map(f2 => f2 = f2-1);
    
    
    let newFish = 0;
    fish.forEach(function(f, i) {
        if (f == -1)
        {
            fish[i] = 6;
            newFish++;
        }
    });
    for (let i = 0; i < newFish; i++) {
        fish.push(8); 
    }

    day++;
}
while (day <= totalDays);

//console.log(allDays.map((d, i) => `${i}:\t${d.join(",")}`).join("\n"));
console.log({part1: allDays[allDays.length-1].length});

//part 2 (cannot just store each fish lol, instead lets store how many fish of each lifetime there are)
fish = input.split(",").map(n => parseInt(n));
let fishCounts = [];
for (var i = 0; i <= 8; i++)
{
    fishCounts[i] = fish.filter(f => f == i).length;
}

day = 0;
totalDays = 256;
let newFish1 = 0;
let newFish2 = 0;
do
{
    
    
    

    
    for (let i = 1; i <= 8; i++)
    {
        fishCounts[i-1] = fishCounts[i];
    }
    fishCounts[8] = 0;
    
    newFish1 = fishCounts[0];
    
    
    fishCounts[0]-=newFish2;
    fishCounts[6]+=newFish2;
    fishCounts[8]+=newFish2;


    newFish2 = newFish1;
    
    console.log({
        part2: fishCounts.reduce((prev,curr)=>prev+curr), 
        z:fishCounts.join(","), 
        newFish1, newFish2
    });

    
    day++;
}
while (day <= totalDays);

console.log({part2: fishCounts.reduce((prev,curr)=>prev+curr)});