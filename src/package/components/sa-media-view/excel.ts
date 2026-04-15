// #Function 创建A_Z列表
export function generateAlphabetSequence(end = "ZZ", start = "A", tableEnd = "ZZ") {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const sequence: string[] = [];
  let RIndexText = "";
  let RIndex = 0;
  let startSave = false;
  function generateAlphabetSequenceAr(startText) {
    for (let i = 0; i < alphabet.length; i++) {
      const Text = startText + alphabet[i];
      if (Text == start) startSave = true;
      if (end && (Text == end || Text == tableEnd) && startSave) {
        sequence.push(Text);
        return;
      }
      if (startSave) sequence.push(Text);

      if (i == alphabet.length - 1) {
        RIndexText = alphabet.split("")[RIndex];
        RIndex++;
        generateAlphabetSequenceAr(RIndexText);
      }
    }
  }
  generateAlphabetSequenceAr(RIndexText);

  return sequence;
}

// #Function  判断是否有合并单元格
export function hasMergedCells(worksheet) {
  return worksheet["!merges"] && worksheet["!merges"].length > 0;
}

export function getMergedCellArr(worksheet, tableEnd) {
  const arr: string[] = [];
  if (hasMergedCells(worksheet)) {
    for (const merge of worksheet["!merges"]) {
      const startCell = `${getColumnName(merge.s.c)}${merge.s.r + 1}`;
      const endCell = `${getColumnName(merge.e.c)}${merge.e.r + 1}`;

      const colStart = Number(startCell.replace(/[a-zA-Z]/g, ""));
      const colEnd = Number(endCell.replace(/[a-zA-Z]/g, ""));
      const _endCell = endCell.replace(/\d/g, "");
      const _startCell = startCell.replace(/\d/g, "");
      arr.push(startCell);
      arr.push(endCell);
      const row = generateAlphabetSequence(_endCell, _startCell, tableEnd);
      for (let index = 0; index < row.length; index++) {
        const _row = row[index];
        for (let i = colStart; i < colEnd + 1; i++) {
          const element = _row + i;
          arr.push(element);
        }
      }
    }
  }

  return arr;
}

// #Function  获取合并单元格
export function getMergedCells(worksheet, configDataArrWidthMap, key, tableEnd) {
  const CELL_HEIGHT = 30;
  const KEY = key.replace(/\d/g, "");

  const mergedCells = { row: configDataArrWidthMap[KEY], col: CELL_HEIGHT };
  if (hasMergedCells(worksheet)) {
    for (const merge of worksheet["!merges"]) {
      const startCell = `${getColumnName(merge.s.c)}${merge.s.r + 1}`;
      const endCell = `${getColumnName(merge.e.c)}${merge.e.r + 1}`;

      const colStart = Number(startCell.replace(/[a-zA-Z]/g, ""));
      const colEnd = Number(endCell.replace(/[a-zA-Z]/g, ""));
      const _endCell = endCell.replace(/\d/g, "");
      const _startCell = startCell.replace(/\d/g, "");

      const row = generateAlphabetSequence(_endCell, _startCell, tableEnd);
      if (startCell == key) {
        mergedCells.col = (colEnd - colStart + 1) * CELL_HEIGHT;
        mergedCells.row = row.reduce((pre, cur) => {
          return pre + configDataArrWidthMap[cur];
        }, 0);
      }

      const ch_key = key.split("");

      if (row.indexOf(ch_key[0]) > -1 && ch_key[1] <= colEnd && ch_key[1] >= colStart && key != startCell) {
        mergedCells.col = 0;
        mergedCells.row = 0;
      }
    }
  }

  return mergedCells;
}

// #Function  获取列名称
export function getColumnName(columnIndex) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let columnName = "";
  while (columnIndex >= 0) {
    columnName = alphabet[columnIndex % 26] + columnName;
    columnIndex = Math.floor(columnIndex / 26) - 1;
  }
  return columnName;
}

// #Function 获取合并单元格范围内的所有单元格
export function getCellsInMergedRange(startCell, endCell) {
  const cells: string[] = [];
  const startCol = getColumnIndex(startCell);
  const endCol = getColumnIndex(endCell);
  const startRow = parseInt(startCell.match(/\d+/)[0]) - 1;
  const endRow = parseInt(endCell.match(/\d+/)[0]) - 1;

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      cells.push(`${getColumnName(col)}${row + 1}`);
    }
  }

  return cells;
}

// #Function 获取列索引
export function getColumnIndex(columnName) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let columnIndex = 0;
  for (let i = 0; i < columnName.length; i++) {
    columnIndex = columnIndex * 26 + alphabet.indexOf(columnName[i]) + 1;
  }
  return columnIndex - 1;
}

// #Function 计算字符串长度;
export function getStringLength(str) {
  let length = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      length += 2;
    } else {
      length += 1.3;
    }
  }
  return length;
}
