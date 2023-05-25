const numberLines = 8;
const numberColors = 5;

export class MasterMind {
    constructor(player) {
        this.linesColors = this.generateLinesColors(numberLines);
        this.resultLine = this.generateResultLine(numberColors);
        this.player = player;
        this.isStart = false;
        this.indexLines = 0;
    }

    generateLinesColors(numberLines) {
        let linesColors = [];
        for (let index = 0; index < numberLines; index++) {
            linesColors.push(new LineColor(index, numberColors));
        }
        return linesColors;
    }

    generateResultLine(numberColors) {
        const tableNb = this.shuffleArray(Array.from({length: 6}, (_, i) => i + 1));
        tableNb.pop();
        const resultLine = new LineColor(-1, numberColors);
        resultLine.changeFromArray(tableNb);
        return resultLine;
    }

    addColorLine(indexColor) {
        const customClass = `bg-palette-${indexColor}`;

        this.linesColors[this.indexLines].colors.some((value) => {
            if (value.class === '') {
                value.class = customClass;
            }
            return value.class === customClass;
        });
    }

    removeColorLine() {
        this.linesColors[this.indexLines].colors.forEach((value) => {
            value.class = '';
        });
    }

    saveColorLine() {
        const listColors = this.linesColors[this.indexLines].colors
        const resultColors = this.resultLine.colors
        var newGoodColor = 0;
        var newGoodplace = 0;
        this.resultLine.colors.forEach((value) => {
            const index = listColors.findIndex(c => c.class === value.class);
            if (index > -1) {
                if (listColors[index].class === resultColors[index].class)
                    newGoodplace++
                else
                    newGoodColor++
            }
        });
        this.linesColors[this.indexLines].goodColor = newGoodColor;
        this.linesColors[this.indexLines].goodPlace = newGoodplace;
        this.linesColors[this.indexLines].isValidated = true;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export class LineColor {
    constructor(id, numberColors) {
      this.id = id;
      this.colors = this.generateColors(numberColors);
      this.isValidated = false;
      this.goodColor = 0;
      this.goodPlace = 0;
    }
  
    generateColors(numberColors) {
      let colors = [];
      for (let index = 0; index < numberColors; index++) {
        colors.push({ id: index, class: '', });
      }
      return colors;
    }
  
    changeFromArray(array) {
      for (let index = 0; index < array.length; index++) {
        this.colors[index].class = `bg-palette-${array[index]}`;
      }
    }
  }
  