// Portal functionality
function showMenu() {
  window.location.href = "https://umi4555.github.io/Cantine_/";
}

function backToPortal() {
  document.querySelector('.portal-container').style.display = 'block';
  document.getElementById('menuContent').style.display = 'none';
  // Update browser history
  history.pushState({ page: 'home' }, '', '/');
}

function showQuizModes() {
  document.getElementById('quizModeSelection').style.display = 'flex';
}

function closeQuizModes() {
  document.getElementById('quizModeSelection').style.display = 'none';
}

// Quiz functionality 
const quizQuestions = {
  facile: [
    {
      question: "Les produits Bio sont-ils meilleurs pour l'environnement ?",
      options: ["Vrai", "Faux"],
      correct: 0,
      explanation: "Les produits Bio utilisent moins de pesticides et respectent mieux l'environnement"
    },
    {
      question: "Est-ce qu'il faut manger 5 fruits et légumes par jour ?",
      options: ["Vrai", "Faux"],
      correct: 0,
      explanation: "5 fruits et légumes par jour apportent les vitamines et minéraux essentiels"
    },
    {
      question: "Le petit-déjeuner est-il le repas le plus important de la journée ?",
      options: ["Vrai", "Faux"],
      correct: 0,
      explanation: "Le petit-déjeuner donne l'énergie nécessaire pour bien commencer la journée"
    }
  ],
  moyen: [
    {
      question: "Les protéines se trouvent uniquement dans la viande",
      options: ["Vrai", "Faux"],
      correct: 1,
      explanation: "On trouve aussi des protéines dans les légumineuses, œufs, poissons"
    },
    {
      question: "Les produits laitiers sont la seule source de calcium",
      options: ["Vrai", "Faux"],
      correct: 1,
      explanation: "Les légumes verts et certaines eaux minérales sont aussi riches en calcium"
    },
    {
      question: "Le sucre est nécessaire au fonctionnement du cerveau",
      options: ["Vrai", "Faux"],
      correct: 0,
      explanation: "Le glucose est le carburant principal du cerveau"
    }
  ],
  expert: [
    {
      question: "Les oméga-3 sont des acides gras essentiels",
      options: ["Vrai", "Faux"],
      correct: 0,
      explanation: "Notre corps ne peut pas les fabriquer, il faut les apporter par l'alimentation"
    },
    {
      question: "La vitamine D peut être synthétisée par notre corps",
      options: ["Vrai", "Faux"],
      correct: 0,
      explanation: "La peau produit de la vitamine D grâce aux rayons UV du soleil"
    },
    {
      question: "Les fibres alimentaires sont digérées par notre système digestif",
      options: ["Vrai", "Faux"],
      correct: 1,
      explanation: "Les fibres ne sont pas digérées mais sont essentielles pour le transit"
    }
  ]
};

let currentQuiz = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  mode: ''
};

function startQuiz(mode) {
  currentQuiz.questions = quizQuestions[mode];
  currentQuiz.currentQuestionIndex = 0;
  currentQuiz.score = 0;
  currentQuiz.mode = mode;
  
  document.getElementById('quizModeSelection').style.display = 'none';
  document.getElementById('quizContainer').style.display = 'block';
  displayQuestion();
}

function displayQuestion() {
  const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
  const quizContainer = document.getElementById('quizContainer');
  
  quizContainer.innerHTML = `
    <h2>Quiz Nutrition - Mode ${currentQuiz.mode}</h2>
    <div class="quiz-progress">Question ${currentQuiz.currentQuestionIndex + 1}/${currentQuiz.questions.length}</div>
    <div class="quiz-question">${question.question}</div>
    <div class="quiz-options">
      ${question.options.map((option, index) => `
        <button class="quiz-btn" onclick="checkAnswer(${index})">${option}</button>
      `).join('')}
    </div>
  `;
}

function checkAnswer(selectedIndex) {
  const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
  const isCorrect = selectedIndex === question.correct;
  
  if (isCorrect) {
    currentQuiz.score++;
  }
  
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML += `
    <div class="quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}">
      ${isCorrect ? 'Correct ! ' : 'Incorrect '}<br>
      ${question.explanation}
    </div>
    <button class="next-question-btn" onclick="nextQuestion()">Question suivante</button>
  `;
  
  document.querySelectorAll('.quiz-btn').forEach(btn => btn.disabled = true);
}

function nextQuestion() {
  currentQuiz.currentQuestionIndex++;
  
  if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length) {
    displayQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  const percentage = (currentQuiz.score / currentQuiz.questions.length) * 100;
  const quizContainer = document.getElementById('quizContainer');
  
  quizContainer.innerHTML = `
    <div class="final-score">
      <h2>Quiz terminé !</h2>
      <p>Votre score : ${currentQuiz.score}/${currentQuiz.questions.length} (${percentage}%)</p>
      <p>${getFeedback(percentage)}</p>
      <button onclick="closeQuizModes()">Retour au menu</button>
    </div>
  `;
}

function getFeedback(percentage) {
  if (percentage === 100) return "Parfait ! Vous êtes un expert en nutrition ! ";
  if (percentage >= 70) return "Très bien ! Vous avez de bonnes connaissances ! ";
  if (percentage >= 50) return "Pas mal ! Continuez à apprendre sur la nutrition ! ";
  return "Continuez d'apprendre ! La nutrition est un sujet passionnant ! ";
}

// Menu functionality
let userIdentity = null;
let currentDay = 'Lundi 15 janvier';

const weeklyMenu = {
  'Lundi 15 janvier': [{
    name: 'Betterave-mimosa / Cordon bleu / Spaghetti bio',
    ingredients: 'Betterave-mimosa, salade verte, pomelos, salad\'bar, cordon bleu, poisson meunière',
    nutritionalInfo: 'Spaghetti bio, brocolis bio LAB, fromage / yaourt bio A, kiwi',
    type: 'Menu du Jour',
    icons: ['Bio', 'Local']
  }],
  'Mardi 16 janvier': [{
    name: 'Rosette beurre / Sauté de porc / Salsifis',
    ingredients: 'Rosette beurre, salade verte, pomelos, salad bar, sauté de porc, aile de raie',
    nutritionalInfo: 'Salsifis, semoule bio, fromage / yaourt bio, dessert bar',
    type: 'Menu du Jour',
    icons: ['Bio', 'Local']
  }],
  'Mercredi 17 janvier': [{
    name: 'Œuf mayonnaise / Saucisse de toulouse / Lentilles bio',
    ingredients: 'Œuf mayonnaise, salade verte, pomelos, saucisse de toulouse, filet de colin',
    nutritionalInfo: 'Lentilles bio, côte de blettes, fromage / yaourt bio, pêche melba',
    type: 'Menu du Jour',
    icons: ['Bio', 'Local']
  }],
  'Jeudi 18 janvier': [{
    name: 'Salade coleslaw / Wings de poulet / Haricots beurre',
    ingredients: 'Salade coleslaw, salade verte, pomelos, salad bar, wings de poulet, nuggets végétal',
    nutritionalInfo: 'Haricots beurre, frites, fromage / yaourt bio, orange',
    type: 'Menu du Jour',
    icons: ['Bio', 'Local']
  }],
  'Vendredi 19 janvier': [{
    name: 'Salade de blé bio / Paupiette de veau / Riz bio',
    ingredients: 'Salade de blé bio AB, salade verte, pomelos, salad bar, paupiette de veau, médaillon de merlu',
    nutritionalInfo: 'Riz bio, légumes verts bio, fromage / yaourt bio AB, pâtisserie',
    type: 'Menu du Jour',
    icons: ['Bio', 'Local']
  }]
};

function updateMenuDisplay() {
  const dayMenu = weeklyMenu[currentDay];
  const menuItemsContainer = document.getElementById('menu-items');
  document.getElementById('current-day').textContent = currentDay;
  
  let menuHTML = '';
  dayMenu.forEach(dish => {
    const escapedIngredients = dish.ingredients.replace(/'/g, "\\'");
    const escapedNutrition = dish.nutritionalInfo.replace(/'/g, "\\'");
    
    menuHTML += `
      <div class="dish-item" onclick="showDishDetails('${escapedIngredients}', '${escapedNutrition}')">
        <div class="dish-name">${dish.name}</div>
        <div class="dish-type">${dish.type}</div>
        <div class="dish-icons">
          ${dish.icons.map(icon => `<span class="dish-icon">${icon}</span>`).join('')}
        </div>
      </div>
    `;
  });
  
  menuItemsContainer.innerHTML = menuHTML;
}

function changeDay(direction) {
  const days = Object.keys(weeklyMenu);
  let currentIndex = days.indexOf(currentDay);
  let newIndex = currentIndex + direction;
  
  if (newIndex >= 0 && newIndex < days.length) {
    currentDay = days[newIndex];
    updateMenuDisplay();
    document.querySelector('.lcd-screen').textContent = `Menu du ${currentDay}`;
  }
}

function showDishDetails(ingredients, nutrition) {
  document.querySelector('.lcd-screen').innerHTML = `
    Ingrédients: ${ingredients}<br><br>
    ${nutrition}
  `;
}

function rate(stars) {
  if (userIdentity) {
    if (currentDay === 'Vendredi 19 janvier') {
      document.querySelector('.lcd-screen').innerHTML = `
        <div class="scroll-message">
          Merci ${userIdentity.firstName} !<br>
          Vous avez donné ${stars} étoiles au repas.
          <button class="submit-all-btn" onclick="submitAllRatings()">Envoyer tous mes avis</button>
        </div>
      `;
    } else {
      document.querySelector('.lcd-screen').innerHTML = `
        <div class="scroll-message">
          Merci ${userIdentity.firstName} !<br>
          Vous avez donné ${stars} étoiles au repas.
        </div>
      `;
    }
  } else {
    document.querySelector('.lcd-screen').innerHTML = `
      <div class="scroll-message">
        Connectez-vous pour donner votre avis.<br>
        Votre opinion nous aide à nous améliorer !
      </div>
    `;
  }
}

function submitAllRatings() {
  const fullscreenMsg = document.createElement('div');
  fullscreenMsg.className = 'fullscreen-message';
  fullscreenMsg.innerHTML = `
    Merci beaucoup ${userIdentity.firstName} ${userIdentity.lastName} !
    <br><br>
    Vos avis ont été enregistrés.
    <br>
    Nous tiendrons compte de vos retours 
    <br>
    pour améliorer nos repas.
    <br><br>
    À très bientôt dans votre cantine !
    <button class="return-btn" onclick="location.reload()">Retour au menu</button>
  `;
  document.body.appendChild(fullscreenMsg);
}

function handleLogin(event) {
  if (event) event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  if (firstName && lastName) {
    userIdentity = { firstName, lastName };
  }
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('loginButton').style.display = 'none';
}

function skipLogin() {
  userIdentity = null;
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('loginButton').style.display = 'block';
}

// Initialize
updateMenuDisplay();
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('loginButton').addEventListener('click', function() {
  document.getElementById('loginOverlay').style.display = 'flex';
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
});

// Handle back navigation
window.addEventListener('popstate', function(event) {
  if (document.getElementById('menuContent').style.display === 'block') {
    backToPortal();
  }
});

// Handle scroll for login button visibility
let lastScrollPosition = 0;
let ticking = false;

window.addEventListener('scroll', function() {
  lastScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      const loginButton = document.getElementById('loginButton');
      if (lastScrollPosition > 50) {
        loginButton.classList.add('hidden');
      } else {
        loginButton.classList.remove('hidden');
      }
      ticking = false;
    });
    ticking = true;
  }
});