<template>
    <VueCookieAcceptDecline
        :debug="false"
        :disableDecline="false"
        :showPostponeButton="false"
        @clicked-accept="cookieClickedAccept"
        @clicked-decline="cookieClickedDecline"
        @clicked-postpone="cookieClickedPostpone"
        @removed-cookie="cookieRemovedCookie"
        @status="cookieStatus"
        elementId="myPanel1"
        position="bottom-left"
        ref="myPanel1"
        transitionName="slideFromBottom"
        type="floating"
    >
    <template #postponeContent>&times;</template>
    
    <template #message>
      Avant d'accepter les cookies, nous souhaitons vous informer que ceux-ci seront utilisés pour sauvegarder votre score si vous souhaitez vous connecter afin de sauvegarder vos données de jeux. &#128517
    </template>
    
    <template #declineContent>Refuser</template>
    
    <template #acceptContent>Accepter !</template>
    
    </VueCookieAcceptDecline>
</template>
<script>
import VueCookieAcceptDecline from 'vue-cookie-accept-decline';
import 'vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css';

export default {
  name: "cookie",
  components: {
    VueCookieAcceptDecline,
  },
};
</script>
