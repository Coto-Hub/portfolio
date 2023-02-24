export class Card {
  constructor(id, value, sign) {
    this.id = id;
    this.value = value;
    this.sign = sign;
    this.reverse = true;
  }
}

export class PlayerHand {
  constructor(id, isBot, isMain) {
    this.id = id;
    this.cards = [];
    this.isBot = isBot;
    this.isMain = isMain;
    this.isActive = false;
  }

  getCardsCount() {
    return this.cards.slice().reduce((partialSum, c) => {
      if (c.reverse || !c.value) {
        return partialSum;
      }
      return partialSum + (typeof c.value === "string" ? 10 : c.value);
    }, 0);
  }

  getBotCard() {
    return true;
  }
}
