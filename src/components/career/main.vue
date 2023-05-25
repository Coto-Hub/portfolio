<template>
  <section class="career-container">
    <h1 class="part-title">Des épisodes inédits !</h1>
    <div class="screen-structure">
      <div class="screen-container">
        <fullScreen v-for="(s, i) in career" :key="i" :screen="s" />
        <div class="screen-footer">
          <span class="previous-btn" :class="elementActive.id === 1 ? 'disabled' : ''" title="Épisode précédent" @click="switchEp(-1)"><i class="icon-arrow"></i></span>
          <span class="progress-bar"><i class="bar" :style="{ width: getWidthBar + '%' }"></i></span>
          <span class="next-btn" :class="elementActive.id === career.length ? 'disabled' : ''" title="Épisode suivant" @click="switchEp(1)"><i class="icon-arrow"></i></span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import careerData from '../../assets/json/career.json';
import fullScreen from "./screen/fullScreen.vue";

export default {
    name: 'mainCareer',
    components: {
      fullScreen
    },
    props: {
    },
    data() {
      return {
        career: careerData,
        elementActive: 0,
      }
    },
    created() {
      this.elementActive = this.getAtiveElement();
    },
    computed: {
      getWidthBar() {
        return this.elementActive.id > 1 ? (1/((this.career.length-1)/(this.elementActive.id -1)) * 100) : 0;
      }
    },
    methods: {
      switchEp(input) {
        if ((this.elementActive.id === 1 && input === -1) || (this.elementActive.id === this.career.length  && input === 1)) {
          return;
        }
        this.elementActive.isActive = false;
        let nextElement = (this.elementActive.id + input)%(this.career.length);
        this.elementActive = this.getElement(nextElement > 0 ? nextElement : this.career.length);
        this.elementActive.isActive = true; 
      },
      getAtiveElement() {
        return this.career.find(element => element.isActive == true);
      },
      getElement(id) {
        return this.career.find(element => element.id == id);
      }
    }
}
</script>
  