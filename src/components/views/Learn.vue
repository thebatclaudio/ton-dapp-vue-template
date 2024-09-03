<template>
  <div class="task-container">
    <h2 class="title">Unisciti alla community di Satoshi su Telegram</h2>
    
    <!-- Task 1: Unirsi al Gruppo Telegram -->
    <div class="task-item">
      <img src="/logo1.png" alt="Logo TSC Chat" class="task-icon" />
      <p class="task-text">Join Chat</p>
      <a
        :href="telegramGroupLink"
        class="task-button"
        target="_blank"
        @click="completeTask"
      >
        Start
      </a>
    </div>
    
    <!-- Task 2: Iscriversi al Canale Telegram -->
    <div class="task-item">
      <img src="/logo2.png" alt="Logo TSC Chat" class="task-icon" />
      <p class="task-text">Join News</p>
      <a
        :href="telegramChannelLink"
        class="task-button"
        target="_blank"
        @click="completeTask"
      >
        Start
      </a>
    </div>

    <!-- Task 3: Iscriversi alla pagina su X -->
    <div class="task-item">
      <img src="/logo3.png" alt="Logo TSC Chat" class="task-icon" />
      <p class="task-text">Follow X</p>
      <a
        :href="telegramTwitterLink"
        class="task-button"
        target="_blank"
        @click="completeTask"
      >
        Start
      </a>
    </div>
  </div>
</template>

<script setup>
// Funzione che incrementa il contatore di 50 unità
// const completeTask = () => { store.incrementAmount(50); }; (non funziona l'import di store)

// Collegamenti ai canali e pagine Telegram/X
const telegramGroupLink = 'https://t.me/thesatoshicircle';
const telegramChannelLink = 'https://t.me/thesatoshicirclenews';
const telegramTwitterLink = 'https://x.com/satoshiscircle';
</script>

<style scoped>

.task-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb); /* Sfondo con gradiente grigio chiaro */
  border-radius: 16px; /* Bordi arrotondati maggiori */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* Ombra più morbida e pronunciata */
  text-align: left;
}

.title {
  font-size: 1.75rem; /* Font più grande */
  font-weight: bold;
  color: #111827; /* Colore del testo più scuro */
  margin-bottom: 1.5rem;
  text-align: center; /* Allinea il titolo al centro */
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 12px;
  background-color: white; /* Sfondo bianco per le task */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Leggera ombra per ogni task */
  transition: transform 0.3s ease; /* Transizione per hover */
}

.task-item:hover {
  transform: translateY(-5px); /* Sollevamento al passaggio del mouse */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); /* Ombra più pronunciata al passaggio del mouse */
}

.task-text {
  font-size: 1.125rem;
  color: #374151; /* Colore del testo */
}

.task-button {
  background: linear-gradient(135deg, #229ED9, #229ED9); /* Gradient per i bottoni */
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease; /* Transizione per sfondo e trasformazione */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Aggiunge ombra al bottone */
}

.task-button:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8); /* Colore più scuro al passaggio del mouse */
  transform: translateY(-3px); /* Leggero sollevamento al passaggio del mouse */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15); /* Aumenta l'ombra al passaggio del mouse */
}

.task-icon {
  width: 64px; /* Dimensione dell'icona */
  height: 64px;
  margin-right: 10px; /* Spazio tra l'icona e il testo */
  border-radius: 5%; /* Arrotonda gli angoli dell'immagine */
}
</style>