const fs = require("fs");

const readInput = (filename) => fs.readFileSync(filename, {encoding: 'utf8', flag:"r"});
const prepareInput = (input) => (input.split('\r\n').map(value => value.split(',').map(value => value.split('-').map(string => +string)))).map(ranges => ranges.map(range => { return {high: range[1], low: range[0]}}));

const input = prepareInput(readInput("./src/ex4/ex4_input.txt"));

console.log(input);

const oneContainsTheOther = (ranges) => (((ranges[0].low <= ranges[1].low) && (ranges[0].high >= ranges[1].high)) || ((ranges[0].low >= ranges[1].low) && (ranges[0].high <= ranges[1].high)));
const partialIntersect = (ranges) => (((ranges[0].low <= ranges[1].high) && (ranges[0].high >= ranges[1].high)) || ((ranges[0].low <= ranges[1].low) && (ranges[0].high >= ranges[1].low)));

console.log(`Part 1: ${input.reduce((total, ranges) =>  total + (oneContainsTheOther(ranges) ? 1 : 0), 0)}`); // 532 expected
console.log(`Part 2: ${input.reduce((total, ranges) =>  total + ( oneContainsTheOther(ranges) || partialIntersect(ranges)  ? 1 : 0), 0)}`); // 854