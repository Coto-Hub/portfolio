<template>
  <section class="bj-container" :class="!roundIsStart ? 'end-game' : ''">
    <div class="player-money">
      Solde : {{ getPlayerMoney }}€
    </div>
    <div class="bj-table">
      <bjDeck :card-package="blackjack.cardPackage" />
      <div class="hand-container" :class="p.hasSplit ? 'has-split' : ''" v-for="(p, i) in blackjack.playerHands">
        <playerHand v-if="p.hasSplit && p.split" :hand="p.split" />
        <playerHand :hand="p" />
      </div>

      <div v-if="getPlayerBet > 0 && !roundIsStart" class="bj-token">
        <div class="bj-btn" @click="startBj()">Start</div>
      </div>
    </div>
    <div class="player-bet" :class="!roundIsStart ? 'active' : ''">
      <div class="amount-bet">
        {{ getPlayerBet }}€
      </div>
      <div class="bj-token" :class="player.money < 50 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(50)">50€</div></div>
      <div class="bj-token" :class="player.money < 100 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(100)">100€</div></div>
      <div class="bj-token" :class="player.money < 500 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(500)">500€</div></div>
      <div class="bj-token" :class="player.money < 1 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(player.money)">ALL</div></div>
    </div>
    <div class="player-action" :class="playerIsActive ? 'active' : ''">
      <div class="bj-btn" @click="playerClick('S')">Rester</div>
      <div class="bj-btn" :class="!canDouble ? 'disabled' : ''" @click="playerClick('D')">Doubler</div>
      <div class="bj-btn" @click="playerClick('H')">Tirer</div>
      <div class="bj-btn" :class="!canSplit ? 'disabled' : ''" @click="playerClick('P')">Divisier</div>
    </div>
  </section>
</template>

<script>
import playerHand from "./../blackjack/bj-hand.vue";
import bjDeck from "./../blackjack/bj-deck.vue";
import { BlackJack } from "../../../assets/js/blackjack";

export default {
  name: "BjTable",
  components: {
    playerHand,
    bjDeck,
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
    statistics: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      blackjack: {},
      userHand: {},
    };
  },
  created() {
    this.restartBj();
    this.userHand = this.blackjack.playerHands[3];
  },
  methods: {
    async restartBj() {
      this.gameResult = null;
      this.isGameRestarting = false;
      this.blackjack = new BlackJack(this.player, this.statistics);
    },
    async startBj() {
      this.blackjack.isStart = true;
      this.blackjack.playerHands.map((playerHand) => {
        playerHand.resetHand();
        return playerHand;
      });

      if (this.blackjack.numberCard <= 0) {
        const newPackage = this.blackjack.shufflePackage(this.blackjack.generateCardPackge());
        this.blackjack.cardPackage = newPackage.concat(this.blackjack.cardPackage);
        this.blackjack.numberCard = Math.round(Math.random * 26) + 52;
      }
      this.blackjack.playTurn(this.blackjack.playerHands.length - 1);
    },
    addBet(value) {
      if (this.player.money >= value) {
        this.player.money -= value;
        this.userHand.playerBet += value;
      }
    },
    async playerClick(event) {
      const isSplitTurn = this.userHand.hasSplit && (this.userHand.split ? this.userHand.split.isActive : false);
      if (!this.userHand.isActive && !isSplitTurn) {
        return;
      }
      const currentHand = isSplitTurn ? this.userHand.split : this.userHand;
      switch (event) {
        case 'S':
          currentHand.hasFinish = true;
          this.blackjack.playTurn(isSplitTurn ? 3 : 2);
          break;
        case 'H':
          await this.blackjack.takeCard(currentHand, false);
          this.blackjack.playTurn(3);
          break;
        case 'D':
          if (this.player.money < currentHand.playerBet) {
            return;
          }
          this.player.money -= this.userHand.playerBet;
          currentHand.playerBet += currentHand.playerBet;
          currentHand.hasDouble = true;
          await this.blackjack.takeCard(currentHand, false);
          currentHand.hasFinish = true;
          this.blackjack.playTurn(isSplitTurn ? 3 : 2);
          break;
        case 'P':
          if (this.player.money < this.userHand.playerBet || this.userHand.hasSplit) {
            return;
          }
          this.player.money -= this.userHand.playerBet;
          this.userHand.hasSplit = true;
          this.userHand.split = this.blackjack.getSplit(this.userHand);
          this.userHand.cards.pop();
          this.userHand.split.cards.shift();
          await this.blackjack.takeCard(this.blackjack.playerHands[3], false);
          this.blackjack.playTurn(3);
          break;  
      }
    }
  },
  computed: {
    playerIsActive() {
      if (this.userHand.isActive && this.userHand.cards.length >= 2) {
        return true;
      }
      if (this.userHand.split) {
        return this.userHand.split.isActive && this.userHand.split.cards.length >= 2;
      }
    },
    roundIsStart() {
      return this.blackjack.isStart;
    },
    getPlayerBet() {
      return this.userHand.playerBet;
    },
    canDouble() {
      return !this.userHand.hasDouble && this.userHand.cards.length == 2 && this.player.money > this.getPlayerBet;
    },
    canSplit() {
      if (this.userHand.cards.length === 2 && !this.userHand.hasSplit && this.userHand.havePair()) {
        return true;
      }
      return false;
    },
    getPlayerMoney() {
      return this.player.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  }
};
</script>
