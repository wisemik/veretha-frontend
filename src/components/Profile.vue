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
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password*
            </label>
            <p id="password" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              ••••••••
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
        </div>
        
        <div class="mt-8 text-center">
          <p class="text-lg font-semibold text-gray-700 mb-4">
            Verify you are a real human to start earning bounties and boost your CV
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
  import { ref } from 'vue'
  
  const profile = ref({
    email: 'user@example.com',
    password: '********',
    full_name: 'John Doe',
    occupation: 'Software Developer',
    company: 'Tech Corp',
    skills: 'JavaScript, Vue.js, Python',
    country: 'United States',
    city: 'San Francisco',
    linkedin_url: 'https://www.linkedin.com/in/johndoe'
  })
  
  const handleVerify = () => {
    console.log('Verification requested')
    // Here you would typically initiate the verification process
  }
  </script>