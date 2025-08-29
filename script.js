// Global Capacitación Limitada - JavaScript Functions

// Global state management
let currentUser = null;
let currentSection = 'home';
let documents = [];
let notifications = [];

// Mock data storage
const mockData = {
    guardias: [
        { 
            id: 1, 
            nombre: 'Juan Pérez', 
            rut: '12345678-9', 
            email: 'juan.perez@example.com', 
            estado: 'activo', 
            cursosVencen: 15,
            telefono: '+56 9 8765 4321',
            fechaContratacion: '2024-01-15',
            certificaciones: [
                { nombre: 'OS-10', estado: 'vigente', vencimiento: '2025-09-15' },
                { nombre: 'Primeros Auxilios', estado: 'vigente', vencimiento: '2026-01-20' }
            ]
        },
        { 
            id: 2, 
            nombre: 'María González', 
            rut: '98765432-1', 
            email: 'maria.gonzalez@example.com', 
            estado: 'activo', 
            cursosVencen: 30,
            telefono: '+56 9 1234 5678',
            fechaContratacion: '2024-02-01',
            certificaciones: [
                { nombre: 'OS-10', estado: 'vigente', vencimiento: '2025-10-15' },
                { nombre: 'Seguridad Industrial', estado: 'vigente', vencimiento: '2025-12-01' }
            ]
        }
    ],
    cursos: [
        { 
            id: 1, 
            nombre: 'Curso OS-10 Básico', 
            fechaInicio: '2025-09-15', 
            duracion: '40 horas', 
            precio: 150000, 
            estudiantes: 25,
            instructor: 'Carlos Mendoza',
            modalidad: 'Presencial',
            estado: 'activo'
        },
        { 
            id: 2, 
            nombre: 'Seguridad Industrial', 
            fechaInicio: '2025-09-20', 
            duracion: '60 horas', 
            precio: 200000, 
            estudiantes: 18,
            instructor: 'Ana López',
            modalidad: 'Mixta',
            estado: 'activo'
        },
        { 
            id: 3, 
            nombre: 'Primeros Auxilios', 
            fechaInicio: '2025-10-01', 
            duracion: '24 horas', 
            precio: 85000, 
            estudiantes: 32,
            instructor: 'Dr. Roberto Silva',
            modalidad: 'Presencial',
            estado: 'activo'
        }
    ],
    turnos: [
        { 
            id: 1, 
            fecha: '2025-08-29', 
            hora: '08:00-20:00', 
            ubicacion: 'Mall Plaza La Serena', 
            guardia: 'Juan Pérez', 
            guardiaId: 1,
            estado: 'asignado',
            cliente: 'Mall Plaza S.A.',
            observaciones: 'Turno diurno, control de acceso principal'
        },
        { 
            id: 2, 
            fecha: '2025-08-30', 
            hora: '20:00-08:00', 
            ubicacion: 'Edificio Corporativo', 
            guardia: 'María González', 
            guardiaId: 2,
            estado: 'asignado',
            cliente: 'Corporación ABC',
            observaciones: 'Turno nocturno, rondas cada 2 horas'
        }
    ],
    estudiantes: [
        {
            id: 1,
            nombre: 'Ana Estudiante',
            rut: '11223344-5',
            email: 'ana.estudiante@email.com',
            cursosInscritos: [1, 3],
            calificaciones: {
                1: { promedio: 85, examenes: [80, 90, 85] },
                3: { promedio: 92, examenes: [95, 88, 93] }
            }
        }
    ],
    notifications: [
        { 
            id: 1, 
            tipo: 'warning', 
            mensaje: 'Curso OS-10 de Juan Pérez vence en 15 días', 
            fecha: '2025-08-28',
            leida: false
        },
        { 
            id: 2, 
            tipo: 'info', 
            mensaje: 'Nuevo estudiante inscrito en Seguridad Industrial', 
            fecha: '2025-08-28',
            leida: false
        },
        { 
            id: 3, 
            tipo: 'success', 
            mensaje: 'Contrato firmado digitalmente por María González', 
            fecha: '2025-08-27',
            leida: true
        }
    ],
    servicios: [
        {
            id: 1,
            nombre: 'Vigilancia en Centros Comerciales',
            descripcion: 'Servicio especializado de seguridad para centros comerciales',
            tarifaHora: 8500,
            disponible: true
        },
        {
            id: 2,
            nombre: 'Seguridad Corporativa',
            descripcion: 'Protección integral para edificios corporativos',
            tarifaHora: 9200,
            disponible: true
        },
        {
            id: 3,
            nombre: 'Control de Acceso',
            descripcion: 'Gestión y control de accesos a instalaciones',
            tarifaHora: 7800,
            disponible: true
        }
    ]
};

// Menu configurations for different user roles
const menuConfig = {
    admin: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'gestionar-guardias', label: 'Gestionar Guardias', icon: 'fas fa-shield-alt' },
        { id: 'gestionar-cursos', label: 'Gestionar Cursos', icon: 'fas fa-book' },
        { id: 'turnos', label: 'Gestión de Turnos', icon: 'fas fa-calendar' },
        { id: 'servicios', label: 'Servicios', icon: 'fas fa-briefcase' },
        { id: 'documentos', label: 'Gestión Documental', icon: 'fas fa-file-alt' },
        { id: 'notificaciones', label: 'Notificaciones', icon: 'fas fa-bell' },
        { id: 'reportes', label: 'Reportes', icon: 'fas fa-chart-bar' }
    ],
    guardia: [
        { id: 'mi-perfil', label: 'Mi Perfil', icon: 'fas fa-user' },
        { id: 'mis-turnos', label: 'Mis Turnos', icon: 'fas fa-calendar' },
        { id: 'mis-cursos-guardia', label: 'Mis Cursos', icon: 'fas fa-book' },
        { id: 'ordenes-trabajo', label: 'Órdenes de Trabajo', icon: 'fas fa-tasks' },
        { id: 'mi-contrato', label: 'Mi Contrato', icon: 'fas fa-file-contract' },
        { id: 'mis-documentos', label: 'Mis Documentos', icon: 'fas fa-folder' }
    ],
    estudiante: [
        { id: 'mis-cursos', label: 'Mis Cursos', icon: 'fas fa-book' },
        { id: 'horarios', label: 'Horarios', icon: 'fas fa-calendar' },
        { id: 'calificaciones', label: 'Calificaciones', icon: 'fas fa-trophy' },
        { id: 'material-estudio', label: 'Material de Estudio', icon: 'fas fa-download' },
        { id: 'examen-practica', label: 'Examen de Práctica OS-10', icon: 'fas fa-clipboard-check' }
    ]
};

// Authentication functions
function openLogin() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLogin() {
    document.getElementById('loginModal').classList.add('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('userEmail').value;
    const role = document.getElementById('userRole').value;
    
    // Mock authentication - in real app, this would validate against backend
    currentUser = {
        id: 1,
        nombre: role === 'admin' ? 'Admin Global' : role === 'guardia' ? 'Juan Pérez' : 'Ana Estudiante',
        email: email,
        rol: role
    };
    
    // Set initial section based on role
    currentSection = role === 'admin' ? 'dashboard' : role === 'guardia' ? 'mi-perfil' : 'mis-cursos';
    
    closeLogin();
    updateUI();
    showNotification('success', `Bienvenido ${currentUser.nombre}!`);
}

function logout() {
    currentUser = null;
    currentSection = 'home';
    toggleSidebar(false);
    updateUI();
    showNotification('info', 'Sesión cerrada correctamente');
}

// UI Management functions
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
    updateUI();
    if (window.innerWidth <= 768) {
        toggleSidebar(false);
    }
}

function updateUI() {
    updateHeader();
    updateSidebar();
    updateMainContent();
}

function updateHeader() {
    const headerActions = document.getElementById('headerActions');
    
    if (!currentUser) {
        headerActions.innerHTML = `
            <button onclick="openLogin()" class="btn btn-primary">
                <i class="fas fa-sign-in-alt"></i>
                Iniciar Sesión
            </button>
        `;
    } else {
        const unreadNotifications = mockData.notifications.filter(n => !n.leida).length;
        headerActions.innerHTML = `
            <div class="flex items-center gap-4">
                <button onclick="toggleSidebar()" class="btn btn-secondary">
                    <i class="fas fa-bars"></i>
                </button>
                <span class="hidden md:inline">Bienvenido, ${currentUser.nombre}</span>
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <button onclick="showNotificationsPanel()" class="btn btn-secondary">
                            <i class="fas fa-bell"></i>
                            ${unreadNotifications > 0 ? `<span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${unreadNotifications}</span>` : ''}
                        </button>
                    </div>
                    <div style="width: 32px; height: 32px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-user" style="color: white; font-size: 14px;"></i>
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
    
    if (!currentUser) {
        mainContent.innerHTML = renderPublicHome();
        return;
    }

    // Route to appropriate content based on current section
    const contentMap = {
        'dashboard': renderAdminDashboard,
        'gestionar-guardias': renderGestionGuardias,
        'gestionar-cursos': renderGestionCursos,
        'turnos': renderGestionTurnos,
        'servicios': renderServicios,
        'documentos': renderGestionDocumental,
        'notificaciones': renderNotificaciones,
        'reportes': renderReportes,
        'mi-perfil': renderMiPerfil,
        'mis-turnos': renderMisTurnos,
        'mis-cursos-guardia': renderMisCursosGuardia,
        'ordenes-trabajo': renderOrdenesTrabajoGuardia,
        'mi-contrato': renderMiContrato,
        'mis-documentos': renderMisDocumentos,
        'mis-cursos': renderMisCursosEstudiante,
        'horarios': renderHorarios,
        'calificaciones': renderCalificaciones,
        'material-estudio': renderMaterialEstudio,
        'examen-practica': renderExamenPractica
    };

    const renderFunction = contentMap[currentSection] || renderSeccionEnDesarrollo;
    mainContent.innerHTML = renderFunction();
}

// Notification system
function showNotification(type, message, duration = 5000) {
    const toast = document.getElementById('notificationToast');
    const icon = document.getElementById('notificationIcon');
    const messageEl = document.getElementById('notificationMessage');
    
    // Set icon based on type
    const iconMap = {
        'success': 'fas fa-check-circle',
        'warning': 'fas fa-exclamation-triangle',
        'error': 'fas fa-times-circle',
        'info': 'fas fa-info-circle'
    };
    
    icon.className = iconMap[type] || 'fas fa-info-circle';
    messageEl.textContent = message;
    
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
        hideNotification();
    }, duration);
}

function hideNotification() {
    const toast = document.getElementById('notificationToast');
    toast.classList.remove('show');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 300);
}

// Document management functions
function openDocumentModal() {
    document.getElementById('documentModal').classList.remove('hidden');
}

function closeDocumentModal() {
    document.getElementById('documentModal').classList.add('hidden');
}

function handleDocumentUpload(event) {
    event.preventDefault();
    const title = document.getElementById('documentTitle').value;
    const type = document.getElementById('documentType').value;
    const file = document.getElementById('documentFile').files[0];
    const description = document.getElementById('documentDescription').value;
    
    if (file && title) {
        // Simulate document upload
        const document = {
            id: documents.length + 1,
            title,
            type,
            fileName: file.name,
            size: file.size,
            uploadDate: new Date().toISOString().split('T')[0],
            description,
            status: 'uploaded'
        };
        
        documents.push(document);
        closeDocumentModal();
        showNotification('success', 'Documento subido correctamente');
        
        // Clear form
        document.getElementById('documentTitle').value = '';
        document.getElementById('documentDescription').value = '';
        document.getElementById('documentFile').value = '';
    }
}

function requestDigitalSignature() {
    showNotification('info', 'Solicitud de firma digital enviada');
    closeDocumentModal();
}

// Render functions for different sections
function renderPublicHome() {
    return `
        <div class="hero">
            <div class="max-w-6xl mx-auto px-4">
                <h1>Servicios de Seguridad y Capacitación Profesional</h1>
                <p>Ofrecemos servicios integrales de seguridad privada y programas de capacitación especializados para formar guardias de seguridad certificados según normativa vigente.</p>
                <div class="flex justify-center gap-4 mt-8">
                    <button onclick="navigateToSection('servicios')" class="btn btn-primary">
                        <i class="fas fa-shield-alt"></i>
                        Ver Servicios
                    </button>
                    <button onclick="navigateToSection('cursos-publicos')" class="btn btn-secondary">
                        <i class="fas fa-book"></i>
                        Ver Cursos Disponibles
                    </button>
                </div>
            </div>
        </div>

        <div class="services">
            <div class="max-w-6xl mx-auto px-4">
                <div class="text-center mb-8">
                    <h3 class="text-3xl font-bold mb-4">Nuestros Servicios</h3>
                    <p class="text-xl">Soluciones integrales para su seguridad y capacitación</p>
                </div>
                
                <div class="grid grid-cols-2 gap-8">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">Servicios de Seguridad</h4>
                        <ul class="space-y-4">
                            <li>• Vigilancia en centros comerciales</li>
                            <li>• Seguridad corporativa</li>
                            <li>• Control de acceso</li>
                            <li>• Rondas de seguridad</li>
                            <li>• Servicios especiales de eventos</li>
                            <li>• Monitoreo y videovigilancia</li>
                        </ul>
                    </div>
                    
                    <div class="service-card green">
                        <div class="service-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">Capacitación OTEC</h4>
                        <ul class="space-y-4">
                            <li>• Curso OS-10 (Guardia de Seguridad)</li>
                            <li>• Seguridad Industrial</li>
                            <li>• Primeros Auxilios</li>
                            <li>• Manejo de Crisis</li>
                            <li>• Certificaciones especializadas</li>
                            <li>• Cursos corporativos a medida</li>
                        </ul>
                    </div>
                </div>
                
                <div class="text-center mt-12">
                    <h3 class="text-2xl font-bold mb-6">¿Por qué elegir Global Capacitación?</h3>
                    <div class="grid grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-4xl mb-4" style="color: #3b82f6;">
                                <i class="fas fa-certificate"></i>
                            </div>
                            <h4 class="font-bold mb-2">Certificación Oficial</h4>
                            <p class="text-sm">Cursos certificados y reconocidos por SENCE</p>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl mb-4" style="color: #10b981;">
                                <i class="fas fa-users"></i>
                            </div>
                            <h4 class="font-bold mb-2">Experiencia</h4>
                            <p class="text-sm">Más de 10 años formando profesionales</p>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl mb-4" style="color: #f59e0b;">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h4 class="font-bold mb-2">Disponibilidad</h4>
                            <p class="text-sm">Servicios 24/7 todos los días del año</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAdminDashboard() {
    const totalGuardias = mockData.guardias.length;
    const cursosActivos = mockData.cursos.filter(c => c.estado === 'activo').length;
    const turnosHoy = mockData.turnos.filter(t => t.fecha === '2025-08-29').length;
    const alertas = mockData.notifications.filter(n => !n.leida).length;
    
    return `
        <h2 class="text-3xl font-bold mb-8">Panel de Control Administrativo</h2>
        
        <div class="grid grid-cols-4 mb-8">
            <div class="stat-card blue">
                <div>
                    <p style="opacity: 0.8;">Total Guardias</p>
                    <p class="stat-number">${totalGuardias}</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
            </div>
            
            <div class="stat-card green">
                <div>
                    <p style="opacity: 0.8;">Cursos Activos</p>
                    <p class="stat-number">${cursosActivos}</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-book"></i>
                </div>
            </div>
            
            <div class="stat-card orange">
                <div>
                    <p style="opacity: 0.8;">Turnos Hoy</p>
                    <p class="stat-number">${turnosHoy}</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-calendar"></i>
                </div>
            </div>
            
            <div class="stat-card red">
                <div>
                    <p style="opacity: 0.8;">Alertas</p>
                    <p class="stat-number">${alertas}</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-bell"></i>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 mb-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold">Alertas de Certificaciones</h3>
                </div>
                <div class="card-content">
                    ${mockData.guardias.map(guardia => `
                        <div class="p-4 mb-4" style="background-color: ${guardia.cursosVencen <= 30 ? '#fef3c7' : '#dcfce7'}; border-radius: 0.5rem;">
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="font-bold">${guardia.nombre}</p>
                                    <p class="text-sm">Certificación OS-10 vence en ${guardia.cursosVencen} días</p>
                                </div>
                                <i class="fas fa-${guardia.cursosVencen <= 30 ? 'exclamation-triangle' : 'check-circle'}" style="color: ${guardia.cursosVencen <= 30 ? '#d97706' : '#059669'};"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold">Turnos de Hoy</h3>
                </div>
                <div class="card-content">
                    ${mockData.turnos.filter(t => t.fecha === '2025-08-29').map(turno => `
                        <div class="p-4 mb-4" style="background-color: #dbeafe; border-radius: 0.5rem;">
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="font-bold">${turno.ubicacion}</p>
                                    <p class="text-sm">${turno.guardia} - ${turno.hora}</p>
                                    <p class="text-xs" style="color: #6b7280;">${turno.cliente}</p>
                                </div>
                                <span class="badge badge-success">${turno.estado}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-3">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-lg font-bold">Resumen Mensual</h3>
                </div>
                <div class="card-content">
                    <div class="space-y-4">
                        <div class="flex justify-between">
                            <span>Ingresos Agosto</span>
                            <span class="font-bold">$7.850.000</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Nuevos Contratos</span>
                            <span class="font-bold">12</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Estudiantes Activos</span>
                            <span class="font-bold">75</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="text-lg font-bold">Acciones Rápidas</h3>
                </div>
                <div class="card-content">
                    <div class="space-y-4">
                        <button onclick="navigateToSection('gestionar-guardias')" class="btn btn-primary w-full">
                            <i class="fas fa-plus"></i>
                            Nuevo Guardia
                        </button>
                        <button onclick="navigateToSection('gestionar-cursos')" class="btn btn-success w-full">
                            <i class="fas fa-plus"></i>
                            Nuevo Curso
                        </button>
                        <button onclick="openDocumentModal()" class="btn btn-warning w-full">
                            <i class="fas fa-upload"></i>
                            Subir Documento
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="text-lg font-bold">Próximos Vencimientos</h3>
                </div>
                <div class="card-content">
                    <div class="space-y-3">
                        ${mockData.guardias.filter(g => g.cursosVencen <= 45).map(guardia => `
                            <div class="text-sm p-2" style="background-color: #f3f4f6; border-radius: 0.5rem;">
                                <div class="font-bold">${guardia.nombre}</div>
                                <div style="color: #6b7280;">OS-10 - ${guardia.cursosVencen} días</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Additional render functions would continue here...
// For brevity, I'll add the most important ones

function renderSeccionEnDesarrollo() {
    return `
        <div class="text-center py-16">
            <div class="card max-w-md mx-auto">
                <div class="card-content">
                    <i class="fas fa-tools text-4xl mb-4" style="color: #6b7280;"></i>
                    <h3 class="text-xl font-bold mb-4">Sección en Desarrollo</h3>
                    <p style="color: #6b7280;">Esta funcionalidad estará disponible pronto. Estamos trabajando para ofrecerte la mejor experiencia.</p>
                </div>
            </div>
        </div>
    `;
}

// Initialize application
function init() {
    updateUI();
    
    // Handle responsive sidebar
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && currentUser) {
            toggleSidebar(true);
        } else if (window.innerWidth <= 768) {
            toggleSidebar(false);
        }
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        const loginModal = document.getElementById('loginModal');
        const documentModal = document.getElementById('documentModal');
        
        if (event.target === loginModal) {
            closeLogin();
        }
        if (event.target === documentModal) {
            closeDocumentModal();
        }
    });
}

// Start application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
