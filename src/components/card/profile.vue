<template>
  <section class="card card-profile">
    <div class="card-img">
      <a
        target="_blank"
        href="https://magicbee.carrd.co/"
        alt="©"
        title="©"
      >
        <img :src="profile" alt="profile"/>
      </a>
    </div>
    <div class="card-content">
      <h1 class="card-title">Thomas MARTY</h1>
      <p class="card-text">
        J’ai {{ getAge }} ans et je viens de finir mon premier CDD en tant que développeur web fullstack.
        Je suis passionné par le développement en grande partie pour l'adrénaline que me procure la résolution d'un problème compliqué.
      </p>
    </div>
  </section>
</template>

<script>
import profile from "./../../assets/image/profile.webp";

export default {
  name: "ProfileCard",
  props: {},
  data: function () {
    return {
      profile: profile,
    };
  },
  computed: {
    getAge() {
      const dateOfBirth = new Date(2001, 12, 27);
      const dateToday = new Date();
      const dateDiff = dateToday - dateOfBirth;

      return Math.trunc(dateDiff / (365 * 24 * 60 * 60 * 1000));
    },
  },
};
</script>
