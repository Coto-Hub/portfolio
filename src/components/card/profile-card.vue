<template>
  <section class="card card-profile">
    <div class="card-img">
      <a
        target="_blank"
        href="https://www.instagram.com/abeille.ma"
        alt="©"
        title="©"
        ><img :src="profile"
      /></a>
    </div>
    <div class="card-content">
      <h1 class="card-title">Thomas MARTY</h1>
      <p class="card-text">
        J’ai {{ getAge }} ans et je viens de valider ma licence professionnelle
        en alternance, j’apprécie le challenge que représentent les projets
        informatiques compliqués. J’aime travailler en équipe, le développement
        agile est mon crédo.
      </p>
    </div>
  </section>
</template>

<script>
import profile from "./../../assets/profile.webp";

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
