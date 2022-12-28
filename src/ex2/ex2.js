const fs = require("fs");

const readInput = (filename) => fs.readFileSync(filename, {encoding: 'utf8', flag:"r"});
const prepareInput = (input) => input.split('\r\n').map(value => [value.slice(0, value.length/2).split(''), value.slice(value.length/2).split('')]);

const input = prepareInput(readInput("./src/ex3/ex3_input.txt"));

console.log(input[1]);
console.log( input.reduce((total, value)=> total+value[0].reduce((total, char)), 0));