<template>
  <div class="games-container">
    <h1 class="part-title">Divertissement</h1>
    <account :player="player" :statistics="statistics" />
    <h1 class="part-title">Blackjack</h1>
    <blackjack :player="player" :statistics="statistics" :notificationCenter="notificationCenter"/>
    <h1 class="part-title">MasterMind</h1>
    <masterMind :player="player" :statistics="statistics" :notificationCenter="notificationCenter"/>
  </div>
</template>

<script>
import blackjack from "../games/blackjack/bj-table.vue";
import masterMind from "../games/mastermind/master-table.vue";
import account from "../games/account.vue";

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
    },
    notificationCenter: {
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
