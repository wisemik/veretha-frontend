<template>
  <div class="profile min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6 font-roboto-mono">
    <div class="w-full max-w-md">
      <component :is="currentComponent" 
                 @switch-to-register="switchToRegister" 
                 @switch-to-login="switchToLogin" 
                 :linkedinData="linkedinData"  
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'  // Add onMounted import
import { useRoute } from 'vue-router'  // Ensure vue-router is installed and imported
import { defineProps } from 'vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
  



const currentComponent = ref(Login)
const route = useRoute()  // Initialize route

const props = defineProps({
    linkedinData: {
      type: String,
      required: false
    }
  })

onMounted(() => {
  if (route.query.action) {
    console.log('Received route query action:', route.query.action)
  }
  if (route.query.linkedin_data) {
    console.log('Received linkedin_data:', route.query.linkedin_data)
  }
  if (route.query.action === 'register') {
    switchToRegister()
  }
})

const switchToRegister = () => {
  currentComponent.value = Register
}

const switchToLogin = () => {
  currentComponent.value = Login
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');

.font-roboto-mono {
  font-family: 'Roboto Mono', monospace;
}
</style>