import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import Vuex from 'vuex'



import * as RongIMLib from '@rongcloud/imlib-next'

RongIMLib.init({
    appkey: 'cpj2xarlct4kn'
});

// 添加事件监听
const Events = RongIMLib.Events

RongIMLib.addEventListener(Events.CONNECTING, () => {
    console.log('正在链接服务器')
})

RongIMLib.addEventListener(Events.CONNECTED, () => {
    console.log('已经链接到服务器')
})

RongIMLib.addEventListener(Events.MESSAGES, (evt) => {
    console.log(evt.messages)
})

const app = createApp(App)

Vue.use(Vuex)
app.use(router)
app.use(ElementPlus)
app.mount('#app')