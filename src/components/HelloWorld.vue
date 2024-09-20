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
const jobDescription = ref('') // To store the extracted text from the file
const linkedinData = ref('') // To store the extracted data from LinkedIn
const file = ref(null) // To store the file object
const errors = reactive({
  linkedin: '',
  file: ''
})

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    fileName.value = selectedFile.name
    file.value = selectedFile // Assign the file object to ref
    errors.file = ''
  } else {
    fileName.value = ''
    file.value = null
    errors.file = 'Please select a PDF file'
  }
}

const handleSubmit = async () => {
  errors.linkedin = ''
  errors.file = ''

  if (!linkedinUrl.value) {
    errors.linkedin = 'Please enter your LinkedIn profile URL'
  } else if (!linkedinUrl.value.startsWith('https://www.linkedin.com/')) {
    errors.linkedin = 'Please enter a valid LinkedIn URL'
  }

  if (!fileName.value || !file.value) {
    errors.file = 'Please select a PDF file'
  }

  if (!errors.linkedin && !errors.file) {
    try {
      // Create a FormData object to send the file in a POST request
      const formData = new FormData()
      formData.append('file', file.value)

      // Send POST request to the extract-text endpoint for the file using fetch
      const fileResponse = await fetch('https://llamarally.xyz/extract-text', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!fileResponse.ok) {
        throw new Error('Failed to extract text from the file.')
      }

      const fileData = await fileResponse.json()
      jobDescription.value = fileData.extracted_text
      console.log('Extracted Text from PDF:', jobDescription.value)

      // Send POST request to extract-linkedin endpoint with LinkedIn URL using fetch
      const linkedinResponse = await fetch('https://llamarally.xyz/extract-linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: linkedinUrl.value })
      })

      if (!linkedinResponse.ok) {
        throw new Error('Failed to extract data from LinkedIn URL.')
      }

      const linkedinDataResponse = await linkedinResponse.json()
      linkedinData.value = linkedinDataResponse
      console.log('Extracted Data from LinkedIn:', linkedinData.value)

    } catch (error) {
      console.error('Error during submission:', error)
      if (error.message.includes('LinkedIn')) {
        errors.linkedin = 'Failed to extract data from LinkedIn URL.'
      } else {
        errors.file = 'Failed to extract text from the file. Please try again.'
      }
    }
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