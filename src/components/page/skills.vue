<template>
  <div class="skills-container">
    <h1 class="part-title">Compétences</h1>
    <fieldset class="information-container">
      <legend class="information-title">Information</legend>
      <p>Pour savoir dans quels cadres j'ai pu obtenir une compétence, vous pouvez <span class="hidden md:inline">placer votre curseur</span><span class="md:hidden">taper</span> sur celle-ci.</p>
      <h3>Barème:</h3>
      <ul>
        <li><starsContainer :rate="1"/>J'ai commencé à comprendre et à utiliser.</li>
        <li><starsContainer :rate="2"/>J'ai encore un peu de mal à appréhender certaines notions.</li>
        <li><starsContainer :rate="3"/>J'ai compris les notions les plus importantes et j'arrive à trouver les informations qu'il me manque, simplement.</li>
      </ul>
    </fieldset>
    <skillsGroup v-for="g in skills" :group="g" />
  </div>
</template>

<script>
import skillsData from '../../assets/json/skills.json';
import skillsGroup from '../skills/group.vue';
import starsContainer from "../skills/stars.vue";

export default {
  name: "SkillsPage",
  components: {
    skillsGroup,
    starsContainer
  },
  props: {
  },
  data() {
    return {
      skills: skillsData,
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
