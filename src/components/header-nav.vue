<template>
  <header class="header">
    <div class="header-container">
      <div class="header-banner">
        <div class="header-logo">
          <img :src="profile">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import profile from "./../assets/profile.webp"

export default {
  name: 'HeaderNav',
  props: {
  },
  data: function () {
    return {
      profile: profile,
    }
  }
}
</script>
