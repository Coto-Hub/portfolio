export const defaultMoney = 1000;

const tableStats = {
  'A-7' : {
    1 : 'H', 2 : 'S',
    3 : 'D', 4 : 'D',
    5 : 'D', 6 : 'D',
    7 : 'S', 8 : 'S',
    9 : 'H', 10 : 'H',
  },
  'A-6' : {
    1 : 'H', 2 : 'H',
    3 : 'D', 4 : 'D',
    5 : 'D', 6 : 'D',
    7 : 'H', 8 : 'H',
    9 : 'H', 10 : 'H',
  },
  'A-5' : {
    1 : 'H', 2 : 'H',
    3 : 'H', 4 : 'D',
    5 : 'D', 6 : 'D',
    7 : 'H', 8 : 'H',
    9 : 'H', 10 : 'H',
  },
  'A-4' : {
    1 : 'H', 2 : 'H',
    3 : 'H', 4 : 'D',
    5 : 'D', 6 : 'D',
    7 : 'H', 8 : 'H',
    9 : 'H', 10 : 'H',
  },
  'A-3' : {
    1 : 'H', 2 : 'H',
    3 : 'H', 4 : 'H',
    5 : 'D', 6 : 'D',
    7 : 'H', 8 : 'H',
    9 : 'H', 10 : 'H',
  },
  'A-2' : {
    1 : 'H', 2 : 'H',
    3 : 'H', 4 : 'H',
    5 : 'D', 6 : 'D',
    7 : 'H', 8 : 'H',
    9 : 'H', 10 : 'H',
  },
  12 : {
    1 : 'H', 2 : 'H',
    3 : 'H', 4 : 'S',
    5 : 'S', 6 : 'S',
    7 : 'H', 8 : 'H',
    9 : 'H', 10 : 'H',
  },
  11 : {
    1 : 'H', 2 : 'D',
    3 : 'D', 4 : 'D',
    5 : 'D', 6 : 'D',
    7 : 'D', 8 : 'D',
    9 : 'D', 10 : 'D',
  },
  10 : {
    1 : 'H', 2 : 'D',
    3 : 'D', 4 : 'D',
    5 : 'D', 6 : 'D',
    7 : 'D', 8 : 'D',
    9 : 'D', 10 : 'H',
  },
  9 : {
    1 : 'H', 2 : 'H',
    3 : 'D', 4 : 'D',
    5 : 'D', 6 : 'D',
    7 : 'H', 8 : 'H',
    9 : 'H', 10 : 'H',
  }
}

export class LineColor {
  constructor(id, numberColors) {
    this.id = id;
    this.colors = this.generateColors(numberColors);
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

export class Card {
  constructor(id, value, sign) {
    this.id = id;
    this.value = value;
    this.sign = sign;
    this.reverse = true;
  }

  getValue() {
    if (this.reverse) {
      return 0;
    }
    else if (typeof this.value === "string") {
      return this.value === 'A' ? 1 : 10;
    }
    return this.value;
  }
}

export class PlayerHand {
  constructor(id, isBot, isMain) {
    this.id = id;
    this.cards = [];
    this.isBot = isBot;
    this.isMain = isMain;
    this.isActive = false;
    this.hasDouble = false;
    this.hasSplit = false;
    this.playerBet = 0;
    this.playerScore = 0;
    this.split = null;
    this.hasFinish = false;
  }

  resetHand() {
    this.cards = [];
    this.isActive = false;
    this.hasDouble = false;
    this.hasSplit = false;
    this.playerScore = 0;
    this.split = null;
    this.hasFinish = false;

    if (this.isBot && !this.isMain) {
      this.setRandomBet();
    }
  }

  haveAce() {
    return this.cards.some((element) => !element.reverse && (element.value === 'A'));
  }

  havePair() {
    return (this.cards[0].value === this.cards[1].value && this.cards.length === 2);
  }

  haveBlackJack() {
    return this.getCardsCount() === 21 && this.cards.length === 2;
  }

  setRandomBet() {
    this.playerBet = Math.round(Math.random() * 100);
  }

  getCardsCount() {
    const cardsCount = this.cards.slice().reduce((partialSum, c) => {
      return partialSum + (c ? c.getValue() : 0);
    }, 0);
    return (this.haveAce() && cardsCount <= 11) ? cardsCount + 10 : cardsCount; 
  }

  playBotTurn(mainHand) {
    const cardCount = this.getCardsCount();
    const mainCount = mainHand.getCardsCount();
    const index = (this.haveAce() && cardCount !== 12) ? 'A-'+(cardCount > 11 ? cardCount - 11 : cardCount - 1) : cardCount;
    if (tableStats[index] ? tableStats[index][mainCount] : false) {
      return tableStats[index][mainCount];
    }
    if (cardCount >= 17 || (cardCount >= 13 && mainCount <= 6)) {
      return 'S';
    }
    else if ((cardCount > 12 && mainCount >= 7) || cardCount <= 8) {
      return 'H';
    }
  }
}
