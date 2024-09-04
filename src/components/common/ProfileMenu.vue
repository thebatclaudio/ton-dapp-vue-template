<script setup>
import { ref } from 'vue';
import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/solid';

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="relative inline-block text-left">
    <ClipboardDocumentCheckIcon @click="toggleDropdown" class="w-6 h-6 cursor-pointer text-white-700" />
    <div v-if="isOpen" @click.outside="isOpen = false" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
      <ul>
        <li>
          <router-link to="/profile" class="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-blue-600">Profilo</router-link>
        </li>
        <li>
          <router-link to="/early-nft" class="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-blue-600">Early NFT</router-link>
        </li>
        <li>
          <router-link to="/about-us" class="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-blue-600">Su di noi</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
