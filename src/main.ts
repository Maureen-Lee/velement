import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import testPlugin from './test.plugin'


/* import specific icons */
import { fas} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)
const app = createApp(App)
app.use(testPlugin).use(router).mount('#app')
