<template>
  <div class="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
    <div class="p-8">
      <h1 class="text-3xl font-bold text-center mb-6">
        {{ isFriendProfile ? 'Friend\'s Profile' : 'Your Profile' }}
      </h1>
      
      <div class="space-y-4">
        <div v-if="!isFriendProfile">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email*
          </label>
          <p id="email" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.email }}
          </p>
        </div>        
        <div v-if="!isFriendProfile">
          <label for="full_name" class="block text-sm font-medium text-gray-700 mb-1">
            Full Name*
          </label>
          <p id="full_name" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.full_name }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="occupation" class="block text-sm font-medium text-gray-700 mb-1">
            Occupation
          </label>
          <p id="occupation" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.occupation || 'Not specified' }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="company" class="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <p id="company" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.company || 'Not specified' }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="skills" class="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <p id="skills" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.skills || 'Not specified' }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="country" class="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <p id="country" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.country || 'Not specified' }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="city" class="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <p id="city" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.city || 'Not specified' }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="linkedin_url" class="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile URL
          </label>
          <p id="linkedin_url" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.linkedin_url || 'Not specified' }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="verification_status" class="block text-sm font-medium text-gray-700 mb-1">
            Verification Status
          </label>
          <p id="verification_status" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.verified }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="wallet_id" class="block text-sm font-medium text-gray-700 mb-1">
            Wallet ID
          </label>
          <p id="wallet_id" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.wallet_id }}
          </p>
        </div>
        
        <div v-if="!isFriendProfile">
          <label for="wallet_address" class="block text-sm font-medium text-gray-700 mb-1">
            Wallet Address
          </label>
          <p id="wallet_address" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ profile.wallet_address }}
          </p>
        </div>
        
        <div v-if="isFriendProfile">
          <label for="friend_email" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Email*
          </label>
          <p id="friend_email" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.email }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_full_name" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Full Name*
          </label>
          <p id="friend_full_name" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.full_name }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_occupation" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Occupation
          </label>
          <p id="friend_occupation" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.occupation || 'Not specified' }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_company" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Company
          </label>
          <p id="friend_company" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.company || 'Not specified' }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_skills" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Skills
          </label>
          <p id="friend_skills" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.skills || 'Not specified' }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_country" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Country
          </label>
          <p id="friend_country" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.country || 'Not specified' }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_city" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's City
          </label>
          <p id="friend_city" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.city || 'Not specified' }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_linkedin_url" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's LinkedIn Profile URL
          </label>
          <p id="friend_linkedin_url" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.linkedin_url || 'Not specified' }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_verification_status" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Verification Status
          </label>
          <p id="friend_verification_status" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.verified }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_wallet_id" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Wallet ID
          </label>
          <p id="friend_wallet_id" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.wallet_id }}
          </p>
        </div>
        <div v-if="isFriendProfile">
          <label for="friend_wallet_address" class="block text-sm font-medium text-gray-700 mb-1">
            Friend's Wallet Address
          </label>
          <p id="friend_wallet_address" class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
            {{ friendProfile.wallet_address }}
          </p>
        </div>
      </div>
      
      <div class="mt-8 text-center" v-if="!profile.verified">
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
      
      <div class="mt-8 text-center" v-if="profile.verified">
        <input
          v-model="friendEmail"
          type="email"
          placeholder="Enter friend's email"
          class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          @click="handleVerifyFriend"
          class="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
        >
          Verify Friend
        </button>
      </div>

      <div class="mt-8 text-center" v-if="isFriendProfile">
        <button
          @click="handleBackToMyProfile"
          class="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
        >
          Back to My Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const onSuccess = async (result) => {
  // Handle success
  console.log('Verification successful', result)
  console.log('Preparing to send verification data to the server...');
  
  const payload = {
    nullifier_hash: result.nullifier_hash,
    merkle_root: result.merkle_root,
    proof: result.proof,
    verification_level: result.verification_level,
    action: 'verify-veretha-128', // Adjust this if needed
  };
  console.log('Payload:', payload);

  try {
    console.log('Sending POST request to http://localhost:8000/verify');
    const response = await fetch('http://localhost:8000/verify', {
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
        email: profile.value.email
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
            profile.value.verified = true;
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
      action: 'verify-veretha-128',
      onSuccess: onSuccess,
    })
  } else {
    console.error('IDKit is not loaded')
  }
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
  },
  verified: {
    type: Boolean,
    default: false,
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
  isFriendProfile: {
    type: Boolean,
    required: false,
    default: false
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
  verified: props.verified,
  wallet_id: props.wallet_id || route.query.wallet_id || '0x',
  wallet_address: props.wallet_address || route.query.wallet_address || '0x',
})

const friendProfile = ref({
  email: '',
  full_name: '',
  occupation: '',
  company: '',
  skills: '',
  country: '',
  city: '',
  linkedin_url: '',
  verified: '',
  wallet_id: '',
  wallet_address: ''
})

const friendEmail = ref('')

const fetchFriendProfile = async (email) => {
  try {
    const response = await fetch(`http://localhost:8000/get-profile/${email}`)
    if (response.ok) {
      const data = await response.json()
      friendProfile.value = {
        email: data.email,
        full_name: data.full_name,
        occupation: data.occupation,
        company: data.company,
        skills: data.skills,
        country: data.country,
        city: data.city,
        linkedin_url: data.linkedin_url,
        verified: data.verified,
        wallet_id: data.wallet_id,
        wallet_address: data.wallet_address
      }
    } else {
      console.error('Failed to fetch friend profile')
    }
  } catch (error) {
    console.error('Error fetching friend profile:', error)
  }
}


const handleVerify = () => {
  console.log('Verification requested')
  // Open the IDKit widget using window.IDKit
  if (window.IDKit) {
    window.IDKit.open()
  } else {
    console.error('IDKit is not loaded')
  }
}

const handleVerifyFriend = () => {
  console.log('Friend verification requested')
  fetchFriendProfile(friendEmail.value)
  isFriendProfile.value = true
}

const handleBackToMyProfile = () => {
  isFriendProfile.value = false;
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
