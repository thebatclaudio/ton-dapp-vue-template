<script setup>
import { boolean, string } from '@telegram-apps/sdk';
import { defineEmits, defineProps, reactive } from 'vue';

const props = defineProps({
  'type': {
    type: String,
    default: 'primary'
  },
  'small': {
    type: Boolean,
    default: false,
  },
  'disabled': {
    type: Boolean,
    default: false,
  }
})

const classObject = reactive({
  'text-white bg-blue-800 hover:bg-blue-950' : (props.type === 'primary'),
  'px-5 py-2' : (!props.small),
  'px-4 py-1 text-xs' : (props.small),
})

const emit = defineEmits(['click']);

const click = () => {
  emit('click');
};
</script>

<template>
  <button :class="classObject" class="rounded-md font-mono uppercase disabled:bg-gray-500" @click="click" :disabled="props.disabled">
    <slot></slot>
  </button>
</template>