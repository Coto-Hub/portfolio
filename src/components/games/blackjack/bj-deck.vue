<template>
  <div class="card-package">
    <playingCard v-for="i in 4" :key="i" :card="cardDefault" />
    <playingCard v-if="getCardReturn" :card="getCardReturn" />
  </div>
</template>

<script>
import playingCard from "./../playing-card.vue";

export default {
  name: "BjDeck",
  components: {
    playingCard,
  },
  props: {
    cardPackage: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      cardDefault: {
        reverse: true,
      },
    };
  },
  computed: {
    getCardReturn() {
      if (this.cardPackage !== undefined) {
        return this.cardPackage.cardReturn;
      }
      return false;
    },
  },
};
</script>
