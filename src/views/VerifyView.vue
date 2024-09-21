<template>
    <div class="verify min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6 font-roboto-mono">
      <Profile />
    </div>
  </template>
  
  <script setup>
  import Profile from '@/components/Verify.vue'
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');
  
  .font-roboto-mono {
    font-family: 'Roboto Mono', monospace;
  }
  </style>