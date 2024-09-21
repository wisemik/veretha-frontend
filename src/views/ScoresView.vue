<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-6 font-roboto-mono">
      <div class="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
        <div class="p-8">
          <h1 class="text-3xl font-bold text-center mb-6">Your CV Score</h1>
          
          <div class="flex items-center justify-center mb-6">
            <div class="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span class="text-2xl font-bold text-white">{{ score }}/100</span>
            </div>
          </div>
          
          <p class="text-lg text-gray-700 mb-6 text-left">{{ description }}</p>
          
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Ways to Improve:</h2>
            <ul class="list-disc list-inside space-y-2">
              <!-- <li v-for="(improvement, index) in improvements" :key="index" class="text-gray-700">
                {{ improvement }}
              </li> -->
              <div v-html="improvements" class="text-gray-700 text-left improvements-list"></div>
            </ul>
          </div>
          
          <div class="bg-gray-100 p-6 rounded-lg mb-6">
            <p class="text-lg font-semibold text-center mb-4">
              Want to improve your score even more?
            </p>
            <p class="text-gray-700 text-center mb-4">
              Register with Veretha to unlock advanced features and personalized recommendations!
            </p>
            <button
              @click="handleRegister"
              class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
            >
              Register Now
            </button>
            <!-- Add the w3m-button component here -->
            <w3m-button class="mt-4 w-full" />
          </div>
          
          <button
            @click="goBack"
            class="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300"
          >
            Back to Home
          </button>
          
          <!-- Add the login button here -->
          <div class="mt-4">
            <button @click="login" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300">
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import { useRouter } from 'vue-router'
  import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
  import { useAuth0 } from '@auth0/auth0-vue' // Import Auth0

  import { mainnet, arbitrum } from 'viem/chains'
  import { reconnect } from '@wagmi/core'

  // 1. Your Reown Cloud project ID
  const projectId = '654cd1175ba09f9925bbe1e9889fccce'

  // 2. Create a metadata object
  const metadata = {
    name: 'veretha',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
  }
  
  // 3. Create wagmiConfig
  const chains = [mainnet, arbitrum]
  const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata
  })

  reconnect(config)

  // 4. Create modal
  const modal = createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true // Optional - false as default
  })
  
  const props = defineProps({
    score: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    improvements: {
      type: String,
      required: true
    }
  })
  
  const router = useRouter()
  
  const handleRegister = () => {
    // Show the modal
    modal.open()
  }
  
  const goBack = () => {
    router.push('/')
  }

  // Auth0 login function
  const { loginWithRedirect } = useAuth0()
  const login = () => {
    loginWithRedirect({
      redirect_uri: `${window.location.origin}/login`
    })
  }
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');
  
  .improvements-list ul {
    list-style-type: disc;
    padding-left: 1.5rem; /* Adjust as needed */
  }

  .improvements-list li::after {
    content: '•';
    position: absolute;
    right: -1.5rem; /* Adjust as needed */
    color: black; /* Adjust color as needed */
  }

  .font-roboto-mono {
    font-family: 'Roboto Mono', monospace;
  }
  </style>