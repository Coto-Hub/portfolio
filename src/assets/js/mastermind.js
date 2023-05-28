import { Notification } from "./notification";

export const multiplierList = [500, 100, 50, 25, 10, 5, 4, 3, 2, 1]
export const numberLines = 10;
export const numberColors = 5;
const gameTag = "mm";

export class MasterMind {
    constructor(player, statistics, notificationCenter) {
        this.linesColors = this.generateLinesColors(numberLines);
        this.resultLine = this.generateResultLine(numberColors);
        this.statistics = statistics;
        this.notificationCenter = notificationCenter;
        this.player = player;
        this.isStart = false;
        this.isActive = false;
        this.indexLines = 0;
        this.playerBet = 0;
    }
7
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

        if (newGoodplace === 5) {
            this.isStart = false;
            this.isActive = false;

            const win = this.playerBet * multiplierList[this.indexLines];
            this.player.addMoney(win);
            const msg = (win == this.player.playerBet) ? "Vous venez de récupérer votre mise." : `Vous venez de gagner ${win.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}€ !`

            this.statistics.addStatistic({
                money: this.player.money,
                playerScore: win,
                game: gameTag,
            });
            this.notificationCenter.addNotification(new Notification("icon", {
                title: "MasterMind",
                message: msg,
                icon: "money",
            }));
            this.playerBet = 0;
        }
        else if(this.indexLines + 1 >= numberLines) {
            this.statistics.addStatistic({
                money: this.player.money,
                playerScore: - this.playerBet,
                game: gameTag,
            });
            this.notificationCenter.addNotification(new Notification("icon", {
                title: "MasterMind",
                message: "Vous avez perdu...",
                icon: "money",
            }));
            this.isStart = false;
            this.isActive = false;
            this.playerBet = 0;
        }
        return newGoodplace === 5;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    currentLineIsFull() {
        return this.linesColors[this.indexLines].isFull();
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

    isFull() {
        return this.colors.every((c) => c.class !== "");
    }
}