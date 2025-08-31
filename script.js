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
    }
];

const noticias = [
    {
        titulo: 'Nueva Certificación OS10 Implementada',
        fecha: '10 de Enero, 2024',
        imagen: 'https://placehold.co/300x200/1a3a6e/white?text=Capacitación+OS10',
        contenido: 'Anunciamos la implementación de la nueva certificación OS10 para nuestros guardias de seguridad...'
    }
];

// Mock data for private system
const mockData = {
    guardias: [
        { id: 1, nombre: 'Juan Pérez', rut: '12345678-9', email: 'juan@example.com', estado: 'activo', cursosVencen: 15 }
    ],
    cursos: [
        { id: 1, nombre: 'Curso OS-10 Básico', fechaInicio: '2025-09-15', duracion: '40 horas', precio: 150000, estudiantes: 25 }
    ],
    turnos: [
        { id: 1, fecha: '2025-08-29', hora: '08:00-20:00', ubicacion: 'Mall Plaza La Serena', guardia: 'Juan Pérez', estado: 'asignado' }
    ]
};

// Menu configurations for private system
const menuConfig = {
    admin: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'gestionar-guardias', label: 'Gestionar Guardias', icon: 'fas fa-shield-alt' }
    ],
    guardia: [
        { id: 'mi-perfil', label: 'Mi Perfil', icon: 'fas fa-user' },
        { id: 'mis-turnos', label: 'Mis Turnos', icon: 'fas fa-calendar' }
    ],
    estudiante: [
        { id: 'mis-cursos', label: 'Mis Cursos', icon: 'fas fa-book' },
        { id: 'examen-practica', label: 'Examen de Práctica OS-10', icon: 'fas fa-clipboard-check' }
    ]
};

// Quiz variables
let questions = [];
let userAnswers = {};

// Simplified question bank for testing
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
            { question: "Las personas autorizadas por la ley para privar de libertad son los agentes de seguridad, Carabineros de Chile y la Policía de Investigaciones.", correctAnswer: "Falso" },
            { question: "Los encubridores, autores, cómplices y víctimas son responsables de los delitos.", correctAnswer: "Falso" },
            { question: "Solamente los Guardias de Seguridad, nocheros y porteros deben capacitarse y no así los rondines.", correctAnswer: "Falso" },
            { question: "En el sitio del suceso el Guardia de Seguridad debe permitir el libre ingreso al lugar de curiosos.", correctAnswer: "Falso" },
            { question: "Existe legitima defensa si la agresión es ilegitima y actual y no existe otro medio para defenderse.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad sólo puede detener a los delincuentes.", correctAnswer: "Falso" },
            { question: "Todo Guardia de Seguridad debe efectuar un curso de capacitación y portar su tarjeta de identificación otorgada por la Autoridad Fiscalizadora respectiva.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad solamente puede detener y allanar al delincuente flagrante.", correctAnswer: "Falso" },
            { question: "Ante un delito flagrante el Guardia de Seguridad está facultado para detener por sospecha.", correctAnswer: "Falso" },
            { question: "El Guardia de Seguridad esta autorizado para ejercer en la vía pública conforme al art. 13 del D.S:93.", correctAnswer: "Falso" },
            { question: "La directiva de funcionamiento es un documento que debe confeccionar la empresa y acreditarlo ante la Autoridad Fiscalizadora.", correctAnswer: "Verdadero" },
            { question: "Las oficinas de seguridad privada operan en las respectivas Prefecturas de Carabineros como Autoridades Fiscalizadoras.", correctAnswer: "Verdadero" },
            { question: "En el delito de hurto no encontramos ni fuerza en las cosas ni violencia ni intimidación en las personas.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad puede portar armas de fuego cuando su empleador se lo permita.", correctAnswer: "Falso" },
            { question: "Delito es toda acción u omisión culpable penada por la Ley.", correctAnswer: "Verdadero" },
            { question: "Los delitos que generalmente se cometen en los supermercados son definidos tipificados como hurtos o faltas.", correctAnswer: "Verdadero" }
        ],

        "PRIMEROS AUXILIOS": [
            { question: "El objetivo básico de otorgar primeros auxilios es sólo establecer la identificación de la causa del daño que afecta al accidentado.", correctAnswer: "Falso" },
            { question: "Ante un traumatismo torácico, lo primordial es inmovilizar el cuello para evitar un daño a la columna vertebral.", correctAnswer: "Falso" },
            { question: "Existen las hemorragias capilares, venosas y subjuntivas.", correctAnswer: "Falso" },
            { question: "Un hematoma se produce cuando hay fractura expuesta.", correctAnswer: "Falso" },
            { question: "Lo más importante en un parto es sacar al niño y pegarle una palmada para ver si esta vivo.", correctAnswer: "Falso" },
            { question: "Los primeros auxilios que se deben prestar a una persona con paro cardiaco es levantar los pies para la mejor circulación.", correctAnswer: "Falso" },
            { question: "En las luxaciones encontramos discontinuidad de una pieza ósea o hueso.", correctAnswer: "Falso" },
            { question: "Frente a un estado de schock debemos dejar que el accidentado duerma, para así lograr que se recupere de mejor forma.", correctAnswer: "Falso" },
            { question: "Los primeros auxilios a una persona con paro cardiaco es efectuar masaje cardiaco.", correctAnswer: "Verdadero" },
            { question: "La atención de primeros auxilios a una persona fracturada es efectuar masaje.", correctAnswer: "Falso" },
            { question: "La atención de primeros auxilios a una persona fracturada es efectuar un masaje cardiaco.", correctAnswer: "Falso" },
            { question: "Podemos distinguir las hemorragias venosas cuando la sangre brota sin fuerza y tiene un tono rojo oscuro.", correctAnswer: "Verdadero" },
            { question: "El botiquín de primeros auxilios es primordial en una instalación.", correctAnswer: "Verdadero" },
            { question: "La atención de primeros auxilios a una persona fracturada es efectuar un torniquete.", correctAnswer: "Falso" },
            { question: "La atención de primeros auxilios a una persona fracturada es elevar las extremidades inferiores.", correctAnswer: "Falso" },
            { question: "La atención de primeros auxilios a una persona fracturada es la inmovilización de la zona afectada.", correctAnswer: "Verdadero" },
            { question: "Frente a una hemorragia arterial se debe comprimir el punto venoso más cercano a la herida.", correctAnswer: "Falso" },
            { question: "De acuerdo a los principios de los primeros auxilios, no importa quién los aplica éstos, con tal de atender al afectado.", correctAnswer: "Falso" },
            { question: "El traumatismo encéfalo craneano puede ser abierto o cerrado.", correctAnswer: "Verdadero" },
            { question: "Frente a un parto normal debemos tomar al recién nacido de la cabeza y expulsarlo para que salga más rápido.", correctAnswer: "Falso" },
            { question: "El uso del torniquete sólo se aplica en casos extremos, debiendo contenerse la presión sanguínea por no más de 5 minutos, soltando 30 segundos.", correctAnswer: "Verdadero" },
            { question: "Las hemorragias pueden ser venosas y arteriales.", correctAnswer: "Verdadero" },
            { question: "No pueden producirse quemaduras con elementos como químicos ácidos.", correctAnswer: "Falso" },
            { question: "Los primeros auxilios a una persona con paro cardiaco es efectuar respiración boca a boca.", correctAnswer: "Verdadero" }
        ],

        "PROTECCIÓN DE INSTALACIONES": [
            { question: "Dentro de las funciones básicas de un vigilante privado y/o guardia de seguridad está la de desempeñar la protección de las personas tanto dentro como fuera de los recintos e instalaciones de la empresa.", correctAnswer: "Falso" },
            { question: "Cuando sea visitada la empresa por personal externo, básicamente se deben efectuar los siguientes procedimientos: identificación de la visita, solicitar con quién se va a entrevistar, dejar constancia en el libro de registro respectivo.", correctAnswer: "Verdadero" },
            { question: "Las rondas un control móvil superficial de áreas, realizadas con una frecuencia más o menos regular.", correctAnswer: "Verdadero" },
            { question: "Los tipos de fuego son A,B y C.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad debe utilizar psicología para enfrentar situaciones difíciles.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad es una barrera animal.", correctAnswer: "Falso" },
            { question: "Inspección de seguridad, consiste en controles sorpresivos del cumplimiento de las medidas y disposiciones de seguridad, emanadas del Estudio de Seguridad, Planes Manuales y/o Directiva de Funcionamiento.", correctAnswer: "Verdadero" },
            { question: "Seguridad de instalaciones involucra entre otras; protección de edificios, custodia de dependencias, protección de recintos donde las personas trabajan.", correctAnswer: "Verdadero" },
            { question: "El perro constituye una barrera natural.", correctAnswer: "Falso" },
            { question: "El sitio del suceso corresponde al lugar donde el Guardia de Seguridad presta servicios.", correctAnswer: "Falso" },
            { question: "Los accidentes se originan cuando se sobrepasan las vulnerabilidades.", correctAnswer: "Verdadero" },
            { question: "El factor sorpresa esta considerado como una vulnerabilidad.", correctAnswer: "Verdadero" },
            { question: "Dentro de los tipos de barreras tenemos las sonoras que están constituidos funcionalmente por perros adiestrados y destinados a anunciar la presencia de los extraños.", correctAnswer: "Verdadero" },
            { question: "Dentro de los tipos de barreras podemos destacar: naturales, artificiales, humanas, animales y de energía.", correctAnswer: "Verdadero" },
            { question: "La prevención está orientada fundamentalmente a actuar sobre el origen o causas de los accidentes, a fin de evitar los daños.", correctAnswer: "Verdadero" },
            { question: "La seguridad privada es la que se ejerce en privado.", correctAnswer: "Falso" },
            { question: "Ante un asalto, el Guardia de Seguridad, siempre enfrentará el factor sorpresa con que actúen los delincuentes.", correctAnswer: "Verdadero" },
            { question: "La seguridad personal, es el conjunto de acciones, actitudes e ideas que propenden a proteger principalmente los edificios, dependencias o recintos.", correctAnswer: "Falso" },
            { question: "Dentro de la clasificación de personas podemos indicar entre otros: El sexo, raza, edad, estatura, figura, etc.", correctAnswer: "Verdadero" },
            { question: "Vulnerabilidades que pueden afectar la seguridad son: el sabotaje o intento de este, el robo, la deslealtad funcionaria, comentarios tendenciosos.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad es una barrera artificial.", correctAnswer: "Falso" },
            { question: "Las barreras se clasifican en: Naturales, Artificiales, Animales y Humanas.", correctAnswer: "Verdadero" },
            { question: "Un cerro o una cordillera es una barrera artificial.", correctAnswer: "Falso" },
            { question: "Entre otros actos encontramos algunos que no atentan contra la seguridad como el sabotaje o intento de este, la apropiación, la deslealtad funcionaria y los comentarios tendenciosos.", correctAnswer: "Falso" },
            { question: "Dentro de los sentidos de la observación podemos mencionar: vista, oído, tacto, olfato y gusto.", correctAnswer: "Verdadero" },
            { question: "Dentro del control de accesos tenemos áreas de responsabilidad y cumplimiento denominadas: Restringidas y Prohibidas.", correctAnswer: "Verdadero" },
            { question: "Las barreras se definen como obstáculos que se interponen entre el delincuente y lo que se desea proteger.", correctAnswer: "Verdadero" },
            { question: "Las barreras se clasifican solamente en, alumbrado de perímetro y perros adiestrados.", correctAnswer: "Falso" },
            { question: "El objetivo básico del control de acceso es regular el egreso de personas y elementos del recinto a cargo del personal de vigilante privados y/o guardias de seguridad.", correctAnswer: "Falso" },
            { question: "Ante una amenaza de instalación de artefacto explosivo no se debe tocar o mover nada.", correctAnswer: "Verdadero" },
            { question: "El asaltante se caracteriza por actuar sin planificación alguna.", correctAnswer: "Falso" },
            { question: "Sólo el Jefe de Seguridad de una empresa debe conocer los planes de emergencia de ésta, para que no se divulguen entre el personal de la instalación.", correctAnswer: "Falso" },
            { question: "El prevenir se logra estando atento al servicio, controlar y fiscalizar al máximo las medidas de seguridad de la empresa.", correctAnswer: "Verdadero" },
            { question: "Dentro de los tipos de barreras se cuentan las artificiales.", correctAnswer: "Verdadero" },
            { question: "El vigilante privado o guardia de seguridad deben efectuar inspecciones a la instalación protegida para reconocer peligros de incendio.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad es una barrera artificial pasiva.", correctAnswer: "Falso" }
        ],

        "CONOCIMIENTOS DE SISTEMAS DE ALARMA": [
            { question: "Para detectar un incendio existen detectores de temperatura y de humo.", correctAnswer: "Verdadero" },
            { question: "Para proyectar un buen sistema de detección se debe considerar, que este sólo suene fuerte.", correctAnswer: "Falso" },
            { question: "Para una adecuada detección de incendios deben existir mangueras adecuadas y grifos cercanos.", correctAnswer: "Falso" },
            { question: "El circuito cerrado de televisión lo debemos considerar, que esta destinado al reemplazo total de Guardias de Seguridad.", correctAnswer: "Falso" },
            { question: "Las alarmas solo se activan en caso de incendio y sospechosas de robo y hurto.", correctAnswer: "Falso" },
            { question: "El extintor se utiliza para amagar un fuego.", correctAnswer: "Verdadero" },
            { question: "El circuito cerrado de televisión es un sistema apropiado sólo para áreas de difícil observación.", correctAnswer: "Falso" },
            { question: "Alarma es un elemento que sirve para advertir el peligro, sólo en casos de delitos flagrantes.", correctAnswer: "Falso" },
            { question: "Se puede contar entre otras alarmas los siguientes tipos: transceptores y teléfonos.", correctAnswer: "Falso" },
            { question: "Los polvos químicos de los extintores se clasifican en tipo, ABC, BC, CO2.", correctAnswer: "Verdadero" },
            { question: "Los medios de comunicación deben ser ocupados ante reales necesidades en forma ambigua y entregando en forma detallada los antecedentes.", correctAnswer: "Falso" },
            { question: "Los sensores son elementos que se activan, permitiendo percibir una determinada señal.", correctAnswer: "Verdadero" },
            { question: "Un sistema de alarmas debe tener etapas básicas, detección, control y respuesta.", correctAnswer: "Verdadero" },
            { question: "Las alarmas son elementos manuales o eléctricos que se utilizan para advertir peligro de intrusión o de incendio.", correctAnswer: "Verdadero" },
            { question: "Las condiciones básicas de un sistema electrónico de alarma son: facilidad de instalación, facilidad operacional, costo, características de funcionamiento, características eléctricas, instalación segura,capacitación y mantenimiento y respaldo.", correctAnswer: "Verdadero" },
            { question: "El uso indebido de los medios técnicos y la mala manipulación de artefactos producen fallas técnicas.", correctAnswer: "Verdadero" },
            { question: "El circuito cerrado de televisión es un complemento al sistema electrónico de alarma.", correctAnswer: "Verdadero" },
            { question: "El pulsador inalámbrico es aquel que opera a control remoto.", correctAnswer: "Verdadero" },
            { question: "Fuego de grandes proporciones es donde se quema lo que no está destinado a arder.", correctAnswer: "Verdadero" }
        ],

        "VALORES Y ÉTICA": [
            { question: "La tolerancia es fundamental en la convivencia laboral.", correctAnswer: "Verdadero" },
            { question: "A veces es necesario mentir para salir de algún problema.", correctAnswer: "Falso" },
            { question: "El cumplimento y espíritu de cuerpo se mide, presentando y censurando aquellas actitudes erróneas de todos los que integran un sistema de seguridad.", correctAnswer: "Verdadero" },
            { question: "Las comunicaciones interpersonales adecuadas constituyen una herramienta fundamental para lograr un ambiente positivo en las relaciones humanas del personal de seguridad.", correctAnswer: "Verdadero" },
            { question: "La honestidad es una habilidad para engañar a los demás sin crear ofensa.", correctAnswer: "Falso" },
            { question: "El subordinado debe darle cumplimiento a las ordenes, no importando las circunstancias.", correctAnswer: "Falso" },
            { question: "La educación y la cultura no tiene importancia en la labor del Guardia de Seguridad.", correctAnswer: "Falso" },
            { question: "Los roces dentro del sistema de vigilancia, constituyen una vulnerabilidad pues afectan el aspecto técnico operativo de la empresa protegida.", correctAnswer: "Verdadero" },
            { question: "El valor, el coraje, la osadía y la desvergüenza son elementos para mantener la moral al personal de seguridad.", correctAnswer: "Falso" },
            { question: "La presentación personal de seguridad, no tiene incidencia en el servicio.", correctAnswer: "Falso" },
            { question: "Para un desempeño eficiente, el Guardia de Seguridad debe considerar, ser eficaz en el trabajo, que es una profesión importante, que se debe conocer completamente sus funciones.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad. es la cara visible de la empresa.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad no le debe importar el respeto por el público en general.", correctAnswer: "Falso" },
            { question: "La honestidad es la obligación moral más grande.", correctAnswer: "Verdadero" },
            { question: "El trabajo armónico, conlleva entre otras una adecuada convivencia y un buen rendimiento.", correctAnswer: "Verdadero" },
            { question: "Es obligación del Guardia de Seguridad el desplegar iniciativa solamente ante eventuales riesgos o delitos.", correctAnswer: "Falso" },
            { question: "La motivación inadecuada de un Guardia de Seguridad puede ser origen de accidentes.", correctAnswer: "Verdadero" },
            { question: "La ética profesional es aquella que trata de la moral y de las obligaciones del hombre.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad es la imagen corporativa de la empresa.", correctAnswer: "Verdadero" },
            { question: "Vocación: es la disposición a ejercer determinadas tareas, es dedicarse a lo que se considera que tiene especial disposición.", correctAnswer: "Verdadero" },
            { question: "La moral es la capacidad del ser humano para distinguir entre lo bueno y lo malo.", correctAnswer: "Verdadero" },
            { question: "La Etica es la parte de la filosofía que trata de la moral que debe observar una persona.", correctAnswer: "Verdadero" },
            { question: "Según el concepto de ética podemos afirmar que es el coraje del hombre.", correctAnswer: "Falso" },
            { question: "Un Guardia de Seguridad debe poseer y exhibir cualidades como, tacto y criterio, cortesía y seguridad de sí mismo, carácter firme y lenguaje adecuado, buenos modales.", correctAnswer: "Verdadero" },
            { question: "El respeto en el lugar de trabajo no siempre es necesario.", correctAnswer: "Falso" },
            { question: "El Guardia de Seguridad y la empresa se deben a sus clientes.", correctAnswer: "Verdadero" },
            { question: "Los valores éticos y morales se dan en el ser humano por su capacidad de razonar y discernir.", correctAnswer: "Verdadero" },
            { question: "La existencia del rumor es primordial para crear un ambiente laboral con buenas relaciones humanas.", correctAnswer: "Falso" },
            { question: "Actuar con tino significa hacerlo con acierto, con buen juicio, para resolver un problema.", correctAnswer: "Verdadero" },
            { question: "De acuerdo a las acciones éticas que cumplen los Guardias de Seguridad se requiere de adecuados elementos como linternas, pito y esposas.", correctAnswer: "Falso" },
            { question: "La persona que trabaja en la instalación siempre confiará en el Guardia de Seguridad como una persona de buenas costumbre y además capacitada en situaciones de emergencias.", correctAnswer: "Verdadero" },
            { question: "El valor para enfrentar los riesgos profesionales es sinónimo de ser temerario.", correctAnswer: "Falso" },
            { question: "El concepto de autoridad, es necesario que una persona imponga a otra una determinación de manera obligatoria.", correctAnswer: "Verdadero" },
            { question: "Lo fundamental en la tarea del Guardia de Seguridad es demostrar diariamente su compromiso con la tarea de seguridad que asumido.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad además de su condición de tal, debe demostrar sus virtudes personales como fórmula exacta para el enriquecimiento de su actuar.", correctAnswer: "Verdadero" },
            { question: "El Guardia de Seguridad debe ser, moderado en su actuar, esto es una muestra de auto control o autodisciplina.", correctAnswer: "Verdadero" },
            { question: "Por las funciones que cumplen los Guardias de Seguridad se requiere una estructura, bien jerarquizada y una disciplina más rigurosa que otras funciones laborales.", correctAnswer: "Verdadero" },
            { question: "La lealtad hacia los compañeros se demuestra, ejecutando el turno cuando éstos no llegan a su servicio, para que no se vea éste.", correctAnswer: "Verdadero" },
            { question: "La honradez no es un valor para el Guardia de Seguridad.", correctAnswer: "Falso" },
            { question: "La responsabilidad es asumir con las consecuencias de los actos de todos.", correctAnswer: "Falso" },
            { question: "Por rigurosas que sean las normas o procedimientos de control, debe existir amabilidad, deferencia, una actitud cortés y adecuada, por neutralizar el rechazo que dichas normas.", correctAnswer: "Verdadero" }
        ],

        "SISTEMAS DE COMUNICACIÓN Y ENLACE": [
            { question: "Respecto a una consulta telefónica, no se debe gastar a tiempo en verificaciones, para evitar mantener ocupada la línea.", correctAnswer: "Falso" },
            { question: "Teléfono es un elemento de comunicación, que nunca se debe utilizar porque es vulnerable.", correctAnswer: "Falso" },
            { question: "El fax dentro del sistema de comunicación y enlace, lo podemos definir como un equipo codificador y decodificador de relativa seguridad en su emisión.", correctAnswer: "Verdadero" },
            { question: "El contacto magnético se usa para detectar humo.", correctAnswer: "Falso" },
            { question: "Las fallas más comunes de los sistemas de alarmas pueden ser fallas de circuito, fallas de computador, fallas humanas.", correctAnswer: "Verdadero" },
            { question: "Las claves de lo sistemas radiales de los Guardias de Seguridad pueden copiar las claves de los Servicios de Emergencia Ambulancias, Bomberos, Carabineros.", correctAnswer: "Falso" },
            { question: "Dentro de los elementos de un sistema de enlace, se cuentan los transceptores, los cuales deben poseer una frecuencia conectada a Carabineros.", correctAnswer: "Falso" },
            { question: "Los sistemas de alarmas son métodos de protección de las personas y bienes.", correctAnswer: "Verdadero" },
            { question: "Los servicios de equipos radiales son autorizados y fiscalizados por la Subsecretaría de Telecomunicaciones.", correctAnswer: "Verdadero" },
            { question: "Las comunicaciones radiales entre una empresa de Seguridad y otra institución pueden realizarse a través de la misma frecuencia.", correctAnswer: "Falso" },
            { question: "Las comunicaciones del personal de Guardia de Seguridad no deben observar el conducto regular que exista en cada empresa, para agilizar el sistema.", correctAnswer: "Falso" },
            { question: "Ante un llamado anónimo que anuncie colocación de un artefacto explosivo, se debe cortar rápidamente la llamada, para evitar la comunicación.", correctAnswer: "Falso" },
            { question: "A toda persona ajena a la empresa se les proporcionará antecedentes relacionados con el funcionamiento de guardias o vigilancia, sólo cuando se requiera por escrito.", correctAnswer: "Falso" },
            { question: "Las comunicaciones por el fax deben ser breves y bien concretas, en beneficio del tiempo.", correctAnswer: "Verdadero" },
            { question: "Al activar un sistema de alarma de incendios no se debe evacuar el público desde la instalación amagada.", correctAnswer: "Falso" }
        ],

        "PREVENCIÓN Y CONTROL DE EMERGENCIA": [
            { question: "INFLAMABLES Sustancias que a alta temperatura ambiente desprenden vapores que, mezclados con el aire, pueden arder en presencia de una fuente de calor.", correctAnswer: "Falso" },
            { question: "Los grifos son de costo más alto y prestan una más deficiente acción por las largas tiras de mangueras y gran cantidad de extintores manuales que se deben emplear.", correctAnswer: "Falso" },
            { question: "Si las medidas preventivas no han sido suficientes y se produce el delito, el Guardia de Seguridad deberá mantener una actitud calmada, serena y de sangre fría, con el fin de que su actitud sirva de modelo para el personal y público presente en el recinto.", correctAnswer: "Verdadero" },
            { question: "Se recomienda que en toda llamada anónima que el receptor no trate de establecer el número de teléfono que llama; no tratar de identificar a la persona que realiza la llamada.", correctAnswer: "Falso" },
            { question: "Evacuación: Es un sistema que se aplica en una Empresa u Organización, para ingresar aun lugar, sitio, área o dependencia que se encuentra amagado por una situación de emergencia, temporal o permanente, que en forma organizada, metódica o coordinada, permita evitar daños a la integridad física de las personas y, cuando proceda, resguardar ciertos bienes.", correctAnswer: "Falso" },
            { question: "Ante una emergencia, es preciso tener presente algunas recomendaciones como: No utilizar ascensores. (Personas atrapadas - efecto chimenea), En caso de alarma, suspender trabajos y efectuar cortes de energía. No tratar de volver al lugar habitual de trabajo, en caso de encontrarse lejos, y seguir instrucciones del lugar donde se encuentren.", correctAnswer: "Verdadero" },
            { question: "INFLAMABLES Sustancias que a la temperatura ambiente normal desprenden vapores que, mezclados con el aire, pueden arder en presencia de una fuente de calor.", correctAnswer: "Verdadero" },
            { question: "En los primeros lugares de las causas de incendios y explosiones en la industria, se encuentran los líquidos inflamables.", correctAnswer: "Verdadero" },
            { question: "Fuegos clase D. Son los incendios de metales como sodio, titanio, magnesio, litio y circonio. El extintor debe tener la letra D, de color blanco, sobre una estrella de 5 puntas de color amarillo.", correctAnswer: "Verdadero" },
            { question: "Los estilos del cabello para su descripción pueden ser: largo, corto, muy corto, partido al lado, derecho (izquierdo), peinado hacia atrás, etc.", correctAnswer: "Verdadero" },
            { question: "La descripción de vehículos es más simple que la de personas, por el sólo hecho que los vehículos son repetitivos en sus características, sin embargo es posible notar algunos detalles que los diferencian de sus congéneres.", correctAnswer: "Verdadero" },
            { question: "En defensa personal se debe tener presente que siempre se debe actuar por instinto.", correctAnswer: "Falso" },
            { question: "Una vez que un Guardia ha recibido entrenamiento para reconocer los peligros de incendios, debería incluir este aspecto en los recorridos regulares que realiza en su servicio y tomar la acción correctiva cuando sea requerida.", correctAnswer: "Verdadero" },
            { question: "Los extintores de polvo químico seco se emplean entre otros para incendios de líquidos inflamables.", correctAnswer: "Verdadero" },
            { question: "Una de las tantas razones que justifican la labor de los Vigilantes Privados y/o Guardias de Seguridad es que con un accionar seguro, decidido y profesional, hagan a los antisociales cometer delitos.", correctAnswer: "Falso" },
            { question: "Un delincuente profesional puede: trabajar en equipo, hacerse pasar por vendedor y/o repartidor, mostrarse seguro de sí mismo, al ser desafiado verbalmente, reaccionar con agresividad, al ser desafiado físicamente pelear y huir.", correctAnswer: "Verdadero" },
            { question: "El color del cabello puede describirse como: negro, gris, rojo dorado, blanquecido, rubio, grisáceo. Debiendo tener presente que el cabello puede estar teñido.", correctAnswer: "Verdadero" },
            { question: "FUEGO: Es un proceso de combustión suficientemente intenso como para emitir calor y luz.", correctAnswer: "Verdadero" },
            { question: "Dependiendo del lugar que se inspeccione, para evitar incendios deberá buscar materiales combustibles almacenados cerca de operaciones que producen llamas o chispas ( como por ejemplo esmerilado, oxicorte o soldadura); líneas de combustible y oxígeno, que no están marcadas o que están incorrectamente identificadas permite que se les confunda con líneas de aire o agua; falta de letreros de no fumar en lugares donde hay líquidos, vapores, gases u otros materiales muy inflamables que están almacenados o se los está usando. Uso de herramientas o equipos que produzcan chispas, en estos lugares.", correctAnswer: "Verdadero" },
            { question: "Fuegos clase C. Son los incendios eléctricos o que ocurren cerca de equipos eléctricos, presentando además el peligro de un choque eléctrico. El extintor debe tener la letra C, de color blanco, sobre un circulo de color azul.", correctAnswer: "Verdadero" },
            { question: "Un sistema para el control de incendio es la sofocación que consiste en el aislamiento del comburente, (oxigeno o aire) y se logra mediante el empleo de agentes capaces de privar o de empobrecer de oxigeno la atmósfera que rodea el combustible afectado. En la mayoría de los casos basta con un porcentaje inferior a 15 % de oxigeno en el aire para lograr la extinción.", correctAnswer: "Verdadero" },
            { question: "En general no es posible describir el modus Operandi de los delincuentes pues estos varían según el tipo de delincuentes, características del delito a cometer y es así como podemos agruparlos en forma didáctica, considerando aquellos delitos en que puede accionar un Guardia de Seguridad de la siguiente manera.", correctAnswer: "Falso" },
            { question: "El registro de un detenido cuando legalmente este respaldado debe ser meticuloso y solo se puede realizar cuando el detenido esté reducido, aislado y esposado.", correctAnswer: "Verdadero" },
            { question: "Riesgos que originan las maquinarias y vehículos: El manejo de vehículos y maquinarias es un factor de permanente riesgo, en particular para quienes no están habituados a su uso.", correctAnswer: "Verdadero" },
            { question: "El pronto descubrimiento de un incendio es, indudablemente vital, tanto para la extinción como para la seguridad de las personas.", correctAnswer: "Verdadero" },
            { question: "Psicóticos son enfermos mentales en que hay una profunda alteración de la personalidad, más o menos prolongada, con peligrosidad y perjuicio para ellos mismos o para la sociedad. En cierto sentido, los sicóticos conceptualmente equivalen a los enajenados y pueden usarse estos términos indistintamente.", correctAnswer: "Verdadero" },
            { question: "Características que ayudan a detectar delincuentes: Constante movimiento de ojos, miradas a los sistemas de seguridad y no a la mercadería, conducta errante y/o nerviosa, con poco interés en adquirir la mercadería, búsqueda de privacidad e intento de llevar la mercadería a lugares aislados.", correctAnswer: "Verdadero" },
            { question: "Características que ayudan a detectar buenos clientes: Constante movimiento de ojos, miradas a los sistemas de seguridad y no a la mercadería, conducta errante y/o nerviosa, con poco interés en adquirir la mercadería, búsqueda de privacidad e intento de llevar la mercadería a lugares aislados.", correctAnswer: "Falso" },
            { question: "Cuando se esposa un detenido con un par de esposas, se esposa la muñeca derecha pasando grillete por entre su cinturón para finalizar esposando muñeca izquierda dejando palmas hacia fuera.", correctAnswer: "Verdadero" },
            { question: "Los incendios de tipo A son de leña y madera; los de tipo B son de elementos inflamables; y los tipos C por motores energizados.", correctAnswer: "Verdadero" },
            { question: "Frente a un fuego dentro de un recinto cerrado el Guardia de Seguridad cerrará puertas y ventanas para así evitar que entre más oxígeno.", correctAnswer: "Falso" },
            { question: "El personal que labora en una instalación, es un agente potencial generador de riesgo o víctima de ellos, en consecuencia debe existir un procedimiento que deben cumplir los controles desde el punto de vista de seguridad.", correctAnswer: "Verdadero" }
        ],

        "PREGUNTAS ADICIONALES": [
            { question: "La Autoridad Fiscalizadora de la Seguridad Privada en Chile es la Prefectura de Carabineros de Chile del sector.", correctAnswer: "Verdadero" },
            { question: "La Ley N° 21.659, publicada en marzo de 2024, es la única ley que regula la seguridad privada en Chile actualmente.", correctAnswer: "Falso" },
            { question: "La seguridad privada, según las normativas vigentes antes de la Ley 21.659, busca reemplazar a la seguridad pública.", correctAnswer: "Falso" },
            { question: "Uno de los requisitos para ser Guardia de Seguridad según el Decreto 93 es tener 18 años.", correctAnswer: "Verdadero" },
            { question: "Los Guardias de Seguridad están autorizados para portar armas de fuego en el ejercicio de sus funciones según el Decreto 93.", correctAnswer: "Falso" },
            { question: "El curso de formación para Guardia de Seguridad, según el Decreto 93, tiene una duración de 90 horas.", correctAnswer: "Verdadero" },
            { question: "El seguro de vida para Guardias de Seguridad, según el Decreto 93, tiene una cifra asegurada de 75 UTM.", correctAnswer: "Verdadero" },
            { question: "El uniforme de un Guardia de Seguridad, según el Decreto 93, es libre y sin especificaciones de color.", correctAnswer: "Falso" },
            { question: "Un Guardia de Seguridad está facultado para detener a alguien solo en caso de sorprenderlo en delito flagrante.", correctAnswer: "Verdadero" },
            { question: "Delito es toda acción u omisión VOLUNTARIA penada por la Ley.", correctAnswer: "Verdadero" },
            { question: "Cuasidelito es toda acción u omisión INVOLUNTARIA, penada por la ley.", correctAnswer: "Verdadero" },
            { question: "La diferencia entre robo y hurto es que el robo se comete con violencia, intimidación o fuerza en las cosas, mientras que el hurto no.", correctAnswer: "Verdadero" },
            { question: "La legítima defensa es aplicable solo si existe presencia policial en el momento de la agresión.", correctAnswer: "Falso" },
            { question: "El sitio del suceso debe ser preservado y no alterado para la investigación.", correctAnswer: "Verdadero" },
            { question: "Una ronda fija se caracteriza por tener la hora y el trayecto preestablecidos.", correctAnswer: "Verdadero" },
            { question: "Los Guardias de Seguridad deben proteger personas y bienes, siendo la vida del guardia la más importante.", correctAnswer: "Verdadero" },
            { question: "Ante el hallazgo de un artefacto explosivo, la primera acción debe ser intentar desactivarlo si se tienen conocimientos.", correctAnswer: "Falso" },
            { question: "Una evacuación es el traslado ordenado de personas hacia una zona de seguridad designada.", correctAnswer: "Verdadero" },
            { question: "Una Directiva de Funcionamiento es un documento que señala el funcionamiento íntegro de los guardias de seguridad.", correctAnswer: "Verdadero" },
            { question: "El Estudio de Seguridad es aprobado por la Prefectura de Carabineros del sector.", correctAnswer: "Verdadero" },
            { question: "El porte ilegal de armas es portar un arma en la vía pública sin autorización.", correctAnswer: "Verdadero" },
            { question: "La Subsecretaría de Telecomunicaciones (SUBTEL) es la entidad que autoriza el uso de radiocomunicaciones en seguridad privada.", correctAnswer: "Verdadero" },
            { question: "En un supermercado, un guardia puede detener a una persona por consumir un alimento antes de pasar por caja, incluso si no ha salido del establecimiento.", correctAnswer: "Falso" },
            { question: "El secuestro es el traslado o retención de una o más personas sin su consentimiento.", correctAnswer: "Verdadero" },
            { question: "La misión de Carabineros de Chile incluye garantizar el Orden y la Seguridad Pública.", correctAnswer: "Verdadero" },
            { question: "Escalamiento es ingresar a una propiedad por una vía no destinada al efecto.", correctAnswer: "Verdadero" },
            { question: "La función principal de una antena en un transceptor portátil es amplificar el sonido.", correctAnswer: "Falso" },
            { question: "El contacto magnético es un sistema de alarma utilizado en puertas y ventanas para detectar aperturas.", correctAnswer: "Verdadero" },
            { question: "Los daños físicos y psíquicos sufridos por un guardia en el cumplimiento de sus funciones se consideran actos del servicio y pueden derivar en enfermedades profesionales.", correctAnswer: "Verdadero" },
            { question: "Para ser Guardia de Seguridad, se requiere haber cursado educación básica completa.", correctAnswer: "Falso" },
            { question: "No tiene responsabilidad penal quienes compran una cosa hurtada, ya que él no la sustrajo.", correctAnswer: "Falso" },
            { question: "La legítima defensa solamente se hace extensiva a la propia persona y no a terceros.", correctAnswer: "Falso" },
            { question: "Robo es la apropiación de una cosa sin que intervengan la fuerza o violencia.", correctAnswer: "Falso" },
            { question: "Son responsables en la comisión de un delito, los autores, los cómplices y los encubridores cuando en ellos solo se utilice imprudencia y negligencia.", correctAnswer: "Falso" },
            { question: "La policía debe eximir de responsabilidad penal al que obre en defensa de su persona o derechos, siempre que concurra, entre otras circunstancias la agresión ilegítima.", correctAnswer: "Verdadero" },
            { question: "La Nación políticamente organizada es sinónimo de Estado.", correctAnswer: "Verdadero" },
            { question: "En el sistema de vigilancia privada vigente, solo los Guardias de Seguridad, están sujetos a la fiscalización de la Autoridad Fiscalizadora de la prefectura de Carabineros de su sector jurisdiccional.", correctAnswer: "Falso" },
            { question: "En algunos casos los Guardias de Seguridad pueden actuar de civil, si están debidamente autorizados por la Autoridad Fiscalizadora.", correctAnswer: "Verdadero" },
            { question: "El O.S. 10 no puede fiscalizar a los Guardias de Seguridad los días domingos y festivos.", correctAnswer: "Falso" },
            { question: "No es obligación que los Guardias de Seguridad mantengan la Directiva de Funcionamiento en su respectiva instalación.", correctAnswer: "Falso" },
            { question: "Las alarmas son elementos manuales o eléctricos que se utilizan para advertir peligro de intrusión o de incendio.", correctAnswer: "Verdadero" },
            { question: "Para una adecuada detección de incendios deben existir mangueras adecuadas y grifos cercanos.", correctAnswer: "Falso" },
            { question: "Un sistema de alarmas debe tener etapas básicas, detección, control y respuesta.", correctAnswer: "Verdadero" },
            { question: "El circuito cerrado de Televisión es un complemento al sistema electrónico de alarma.", correctAnswer: "Verdadero" },
            { question: "La empresa de seguridad privada debe informar mensualmente a Carabineros sobre el personal que labora en sus instalaciones.", correctAnswer: "Verdadero" },
            { question: "Los guardias pueden realizar registros corporales a personas que ingresen a las instalaciones que custodian.", correctAnswer: "Falso" },
            { question: "El guardia de seguridad puede usar la fuerza física solo en legítima defensa propia o de terceros.", correctAnswer: "Verdadero" },
            { question: "Es obligatorio que el guardia de seguridad mantenga un libro de novedades actualizado durante su turno.", correctAnswer: "Verdadero" },
            { question: "El curso OS-10 debe ser renovado cada 3 años según la normativa vigente.", correctAnswer: "Falso" },
            { question: "Los guardias de seguridad pueden portar bastón de goma como elemento de protección personal.", correctAnswer: "Verdadero" },
            { question: "La detención por particulares no puede exceder de 24 horas sin entregar al detenido a la autoridad competente.", correctAnswer: "Verdadero" }
        ]
    };
// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    console.log("App initialized");
    
    // Elements
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    
    initPublicSite();

    // Login functionality
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
    
    if (mobileLoginBtn && modal) {
        mobileLoginBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }

    // Quiz functionality
    const startExamBtn = document.getElementById('start-exam-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (startExamBtn) {
        startExamBtn.addEventListener('click', generateQuestions);
    }
    
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', submitQuiz);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeResultsModal);
    }

    renderBlog();
    renderCursos();
});

function initPublicSite() {
    const publicSite = document.getElementById('publicSite');
    const privateSystem = document.getElementById('privateSystem');
    
    if (publicSite) publicSite.classList.remove('hidden');
    if (privateSystem) privateSystem.classList.add('hidden');
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
                <button class="btn" onclick="openLoginForEnrollment('${curso.nombre}')">Inscribirse</button>
            </div>
        `).join('');
    }
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
        
        const modal = document.getElementById('loginModal');
        const publicSite = document.getElementById('publicSite');
        const privateSystem = document.getElementById('privateSystem');
        
        if (modal) modal.classList.remove('active');
        if (publicSite) publicSite.classList.add('hidden');
        if (privateSystem) privateSystem.classList.remove('hidden');
        
        updatePrivateUI();
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function logout() {
    currentUser = null;
    currentSection = 'home';
    
    const publicSite = document.getElementById('publicSite');
    const privateSystem = document.getElementById('privateSystem');
    
    if (privateSystem) privateSystem.classList.add('hidden');
    if (publicSite) publicSite.classList.remove('hidden');
}

function toggleSidebar(show = null) {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (!sidebar || !mainContent) return;
    
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
}

function updatePrivateUI() {
    updatePrivateHeader();
    updateSidebar();
    updateMainContent();
}

function updatePrivateHeader() {
    const headerActions = document.getElementById('headerActions');
    if (headerActions && currentUser) {
        headerActions.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="user-welcome">Bienvenido, ${currentUser.nombre}</span>
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        `;
    }
}

function updateSidebar() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    if (!sidebarMenu || !currentUser) return;

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
    if (!mainContent || !currentUser) return;

    switch (currentSection) {
        case 'examen-practica':
            mainContent.innerHTML = renderExamenPractica();
            break;
        case 'mis-cursos':
            mainContent.innerHTML = renderMisCursos();
            break;
        case 'dashboard':
            mainContent.innerHTML = renderAdminDashboard();
            break;
        default:
            mainContent.innerHTML = renderSeccionEnDesarrollo();
    }
}

function renderExamenPractica() {
    return `
        <section id="exam-section" class="mt-5">
            <h2 class="text-center exam-heading-green">Examen de Preparación OS-10</h2>
            <p class="text-center">Pon a prueba tus conocimientos sobre la normativa de seguridad privada. ¡Obtén tu calificación en escala del 1 al 7!</p>
            
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
}

function renderMisCursos() {
    return `
        <h2 class="text-3xl font-bold mb-8">Mis Cursos</h2>
        <div class="grid grid-cols-2">
            <div class="card">
                <div class="card-content">
                    <h3 class="text-xl font-bold mb-4">Curso OS-10 Básico</h3>
                    <p><strong>Progreso:</strong> 75%</p>
                    <div class="progress mt-4">
                        <div class="progress-bar" style="width: 75%;"></div>
                    </div>
                    <button class="btn btn-primary mt-4">Continuar Curso</button>
                </div>
            </div>
        </div>
    `;
}

function renderAdminDashboard() {
    return `
        <h2 class="text-3xl font-bold mb-8">Panel de Control Administrativo</h2>
        <div class="grid grid-cols-4 mb-8">
            <div class="stat-card blue">
                <div>
                    <p>Total Guardias</p>
                    <p class="stat-number">2</p>
                </div>
            </div>
        </div>
    `;
}

function renderSeccionEnDesarrollo() {
    return `
        <h2 class="text-3xl font-bold mb-8">Sección en Desarrollo</h2>
        <div class="card">
            <div class="card-content">
                <p>Esta sección está siendo desarrollada y estará disponible pronto.</p>
            </div>
        </div>
    `;
}

// Quiz Functions
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
        
        // Take questions from each category
        const questionsToTake = Math.min(3, shuffledCategoryQuestions.length);
        
        for (let i = 0; i < questionsToTake; i++) {
            allQuestions.push({
                ...shuffledCategoryQuestions[i],
                category: category
            });
        }
    });
    
    return shuffleArray(allQuestions).slice(0, 12); // 12 questions total for testing
}

function generateQuestions() {
    console.log("generateQuestions called");
    
    const quizContainer = document.getElementById('quiz-container');
    const startExamBtn = document.getElementById('start-exam-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    
    if (quizContainer) {
        quizContainer.innerHTML = '<p class="text-center">Generando preguntas...</p>';
        quizContainer.style.display = 'block';
    }
    
    if (startExamBtn) startExamBtn.style.display = 'none';
    if (submitQuizBtn) submitQuizBtn.style.display = 'none';

    setTimeout(() => {
        questions = createCategorizedQuestions();
        userAnswers = {};
        displayQuiz();
    }, 1000);
}

function displayQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    
    quizContainer.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('question-card');
        
        questionCard.innerHTML = `
            <h5>${index + 1}. ${q.question}</h5>
            <div class="options-container">
                <label class="option-button" data-question="${index}" data-value="Verdadero">
                    <input type="radio" name="question${index}" value="Verdadero" style="display: none;">
                    Verdadero
                </label>
                <label class="option-button" data-question="${index}" data-value="Falso">
                    <input type="radio" name="question${index}" value="Falso" style="display: none;">
                    Falso
                </label>
            </div>
            <div class="feedback-message mt-2" style="font-weight: 600; display: none;"></div>
        `;
        quizContainer.appendChild(questionCard);

        // Add event listeners
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
                });

                if (Object.keys(userAnswers).length === questions.length) {
                    const submitBtn = document.getElementById('submit-quiz-btn');
                    if (submitBtn) submitBtn.style.display = 'block';
                }
            });
        });
    });

    console.log("Quiz questions displayed");
}

function submitQuiz() {
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

    // Show modal with results
    showResultsModal(score, maxScore, percentage, grade, passed);
    
    console.log("Quiz submitted. Score:", score);
}

function calculateGrade(percentage) {
    if (percentage < 30) return 1.0;
    if (percentage < 40) return 2.0;
    if (percentage < 50) return 3.0;
    if (percentage < 60) return 4.0;
    if (percentage < 70) return 5.0;
    if (percentage < 85) return 6.0;
    return 7.0;
}

function showResultsModal(score, maxScore, percentage, grade, passed) {
    const modalOverlay = document.getElementById('results-modal-overlay');
    const modalContent = document.getElementById('results-modal-content');
    const modalCorrectCount = document.getElementById('modal-correct-count');
    const modalTotalQuestions = document.getElementById('modal-total-questions');
    const modalPercentage = document.getElementById('modal-percentage');
    const modalGrade = document.getElementById('modal-grade');
    const modalMessage = document.getElementById('modal-message');

    if (!modalOverlay) return;

    if (modalCorrectCount) modalCorrectCount.textContent = score;
    if (modalTotalQuestions) modalTotalQuestions.textContent = maxScore;
    if (modalPercentage) modalPercentage.textContent = percentage.toFixed(1);
    if (modalGrade) modalGrade.textContent = grade.toFixed(1);

    if (modalContent) {
        modalContent.classList.remove('pass', 'fail');
        if (passed) {
            modalContent.classList.add('pass');
            if (modalMessage) modalMessage.textContent = '¡Felicitaciones! Has aprobado.';
        } else {
            modalContent.classList.add('fail');
            if (modalMessage) modalMessage.textContent = 'Necesitas repasar más. ¡No te desanimes!';
        }
    }

    modalOverlay.style.display = 'flex';
    setTimeout(() => modalOverlay.classList.add('show'), 10);

    const submitBtn = document.getElementById('submit-quiz-btn');
    if (submitBtn) submitBtn.style.display = 'none';
}

function closeResultsModal() {
    const modalOverlay = document.getElementById('results-modal-overlay');
    const modalContent = document.getElementById('results-modal-content');
    
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            if (modalContent) modalContent.classList.remove('pass', 'fail');
            
            // Reset exam
            const quizContainer = document.getElementById('quiz-container');
            const startExamBtn = document.getElementById('start-exam-btn');
            const submitBtn = document.getElementById('submit-quiz-btn');
            
            if (quizContainer) quizContainer.style.display = 'none';
            if (startExamBtn) startExamBtn.style.display = 'block';
            if (submitBtn) submitBtn.style.display = 'none';
            
            questions = [];
            userAnswers = {};
        }, 300);
    }
}

// Helper functions
function openLoginForEnrollment(courseName) {
    const userRole = document.getElementById('userRole');
    const modal = document.getElementById('loginModal');
    
    if (userRole) userRole.value = 'estudiante';
    if (modal) modal.classList.add('active');
}

function openLoginForExam() {
    const userRole = document.getElementById('userRole');
    const modal = document.getElementById('loginModal');
    
    if (userRole) userRole.value = 'estudiante';
    if (modal) modal.classList.add('active');
}

function startQuiz() {
    generateQuestions();
}

console.log("Script loaded successfully");
