<template>
    <div class="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center mb-6">Your Profile</h1>
        
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <p id="email" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.email }}
            </p>
          </div>        
        
          <div>
            <label for="full_name" class="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <p id="full_name" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.full_name }}
            </p>
          </div>
        
          <div>
            <label for="occupation" class="block text-sm font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <p id="occupation" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.occupation || 'Not specified' }}
            </p>
          </div>
        
          <div>
            <label for="company" class="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <p id="company" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.company || 'Not specified' }}
            </p>
          </div>
        
          <div>
            <label for="skills" class="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <p id="skills" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.skills || 'Not specified' }}
            </p>
          </div>
        
          <div>
            <label for="country" class="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <p id="country" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.country || 'Not specified' }}
            </p>
          </div>
        
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <p id="city" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.city || 'Not specified' }}
            </p>
          </div>
        
          <div>
            <label for="linkedin_url" class="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL
            </label>
            <p id="linkedin_url" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.linkedin_url || 'Not specified' }}
            </p>
          </div>
        
          <div>
            <label for="verification_status" class="block text-sm font-medium text-gray-700 mb-1">
              Verification Status
            </label>
            <p id="verification_status" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.verification_status }}
            </p>
          </div>
        
          <!-- <div>
            <label for="wallet_id" class="block text-sm font-medium text-gray-700 mb-1">
              Wallet ID
            </label>
            <p id="wallet_id" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {{ profile.wallet_id  }}
            </p>
          </div> -->
        
          <div>
            <label for="wallet_address" class="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <p id="wallet_address" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm">
              {{ profile.wallet_address }}
            </p>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <p class="text-lg font-semibold text-gray-700 mb-4">
            Verify this profile CV carefully
          </p>
          <button
            @click="handleVerify"
            class="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
          >
            Verify
          </button>
        </div>

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import IDKit from '@worldcoin/idkit-standalone' // Removed this line
     
  
  // Define props
  const props = defineProps({
    email: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      required: true
    },
    occupation: {
      type: String,
      required: false
    },
    company: {
      type: String,
      required: false
    },
    skills: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    linkedin_url: {
      type: String,
      required: false
    },
    wallet_id: {
      type: String,
      required: false
    },
    wallet_address: {
      type: String,
      required: false
    },
    verification_status: {
      type: String,
      required: false
    }
  })
  
  
  const profile = ref({
    email: props.email || route.query.email || 'user@example.com',
    full_name: props.full_name || route.query.full_name || 'John Doe',
    occupation: props.occupation || route.query.occupation || 'Software Developer',
    company: props.company || route.query.company || 'Tech Corp',
    skills: props.skills || route.query.skills || 'JavaScript, Vue.js, Python',
    country: props.country || route.query.country || 'United States',
    city: props.city || route.query.city || 'San Francisco',
    linkedin_url: props.linkedin_url || route.query.linkedin_url || 'https://www.linkedin.com/in/johndoe',
    wallet_id: props.wallet_id || route.query.wallet_id || '1234567890',
    wallet_address: props.wallet_address || route.query.wallet_address || '0x1234567890abcdef',
    verification_status: p
  })
  
  
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
