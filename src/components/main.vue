<template>
  <div>
    <headerNav :player="player" :navInfo="navInfo" />
    <section class="container">
      <profileCard />
      <!-- <blackjack :player="player" /> -->
      <!-- <masterMind :player="player" /> -->
      <schooling />
    </section>
    <cookie />
    <loginModal :navInfo="navInfo" :player="player" v-if="navInfo.showModalLogin" />
  </div>
</template>

<script>
import cookie from "../components/cookie.vue";
import headerNav from "../components/header-nav.vue";
import loginModal from "../components/modal/login-modal.vue";
import blackjack from "../components/games/blackjack/bj-table.vue";
import masterMind from "../components/games/mastermind/master-table.vue";
import schooling from "../components/schooling/mainSchooling.vue";
import profileCard from "./card/profile.vue";
import { Player } from "./../assets/js/player";

export default {
  name: "MainApp",
  components: {
    headerNav,
    profileCard,
    loginModal,
    masterMind,
    blackjack,
    schooling,
    cookie,
  },
  data() {
    return {
      player: {},
      navInfo: {
        showModalLogin: false,
      },
    };
  },
  created() {
    this.generatePlayer();
  },
  methods: {
    generatePlayer() {
      this.player = new Player(1000);
    },
  }
};
</script>
