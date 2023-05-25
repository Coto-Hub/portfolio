<template>
    <div class="stars-container">
        <starSvg v-for="(s) in generateStarsTable" :star="s" />
    </div>
</template>

<script>
import starSvg from "../svg/star.vue";
  
export default {
    name: 'starsContainer',
    components: {
        starSvg,
    },
    props: {
        rate: {
            type: Number,
            required: true,
        }
    },
    data() {
      return {};
    },
    computed: {
        generateStarsTable() {
            const starsTable = [];
            var numberStars = this.rate;
            for (let index = 1; index <= 3; index++) {
                starsTable.push({
                    index,
                    isActive: numberStars > 0, 
                })
                numberStars--;
            }
            return starsTable;
        },
    },
    methods: {}
  };
  </script>
      