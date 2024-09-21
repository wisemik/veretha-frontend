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
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  // import IDKit from '@worldcoin/idkit-standalone' // Removed this line
  
  const onSuccess = async (result) => {
    // Handle success
    console.log('Verification successful', result)
    console.log('Preparing to send verification data to the server...');
    
    const payload = {
      nullifier_hash: result.nullifier_hash,
      merkle_root: result.merkle_root,
      proof: result.proof,
      verification_level: result.verification_level,
      action: 'verify-veretha-3', // Adjust this if needed
    };
    console.log('Payload:', payload);

    try {
      console.log('Sending POST request to http://127.0.0.1:8000/verify');
      const response = await fetch('http://127.0.0.1:8000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      if (response.ok) {
        console.log('Verified!!!!');
        // Add POST request to set verification status
        const setVerifiedPayload = {
          email: profile.value.email,
          verification_status: 'orb'
        };
        try {
          const setVerifiedResponse = await fetch('http://localhost:8000/set-verified', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(setVerifiedPayload)
          });
          if (setVerifiedResponse.ok) {
            console.log('Verification status set successfully');
          } else {
            console.log('Failed to set verification status');
          }
        } catch (error) {
          console.error('Error setting verification status:', error);
        }
      } else {
        console.log('Not verified');
        const errorData = await response.json();
        console.log('Error data:', errorData);
        alert('Error: ' + JSON.stringify(errorData, null, 2)); // Show alert with detailed error data
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
  }
  
  onMounted(() => {
    // Initialize IDKit using window.IDKit
    if (window.IDKit) {
      window.IDKit.init({
        app_id: 'app_staging_61506d1aaf38bb0667bd9a6d051220d1',
        action: 'verify-veretha-3',
        onSuccess: onSuccess,
      })
    } else {
      console.error('IDKit is not loaded')
    }
    
    // Add GET request to fetch verification status
    const fetchVerificationStatus = async () => {
      console.log('Fetching verification status for:', profile.value.email); // Add log
      try {
        const response = await fetch(`http://localhost:8000/get-verified/${profile.value.email}`);
        console.log('Response status:', response.status); // Add log
        if (response.ok) {
          const data = await response.json();
          console.log('Verification status data:', data); // Add log
          profile.value.verification_status = data.verified;
        } else {
          console.log('Failed to fetch verification status');
        }
      } catch (error) {
        console.error('Error fetching verification status:', error);
      }
    };
    fetchVerificationStatus();
  })
  
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
    }
  })
  
  const route = useRoute()
  
  const profile = ref({
    email: props.email || route.query.email || 'user@example.com',
    full_name: props.full_name || route.query.full_name || 'John Doe',
    occupation: props.occupation || route.query.occupation || 'Software Developer',
    company: props.company || route.query.company || 'Tech Corp',
    skills: props.skills || route.query.skills || 'JavaScript, Vue.js, Python',
    country: props.country || route.query.country || 'United States',
    city: props.city || route.query.city || 'San Francisco',
    linkedin_url: props.linkedin_url || route.query.linkedin_url || 'https://www.linkedin.com/in/johndoe',
    verification_status: 'not' // Add this line
  })
  
  const handleVerify = () => {
    console.log('Verification requested')
    // Open the IDKit widget using window.IDKit
    if (window.IDKit) {
      window.IDKit.open()
    } else {
      console.error('IDKit is not loaded')
    }
  }
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
