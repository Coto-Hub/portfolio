<template>
  <div>
    <headerNav />
    <section class="container">
      <profileCard />
      <bjTable :player="player" />
    </section>
  </div>
</template>

<script>
import headerNav from "../components/header-nav.vue";
import bjTable from "../components/blackjack/bj-table.vue";
import profileCard from "../components/card/profile-card.vue";
import { Player } from "./../js/player";

export default {
  name: "MainApp",
  components: {
    headerNav,
    profileCard,
    bjTable,
  },
  data() {
    return {
      player: {},
    };
  },
  created() {
    this.generatePlayer();
  },
  methods: {
    generatePlayer() {
      this.player = new Player(100);
    },
  }
};
</script>
