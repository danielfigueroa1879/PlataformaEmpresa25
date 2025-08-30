const questionsByCategory = {
    "CONOCIMIENTOS LEGALES": [
        { question: "La labor básica de los Guardias de Seguridad es brindar personalmente seguridad y protección a bienes, personas e instalaciones.", correctAnswer: "Verdadero" },
        { question: "Cualquier persona puede ser detenida cuando hay sospecha de que cometió un delito.", correctAnswer: "Falso" },
        { question: "La existencia de la legítima defensa como justificación de un hecho, es determinada por la policía.", correctAnswer: "Falso" },
        { question: "Es obligatorio para cada lugar donde se desempeñen Guardias de Seguridad, la existencia de una Directiva de Funcionamiento debidamente autorizada por la Comisaría del sector jurisdiccional.", correctAnswer: "Verdadero" },
        { question: "Solamente durante la noche los Guardias de Seguridad pueden usar armas de fuego.", correctAnswer: "Falso" },
        { question: "La honra y dignidad de la persona es un derecho constitucional.", correctAnswer: "Verdadero" },
        { question: "La Constitución Política de la República establece la igualdad de las personas.", correctAnswer: "Verdadero" },
        { question: "El Guardia de Seguridad puede ejercer sus funciones hasta el frontis de la instalación resguardada.", correctAnswer: "Verdadero" },
        { question: "El Guardia de Seguridad en el cumplimiento de sus funciones deberá usar una tenida uniforme determinada por la Directiva de Funcionamiento que ha sido aprobada por la Prefectura de Carabineros respectiva.", correctAnswer: "Verdadero" },
        { question: "En el CUASIDELITO existe la culpa.", correctAnswer: "Verdadero" },
    ],
    "PRIMEROS AUXILIOS": [
        { question: "El objetivo básico de otorgar primeros auxilios es sólo establecer la identificación de la causa del daño que afecta al accidentado.", correctAnswer: "Falso" },
        { question: "Ante un traumatismo toráxico, lo primordial es inmovilizar el cuello para evitar un daño a la columna vertebral.", correctAnswer: "Falso" },
        { question: "Existen las hemorragias capilares, venosas y subjuntivas.", correctAnswer: "Falso" },
        { question: "Un hematoma se produce cuando hay fractura expuesta.", correctAnswer: "Falso" },
    ],
    "PROTECCIÓN DE INSTALACIONES": [
        { question: "Dentro de las funciones básicas de un vigilante privado y/o guardia de seguridad está la de desempeñar la protección de las personas tanto dentro como fuera de los recintos e instalaciones de la empresa.", correctAnswer: "Falso" },
        { question: "Cuando sea visitada la empresa por personal externo, básicamente se deben efectuar los siguientes procedimientos: identificación de la visita, solicitar con quién se va a entrevistar, dejar constancia en el libro de registro respectivo.", correctAnswer: "Verdadero" },
        { question: "Las rondas un control móvil superficial de áreas, realizadas con una frecuencia más o menos regular.", correctAnswer: "Verdadero" },
    ],
    "CONOCIMIENTOS DE SISTEMAS DE ALARMA": [
        { question: "Para detectar un incendio existen detectores de temperatura y de humo.", correctAnswer: "Verdadero" },
        { question: "Para proyectar un buen sistema de detección se debe considerar, que este sólo suene fuerte.", correctAnswer: "Falso" },
    ],
    "VALORES Y ÉTICA": [
        { question: "La tolerancia es fundamental en la convivencia laboral.", correctAnswer: "Verdadero" },
        { question: "A veces es necesario mentir para salir de algún problema.", correctAnswer: "Falso" },
    ],
    "SISTEMAS DE COMUNICACIÓN Y ENLACE": [
        { question: "Respecto a una consulta telefónica, no se debe gastar a tiempo en verificaciones, para evitar mantener ocupada la línea.", correctAnswer: "Falso" },
        { question: "Teléfono es un elemento de comunicación, que nunca se debe utilizar porque es vulnerable.", correctAnswer: "Falso" },
    ],
    "PREVENCIÓN Y CONTROL DE EMERGENCIA": [
        { question: "INFLAMABLES Sustancias que a alta temperatura ambiente desprenden vapores que, mezclados con el aire, pueden arder en presencia de una fuente de calor.", correctAnswer: "Falso" },
        { question: "Los grifos son de costo más alto y prestan una más deficiente acción por las largas tiras de mangueras y gran cantidad de extintores manuales que se deben emplear.", correctAnswer: "Falso" },
    ],
    "PREGUNTAS ADICIONALES": [
        { question: "La Autoridad Fiscalizadora de la Seguridad Privada en Chile es la Prefectura de Carabineros de Chile del sector.", correctAnswer: "Verdadero" },
        { question: "La Ley N° 21.659, publicada en marzo de 2024, es la única ley que regula la seguridad privada en Chile actualmente.", correctAnswer: "Falso" },
    ]
};

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createCategorizedQuestions() {
    const allQuestions = [];
    const categories = Object.keys(questionsByCategory);
    let totalQuestions = 0;

    for(const category in questionsByCategory) {
        totalQuestions += questionsByCategory[category].length;
    }

    const numQuestions = Math.min(30, totalQuestions);

    while(allQuestions.length < numQuestions) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const question = questionsByCategory[randomCategory][Math.floor(Math.random() * questionsByCategory[randomCategory].length)];
        if (!allQuestions.find(q => q.question === question.question)) {
            allQuestions.push({...question, category: randomCategory});
        }
    }

    return shuffleArray(allQuestions);
}

function generateQuestionsCategorized() {
    const quizContainer = document.getElementById('quiz-container');
    const startExamBtn = document.getElementById('start-exam-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');

    quizContainer.innerHTML = '<p class="text-center text-info"><span class="spinner-border text-info" role="status"></span> Generando preguntas...</p>';
    quizContainer.style.display = 'block';
    startExamBtn.style.display = 'none';

    setTimeout(() => {
        const questions = createCategorizedQuestions();
        displayCategorizedQuiz(questions);
        submitQuizBtn.style.display = 'block';
    }, 500);
}

function displayCategorizedQuiz(questions) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    userAnswers = {};
    
    questions.forEach((q, index) => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('question-card');
        
        questionCard.innerHTML = `
            <h5>${index + 1}. ${q.question}</h5>
            <div class="options-container">
                <label class="option-button" data-question="${index}" data-value="Verdadero">
                    <input class="form-check-input" type="radio" name="question${index}" value="Verdadero" style="display: none;">
                    Verdadero
                </label>
                <label class="option-button" data-question="${index}" data-value="Falso">
                    <input class="form-check-input" type="radio" name="question${index}" value="Falso" style="display: none;">
                    Falso
                </label>
            </div>
        `;
        quizContainer.appendChild(questionCard);

        const optionButtons = questionCard.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const questionIndex = parseInt(this.dataset.question);
                const selectedValue = this.dataset.value;

                optionButtons.forEach(btn => {
                    btn.classList.remove('selected');
                });
                this.classList.add('selected');
                
                userAnswers[questionIndex] = selectedValue;
            });
        });
    });
}

let userAnswers = {};

function submitCategorizedQuiz() {
    const questions = document.querySelectorAll('.question-card');
    let score = 0;
    questions.forEach((card, index) => {
        const questionText = card.querySelector('h5').innerText.substring(3);
        const allQuestions = Object.values(questionsByCategory).flat();
        const questionData = allQuestions.find(q => q.question === questionText);
        if (questionData && userAnswers[index] === questionData.correctAnswer) {
            score++;
        }
    });

    const percentage = (score / questions.length) * 100;
    const grade = calculateGrade(percentage);

    const modal = document.getElementById('results-modal-overlay');
    document.getElementById('modal-correct-count').textContent = score;
    document.getElementById('modal-total-questions').textContent = questions.length;
    document.getElementById('modal-percentage').textContent = percentage.toFixed(1);
    document.getElementById('modal-grade').textContent = grade.toFixed(1);
    document.getElementById('modal-message').textContent = grade >= 4.0 ? '¡Felicitaciones! Has aprobado.' : 'Necesitas repasar más. ¡No te desanimes!';
    modal.classList.add('show');
}

function calculateGrade(percentage) {
    if (percentage < 50) return (1.0 + (percentage / 50) * 3.0).toFixed(1);
    return (4.0 + ((percentage - 50) / 50) * 3.0).toFixed(1);
}
