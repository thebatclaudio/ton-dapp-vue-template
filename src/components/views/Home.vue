<script setup>
import { ref, computed, onMounted } from 'vue'
import { initHapticFeedback } from '@telegram-apps/sdk';
import { FaceSmileIcon } from '@heroicons/vue/24/solid';
import Modal from '../modals/Modal.vue';
import Button from '../common/Button.vue';
import { store } from '../../common/store';

const jettonSymbol = ref(import.meta.env.VITE_JETTON_SYMBOL);

const hapticFeedback = initHapticFeedback();

const handleClick = (event) => {
  hapticFeedback.impactOccurred('heavy');
  store.incrementAmount();
};

const modalOpen = ref(false);
const modalTitle = ref('');
const modalDescription = ref('');

const openModal = () => {
  modalOpen.value = true;
  modalTitle.value = "Modal title";
  modalDescription.value = "Modal description";
}

const sendTransaction = () => {
  store.telegram.sendTransaction();
}

onMounted(() => {
  store.telegram.initConnectWalletButton('ton-connect-button')
});
</script>

<template>
  <div class="text-center flex flex-col h-full pt-10">
    <div class="font-mono text-4xl sm:text-6xl pt-10">{{ store.currentAmount }}<small class="text-sm">{{ jettonSymbol }}</small>
    </div>
    <div class="flex-1 flex flex-col justify-center content-center">
      <div class="flex justify-center">
        <div class="cursor-pointer" @click="handleClick">
          <FaceSmileIcon class="size-20" />
        </div>
      </div>
    </div>
    <div class="text-center text-3xl uppercase p-5">
      <button id="ton-connect-button" type="button"></button>
    </div>
    <div class="flex justify-center">
      <Button @click="sendTransaction()">
        Send test transaction
      </Button>
    </div>
    <div class="flex justify-center mt-2">
      <Button @click="openModal()">
        Open modal
      </Button>
    </div>
    <div class="flex flex-col mt-5">
      <div class="uppercase text-xs">Daily taps</div>
      <div class="font-mono font-bold">{{ store.user?.daily_taps }}/{{ store.maxDailyTaps }}</div>
    </div>
  </div>

  <Modal :isOpen="modalOpen" @close="modalOpen = false" :confirmButtonEnabled="false"
    :cancelButtonText="'Ok'" :title="modalTitle">
    <p class="text-center">
      {{ modalDescription }}
    </p>
  </Modal>
</template>