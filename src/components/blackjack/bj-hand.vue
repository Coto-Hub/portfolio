<template>
  <div
    class="player-hand"
    :class="!hand.isBot ? 'player' : hand.isMain ? 'dealer' : ''"
  >
    <div class="hand-count">
      {{ getCardCount }}
    </div>
    <playingCard v-for="(c, i) in getCards" :key="i" :card="c" />
    <div class="player-status" :class="hand.isActive ? 'active' : ''">
      <div class="bj-token">
        <div class="bj-btn" />
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
  },
};
</script>
