<template>
  <div class="modal-screen">
    <div class="modal-container modal-contact">
      <span class="modal-close" @click="closeModal"></span>
      <h1 class="modal-title">Contact</h1>
        
      <form class="part-form" @submit.prevent="sendEmail">
        <p :class="form.success ? 'text-result-success' : 'text-result-error'" class="form-msg">{{ form.result }}</p>
        
        <div class="form-fields">
          <label for="email">Email</label>
          <input v-model="form.email" class="email" type="email" id="email" name="email" required>
        </div>
        <div class="form-fields">
          <label for="message">Message</label>
          <textarea v-model="form.msg" id="message" name="message" required></textarea>
        </div>
        <div class="form-checkbox">
          <input  v-model="form.checkbox" id="link-checkbox" type="checkbox" value="" class="checkbox">
          <label for="link-checkbox" class="link-checkbox">J'ai lu et j'accepte les <a href="./cgu.pdf" target="_blank">conditions générales d'utilisation</a>.</label>
        </div>
        
        <button type="submit" class="btn-primary" :class="!canSubmit ? 'disabled' : ''">Envoyer</button>
      </form>
      
      <div v-if="form.wait" class="modal-wait">
        <waitSvg />
      </div>
    </div>
  </div>
</template>
<script>
import emailjs from 'emailjs-com';
import waitSvg from "../svg/wait.vue";

export default {
  name: 'contactModal',
  props: {
    navInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        msg: "",
        email: "",
        result: "",
        checkbox: false,
        success: false,
        wait: false
      },
    }
  },
  computed: {
    canSubmit() {
      return this.form.email !== "" && this.form.msg !== "" && this.form.checkbox && !this.form.wait;
    }
  },
  methods: {
    closeModal() {
      this.navInfo.showContactModal = false;
    },
    sendEmail(e) {
      this.form.wait = true;
      this.form.checkbox = false;
      emailjs.sendForm('service_k95s9li', 'template_qog7vfo', e.target, 'slMcOPpqC_8RvQZhN', {
        email: this.form.email,
        message: this.form.msg
      }).then((result) => {
        this.form.email = "";
        this.form.msg = "";
        this.form.result = "Le mail a bien été envoyé !";
        this.form.success = true;
        this.form.wait = false;
      }, (error) => {
        this.form.result = "Il y a eu un problème, veuillez réessayer ultérieurement";
        this.form.success = false;
        this.form.wait = false;
        console.log('FAILED...', error.text);
      });
    }
  }
};
</script>
    