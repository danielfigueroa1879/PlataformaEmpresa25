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
        { question: "El que sin derecho encerrare o detuviere a otro privándole de su libertad, comete el delito de secuestro.", correctAnswer: "Verdadero" },
        { question: "La Constitución nos garantiza el derecho a la vida y la libertad.", correctAnswer: "Verdadero" },
        { question: "Son cláusulas prohibidas en un contrato de trabajo, todas aquellas que implican la renuncia a derechos otorgados por las leyes laborales.", correctAnswer: "Verdadero" },
        { question: "El delito es toda acción u omisión voluntaria penada por la Ley.", correctAnswer: "Verdadero" },
        { question: "El contrato de trabajo es consensual y deberá ser extendido por escrito, dentro del plazo de 5 días de incorporado el trabajador y firmados por ambas partes, en dos ejemplares.", correctAnswer: "Verdadero" },
        { question: "En el sistema de vigilancia privada vigente, sólo los Guardias de Seguridad, están sujetos a la Fiscalización de la Autoridad Fiscalizadora de la prefectura de Carabineros de su sector jurisdiccional.", correctAnswer: "Falso" },
        { question: "El Guardia de Seguridad es un policía pagado por los privados.", correctAnswer: "Falso" },
        { question: "El Guardia de Seguridad actúa en las calles cerradas.", correctAnswer: "Falso" },
        { question: "Toda entidad bancaria debe tener equipo de filmación funcionando durante la atención de público.", correctAnswer: "Verdadero" },
        { question: "El Guardia de Seguridad debe contar con seguro de vida un mínimo de 75 UF.", correctAnswer: "Verdadero" },
    ],
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
    
    categories.forEach(category => {
        const categoryQuestions = questionsByCategory[category];
        const shuffledCategoryQuestions = shuffleArray([...categoryQuestions]);
        
        let questionsToTake;
        switch(category) {
            case "CONOCIMIENTOS LEGALES":
                questionsToTake = 5;
                break;
            default:
                questionsToTake = 3;
        }
        
        for (let i = 0; i < Math.min(questionsToTake, shuffledCategoryQuestions.length); i++) {
            allQuestions.push({
                ...shuffledCategoryQuestions[i],
                category: category
            });
        }
    });
    
    return shuffleArray(allQuestions).slice(0, 30);
}

function generateQuestionsCategorized() {
    const quizContainer = document.getElementById('quiz-container');
    const startExamBtn = document.getElementById('start-exam-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');

    quizContainer.innerHTML = '<p class="text-center text-info"><span class="spinner-border text-info" role="status"></span> Generando preguntas categorizadas...</p>';
    quizContainer.style.display = 'block';
    startExamBtn.style.display = 'none';

    setTimeout(() => {
        const questions = createCategorizedQuestions();
        displayCategorizedQuiz(questions);
        submitQuizBtn.style.display = 'block';
    }, 1000);
}

function displayCategorizedQuiz(questions) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    
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
    // This is a placeholder. The full logic is in index(45).html
    alert("Examen enviado");
}

function calculateGrade(percentage) {
    if (percentage < 50) return 1.0 + (percentage / 50) * 2.9;
    return 4.0 + ((percentage - 50) / 50) * 3.0;
}
