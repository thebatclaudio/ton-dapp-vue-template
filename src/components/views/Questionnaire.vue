<script setup>
import { ref, onMounted} from 'vue';

// Stato del completamento del questionario
const isCompleted = ref(false);

// Carica lo stato di completamento dal localStorage
onMounted(() => {
  isCompleted.value = localStorage.getItem('questionnaireCompleted') === 'true';
});

const currentQuestionIndex = ref(0); // Dati del questionario
const questions = ref([
  {
    question: "Quanti anni hai?",
    options: ["16-25", "26-35", "36-45", "45+"],
    answer: null,
    otherAnswer: ""
  },
  {
    question: "Da quanto tempo sei coinvolto nel mondo delle criptovalute?",
    options: ["Meno di 6 mesi", "6 mesi - 1 anno", "2-3 anni", "oltre 3 anni"],
    answer: null,
    otherAnswer: ""
  },
  {
    question: "Sai cosa è un NFT?",
    options: ["Sì, lo so e ho già utilizzato un NFT", "Sì, lo so ma non ho mai utilizzato un NFT", "Ne ho sentito parlare, ma non so esattamente cosa sia", "No, non so cosa sia un NFT"],
    answer: null,
    otherAnswer: ""
  },
  {
    question: "Quali sono le ragioni del tuo interesse per le criptovalute? (Puoi selezionare più di una risposta)",
    options: ["Credo nelle potenzialità della tecnologia blockchain", "Mi interessano la privacy e la sicurezza delle transazioni", "Voglio esplorare nuove forme di finanza", "Sono interessato agli investimenti"],
    answer: [],
    otherAnswer: ""
  },
  {
    question: "Hai mai utilizzato tecnologie basate su blockchain, criptovalute o strumenti correlati? (Puoi selezionare più di una risposta)?",
    options: ["Sì, ho utilizzato criptovalute", "Sì, ho utilizzato piattaforme DeFi", "Sì, ho utilizzato altre tecnologie basate su blockchain (es. smart contract)", "Sì, ho utilizzato NFT", "No, non ho mai utilizzato niente del genere"],
    answer: [],
    otherAnswer: ""
  },
  {
    question: "Quali argomenti sei interessato ad approfondire? (Puoi selezionare più di una risposta)",
    options: ["Criptovalute e il loro funzionamento", "La tecnologia della blockchain", "Investimenti e trading", "NFT e DeFi", "Smart contract e automazione", "Regolamentazioni e normative"],
    answer: [],
    otherAnswer: ""
  },
  {
    question: "Qual è il tuo exchange di riferimento?",
    options: ["Binance", "Coinbase", "Bitfinex", "Non utilizzo exchange", "Altro"],
    answer: null,
    otherAnswer: ""
  },
  {
    question: "Che tipo di wallet preferisci utilizzare?",
    options: ["Hardware (es. Ledger)", "Software (es. Metamask, Telegram)", "Exchange Custodial (es. Binance Web3)", "Altro"],
    answer: null,
    otherAnswer: ""
  }
]);

const clearOtherAnswer = function (question) {
  if (question.answer !== 'Altro') {
    question.otherAnswer = '';
  }
}

const submitAnswers = function () {
  const results = questions.value.map(question => {
    return {
      question: question.question,
      answer: question.answer === 'Altro' ? question.otherAnswer : question.answer
    };
  });

  console.log(results);

  const jsonContent = JSON.stringify(results, null, 2);
  saveToFile(jsonContent, 'questionnaire_responses.json');
    
  
  // Salva lo stato di completamento del questionario
    localStorage.setItem('questionnaireCompleted', 'true');
  isCompleted.value = true; // Imposta il questionario come completato
};

const saveToFile = function (content, filename) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <!-- Condizionale per mostrare il questionario solo se non è completato -->
  <div v-if="!isCompleted" class="questionnaire-container">
    <!-- Inizio del questionario -->
    <div class="questionnaire">
      <transition name="slide-fade" mode="out-in">
        <div :key="currentQuestionIndex" class="question-block">
          <p class="question-text">{{ questions[currentQuestionIndex].question }}</p>

          <div v-if="[3, 4, 5].includes(currentQuestionIndex)">
            <div v-for="(option, optionIndex) in questions[currentQuestionIndex].options" :key="optionIndex" class="option-block">
              <label class="option-label">
                <input
                  type="checkbox"
                  :value="option"
                  v-model="questions[currentQuestionIndex].answer"
                />
                {{ option }}
              </label>
            </div>
          </div>

          <div v-else>
            <div v-for="(option, optionIndex) in questions[currentQuestionIndex].options" :key="optionIndex" class="option-block">
              <label class="option-label">
                <input
                  type="radio"
                  :name="'question-' + currentQuestionIndex"
                  :value="option"
                  v-model="questions[currentQuestionIndex].answer"
                  @change="clearOtherAnswer(questions[currentQuestionIndex])"
                />
                {{ option }}
              </label>
            </div>
          </div>

          <div v-if="questions[currentQuestionIndex].answer === 'Altro' && ![3, 4, 5].includes(currentQuestionIndex)">
            <input
              type="text"
              v-model="questions[currentQuestionIndex].otherAnswer"
              placeholder="Specifica..."
              class="input-other"
              style="color: #000;"
            />
          </div>

          <div class="navigation-buttons">
            <button v-if="currentQuestionIndex === questions.length - 1" @click="submitAnswers" class="button-submit">Invia Risposte</button>
          </div>

          <!-- Sostituisci i pulsanti con le frecce -->
          <div class="navigation-arrows">
            <span v-if="currentQuestionIndex > 0" @click="currentQuestionIndex--" class="arrow arrow-left">
              <!-- Freccia indietro -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M15 19l-7-7 7-7"/>
              </svg>
            </span>
            <span v-if="currentQuestionIndex < questions.length - 1" @click="currentQuestionIndex++" class="arrow arrow-right">
              <!-- Freccia avanti -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M9 19l7-7-7-7"/>
              </svg>
            </span>
          </div>
        </div>
      </transition>
    </div>
    <!-- Fine del questionario -->
  </div>

  <!-- Messaggio di ringraziamento -->
  <div v-else class="thank-you-message">
    <p>Grazie per aver completato il questionario!</p>
  </div>
</template>


<style scoped>
.questionnaire-container {

  background-color: #f4f4f9; /* Sfondo chiaro */
  padding: 20px;
  border-radius: 16px; /* Bordi arrotondati */
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* Ombra coerente */}


.questionnaire {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;  /* Limita la larghezza massima del questionario */
  height: 400px;  /* Imposta un'altezza fissa */
  overflow-y: auto;  /* Aggiungi una barra di scorrimento verticale se il contenuto è troppo alto */
  position: relative;  /* Posiziona il contenitore come riferimento per le frecce */
  display: flex;
  flex-direction: column;
}

.question-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.option-block {
  margin-bottom: 0.75rem;
}

.option-label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333; /* Assicurati che il colore del testo sia visibile */
}

input[type="radio"],
input[type="checkbox"] {
  margin-right: 0.5rem;
  accent-color: #4CAF50; /* Modern style for inputs */
}

.input-other {
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.button-primary {
  background-color: #007bff;
  color: white;
}

.button-primary:hover {
  background-color: #0056b3;
}

.button-secondary {
  background-color: #6c757d;
  color: white;
}

.button-secondary:hover {
  background-color: #5a6268;
}

.button-submit {
  background-color: #28a745;
  color: white;
  width: 100%;
}

.button-submit:hover {
  background-color: #218838;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.navigation-arrows {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;  /* Posiziona le frecce in basso */
  bottom: 20px;  /* Distanza dal fondo del contenitore */
  left: 0;
  right: 0;
  padding: 0 2rem;  /* Spaziatura orizzontale per allineare con il padding del contenitore */
}

.arrow {
  cursor: pointer;
  color: #007bff;
  transition: color 0.3s ease;
}

.arrow:hover {
  color: #0056b3;
}

.arrow svg {
  width: 36px;
  height: 36px;
}

.arrow-left {
  justify-self: flex-start;
}

.arrow-right {
  justify-self: flex-end;
}

.thank-you-message {
  text-align: center;
  font-size: 1.5rem;
  color: #4CAF50;
  margin-top: 2rem;
  background-color: #f4f4f9; /* Assicurati che lo sfondo sia chiaro */
  padding: 20px;
  border-radius: 16px; /* Per abbinare lo stile del questionario */
}



</style>
