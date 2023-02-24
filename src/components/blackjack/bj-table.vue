<template>
  <section class="bj-container">
    <div class="bj-table">
      <bjDeck :card-package="blackjack.cardPackage" />
      <playerHand v-for="(p, i) in blackjack.playerHands" :key="i" :hand="p" />

      <div class="bj-token">
        <div class="bj-btn" @click="startBj()">Start</div>
      </div>
    </div>
  </section>
</template>

<script>
import playerHand from "./../blackjack/bj-hand.vue";
import bjDeck from "./../blackjack/bj-deck.vue";
import { BlackJack } from "./../../js/game";

export default {
  name: "BjTable",
  components: {
    playerHand,
    bjDeck,
  },
  props: {},
  data() {
    return {
      blackjack: {},
    };
  },
  created() {
    this.restartBj();
  },
  methods: {
    async restartBj() {
      this.gameResult = null;
      this.isGameRestarting = false;
      this.blackjack = new BlackJack();
      this.blackjack.playTurn(this.blackjack.playerHands.length - 1);
    },
  },
};
</script>
