import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal.js'

import './styles/variables.css'
import './styles/base.css'
import './styles/background.css'
import './styles/animations.css'
import './styles/responsive.css'

createApp(App).directive('reveal', reveal).mount('#app')
