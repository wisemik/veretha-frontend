<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-6 font-roboto-mono">
    <div class="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
      <div class="p-8">
        <div class="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
          <img 
            src="@/assets/veretha-logo.png" 
            alt="Veretha Logo - A vibrant, flame-like V shape with gradient colors" 
            class="w-full h-full object-contain"
          />
        </div>
        <h1 class="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Veretha
        </h1>
        <p class="text-gray-600 text-center mb-4">
          Tune your CV for your dream job.
        </p>
        <p class="text-lg font-semibold text-black-600 text-left mb-8 px-4">
          Don't send thousands of resumes - make your resume perfect, verified and get the job of your dream in one shot!
        </p>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="linkedin" class="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              v-model="linkedinUrl"
              id="linkedin"
              type="url"
              required
              placeholder="https://www.linkedin.com/in/yourprofile"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
              :class="{ 'border-red-500': errors.linkedin }"
            />
            <p v-if="errors.linkedin" class="mt-1 text-sm text-red-500">{{ errors.linkedin }}</p>
          </div>
          
          <div>
            <label for="vacancy-pdf" class="block text-sm font-medium text-gray-700 mb-1">
              Job Vacancy PDF
            </label>
            <div class="relative">
              <input
                ref="fileInput"
                type="file"
                id="vacancy-pdf"
                accept=".pdf"
                required
                class="hidden"
                @change="handleFileChange"
              />
              <button
                type="button"
                @click="$refs.fileInput.click()"
                class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
              >
                {{ fileName || 'Choose PDF file' }}
              </button>
            </div>
            <p v-if="errors.file" class="mt-1 text-sm text-red-500">{{ errors.file }}</p>
          </div>
          
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
          >
            Make the Best CV for Your Job
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const linkedinUrl = ref('')
const fileName = ref('')
const errors = reactive({
  linkedin: '',
  file: ''
})

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
    errors.file = ''
  } else {
    fileName.value = ''
    errors.file = 'Please select a PDF file'
  }
}

const handleSubmit = () => {
  errors.linkedin = ''
  errors.file = ''

  if (!linkedinUrl.value) {
    errors.linkedin = 'Please enter your LinkedIn profile URL'
  } else if (!linkedinUrl.value.startsWith('https://www.linkedin.com/')) {
    errors.linkedin = 'Please enter a valid LinkedIn URL'
  }

  if (!fileName.value) {
    errors.file = 'Please select a PDF file'
  }

  if (!errors.linkedin && !errors.file) {
    console.log('Form submitted:', { linkedinUrl: linkedinUrl.value, fileName: fileName.value })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');

/* Apply Roboto Mono font to the entire app */
#app {
  font-family: 'Roboto Mono', monospace;
}

/* Ensure Tailwind styles are applied */
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>