const fs = require("fs");

const readInput = (filename) => fs.readFileSync(filename, {encoding: 'utf8', flag:"r"});
const prepareInput = (input) => input.split('\r\n').map(value => value.split(',').map(value => value.split('-').map(string => +string)));

const input = prepareInput(readInput("./src/ex4/ex4_input.txt"));

console.log(input);

// 532 expected
console.log(input.reduce((total, value) =>  total + ((((value[0][0] <= value[1][0]) && (value[0][1] >= value[1][1])) || ((value[0][0] >= value[1][0]) && (value[0][1] <= value[1][1]))) ? 1 : 0), 0));
console.log(input.reduce((total, value) =>  total + ((((value[0][0] >= value[1][0]) && (value[0][0] <= value[1][1])) || ((value[0][1] >= value[1][0]) && (value[0][1] <= value[1][1]))) ? 1 : 0), 0));