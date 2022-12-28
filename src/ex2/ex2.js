const fs = require("fs");

const readInput = (filename) => fs.readFileSync(filename, {encoding: 'utf8', flag:"r"});
const prepareInput = (input) => input.split('\r\n').map(value => value.split(' '));

const input = prepareInput(readInput("./src/ex2/ex2_input.txt"));
// Part 1 = 13809
// Part 2 = 12316


const part1PlayValue = {
        'A': { 'X': 1+3, 'Y': 2+6, 'Z': 3+0},
        'B': { 'X': 1+0, 'Y': 2+3, 'Z': 3+6},
        'C': { 'X': 1+6, 'Y': 2+0, 'Z': 3+3}
    };

console.log(`Part 1 = ${input.reduce((total, order)=> total+part1PlayValue[order[0]][order[1]], 0)}`);

const part2PlayValue = {
    'X': { // lose
        'A': 3, 'B': 1, 'C': 2, bonus: 0
    },
    'Y': { // draw
        'A': 1, 'B': 2, 'C': 3, bonus: 3
    },
    'Z' : { // win
        'A': 2, 'B': 3, 'C': 1, bonus: 6
    }
};

console.log(`Part 2 = ${input.reduce((total,order) => total + part2PlayValue[order[1]][order[0]]+part2PlayValue[order[1]].bonus, 0)}`);

