<template>
    <div class="part-content">
        <h2 class="part-subtitle" v-if="part.subtitle" v-html="part.subtitle"></h2>
        <img v-if="part.img" class="part-img" :src="`data:${part.img.mime};base64,${part.img.data}`" :alt="part.img.alt"/>
        <div class="part-info">
            <p class="part-text" v-html="part.content"></p>
            <p class="show-more" @click="openModal()">Afficher plus</p>
        </div>
    </div>
</template>
<script>
    
export default {
    name: 'screenBasic',
    props: {
        part: {
            type: Object,
            required: true,
        },
        modal: {
            type: Object,
            required: true,
        },
    },
    data: function () {
        return {
        }
    },
    computed: {
    },
    methods: {
        openModal() {
            this.modal.isActive = true;
            this.modal.title = this.part.subtitle;
            this.modal.content = this.part.content;
        }
    }
}
</script>
    