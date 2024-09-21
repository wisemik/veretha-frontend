<template>
  <div class="profile min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6 font-roboto-mono">
    <div class="w-full max-w-md">
      <component :is="currentComponent" @switch-to-register="switchToRegister" @switch-to-login="switchToLogin" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

const currentComponent = ref(Login)

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