export const sum = function(arr)
{
    return arr.reduce((prev,curr) => prev+curr);
}
export const multiply = function(arr)
{
    return arr.reduce((prev,curr) => prev*curr, 1);
}
export const sortProperty = function(arr, predicate)
{
    return arr.sort((a,b) => predicate(b) - predicate(a));
}
export const parseInts = function(arr)
{
    return arr.map(n => parseInt(n));
}