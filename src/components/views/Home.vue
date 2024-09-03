<script setup>
import { ref, onMounted } from 'vue'
import { initHapticFeedback } from '@telegram-apps/sdk';
import ToshiIcon from '/public/ToshiIcon.png';
import SatoshiAvatar from '/public/SatoshiAvatar.png';
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

const handleClick = (event) => {
  hapticFeedback.impactOccurred('heavy');
  store.incrementAmount();

  // Incrementa la chiave per forzare il re-render dell'immagine
  bounceKey.value += 1;
};

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
});

</script>

<template>

  <div class="app-container">
    <div class="header">
      <div class="menu-container">
        <ProfileMenu />
      </div>
      <!-- Contenitore per l'avatar e l'username -->
      <div class="user-info">
        <img :src="SatoshiAvatar" alt="Satoshi" class="satoshi-pic" />
        <span class="username" @click="showUsernameInstructions">{{ username }}</span> <!-- Clicca su "USER" per vedere le istruzioni -->
      </div>
    </div>

    <div class="text-center flex flex-col h-full pt-1">
      <div class="font-mono text-4xl sm:text-6xl pt-1 text-blue-400">
        {{ store.currentAmount }}
        <div>
          <small class="text-md font-bold font- text-orange-500 font-mono">{{ jettonSymbol }}</small>
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-center content-center">
        <div class="flex justify-center">
          <div class="cursor-pointer" @click="handleClick">
            <img :src="ToshiIcon" :key="bounceKey" class="toshi-coin-image animate-bounce" alt="toshi-coin" />        
          </div>
        </div>
      </div>

      <div class="text-center text-3xl uppercase p-5">
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
      </div>
      <div class="flex flex-col mt-5 text-black">
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

    <!-- Modale per mostrare le istruzioni -->
    <Modal :isOpen="showInstructionsModal" @close="showInstructionsModal = false" :confirmButtonEnabled="false"
      :cancelButtonText="'Close'" :title="'Come impostare il tuo username Telegram'">
      <p>
        Segui questi semplici passaggi:<br><br>
      </p>
      <ol class="instruction-list">
        <li>Apri l'app di Telegram.</li>
        <li>Vai sul menu "impostazioni".</li>
        <li>Clicca su "Username" e imposta l'username che preferisci.</li>
        <li>Salva.</li>
      </ol>
      <p>
        Apri nuovamente l'app per visualizzare il tuo username.
      </p>
    </Modal>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh; /* Assicura che l'altezza copra l'intero schermo */
  background-color: #eceff1; /* Cambia qui il colore di sfondo */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-top: 20px;
  align-items: center;
  border: 5px solid #229ED9; /* Cornice verde */
  border-radius: 15px; /* Angoli arrotondati per la cornice */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Aggiunge un'ombra per evidenziare la cornice */
}

@keyframes custom-bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-50px); /* Altezza del rimbalzo */
  }
  60% {
    transform: translateY(-25px); /* Altezza intermedia del rimbalzo */
  }
}

.animate-bounce {
  animation: custom-bounce 0.5s ease-out; /* Rimbalzo più rapido per maggiore reattività */
}

.header {
  display: flex;
  justify-content: space-between; /* Centra il contenitore .user-info orizzontalmente */
  align-items: center; /* Centra verticalmente .user-info */
  box-sizing: border-box; /* Assicura che il padding sia incluso nella larghezza */
}

.menu-container {
  display: flex; /* Allinea l'avatar e l'username orizzontalmente */
  align-items: center; /* Allinea verticalmente l'avatar e l'username */
  padding: 10px;
  background-color: #229ED9;
  border-radius: 15px; /* Arrotonda gli angoli con un raggio di 15px */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Aggiunge un'ombra leggera per evidenziare l'effetto */
  transform: translateX(+420%);
}

.user-info {
  display: flex; /* Allinea l'avatar e l'username orizzontalmente */
  align-items: center; /* Allinea verticalmente l'avatar e l'username */
  padding: 10px;
  background-color: #229ED9;
  border-radius: 15px; /* Arrotonda gli angoli con un raggio di 15px */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Aggiunge un'ombra leggera per evidenziare l'effetto */
  transform: translateX(-149%);
  margin-left: 20px;
}

.satoshi-pic {
  width: 40px; /* Dimensione dell'avatar */
  height: 40px; /* Mantiene l'avatar come quadrato */
  border-radius: 50%; /* Rende l'immagine circolare */
  margin-right: 2px; /* Spazio tra l'avatar e l'username */
}

.username {
  font-size: 0.8rem; /* Dimensione del font per l'username */
  color: #f4f4f4; /* Colore bianco per rendere il testo visibile su sfondo scuro */
}

.toshi-coin-image {
  max-width: 100%;
  height: auto;
}

.instruction-list {
  padding-left: 20px;
}

.instruction-list li {
  margin-bottom: 10px;
}
</style>
