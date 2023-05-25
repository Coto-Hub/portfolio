import { createApp } from 'vue';
import {createRouter, createMemoryHistory} from 'vue-router';
import VueApexCharts from "vue3-apexcharts";
import './../public/style/output.css';
import App from './App.vue';
import $ from 'jquery';
import mainPage from './components/page/main.vue'
import skillsPage from './components/page/skills.vue';
import gamesPage from './components/page/games.vue';
const cardSize = 48;

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {path: '/', name: 'Home', component: mainPage, props: true},
        {path: '/skills', name: 'Skills', component: skillsPage, props: true},
        {path: '/games', name: 'Games', component: gamesPage, props: true}
    ]
});

createApp(App).use(router).use(VueApexCharts).mount('#app');

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

var handObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var newNodes = mutation.addedNodes;
        if(newNodes !== null && newNodes.length) {
            let $this = $(newNodes[0]);

            if ($this.hasClass('playing-card')) {
                $this = $this.closest('.player-hand');
                const $cards = $this.find('.playing-card');

                if ($cards.length <= $this.innerWidth()/cardSize) {
                    return;
                }
                $cards.each((index, el) => {
                    $(el).css({
                        position: 'absolute',
                        top: 0,
                        left: ($this.innerWidth()-$(el).outerWidth())/($cards.length - 1)*index
                    });
                });
            }
       }
    });    
 });
 var config = { 
     attributes: true, 
     childList: true, 
     characterData: true,
     subtree: true
 };

 if ($('.bj-table').length) {
    handObserver.observe($('.bj-table')[0], config);
 }