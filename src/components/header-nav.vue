<template>
  <header class="header">
    <div class="header-container">
      <div class="header-banner">
        <div class="header-logo">
          <img :src="profile" alt="profile">
        </div>
        <div class="header-nav">
          <span class="player-login" @click="nav('player-login')">{{ getBtnLabelLogin }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import profile from "./../assets/image/profile.webp"

export default {
  name: 'HeaderNav',
  props: {
    navInfo: {
      type: Object,
      required: true,
    },
    player: {
      type: Object,
      required: true,
    }
  },
  data: function () {
    return {
      profile: profile,
    }
  },
  methods: {
    nav(value) {
      switch (value) {
        case 'player-login':
          this.navInfo.showModalLogin = true;
          break;
      }
    }
  },
  computed: {
    getBtnLabelLogin() {
      return (this.player.username && this.player.highScore > 0) ? this.player.username : 'Commencer';
    }
  }
}
</script>
