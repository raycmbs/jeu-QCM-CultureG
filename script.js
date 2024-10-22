// Liste des questions du quiz
const questions = [
    {
        question: "Quel est le plus grand pays du monde par superficie ?",
        choix: ["Canada", "Chine", "Russie", "États-Unis"],
        correct: "Russie"
    },
    {
        question: "Quel pays a la plus grande population ?",
        choix: ["Inde", "États-Unis", "Chine", "Indonésie"],
        correct: "Chine"
    },
    {
        question: "Quelle est la capitale du Japon ?",
        choix: ["Séoul", "Tokyo", "Pékin", "Bangkok"],
        correct: "Tokyo"
    },
    {
        question: "Quel pays est connu pour sa tour penchée ?",
        choix: ["France", "Italie", "Espagne", "Allemagne"],
        correct: "Italie"
    },
    {
        question: "Quel pays a remporté la Coupe du Monde de la FIFA 2018 ?",
        choix: ["Brésil", "France", "Allemagne", "Argentine"],
        correct: "France"
    },
    {
        question: "Quel est le plus petit pays du monde ?",
        choix: ["Vatican", "Monaco", "Saint-Marin", "Nauru"],
        correct: "Vatican"
    },
    {
        question: "Quel pays est surnommé le 'pays du soleil levant' ?",
        choix: ["Chine", "Japon", "Thaïlande", "Inde"],
        correct: "Japon"
    },
    {
        question: "Quelle est la langue officielle du Brésil ?",
        choix: ["Espagnol", "Français", "Portugais", "Anglais"],
        correct: "Portugais"
    },
    {
        question: "Quel pays a pour monnaie le yen ?",
        choix: ["Chine", "Japon", "Corée du Sud", "Thaïlande"],
        correct: "Japon"
    },
    {
        question: "Quel est le pays le plus densément peuplé ?",
        choix: ["Monaco", "Singapour", "Bangladesh", "Maldives"],
        correct: "Monaco"
    },
    {
        question: "Quel pays est le berceau de la démocratie ?",
        choix: ["Rome", "Athènes", "Paris", "Londres"],
        correct: "Athènes"
    },
    {
        question: "Quelle est la capitale de l'Australie ?",
        choix: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: "Canberra"
    },
    {
        question: "Quel pays a la plus grande superficie forestière ?",
        choix: ["Canada", "Russie", "Brésil", "États-Unis"],
        correct: "Russie"
    },
    {
        question: "Quel est le pays le plus riche du monde ?",
        choix: ["Qatar", "Luxembourg", "Norvège", "Suisse"],
        correct: "Qatar"
    },
    {
        question: "Quelle est la capitale de l'Italie ?",
        choix: ["Milan", "Rome", "Naples", "Florence"],
        correct: "Rome"
    },
    {
        question: "Quel pays a le plus grand nombre d'îles ?",
        choix: ["Suède", "Indonésie", "Canada", "Finlande"],
        correct: "Suède"
    },
    {
        question: "Quelle est la langue officielle du Canada ?",
        choix: ["Anglais", "Français", "Espagnol", "Allemand"],
        correct: "Anglais"
    },
    {
        question: "Quel pays est le plus grand producteur de pétrole ?",
        choix: ["Venezuela", "Arabie Saoudite", "Russie", "États-Unis"],
        correct: "États-Unis"
    },
    {
        question: "Quel pays est connu pour ses kangourous ?",
        choix: ["Nouvelle-Zélande", "Australie", "Afrique du Sud", "Inde"],
        correct: "Australie"
    },
    {
        question: "Quelle est la capitale de l'Inde ?",
        choix: ["Mumbai", "New Delhi", "Bangalore", "Kolkata"],
        correct: "New Delhi"
    }
];

let questionIndex = 0;
let score = 0;
let pseudo = "";
let classement = JSON.parse(localStorage.getItem('classement')) || [];

// Commencer le jeu
document.getElementById("commencer").addEventListener("click", () => {
    pseudo = document.getElementById("pseudo").value.trim();
    if (pseudo) {
        document.getElementById("start-interface").style.display = "none";
        document.getElementById("qcm-interface").style.display = "block";
        afficherQuestion();
    } else {
        alert("Veuillez entrer un pseudo.");
    }
});

// Afficher la question actuelle
function afficherQuestion() {
    const questionObj = questions[questionIndex];
    document.getElementById("question-title").textContent = `Question ${questionIndex + 1}`;
    document.getElementById("question").textContent = questionObj.question;

    const choixContainer = document.getElementById("choix-container");
    choixContainer.innerHTML = "";

    questionObj.choix.forEach((choix, index) => {
        const choixDiv = document.createElement("div");
        choixDiv.classList.add("choix");
        choixDiv.textContent = choix;
        choixDiv.addEventListener("click", () => choisirReponse(choixDiv, choix));
        choixContainer.appendChild(choixDiv);
    });

    // Mettre à jour l'affichage du score
    document.getElementById("score").textContent = `Score : ${score}`;
}

// Gérer le choix de la réponse
function choisirReponse(choixDiv, choix) {
    document.querySelectorAll(".choix").forEach(el => el.classList.remove("active"));
    choixDiv.classList.add("active");

    document.getElementById("verifier").onclick = () => verifierReponse(choix);
}

// Vérifier la réponse
function verifierReponse(choix) {
    const questionObj = questions[questionIndex];

    if (choix === questionObj.correct) {
        score++;
        document.getElementById("message").textContent = "Bonne réponse !";
        document.getElementById("message").style.color = "green";
    } else {
        document.getElementById("message").textContent = `Mauvaise réponse. La bonne réponse était : ${questionObj.correct}`;
        document.getElementById("message").style.color = "red";
    }
    document.getElementById("message").style.display = "block";

    // Mettre à jour le score dans l'affichage
    document.getElementById("score").textContent = `Score : ${score}`;
    
    questionIndex++;

    if (questionIndex < questions.length) {
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
            afficherQuestion();
        }, 1500);
    } else {
        finDeJeu();
    }
}

// Fin du jeu, afficher le score et le classement
function finDeJeu() {
    document.getElementById("qcm-interface").style.display = "none";
    document.getElementById("fin-interface").style.display = "block";
    document.getElementById("score-final").textContent = score;
    document.getElementById("joueur").textContent = pseudo;

    classement.push({ pseudo: pseudo, score: score });
    classement.sort((a, b) => b.score - a.score);
    localStorage.setItem('classement', JSON.stringify(classement));

    afficherClassement();
}

// Afficher le classement
function afficherClassement() {
    const classementElement = document.getElementById("classement");
    classementElement.innerHTML = "";
    classement.forEach((joueur, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${joueur.pseudo} - ${joueur.score} points`;
        classementElement.appendChild(li);
    });
}

// Réinitialiser le classement
document.getElementById("reset-classement").addEventListener("click", () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le classement ?")) {
        localStorage.removeItem('classement');
        classement = [];
        afficherClassement();
        alert("Le classement a été réinitialisé.");
    }
});

// Rejouer
document.getElementById("rejouer").addEventListener("click", () => {
    location.reload();
});