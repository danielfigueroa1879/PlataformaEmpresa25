document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded. Initializing app logic.");

    // Navbar Shrink on Scroll
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-shrink');
            } else {
                navbar.classList.remove('navbar-shrink');
            }
        });
    }

    // Search Bar Toggle
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function() {
            searchBar.classList.toggle('show');
        });

        document.addEventListener('click', function(event) {
            if (!searchBar.contains(event.target) && !searchToggle.contains(event.target)) {
                searchBar.classList.remove('show');
            }
        });
    }

    // Variables globales para el quiz
    let questions = [];
    let userAnswers = {};

    // Quiz Logic
    const quizContainer = document.getElementById('quiz-container');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const startExamBtn = document.getElementById('start-exam-btn');
    const examSection = document.getElementById('exam-section');
    const subtleResponseBox = document.getElementById('subtle-response-box');

    // Modal elements for results
    const resultsModalOverlay = document.getElementById('results-modal-overlay');
    const resultsModalContent = document.getElementById('results-modal-content');
    const modalCorrectCount = document.getElementById('modal-correct-count');
    const modalTotalQuestions = document.getElementById('modal-total-questions');
    const modalPercentage = document.getElementById('modal-percentage');
    const modalGrade = document.getElementById('modal-grade');
    const modalMessage = document.getElementById('modal-message');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Sistema de preguntas categorizadas para el examen OS-10
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
            { question: "En el CUASIDELITO existe la culpa.", correctAnswer: "Verdadero" }
        ],
        "PRIMEROS AUXILIOS": [
            { question: "El objetivo básico de otorgar primeros auxilios es sólo establecer la identificación de la causa del daño que afecta al accidentado.", correctAnswer: "Falso" },
            { question: "Ante un traumatismo torácico, lo primordial es inmovilizar el cuello para evitar un daño a la columna vertebral.", correctAnswer: "Falso" },
            { question: "Existen las hemorragias capilares, venosas y subjuntivas.", correctAnswer: "Falso" },
            { question: "Los primeros auxilios a una persona con paro cardiaco es efectuar masaje cardiaco.", correctAnswer: "Verdadero" },
            { question: "Podemos distinguir las hemorragias venosas cuando la sangre brota sin fuerza y tiene un tono rojo oscuro.", correctAnswer: "Verdadero" },
            { question: "El botiquín de primeros auxilios es primordial en una instalación.", correctAnswer: "Verdadero" }
        ],
        "PROTECCIÓN DE INSTALACIONES": [
            { question: "Dentro de las funciones básicas de un vigilante privado y/o guardia de seguridad está la de desempeñar la protección de las personas tanto dentro como fuera de los recintos e instalaciones de la empresa.", correctAnswer: "Falso" },
            { question: "Las rondas un control móvil superficial de áreas, realizadas con una frecuencia más o menos regular.", correctAnswer: "Verdadero" },
            { question: "Los tipos de fuego son A,B y C.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad debe utilizar psicología para enfrentar situaciones difíciles.", correctAnswer: "Verdadero" },
            { question: "Seguridad de instalaciones involucra entre otras; protección de edificios, custodia de dependencias, protección de recintos donde las personas trabajan.", correctAnswer: "Verdadero" }
        ],
        "CONOCIMIENTOS DE SISTEMAS DE ALARMA": [
            { question: "Para detectar un incendio existen detectores de temperatura y de humo.", correctAnswer: "Verdadero" },
            { question: "El circuito cerrado de televisión lo debemos considerar, que esta destinado al reemplazo total de Guardias de Seguridad.", correctAnswer: "Falso" },
            { question: "Los sensores son elementos que se activan, permitiendo percibir una determinada señal.", correctAnswer: "Verdadero" },
            { question: "Un sistema de alarmas debe tener etapas básicas, detección, control y respuesta.", correctAnswer: "Verdadero" }
        ],
        "VALORES Y ÉTICA": [
            { question: "La tolerancia es fundamental en la convivencia laboral.", correctAnswer: "Verdadero" },
            { question: "A veces es necesario mentir para salir de algún problema.", correctAnswer: "Falso" },
            { question: "La honestidad es una habilidad para engañar a los demás sin crear ofensa.", correctAnswer: "Falso" },
            { question: "La honestidad es la obligación moral más grande.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad es la cara visible de la empresa.", correctAnswer: "Verdadero" }
        ],
        "PREGUNTAS ADICIONALES": [
            { question: "La Autoridad Fiscalizadora de la Seguridad Privada en Chile es la Prefectura de Carabineros de Chile del sector.", correctAnswer: "Verdadero" },
            { question: "Los Guardias de Seguridad están autorizados para portar armas de fuego en el ejercicio de sus funciones según el Decreto 93.", correctAnswer: "Falso" },
            { question: "El curso de formación para Guardia de Seguridad, según el Decreto 93, tiene una duración de 90 horas.", correctAnswer: "Verdadero" },
            { question: "Un Guardia de Seguridad está facultado para detener a alguien solo en caso de sorprenderlo en delito flagrante.", correctAnswer: "Verdadero" }
        ]
    };

    // Función para crear el array de preguntas mezcladas categorizadamente
    function createCategorizedQuestions() {
        const allQuestions = [];
        const categories = Object.keys(questionsByCategory);
        
        // Obtener preguntas de cada categoría de manera aleatoria
        categories.forEach(category => {
            const categoryQuestions = questionsByCategory[category];
            const shuffledCategoryQuestions = shuffleArray([...categoryQuestions]);
            
            // Determinar cuántas preguntas tomar de cada categoría
            let questionsToTake;
            switch(category) {
                case "CONOCIMIENTOS LEGALES":
                    questionsToTake = 8;
                    break;
                case "PRIMEROS AUXILIOS":
                    questionsToTake = 4;
                    break;
                case "PROTECCIÓN DE INSTALACIONES":
                    questionsToTake = 6;
                    break;
                case "CONOCIMIENTOS DE SISTEMAS DE ALARMA":
                    questionsToTake = 4;
                    break;
                case "VALORES Y ÉTICA":
                    questionsToTake = 4;
                    break;
                case "PREGUNTAS ADICIONALES":
                    questionsToTake = 4;
                    break;
                default:
                    questionsToTake = 3;
            }
            
            // Agregar las preguntas seleccionadas con la información de categoría
            for (let i = 0; i < Math.min(questionsToTake, shuffledCategoryQuestions.length); i++) {
                allQuestions.push({
                    ...shuffledCategoryQuestions[i],
                    category: category
                });
            }
        });
        
        // Mezclar todas las preguntas seleccionadas y tomar exactamente 30
        return shuffleArray(allQuestions).slice(0, 30);
    }

    // Función para mostrar las estadísticas de categorías al final del examen
    function showCategoryStats(questions, userAnswers) {
        const categoryStats = {};
        
        questions.forEach((question, index) => {
            const category = question.category;
            if (!categoryStats[category]) {
                categoryStats[category] = { total: 0, correct: 0 };
            }
            categoryStats[category].total++;
            
            if (userAnswers[index] === question.correctAnswer) {
                categoryStats[category].correct++;
            }
        });
        
        return categoryStats;
    }

    // Function to shuffle an array
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Función para obtener el badge de categoría con colores
    function getCategoryBadge(category) {
        const categoryColors = {
            "CONOCIMIENTOS LEGALES": "bg-primary",
            "PRIMEROS AUXILIOS": "bg-danger", 
            "PROTECCIÓN DE INSTALACIONES": "bg-success",
            "CONOCIMIENTOS DE SISTEMAS DE ALARMA": "bg-warning text-dark",
            "VALORES Y ÉTICA": "bg-info",
            "PREGUNTAS ADICIONALES": "bg-purple"
        };
        
        const colorClass = categoryColors[category] || "bg-secondary";
        const categoryShort = getCategoryShortName(category);
        
        return `<span class="badge ${colorClass} category-badge">${categoryShort}</span>`;
    }

    // Función para obtener nombres cortos de categorías
    function getCategoryShortName(category) {
        const shortNames = {
            "CONOCIMIENTOS LEGALES": "Legal",
            "PRIMEROS AUXILIOS": "Primeros Auxilios",
            "PROTECCIÓN DE INSTALACIONES": "Protección",
            "CONOCIMIENTOS DE SISTEMAS DE ALARMA": "Sistemas",
            "VALORES Y ÉTICA": "Ética",
            "PREGUNTAS ADICIONALES": "Adicionales"
        };
        
        return shortNames[category] || category;
    }

    // Función principal para generar preguntas categorizadas
    function generateQuestionsCategorized() {
        console.log("generateQuestionsCategorized function called.");
        
        // Show loading message
        if (quizContainer) {
            quizContainer.innerHTML = '<p class="text-center text-info"><span class="spinner-border text-info" role="status"></span> Generando preguntas categorizadas... Esto puede tardar unos segundos.</p>';
            quizContainer.style.display = 'block';
        }
        
        if (startExamBtn) startExamBtn.style.display = 'none';
        if (submitQuizBtn) submitQuizBtn.style.display = 'none';

        // Activate persistent red border for the exam section
        if (examSection) examSection.classList.add('active-red-border');

        // Show subtle message box
        if (subtleResponseBox) { 
            subtleResponseBox.style.display = 'block';
            subtleResponseBox.classList.add('show');
            subtleResponseBox.textContent = '¡Generando preguntas categorizadas, por favor espera!';
        }

        // Simulate loading time and then generate categorized questions
        setTimeout(() => {
            questions = createCategorizedQuestions();
            userAnswers = {};
            
            displayCategorizedQuiz();
            
            if (subtleResponseBox) {
                subtleResponseBox.textContent = '¡30 preguntas categorizadas cargadas! Verás preguntas de todas las materias. Una vez que selecciones una respuesta, no podrás cambiarla. ¡Mucha suerte!';
                setTimeout(() => {
                    subtleResponseBox.classList.remove('show');
                    setTimeout(() => subtleResponseBox.style.display = 'none', 500);
                }, 4000);
            }
        }, 1000);
    }

    // Función para mostrar el quiz categorizado
    function displayCategorizedQuiz() {
        if (!quizContainer) return;
        
        quizContainer.innerHTML = '';
        
        questions.forEach((q, index) => {
            const questionCard = document.createElement('div');
            questionCard.classList.add('question-card');
            
            // Agregar badge de categoría
            const categoryBadge = getCategoryBadge(q.category);
            
            questionCard.innerHTML = `
                <div class="category-badge-container mb-2">
                    ${categoryBadge}
                </div>
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
                <div class="feedback-message mt-2" style="font-weight: 600; display: none;"></div>
            `;
            quizContainer.appendChild(questionCard);

            // Add event listeners to option buttons
            const optionButtons = questionCard.querySelectorAll('.option-button');
            optionButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const questionIndex = parseInt(this.dataset.question);
                    
                    if (userAnswers[questionIndex] !== undefined) {
                        return;
                    }
                    
                    const selectedValue = this.dataset.value;
                    const currentQuestion = questions[questionIndex];
                    const feedbackMessage = questionCard.querySelector('.feedback-message');

                    userAnswers[questionIndex] = selectedValue;

                    optionButtons.forEach(btn => {
                        btn.classList.remove('selected', 'correct', 'incorrect');
                    });

                    this.classList.add('selected');
                    
                    if (selectedValue === currentQuestion.correctAnswer) {
                        this.classList.add('correct');
                        feedbackMessage.style.color = '#28a745';
                        feedbackMessage.textContent = '¡Correcto!';
                    } else {
                        this.classList.add('incorrect');
                        feedbackMessage.style.color = '#dc3545';
                        feedbackMessage.textContent = `Incorrecto. La respuesta correcta era: "${currentQuestion.correctAnswer}".`;
                    }

                    feedbackMessage.style.display = 'block';
                    questionCard.classList.add('answered-blue-border');
                    
                    optionButtons.forEach(btn => {
                        btn.style.pointerEvents = 'none';
                        btn.style.opacity = '0.8';
                        btn.style.cursor = 'not-allowed';
                    });
                    
                    const lockMessage = document.createElement('div');
                    lockMessage.style.cssText = 'font-size: 0.8em; color: #666; margin-top: 8px; font-style: italic;';
                    lockMessage.textContent = '🔒 Respuesta registrada - No se puede modificar';
                    feedbackMessage.appendChild(lockMessage);

                    if (Object.keys(userAnswers).length === questions.length && submitQuizBtn) {
                        submitQuizBtn.style.display = 'block';
                        showSubtleMessage('¡Todas las preguntas respondidas! Puedes enviar tu examen.');
                    }
                });
            });
        });

        console.log("Categorized quiz questions displayed.");
    }

    // Función modificada para enviar quiz con estadísticas por categoría
    function submitCategorizedQuiz() {
        let score = 0;
        questions.forEach((q, index) => {
            if (userAnswers[index] === q.correctAnswer) {
                score++;
            }
        });

        const maxScore = questions.length;
        const percentage = (score / maxScore) * 100;
        const grade = calculateGrade(percentage);
        const passed = grade >= 4.0;
        
        // Obtener estadísticas por categoría
        const categoryStats = showCategoryStats(questions, userAnswers);

        // Populate modal content
        if (modalCorrectCount) modalCorrectCount.textContent = score;
        if (modalTotalQuestions) modalTotalQuestions.textContent = maxScore;
        if (modalPercentage) modalPercentage.textContent = percentage.toFixed(1);
        if (modalGrade) modalGrade.textContent = grade.toFixed(1);

        // Crear contenido detallado por categorías
        let categoryBreakdown = '<div class="category-breakdown mt-3"><h6>Resultados por Categoría:</h6>';
        Object.entries(categoryStats).forEach(([category, stats]) => {
            const categoryPercentage = ((stats.correct / stats.total) * 100).toFixed(1);
            const categoryShort = getCategoryShortName(category);
            const statusIcon = stats.correct === stats.total ? '✅' : 
                              categoryPercentage >= 60 ? '⚠️' : '❌';
            
            categoryBreakdown += `
                <div class="category-stat">
                    ${statusIcon} <strong>${categoryShort}:</strong> ${stats.correct}/${stats.total} (${categoryPercentage}%)
                </div>
            `;
        });
        categoryBreakdown += '</div>';

        // Set modal message and color
        if (resultsModalContent) {
            resultsModalContent.classList.remove('pass', 'fail');
            if (passed) {
                if (modalMessage) modalMessage.innerHTML = '¡Felicitaciones! Has aprobado.' + categoryBreakdown;
                resultsModalContent.classList.add('pass');
            } else {
                if (modalMessage) modalMessage.innerHTML = 'Necesitas repasar más. ¡No te desanimes!' + categoryBreakdown;
                resultsModalContent.classList.add('fail');
            }
        }

        // Show the modal
        if (resultsModalOverlay) {
            resultsModalOverlay.style.display = 'flex';
            setTimeout(() => resultsModalOverlay.classList.add('show'), 10);
        }

        if (submitQuizBtn) submitQuizBtn.style.display = 'none';
        
        // Disable all option buttons
        document.querySelectorAll('.option-button').forEach(button => {
            button.style.pointerEvents = 'none';
            button.style.opacity = '0.7';
        });

        console.log("Categorized quiz submitted and results displayed in modal. Score:", score);
    }

    // Function to calculate grade from 1 to 7
    function calculateGrade(percentage) {
        if (percentage < 30) return 1.0;
        if (percentage < 40) return 2.0;
        if (percentage < 50) return 3.0;
        if (percentage < 60) return 4.0;
        if (percentage < 70) return 5.0;
        if (percentage < 85) return 6.0;
        return 7.0;
    }

    // Function to show subtle messages
    function showSubtleMessage(message, isError = false) {
        const messageBox = document.createElement('div');
        messageBox.className = 'subtle-response-box show';
        messageBox.textContent = message;
        messageBox.style.position = 'fixed';
        messageBox.style.top = '20%';
        messageBox.style.left = '50%';
        messageBox.style.transform = 'translate(-50%, -50%)';
        messageBox.style.zIndex = '1500';

        if (isError) {
            messageBox.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
            messageBox.style.color = '#dc3545';
        } else {
            messageBox.style.backgroundColor = 'rgba(40, 53, 147, 0.2)';
            messageBox.style.color = '#283593';
        }

        document.body.appendChild(messageBox);

        setTimeout(() => {
            messageBox.classList.remove('show');
            messageBox.addEventListener('transitionend', () => messageBox.remove());
        }, 3000);
    }

    // Event Listeners
    if (startExamBtn) {
        startExamBtn.addEventListener('click', generateQuestionsCategorized);
    }
    
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', submitCategorizedQuiz);
    }

    // Close modal button listener
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (resultsModalOverlay) {
                resultsModalOverlay.classList.remove('show');
                setTimeout(() => {
                    resultsModalOverlay.style.display = 'none';
                    if (resultsModalContent) resultsModalContent.classList.remove('pass', 'fail');
                    
                    // Reset exam
                    if (quizContainer) quizContainer.style.display = 'none';
                    if (startExamBtn) startExamBtn.style.display = 'block';
                    if (submitQuizBtn) submitQuizBtn.style.display = 'none';
                    if (examSection) examSection.classList.remove('active-red-border');
                    questions = [];
                    userAnswers = {};
                }, 300);
            }
        });
    }

    // Click outside modal to close
    if (resultsModalOverlay) {
        resultsModalOverlay.addEventListener('click', (e) => {
            if (e.target === resultsModalOverlay && closeModalBtn) {
                closeModalBtn.click();
            }
        });
    }

    // Report Drafting Assistant Logic
    const incidentDescriptionInput = document.getElementById('incident-description-input');
    const reportTypeSelect = document.getElementById('report-type-select');
    const generateReportBtn = document.getElementById('generate-report-btn');
    const reportOutput = document.getElementById('report-output');
    const copyReportBtn = document.getElementById('copy-report-btn');
    const downloadActaBtn = document.getElementById('download-acta-btn');

    // Hide report action buttons on init
    if (copyReportBtn) copyReportBtn.style.display = 'none';
    if (downloadActaBtn) downloadActaBtn.style.display = 'none';

    if (generateReportBtn && incidentDescriptionInput && reportTypeSelect && reportOutput) {
        generateReportBtn.addEventListener('click', async () => {
            const description = incidentDescriptionInput.value.trim();
            const selectedReportType = reportTypeSelect.value;

            if (!description) {
                reportOutput.innerHTML = '<p style="color: #dc3545;">Por favor, describe el incidente.</p>';
                if (copyReportBtn) copyReportBtn.style.display = 'none';
                if (downloadActaBtn) downloadActaBtn.style.display = 'none';
                return;
            }

            reportOutput.innerHTML = '<p style="color: #17a2b8;"><span class="spinner-border text-info" role="status"></span> Generando borrador...</p>';
            generateReportBtn.disabled = true;
            if (copyReportBtn) copyReportBtn.style.display = 'none';
            if (downloadActaBtn) downloadActaBtn.style.display = 'none';

            if (selectedReportType === 'acta_detencion_particulares') {
                reportOutput.innerHTML = `<p style="color: #28a745;">Haz clic en el botón para descargar el Acta de Detención:</p>`;
                if (downloadActaBtn) downloadActaBtn.style.display = 'block';
                generateReportBtn.disabled = false;
                console.log("Showing Detention Act download button.");
                return;
            }

            // Generate a simulated report
            setTimeout(() => {
                const currentDate = new Date().toLocaleDateString('es-CL');
                const currentTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

                let generatedReport = `INFORME DE INCIDENTE

Fecha: ${currentDate}
Hora: ${currentTime}
Descripción: ${description}

ACCIONES TOMADAS:
- Se procedió según protocolo de seguridad establecido
- Se documentó el incidente para registro interno

Elaborado por: [Nombre del Guardia]
Fecha de elaboración: ${currentDate}`;

                reportOutput.innerHTML = `<pre style="white-space: pre-wrap; font-family: 'Poppins', sans-serif; background-color: #f8f9fa; padding: 10px; border-radius: 5px; color: #333; margin: 0;">${generatedReport}</pre>`;
                if (copyReportBtn) copyReportBtn.style.display = 'block';
                generateReportBtn.disabled = false;
            }, 1500);
        });
    }

    if (copyReportBtn && reportOutput) {
        copyReportBtn.addEventListener('click', () => {
            const reportContent = reportOutput.textContent;
            navigator.clipboard.writeText(reportContent).then(() => {
                showSubtleMessage('¡Borrador copiado al portapapeles!');
            }).catch(err => {
                console.error('Error al copiar el borrador:', err);
                showSubtleMessage('No se pudo copiar el borrador.', true);
            });
        });
    }

    // AI Clarifier Logic (Floating)
    const floatingAiButton = document.getElementById('floating-ai-button');
    const aiClarifierChat = document.getElementById('ai-clarifier-chat');
    const closeAiChatBtn = document.getElementById('close-ai-chat');
    const aiQuestionInput = document.getElementById('ai-question-input');
    const askAiBtn = document.getElementById('ask-ai-btn');
    const aiClarifierResponse = document.getElementById('ai-clarifier-response');

    if (floatingAiButton && aiClarifierChat) {
        floatingAiButton.addEventListener('click', () => {
            console.log("Floating AI button clicked. Toggling chat visibility.");
            aiClarifierChat.classList.toggle('show');
        });
    }

    if (closeAiChatBtn && aiClarifierChat && aiQuestionInput && aiClarifierResponse) {
        closeAiChatBtn.addEventListener('click', () => {
            console.log("Close chat button clicked. Hiding chat.");
            aiClarifierChat.classList.remove('show');
            aiQuestionInput.value = '';
            aiClarifierResponse.innerHTML = '<p>Tu respuesta aparecerá aquí.</p>';
        });
    }

    if (askAiBtn && aiQuestionInput && aiClarifierResponse) {
        askAiBtn.addEventListener('click', async function() {
            const userQuestion = aiQuestionInput.value.trim();
            if (userQuestion === "") {
                aiClarifierResponse.innerHTML = '<p style="color: #dc3545;">Por favor, escribe tu pregunta.</p>';
                return;
            }

            aiClarifierResponse.innerHTML = '<p style="color: #17a2b8;"><span class="spinner-border text-info" role="status"></span> Cargando respuesta de la IA... Esto puede tardar unos segundos.</p>';
            askAiBtn.disabled = true;
            console.log("Ask AI button clicked. Generating response for:", userQuestion);

            // Simulate AI response generation
            setTimeout(() => {
                const response = generateAIResponse(userQuestion);
                aiClarifierResponse.innerHTML = `<p>${response}</p>`;
                askAiBtn.disabled = false;
                console.log("AI Clarifier response generated and displayed.");
            }, 2000);
        });
    }

    // Function to generate simulated AI responses
    function generateAIResponse(question) {
        const lowerQuestion = question.toLowerCase();
        
        // Respuestas sobre Decreto 93
        if (lowerQuestion.includes('decreto 93') && (lowerQuestion.includes('requisito') || lowerQuestion.includes('educación'))) {
            return "Según el Decreto 93, para ser Guardia de Seguridad se requiere: tener al menos 18 años de edad, haber cursado educación media completa o su equivalente, no tener antecedentes penales, aprobar examen psicológico y físico, y completar el curso de formación de 90 horas académicas.";
        }
        
        if (lowerQuestion.includes('decreto 93') && (lowerQuestion.includes('uniforme') || lowerQuestion.includes('vestimenta'))) {
            return "El Decreto 93 establece que el uniforme del guardia debe ser de color azul marino, con distintivos que identifiquen a la empresa y al guardia. Debe incluir placa identificatoria con nombre y RUN, y no puede asemejarse a uniformes de Fuerzas Armadas o de Orden.";
        }
        
        if (lowerQuestion.includes('decreto 93') && (lowerQuestion.includes('seguro') || lowerQuestion.includes('utm'))) {
            return "El Decreto 93 establece que las empresas deben contratar un seguro de vida para sus guardias con una cifra asegurada de 75 UTM, que cubra accidentes y enfermedades derivadas del trabajo.";
        }
        
        // Respuestas sobre funciones del guardia
        if (lowerQuestion.includes('función') || lowerQuestion.includes('responsabilidad')) {
            return "Las principales funciones del guardia de seguridad incluyen: vigilar y proteger bienes y personas, detectar y prevenir actos que atenten contra la seguridad, informar novedades a superiores, aplicar medidas de seguridad según protocolos, y colaborar con autoridades cuando sea requerido.";
        }
        
        if (lowerQuestion.includes('detención') || lowerQuestion.includes('detener')) {
            return "Los guardias pueden detener a personas solo en caso de delito flagrante, aplicando el Artículo 134 del Código Procesal Penal. Deben entregar inmediatamente al detenido a Carabineros y no pueden usar fuerza excesiva.";
        }
        
        // Respuestas sobre Ley 21.659
        if (lowerQuestion.includes('ley 21.659') || lowerQuestion.includes('nueva ley')) {
            return "La Ley 21.659 moderniza la regulación de seguridad privada en Chile. Entra en vigencia el 28 de noviembre de 2025 y establece nuevos estándares para empresas y guardias, fortalece la fiscalización y mejora los requisitos de formación.";
        }
        
        // Respuestas sobre armamento
        if (lowerQuestion.includes('arma') || lowerQuestion.includes('armamento')) {
            return "Los guardias de seguridad NO están autorizados para portar armas de fuego según el Decreto 93. Solo pueden usar elementos de protección personal autorizados como bastón de goma, silbato y linterna.";
        }
        
        // Respuestas sobre procedimientos
        if (lowerQuestion.includes('procedimiento') || lowerQuestion.includes('protocolo')) {
            return "Los guardias deben seguir protocolos establecidos: observar y reportar, no alterar sitio del suceso, preservar evidencias, comunicar novedades de inmediato, actuar con prudencia y solicitar apoyo cuando sea necesario.";
        }
        
        // Respuestas sobre formación
        if (lowerQuestion.includes('curso') || lowerQuestion.includes('formación') || lowerQuestion.includes('90 horas')) {
            return "El curso OS-10 para guardias de seguridad tiene una duración de 90 horas académicas y debe incluir materias como: legislación, procedimientos de seguridad, primeros auxilios, comunicaciones, derechos humanos y ética profesional.";
        }
        
        // Respuesta general
        return "Basándome en la normativa chilena de seguridad privada (Decreto Ley 3607, Decreto 93 y Ley 21.659), puedo ayudarte con temas específicos sobre funciones del guardia, requisitos, procedimientos y marco legal. ¿Podrías ser más específico con tu consulta?";
    }

    console.log("Quiz system and AI Clarifier initialized successfully.");
