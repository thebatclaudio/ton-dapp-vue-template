<script setup>
import { computed, ref, onMounted } from 'vue'
import { initHapticFeedback } from '@telegram-apps/sdk';
import Modal from '../modals/Modal.vue';
import Button from '../common/Button.vue';
import { store } from '../../common/store';
import ProfileMenu from '../common/ProfileMenu.vue'; // Importa il componente ProfileMenu


const username = ref('USER');

const jettonSymbol = ref(import.meta.env.VITE_JETTON_SYMBOL);

const hapticFeedback = initHapticFeedback();

const bounceKey = ref(0); // Chiave per forzare il re-render

const modalOpen = ref(false);
const modalTitle = ref('');
const modalDescription = ref('');

const showInstructionsModal = ref(false); // Stato per mostrare/nascondere la modale delle istruzioni

const animateTimeout = ref(null);
const isIconAnimated = ref(true);

const handleClick = (event) => {
  hapticFeedback.impactOccurred('heavy');
  store.incrementAmount();


  isIconAnimated.value = false;

  setTimeout(() => {
    isIconAnimated.value = true;
  }, 10);

  animateTimeout.value = setTimeout(() => {
    isIconAnimated.value = false;

    if (animateTimeout.value) {
      clearTimeout(animateTimeout.value);
    }
  }, 500);
};

const iconAnimate = computed(() => {
  if (isIconAnimated.value) {
    return {
      'animate-bounce': true
    }
  }

  return null;
});

const openModal = () => {
  modalOpen.value = true;
  modalTitle.value = "Grazie";
  modalDescription.value = "Se visualizzi questo testo, il bottone funziona!";
}

const sendTransaction = () => {
  store.telegram.sendTransaction();
}

// Funzione per mostrare il modale con le istruzioni
const showUsernameInstructions = () => {
  showInstructionsModal.value = true;
};

onMounted(() => {
  const telegram = window.Telegram.WebApp;
  store.telegram.initConnectWalletButton('ton-connect-button');


  if (telegram.initDataUnsafe && telegram.initDataUnsafe.user) {
    username.value = telegram.initDataUnsafe.user.username || 'USER';
  }

  animateTimeout.value = setTimeout(() => {
    isIconAnimated.value = false;

    if (animateTimeout.value) {
      clearTimeout(animateTimeout.value);
    }
  }, 500);
});

</script>

<template>

  <div class="border-4 border-sky-400 rounded-xl bg-white p-1 h-full">
    <div class="flex w-full">
      <div class="flex flex-1">
        <div class="flex bg-sky-400 text-white font-black rounded-xl p-2" @click="showUsernameInstructions">
          <div class="flex flex-col justify-center mx-1">
            <span class="text-sm font-mono">{{ username }}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="bg-sky-400 rounded-xl p-2 aspect-square text-white">
          <ProfileMenu />
        </div>
      </div>
    </div>

    <div class="text-center flex flex-col mt-5">
      <div class="font-mono text-4xl sm:text-6xl pt-1 text-blue-400">
        {{ store.currentAmount }}
        <div>
          <small class="text-md font-bold font- text-orange-500 font-mono">{{ jettonSymbol }}</small>
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-center content-center">
        <div class="flex justify-center">
          <div class="cursor-pointer" @click="handleClick">
            <img src="/ToshiIcon.png" class="toshi-coin-image" :class="iconAnimate" alt="toshi-coin" />
          </div>
        </div>
      </div>


      <div class="flex flex-col mt-5 text-black">
        <div class="uppercase text-xs">Daily taps</div>
        <div class="font-mono font-bold">{{ store.user?.daily_taps }}/{{ store.maxDailyTaps }}</div>
      </div>

      <!-- <div class="text-center text-3xl uppercase p-5">
        <button id="ton-connect-button" type="button"></button>
      </div>
      <div class="flex justify-center">
        <Button @click="sendTransaction()">
          Test transazione
        </Button>
      </div>
      <div class="flex justify-center mt-2">
        <Button @click="openModal()">
          Test bottone
        </Button>
      </div> -->
    </div>

    <Modal :isOpen="modalOpen" @close="modalOpen = false" :confirmButtonEnabled="false" :cancelButtonText="'Ok'"
      :title="modalTitle">
      <p class="text-center">
        {{ modalDescription }}
      </p>
    </Modal>

    <!-- Modale per mostrare le istruzioni -->
    <Modal :isOpen="showInstructionsModal" @close="showInstructionsModal = false" :confirmButtonEnabled="false"
      :cancelButtonText="'Close'" :title="'Come impostare il tuo username Telegram'">
      <p>
        Segui questi semplici passaggi:<br><br>
      </p>
      <ol class="list-decimal">
        <li>Apri l'app di Telegram.</li>
        <li>Vai sul menu "impostazioni".</li>
        <li>Clicca su "Username" e imposta l'username che preferisci.</li>
        <li>Salva.</li>
      </ol>
      <p class="mt-3">
        Apri nuovamente l'app per visualizzare il tuo username.
      </p>
    </Modal>
  </div>
</template>

<style scoped>
@keyframes custom-bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
    /* Altezza del rimbalzo */
  }

  60% {
    transform: translateY(-5px);
    /* Altezza intermedia del rimbalzo */
  }
}

.animate-bounce {
  animation: custom-bounce 0.5s ease-out infinite;
  /* Rimbalzo più rapido per maggiore reattività */
}
</style>
