<script setup>
import { boolean } from '@telegram-apps/sdk';
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  confirmButtonEnabled: {
    type: Boolean,
    default: true,
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel'
  }
});

const emit = defineEmits(['close', 'confirm']);

const close = () => {
  emit('close');
};

const confirm = () => {
  emit('confirm');
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="p-8 rounded-lg bg-zinc-800 shadow-lg w-[90%]">
      <header class="flex justify-center items-center mb-4">
        <h2 class="text-xl font-semibold font-mono uppercase">{{ title }}</h2>
      </header>
      <div class="mb-10">
        <slot></slot>
      </div>
      <footer class="flex justify-center">
        <button @click="close"
          class="text-white uppercase bg-gray-500 px-5 py-2 rounded-md hover:bg-gray-800 font-mono">{{ cancelButtonText }}</button>
        <button v-if="confirmButtonEnabled" @click="confirm"
          class="text-white uppercase bg-red-800 ml-3 px-5 py-2 rounded-md hover:bg-red-950 font-mono">Confirm</button>
      </footer>
    </div>
  </div>
</template>