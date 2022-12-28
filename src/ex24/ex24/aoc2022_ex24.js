// const { isBlockScoped } = require("@babel/types")
// import {ReadFile} from FileSystem;

const fs = require("fs");

const readInput = (filename) => fs.readFileSync(filename, {encoding: 'utf8', flag:"r"});

const prepareMap = (mapData) => mapData.split('\r\n').map((value, index, array) => (index === array.length-1 ? value.replace('.', 'E') : value).split(''));


const map = prepareMap(readInput("./src/aoc24/aoc2022_ex24.input.txt"));



const startRow = 0;
const startCol = map[0].indexOf('.');


const positionIsBlocked = (row, col, time) => {

    const valleyWidth = map[0].length - 2; // width of the valley is 2 less than the length of a row - 2 rows of walls are not counted
    const valleyHeight = map.length - 2;   // height of the valley is 2 less than the number of rows in the map - 2 rows of walls are not counted.

    return (row!==startRow || col!==startCol) &&   // position (1,1) can never be blocked
            // if position is a wall, it is blocked
            (map[row][col] === "#") ||
            // if a "^" storm now occupies the space at (row, col) in move 'move', it must have started its journey 'time' seconds ago, in column col, but on a row, 'move' rows below us
            // wrapping round the interior of the valley if it goes off the bottom.
            (map[(row - 1 + time) % valleyHeight + 1][col] === "^") ||
            (map[(row - 1 - (time % valleyHeight) + valleyHeight) % valleyHeight + 1][col] === "V") ||
            (map[row][(col - 1 + time) % valleyWidth + 1] === "<") ||
            (map[row][(col - 1 - (time % valleyWidth) + valleyWidth) % valleyWidth + 1] === ">")
        ;
};

const dejaVu = new Set();

function walk(row, col, move, quickest, trail) {

    // if the number of is equal to the quickest route we've already found, there's no point in continuing
    if (move === quickest)
        return quickest;

    const nextMove = move + 1;
    const nowTrail = trail + `(${row},${col})` + (nextMove % 10 === 0 ? "\r\n" : " ");


    if (positionIsBlocked(row, col, move))
        // position is blocked, so this attempt at getting to exit is at an end, return the current quickest route time
        return quickest;

    const dejaVuRecord = `${row},${col},${move}`;
    
    if (dejaVu.has(dejaVuRecord))
        // we've been here before at this time, so no need to continue - we know the result from here, so just return current quickets time
        return quickest;

        
    if (map[row][col]==="E") {  // found the exit!
        console.log(`\nNew route, journey time = ${move}${nowTrail}`);
        return move;
    }

    // record visiting this location at this time
    dejaVu.add(dejaVuRecord);

    // find the shortest route from here, visiting the cell below next
    const try1 = walk(row + 1, col, move+1, quickest, nowTrail);

    // find the shortest route from here, visiting the cell to the right next
    const try2 = walk(row, col + 1, move+1, try1, nowTrail);
    
    // find the shortest route from here, visiting the cell to the left next4
    const try3 = walk(row, col - 1, move+1, try2, nowTrail);
    
    // if not on the start locaction from here, visiting the cell above next
    const try4 = row > 0 ? walk(row - 1, col, move+1, try3, nowTrail) : try3;

    // find the best route from here, waiting 1 turn in place
    return walk(row, col, move+1, try4, nowTrail);
}

// main()

map.forEach((item, index) => console.log(index, "=", item));

console.log(`Shortest Travel Time = ${walk(startRow, startCol, 0, -1, "\n[start] ")} minutes.`);