<template>
  <div>
    <headerNav :player="player" :navInfo="navInfo" />
    <section class="container">
      <profileCard />
      <!-- <blackjack :player="player" /> -->
      <!-- <masterMind :player="player" /> -->
      <offers :navInfo="navInfo" />
      <career />
      <schooling />
    </section>
    <cookie />
    <loginModal :navInfo="navInfo" :player="player" v-if="navInfo.showLoginModal" />
    <contactModal :navInfo="navInfo" v-if="navInfo.showContactModal" />
  </div>
</template>

<script>
import offers from "../components/offers.vue";
import cookie from "../components/cookie.vue";
import headerNav from "../components/header-nav.vue";
import loginModal from "../components/modal/login.vue";
import contactModal from "../components/modal/contact.vue";
import blackjack from "../components/games/blackjack/bj-table.vue";
import masterMind from "../components/games/mastermind/master-table.vue";
import schooling from "../components/schooling/mainSchooling.vue";
import career from "../components/career/mainCareer.vue";
import profileCard from "./card/profile.vue";
import { Player } from "./../assets/js/player";

export default {
  name: "MainApp",
  components: {
    headerNav,
    profileCard,
    loginModal,
    contactModal,
    masterMind,
    blackjack,
    schooling,
    career,
    offers,
    cookie,
  },
  data() {
    return {
      player: {},
      navInfo: {
        showLoginModal: false,
        showContactModal: false,
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
