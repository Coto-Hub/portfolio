<template>
  <header class="header">
    <div class="header-container">
      <div class="header-banner">
        <div class="header-logo">
          <img :src="profile" alt="profile" width="40" height="40">
        </div>
        <div class="header-nav">
          <nav class="nav-list">
            <router-link to="/">Profil</router-link>
            <router-link to="/games">Divertissement</router-link>
            <button class="btn-contact" @click="nav('contact')">Contact</button>
          </nav>
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
  },
  data: function () {
    return {
      profile: profile,
    }
  },
  methods: {
    nav(value) {
      switch (value) {
        case 'contact':
          this.navInfo.showContactModal = true;
          break;  
      }
    }
  },
  computed: {}
}
</script>
