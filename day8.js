import * as fs from 'fs';
import * as utils from "./utils.js";

const input = fs.readFileSync("day8.input").toString();

let lines = input
    .split("\n")
    .map(line => line.split(" | ")
    .map(section => section.split(" ")));

//part 1
console.log(utils.sum(lines
    .map(line => line[1])
    .map(signal => signal
        .filter(signal => [2,3,4,7].includes(signal.length))
    )
    .map(x => x.length)
));

//part 2
let messages = lines.map(function(line) 
{ 
    let patterns = line[0];
    let numbers = {};
    numbers[1] = patterns.filter(p => p.length == 2)[0].split("");
    numbers[4] = patterns.filter(p => p.length == 4)[0].split("");
    numbers[7] = patterns.filter(p => p.length == 3)[0].split("");
    numbers[8] = patterns.filter(p => p.length == 7)[0].split("");

    let sixNineAndZero = patterns.filter(p => p.length == 6).map(x => x.split(""));
    let twoFiveAndThree = patterns.filter(p => p.length == 5).map(x => x.split(""));

    //top one is the one from 7 that isnt in 1
    let topOne = Array.from(utils.symmetricDifference(new Set(numbers[1]), new Set(numbers[7])))[0];
    console.log({topOne});

    //6 is the one that doesnt use both of the ones in 1
    numbers[6] = sixNineAndZero.filter(a => !(a.includes(numbers[1][0]) && a.includes(numbers[1][1])))[0];
    let nineAndZero = sixNineAndZero.filter(a => a != numbers[6]);

    //top right is the one from 1 that isnt in 6
    let topRight = Array.from(utils.difference(new Set(numbers[1]), new Set(numbers[6])))[0];

    //3 is the one from 2/3/5 that has both from 1
    numbers[3] = twoFiveAndThree.filter(a => (a.includes(numbers[1][0]) && a.includes(numbers[1][1])))[0];
    let twoAndFive = twoFiveAndThree.filter(a => a != numbers[3]);

    //top left is the one from 3 that isn't in 4
    let topLeft = Array.from(utils.difference(new Set(numbers[4]), new Set(numbers[3])))[0];

    //5 is the one from 2/5 that uses topLeft
    numbers[5] = twoAndFive.filter(a => a.includes(topLeft))[0];
    numbers[2] = twoAndFive.filter(a => a != numbers[5])[0];

    //bottom is the one in 3 that isn't in 4, and isn't the top
    let bottomOne = numbers[3].filter(a => !numbers[4].includes(a) && a != topOne);

    //bottom left is the one in 2 that isnt in 4 and isn't the bottom one, and isn't the top
    let bottomLeft = numbers[2].filter(a => !numbers[4].includes(a) && a != bottomOne && a != topOne)[0];

    //0 is the one from 9/0 that uses bottom left
    numbers[0] = nineAndZero.filter(a => a.includes(bottomLeft))[0];
    numbers[9] = nineAndZero.filter(a => a != numbers[0])[0];

    Object.values(numbers).forEach((e,i) => {
        numbers[i] = new Set(e);
    });
    //console.log({numbers});

    //now decode the value

    return parseInt(line[1]
        .map(value => new Set(value.split("")))
        .map(value => Object.entries(numbers)
            .filter(a => a[1].size == value.size)
            .filter(a => utils.difference(a[1], value).size == 0)
            [0]
        )
        .map(pair => pair[0])
        .join(""))
});
console.log({part2: utils.sum(messages) });