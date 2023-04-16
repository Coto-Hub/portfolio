<template>
  <div class="modal-screen">
    <div class="modal-container">
      <span class="modal-close" @click="closeModal"></span>
      <h1 class="modal-title">{{ getTitle }}</h1>
      <div v-if="player.highScore === 0" class="modal-content">
        <label>
          Pseudo :
          <input type="text" v-model="player.username">
        </label>
        <span class="modal-btn"  @click="savePlayer">Lancer la partie</span>
      </div>
      <div v-else-if="!player.reset" class="modal-content">
        <input type="text" v-model="player.username" disabled>
        <p class="modal-score">
          Meilleur Score :
          <span>
            {{ getHighScore }}€
          </span>
        </p>
        <span class="modal-btn reset"  @click="switchReset">Reset la partie</span>
      </div>
      <div v-else class="modal-content">
        <input type="text" v-model="player.username" disabled>
        <div class="modal-btn-container">
          <span class="modal-btn"  @click="switchReset">Annuler</span>
          <span class="modal-btn reset"  @click="resetGame">Reset la partie</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  
export default {
    name: 'loginModal',
    props: {
      navInfo: {
        type: Object,
        required: true,
      },
      player: {
        type: Object,
        required: true,
      }
    },
    data: function () {
      return {
      }
    },
    computed: {
      getHighScore() {
        return this.player.highScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      },
      getTitle() {
        return (this.player.highScore === 0) ? 'Lancer une partie' : (!this.player.reset ? 'Supprimer la partie' : 'Confirmer la suppression');
      }
    },
    methods: {
      switchReset() {
        this.player.reset = !this.player.reset;
      },
      resetGame() {
        this.player.money = 1000;
        this.player.highScore = 0;
        this.player.setCookie();
      },
      savePlayer() {
        this.player.money = 1000;
        this.player.highScore = 1000;
        this.player.setCookie();
        this.closeModal();
      },
      closeModal() {
        this.player.reset = false;
        this.navInfo.showModalLogin = false;
      }
    }
}
</script>
  