<template>
    <section class="notifications-container" :class="isToTop ? 'top' : ''">
        <notification v-for="(n, i) in getNotifications" :key="i" :notification="n" v-on:remove="deleteNotification(n)"/>
    </section>
</template>

<script>
import notification from "./models/switch.vue";

export default {
    name: "NotificationCenter",
    components: {
        notification,
    },
    props: {
        notificationCenter: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isToTop: true,
        };
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isToTop = window.scrollY < 64;
        },
        deleteNotification(notif) {
            this.notificationCenter.list.splice(this.notificationCenter.list.findIndex((e) => e.id === notif.id), 1);
        }
    },
    computed: {
        getNotifications() {
            return this.notificationCenter.list;
        },
    },
};
</script>
  