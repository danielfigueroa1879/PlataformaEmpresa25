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
        { id: 1, nombre: 'Juan Pérez', rut: '12345678-9', email: 'juan@example.com', fechaExamen: '2022-10-15' },
        { id: 2, nombre: 'María González', rut: '98765432-1', email: 'maria@example.com', fechaExamen: '2024-08-01' }
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
    const today = new Date();
    const threeYearsFromExam = new Date(new Date(examDate).setFullYear(examDate.getFullYear() + 3));
    const thirtyDaysBeforeExpiry = new Date(new Date(threeYearsFromExam).setDate(threeYearsFromExam.getDate() - 30));

    if (today > threeYearsFromExam) {
        return { text: 'Vencido', className: 'badge-danger' };
    }
    if (today >= thirtyDaysBeforeExpiry) {
        return { text: 'Por Vencer', className: 'badge-warning' };
    }
    return { text: 'Vigente', className: 'badge-success' };
}

function renderGestionGuardias() {
    const tableRows = mockData.guardias.map(guardia => {
        const status = getGuardiaStatus(guardia.fechaExamen);
        return `
            <tr>
                <td>${guardia.nombre}</td>
                <td>${guardia.rut}</td>
                <td><span class="badge ${status.className}">${status.text}</span></td>
                <td>${new Date(guardia.fechaExamen).toLocaleDateString('es-CL')}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="openGuardiaModal(${guardia.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteGuardia(${guardia.id})">Eliminar</button>
                </td>
            </tr>
        `;
    }).join('');

    return `
        <h2 class="text-3xl font-bold mb-8">Gestión de Guardias</h2>
        <button class="btn btn-primary mb-4" onclick="openGuardiaModal()">Nuevo Guardia</button>
        <div class="card">
            <div class="card-content">
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Guardia</th>
                                <th>RUT</th>
                                <th>Estado Certificado</th>
                                <th>Fecha Examen</th>
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
            document.getElementById('fechaExamenGuardia').value = guardia.fechaExamen;
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
    const guardiaData = {
        nombre: document.getElementById('nombreGuardia').value,
        rut: document.getElementById('rutGuardia').value,
        email: document.getElementById('emailGuardia').value,
        fechaExamen: document.getElementById('fechaExamenGuardia').value
    };

    if (id) {
        const index = mockData.guardias.findIndex(g => g.id == id);
        mockData.guardias[index] = { ...mockData.guardias[index], ...guardiaData };
    } else {
        guardiaData.id = Date.now(); // Simple unique ID
        mockData.guardias.push(guardiaData);
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
                                    <td>${turno.hora}</td>
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
