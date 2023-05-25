<template>
    <div class="skill-container" :class="isActive ? 'active' : ''" @auxclick="toggleIsActive" @mouseenter="toggleIsActive()" @mouseleave="toggleIsActive()">
        <img :alt="'Logo ' + skill.subtitle" :src="skill.img" width="50" height="50" draggable="false" loading="lazy" />
        <h3 class="skill-subtitle">{{ skill.subtitle }}</h3>
        <starsContainer :rate="skill.rate" />
        <div v-if="isActive" class="skill-tooltip" v-html="tooltipContent"></div>
    </div>
</template>

<script>
import starsContainer from "../skills/stars.vue";

export default {
    name: 'skillCard',
    components: {
        starsContainer,
    },
    props: {
        skill: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            isActive: false,
        }
    },
    computed: {
        tooltipContent() {
            var listItems = [
                this.skill.projects.personal ? "Personnel" : '',
                this.skill.projects.company ? "D'entreprise" : '',
                this.skill.projects.school ? "Scolaire" : '',
            ].filter(Boolean);

            if (listItems.length === 1) {
                var lowerCase = listItems[0].toLowerCase();
                return `<p class="text-center">Projet ${lowerCase}</p>`;
            }
            
            return `<p>Projets :</p><ul><li>${listItems.join('</li><li>')}</li></ul>`;
        }
    },
    methods: {
        toggleIsActive() {
            this.isActive = !this.isActive;
        }
    }
  }
  </script>
    