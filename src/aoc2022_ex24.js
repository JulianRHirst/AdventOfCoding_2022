const { isBlockScoped } = require("@babel/types")

/* const map = [
    [..."#.######"],
    [..."#>>.<^<#"],
    [..."#.<..<<#"],
    [..."#>v.><>#"],
    [..."#<^v^^>#"],
    [..."######E#"],
];*/

const map = [
    [..."#.########################################################################################################################"],
    [..."#>^v<.<<^v^<><>>>^<vv>^>><<<^^.^v^<<v^v<v>^^>^^<^><^>.^>v<v<v.v<>vv<^^^vvv<.^v^<v^.^.>.<^<^>v^.v^v<>^vv^<<>>v^<<.<vvv^.<<#"],
    [..."#><^>><<vvv.v>^<..<v><v^^>>>v>>vv^^^<^^<><<>v>v<><><<^<<v>v.>.v>vv<>^>.^vv^^.<v<vv.<v<>>^>>><v<.>v>v^<v<>^<<<^v^<.v..v<^>#"],
    [..."#<v^.^>vv.^<^<>v^<^^^<^^>v<<>v><><^v^<v.v<^><<<^^^.>vv<.^<v<v<v^<v>^<v^<.><^^<>^v>..<v..>v^><>>^<.>.vv<<<.v.^^^^^>.<<.<v<#"],
    [..."#>.<<^>^v>>v<v<>>^v^>><>>v.^>.<>>^v<>.^<>^^^<vv<vv^^^v^^<<><v^^>>.v<v^v<.>^^.^>^v><vv<^^<^>>^v>^>^^v^v.<<^.vv<v..^^v.>>v>#"],
    [..."#>v^^>^^.>.^^<>><>v^^^<v>>>v^v^v^^<^<<^<<>><<^<<vv<<^>>>.<^v^><v<v>>v^>><vv..<v><vv^.>.v^vv>^><v.<vv>^vv^^>><v>v>v<v>>^><#"],
    [..."#>^<vvv^><^vvv>><^^vv^^>v<.v^<^<vv<><v<>^^^^<>^>v<^vv><v.<>>..>^^v<><>v.>>vv<><^^><>v<v<>vv^^>v><>>.v<v<>>>^^^v^v<<<^><^<#"],
    [..."#>^><v>>^.^><.^^^^<v>v<.v^>^^^<<<^<<v><><v>>>>v<v>vv<v><>.^><<^v<>^^v<.^^v<^>v<>v^.>.<<.>vv.^^vvv.<.v^>^><v^<^^^^>.^vv^^<#"],
    [..."#><v^vvv>^<v<>^>^<.><v<<<><v<<<^v^>^<v>>v<^<vv<v>v^..^>^^^^<.><<<>vvv>^vv^>v^<<>vv<<v^>^.v>.^<^^..>v<^<v<^>^^<><vv<.^v^.>#"],
    [..."#<^<><v.>.<<^>>v<^..<<.>>v<<^^>v.<v.<.v<.vv<^>^vvv>^>>v<.<>v^<<<<^<v>^<vv>v<<<^^>^^<<<>^>vv>>^.><>^^v^^><v.>v^^<>^^^^<v>>#"],
    [..."#<v.>^><^>>vv^vvvv^<>vv<<v<<v^v^v<><<^.^<><v^^<><.v<^>^v>^<^v^><^>v>^<<<v><v<<^^>v><v<<<<^.v^.<^<v<<>^>>><>vv<.^^..v>v<<>#"],
    [..."#<v<^>v<<^^>>v<^>^^>v>^>v.v<<<>v>><v<vv.v^<<.v<v>v<<^v<<.>^<v>^^>^..<>^^v.^><^vv><v<<>>vvv^^vv<<>^>^v^<^><<^v<.>^>><^^<^<#"],
    [..."#<<>>v^^>>^.<^^<^^^>^^>vv>>>>>v^vv><.v>v>v<^>><^<<v><^>^>^vv^vv^<v<<<v>><v.v>^^<<.^vvv<>vv<><^^^vv>v^.><^<^vv><<.vv^^^.v<#"],
    [..."#<.<v><vv>^<>>^>.^<<v>..^vvv^^v>^<>>v<<<..^vv>^<...^<<>.<^>^<.v><v.>^^.vv<<^<v.>v^v^^>.^^vv.^v^><<>^^^^.v<..>v^<>^<>>vvv>#"],
    [..."#<^<<v^v<^<.^v^>v^<^<.>^^v^<^>.<v>v>^^^.v><v><vv<<v<>v.<^><>.><vv><<^^.vv<.<^.vvvvvv^^^^<vvv.^<.>v.^v>^v>><v^v.>v^^v.<.^<#"],
    [..."#.<<^.<v<<^^<>v.<.>v.^^^<<^v>.v<>v<...>^<v.<v<<><>.v<^^^>.^v>vv^<^.>.^>>^>v.>v>.^^<v><v^<><^^v<v^^<<<>^.>v><<v<<v>.<^v<v>#"],
    [..."#>>><<^v<^>v^>><^^.<v<^<<<^.<v^>v<<^^^>>^^.^v^>v^<>^v.>^><^>.^^v>><<>v<v><^vv<><^v>.v><^><<v>.^>v^^<<^<>.>v<v^^v<v.>v..>>#"],
    [..."#.v>^^.<v.^^>><^v<vv>v<^<>><v>^^v<<v>>.<<v^v<^.v.<^>^vvv<vv^v>><>^v<^><v..<^<vv<<v<.<^^^<<>v^^v>v>>^^^>vvvv<^^<>.<^^^><^.#"],
    [..."#<^^<v<^<>>vv>v<<vv^v<^.<>><<v<<v>^^^^>^<^>>^vv^^<^vv^>vvv>v>^v.><^>^^>.^^v.<<v.v<^<<^v><vv^^^v^>><.^<>v><v<vv^^>>v^>>..>#"],
    [..."#<^>v^^vv>^><^^^^^^>>.v<^.<^<>^><^.v<v<>>v.^.v^<vv^^<<<><..>>><.v<vv>^v^.<>>v^v.<vv><v^<vv<<v<><.<<^^v><.>v<<>v<<^^>>vvv>#"],
    [..."#.><<>>><^vv^v.>.>.^.<>>^^^v^^><>v<><>>>><v<<v^<>^v^v>>^^v^.<>v>vvv>v>>.<>>^>>>>^>^>v<.><vv>>.>>v<>><<^><v.^<<..>.vvv^v<<#"],
    [..."#>^>^<^^v>^^^>v>.v><>^>^v^^.v.>>v>>v^^^>>>v><>.<vv.<<<.<^^<^>^>v<v>^<^v<><>><>.^vv>^>.^>>>^><<^>^v<<^<vv<vv^.^^<vv>>v.<>>#"],
    [..."#><<><v<<vv>^>.^.<<.>.<.v>^>><^>v<>v^.<><^v^>>v<^^<.<^<>.<vv<<>vvvv>vv>v.<<^v<.>v>^^<v><>.>v>^<^<^^..>v<v>v.^<^<^<vv<v><>#"],
    [..."#>>^^<^<v^<v<vv^>..^v.^<^>^.v><^vv^..v.<>v<<.<v..v>v>vvv^>^<v>vv.^.>^.^^>v<^>v>v><>>^^>.v^<<.<^>v^vv><.v..<.><<v<.<<.<vv>#"],
    [..."#><<>^<>><^.^^><v<<^<^^>>v><v.vv><v<<<<.<^<v>v><>v<<^<<>>^>^vv>v<v.vv>v>v>>>><..v^^vv>><<>>vv><>>.>v<<>v<v^vv<v<<v^>>v<^.#"],
    [..."#>.<<><<vv<^.v<v<v<^>>v><v.^>^v.<^v.^^^<<<<.<<v^v>^<.>^vv^<<^^>.v>>>.v^v<v<v><^>v.>>^^>^v>vv<>vv^^<.<.v>^^v>.^^v<^v^>^^v>#"],
    [..."########################################################################################################################E#"]
];

const valleyWidth = map[0].length - 2;
const valleyHeight = map.length - 2;

const positionIsBlocked = (row, col, moveNumber) => {
    const valleyRow = row - 1;
    const valleyCol = col - 1;

    return (!(row===0 && col===1)) &&
            (map[row][col] === "#") ||
            (map[(valleyRow + moveNumber) % valleyHeight + 1][col] === "^") ||
            (map[(valleyRow - (moveNumber % valleyHeight) + valleyHeight) % valleyHeight + 1][col] === "V") ||
            (map[row][(valleyCol + moveNumber) % valleyWidth + 1] === "<") ||
            (map[row][(valleyCol - (moveNumber % valleyWidth) + valleyWidth) % valleyWidth + 1] === ">")
        ;
};

const goalRow = map.length -2;
const goalCol = map[0].length - 2;

const dejaVu = new Set();

function walk(row, col, travelTime, quickest, trail) {

    // console.log(x, y, map[x][y]);
    // if(moveNumber % 1000 === 0) console.log(x, y, moveNumber, bestTry);

    if (travelTime === quickest)
        return quickest;

    const nextMoveTime = travelTime + 1;
    const nowTrail = trail + `(${row},${col})` + (nextMoveTime % 10 === 0 ? "\r\n" : " ");

    if (map[row][col]==="E") {  // found the exit!
        console.log(nowTrail);
        return travelTime;
    }
    
    if (positionIsBlocked(row, col, travelTime))
        return quickest;

    if (dejaVu.has(`${row},${col},${travelTime}`))
        return quickest;
    else
        dejaVu.add(`${row},${col},${travelTime}`);

    //console.log("right");
    const quickestDown = walk(row + 1, col, nextMoveTime, quickest, nowTrail);
    //console.log("up");
    const quickestRight = walk(row, col + 1, nextMoveTime, quickestDown, nowTrail);
    //console.log("down");
    const quickestLeft = walk(row, col - 1, nextMoveTime, quickestRight, nowTrail);
    //console.log("left");
    const quickestUp = row > 0 ? walk(row - 1, col, nextMoveTime, quickestLeft, nowTrail) : quickestLeft;

    return walk(row, col, nextMoveTime, quickestUp, nowTrail);
}

//console.log(-105 % 100 );
//console.log(map[15]);
console.log(`Shortest Travel Time = ${walk(0, 1, 0, 1000, "\r\n[start] ")} minutes.`);
