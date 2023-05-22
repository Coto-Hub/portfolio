<template>
  <div class="games-container">
    <h2 class="part-title">Divertissement</h2>
    <account :player="player" :statistics="statistics" />
    <blackjack :player="player" :statistics="statistics"/>
    <!-- <masterMind :player="player" :statistics="statistics"/> -->
  </div>
</template>

<script>
import blackjack from "../components/games/blackjack/bj-table.vue";
import masterMind from "../components/games/mastermind/master-table.vue";
import account from "../components/games/account.vue";

export default {
  name: "GamesPage",
  components: {
    masterMind,
    blackjack,
    account,
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
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
