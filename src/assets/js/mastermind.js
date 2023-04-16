import { LineColor } from "./utils";

const numberLines = 12;
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

    shuffleArray(array) {
        console.log(array.length);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}