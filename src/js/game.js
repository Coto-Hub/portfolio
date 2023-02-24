import { Card, PlayerHand } from "./utils";

const cardSigns = ["coeur", "pique", "carreau", "trefle"];
const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "V", "D", "R"];

export class BlackJack {
  constructor() {
    this.cardPackage = this.shufflePackage(this.generateCardPackge());
    this.playerHands = this.generateHand();
  }

  generateCardPackge() {
    let cardPackage = [];
    for (let index = 0; index < 2; index++) {
      cardSigns.forEach((sign) => {
        cardValues.forEach((value) => {
          cardPackage.push(new Card(cardPackage.length, value, sign));
        });
      });
    }
    return cardPackage;
  }

  generateHand() {
    let hands = [];
    hands.push(new PlayerHand(1, true, true));
    for (let index = 2; index <= 6; index++) {
      hands.push(new PlayerHand(index, index !== 4, false));
    }
    return hands;
  }

  shufflePackage(cardPackage) {
    return cardPackage
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  switchActiveHand(playerHand) {
    this.playerHands.map((h) => {
      h.isActive = false;
    });
    playerHand.isActive = true;
  }

  async playTurn(index) {
    const nextIndex =
      (index + this.playerHands.length - 1) % this.playerHands.length;
    if (this.playerHands[index].cards.length < 2) {
      await this.takeCard(
        this.playerHands[index],
        this.playerHands[index].cards.length == 1 &&
          this.playerHands[index].isMain
      );
      this.playTurn(nextIndex);
    } else {
      if (this.playerHands[index].isBot) {
        switch (true) {
          case this.playerHands[index].getBotCard():
            await this.takeCard(
              this.playerHands[index],
              this.playerHands[index].cards.length == 1 &&
                this.playerHands[index].isMain
            );
            break;

          default:
            break;
        }
        this.playTurn(nextIndex);
      } else {
        this.switchActiveHand(this.playerHands[index]);
        return;
      }
    }
  }

  async takeCard(playerHand, reverse = false) {
    this.switchActiveHand(playerHand);
    this.cardPackage.cardReturn = this.cardPackage.pop();
    if (!reverse) {
      await this.sleep(50);
      this.cardPackage.cardReturn.reverse = reverse;
      await this.sleep(700);
    }
    playerHand.cards.push(this.cardPackage.cardReturn);
    this.cardPackage.cardReturn = undefined;
  }
}
