<template>
    <section class="offers-container">
        <h2 class="part-title">Offre exceptionnelle</h2>
        <div class="card-container">
            <div class="part part-left">
                <h3 class="smal-title">Esprit d’équipe</h3>
                <p>
                    Vous cherchez à renforcer l'esprit d'équipe sur votre lieu de travail ? Nous avons la solution ! Cette offre vous propose un collègue toujours prêt à collaborer et à échanger avec ses pairs. Avec 0 compétence, 0 connaissance et 7 pauses café 007, c'est le parfait compagnon pour détendre l'atmosphère.
                </p>
                <ul class="part-list">
                    <li>Esprit d’équipe</li>
                </ul>
                <button class="btn-disabled">Aucun stock</button>
            </div>
            <div class="part part-middle" :class="contactIsActive ? 'active': ''">
                <h3 class="smal-title">Complète</h3>
                <p>
                    Pourquoi choisir entre compétence et esprit d'équipe lorsque vous pouvez avoir les deux ? Notre offre Complète vous propose un collègue compétent ET avec un bon esprit d'équipe. Il sera toujours prêt à travailler et fera preuve de dévouement dans toutes les tâches qu'il entreprendra. Avec ce collègue, vous bénéficierez de la convivialité et de la bonne humeur de notre offre "Esprit d’équipe", tout en profitant de l'expertise et du sérieux de notre offre "Compétent".
                </p>
                <ul class="part-list">
                    <li>Sociable</li>
                    <li>Compétent</li>
                </ul>
                <button class="btn-primary" @click="toggleContact()">S'abonner <span>-100% !</span></button>
                <div class="part part-active">
                    <h3 class="smal-title">S'abonner</h3>
                    <p class="part-description">Pour recruter ce développeur, vous pouvez le contacter en cliquant sur le bouton ci-dessous. Sachez qu'il est impatient de vous rencontrer et de discuter de vos projets !</p>
                    <div class="part-btn">
                        <button @click="toggleContact()" class="btn-secondary">Annuler</button>
                        <button @click="openContactModal()" class="btn-primary">Contacter</button>
                    </div>
                </div>
            </div>
            <div class="part part-right">
                <h3 class="smal-title">Compétent</h3>
                <p>
                    Vous avez besoin d'un collègue compétent, travailleur et fiable pour mener à bien vos projets ? Notre offre Compétent est là pour vous aider. Nous vous proposons un collaborateur qui excelle dans son domaine et qui sera dévoué à l'entreprise. Cependant, il est important de noter que ce collègue n'est pas très sociable et préfère travailler seul.
                </p>
                <ul class="part-list">
                    <li>Compétent</li>
                </ul>
                <button class="btn-disabled">Aucun stock</button>
            </div>
        </div>
    </section>
</template>
  
<script>
  
export default {
    name: 'offers',
    props: {
        navInfo: {
            type: Object,
            required: true,
        },
    },
    data: function () {
      return {
        contactIsActive: false,
      }
    },
    methods: {
        toggleContact() {
            this.contactIsActive = !this.contactIsActive;
        },
        openContactModal() {
          this.navInfo.showContactModal = true;
        }
    },
    computed: {
    }
}
</script>
  