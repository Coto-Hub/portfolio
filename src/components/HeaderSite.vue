<template>
  <header class="header">
    <div class="w-full h-12 bg-black">

    </div>
    <div class="header-container">
      <div class="header-profile group">
        <div class="frame-img rotate-0 group-hover:rotate-360">
          <img :src="profile" class="w-full px-6"/>
        </div>
        <div class="frame-text opacity-0">
          <p class="text-0 leading-0">
            J’ai 20 ans et je viens de valider ma licence professionnelle en alternance, j’apprécie le challenge que représentent les projets informatiques compliqués.
            J’aime travailler en équipe, le développement agile est mon crédo.
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import profile from "@/assets/profile.png"

export default {
  name: 'HeaderSite',
  props: {
  },
  data: function () {
    return {
      profile: profile
    }
  }
}
</script>
