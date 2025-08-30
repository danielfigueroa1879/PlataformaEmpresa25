// Global Capacitación Limitada - Integrated JavaScript

// Global state
let currentUser = null;
let currentSection = 'home';

// Mock data for public site
const cursosCapacitacion = [
    {
        nombre: 'Capacitación OS10 Completa',
        duracion: '120 horas',
        modalidad: 'Presencial y Online',
        precio: '$150.000',
        temario: ['Normativas de Seguridad', 'Procedimientos de Emergencia', 'Manejo de Conflictos', 'Primeros Auxilios']
    },
    {
        nombre: 'Seguridad Privada Avanzada',
        duracion: '80 horas',
        modalidad: 'Presencial',
        precio: '$200.000',
        temario: ['Técnicas de Vigilancia', 'Control de Accesos', 'Gestión de Riesgos', 'Comunicación Efectiva']
    },
    {
        nombre: 'Liderazgo en Seguridad',
        duracion: '60 horas',
        modalidad: 'Online',
        precio: '$120.000',
        temario: ['Gestión de Equipos', 'Toma de Decisiones', 'Comunicación Asertiva', 'Resolución de Conflictos']
    }
];

const noticias = [
    {
        titulo: 'Nueva Certificación OS10 Implementada',
        fecha: '10 de Enero, 2024',
        imagen: 'https://placehold.co/300x200/1a3a6e/white?text=Capacitación+OS10',
        contenido: 'Anunciamos la implementación de la nueva certificación OS10 para nuestros guardias de seguridad...'
    },
    {
        titulo: 'Expansión de Servicios en Región de Coquimbo',
        fecha: '5 de Enero, 2024',
        imagen: 'https://placehold.co/300x200/2c5aa0/white?text=Seguridad+Privada',
        contenido: 'Estamos expandiendo nuestros servicios de seguridad privada en la región de Coquimbo...'
    },
    {
        titulo: 'Nuevo Portal Digital para Colaboradores',
        fecha: '2 de Enero, 2024',
        imagen: 'https://placehold.co/300x200/00c853/white?text=Portal+Digital',
        contenido: 'Presentamos nuestro nuevo portal digital para que nuestros colaboradores puedan gestionar...'
    }
];

// Mock data for private system
const mockData = {
    guardias: [
        { id: 1, nombre: 'Juan Pérez', rut: '12345678-9', email: 'juan@example.com', estado: 'activo', cursosVencen: 15 },
        { id: 2, nombre: 'María González', rut: '98765432-1', email: 'maria@example.com', estado: 'activo', cursosVencen: 30 }
    ],
    cursos: [
        { id: 1, nombre: 'Curso OS-10 Básico', fechaInicio: '2025-09-15', duracion: '40 horas', precio: 150000, estudiantes: 25 },
        { id: 2, nombre: 'Seguridad Industrial', fechaInicio: '2025-09-20', duracion: '60 horas', precio: 200000, estudiantes: 18 }
    ],
    turnos: [
        { id: 1, fecha: '2025-08-29', hora: '08:00-20:00', ubicacion: 'Mall Plaza La Serena', guardia: 'Juan Pérez', estado: 'asignado' },
        { id: 2, fecha: '2025-08-30', hora: '20:00-08:00', ubicacion: 'Edificio Corporativo', guardia: 'María González', estado: 'asignado' }
    ],
    notifications: [
        { id: 1, tipo: 'warning', mensaje: 'Curso OS-10 de Juan Pérez vence en 15 días', fecha: '2025-08-28' },
        { id: 2, tipo: 'info', mensaje: 'Nuevo estudiante inscrito en Seguridad Industrial', fecha: '2025-08-28' }
    ]
};

// Menu configurations for private system
const menuConfig = {
    admin: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'gestionar-guardias', label: 'Gestionar Guardias', icon: 'fas fa-shield-alt' },
        { id: 'gestionar-cursos', label: 'Gestionar Cursos', icon: 'fas fa-book' },
        { id: 'turnos', label: 'Gestión de Turnos', icon: 'fas fa-calendar' },
        { id: 'servicios', label: 'Servicios', icon: 'fas fa-briefcase' },
        { id: 'notificaciones', label: 'Notificaciones', icon: 'fas fa-bell' }
    ],
    guardia: [
        { id: 'mi-perfil', label: 'Mi Perfil', icon: 'fas fa-user' },
        { id: 'mis-turnos', label: 'Mis Turnos', icon: 'fas fa-calendar' },
        { id: 'mis-cursos-guardia', label: 'Mis Cursos', icon: 'fas fa-book' },
        { id: 'ordenes-trabajo', label: 'Órdenes de Trabajo', icon: 'fas fa-tasks' },
        { id: 'mi-contrato', label: 'Mi Contrato', icon: 'fas fa-file-contract' }
    ],
    estudiante: [
        { id: 'mis-cursos', label: 'Mis Cursos', icon: 'fas fa-book' },
        { id: 'horarios', label: 'Horarios', icon: 'fas fa-calendar' },
        { id: 'calificaciones', label: 'Calificaciones', icon: 'fas fa-trophy' },
        { id: 'examen-practica', label: 'Examen de Práctica OS-10', icon: 'fas fa-clipboard-check' }
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const contactForm = document.getElementById('contactForm');
    const blogContainer = document.getElementById('blogPosts');
    const cursosContainer = document.getElementById('cursosList');
    const publicHamburgerBtn = document.getElementById('publicHamburgerBtn');
    const publicMobileNav = document.getElementById('publicMobileNav');
    const publicMobileNavCloseBtn = document.getElementById('publicMobileNavCloseBtn');
    
    initPublicSite();

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    if (publicHamburgerBtn && publicMobileNav) {
        publicHamburgerBtn.addEventListener('click', () => {
            publicMobileNav.classList.toggle('active');
            publicHamburgerBtn.classList.toggle('active');
        });
    }
    
    if (publicMobileNavCloseBtn && publicMobileNav) {
        publicMobileNavCloseBtn.addEventListener('click', () => {
            publicMobileNav.classList.remove('active');
            publicHamburgerBtn.classList.remove('active');
        });
    }

    const mobileNavLinks = document.querySelectorAll('#publicMobileNav a');
    if (mobileNavLinks.length > 0 && publicMobileNav && publicHamburgerBtn) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                publicMobileNav.classList.remove('active');
                publicHamburgerBtn.classList.remove('active');
            });
        });
    }

    if (loginBtn && modal && closeModal) {
        loginBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        loginForm.addEventListener('submit', handleLogin);
    }
    
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            modal.classList.add('active');
            publicMobileNav.classList.remove('active');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            alert(`Gracias ${nombre}, hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.`);
            contactForm.reset();
        });
    }

    if (blogContainer) {
        renderBlog();
    }

    if (cursosContainer) {
        renderCursos();
    }

    setTimeout(showNotification, 3000);
});

function initPublicSite() {
    document.getElementById('publicSite').classList.remove('hidden');
    document.getElementById('privateSystem').classList.add('hidden');
}

function renderBlog() {
    const blogContainer = document.getElementById('blogPosts');
    if (blogContainer) {
        blogContainer.innerHTML = noticias.map(nota => `
            <div class="blog-card">
                <img src="${nota.imagen}" alt="${nota.titulo}">
                <div class="blog-card-content">
                    <h3>${nota.titulo}</h3>
                    <p class="date">${nota.fecha}</p>
                    <p>${nota.contenido}</p>
                </div>
            </div>
        `).join('');
    }
}

function renderCursos() {
    const cursosContainer = document.getElementById('cursosList');
    if (cursosContainer) {
        cursosContainer.innerHTML = cursosCapacitacion.map(curso => `
            <div class="card">
                <h3>${curso.nombre}</h3>
                <p><strong>Duración:</strong> ${curso.duracion}</p>
                <p><strong>Modalidad:</strong> ${curso.modalidad}</p>
                <p><strong>Precio:</strong> ${curso.precio}</p>
                <ul>
                    ${curso.temario.map(tema => `<li>${tema}</li>`).join('')}
                </ul>
                <button class="btn" onclick="openLoginForEnrollment('${curso.nombre}')">Inscribirse</button>
            </div>
        `).join('');
    }
}

function showNotification() {
    const notif = document.createElement('div');
    notif.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; background: #ff6d00; color: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1000; max-width: 300px; font-family: 'Poppins', sans-serif;">
            <strong>¡Bienvenido!</strong> Explora nuestros servicios de seguridad y capacitación.
            <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;">×</button>
        </div>
    `;
    document.body.appendChild(notif);
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('userRole').value;
    
    if (!role) {
        alert('Por favor, seleccione un tipo de usuario');
        return;
    }

    if (email && password) {
        currentUser = {
            id: 1,
            nombre: role === 'admin' ? 'Admin Global' : role === 'guardia' ? 'Juan Pérez' : 'Ana Estudiante',
            email: email,
            rol: role
        };
        
        currentSection = role === 'admin' ? 'dashboard' : role === 'guardia' ? 'mi-perfil' : 'mis-cursos';
        
        document.getElementById('loginModal').classList.remove('active');
        
        document.getElementById('publicSite').classList.add('hidden');
        document.getElementById('privateSystem').classList.remove('hidden');
        
        updatePrivateUI();

        if (window.innerWidth > 768) {
            toggleSidebar(true);
            setTimeout(() => {
                toggleSidebar(false);
            }, 20000);
        }
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function logout() {
    currentUser = null;
    currentSection = 'home';
    
    toggleSidebar(false);
    
    document.getElementById('privateSystem').classList.add('hidden');
    document.getElementById('publicSite').classList.remove('hidden');
}

function openLoginForExam() {
    document.getElementById('userRole').value = 'estudiante';
    document.getElementById('loginModal').classList.add('active');
}

function openLoginForStudents() {
    document.getElementById('userRole').value = 'estudiante';
    document.getElementById('loginModal').classList.add('active');
}

function openLoginForEnrollment(courseName) {
    document.getElementById('userRole').value = 'estudiante';
    document.getElementById('loginModal').classList.add('active');
}

function toggleSidebar(show = null) {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (show === null) {
        sidebar.classList.toggle('open');
        mainContent.classList.toggle('sidebar-open');
    } else if (show) {
        sidebar.classList.add('open');
        mainContent.classList.add('sidebar-open');
    } else {
        sidebar.classList.remove('open');
        mainContent.classList.remove('sidebar-open');
    }
}

function navigateToSection(sectionId) {
    currentSection = sectionId;
    updatePrivateUI();
    if (window.innerWidth <= 768) {
        toggleSidebar(false);
    }
}

function updatePrivateUI() {
    updatePrivateHeader();
    updateSidebar();
    updateMainContent();
}

function updatePrivateHeader() {
    const headerActions = document.getElementById('headerActions');
    
    if (currentUser) {
        headerActions.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="user-welcome">Bienvenido, ${currentUser.nombre}</span>
                <div class="flex items-center gap-4">
                    <i class="fas fa-bell"></i>
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            </div>
        `;
    }
}

function updateSidebar() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    
    if (!currentUser) {
        sidebarMenu.innerHTML = '';
        return;
    }

    const menuItems = menuConfig[currentUser.rol] || [];
    sidebarMenu.innerHTML = menuItems.map(item => `
        <li class="sidebar-item ${currentSection === item.id ? 'active' : ''}" onclick="navigateToSection('${item.id}')">
            <i class="${item.icon}"></i>
            <span>${item.label}</span>
        </li>
    `).join('');
}

function updateMainContent() {
    const mainContent = document.getElementById('mainContent');
    
    if (!currentUser) return;

    switch (currentSection) {
        case 'dashboard':
            mainContent.innerHTML = renderAdminDashboard();
            break;
        case 'gestionar-guardias':
            mainContent.innerHTML = renderGestionGuardias();
            break;
        case 'gestionar-cursos':
            mainContent.innerHTML = renderGestionCursos();
            break;
        case 'mi-perfil':
            mainContent.innerHTML = renderMiPerfil();
            break;
        case 'mis-turnos':
            mainContent.innerHTML = renderMisTurnos();
            break;
        case 'mis-cursos':
            mainContent.innerHTML = renderMisCursos();
            break;
        case 'examen-practica':
            mainContent.innerHTML = renderExamenPractica();
            break;
        default:
            mainContent.innerHTML = renderSeccionEnDesarrollo();
    }
}

function renderAdminDashboard() {
    return `
        <h2 class="text-3xl font-bold mb-8">Panel de Control Administrativo</h2>
        <div class="grid grid-cols-4 mb-8">
            <div class="stat-card blue">
                <div>
                    <p style="opacity: 0.8;">Total Guardias</p>
                    <p class="stat-number">${mockData.guardias.length}</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
            </div>
            <div class="stat-card green">
                <div>
                    <p style="opacity: 0.8;">Cursos Activos</p>
                    <p class="stat-number">${mockData.cursos.length}</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-book"></i>
                </div>
            </div>
            <div class="stat-card orange">
                <div>
                    <p style="opacity: 0.8;">Turnos Hoy</p>
                    <p class="stat-number">${mockData.turnos.length}</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-calendar"></i>
                </div>
            </div>
            <div class="stat-card red">
                <div>
                    <p style="opacity: 0.8;">Alertas</p>
                    <p class="stat-number">${mockData.notifications.length}</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-bell"></i>
                </div>
            </div>
        </div>
    `;
}

function renderGestionGuardias() {
    return `
        <h2 class="text-3xl font-bold mb-8">Gestión de Guardias</h2>
        <button class="btn btn-primary mb-4">Nuevo Guardia</button>
        <div class="card">
            <div class="card-content">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Guardia</th>
                            <th>RUT</th>
                            <th>Estado</th>
                            <th>Certificación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockData.guardias.map(guardia => `
                            <tr>
                                <td>${guardia.nombre}</td>
                                <td>${guardia.rut}</td>
                                <td><span class="badge badge-success">${guardia.estado}</span></td>
                                <td>Vence en ${guardia.cursosVencen} días</td>
                                <td>
                                    <button class="btn btn-sm btn-primary">Editar</button>
                                    <button class="btn btn-sm btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderGestionCursos() {
    return `
        <h2 class="text-3xl font-bold mb-8">Gestión de Cursos</h2>
        <button class="btn btn-primary mb-4">Nuevo Curso</button>
        <div class="card">
            <div class="card-content">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Curso</th>
                            <th>Fecha Inicio</th>
                            <th>Estudiantes</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockData.cursos.map(curso => `
                            <tr>
                                <td>${curso.nombre}</td>
                                <td>${curso.fechaInicio}</td>
                                <td>${curso.estudiantes}</td>
                                <td>$${curso.precio.toLocaleString()}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary">Editar</button>
                                    <button class="btn btn-sm btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderMiPerfil() {
    return `
        <h2 class="text-3xl font-bold mb-8">Mi Perfil</h2>
        <div class="card">
            <div class="card-content">
                <div class="flex items-center mb-6">
                    <div style="width: 80px; height: 80px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1.5rem;">
                        <i class="fas fa-user" style="color: white; font-size: 2rem;"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold">${currentUser.nombre}</h3>
                        <p style="color: #6b7280;">${currentUser.email}</p>
                        <p class="text-sm" style="color: #6b7280;">Guardia de Seguridad</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2">
                    <div class="space-y-4">
                        <h4 class="text-lg font-bold">Información Personal</h4>
                        <div class="space-y-4">
                            <p><span class="font-bold">RUT:</span> 12.345.678-9</p>
                            <p><span class="font-bold">Teléfono:</span> +56 9 8765 4321</p>
                            <p><span class="font-bold">Fecha de Contratación:</span> 15 Enero 2024</p>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <h4 class="text-lg font-bold">Estado de Certificaciones</h4>
                        <div class="space-y-4">
                            <div class="p-4" style="background-color: #fef3c7; border-radius: 0.5rem;">
                                <div class="flex justify-between certification-status">
                                    <span>Certificación OS-10</span>
                                    <span class="font-bold" style="color: #d97706;">Vence en 15 días</span>
                                </div>
                            </div>
                            <div class="p-4" style="background-color: #dcfce7; border-radius: 0.5rem;">
                                <div class="flex justify-between certification-status">
                                    <span>Primeros Auxilios</span>
                                    <span class="font-bold" style="color: #059669;">Vigente</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderMisTurnos() {
    return `
        <h2 class="text-3xl font-bold mb-8">Mis Turnos</h2>
        <div class="card">
            <div class="card-content">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Ubicación</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockData.turnos.map(turno => `
                            <tr>
                                <td>${turno.fecha}</td>
                                <td>${turno.hora}</td>
                                <td>${turno.ubicacion}</td>
                                <td><span class="badge badge-success">${turno.estado}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderMisCursos() {
    return `
        <h2 class="text-3xl font-bold mb-8">Mis Cursos</h2>
        <div class="grid grid-cols-2">
            ${mockData.cursos.map(curso => `
                <div class="card">
                    <div class="card-content">
                        <h3 class="text-xl font-bold mb-4">${curso.nombre}</h3>
                        <div class="space-y-4" style="color: #6b7280;">
                            <p><span class="font-bold">Fecha de Inicio:</span> ${curso.fechaInicio}</p>
                            <p><span class="font-bold">Duración:</span> ${curso.duracion}</p>
                            <p><span class="font-bold">Progreso:</span> 75%</p>
                        </div>
                        <div class="progress mt-4">
                            <div class="progress-bar" style="width: 75%;"></div>
                        </div>
                        <button class="btn btn-primary mt-4">
                            Continuar Curso
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderExamenPractica() {
    return `
        <h2 class="text-3xl font-bold mb-8">Examen de Práctica OS-10</h2>
        <div class="card">
            <div class="card-content">
                <h3 class="text-xl font-bold mb-4">Simulacros Disponibles</h3>
                <div class="space-y-4">
                    <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem;">
                        <h4 class="font-bold">Examen Básico OS-10</h4>
                        <p class="text-sm" style="color: #6b7280;">30 preguntas - 60 minutos</p>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-sm" style="color: #6b7280;">Último intento: 85%</span>
                            <button class="btn btn-primary" onclick="startQuiz()">Iniciar</button>
                        </div>
                    </div>
                    <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem;">
                        <h4 class="font-bold">Examen Avanzado OS-10</h4>
                        <p class="text-sm" style="color: #6b7280;">50 preguntas - 90 minutos</p>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-sm" style="color: #6b7280;">Sin intentos</span>
                            <button class="btn btn-success" onclick="startQuiz()">Iniciar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function startQuiz() {
    const mainContent = document.getElementById('mainContent');
    
    const quizHTML = `
        <section id="exam-section" class="mt-5">
            <h2 class="text-center exam-heading-green">Examen de Preparación OS-10</h2>
            <p class="text-center">Pon a prueba tus conocimientos sobre la normativa de seguridad privada y las funciones del guardia. ¡Obtén tu calificación en escala del 1 al 7, basada en el curso OS-10!</p>
            <p class="text-center" style="color: #dc3545; font-weight: 600; font-size: 0.9rem;">
                <i class="bi bi-exclamation-triangle"></i> 
                <strong>IMPORTANTE:</strong> Este examen consta de 30 preguntas. Una vez que selecciones una respuesta, no podrás cambiarla. Lee cuidadosamente antes de responder.
            </p>
            
            <button id="start-exam-btn" class="mb-4">Empezar Examen Ahora</button>

            <div id="quiz-container" class="mt-4" style="display: none;"></div>
            <div class="exam-controls">
                <button id="submit-quiz-btn" style="display: none;">Enviar Examen</button>
            </div>
            <div id="subtle-response-box" class="subtle-response-box"></div>
        </section>
        <div id="results-modal-overlay" style="display: none;">
            <div id="results-modal-content">
                <h3>Resultados del Examen</h3>
                <p>Respuestas correctas: <span id="modal-correct-count"></span> de <span id="modal-total-questions"></span></p>
                <p>Porcentaje: <span id="modal-percentage"></span>%</p>
                <p>Tu nota en escala del 1 al 7: <strong id="modal-grade"></strong></p>
                <p id="modal-message"></p>
                <button id="close-modal-btn">Cerrar</button>
            </div>
        </div>
    `;

    mainContent.innerHTML = quizHTML;

    const startExamBtn = document.getElementById('start-exam-btn');
    if(startExamBtn) {
        startExamBtn.addEventListener('click', generateQuestionsCategorized);
    }

    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    if(submitQuizBtn) {
        submitQuizBtn.addEventListener('click', submitCategorizedQuiz);
    }

    const closeModalBtn = document.getElementById('close-modal-btn');
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            const resultsModalOverlay = document.getElementById('results-modal-overlay');
            if(resultsModalOverlay) {
                resultsModalOverlay.classList.remove('show');
            }
        });
    }
}

function renderSeccionEnDesarrollo() {
    return `
        <h2 class="text-3xl font-bold mb-8">Sección en Desarrollo</h2>
        <div class="card">
            <div class="card-content">
                <p style="color: #6b7280;">Esta sección está siendo desarrollada y estará disponible pronto.</p>
            </div>
        </div>
    `;
}

// Initialize window resize handler for private system
window.addEventListener('resize', () => {
    if (currentUser && window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        sidebar.classList.add('open');
        mainContent.classList.add('sidebar-open');
    } else if (currentUser) {
        toggleSidebar(false);
    }
});
