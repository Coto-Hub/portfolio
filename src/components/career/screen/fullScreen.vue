<template>
    <section v-if="screen.isActive" :class="`screen-${screen.name}`">
      <h1 class="screen-title" v-if="screen.title" v-html="screen.title"></h1>
      <basicScreen v-for="(p, i) in screen.parts" :key="i" :part="p" :modal="modal" />
      <div v-if="screen.logo" class="screen-logo">
        <img :src="`data:${screen.logo.mime};base64,${screen.logo.data}`" alt="Logo"  loading="lazy"/>
      </div>
      <div v-if="modal.isActive" class="screen-modal">
        <h2 class="modal-title" v-html="modal.title"></h2>
        <span class="modal-close" @click="closeModal()"></span>
        <div class="modal-content" v-html="modal.content"></div>
      </div>
    </section>
</template>
<script>
import basicScreen from "./basic.vue";


export default {
  name: 'fullScreen',
  components: {
    basicScreen
  },
  props: {
    screen: {
      type: Object,
      required: true,
    },
  },
  data: function () {
      return {
        modal: {
          isActive: false,
          title: null,
          content: null
        }
      }
  },
  computed: {
  },
  methods: {
    closeModal() {
      this.modal.isActive = false;
    }
  }
}
</script>