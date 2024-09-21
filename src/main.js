import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App)

app.use(router)
app.use(
    createAuth0({
      domain: "dev-lqh3flx0bof01tko.us.auth0.com",
      clientId: "4dsNk5NNx8hoNzgu9RBInJc5nRF3pZTk",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );

app.mount('#app')
