import { Card, PlayerHand } from "./utils";

const cardSigns = ["coeur", "pique", "carreau", "trefle"];
// const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, "V", "D", "R"];
const cardValues = ['A', 'A', 'A', 'A', 'A', 10, 10, 10, 10, 10];
const gameTag = "bj";

export class BlackJack {
  constructor(player, statistics) {
    this.cardPackage = [];
    this.playerHands = this.generateHand();
    this.player = player;
    this.statistics = statistics;
    this.isStart = false;
    this.numberCard = 0;
  }

  finishRound() {
    if (!this.isStart) {
      return;
    }
    this.isStart = false;
    const mainCount = this.playerHands[0].getCardsCount();
    const mainHaveBj = this.playerHands[0].haveBlackJack();
    this.playerHands.map((playerHand) => {
      this.setHandScore(playerHand, mainCount, mainHaveBj);
      if (playerHand.split) {
        this.setHandScore(playerHand.split, mainCount, mainHaveBj);
      }
    });
    this.player.setCookie();
  }

  setHandScore(playerHand, mainCount, mainHaveBj) {
    const temps = playerHand.playerBet;
    const playerCount = playerHand.getCardsCount();
    playerHand.playerBet = 0;
    playerHand.playerScore = 0;
    if (playerHand.isMain || playerCount > 21) {

      if (!playerHand.isBot) {
        this.statistics.addStatistic({
          money: this.player.money,
          playerScore: - temps,
          game: gameTag,
        });
      }
      return;
    }
    if (mainCount > 21 || playerCount > mainCount) {
      playerHand.playerScore = temps * 2;
    }
    if (playerHand.haveBlackJack()) {
      playerHand.playerScore = temps * 3;
    }
    if (mainCount === playerCount) {
      playerHand.playerScore = temps;
    }

    if (!playerHand.isBot) {
      this.player.money += playerHand.playerScore;
      
      this.statistics.addStatistic({
        money: this.player.money,
        playerScore: playerHand.playerScore - temps,
        game: gameTag,
      });

      if (this.player.money > this.player.highScore) {
        this.player.highScore = this.player.money;
      }
    }
  }

  getSplit(playerHand) {
    const splitHand = new PlayerHand(7, false, false);
    splitHand.cards = [...playerHand.cards]; 
    splitHand.hasSplit = false;
    splitHand.playerBet = playerHand.playerBet;
    return splitHand;
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
      if (h.split) {
        h.split.isActive = false;
      }
    });
    playerHand.isActive = true;
  }

  async playTurn(index) {
    const nextIndex = (index + this.playerHands.length - 1) % this.playerHands.length;
    let currentHand = this.playerHands[index];
    
    if (currentHand.hasSplit && currentHand.hasFinish) {
      currentHand = currentHand.split;
    }

    this.switchActiveHand(currentHand);
    if (currentHand.getCardsCount() >= 21 && !currentHand.isMain) {
      this.playTurn(nextIndex);
    }
    if (currentHand.cards.length < 2) {
      await this.takeCard(
        currentHand,
        currentHand.cards.length == 1 &&
        currentHand.isMain
      );
      if (!this.playerHands[index].hasSplit) {
        this.playTurn(nextIndex);
      }
    } else {
      if (currentHand.isMain) {
        if (currentHand.cards.length == 2) {
          currentHand.cards[1].reverse = false;
        }
        if (currentHand.getCardsCount() < 17) {
          await this.takeCard(currentHand, false);
          await this.sleep(1000);
          this.playTurn(index);
        }
        else {
          this.finishRound();
        }
      }
      else if (currentHand.isBot) {
        await this.sleep(700);
        
        switch (currentHand.playBotTurn(this.playerHands[0])) {
          case 'H':
            await this.takeCard(currentHand, false);
            this.playTurn(index);
            break;
          case 'D':
            currentHand.hasDouble = true;
            await this.takeCard(currentHand, false);
            this.playTurn(nextIndex);
            break; 
          default:
            this.playTurn(nextIndex);
            break;
        }
      }
    }
  }

  async takeCard(playerHand, reverse = false) {
    this.switchActiveHand(playerHand);
    if (this.cardPackage.cardReturn === undefined) {
      this.numberCard = this.numberCard > 0 ? this.numberCard - 1 : 0;
      this.cardPackage.cardReturn = this.cardPackage.pop();
      if (!reverse && this.cardPackage.cardReturn) {
        await this.sleep(100);
        this.cardPackage.cardReturn.reverse = reverse;
        await this.sleep(700);
      }
      playerHand.cards.push(this.cardPackage.cardReturn);
      this.cardPackage.cardReturn = undefined;
    }
  }
}
