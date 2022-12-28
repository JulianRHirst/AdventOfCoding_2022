const fs = require("fs");

const readInput = (filename) => fs.readFileSync(filename, {encoding: 'utf8', flag:"r"});
const prepareInput = (input) => input.split('\r\n').map(value => value.split(' '));

const input = prepareInput(readInput("./src/aoc2022_2/ex2_input_aoc2022.txt"));

const gameValue  = (play) => {

    const value = {
        'A': 1,
        'B': 2,
        'C': 3,
        'X': 1,
        'Y': 2,
        'Z': 3
    }

    const theirValue = value[play[0]];
    const myValue = value[play[1]];

    return myValue + ( myValue - 1 === theirValue % 3 ? 6 : myValue === theirValue ? 3 : 0 );
}

console.log( input.reduce((total, play)=> total+gameValue(play), 0));