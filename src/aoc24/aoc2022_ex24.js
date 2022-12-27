// const { isBlockScoped } = require("@babel/types")
const map = (filename) => FileSystem.ReadFile(filename, (error, text) => text.split('\r\n').map((value) => value.split('')));

const valleyWidth = map[0].length - 2; // width of the valley is 2 less than the length of a row - 2 rows of walls are not counted
const valleyHeight = map.length - 2;   // height of the valley is 2 less than the number of rows in the map - 2 rows of walls are not counted.

const positionIsBlocked = (row, col, time) => {

    return (row!==0 || col!==1) &&   // position (1,1) can never be blocked
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

    if (map[row][col]==="E") {  // found the exit!
        console.log(nowTrail);
        return move;
    }
    
    if (positionIsBlocked(row, col, move))
        // position is blocked, so this attempt at getting to exit is at an end, return the current quickest route time
        return quickest;

    if (dejaVu.has(`${row},${col},${move}`))
        // we've been here before at this time, so no need to continue - we know the result so just return current quickets time
        return quickest;
    else
        // record visiting this location at this time
        dejaVu.add(`${row},${col},${move}`);

    // find the shortest route, visiting the cell below
    const try1 = walk(row + 1, col, nextMove, quickest, nowTrail);

    // find the shortest route, visiting the cell to the right
    const try2 = walk(row, col + 1, nextMove, try1, nowTrail);
    
    // find the shortest route, visiting the cell to the left
    const try3 = walk(row, col - 1, nextMove, try2, nowTrail);
    
    // if not on the start locaction, try the cell above
    const try4 = row > 0 ? walk(row - 1, col, nextMove, try3, nowTrail) : try3;

    // find the best route by waiting 1 turn
    return walk(row, col, nextMove, try4, nowTrail);
}

// main()


console.log(`Shortest Travel Time = ${walk(0, 1, 0, -1, "\r\n[start] ")} minutes.`);