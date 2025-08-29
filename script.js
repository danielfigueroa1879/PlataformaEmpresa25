</tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderGestionCursos() {
    const totalEstudiantes = mockData.cursos.reduce((sum, curso) => sum + curso.estudiantes, 0);
    const ingresoTotal = mockData.cursos.reduce((sum, curso) => sum + (curso.precio * curso.estudiantes), 0);
    
    return `
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-4xl font-bold text-gray-800 mb-2">Administración de Cursos OTEC</h2>
                    <p class="text-gray-600">Gestión completa de programas de capacitación y certificación</p>
                </div>
                <button class="btn btn-success">
                    <i class="fas fa-plus-circle"></i>
                    Crear Nuevo Curso
                </button>
            </div>
        </div>
        
        <div class="grid grid-cols-4 mb-8">
            <div class="card">
                <div class="card-content text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${mockData.cursos.length}</div>
                    <div class="text-gray-600">Cursos Activos</div>
                    <div class="text-sm text-gray-500 mt-1">Programas en ejecución</div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-content text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">${totalEstudiantes}</div>
                    <div class="text-gray-600">Estudiantes</div>
                    <div class="text-sm text-gray-500 mt-1">Total inscritos</div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-content text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">95%</div>
                    <div class="text-gray-600">Aprobación</div>
                    <div class="text-sm text-gray-500 mt-1">Promedio general</div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-content text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">${(ingresoTotal/1000000).toFixed(1)}M</div>
                    <div class="text-gray-600">Ingresos</div>
                    <div class="text-sm text-gray-500 mt-1">Total proyectado</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">Catálogo de Cursos</h3>
                    <div class="flex gap-2">
                        <button class="btn btn-secondary">
                            <i class="fas fa-calendar"></i>
                            Calendario
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-chart-bar"></i>
                            Reportes
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Información del Curso</th>
                                <th>Instructor</th>
                                <th>Modalidad</th>
                                <th>Estudiantes</th>
                                <th>Inversión</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.cursos.map(curso => `
                                <tr>
                                    <td>
                                        <div>
                                            <div class="font-bold text-gray-800">${curso.nombre}</div>
                                            <div class="text-sm text-gray-600">Inicio: ${curso.fechaInicio}</div>
                                            <div class="text-sm text-gray-600">Duración: ${curso.duracion}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="text-sm">
                                            <div class="font-semibold">${curso.instructor}</div>
                                            <div class="text-gray-600">Especialista certificado</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge ${curso.modalidad === 'Presencial' ? 'badge-info' : 'badge-warning'}">
                                            ${curso.modalidad}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <div class="text-lg font-bold text-blue-600">${curso.estudiantes}</div>
                                        <div class="text-xs text-gray-600">inscritos</div>
                                    </td>
                                    <td class="text-right">
                                        <div class="font-bold">${curso.precio.toLocaleString()}</div>
                                        <div class="text-sm text-gray-600">por persona</div>
                                    </td>
                                    <td>
                                        <span class="badge badge-success">
                                            <i class="fas fa-play mr-1"></i>
                                            ACTIVO
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-primary" style="padding: 0.5rem;" title="Ver detalles">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn btn-secondary" style="padding: 0.5rem;" title="Editar">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-success" style="padding: 0.5rem;" title="Estudiantes">
                                                <i class="fas fa-users"></i>
                                            </button>
                                        </div>
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
    const guardia = mockData.guardias[0];
    return `
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Mi Perfil Personal</h2>
            <p class="text-gray-600">Información personal y estado de certificaciones</p>
        </div>
        
        <div class="grid grid-cols-3 gap-6">
            <div class="card" style="grid-column: span 2;">
                <div class="card-content">
                    <div class="flex items-center mb-8">
                        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 2rem;">
                            <i class="fas fa-user" style="color: white; font-size: 2.5rem;"></i>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800">${guardia.nombre}</h3>
                            <p class="text-gray-600 text-lg">${guardia.email}</p>
                            <div class="flex items-center mt-2">
                                <span class="badge badge-success mr-2">
                                    <i class="fas fa-shield-alt mr-1"></i>
                                    GUARDIA ACTIVO
                                </span>
                                <span class="text-sm text-gray-500">Desde ${guardia.fechaContratacion}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <h4 class="text-xl font-bold text-gray-800 mb-4">
                                <i class="fas fa-user-circle text-blue-600 mr-2"></i>
                                Información Personal
                            </h4>
                            <div class="space-y-4">
                                <div class="flex justify-between">
                                    <span class="font-semibold text-gray-600">RUT:</span>
                                    <span class="text-gray-800">${guardia.rut}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-semibold text-gray-600">Teléfono:</span>
                                    <span class="text-gray-800">${guardia.telefono}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-semibold text-gray-600">Email:</span>
                                    <span class="text-gray-800">${guardia.email}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-semibold text-gray-600">Fecha Contratación:</span>
                                    <span class="text-gray-800">${guardia.fechaContratacion}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="text-xl font-bold text-gray-800 mb-4">
                                <i class="fas fa-certificate text-green-600 mr-2"></i>
                                Estado de Certificaciones
                            </h4>
                            <div class="space-y-4">
                                <div class="alert alert-warning">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <div>
                                        <div class="font-semibold">Certificación OS-10</div>
                                        <div class="text-sm">Vence en ${guardia.cursosVencen} días</div>
                                    </div>
                                </div>
                                <div class="alert alert-success">
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <div class="font-semibold">Primeros Auxilios</div>
                                        <div class="text-sm">Vigente hasta 2026</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-bold">Acciones Rápidas</h4>
                    </div>
                    <div class="card-content space-y-3">
                        <button class="btn btn-primary w-full">
                            <i class="fas fa-edit"></i>
                            Actualizar Datos
                        </button>
                        <button class="btn btn-success w-full">
                            <i class="fas fa-download"></i>
                            Descargar Certificados
                        </button>
                        <button class="btn btn-warning w-full">
                            <i class="fas fa-clock"></i>
                            Renovar Certificaciones
                        </button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-bold">Estadísticas</h4>
                    </div>
                    <div class="card-content">
                        <div class="space-y-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-600">156</div>
                                <div class="text-sm text-gray-600">Turnos Completados</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600">98%</div>
                                <div class="text-sm text-gray-600">Asistencia</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-600">4.8</div>
                                <div class="text-sm text-gray-600">Evaluación Promedio</div>
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
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Gestión de Mis Turnos</h2>
            <p class="text-gray-600">Calendario de turnos y asignación de servicios</p>
        </div>
        
        <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-calendar-check text-blue-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-blue-600">5</div>
                    <div class="text-sm text-gray-600">Esta Semana</div>
                </div>
            </div>
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-clock text-green-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-green-600">48h</div>
                    <div class="text-sm text-gray-600">Horas Trabajadas</div>
                </div>
            </div>
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-map-marker-alt text-orange-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-orange-600">3</div>
                    <div class="text-sm text-gray-600">Ubicaciones</div>
                </div>
            </div>
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-star text-purple-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-purple-600">4.8</div>
                    <div class="text-sm text-gray-600">Evaluación</div>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-3 gap-6">
            <div style="grid-column: span 2;">
                <div class="card">
                    <div class="card-header">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-bold">Turnos Programados</h3>
                            <div class="flex gap-2">
                                <button class="btn btn-secondary">
                                    <i class="fas fa-filter"></i>
                                    Filtrar
                                </button>
                                <button class="btn btn-primary">
                                    <i class="fas fa-calendar"></i>
                                    Ver Calendario
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="space-y-4">
                            ${mockData.turnos.map(turno => `
                                <div class="alert alert-info">
                                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #dbeafe, #bfdbfe); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-building" style="color: #1e40af; font-size: 1.5rem;"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex justify-between items-start mb-2">
                                            <h4 class="font-bold text-lg">${turno.ubicacion}</h4>
                                            <span class="badge badge-success">${turno.estado.toUpperCase()}</span>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <i class="fas fa-calendar mr-1"></i>
                                                <span class="font-semibold">Fecha:</span> ${turno.fecha}
                                            </div>
                                            <div>
                                                <i class="fas fa-clock mr-1"></i>
                                                <span class="font-semibold">Horario:</span> ${turno.hora}
                                            </div>
                                            <div>
                                                <i class="fas fa-building mr-1"></i>
                                                <span class="font-semibold">Cliente:</span> ${turno.cliente}
                                            </div>
                                            <div>
                                                <i class="fas fa-tasks mr-1"></i>
                                                <span class="font-semibold">Tipo:</span> ${turno.descripcion}
                                            </div>
                                        </div>
                                        <div class="mt-3 flex gap-2">
                                            <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                                                <i class="fas fa-eye"></i>
                                                Ver Detalles
                                            </button>
                                            <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                                                <i class="fas fa-route"></i>
                                                Cómo llegar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-bold">Resumen Semanal</h4>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Turnos programados:</span>
                            <span class="font-bold">${mockData.turnos.length}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Horas totales:</span>
                            <span class="font-bold">48h</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Próximo turno:</span>
                            <span class="font-bold">Hoy 20:00</span>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-bold">Solicitudes Rápidas</h4>
                    </div>
                    <div class="card-content space-y-3">
                        <button class="btn w-full" style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #1e40af; border: none;">
                            <i class="fas fa-exchange-alt"></i>
                            Solicitar Cambio de Turno
                        </button>
                        <button class="btn w-full" style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #166534; border: none;">
                            <i class="fas fa-calendar-times"></i>
                            Solicitar Día Libre
                        </button>
                        <button class="btn w-full" style="background: linear-gradient(135deg, #fef3c7, #fde68a); color: #92400e; border: none;">
                            <i class="fas fa-exclamation-triangle"></i>
                            Reportar Incidencia
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderMisCursos() {
    return `
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Mis Cursos de Capacitación</h2>
            <p class="text-gray-600">Progreso académico y material de estudio</p>
        </div>
        
        <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-book-open text-blue-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-blue-600">3</div>
                    <div class="text-sm text-gray-600">Cursos Activos</div>
                </div>
            </div>
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-percentage text-green-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-green-600">85%</div>
                    <div class="text-sm text-gray-600">Promedio General</div>
                </div>
            </div>
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-certificate text-orange-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-orange-600">2</div>
                    <div class="text-sm text-gray-600">Certificaciones</div>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
            ${mockData.cursos.map((curso, index) => `
                <div class="card">
                    <div class="card-header">
                        <div class="flex justify-between items-start">
                            <h3 class="text-lg font-bold">${curso.nombre}</h3>
                            <span class="badge badge-success">ACTIVO</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="font-semibold text-gray-600">Instructor:</span>
                                    <div>${curso.instructor}</div>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-600">Modalidad:</span>
                                    <div>${curso.modalidad}</div>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-600">Duración:</span>
                                    <div>${curso.duracion}</div>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-600">Inicio:</span>
                                    <div>${curso.fechaInicio}</div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex justify-between text-sm mb-2">
                                    <span class="font-semibold">Progreso del Curso</span>
                                    <span class="text-blue-600 font-bold">${75 + (index * 10)}%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" style="width: ${75 + (index * 10)}%;"></div>
                                </div>
                            </div>
                            
                            <div class="flex gap-2">
                                <button class="btn btn-primary flex-1">
                                    <i class="fas fa-play"></i>
                                    Continuar
                                </button>
                                <button class="btn btn-secondary">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="btn btn-success">
                                    <i class="fas fa-calendar"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderExamenOS10() {
    return `
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Simulacro de Examen OS-10</h2>
            <p class="text-gray-600">Preparación interactiva para la certificación de Guardia de Seguridad</p>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold">Simulacros Disponibles</h3>
                </div>
                <div class="card-content space-y-4">
                    <div class="alert alert-info">
                        <i class="fas fa-clipboard-list" style="font-size: 1.5rem;"></i>
                        <div class="flex-1">
                            <h4 class="font-bold">Examen Básico OS-10</h4>
                            <p class="text-sm">30 preguntas - 60 minutos</p>
                            <div class="flex justify-between items-center mt-3">
                                <span class="text-sm text-gray-600">Último intento: <span class="font-bold text-green-600">85%</span></span>
                                <button class="btn btn-primary">
                                    <i class="fas fa-play"></i>
                                    Iniciar
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-warning">
                        <i class="fas fa-clipboard-list" style="font-size: 1.5rem;"></i>
                        <div class="flex-1">
                            <h4 class="font-bold">Examen Avanzado OS-10</h4>
                            <p class="text-sm">50 preguntas - 90 minutos</p>
                            <div class="flex justify-between items-center mt-3">
                                <span class="text-sm text-gray-600">Último intento: <span class="font-bold text-blue-600">92%</span></span>
                                <button class="btn btn-success">
                                    <i class="fas fa-rocket"></i>
                                    Iniciar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-bold">Mi Progreso de Preparación</h4>
                    </div>
                    <div class="card-content">
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between text-sm mb-2">
                                    <span class="font-semibold">Progreso General</span>
                                    <span class="text-green-600 font-bold">88%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" style="width: 88%; background: linear-gradient(90deg, #10b981, #047857);"></div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div class="text-3xl font-bold text-blue-600">18</div>
                                    <div class="text-sm text-gray-600">Exámenes Realizados</div>
                                </div>
                                <div>
                                    <div class="text-3xl font-bold text-green-600">88%</div>
                                    <div class="text-sm text-gray-600">Promedio General</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-bold">Material de Estudio</h4>
                    </div>
                    <div class="card-content space-y-3">
                        <button class="btn w-full text-left" style="background: #f8fafc; color: #374151; justify-content: space-between; border: 1px solid #e5e7eb;">
                            <span><i class="fas fa-file-pdf text-red-500 mr-2"></i>Manual OS-10 Actualizado 2025</span>
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn w-full text-left" style="background: #f8fafc; color: #374151; justify-content: space-between; border: 1px solid #e5e7eb;">
                            <span><i class="fas fa-balance-scale text-blue-500 mr-2"></i>Normativa Legal Vigente</span>
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn w-full text-left" style="background: #f8fafc; color: #374151; justify-content: space-between; border: 1px solid #e5e7eb;">
                            <span><i class="fas fa-play-circle text-green-500 mr-2"></i>Videos Explicativos HD</span>
                            <i class="fas fa-external-link-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderMaterialEstudio() {
    return `
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Material de Estudio</h2>
            <p class="text-gray-600">Recursos educativos y material descargable para tus cursos</p>
        </div>
        
        <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-file-pdf text-red-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-red-600">24</div>
                    <div class="text-sm text-gray-600">Documentos PDF</div>
                </div>
            </div>
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-video text-blue-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-blue-600">12</div>
                    <div class="text-sm text-gray-600">Videos HD</div>
                </div>
            </div>
            <div class="card">
                <div class="card-content text-center">
                    <i class="fas fa-images text-green-600" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div class="text-2xl font-bold text-green-600">45</div>
                    <div class="text-sm text-gray-600">Infografías</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">Biblioteca Digital</h3>
                    <div class="flex gap-2">
                        <button class="btn btn-secondary">
                            <i class="fas fa-search"></i>
                            Buscar
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-filter"></i>
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <h4 class="font-bold text-lg text-blue-600">
                            <i class="fas fa-graduation-cap mr-2"></i>
                            Curso OS-10 Guardia de Seguridad
                        </h4>
                        <div class="space-y-3">
                            <div class="alert alert-info">
                                <i class="fas fa-file-pdf text-2xl"></i>
                                <div class="flex-1">
                                    <div class="font-semibold">Manual Completo OS-10 v2025</div>
                                    <div class="text-sm text-gray-600">PDF • 156 páginas • 12.5 MB</div>
                                    <div class="flex gap-2 mt-2">
                                        <button class="btn btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">
                                            <i class="fas fa-download mr-1"></i>Descargar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <h4 class="font-bold text-lg text-green-600">
                            <i class="fas fa-shield-alt mr-2"></i>
                            Seguridad Industrial
                        </h4>
                        <div class="space-y-3">
                            <div class="alert alert-info">
                                <i class="fas fa-hard-hat text-2xl"></i>
                                <div class="flex-1">
                                    <div class="font-semibold">Prevención de Riesgos Laborales</div>
                                    <div class="text-sm text-gray-600">PDF • 234 páginas • 18.7 MB</div>
                                    <div class="flex gap-2 mt-2">
                                        <button class="btn btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">
                                            <i class="fas fa-download mr-1"></i>Descargar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderServicios() {
    return `
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Servicios Públicos</h2>
            <p class="text-gray-600">Gestión de servicios de seguridad ofrecidos a clientes</p>
        </div>
        
        <div class="grid grid-cols-3 gap-6">
            ${mockData.servicios.map(servicio => `
                <div class="card" style="height: 100%;">
                    <div class="card-header">
                        <h3 class="font-bold text-lg">${servicio.nombre}</h3>
                    </div>
                    <div class="card-content">
                        <p class="text-gray-600 mb-4">${servicio.descripcion}</p>
                        <div class="space-y-2">
                            ${servicio.caracteristicas.map(caracteristica => `
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-600 mr-2"></i>
                                    <span class="text-sm">${caracteristica}</span>
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn btn-primary w-full mt-6">
                            <i class="fas fa-info-circle"></i>
                            Más Información
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderSeccionEnDesarrollo() {
    return `
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Sección en Desarrollo</h2>
            <p class="text-gray-600">Esta funcionalidad estará disponible próximamente</p>
        </div>
        
        <div class="card">
            <div class="card-content text-center py-12">
                <i class="fas fa-tools text-6xl text-gray-300 mb-6"></i>
                <h3 class="text-2xl font-bold text-gray-600 mb-4">En Construcción</h3>
                <p class="text-gray-500 mb-6">Estamos trabajando para ofrecerte la mejor experiencia</p>
                <button class="btn btn-primary" onclick="navigateToSection('dashboard')">
                    <i class="fas fa-arrow-left"></i>
                    Volver al Dashboard
                </button>
            </div>
        </div>
    `;
}

/*
========================================
INICIALIZACIÓN DE LA APLICACIÓN
========================================
*/

function init() {
    try {
        updateUI();
        
        // Manejar redimensionado de ventana
        window.addEventListener('resize', handleResize);
        
        // Cerrar sidebar al hacer click fuera (solo móvil)
        document.addEventListener('click', handleOutsideClick);
        
        // Manejar tecla Escape para cerrar modal
        document.addEventListener('keydown', handleKeydown);
        
        console.log('🚀 Global Capacitación - Sistema iniciado correctamente');
        console.log('📧 Para probar: cualquier email/contraseña');
        console.log('👥 Roles disponibles: admin, guardia, estudiante');
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
}

function handleResize() {
    try {
        if (window.innerWidth > 1024) {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            if (currentUser && sidebar && mainContent) {
                sidebar.classList.add('open');
                mainContent.classList.add('sidebar-open');
            }
        } else {
            toggleSidebar(false);
        }
    } catch (error) {
        console.error('Error en handleResize:', error);
    }
}

function handleOutsideClick(event) {
    try {
        if (window.innerWidth <= 1024) {
            const sidebar = document.getElementById('sidebar');
            if (!sidebar) return;
            
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isMenuButton = event.target.closest('button[onclick*="toggleSidebar"]');
            
            if (!isClickInsideSidebar && !isMenuButton && sidebar.classList.contains('open')) {
                toggleSidebar(false);
            }
        }
    } catch (error) {
        console.error('Error en handleOutsideClick:', error);
    }
}

function handleKeydown(event) {
    try {
        if (event.key === 'Escape') {
            const loginModal = document.getElementById('loginModal');
            if (loginModal && !loginModal.classList.contains('hidden')) {
                closeLogin();
            }
        }
    } catch (error) {
        console.error('Error en handleKeydown:', error);
    }
}

/*
========================================
FUNCIONES AUXILIARES
========================================
*/

// Formatear números con separador de miles
function formatNumber(num) {
    try {
        return num.toLocaleString('es-CL');
    } catch (error) {
        console.error('Error formateando número:', error);
        return num.toString();
    }
}

// Formatear moneda chilena
function formatCurrency(amount) {
    try {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(amount);
    } catch (error) {
        console.error('Error formateando moneda:', error);
        return '/*
========================================
GLOBAL CAPACITACIÓN - JAVASCRIPT
Plataforma Digital Integral
========================================
*/

// Estado global de la aplicación
let currentUser = null;
let currentSection = 'home';

// Datos mock para demostración
const mockData = {
    guardias: [
        { 
            id: 1, 
            nombre: 'Juan Carlos Pérez Silva', 
            rut: '12345678-9', 
            email: 'jperez@globalcapacitacion.cl', 
            estado: 'activo', 
            cursosVencen: 15,
            fechaContratacion: '2024-01-15',
            telefono: '+56 9 8765 4321',
            certificaciones: ['OS-10', 'Primeros Auxilios']
        },
        { 
            id: 2, 
            nombre: 'María Fernanda González López', 
            rut: '98765432-1', 
            email: 'mgonzalez@globalcapacitacion.cl', 
            estado: 'activo', 
            cursosVencen: 30,
            fechaContratacion: '2024-02-10',
            telefono: '+56 9 7654 3210',
            certificaciones: ['OS-10', 'Seguridad Industrial']
        },
        { 
            id: 3, 
            nombre: 'Roberto Antonio Mendoza Torres', 
            rut: '11223344-5', 
            email: 'rmendoza@globalcapacitacion.cl', 
            estado: 'activo', 
            cursosVencen: 45,
            fechaContratacion: '2023-11-20',
            telefono: '+56 9 6543 2109',
            certificaciones: ['OS-10', 'Manejo de Crisis']
        }
    ],
    cursos: [
        { 
            id: 1, 
            nombre: 'Curso OS-10 Guardia de Seguridad Privada', 
            fechaInicio: '2025-09-15', 
            duracion: '120 horas', 
            precio: 450000, 
            estudiantes: 28,
            estado: 'activo',
            instructor: 'Carlos Rodríguez',
            modalidad: 'Presencial'
        },
        { 
            id: 2, 
            nombre: 'Seguridad Industrial y Prevención de Riesgos', 
            fechaInicio: '2025-09-20', 
            duracion: '80 horas', 
            precio: 320000, 
            estudiantes: 22,
            estado: 'activo',
            instructor: 'Ana María Torres',
            modalidad: 'Semi-presencial'
        },
        { 
            id: 3, 
            nombre: 'Primeros Auxilios y RCP', 
            fechaInicio: '2025-10-01', 
            duracion: '40 horas', 
            precio: 180000, 
            estudiantes: 35,
            estado: 'activo',
            instructor: 'Dr. Miguel Hernández',
            modalidad: 'Presencial'
        }
    ],
    turnos: [
        { 
            id: 1, 
            fecha: '2025-08-29', 
            hora: '08:00-20:00', 
            ubicacion: 'Mall Plaza La Serena', 
            guardia: 'Juan Carlos Pérez Silva', 
            estado: 'asignado',
            descripcion: 'Control de acceso y vigilancia general',
            cliente: 'Mall Plaza S.A.'
        },
        { 
            id: 2, 
            fecha: '2025-08-30', 
            hora: '20:00-08:00', 
            ubicacion: 'Edificio Corporativo Pacifico', 
            guardia: 'María Fernanda González López', 
            estado: 'asignado',
            descripcion: 'Vigilancia nocturna y rondas',
            cliente: 'Corporación Pacifico Ltda.'
        },
        { 
            id: 3, 
            fecha: '2025-08-29', 
            hora: '12:00-00:00', 
            ubicacion: 'Centro Médico Elqui', 
            guardia: 'Roberto Antonio Mendoza Torres', 
            estado: 'asignado',
            descripcion: 'Control de acceso y seguridad hospitalaria',
            cliente: 'Centro Médico Elqui S.A.'
        }
    ],
    notifications: [
        { 
            id: 1, 
            tipo: 'warning', 
            mensaje: 'Certificación OS-10 de Juan Carlos Pérez vence en 15 días', 
            fecha: '2025-08-28',
            categoria: 'certificacion'
        },
        { 
            id: 2, 
            tipo: 'info', 
            mensaje: 'Nuevo estudiante inscrito en Seguridad Industrial', 
            fecha: '2025-08-28',
            categoria: 'capacitacion'
        },
        { 
            id: 3, 
            tipo: 'success', 
            mensaje: 'Contrato digital firmado por María González', 
            fecha: '2025-08-27',
            categoria: 'contrato'
        }
    ],
    servicios: [
        {
            id: 1,
            nombre: 'Vigilancia en Centros Comerciales',
            descripcion: 'Servicio especializado de seguridad para centros comerciales y retail',
            caracteristicas: ['Control de acceso', 'Vigilancia CCTV', 'Rondas programadas', 'Manejo de emergencias']
        },
        {
            id: 2,
            nombre: 'Seguridad Corporativa',
            descripcion: 'Protección integral para empresas y edificios corporativos',
            caracteristicas: ['Seguridad ejecutiva', 'Control vehicular', 'Sistemas integrados', 'Reportes detallados']
        },
        {
            id: 3,
            nombre: 'Eventos y Servicios Especiales',
            descripcion: 'Seguridad especializada para eventos masivos y situaciones especiales',
            caracteristicas: ['Planificación estratégica', 'Personal especializado', 'Coordinación', 'Protocolos específicos']
        }
    ]
};

// Configuración de menús por rol
const menuConfig = {
    admin: [
        { id: 'dashboard', label: 'Panel de Control', icon: 'fas fa-tachometer-alt' },
        { id: 'gestionar-guardias', label: 'Gestión de Personal', icon: 'fas fa-users-cog' },
        { id: 'gestionar-cursos', label: 'Administrar Cursos', icon: 'fas fa-graduation-cap' },
        { id: 'turnos', label: 'Gestión de Turnos', icon: 'fas fa-calendar-alt' },
        { id: 'contratos', label: 'Gestión Documental', icon: 'fas fa-file-signature' },
        { id: 'servicios', label: 'Servicios Públicos', icon: 'fas fa-briefcase' },
        { id: 'blog-noticias', label: 'Blog y Noticias', icon: 'fas fa-newspaper' },
        { id: 'notificaciones', label: 'Centro de Notificaciones', icon: 'fas fa-bell' }
    ],
    guardia: [
        { id: 'mi-perfil', label: 'Mi Perfil', icon: 'fas fa-user-circle' },
        { id: 'mis-turnos', label: 'Mis Turnos', icon: 'fas fa-calendar-check' },
        { id: 'mis-certificaciones', label: 'Mis Certificaciones', icon: 'fas fa-certificate' },
        { id: 'ordenes-trabajo', label: 'Órdenes de Trabajo', icon: 'fas fa-clipboard-list' },
        { id: 'mi-contrato', label: 'Mi Contrato Digital', icon: 'fas fa-file-contract' },
        { id: 'notificaciones-guardia', label: 'Mis Notificaciones', icon: 'fas fa-bell' }
    ],
    estudiante: [
        { id: 'mis-cursos', label: 'Mis Cursos', icon: 'fas fa-book-open' },
        { id: 'horarios', label: 'Horarios de Clases', icon: 'fas fa-calendar' },
        { id: 'calificaciones', label: 'Mis Calificaciones', icon: 'fas fa-chart-line' },
        { id: 'material-estudio', label: 'Material de Estudio', icon: 'fas fa-download' },
        { id: 'examen-os10', label: 'Simulacro OS-10', icon: 'fas fa-clipboard-check' },
        { id: 'progreso-academico', label: 'Progreso Académico', icon: 'fas fa-trophy' }
    ]
};

/*
========================================
FUNCIONES DE AUTENTICACIÓN
========================================
*/

function openLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('userEmail');
    const roleInput = document.getElementById('userRole');
    
    if (!emailInput || !roleInput) {
        console.error('Elementos de formulario no encontrados');
        return;
    }
    
    const email = emailInput.value;
    const role = roleInput.value;
    
    const userNames = {
        admin: 'Administrador del Sistema',
        guardia: 'Juan Carlos Pérez Silva',
        estudiante: 'Ana María Estudiante'
    };
    
    currentUser = {
        id: 1,
        nombre: userNames[role] || 'Usuario',
        email: email,
        rol: role
    };
    
    const defaultSections = {
        admin: 'dashboard',
        guardia: 'mi-perfil',
        estudiante: 'mis-cursos'
    };
    
    currentSection = defaultSections[role] || 'dashboard';
    closeLogin();
    updateUI();
}

function logout() {
    currentUser = null;
    currentSection = 'home';
    toggleSidebar(false);
    updateUI();
}

/*
========================================
FUNCIONES DE INTERFAZ
========================================
*/

function toggleSidebar(show = null) {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (!sidebar || !mainContent) {
        console.error('Elementos sidebar o mainContent no encontrados');
        return;
    }
    
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
    
    // Cerrar sidebar en móviles después de navegar
    if (window.innerWidth <= 1024) {
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
    if (!headerActions) {
        console.error('Elemento headerActions no encontrado');
        return;
    }
    
    if (!currentUser) {
        headerActions.innerHTML = `
            <button onclick="openLogin()" class="btn btn-primary">
                <i class="fas fa-sign-in-alt"></i>
                Acceder al Sistema
            </button>
        `;
    } else {
        headerActions.innerHTML = `
            <div class="flex items-center gap-4">
                <button onclick="toggleSidebar()" class="btn btn-secondary">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="text-right">
                    <div class="font-semibold">${currentUser.nombre}</div>
                    <div style="font-size: 0.75rem; opacity: 0.8;">${currentUser.rol.toUpperCase()}</div>
                </div>
                <div class="flex items-center gap-4">
                    <div style="position: relative;">
                        <i class="fas fa-bell" style="font-size: 1.25rem;"></i>
                        <span style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 0.75rem; display: flex; align-items: center; justify-content: center;">${mockData.notifications.length}</span>
                    </div>
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-user" style="color: white; font-size: 1rem;"></i>
                    </div>
                </div>
            </div>
        `;
    }
}

function updateSidebar() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    if (!sidebarMenu) {
        console.error('Elemento sidebarMenu no encontrado');
        return;
    }
    
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
    if (!mainContent) {
        console.error('Elemento mainContent no encontrado');
        return;
    }
    
    if (!currentUser) {
        mainContent.innerHTML = renderPublicHome();
        return;
    }

    let content = '';
    
    switch (currentSection) {
        case 'dashboard':
            content = renderAdminDashboard();
            break;
        case 'gestionar-guardias':
            content = renderGestionGuardias();
            break;
        case 'gestionar-cursos':
            content = renderGestionCursos();
            break;
        case 'servicios':
            content = renderServicios();
            break;
        case 'mi-perfil':
            content = renderMiPerfil();
            break;
        case 'mis-turnos':
            content = renderMisTurnos();
            break;
        case 'mis-cursos':
            content = renderMisCursos();
            break;
        case 'examen-os10':
            content = renderExamenOS10();
            break;
        case 'material-estudio':
            content = renderMaterialEstudio();
            break;
        default:
            content = renderSeccionEnDesarrollo();
    }
    
    mainContent.innerHTML = content;
}

/*
========================================
FUNCIONES DE RENDERIZADO
========================================
*/

function renderPublicHome() {
    return `
        <div class="hero">
            <div class="hero-content">
                <div class="max-w-7xl mx-auto px-4">
                    <h1>Plataforma Digital Integral</h1>
                    <p>Una herramienta robusta y centralizada que optimiza la gestión del personal de seguridad y la administración de servicios de capacitación OTEC, proyectando una imagen moderna y eficiente.</p>
                    <div class="flex justify-center gap-6">
                        <button onclick="openLogin()" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem;">
                            <i class="fas fa-user-shield"></i>
                            Acceso Personal Seguridad
                        </button>
                        <button onclick="document.getElementById('userRole').value='estudiante'; openLogin()" class="btn btn-success" style="font-size: 1.1rem; padding: 1rem 2rem;">
                            <i class="fas fa-graduation-cap"></i>
                            Portal Estudiantes OTEC
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="services">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-8">
                    <h3 class="text-4xl font-bold mb-6 text-gray-800">Módulos del Sistema</h3>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Dos módulos principales diseñados para optimizar tanto la gestión de seguridad como los servicios de capacitación</p>
                </div>
                
                <div class="grid grid-cols-2 gap-8">
                    <div class="service-card blue">
                        <div class="service-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">Portal de Gestión de Seguridad</h4>
                        <p class="text-gray-600 mb-4">Centro de operaciones para el personal de seguridad con control administrativo completo.</p>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Panel de control administrativo centralizado</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Perfiles individuales para guardias</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Sistema de notificaciones automáticas</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Gestión documental y firma digital</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Servicios públicos y blog corporativo</li>
                        </ul>
                    </div>
                    
                    <div class="service-card green">
                        <div class="service-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">Plataforma de Capacitación OTEC</h4>
                        <p class="text-gray-600 mb-4">Portal educativo completo para gestionar y ofrecer cursos de capacitación especializados.</p>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Gestión de cursos y asignaturas</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Calendario de clases integrado</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Portal del estudiante personalizado</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Simulacros de examen OS-10</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Promoción pública de cursos</li>
                        </ul>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-6 mt-12">
                    ${mockData.servicios.map(servicio => `
                        <div class="feature-box">
                            <i class="fas fa-briefcase" style="font-size: 2.5rem; color: #3b82f6; margin-bottom: 1rem;"></i>
                            <h5 class="font-bold text-lg mb-3">${servicio.nombre}</h5>
                            <p class="text-gray-600 text-sm mb-4">${servicio.descripcion}</p>
                            <ul class="text-left text-sm text-gray-700">
                                ${servicio.caracteristicas.map(item => `
                                    <li class="mb-1"><i class="fas fa-dot-circle text-blue-500 mr-2"></i>${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderAdminDashboard() {
    const totalEstudiantes = mockData.cursos.reduce((sum, curso) => sum + curso.estudiantes, 0);
    const ingresosEstimados = mockData.cursos.reduce((sum, curso) => sum + (curso.precio * curso.estudiantes), 0);
    
    return `
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Panel de Control Administrativo</h2>
            <p class="text-gray-600">Vista centralizada del estado de todo el personal, cursos y operaciones</p>
        </div>
        
        <div class="grid grid-cols-4 mb-8">
            <div class="stat-card blue">
                <div>
                    <p class="stat-label">Personal Activo</p>
                    <p class="stat-number">${mockData.guardias.length}</p>
                    <p class="text-sm opacity-80">Guardias certificados</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-user-shield"></i>
                </div>
            </div>
            
            <div class="stat-card green">
                <div>
                    <p class="stat-label">Cursos OTEC</p>
                    <p class="stat-number">${mockData.cursos.length}</p>
                    <p class="text-sm opacity-80">Programas activos</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
            </div>
            
            <div class="stat-card orange">
                <div>
                    <p class="stat-label">Estudiantes</p>
                    <p class="stat-number">${totalEstudiantes}</p>
                    <p class="text-sm opacity-80">Total inscritos</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
            </div>
            
            <div class="stat-card purple">
                <div>
                    <p class="stat-label">Ingresos</p>
                    <p class="stat-number">$${(ingresosEstimados/1000000).toFixed(1)}M</p>
                    <p class="text-sm opacity-80">Proyectados</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold flex items-center">
                        <i class="fas fa-exclamation-triangle text-orange-600 mr-2"></i>
                        Alertas de Certificaciones
                    </h3>
                </div>
                <div class="card-content">
                    ${mockData.guardias.map(guardia => `
                        <div class="alert alert-warning mb-3">
                            <i class="fas fa-clock"></i>
                            <div>
                                <p class="font-semibold">${guardia.nombre}</p>
                                <p class="text-sm">Certificación OS-10 vence en ${guardia.cursosVencen} días</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold flex items-center">
                        <i class="fas fa-calendar-check text-blue-600 mr-2"></i>
                        Turnos de Hoy
                    </h3>
                </div>
                <div class="card-content">
                    ${mockData.turnos.map(turno => `
                        <div class="alert alert-info mb-3">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <p class="font-semibold">${turno.ubicacion}</p>
                                <p class="text-sm">${turno.guardia} - ${turno.hora}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold flex items-center">
                        <i class="fas fa-bell text-green-600 mr-2"></i>
                        Actividad Reciente
                    </h3>
                </div>
                <div class="card-content">
                    ${mockData.notifications.map(notification => `
                        <div class="alert alert-${notification.tipo === 'warning' ? 'warning' : notification.tipo === 'success' ? 'success' : 'info'} mb-3">
                            <i class="fas fa-${notification.tipo === 'warning' ? 'exclamation-triangle' : notification.tipo === 'success' ? 'check-circle' : 'info-circle'}"></i>
                            <div>
                                <p class="text-sm">${notification.mensaje}</p>
                                <p class="text-xs opacity-75">${notification.fecha}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderGestionGuardias() {
    return `
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-4xl font-bold text-gray-800 mb-2">Gestión de Personal de Seguridad</h2>
                    <p class="text-gray-600">Control administrativo completo del personal y sus certificaciones</p>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-user-plus"></i>
                    Nuevo Personal
                </button>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">Personal de Seguridad Registrado</h3>
                    <div class="flex gap-2">
                        <button class="btn btn-secondary">
                            <i class="fas fa-filter"></i>
                            Filtrar
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-download"></i>
                            Exportar
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Información Personal</th>
                                <th>Contacto</th>
                                <th>Estado</th>
                                <th>Certificaciones</th>
                                <th>Próximo Vencimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.guardias.map(guardia => `
                                <tr>
                                    <td>
                                        <div>
                                            <div class="font-bold text-gray-800">${guardia.nombre}</div>
                                            <div class="text-sm text-gray-600">RUT: ${guardia.rut}</div>
                                            <div class="text-sm text-gray-600">Desde: ${guardia.fechaContratacion}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="text-sm">
                                            <div>${guardia.email}</div>
                                            <div class="text-gray-600">${guardia.telefono}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge badge-success">
                                            <i class="fas fa-check-circle mr-1"></i>
                                            ${guardia.estado.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex flex-wrap gap-1">
                                            ${guardia.certificaciones.map(cert => `
                                                <span class="badge badge-info text-xs">${cert}</span>
                                            `).join('')}
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge ${guardia.cursosVencen <= 30 ? 'badge-warning' : 'badge-success'}">
                                            ${guardia.cursosVencen} días
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-primary" style="padding: 0.5rem;">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn btn-secondary" style="padding: 0.5rem;">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-success" style="padding: 0.5rem;">
                                                <i class="fas fa-file-contract"></i>
                                            </button>
                                        </div>
                                    </td>
                 + formatNumber(amount);
    }
}

// Calcular días entre fechas
function daysBetween(date1, date2) {
    try {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);
        return Math.round(Math.abs((firstDate - secondDate) / oneDay));
    } catch (error) {
        console.error('Error calculando días:', error);
        return 0;
    }
}

// Obtener saludo según la hora
function getGreeting() {
    try {
        const hour = new Date().getHours();
        if (hour < 12) return 'Buenos días';
        if (hour < 18) return 'Buenas tardes';
        return 'Buenas noches';
    } catch (error) {
        console.error('Error obteniendo saludo:', error);
        return 'Hola';
    }
}

// Generar ID único
function generateId() {
    try {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    } catch (error) {
        console.error('Error generando ID:', error);
        return Math.random().toString(36);
    }
}

/*
========================================
MANEJO DE ERRORES GLOBALES
========================================
*/

window.addEventListener('error', (event) => {
    console.error('Error en la aplicación:', event.error);
    console.error('Archivo:', event.filename);
    console.error('Línea:', event.lineno);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rechazada:', event.reason);
    event.preventDefault();
});

/*
========================================
INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO
========================================
*/

// Verificar si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // El DOM ya está cargado
    init();
}/*
========================================
GLOBAL CAPACITACIÓN - JAVASCRIPT
Plataforma Digital Integral
========================================
*/

// Estado global de la aplicación
let currentUser = null;
let currentSection = 'home';

// Datos mock para demostración
const mockData = {
    guardias: [
        { 
            id: 1, 
            nombre: 'Juan Carlos Pérez Silva', 
            rut: '12345678-9', 
            email: 'jperez@globalcapacitacion.cl', 
            estado: 'activo', 
            cursosVencen: 15,
            fechaContratacion: '2024-01-15',
            telefono: '+56 9 8765 4321',
            certificaciones: ['OS-10', 'Primeros Auxilios']
        },
        { 
            id: 2, 
            nombre: 'María Fernanda González López', 
            rut: '98765432-1', 
            email: 'mgonzalez@globalcapacitacion.cl', 
            estado: 'activo', 
            cursosVencen: 30,
            fechaContratacion: '2024-02-10',
            telefono: '+56 9 7654 3210',
            certificaciones: ['OS-10', 'Seguridad Industrial']
        },
        { 
            id: 3, 
            nombre: 'Roberto Antonio Mendoza Torres', 
            rut: '11223344-5', 
            email: 'rmendoza@globalcapacitacion.cl', 
            estado: 'activo', 
            cursosVencen: 45,
            fechaContratacion: '2023-11-20',
            telefono: '+56 9 6543 2109',
            certificaciones: ['OS-10', 'Manejo de Crisis']
        }
    ],
    cursos: [
        { 
            id: 1, 
            nombre: 'Curso OS-10 Guardia de Seguridad Privada', 
            fechaInicio: '2025-09-15', 
            duracion: '120 horas', 
            precio: 450000, 
            estudiantes: 28,
            estado: 'activo',
            instructor: 'Carlos Rodríguez',
            modalidad: 'Presencial'
        },
        { 
            id: 2, 
            nombre: 'Seguridad Industrial y Prevención de Riesgos', 
            fechaInicio: '2025-09-20', 
            duracion: '80 horas', 
            precio: 320000, 
            estudiantes: 22,
            estado: 'activo',
            instructor: 'Ana María Torres',
            modalidad: 'Semi-presencial'
        },
        { 
            id: 3, 
            nombre: 'Primeros Auxilios y RCP', 
            fechaInicio: '2025-10-01', 
            duracion: '40 horas', 
            precio: 180000, 
            estudiantes: 35,
            estado: 'activo',
            instructor: 'Dr. Miguel Hernández',
            modalidad: 'Presencial'
        }
    ],
    turnos: [
        { 
            id: 1, 
            fecha: '2025-08-29', 
            hora: '08:00-20:00', 
            ubicacion: 'Mall Plaza La Serena', 
            guardia: 'Juan Carlos Pérez Silva', 
            estado: 'asignado',
            descripcion: 'Control de acceso y vigilancia general',
            cliente: 'Mall Plaza S.A.'
        },
        { 
            id: 2, 
            fecha: '2025-08-30', 
            hora: '20:00-08:00', 
            ubicacion: 'Edificio Corporativo Pacifico', 
            guardia: 'María Fernanda González López', 
            estado: 'asignado',
            descripcion: 'Vigilancia nocturna y rondas',
            cliente: 'Corporación Pacifico Ltda.'
        },
        { 
            id: 3, 
            fecha: '2025-08-29', 
            hora: '12:00-00:00', 
            ubicacion: 'Centro Médico Elqui', 
            guardia: 'Roberto Antonio Mendoza Torres', 
            estado: 'asignado',
            descripcion: 'Control de acceso y seguridad hospitalaria',
            cliente: 'Centro Médico Elqui S.A.'
        }
    ],
    notifications: [
        { 
            id: 1, 
            tipo: 'warning', 
            mensaje: 'Certificación OS-10 de Juan Carlos Pérez vence en 15 días', 
            fecha: '2025-08-28',
            categoria: 'certificacion'
        },
        { 
            id: 2, 
            tipo: 'info', 
            mensaje: 'Nuevo estudiante inscrito en Seguridad Industrial', 
            fecha: '2025-08-28',
            categoria: 'capacitacion'
        },
        { 
            id: 3, 
            tipo: 'success', 
            mensaje: 'Contrato digital firmado por María González', 
            fecha: '2025-08-27',
            categoria: 'contrato'
        }
    ],
    servicios: [
        {
            id: 1,
            nombre: 'Vigilancia en Centros Comerciales',
            descripcion: 'Servicio especializado de seguridad para centros comerciales y retail',
            caracteristicas: ['Control de acceso', 'Vigilancia CCTV', 'Rondas programadas', 'Manejo de emergencias']
        },
        {
            id: 2,
            nombre: 'Seguridad Corporativa',
            descripcion: 'Protección integral para empresas y edificios corporativos',
            caracteristicas: ['Seguridad ejecutiva', 'Control vehicular', 'Sistemas integrados', 'Reportes detallados']
        },
        {
            id: 3,
            nombre: 'Eventos y Servicios Especiales',
            descripcion: 'Seguridad especializada para eventos masivos y situaciones especiales',
            caracteristicas: ['Planificación estratégica', 'Personal especializado', 'Coordinación', 'Protocolos específicos']
        }
    ]
};

// Configuración de menús por rol
const menuConfig = {
    admin: [
        { id: 'dashboard', label: 'Panel de Control', icon: 'fas fa-tachometer-alt' },
        { id: 'gestionar-guardias', label: 'Gestión de Personal', icon: 'fas fa-users-cog' },
        { id: 'gestionar-cursos', label: 'Administrar Cursos', icon: 'fas fa-graduation-cap' },
        { id: 'turnos', label: 'Gestión de Turnos', icon: 'fas fa-calendar-alt' },
        { id: 'contratos', label: 'Gestión Documental', icon: 'fas fa-file-signature' },
        { id: 'servicios', label: 'Servicios Públicos', icon: 'fas fa-briefcase' },
        { id: 'blog-noticias', label: 'Blog y Noticias', icon: 'fas fa-newspaper' },
        { id: 'notificaciones', label: 'Centro de Notificaciones', icon: 'fas fa-bell' }
    ],
    guardia: [
        { id: 'mi-perfil', label: 'Mi Perfil', icon: 'fas fa-user-circle' },
        { id: 'mis-turnos', label: 'Mis Turnos', icon: 'fas fa-calendar-check' },
        { id: 'mis-certificaciones', label: 'Mis Certificaciones', icon: 'fas fa-certificate' },
        { id: 'ordenes-trabajo', label: 'Órdenes de Trabajo', icon: 'fas fa-clipboard-list' },
        { id: 'mi-contrato', label: 'Mi Contrato Digital', icon: 'fas fa-file-contract' },
        { id: 'notificaciones-guardia', label: 'Mis Notificaciones', icon: 'fas fa-bell' }
    ],
    estudiante: [
        { id: 'mis-cursos', label: 'Mis Cursos', icon: 'fas fa-book-open' },
        { id: 'horarios', label: 'Horarios de Clases', icon: 'fas fa-calendar' },
        { id: 'calificaciones', label: 'Mis Calificaciones', icon: 'fas fa-chart-line' },
        { id: 'material-estudio', label: 'Material de Estudio', icon: 'fas fa-download' },
        { id: 'examen-os10', label: 'Simulacro OS-10', icon: 'fas fa-clipboard-check' },
        { id: 'progreso-academico', label: 'Progreso Académico', icon: 'fas fa-trophy' }
    ]
};

/*
========================================
FUNCIONES DE AUTENTICACIÓN
========================================
*/

function openLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('userEmail');
    const roleInput = document.getElementById('userRole');
    
    if (!emailInput || !roleInput) {
        console.error('Elementos de formulario no encontrados');
        return;
    }
    
    const email = emailInput.value;
    const role = roleInput.value;
    
    const userNames = {
        admin: 'Administrador del Sistema',
        guardia: 'Juan Carlos Pérez Silva',
        estudiante: 'Ana María Estudiante'
    };
    
    currentUser = {
        id: 1,
        nombre: userNames[role] || 'Usuario',
        email: email,
        rol: role
    };
    
    const defaultSections = {
        admin: 'dashboard',
        guardia: 'mi-perfil',
        estudiante: 'mis-cursos'
    };
    
    currentSection = defaultSections[role] || 'dashboard';
    closeLogin();
    updateUI();
}

function logout() {
    currentUser = null;
    currentSection = 'home';
    toggleSidebar(false);
    updateUI();
}

/*
========================================
FUNCIONES DE INTERFAZ
========================================
*/

function toggleSidebar(show = null) {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (!sidebar || !mainContent) {
        console.error('Elementos sidebar o mainContent no encontrados');
        return;
    }
    
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
    
    // Cerrar sidebar en móviles después de navegar
    if (window.innerWidth <= 1024) {
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
    if (!headerActions) {
        console.error('Elemento headerActions no encontrado');
        return;
    }
    
    if (!currentUser) {
        headerActions.innerHTML = `
            <button onclick="openLogin()" class="btn btn-primary">
                <i class="fas fa-sign-in-alt"></i>
                Acceder al Sistema
            </button>
        `;
    } else {
        headerActions.innerHTML = `
            <div class="flex items-center gap-4">
                <button onclick="toggleSidebar()" class="btn btn-secondary">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="text-right">
                    <div class="font-semibold">${currentUser.nombre}</div>
                    <div style="font-size: 0.75rem; opacity: 0.8;">${currentUser.rol.toUpperCase()}</div>
                </div>
                <div class="flex items-center gap-4">
                    <div style="position: relative;">
                        <i class="fas fa-bell" style="font-size: 1.25rem;"></i>
                        <span style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 0.75rem; display: flex; align-items: center; justify-content: center;">${mockData.notifications.length}</span>
                    </div>
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-user" style="color: white; font-size: 1rem;"></i>
                    </div>
                </div>
            </div>
        `;
    }
}

function updateSidebar() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    if (!sidebarMenu) {
        console.error('Elemento sidebarMenu no encontrado');
        return;
    }
    
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
    if (!mainContent) {
        console.error('Elemento mainContent no encontrado');
        return;
    }
    
    if (!currentUser) {
        mainContent.innerHTML = renderPublicHome();
        return;
    }

    let content = '';
    
    switch (currentSection) {
        case 'dashboard':
            content = renderAdminDashboard();
            break;
        case 'gestionar-guardias':
            content = renderGestionGuardias();
            break;
        case 'gestionar-cursos':
            content = renderGestionCursos();
            break;
        case 'servicios':
            content = renderServicios();
            break;
        case 'mi-perfil':
            content = renderMiPerfil();
            break;
        case 'mis-turnos':
            content = renderMisTurnos();
            break;
        case 'mis-cursos':
            content = renderMisCursos();
            break;
        case 'examen-os10':
            content = renderExamenOS10();
            break;
        case 'material-estudio':
            content = renderMaterialEstudio();
            break;
        default:
            content = renderSeccionEnDesarrollo();
    }
    
    mainContent.innerHTML = content;
}

/*
========================================
FUNCIONES DE RENDERIZADO
========================================
*/

function renderPublicHome() {
    return `
        <div class="hero">
            <div class="hero-content">
                <div class="max-w-7xl mx-auto px-4">
                    <h1>Plataforma Digital Integral</h1>
                    <p>Una herramienta robusta y centralizada que optimiza la gestión del personal de seguridad y la administración de servicios de capacitación OTEC, proyectando una imagen moderna y eficiente.</p>
                    <div class="flex justify-center gap-6">
                        <button onclick="openLogin()" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem;">
                            <i class="fas fa-user-shield"></i>
                            Acceso Personal Seguridad
                        </button>
                        <button onclick="document.getElementById('userRole').value='estudiante'; openLogin()" class="btn btn-success" style="font-size: 1.1rem; padding: 1rem 2rem;">
                            <i class="fas fa-graduation-cap"></i>
                            Portal Estudiantes OTEC
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="services">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-8">
                    <h3 class="text-4xl font-bold mb-6 text-gray-800">Módulos del Sistema</h3>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Dos módulos principales diseñados para optimizar tanto la gestión de seguridad como los servicios de capacitación</p>
                </div>
                
                <div class="grid grid-cols-2 gap-8">
                    <div class="service-card blue">
                        <div class="service-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">Portal de Gestión de Seguridad</h4>
                        <p class="text-gray-600 mb-4">Centro de operaciones para el personal de seguridad con control administrativo completo.</p>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Panel de control administrativo centralizado</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Perfiles individuales para guardias</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Sistema de notificaciones automáticas</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Gestión documental y firma digital</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Servicios públicos y blog corporativo</li>
                        </ul>
                    </div>
                    
                    <div class="service-card green">
                        <div class="service-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">Plataforma de Capacitación OTEC</h4>
                        <p class="text-gray-600 mb-4">Portal educativo completo para gestionar y ofrecer cursos de capacitación especializados.</p>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Gestión de cursos y asignaturas</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Calendario de clases integrado</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Portal del estudiante personalizado</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Simulacros de examen OS-10</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Promoción pública de cursos</li>
                        </ul>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-6 mt-12">
                    ${mockData.servicios.map(servicio => `
                        <div class="feature-box">
                            <i class="fas fa-briefcase" style="font-size: 2.5rem; color: #3b82f6; margin-bottom: 1rem;"></i>
                            <h5 class="font-bold text-lg mb-3">${servicio.nombre}</h5>
                            <p class="text-gray-600 text-sm mb-4">${servicio.descripcion}</p>
                            <ul class="text-left text-sm text-gray-700">
                                ${servicio.caracteristicas.map(item => `
                                    <li class="mb-1"><i class="fas fa-dot-circle text-blue-500 mr-2"></i>${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderAdminDashboard() {
    const totalEstudiantes = mockData.cursos.reduce((sum, curso) => sum + curso.estudiantes, 0);
    const ingresosEstimados = mockData.cursos.reduce((sum, curso) => sum + (curso.precio * curso.estudiantes), 0);
    
    return `
        <div class="mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Panel de Control Administrativo</h2>
            <p class="text-gray-600">Vista centralizada del estado de todo el personal, cursos y operaciones</p>
        </div>
        
        <div class="grid grid-cols-4 mb-8">
            <div class="stat-card blue">
                <div>
                    <p class="stat-label">Personal Activo</p>
                    <p class="stat-number">${mockData.guardias.length}</p>
                    <p class="text-sm opacity-80">Guardias certificados</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-user-shield"></i>
                </div>
            </div>
            
            <div class="stat-card green">
                <div>
                    <p class="stat-label">Cursos OTEC</p>
                    <p class="stat-number">${mockData.cursos.length}</p>
                    <p class="text-sm opacity-80">Programas activos</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
            </div>
            
            <div class="stat-card orange">
                <div>
                    <p class="stat-label">Estudiantes</p>
                    <p class="stat-number">${totalEstudiantes}</p>
                    <p class="text-sm opacity-80">Total inscritos</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
            </div>
            
            <div class="stat-card purple">
                <div>
                    <p class="stat-label">Ingresos</p>
                    <p class="stat-number">$${(ingresosEstimados/1000000).toFixed(1)}M</p>
                    <p class="text-sm opacity-80">Proyectados</p>
                </div>
                <div class="stat-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold flex items-center">
                        <i class="fas fa-exclamation-triangle text-orange-600 mr-2"></i>
                        Alertas de Certificaciones
                    </h3>
                </div>
                <div class="card-content">
                    ${mockData.guardias.map(guardia => `
                        <div class="alert alert-warning mb-3">
                            <i class="fas fa-clock"></i>
                            <div>
                                <p class="font-semibold">${guardia.nombre}</p>
                                <p class="text-sm">Certificación OS-10 vence en ${guardia.cursosVencen} días</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold flex items-center">
                        <i class="fas fa-calendar-check text-blue-600 mr-2"></i>
                        Turnos de Hoy
                    </h3>
                </div>
                <div class="card-content">
                    ${mockData.turnos.map(turno => `
                        <div class="alert alert-info mb-3">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <p class="font-semibold">${turno.ubicacion}</p>
                                <p class="text-sm">${turno.guardia} - ${turno.hora}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="text-xl font-bold flex items-center">
                        <i class="fas fa-bell text-green-600 mr-2"></i>
                        Actividad Reciente
                    </h3>
                </div>
                <div class="card-content">
                    ${mockData.notifications.map(notification => `
                        <div class="alert alert-${notification.tipo === 'warning' ? 'warning' : notification.tipo === 'success' ? 'success' : 'info'} mb-3">
                            <i class="fas fa-${notification.tipo === 'warning' ? 'exclamation-triangle' : notification.tipo === 'success' ? 'check-circle' : 'info-circle'}"></i>
                            <div>
                                <p class="text-sm">${notification.mensaje}</p>
                                <p class="text-xs opacity-75">${notification.fecha}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderGestionGuardias() {
    return `
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-4xl font-bold text-gray-800 mb-2">Gestión de Personal de Seguridad</h2>
                    <p class="text-gray-600">Control administrativo completo del personal y sus certificaciones</p>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-user-plus"></i>
                    Nuevo Personal
                </button>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">Personal de Seguridad Registrado</h3>
                    <div class="flex gap-2">
                        <button class="btn btn-secondary">
                            <i class="fas fa-filter"></i>
                            Filtrar
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-download"></i>
                            Exportar
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Información Personal</th>
                                <th>Contacto</th>
                                <th>Estado</th>
                                <th>Certificaciones</th>
                                <th>Próximo Vencimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.guardias.map(guardia => `
                                <tr>
                                    <td>
                                        <div>
                                            <div class="font-bold text-gray-800">${guardia.nombre}</div>
                                            <div class="text-sm text-gray-600">RUT: ${guardia.rut}</div>
                                            <div class="text-sm text-gray-600">Desde: ${guardia.fechaContratacion}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="text-sm">
                                            <div>${guardia.email}</div>
                                            <div class="text-gray-600">${guardia.telefono}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge badge-success">
                                            <i class="fas fa-check-circle mr-1"></i>
                                            ${guardia.estado.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex flex-wrap gap-1">
                                            ${guardia.certificaciones.map(cert => `
                                                <span class="badge badge-info text-xs">${cert}</span>
                                            `).join('')}
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge ${guardia.cursosVencen <= 30 ? 'badge-warning' : 'badge-success'}">
                                            ${guardia.cursosVencen} días
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-primary" style="padding: 0.5rem;">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn btn-secondary" style="padding: 0.5rem;">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-success" style="padding: 0.5rem;">
                                                <i class="fas fa-file-contract"></i>
                                            </button>
                                        </div>
                                    </td>
