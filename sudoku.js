function myFunction() {
    var board = new Array(9);
    var table = document.getElementById("sudokuForm");
    var bObject = table.getElementsByTagName("input");

    for (var i = 0; i < 9; ++i) {
        board[i] = new Array(9);
        for (var j = 0; j < 9; ++j) {
            board[i][j] = bObject[i * 9 + j].value;
        }
    }

    solveSudokuHelper(board);

    showSolution(board);
}

function showSolution(board) {
    for (var i = 0; i < 9; ++i) {
        for (var j = 0; j < 9; ++j) {
            document.getElementsByTagName("input")[i * 9 + j].value = board[i][j];
        }
    }
}


function generate(board) {
    var board = [
        [null, null, '9', '7', '4', '8', null, null, null],
        ['7', null, null, null, null, null, null, null, null],
        [null, '2', null, '1', null, '9', null, null, null],
        [null, null, '7', null, null, null, '2', '4', null],
        [null, '6', '4', null, '1', null, '5', '9', null],
        [null, '9', '8', null, null, null, '3', null, null],
        [null, null, null, '8', null, '3', null, '2', null],
        [null, null, null, null, null, null, null, null, '6'],
        [null, null, null, '2', '7', '5', '9', null, null]
    ];
}

function solveSudokuHelper(board) {
    var rc = nextUnassigned(board);
    var row, column = 0;
    if (rc[0] == -1) {
        return true;
    } else {
        row = rc[0];
        column = rc[1];
    }

    for (var num = '1'; num <= '9'; num++) {
        if (isValid(board, row, column, num)) {
            board[row][column] = num;
            if (solveSudokuHelper(board))
                return true;
            board[row][column] = "";
        }
    }
    return false;

}


function isValid(board, row, column, num) {
    for (var i = 0; i < 9; ++i) {
        if (num == board[row][i]) return false;
        if (num == board[i][column]) return false;
    }

    for (var i = row - row % 3; i < row - row % 3 + 3; ++i) {
        for (var j = column - column % 3; j < column - column % 3 + 3; ++j) {
            if (num == board[i][j]) return false;
        }
    }
    return true;
}

function nextUnassigned(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] == "")
                return [i, j];
        }
    }
    return [-1, -1];
}

function isValidSudoku(board) {
    for (var i = 0; i < 9; ++i) {
        var c = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var j = 0; j < 9; ++j) {
            if (board[i][j] >= '1' && board[i][j] <= '9') {
                ++c[board[i][j] - '1'];
                if (c[board[i][j] - '1'] > 1) {
                    return false;
                }
            } else if (board[i][j] != "") { //isValid non-number
                return false;
            }
        }
    }
    for (var i = 0; i < 9; ++i) {
        var c = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var j = 0; j < 9; ++j) {
            if (board[j][i] >= '1' && board[j][i] <= '9') {
                ++c[board[j][i] - '1'];
                if (c[board[j][i] - '1'] > 1) {
                    return false;
                }
            }
        }
    }

    for (var k = 0; k < 9; k = k + 3) {
        for (var p = 0; p < 9; p = p + 3) {
            var c = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var i = k; i < k + 3; ++i) {
                for (var j = p; j < p + 3; ++j) {
                    if (board[i][j] >= '1' && board[i][j] <= '9') {
                        ++c[board[i][j] - '1'];
                        if (c[board[i][j] - '1'] > 1) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    return true;
}