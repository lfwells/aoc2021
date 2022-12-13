import * as fs from 'fs';
import * as utils from "./utils.js";

const input = fs.readFileSync("day7.input").toString();

let positions = input.split(",");
positions = utils.parseInts(positions);

//part 1
let results = [];
for (var target = 0; target < Math.max(...positions); target++)
{
    let crabs = positions.map(crab => Math.abs(crab-target));
    results.push({target, sum:utils.sum(crabs)});
}
utils.sortProperty(results, (p => p.sum)).reverse();
console.log({part1:results[0].sum});

//part2 (brute force simulate the crabs lol)
results = [];
for (var target = 0; target < Math.max(...positions); target++)
{
    let crabs = positions.map(function(crab){
        let cost = 1;
        let totalCost = 0;
        while (Math.sign(crab-target) != 0)
        {
            crab -= Math.sign(crab-target);
            totalCost += cost;
            cost++; 
            //console.log({crab, target, totalCost});
        }
        return totalCost;
    });
    results.push({target, sum:utils.sum(crabs)});
}
utils.sortProperty(results, (p => p.sum)).reverse();
console.log({part2:results[0].sum});