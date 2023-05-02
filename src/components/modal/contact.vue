<template>
    <div class="modal-screen">
        <div class="modal-container modal-contact">
            <span class="modal-close" @click="closeModal"></span>
            <h1 class="modal-title">Contact</h1>
            <form class="part-form" @submit.prevent="sendEmail">
                <p class="form-msg">{{ form.result }}</p>
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
        </div>
    </div>
</template>
<script>
    
  export default {
      name: 'contactModal',
      props: {
        navInfo: {
          type: Object,
          required: true,
        },
      },
      data: function () {
        return {
            form: {
                msg: "",
                email: "",
                result: "",
                checkbox: false,
            },
        }
      },
      computed: {
        canSubmit() {
            return this.form.email !== "" && this.form.msg !== "" && this.form.checkbox !== false;
        }
      },
      methods: {
        closeModal() {
          this.navInfo.showContactModal = false;
        },
        // sendEmail() {
        //     emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this.$refs.form, 'YOUR_PUBLIC_KEY')
        //     .then((result) => {
        //         console.log('SUCCESS!', result.text);
        //     }, (error) => {
        //         console.log('FAILED...', error.text);
        //     });
        // }
      }
  }
  </script>
    