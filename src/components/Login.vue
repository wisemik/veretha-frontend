<template>
    <div class="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center mb-6">Login to Veretha</h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              v-model="form.email"
              id="email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              v-model="form.password"
              id="password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">Don't have an account?</p>
          <button
            @click="$emit('switch-to-register')"
            class="mt-2 w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300"
          >
            Register
          </button>
        </div>
        
        <div class="mt-6 text-center">
          <!-- <p class="text-sm text-gray-600">Don't have an account?</p> -->
          <button
        @click="goBack"
        class="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300"
        >
        Back to Home
        </button>
        </div>
        
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const form = ref({
    email: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = await response.json();

      console.log('Login form submitted:', userData);

      // Process the additional fields as needed
      console.log('User ID:', userData.id);
      console.log('Email:', userData.email);
      console.log('Full Name:', userData.full_name);
      console.log('Occupation:', userData.occupation);
      console.log('Company:', userData.company);
      console.log('Skills:', userData.skills);
      console.log('Country:', userData.country);
      console.log('City:', userData.city);
      console.log('LinkedIn URL:', userData.linkedin_url);
      console.log('Verified:', userData.verified);


      // After successful login, you might want to redirect to a dashboard or home page
      router.push({
          path: '/profile',
          query: {
            email: userData.email,
            full_name: userData.full_name,
            occupation: userData.occupation,
            company: userData.company,
            skills: userData.skills,
            country: userData.country,
            city: userData.city,
            linkedin_url: userData.linkedin_url,
            verified: userData.verified,
            wallet_id: userData.wallet_id,
            wallet_address: userData.wallet_address
          }
        });
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  }

  const router = useRouter()

  const goBack = () => {
    router.push('/')
  }

  
  defineEmits(['switch-to-register'])
  </script>