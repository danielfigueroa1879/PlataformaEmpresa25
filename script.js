// Global Capacitación Limitada - Integrated JavaScript

// Global state
let currentUser = null;
let currentSection = 'home';
let examHistory = []; // To store exam results

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
        {
            id: 1,
            nombre: 'Juan Pérez',
            rut: '12.345.678-9',
            email: 'juan@example.com',
            curso: {
                nombre: 'OS-10 Perfeccionamiento',
                fechaRealizacion: '2022-10-15', // Por Vencer
                institucion: 'Capacitaciones Seguras Ltda.'
            },
            contrato: 'CONTRATO DE TRABAJO A PLAZO FIJO\n\nEn La Serena, a 01 de Enero de 2024, entre EMPRESA RR.HH Y CAPACITACION LTDA, RUT 76.123.456-7, representada legalmente por Don Administrador General, en adelante "el empleador", y por otra parte, Don JUAN PÉREZ, cédula de identidad N° 12.345.678-9, en adelante "el trabajador", se ha convenido el siguiente contrato de trabajo:\n\nPRIMERO: El trabajador se compromete a ejecutar la labor de Guardia de Seguridad en las instalaciones que el empleador determine. Sus funciones principales serán el control de acceso, rondas perimetrales, y velar por la seguridad de las personas y bienes de la instalación asignada.\n\nSEGUNDO: La jornada de trabajo será de 45 horas semanales, distribuidas en turnos rotativos según lo dispuesto en el artículo 22 del Código del Trabajo.\n\nTERCERO: El trabajador declara recibir en este acto una copia del Reglamento Interno de Orden, Higiene y Seguridad, comprometiéndose a darle cumplimiento.\n\n[... Resto del contenido del contrato ...]'
        },
        {
            id: 2,
            nombre: 'María González',
            rut: '9.876.543-2',
            email: 'maria@example.com',
            curso: {
                nombre: 'OS-10 Formación',
                fechaRealizacion: '2024-08-01', // Vigente
                institucion: 'Instituto de Seguridad Chile'
            },
            contrato: 'Contrato de trabajo para María González...'
        },
        // 5 nuevos guardias
        {
            id: 3,
            nombre: 'Carlos Soto',
            rut: '11.222.333-4',
            email: 'carlos@example.com',
            curso: {
                nombre: 'OS-10 Formación',
                fechaRealizacion: '2022-02-20', // Vencido
                institucion: 'Capacitaciones Seguras Ltda.'
            },
            contrato: 'Contrato de trabajo para Carlos Soto...'
        },
        {
            id: 4,
            nombre: 'Ana Flores',
            rut: '14.555.888-7',
            email: 'ana@example.com',
            curso: {
                nombre: 'OS-10 Perfeccionamiento',
                fechaRealizacion: '2024-12-10', // Vigente
                institucion: 'Prosegur Capacitación'
            },
            contrato: 'Contrato de trabajo para Ana Flores...'
        },
        {
            id: 5,
            nombre: 'Pedro Rojas',
            rut: '13.444.777-6',
            email: 'pedro@example.com',
            curso: {
                nombre: 'OS-10 Formación',
                fechaRealizacion: '2022-09-30', // Por vencer
                institucion: 'Instituto de Seguridad Chile'
            },
            contrato: 'Contrato de trabajo para Pedro Rojas...'
        },
        {
            id: 6,
            nombre: 'Luisa Castro',
            rut: '15.111.999-K',
            email: 'luisa@example.com',
            curso: {
                nombre: 'OS-10 Formación',
                fechaRealizacion: '2025-05-15', // Vigente
                institucion: 'Capacitaciones Seguras Ltda.'
            },
            contrato: 'Contrato de trabajo para Luisa Castro...'
        },
        {
            id: 7,
            nombre: 'Jorge Díaz',
            rut: '10.888.222-1',
            email: 'jorge@example.com',
            curso: {
                nombre: 'OS-10 Perfeccionamiento',
                fechaRealizacion: '2020-01-25', // Muy Vencido
                institucion: 'Prosegur Capacitación'
            },
            contrato: 'Contrato de trabajo para Jorge Díaz...'
        }
    ],
    cursos: [
        { id: 1, nombre: 'Curso OS-10 Básico', fechaInicio: '2025-09-15', duracion: '40 horas', precio: 150000, estudiantes: 25 },
        { id: 2, nombre: 'Seguridad Industrial', fechaInicio: '2025-09-20', duracion: '60 horas', precio: 200000, estudiantes: 18 }
    ],
    turnos: [
        // Semana para Juan Pérez (Total: 44 horas)
        { id: 1, fecha: '2025-09-08', horaInicio: '08:00', horaFin: '16:00', ubicacion: 'Mall Plaza La Serena', guardia: 'Juan Pérez', estado: 'asignado' }, // 8h
        { id: 2, fecha: '2025-09-09', horaInicio: '08:00', horaFin: '16:00', ubicacion: 'Mall Plaza La Serena', guardia: 'Juan Pérez', estado: 'asignado' }, // 8h
        { id: 3, fecha: '2025-09-10', horaInicio: '08:00', horaFin: '16:00', ubicacion: 'Edificio Corporativo', guardia: 'Juan Pérez', estado: 'asignado' }, // 8h
        { id: 4, fecha: '2025-09-11', horaInicio: '14:00', horaFin: '22:00', ubicacion: 'Condominio El Muelle', guardia: 'Juan Pérez', estado: 'asignado' }, // 8h
        { id: 5, fecha: '2025-09-12', horaInicio: '14:00', horaFin: '22:00', ubicacion: 'Condominio El Muelle', guardia: 'Juan Pérez', estado: 'asignado' }, // 8h
        { id: 6, fecha: '2025-09-13', horaInicio: '09:00', horaFin: '13:00', ubicacion: 'Mall Plaza La Serena', guardia: 'Juan Pérez', estado: 'asignado' }, // 4h
        // Semana para María González
        { id: 7, fecha: '2025-09-08', horaInicio: '20:00', horaFin: '04:00', ubicacion: 'Edificio Corporativo', guardia: 'María González', estado: 'asignado' }, // 8h
        { id: 8, fecha: '2025-09-09', horaInicio: '20:00', horaFin: '04:00', ubicacion: 'Edificio Corporativo', guardia: 'María González', estado: 'asignado' }, // 8h
    ],
    notifications: [
        { id: 1, tipo: 'warning', mensaje: 'Curso OS-10 de Juan Pérez vence en 15 días', fecha: '2025-08-28' },
        { id: 2, tipo: 'info', mensaje: 'Nuevo estudiante inscrito en Seguridad Industrial', fecha: '2025-08-28' }
    ],
    calificaciones: [
        { materia: 'Legislación de Seguridad Privada', nota: 6.5, estado: 'Aprobado' },
        { materia: 'Prevención de Riesgos', nota: 5.8, estado: 'Aprobado' },
        { materia: 'Control de Emergencias', nota: 6.2, estado: 'Aprobado' },
        { materia: 'Primeros Auxilios', nota: 7.0, estado: 'Aprobado' },
        { materia: 'Defensa Personal', nota: 5.5, estado: 'Aprobado' }
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

    const chatbotFab = document.getElementById('chatbot-fab');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    if (chatbotFab) {
        chatbotFab.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });
    }

    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const messageText = chatbotInput.value.trim();
        if (messageText === '') return;

        appendMessage(messageText, 'user-message');
        chatbotInput.value = '';

        setTimeout(() => {
            botResponse(messageText);
        }, 500);
    }

    function appendMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', className);
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function botResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response = 'No entiendo tu pregunta. ¿Puedes reformularla?';

        if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('buenos dias')) {
            response = '¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte?';
        } else if (lowerCaseMessage.includes('servicios')) {
            response = 'Ofrecemos servicios de Seguridad Privada y Capacitación OTEC. ¿Cuál te interesa?';
        } else if (lowerCaseMessage.includes('seguridad')) {
            response = 'Nuestros servicios de seguridad incluyen guardias, gestión de turnos y más. Puedes encontrar más información en la sección de Seguridad.';
        } else if (lowerCaseMessage.includes('capacitación') || lowerCaseMessage.includes('cursos')) {
            response = 'Tenemos una variedad de cursos de capacitación, incluyendo la certificación OS10. Visita nuestra sección de Capacitación para más detalles.';
        } else if (lowerCaseMessage.includes('contacto')) {
            response = 'Puedes contactarnos a través del formulario en la sección de Contacto, o llamarnos al +56 9 1234 5678.';
        } else if (lowerCaseMessage.includes('gracias')) {
            response = '¡De nada! Estoy aquí para ayudarte.';
        }

        appendMessage(response, 'bot-message');
    }
    
    // Initial bot message
    setTimeout(() => {
        if(chatbotMessages && !chatbotMessages.hasChildNodes()) {
             appendMessage('¡Hola! Soy tu asistente virtual. ¿Cómo puedo ayudarte hoy?', 'bot-message');
        }
    }, 2000);
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
    notif.style.position = 'fixed';
    notif.style.top = '20px';
    notif.style.left = '20px';
    notif.style.background = '#ff6d00';
    notif.style.color = 'white';
    notif.style.padding = '15px 20px';
    notif.style.borderRadius = '8px';
    notif.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    notif.style.zIndex = '1000';
    notif.style.maxWidth = '300px';
    notif.style.fontFamily = "'Poppins', sans-serif";
    notif.innerHTML = `
        <strong>¡Bienvenido!</strong> Explora nuestros servicios de seguridad y capacitación.
        <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;">×</button>
    `;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    }, 25000);
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
    const hamburgerBtn = document.querySelector('.private-hamburger-menu-btn');

    const isOpen = sidebar.classList.contains('open');

    if (show === null) {
        sidebar.classList.toggle('open');
        mainContent.classList.toggle('sidebar-open');
        if (hamburgerBtn) hamburgerBtn.classList.toggle('active');
    } else if (show) {
        sidebar.classList.add('open');
        mainContent.classList.add('sidebar-open');
        if (hamburgerBtn) hamburgerBtn.classList.add('active');
    }
    else {
        sidebar.classList.remove('open');
        mainContent.classList.remove('sidebar-open');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
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
        case 'mis-cursos-guardia':
            mainContent.innerHTML = renderMisCursosGuardia();
            break;
        case 'ordenes-trabajo':
            mainContent.innerHTML = renderOrdenesTrabajo();
            break;
        case 'mi-contrato':
            mainContent.innerHTML = renderMiContrato();
            break;
        case 'horarios':
            mainContent.innerHTML = renderHorarios();
            break;
        case 'calificaciones':
            mainContent.innerHTML = renderCalificaciones();
            break;
        case 'examen-practica':
            mainContent.innerHTML = renderExamenPractica();
            setupExamEventListeners();
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

function getGuardiaStatus(fechaExamen) {
    if (!fechaExamen) {
        return { text: 'Sin Datos', className: 'badge-secondary' };
    }
    const examDate = new Date(fechaExamen);
    const expirationDate = new Date(examDate.valueOf());
    expirationDate.setFullYear(expirationDate.getFullYear() + 3);

    const today = new Date();
    const thirtyDaysBeforeExpiry = new Date(expirationDate.valueOf());
    thirtyDaysBeforeExpiry.setDate(thirtyDaysBeforeExpiry.getDate() - 30);

    if (today > expirationDate) {
        return { text: 'Vencido', className: 'badge-danger' };
    }
    if (today >= thirtyDaysBeforeExpiry) {
        return { text: 'Por Vencer', className: 'badge-warning' };
    }
    return { text: 'Vigente', className: 'badge-success' };
}

function renderGestionGuardias() {
    const tableRows = mockData.guardias.map(guardia => {
        const status = getGuardiaStatus(guardia.curso.fechaRealizacion);
        return `
            <tr>
                <td>${guardia.nombre}</td>
                <td class="rut-column">${guardia.rut}</td>
                <td><span class="badge ${status.className}">${status.text}</span></td>
                <td class="date-column">${new Date(guardia.curso.fechaRealizacion).toLocaleDateString('es-CL')}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="openGuardiaModal(${guardia.id})" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteGuardia(${guardia.id})" title="Eliminar"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');

    return `
        <h2 class="text-3xl font-bold mb-8">Gestión de Guardias</h2>
        <button class="btn btn-primary mb-4" onclick="openGuardiaModal()"><i class="fas fa-plus"></i> Nuevo Guardia</button>
        <div class="card">
            <div class="card-content">
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Guardia</th>
                                <th class="rut-column">RUT</th>
                                <th>Estado Cert.</th>
                                <th class="date-column">Fecha Examen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="guardiaModal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeGuardiaModal()">&times;</span>
                <h2 id="guardiaModalTitle">Nuevo Guardia</h2>
                <form id="guardiaForm" onsubmit="handleGuardiaFormSubmit(event)">
                    <input type="hidden" id="guardiaId">
                    <div class="form-group">
                        <label for="nombreGuardia">Nombre Completo</label>
                        <input type="text" id="nombreGuardia" required>
                    </div>
                    <div class="form-group">
                        <label for="rutGuardia">RUT</label>
                        <input type="text" id="rutGuardia" required>
                    </div>
                    <div class="form-group">
                        <label for="emailGuardia">Correo Electrónico</label>
                        <input type="email" id="emailGuardia" required>
                    </div>
                    <div class="form-group">
                        <label for="fechaExamenGuardia">Fecha de Realización del Examen</label>
                        <input type="date" id="fechaExamenGuardia" required>
                    </div>
                    <button type="submit" class="btn">Guardar</button>
                </form>
            </div>
        </div>
    `;
}

function openGuardiaModal(id = null) {
    const modal = document.getElementById('guardiaModal');
    const form = document.getElementById('guardiaForm');
    const title = document.getElementById('guardiaModalTitle');
    form.reset();

    if (id) {
        const guardia = mockData.guardias.find(g => g.id === id);
        if (guardia) {
            title.textContent = 'Editar Guardia';
            document.getElementById('guardiaId').value = guardia.id;
            document.getElementById('nombreGuardia').value = guardia.nombre;
            document.getElementById('rutGuardia').value = guardia.rut;
            document.getElementById('emailGuardia').value = guardia.email;
            document.getElementById('fechaExamenGuardia').value = guardia.curso.fechaRealizacion;
        }
    } else {
        title.textContent = 'Nuevo Guardia';
        document.getElementById('guardiaId').value = '';
    }

    modal.classList.add('active');
}

function closeGuardiaModal() {
    document.getElementById('guardiaModal').classList.remove('active');
}

function handleGuardiaFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('guardiaId').value;
    const nombre = document.getElementById('nombreGuardia').value;
    const rut = document.getElementById('rutGuardia').value;
    const email = document.getElementById('emailGuardia').value;
    const fechaExamen = document.getElementById('fechaExamenGuardia').value;

    if (id) {
        // Update existing guard
        const index = mockData.guardias.findIndex(g => g.id == id);
        if (index !== -1) {
            mockData.guardias[index].nombre = nombre;
            mockData.guardias[index].rut = rut;
            mockData.guardias[index].email = email;
            mockData.guardias[index].curso.fechaRealizacion = fechaExamen;
        }
    } else {
        // Add new guard
        const newGuardia = {
            id: Date.now(), // Simple unique ID
            nombre: nombre,
            rut: rut,
            email: email,
            curso: {
                nombre: 'OS-10 Formación (Nuevo)',
                fechaRealizacion: fechaExamen,
                institucion: 'Pendiente'
            },
            contrato: 'Contrato pendiente de redacción.'
        };
        mockData.guardias.push(newGuardia);
    }

    closeGuardiaModal();
    updateMainContent();
}

function deleteGuardia(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este guardia?')) {
        mockData.guardias = mockData.guardias.filter(g => g.id !== id);
        updateMainContent();
    }
}

function renderGestionCursos() {
    return `
        <h2 class="text-3xl font-bold mb-8">Gestión de Cursos</h2>
        <button class="btn btn-primary mb-4">Nuevo Curso</button>
        <div class="card">
            <div class="card-content">
                <div class="table-container">
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
                <div class="table-container">
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
                                    <td>${turno.horaInicio} - ${turno.horaFin}</td>
                                    <td>${turno.ubicacion}</td>
                                    <td><span class="badge badge-success">${turno.estado}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderMisCursosGuardia() {
    const guardia = mockData.guardias[0]; // Simulating logged in user as Juan Pérez
    const curso = guardia.curso;

    if (!curso) {
        return `
            <h2 class="text-3xl font-bold mb-8">Mis Cursos</h2>
            <div class="card"><div class="card-content"><p>No tienes cursos asignados.</p></div></div>
        `;
    }

    const fechaRealizacion = new Date(curso.fechaRealizacion);
    const fechaVencimiento = new Date(fechaRealizacion.valueOf());
    fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 3);

    const hoy = new Date();
    // Set hours to 0 to compare dates only
    hoy.setHours(0, 0, 0, 0);
    fechaVencimiento.setHours(0, 0, 0, 0);

    const diffTime = fechaVencimiento - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let statusClass = '';
    let statusText = '';
    let diasRestantesText = '';

    if (diffDays < 0) {
        statusClass = 'status-rojo';
        statusText = 'VENCIDO';
        diasRestantesText = `Venció hace ${Math.abs(diffDays)} días`;
    } else if (diffDays <= 30) {
        statusClass = 'status-amarillo';
        statusText = 'POR VENCER';
        diasRestantesText = `Quedan ${diffDays} días`;
    } else {
        statusClass = 'status-verde';
        statusText = 'VIGENTE';
        diasRestantesText = `Quedan ${diffDays} días`;
    }

    return `
        <h2 class="text-3xl font-bold mb-8">Mis Cursos</h2>
        <div class="course-card-guardia">
            <div class="course-header">
                <h3>${curso.nombre}</h3>
                <span class="course-status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="course-body">
                <p><strong><i class="fas fa-building"></i> Institución:</strong> ${curso.institucion}</p>
                <p><strong><i class="fas fa-calendar-alt"></i> Fecha Realización:</strong> ${new Date(curso.fechaRealizacion).toLocaleDateString('es-CL')}</p>
                <p><strong><i class="fas fa-calendar-times"></i> Fecha Vencimiento:</strong> ${fechaVencimiento.toLocaleDateString('es-CL')}</p>
            </div>
            <div class="course-footer ${statusClass}">
                <p><i class="fas fa-hourglass-half"></i> ${diasRestantesText}</p>
            </div>
        </div>
    `;
}

function renderOrdenesTrabajo() {
    const guardiaNombre = 'Juan Pérez'; // Simulating logged in user
    
    // Helper to get the start of the current week (Monday)
    const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    };

    // Forcing a date to ensure we get the right week for the demo data
    const today = new Date('2025-09-10T12:00:00'); 
    const startOfWeek = getStartOfWeek(today);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const turnosSemanales = mockData.turnos.filter(turno => {
        const fechaTurno = new Date(turno.fecha + "T00:00:00");
        return turno.guardia === guardiaNombre && fechaTurno >= startOfWeek && fechaTurno <= endOfWeek;
    });

    const calcularHoras = (inicio, fin) => {
        const [h1, m1] = inicio.split(':').map(Number);
        const [h2, m2] = fin.split(':').map(Number);
        const fechaInicio = new Date(0, 0, 0, h1, m1);
        const fechaFin = new Date(0, 0, 0, h2, m2);
        if (fechaFin < fechaInicio) { // Turno nocturno que pasa la medianoche
            fechaFin.setDate(fechaFin.getDate() + 1);
        }
        return (fechaFin - fechaInicio) / (1000 * 60 * 60);
    };

    let totalHorasSemanales = 0;
    const turnosHtml = turnosSemanales.map(turno => {
        const horasTurno = calcularHoras(turno.horaInicio, turno.horaFin);
        totalHorasSemanales += horasTurno;
        const diaSemana = new Date(turno.fecha + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' });

        return `
            <li class="turno-item">
                <div class="turno-fecha">
                    <span class="dia-semana">${diaSemana.split(',')[0]}</span>
                    <span class="fecha-num">${diaSemana.split(' ')[1]} ${diaSemana.split(' ')[3]}</span>
                </div>
                <div class="turno-info">
                    <p class="ubicacion"><i class="fas fa-map-marker-alt"></i> ${turno.ubicacion}</p>
                    <p class="horario"><i class="fas fa-clock"></i> ${turno.horaInicio} - ${turno.horaFin}</p>
                </div>
                <div class="turno-horas">
                    <span>${horasTurno.toFixed(1)} hrs</span>
                </div>
            </li>
        `;
    }).join('');

    const totalHorasClass = totalHorasSemanales > 44 ? 'horas-excedidas' : 'horas-ok';

    return `
        <h2 class="text-3xl font-bold mb-8">Órdenes de Trabajo Semanales</h2>
        <div class="card ordenes-trabajo-container">
            <div class="card-content">
                <h3 class="week-title">Semana del ${startOfWeek.toLocaleDateString('es-CL')} al ${endOfWeek.toLocaleDateString('es-CL')}</h3>
                <ul class="turnos-list">
                    ${turnosHtml.length ? turnosHtml : '<li class="no-turnos">No hay turnos asignados para esta semana.</li>'}
                </ul>
                <div class="total-horas-summary ${totalHorasClass}">
                    <h4>Total Horas Semanales</h4>
                    <p>${totalHorasSemanales.toFixed(1)} / 44.0 hrs</p>
                </div>
            </div>
        </div>
    `;
}

function renderMiContrato() {
    const guardia = mockData.guardias[0]; // Simulating logged in user
    const contrato = guardia.contrato || 'No se ha cargado un contrato.';

    return `
        <h2 class="text-3xl font-bold mb-8">Mi Contrato</h2>
        <div class="card">
            <div class="card-content">
                <div class="contract-container">
                    <div class="contract-header">
                        <h3>Contrato de Trabajo Individual</h3>
                        <p><strong>Empleado:</strong> ${guardia.nombre}</p>
                        <p><strong>RUT:</strong> ${guardia.rut}</p>
                    </div>
                    <div class="contract-body">
                        <pre>${contrato}</pre>
                    </div>
                     <div class="contract-footer">
                        <button class="btn btn-primary" onclick="downloadContractAsPDF()"><i class="fas fa-download"></i> Descargar Copia en PDF</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function renderMisCursos() {
    const coursesHtml = mockData.cursos.map(curso => `
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
    `).join('');

    return `
        <h2 class="text-3xl font-bold mb-8">Mis Cursos</h2>
        <div class="grid grid-cols-2">${coursesHtml}</div>
        <div class="card mt-8">
            <div class="card-content">
                <h3 class="text-xl font-bold mb-4">Examen de Práctica OS-10</h3>
                <p>Pon a prueba tus conocimientos y prepárate para la certificación.</p>
                <button class="btn btn-success mt-4" onclick="navigateToSection('examen-practica')">Acceder al Examen</button>
            </div>
        </div>
    `;
}

function renderHorarios() {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const hours = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
    const schedule = {
        Lunes: { '09:00': 'Legislación Laboral', '11:00': 'Defensa Personal' },
        Martes: { '11:00': 'Primeros Auxilios' },
        Miércoles: { '09:00': 'Legislación Laboral', '11:00': 'Defensa Personal' },
        Jueves: { '11:00': 'Primeros Auxilios' },
        Viernes: { '09:00': 'Control de Emergencias' }
    };

    let headerHtml = '<th class="time-col">Hora</th>';
    days.forEach(day => {
        headerHtml += `<th>${day}</th>`;
    });

    let bodyHtml = '';
    hours.forEach(hour => {
        bodyHtml += `<tr><td class="time-col">${hour}</td>`;
        days.forEach(day => {
            const event = schedule[day] && schedule[day][hour];
            if (event) {
                bodyHtml += `<td class="class-event">${event}</td>`;
            } else {
                bodyHtml += `<td></td>`;
            }
        });
        bodyHtml += '</tr>';
    });

    return `
        <h2 class="text-3xl font-bold mb-8">Horario de Clases</h2>
        <div class="card">
            <div class="card-content">
                <div class="calendar-container">
                    <table class="calendar-table">
                        <thead><tr>${headerHtml}</tr></thead>
                        <tbody>${bodyHtml}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderCalificaciones() {
    const courseGradesHtml = mockData.calificaciones.map(grade => `
        <tr>
            <td>${grade.materia}</td>
            <td>${grade.nota}</td>
            <td><span class="badge ${grade.nota >= 4.0 ? 'badge-success' : 'badge-danger'}">${grade.estado}</span></td>
        </tr>
    `).join('');

    const examHistoryHtml = examHistory.slice(-5).reverse().map(result => `
        <tr>
            <td>${result.date}</td>
            <td>${result.score}/${result.maxScore}</td>
            <td>${result.percentage.toFixed(1)}%</td>
            <td><span class="badge ${result.grade >= 4.0 ? 'badge-success' : 'badge-danger'}">${result.grade.toFixed(1)}</span></td>
        </tr>
    `).join('');

    return `
        <h2 class="text-3xl font-bold mb-8">Mis Calificaciones</h2>
        <div class="card mb-8">
            <div class="card-content">
                <div class="table-container">
                    <table class="table">
                        <thead><tr><th>Materia</th><th>Nota</th><th>Estado</th></tr></thead>
                        <tbody>${courseGradesHtml}</tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <h3 class="text-xl font-bold mb-4">Historial de Exámenes de Práctica (Últimos 5)</h3>
                <div class="table-container">
                    <table class="table">
                        <thead><tr><th>Fecha</th><th>Puntaje</th><th>Porcentaje</th><th>Nota</th></tr></thead>
                        <tbody>${examHistoryHtml.length ? examHistoryHtml : '<tr><td colspan="4" class="text-center">No hay exámenes registrados.</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderExamenPractica() {
    return `
        <h2 id="examen-practica-titulo" class="text-3xl font-bold mb-8">Examen de Práctica OS-10</h2>
        <div class="card" id="simulacros-container">
            <div class="card-content">
                <h3 class="text-xl font-bold mb-4">Simulacros Disponibles</h3>
                <div class="space-y-4">
                    <div class="exam-choice-card" style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; min-height: 150px;">
                        <h4 class="font-bold">Examen Básico OS-10</h4>
                        <p class="text-sm" style="color: #6b7280;">50 preguntas - 60 minutos</p>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-sm" style="color: #6b7280;">Último intento: 85%</span>
                            <button class="btn btn-primary" id="start-quiz-basic">Iniciar</button>
                        </div>
                    </div>
                    <div class="exam-choice-card" style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; min-height: 150px;">
                        <h4 class="font-bold">Examen Avanzado OS-10</h4>
                        <p class="text-sm" style="color: #6b7280;">50 preguntas - 90 minutos</p>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-sm" style="color: #6b7280;">Sin intentos</span>
                            <button class="btn btn-success" id="start-quiz-advanced">Iniciar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Contenedor del examen (inicialmente oculto) -->
        <div id="quiz-exam-container" style="display: none;">
            <section id="exam-section" class="mt-5">
                <h2 class="text-center exam-heading-green">Examen de Preparación OS-10</h2>
                <p class="text-center exam-intro-text">Pon a prueba tus conocimientos sobre la normativa de seguridad privada y las funciones del guardia. ¡Obtén tu calificación en escala del 1 al 7, basada en el curso OS-10!</p>
                <p class="text-center exam-intro-text" style="color: #dc3545; font-weight: 600; font-size: 0.9rem;">
                    <i class="bi bi-exclamation-triangle"></i> 
                    <strong>IMPORTANTE:</strong> Este examen consta de 50 preguntas. Una vez que selecciones una respuesta, no podrás cambiarla. Lee cuidadosamente antes de responder.
                </p>
                
                <button id="start-exam-btn" class="mb-4">Empezar Examen Ahora</button>

                <div id="quiz-container" class="mt-4" style="display: none;"></div>
                <div class="exam-controls">
                    <button id="submit-quiz-btn" style="display: none;">Enviar Examen</button>
                </div>
                <div id="subtle-response-box" class="subtle-response-box"></div>
            </section>
        </div>

        <!-- Modal de resultados -->
        <div id="results-modal-overlay" style="display: none;">
            <div id="results-modal-content">
                <h3>Results del Examen</h3>
                <p>Respuestas correctas: <span id="modal-correct-count"></span> de <span id="modal-total-questions"></span></p>
                <p>Porcentaje: <span id="modal-percentage"></span>%</p>
                <p>Tu nota en escala del 1 al 7: <strong id="modal-grade"></strong></p>
                <p id="modal-message"></p>
                <button id="close-modal-btn">Cerrar</button>
            </div>
        </div>
    `;
}

// FUNCIÓN CRÍTICA: Configurar event listeners del examen
function setupExamEventListeners() {
    const startQuizBasic = document.getElementById('start-quiz-basic');
    const startQuizAdvanced = document.getElementById('start-quiz-advanced');
    
    if (startQuizBasic) {
        startQuizBasic.addEventListener('click', initializeExam);
    }
    
    if (startQuizAdvanced) {
        startQuizAdvanced.addEventListener('click', initializeExam);
    }
}

// FUNCIÓN CRÍTICA: Inicializar el examen correctamente
function initializeExam() {
    // Ocultar el contenedor de simulacros disponibles
    const simulacrosContainer = document.getElementById('simulacros-container');
    if (simulacrosContainer) {
        simulacrosContainer.style.display = 'none';
    }

    // Mostrar el contenedor del examen
    const quizContainer = document.getElementById('quiz-exam-container');
    if (quizContainer) {
        quizContainer.style.display = 'block';
    }
    
    // Configurar event listeners para los botones del examen
    const startExamBtn = document.getElementById('start-exam-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    if (startExamBtn) {
        // Remover listeners previos para evitar duplicados
        startExamBtn.removeEventListener('click', startExamFromPrivatePanel);
        startExamBtn.addEventListener('click', startExamFromPrivatePanel);
    }
    
    if (submitQuizBtn) {
        submitQuizBtn.removeEventListener('click', submitExamFromPrivatePanel);
        submitQuizBtn.addEventListener('click', submitExamFromPrivatePanel);
    }
    
    if (closeModalBtn) {
        closeModalBtn.removeEventListener('click', closeExamModal);
        closeModalBtn.addEventListener('click', closeExamModal);
    }
}

// FUNCIÓN CRÍTICA: Iniciar examen desde panel privado
function startExamFromPrivatePanel() {
    // Verificar que las funciones del examen.js estén disponibles
    if (typeof generateQuestionsCategorized === 'function') {
        generateQuestionsCategorized();
    } else {
        console.error('Las funciones del examen no están disponibles. Verifique que examen.js esté cargado correctamente.');
        alert('Error: No se pudo cargar el sistema de examen. Por favor, recargue la página.');
    }
}

// FUNCIÓN CRÍTICA: Enviar examen desde panel privado
function submitExamFromPrivatePanel() {
    if (typeof submitCategorizedQuiz === 'function') {
        const result = submitCategorizedQuiz();
        if (result) {
            examHistory.push(result);
        }
    } else {
        console.error('La función submitCategorizedQuiz no está disponible.');
        alert('Error: No se pudo enviar el examen. Por favor, recargue la página.');
    }
}

// FUNCIÓN CRÍTICA: Cerrar modal del examen
function closeExamModal() {
    const resultsModalOverlay = document.getElementById('results-modal-overlay');
    if (resultsModalOverlay) {
        resultsModalOverlay.classList.remove('show');
        resultsModalOverlay.style.display = 'none';
    }
    
    // Resetear el examen
    const quizContainer = document.getElementById('quiz-container');
    const startExamBtn = document.getElementById('start-exam-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    
    if (quizContainer) {
        quizContainer.style.display = 'none';
        quizContainer.innerHTML = '';
    }
    
    if (startExamBtn) {
        startExamBtn.style.display = 'block';
    }
    
    if (submitQuizBtn) {
        submitQuizBtn.style.display = 'none';
    }
    
    // Limpiar variables globales del examen si están definidas
    if (typeof questions !== 'undefined') {
        questions = [];
    }
    if (typeof userAnswers !== 'undefined') {
        userAnswers = {};
    }
}

// Función para descargar el contrato en PDF
function downloadContractAsPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const guard = mockData.guardias[0]; // Simula que Juan Pérez ha iniciado sesión
        const contractText = guard.contrato || 'No hay contrato disponible.';
        const fileName = `Contrato_${guard.nombre.replace(' ', '_')}.pdf`;
        
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        
        // Márgenes
        const margin = 15;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const usableWidth = pageWidth - (margin * 2);
        
        // Encabezado
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Contrato de Trabajo", pageWidth / 2, margin, { align: 'center' });
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.text(`Empleado: ${guard.nombre}`, margin, margin + 10);
        pdf.text(`RUT: ${guard.rut}`, margin, margin + 15);
        
        // Cuerpo del contrato
        const textLines = pdf.splitTextToSize(contractText, usableWidth);
        pdf.text(textLines, margin, margin + 25);
        
        pdf.save(fileName);
    } catch (error) {
        console.error("Error al generar PDF:", error);
        alert("No se pudo generar el PDF. Asegúrese de que la librería jsPDF está cargada correctamente.");
    }
}
