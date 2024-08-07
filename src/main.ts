import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'



/* import specific icons */
import { fas} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)
createApp(App).use(router).mount('#app')
