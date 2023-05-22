<template>
  <section class="card card-profile">
    <div class="card-img">
      <a
        target="_blank"
        href="https://magicbee.carrd.co/"
        alt="©"
        title="©"
      >
        <img :src="profile" alt="profile" width="120" height="200"/>
      </a>
    </div>
    <div class="card-content">
      <h1 class="card-title">Thomas MARTY</h1>
      <p class="card-text">
        Bienvenue dans mon portfolio ! J'ai {{ getAge }} ans et je suis développeur web fullstack. Récemment, j'ai terminé mon premier contrat à durée déterminée dans ce domaine et j'ai été ravi de pouvoir appliquer mes compétences théoriques pour résoudre des problèmes complexes. Ma passion pour le développement web s'est accentué grâce à l'adrénaline que j'ai ressentie chaque fois que j'ai réussi à surmonter un obstacle technique. 
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
