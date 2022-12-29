const fs = require("fs");

const readInput = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: "r" }).split('\r\n');
const part1PrepareInput = (input) => input.map(inventory => [[... new Set(inventory.slice(0, inventory.length / 2).split(''))], [... new Set(inventory.slice(inventory.length / 2).split(''))]]);
const input = readInput("./src/ex3/ex3_input.txt");
const part1Input = part1PrepareInput(input);

const calculatePriority = (char) => char.charCodeAt() + (char.toUpperCase() === char ? 27 - 'A'.charCodeAt() : 1 - 'a'.charCodeAt());

console.log(`Part 1: ${part1Input.reduce((total, pocket) => total + pocket[0].reduce((sum, char) => sum + (pocket[1].indexOf(char) === -1 ? 0 : calculatePriority(char)), 0), 0)}`);

const part2Input = input.map(string => [...new Set(string.split(''))]);

console.log(`Part 2: ${part2Input.reduce((total, element, index, array) => total + (index % 3 ? 0 : calculatePriority(((element.filter(char => array[index + 1].indexOf(char) + 1).filter(char => array[index + 2].indexOf(char) + 1)))[0])), 0)}`);