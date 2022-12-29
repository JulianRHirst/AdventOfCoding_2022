const fs = require("fs");

const { getSystemErrorMap } = require("util");

const readInput = filename => fs.readFileSync(filename, {encoding: 'utf8', flag:"r"});
const prepareInput = input => input.split('');

const input = prepareInput(readInput("./src/ex6/ex6_input.txt"));

console.log(`Part1: ${input.findIndex((_, index, inputArray) => (new Set(inputArray.slice(index, index+4) )).size == 4) + 4}`);
console.log(`Part2: ${input.findIndex((_, index, inputArray) => (new Set(inputArray.slice(index, index+14) )).size == 14) + 14}`);