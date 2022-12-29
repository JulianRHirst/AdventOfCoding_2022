const fs = require("fs");

const readInput = filename => fs.readFileSync(filename, {encoding: 'utf8', flag:"r"});
const prepareInput = input => input.split('\r\n');

const input = prepareInput(readInput("./src/ex7/ex7_input.txt"));

input.reduce((filearray, command) => { 
    const firstCharacter = command.substr(0, 1);
    if (+firstCharacter>0) // number hence this is a file entry
    {}
});