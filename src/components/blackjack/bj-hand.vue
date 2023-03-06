<template>
  <div
    class="player-hand"
    :class="!hand.isBot ? 'player' : hand.isMain ? 'dealer' : ''"
  >
    <div class="hand-count" :class="getCardCount > 21 ? 'loose' : ''">
      {{ getCardCount }}
    </div>
    <playingCard v-for="(c, i) in getCards" :key="i" :card="c" />
    <div class="player-status" :class="(hand.isActive && getCardCount <= 21)  ? 'active' : ''">
      <div class="bj-token">
        <div class="bj-btn" />
      </div>
    </div>
    <div v-if="!hand.isMain" class="hand-bet" :class="hand.asDouble  ? 'double' : ''">
      {{ getHandBet }}
      <div class="hand-score">
        {{ getHandScore }}
      </div>
    </div>
  </div>
</template>

<script>
import playingCard from "./../games/playing-card.vue";

export default {
  name: "PlayerHand",
  components: {
    playingCard,
  },
  props: {
    hand: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {};
  },
  computed: {
    getCardCount() {
      return this.hand.getCardsCount();
    },
    getCards() {
      return this.hand.cards;
    },
    getHandBet() {
      return this.hand.playerBet;
    },
    getHandScore() {
      return this.hand.playerScore > 0 ? `+${this.hand.playerScore}€` : 0;
    }
  }
};
</script>
