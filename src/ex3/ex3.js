const fs = require("fs");

const readInput = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: "r" });
const prepareInput = (input) => input.split('\r\n').map(inventory => [[... new Set(inventory.slice(0, inventory.length / 2).split(''))], [... new Set(inventory.slice(inventory.length / 2).split(''))]]);

const input = prepareInput(readInput("./src/ex3/ex3_input.txt"));

const charValue = (char) => char.charCodeAt() + (char.toUpperCase() === char ? 27 - 'A'.charCodeAt() : 1 - 'a'.charCodeAt());

console.log(`Part 1: ${input.reduce((total, pocket) => total + pocket[0].reduce((sum, char) => sum + (pocket[1].indexOf(char) == -1 ? 0 : charValue(char)), 0), 0)}`);

const result = input.reduce((sum, value, index, array) => (index % 3 === 0) ? input[index][0]);