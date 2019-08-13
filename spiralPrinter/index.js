function buildMatrix(x,y){
    if(x<1 || y<1) {
        return [];
    }

    let result = [];
    for(let i=0; i< y; i++) {
        result[i] = [];

        for(let j=0; j<x; j++) {
            result[i][j] = 1+ i*y + j;
        }
    }

    return result;
}

function getSpiralFromMatrix(matrix, x, y){
    if(matrix[0] === undefined) {
        return [];
    }

    let result = [];
    const size = x*y;

    let cX = 0, cY = 0;
    let minX = 0, minY = 0;
    let dir = "right";

    result.push(matrix[cY][cX]);

    while(result.length < size) {
        switch(dir) {
            case "right":
                if(++cX >= x) {
                    cX = --x;
                    dir = "down";
                    continue;
                }
                break;
            case "down":
                if(++cY >= y) {
                    cY = --y;
                    dir = "left";
                    continue;
                }
                break;
            case "left":
                if(--cX < minX) {
                    cX = minX;
                    dir = "up";
                    continue;
                }
                break;
            case "up":
                if(--cY < minY + 1) {
                    cY = ++minY;
                    minX++;
                    dir = "right";
                    continue;
                }
                break;
        }

        result.push(matrix[cY][cX]);
    }

    return result;
}

let tests = [
    [
        //empty
        {
            x: 0,
            y: 0,
            result: [],
        },
        //symetric
        {
            x: 1,
            y: 1,
            result: [1]
        },
        {
            x: 3,
            y: 3,
            result: [1,2,3,6,9,8,7,4,5]
        },
        //assymetric
        {
            x: 1,
            y: 5,
            result: [1,2,3,4,5]
        },
        {
            x: 2,
            y: 3,
            result: [1,2,3,6,5,4]
        }
    ]
];

for(let test of tests) {
    console.assert(getSpiralFromMatrix(JSON.stringify(buildMatrix(test.x, test.y)) === JSON.stringify(test.result)));
}