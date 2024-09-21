<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6 font-roboto-mono">
      
      <div class="relative w-full max-w-sm h-[70vh]">
        <TransitionGroup name="swipe" tag="div" class="stack">
          <div
            v-for="(employee, index) in employees"
            :key="employee.id"
            class="absolute w-full h-full bg-white rounded-xl shadow-2xl p-6 flex flex-col justify-between"
            :style="{ zIndex: employees.length - index }"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
          >
            <div class="flex flex-col items-center">
              <div class="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-7xl">
                {{ employee.emoji }}
              </div>
              <h2 class="text-2xl font-bold mb-2">{{ employee.name }}</h2>
              <p class="text-gray-600 mb-2">{{ employee.title }}</p>
              <p class="text-sm text-gray-500">Score: {{ employee.score }}</p> <!-- Added score display -->
            </div>
            <div class="text-center mt-4">
              <p class="font-bold mb-2">Top Skills</p>
              <div class="flex flex-wrap justify-center gap-2">
                <span
                  v-for="skill in employee.skills"
                  :key="skill"
                  class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
      
      <div class="mt-8 flex justify-center space-x-4">
        <button
          @click="handleSwipe('dislike')"
          class="bg-white text-red-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-red-100 transition-colors duration-300"
          aria-label="Dislike"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          @click="handleSuperLike"
          class="bg-white text-blue-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-100 transition-colors duration-300"
          aria-label="Super Like"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
        <button
          @click="handleSwipe('like')"
          class="bg-white text-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-100 transition-colors duration-300"
          aria-label="Like"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div ref="confettiContainer" class="fixed inset-0 pointer-events-none"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import confetti from 'canvas-confetti'
  
  const employees = ref([
    { 
      id: 1, 
      name: 'Bob Smith', 
      title: 'UX Designer', 
      score: 75, 
      skills: ['Figma', 'Sketch', 'User Research'],
      emoji: '🙈'
    },
    { 
      id: 2, 
      name: 'Charlie Brown', 
      title: 'Data Scientist', 
      score: 80, 
      skills: ['Python', 'Machine Learning', 'SQL'],
      emoji: '🙉'
    },
    { 
      id: 3, 
      name: 'Alice Johnson', 
      title: 'Full Stack Developer', 
      score: 95, 
      skills: ['Python', 'Vue.js', 'Solidity'],
      emoji: '🐵'
    },
    { 
      id: 4, 
      name: 'Diana Prince', 
      title: 'DevOps Engineer', 
      score: 80, 
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      emoji: '🐒'
    },
    { 
      id: 5, 
      name: 'Ethan Hunt', 
      title: 'Mobile Developer', 
      score: 75, 
      skills: ['React Native', 'iOS', 'Android'],
      emoji: '🦍'
    }
  ])
  
  const touchStartX = ref(0)
  const touchEndX = ref(0)
  const confettiContainer = ref(null)
  
  const touchStart = (e) => {
    touchStartX.value = e.touches[0].clientX
  }
  
  const touchMove = (e) => {
    touchEndX.value = e.touches[0].clientX
  }
  
  const touchEnd = () => {
    const swipeDistance = touchEndX.value - touchStartX.value
    if (swipeDistance > 50) {
      handleSwipe('like')
    } else if (swipeDistance < -50) {
      handleSwipe('dislike')
    }
  }
  
  const handleSwipe = (action) => {
    console.log(`${action} employee:`, employees.value[0])
    employees.value.shift()
  }
  
  const handleSuperLike = async () => {
    launchConfetti()

    console.log('Super like employee:', employees.value[0])
    try {
      const response = await fetch('http://localhost:8000/pay')
      if (response.ok) {
        console.log('Payment successful')
        employees.value.shift()
        launchConfetti()
      } else {
        console.error('Payment failed')
      }
    } catch (error) {
      console.error('Error calling pay method:', error)
    }
  }
  
  const launchConfetti = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
  
    const randomInRange = (min, max) => Math.random() * (max - min) + min
  
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
  
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }
  
      const particleCount = 50 * (timeLeft / duration)
  
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        emojis: ['🎉', '🥳', '🎊', '👏', '🙌'],
        scalar: randomInRange(0.4, 1)
      }))
  
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        emojis: ['🎉', '🥳', '🎊', '👏', '🙌'],
        scalar: randomInRange(0.4, 1)
      }))
    }, 250)
  }
  
  onMounted(() => {
    if (typeof window !== 'undefined' && window.confetti) {
      window.confetti = confetti.create(confettiContainer.value, { resize: true, useWorker: true })
    }
  })
  
  onUnmounted(() => {
    if (typeof window !== 'undefined' && window.confetti) {
      window.confetti.reset()
    }
  })
  </script>
  
  <style scoped>
  .stack {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .swipe-enter-active,
  .swipe-leave-active {
    transition: all 0.5s ease;
  }
  
  .swipe-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }
  
  .swipe-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  </style>