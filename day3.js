import * as fs from 'fs';

const input = fs.readFileSync("day3.input").toString();

let lines = input.split("\n").map(l => l.split("").map(n => parseInt(n)));

//part 1
let mostCommonBits = [];
let leastCommonBits = [];


function determineMostCommon(bits, lines)
{
    //part 1
    let ones = bits.reduce((prev, curr) => parseInt(prev)+parseInt(curr));
    let zeros = lines.length - ones;

    return ones > zeros;
}

let length = lines[0].length;
for (let i = 0; i < length; i++) 
{    
    let bits = lines.map(l => l.slice(i, i+1));
    let mostCommonIsOne = determineMostCommon(bits, lines);
    if (mostCommonIsOne)
    {
        mostCommonBits.push(1);
        leastCommonBits.push(0);
    }
    else 
    {
        mostCommonBits.push(0);
        leastCommonBits.push(1);
    }
}

//part 2
function handleArray(arr, mostCommon, index)
{
    console.log("handleArray", {arr});
    if (arr.length == 1) return arr[0];

    let ones = arr.filter(l => l[index] == "1");
    let zeros = arr.filter(l => l[index] == "0");
    
    if (mostCommon)
    {
        if (ones.length >= zeros.length)
        {
            return handleArray(ones, mostCommon, index+1);
        }
        else
        {
            return handleArray(zeros, mostCommon, index+1);
        }
    }
    else
    {
        if (ones.length >= zeros.length)
        {
            return handleArray(zeros, mostCommon, index+1);
        }
        else
        {
            return handleArray(ones, mostCommon, index+1);
        }
    }
}
let mostCommon2 = handleArray([...lines], true, 0);
let leastCommon2 = handleArray([...lines], false, 0);

function binaryToDecimal(binaryArray)
{
    return binaryArray.reverse().reduce((prev,curr,index) => prev + curr*Math.pow(2, index), 0);
}

//part 1
console.log(binaryToDecimal(mostCommonBits) * binaryToDecimal(leastCommonBits));

//part 2
console.log(binaryToDecimal(mostCommon2) * binaryToDecimal(leastCommon2));