<template>
    <div class="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center mb-6">Register for Veretha</h1>

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
          
          <div>
            <label for="full_name" class="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              v-model="form.full_name"
              id="full_name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <div>
            <label for="occupation" class="block text-sm font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <input
              v-model="form.occupation"
              id="occupation"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <div>
            <label for="company" class="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              v-model="form.company"
              id="company"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <div>
            <label for="skills" class="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma-separated)
            </label>
            <input
              v-model="form.skills"
              id="skills"
              type="text"
              placeholder="e.g. JavaScript, Vue.js, Python"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <div>
            <label for="country" class="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              v-model="form.country"
              id="country"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              v-model="form.city"
              id="city"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <div>
            <label for="linkedin_url" class="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              v-model="form.linkedin_url"
              id="linkedin_url"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
          
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
          >
            Register
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">Already have an account?</p>
          <button
            @click="$emit('switch-to-login')"
            class="mt-2 w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300"
          >
            Login
          </button>

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
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { defineProps } from 'vue'
  import { onMounted } from 'vue'

  const props = defineProps({
    linkedinData: {
      type: String,
      required: false
    }
  })

  const form = ref({
    email: '',
    password: '',
    full_name: '',
    occupation: '',
    company: '',
    skills: '',
    country: '',
    city: '',
    linkedin_url: ''
  })
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
      })

      const data = await response.json()

      if (response.status === 200) {
        console.log('data:', data)
        console.log('User ID:', data.id)
        console.log('Email:', data.email)
        console.log('Full Name:', data.full_name)
        console.log('Occupation:', data.occupation)
        console.log('Company:', data.company)
        console.log('Skills:', data.skills)
        console.log('Country:', data.country)
        console.log('City:', data.city)
        console.log('LinkedIn URL:', data.linkedin_url)
        // Redirect to welcome or login page
        router.push({
          path: '/profile',
          query: {
            email: data.email,
            full_name: data.full_name,
            occupation: data.occupation,
            company: data.company,
            skills: data.skills,
            country: data.country,
            city: data.city,
            linkedin_url: data.linkedin_url,
            verified: data.verified,
            wallet_id: data.wallet_id || '', // Ensure wallet_id exists
            wallet_address: data.wallet_address || '' // Ensure wallet_address exists
          }
        })
      } else {
        console.error('Error:', data.detail || 'An error occurred')
        alert('An error occurred: ' + data.detail || 'An error occurred')

      }
    } catch (error) {
      console.error('An error occurred:', error.message)
    }
  }

  const router = useRouter()

  const goBack = () => {
    router.push('/')
  }

  onMounted(() => {
    if (props.linkedinData) {
      try {
        const parsedData = JSON.parse(props.linkedinData)
        const linkedinData = parsedData.linkedin_data

        form.value.full_name = linkedinData.full_name || ''
        form.value.occupation = linkedinData.occupation || ''
        form.value.country = linkedinData.country_full_name || ''
        form.value.city = linkedinData.city || ''
        form.value.linkedin_url = `https://www.linkedin.com/in/${linkedinData.public_identifier}` || ''
      } catch (error) {
        console.error('Failed to parse LinkedIn data:', error)
      }
    }
  })

  defineEmits(['switch-to-login'])
  </script>