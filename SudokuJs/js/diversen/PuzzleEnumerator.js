var PuzzleEnumerator = function (puzzle) {
    this.puzzle = puzzle;
    var rowIndex = 0;
    var columnIndex = -1;

    this.moveNext = function () {
        if (columnIndex < this.puzzle.rows[0].cells.length - 1) {
            columnIndex++;
        }
        else {
            if (rowIndex < this.puzzle.rows.length - 1) {
                rowIndex++;
                columnIndex = 0;
            }
            else {
                return false;
            }
        }

        return true;
    };

    this.current = function () {
        return this.puzzle.rows[rowIndex].cells[columnIndex];
    }
}