const stats = JSON.parse(localStorage.getItem('stats')) || {
    level: 1,
    experience: 0,
    vitality: 0,
    energy: 0,
    strength: 0,
    agility: 0,
    intelligence: 0,
    luck: 0,
    confidence: 0
};

const pendingStats = {
    vitality: 0,
    energy: 0,
    strength: 0,
    agility: 0,
    intelligence: 0,
    luck: 0,
    confidence: 0
};

const dailyDecrementEffects = {
    running: { experience: 5 , vitality: -0.1, energy: -0.1, strength: -0.05, agility: -0.1, luck: -0.05, confidence: -0.1 },
    reading: { energy: -0.05, intelligence: -0.1, confidence: -0.05 },
    sleeping: { vitality: -0.1, energy: -0.1 },
    meditating: { intelligence: -0.1, energy: -0.05, confidence: -0.05 },
    cooking: { vitality: -0.1, energy: -0.1, intelligence: -0.05 },
    weightlifting: { strength: -0.1, confidence: -0.05 },
    walking: { vitality: -0.1, energy: -0.1, agility: -0.1 }
};

const baseEffects = {
    running: { experience: 2, vitality: 0.2, energy: 0.2, strength: 0.05, agility: 0.3, intelligence: 0, luck: 0.05, confidence: 0.1 },
    reading: { experience: 1.5, energy: 0.1, intelligence: 0.3, confidence: 0.1 },
    sleeping: { experience: 1, vitality: 0.3, energy: 0.3 },
    meditating: { experience: 1.2, intelligence: 0.3, energy: 0.2, confidence: 0.2 },
    cooking: { experience: 1.1, vitality: 0.4, energy: 0.3, intelligence: 0.1 },
    weightlifting: { experience: 2, strength: 0.3, confidence: 0.2 },
    walking: { experience: 1.8, vitality: 0.3, energy: 0.2, agility: 0.2 },
    martialArts: { experience: 2, vitality: 0.2, energy: 0.1, strength: 0.2, agility: 0.2, intelligence: 0.1, confidence: 0.2 },
    sedentary: { experience: 0, vitality: -0.2, energy: -0.1, strength: -0.1, agility: -0.1, confidence: -0.1 },
    climbStairs: { experience: 2, vitality: 0.2, energy: 0.2, strength: 0.1, agility: 0.2, luck: 0.05, confidence: 0.1 },
    soda: { experience: 0, vitality: -0.1, energy: 0.1, luck: -0.1 },
    healthyFood: { experience: 1, vitality: 0.3, energy: 0.2, intelligence: 0.1, confidence: 0.1 },
    lowCalorieDiet: { experience: 1, vitality: 0.2, energy: 0.1, strength: -0.1, agility: 0.1, confidence: 0.1 },
    highCalorieDiet: { experience: 1, vitality: 0.2, energy: 0.2, strength: 0.1, agility: -0.1 },
    infusions: { experience: 1, vitality: 0.1, energy: 0.1, intelligence: 0.1, confidence: 0.1 },
    pastries: { experience: 0, vitality: -0.1, energy: 0.1, agility: -0.1, confidence: -0.1 },
    learnSkill: { experience: 2, energy: 0.1, intelligence: 0.3, confidence: 0.2 },
    mentalExercise: { experience: 1, energy: 0.1, intelligence: 0.2, confidence: 0.1 },
    programming: { experience: 1, intelligence: 0.3, luck: 0.1, confidence: 0.1 },
    globalSolutions: { experience: 2, intelligence: 0.3, luck: 0.1, confidence: 0.2 },
    organizeWeek: { experience: 1, energy: 0.1, intelligence: 0.2, confidence: 0.1 },
    meetNewPerson: { experience: 1, luck: 0.1, confidence: 0.3 },
    seeFriends: { experience: 1, vitality: 0.1, energy: 0.1, luck: 0.1, confidence: 0.2 },
    sendMeme: { experience: 0, luck: 0.05, confidence: 0.1 },
    talkFamily: { experience: 1, vitality: 0.1, energy: 0.1, luck: 0.1, confidence: 0.2 }
};

const activityDescriptions = {
    running: 'Muy buena actividad física para fortalecer el cuerpo y la mente. Correr te enseña a no rendirte. ¡Nada motiva más a correr que tener detrás a la policía!',
    reading: 'Leer un libro es una excelente forma de estimular tu mente y aprender cosas nuevas. Si lees un manga mejor que mejor, pero bueno, no hemos venido a juzgar, hemos venido a jugar.',
    sleeping: 'Dormir bien es crucial para tu salud. Asegúrate de descansar lo suficiente cada noche. ¡Lleva cuidado con los vladimir jajaja!',
    meditating: 'Meditar calma la mente y mejora la concentración. Encuentra un momento de paz en tu día. ¡Namasté!',
    cooking: 'Cocinar una comida saludable es beneficioso para tu cuerpo y mente. ¡Disfruta de una buena comida casera y si es la de la mama mejor que mejor, bon appétit!',
    weightlifting: 'Levantar pesas fortalece tus músculos y aumenta tu resistencia. ¡A tope Simon!',
    walking: 'Caminar es una forma sencilla de mantenerte activo y mejorar tu salud. ¡Un pasito más es un pasito menos!',
    martialArts: 'Las artes marciales son excelentes para desarrollar disciplina y fuerza. ¡Topuria se me queda corto!',
    sedentary: 'El sedentarismo puede tener efectos negativos en tu salud. Intenta moverte más durante el día, en resumen ¡Levántate puto gordo y muévete!',
    climbStairs: 'Subir escaleras es una forma efectiva de ejercicio que puedes hacer en cualquier lugar. ¡Hazlo y siente cómo queman esos músculos!',
    soda: 'Las sodas pueden ser refrescantes, pero su consumo excesivo no es saludable. Bebe con moderación y opta por agua si puedes..... AGUA AGUA AGUA AGUA.',
    healthyFood: 'Comer alimentos saludables mejora tu bienestar general. ¡Opta por frutas y verduras, tu cuerpo te lo agradecerá!',
    lowCalorieDiet: 'Una dieta baja en calorías puede ayudarte a mantener un peso saludable. ¡Hazlo de forma equilibrada y no te saltes comidas!',
    highCalorieDiet: 'Una dieta alta en calorías puede ser necesaria para ganar energía, pero elige alimentos nutritivos. ¡No todo es hamburguesas y pizza!',
    infusions: 'Las infusiones son una forma relajante de hidratarse. ¡Prueba diferentes sabores y disfruta de un momento de calma!',
    pastries: 'La bollería puede ser deliciosa, pero no la comas en exceso. ¡Disfrútala con moderación y saborea cada bocado! Esto es lo que diría una IA, lo que yo te digo es que dejes de comer tanta mierda y te pongas a darle más duro que a tu ex en tus sueños.',
    learnSkill: 'Aprender una nueva habilidad es emocionante y gratificante. ¡Nunca dejes de aprender y desafía tus límites!',
    mentalExercise: 'Los ejercicios mentales mantienen tu mente aguda. ¡Resuelve un rompecabezas hoy y mantén tu cerebro en forma!',
    programming: 'Programar desarrolla habilidades técnicas valiosas. ¡Prueba a crear algo nuevo y déjate llevar por el código!',
    globalSolutions: 'Pensar en soluciones globales puede ser inspirador. Reflexiona sobre cómo puedes contribuir al mundo, ¡tú puedes hacer la diferencia!',
    organizeWeek: 'Organizar tu semana te ayuda a mantenerte enfocado. Planifica y prepárate para el éxito, ¡ser organizado nunca fue tan divertido!',
    meetNewPerson: 'Conocer a alguien nuevo puede abrirte a nuevas experiencias. ¡Sé valiente y socializa, el mundo está lleno de personas interesantes! Aquí os lo digo enserio, hay que ser menos vergonzoso y disfrutar con la gente, fijo que en algún momento encuentras a alguien igual de loco que tú.',
    seeFriends: 'Ver a tus amigos mejora tu estado de ánimo y bienestar. Yo sé que es bien difícil quedar con tus colegas, pero bueno, nunca dejes de intentarlo.',
    sendMeme: 'Mandar un meme puede alegrar el día de alguien. ¡Si también mandas un nude eso ya no es cosa mía, aquí no juzgamos jajaja!',
    talkFamily: 'Hablar con tu familia fortalece los lazos y proporciona apoyo emocional. ¡Conéctate con ellos, nunca sabes cuándo un "te quiero" puede hacer el día!'
};

let activitiesDoneToday = JSON.parse(localStorage.getItem('activitiesDoneToday')) || {};
let lastActivityDate = JSON.parse(localStorage.getItem('lastActivityDate')) || {};
let specialSkills = JSON.parse(localStorage.getItem('specialSkills')) || [];
let skillProgress = JSON.parse(localStorage.getItem('skillProgress')) || {}; // To track progress for special skills

const specialSkillsConditions = [
    { name: 'Luchador', description: 'Mejora en un 20% tu capacidad para defenderte en una situación donde las palabras no son la solución, aumenta tu energia, fuerza, agilidad, inteligencia y confianza en un 2%.', condition: { martialArts: 100, healthyFood: 40 }, effect: { energy: 0.02, strength: 0.02, agility: 0.02, intelligence: 0.02, confidence: 0.02 } },
    { name: 'Chef Experto', description: 'Aumenta tu habilidad para cocinar comidas saludables en un 30% vitalidad aumenta un 2%.', condition: { healthyFood: 50 }, effect: { vitality: 0.02 } },
    { name: 'Maratonista', description: 'Incrementa tu Agilidad y energía en un 5%.', condition: { running: 200 }, effect: { agility: 0.05, energy: 0.05 } },
    { name: 'Bibliotecario', description: 'Mejora tu capacidad de retener información en un 10%.', condition: { reading: 85 }, effect: { intelligence: 0.1 } },
    { name: 'Dormilón Profesional', description: 'Aumenta tu vitalidad y energía en un 10% después de dormir bien.', condition: { sleeping: 20 }, effect: { vitality: 0.1, energy: 0.1 } },
    { name: 'Meditador Zen', description: 'Incrementa tu concentración y reduce el estrés en un 12%, aumenta la confianza en un 20% y suerte en un 5%.', condition: { meditating: 60 }, effect: { intelligence: 0.12, confidence: 0.2, luck: 0.05 } },
    { name: 'Levantador de Pesas', description: 'Aumenta tu fuerza en un 10%.', condition: { weightlifting: 100 }, effect: { strength: 0.1 } },
    { name: 'Caminante de Larga Distancia', description: 'Mejora tu energia 2% y confianza 1%.', condition: { walking: 80 }, effect: { energy: 0.02, confidence: 0.01 } },
    { name: 'Flexibilidad de Goma', description: 'Aumenta tu agilidad y reduce las lesiones en un 15%.', condition: { sedentary: 50, healthyFood: 10 }, effect: { agility: 0.15 } },
    { name: 'Saludable al Máximo', description: 'Mejora tu bienestar general en un 10% ,poco a poco vas notando cambios, aumenta confianza, suerte en un 15%, energia y vitalidad en un 10% .', condition: { lowCalorieDiet: 28 }, effect: { confidence: 0.15, luck: 0.15, energy: 0.1, vitality: 0.1 } },
    { name: 'Planificador', description: 'Mejora tu capacidad para organizar y gestionar el tiempo en un 5%.', condition: { organizeWeek: 30 }, effect: { intelligence: 0.05 } },
    { name: 'Amigo Fiel', description: 'Incrementa tu confianza y felicidad en un 25%.', condition: { seeFriends: 50 }, effect: { confidence: 0.25 } },
    { name: 'Maestro del Meme', description: 'Mejora tu habilidad para conectar con los demás en un 20%.', condition: { sendMeme: 100 }, effect: { confidence: 0.2 } },
    { name: 'Solucionador Global', description: 'Incrementa tu inteligencia y creatividad en un 30%.', condition: { globalSolutions: 40 }, effect: { intelligence: 0.3 } },
    { name: 'Mentalista', description: 'Aumenta tu capacidad de resolver problemas en un 30%.', condition: { mentalExercise: 50 }, effect: { intelligence: 0.3 } },
    { name: 'Programador Maestro', description: 'Mejora tu habilidad para codificar y resolver problemas técnicos en un 40%.', condition: { programming: 100 }, effect: { intelligence: 0.4 } },
    { name: 'Escalador', description: 'Mejora tu fuerza y resistencia en un 20%.', condition: { climbStairs: 100 }, effect: { strength: 0.2, energy: 0.2 } },
    { name: 'Hidratado', description: 'Incrementa tu vitalidad y energía en un 25%.', condition: { infusions: 200 }, effect: { vitality: 0.25, energy: 0.25 } },
    { name: 'Guerrero Contra el Sedentarismo', description: 'Reduce los efectos negativos del sedentarismo en un 30%.', condition: { sedentary: 60 }, effect: { vitality: 0.3, energy: 0.3 } },
    { name: 'Maestro del Balance', description: 'Mejora tu capacidad para balancear diferentes aspectos de tu vida en un 30%.', condition: { healthyFood: 100, walking: 100 }, effect: { confidence: 0.3 } },
    { name: 'Multitasker', description: 'Incrementa tu capacidad para realizar múltiples tareas a la vez en un 25%.', condition: { organizeWeek: 50 }, effect: { intelligence: 0.25 } },
    { name: 'Resiliente', description: 'Mejora tu capacidad para recuperarte de fracasos en un 35%.', condition: { running: 30 }, effect: { confidence: 0.35 } },
    { name: 'Motivador', description: 'Aumenta tu habilidad para inspirar a otros en un 20%.', condition: { sendMeme: 50 }, effect: { confidence: 0.2 } },
    { name: 'Socializador', description: 'Incrementa tu confianza y habilidades sociales en un 30%.', condition: { meetNewPerson: 30 }, effect: { confidence: 0.3 } },
    { name: 'Fortaleza Mental', description: 'Mejora tu resistencia mental en un 40%.', condition: { mentalExercise: 60 }, effect: { intelligence: 0.4 } },
    { name: 'Levantador de Peso Extremo', description: 'Incrementa tu fuerza máxima en un 40%.', condition: { weightlifting: 10000 }, effect: { strength: 0.4 } },
    { name: 'Cocinero Saludable', description: 'Mejora tu capacidad para preparar comidas nutritivas en un 35%.', condition: { cooking: 100 }, effect: { vitality: 0.35 } },
    { name: 'Ejecutor de Tareas', description: 'Incrementa tu eficiencia en la realización de tareas en un 25%.', condition: { organizeWeek: 200 }, effect: { intelligence: 0.25 } },
    { name: 'Aficionado a la Naturaleza', description: 'Aumenta tu bienestar general y reduce el estrés en un 30%.', condition: { walking: 200 }, effect: { vitality: 0.3, energy: 0.3 } },
    { name: 'Atleta Completo', description: 'Incrementa tu fuerza, agilidad y resistencia en un 35%.', condition: { running: 500 }, effect: { strength: 0.35, agility: 0.35, energy: 0.35 } },
    { name: 'Maestro en Relaciones', description: 'Mejora tu habilidad para mantener relaciones saludables en un 30%.', condition: { talkFamily: 50 }, effect: { confidence: 0.3 } },
    { name: 'Escapista', description: 'Mejora tu capacidad para evadir problemas y relajarte en un 25%.', condition: { sleeping: 50 }, effect: { vitality: 0.25, energy: 0.25 } },
    { name: 'Curioso por Naturaleza', description: 'Incrementa tu inteligencia y deseo de aprender en un 30%.', condition: { learnSkill: 20 }, effect: { intelligence: 0.3 } },
    { name: 'Optimista', description: 'Mejora tu actitud positiva y reduce el estrés en un 25%.', condition: { mentalExercise: 100 }, effect: { intelligence: 0.25 } },
    { name: 'Visionario', description: 'Incrementa tu capacidad para planificar y visualizar el futuro en un 35%.', condition: { organizeWeek: 52 }, effect: { intelligence: 0.35 } },
    { name: 'Hacker del Hábitat', description: 'Mejora tu capacidad para adaptar y mejorar tu entorno en un 30%.', condition: { healthyFood: 30 }, effect: { vitality: 0.3 } },
    { name: 'Maestro del Ritmo', description: 'Incrementa tu coordinación y sentido del ritmo en un 25%.', condition: { walking: 50 }, effect: { agility: 0.25 } },
    { name: 'Negociador Experto', description: 'Mejora tu capacidad para negociar y resolver conflictos en un 30%.', condition: { meetNewPerson: 50 }, effect: { confidence: 0.3 } },
    { name: 'Aventurero', description: 'Incrementa tu deseo de explorar y experimentar cosas nuevas en un 30%.', condition: { running: 100 }, effect: { energy: 0.3 } },
    { name: 'Innovador', description: 'Mejora tu creatividad y capacidad para innovar en un 35%.', condition: { globalSolutions: 50 }, effect: { intelligence: 0.35 } },
    { name: 'Concentrado', description: 'Incrementa tu capacidad de enfoque y atención en un 30%.', condition: { meditating: 100 }, effect: { intelligence: 0.3 } },
    { name: 'Mente Aguda', description: 'Mejora tu agilidad mental y capacidad de pensamiento rápido en un 25%.', condition: { mentalExercise: 100 }, effect: { intelligence: 0.25 } },
    { name: 'Ejemplo a Seguir', description: 'Incrementa tu capacidad para inspirar y guiar a otros en un 35%.', condition: { meetNewPerson: 50 }, effect: { confidence: 0.35 } },
    { name: 'Adaptador', description: 'Mejora tu capacidad para adaptarte a cambios y nuevas situaciones en un 30%.', condition: { organizeWeek: 50 }, effect: { intelligence: 0.3 } },
    { name: 'Fortaleza Física', description: 'Incrementa tu capacidad de resistencia física en un 30%.', condition: { running: 200 }, effect: { strength: 0.3 } },
    { name: 'Guardia de la Salud', description: 'Mejora tu conocimiento y prácticas de salud en un 25%.', condition: { healthyFood: 50 }, effect: { vitality: 0.25 } },
    { name: 'Defensor del Bienestar', description: 'Incrementa tu capacidad para mantener un estado de bienestar en un 30%.', condition: { meditating: 100 }, effect: { vitality: 0.3, energy: 0.3 } },
    { name: 'Explorador del Conocimiento', description: 'Mejora tu deseo y capacidad de aprender en un 35%.', condition: { learnSkill: 50 }, effect: { intelligence: 0.35 } }
];

function updateStatsDisplay() {
    for (const stat in stats) {
        if (stat !== "experience") {
            document.getElementById(stat).textContent = Math.round(stats[stat] * 100) / 100;
        }
    }
}

function updateSpecialSkillsDisplay() {
    const summaryList = document.getElementById('skills-summary');
    const detailDiv = document.getElementById('special-skills-content');

    summaryList.innerHTML = '';
    detailDiv.innerHTML = '';

    if (specialSkills.length === 0) {
        summaryList.innerHTML = 'Ninguna habilidad especial aún';
    } else {
        specialSkills.forEach(skill => {
            const listItem = document.createElement('li');
            listItem.textContent = skill.name;
            summaryList.appendChild(listItem);

            const skillDetailDiv = document.createElement('div');
            skillDetailDiv.className = 'skill-detail';
            skillDetailDiv.innerHTML = `<h4>${skill.name}</h4><p>${skill.description}</p>`;
            detailDiv.appendChild(skillDetailDiv);
        });
    }
}

function performActivity(activity) {
    const today = new Date().toISOString().split('T')[0];
    if (!activitiesDoneToday[today]) {
        activitiesDoneToday[today] = new Set();
    }

    activitiesDoneToday[today].add(activity);
    lastActivityDate[activity] = today;

    const effect = baseEffects[activity];
    stats.experience += effect.experience;

    for (const stat in effect) {
        if (stat !== "experience") {
            pendingStats[stat] += effect[stat];
        }
    }

    checkLevelUp();
    checkSpecialSkills(activity);
    updateStatsDisplay();
}

function checkLevelUp() {
    let expNeeded = 20 * Math.pow(1.2, stats.level - 1);
    while (stats.experience >= expNeeded) {
        stats.experience -= expNeeded;
        stats.level++;
        expNeeded = 20 * Math.pow(1.2, stats.level - 1);

        for (const stat in pendingStats) {
            stats[stat] += pendingStats[stat];
            pendingStats[stat] = 0;
        }

        updateSpecialSkillsDisplay();
        alert("¡Has subido de nivel!");
    }
    saveData();
}

function checkSpecialSkills(activity) {
    specialSkillsConditions.forEach(skill => {
        const condition = skill.condition;
        if (condition[activity] !== undefined) {
            skillProgress[skill.name] = (skillProgress[skill.name] || 0) + 1;
            if (skillProgress[skill.name] >= condition[activity]) {
                specialSkills.push({
                    name: skill.name,
                    description: skill.description
                });
                for (const stat in skill.effect) {
                    stats[stat] += skill.effect[stat];
                }
                updateSpecialSkillsDisplay();
                alert(`¡Has obtenido la habilidad especial: ${skill.name}!`);
                skillProgress[skill.name] = 0;
            }
        }
    });
    saveData();
}

function decrementDailyStats() {
    const today = new Date().toISOString().split('T')[0];
    for (const activity in baseEffects) {
        const lastDate = new Date(lastActivityDate[activity] || today);
        const daysSinceLastActivity = Math.floor((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));

        if (daysSinceLastActivity >= 2) {
            const effect = baseEffects[activity];
            for (const stat in effect) {
                if (stat !== "experience") {
                    stats[stat] += dailyDecrementEffects[activity][stat] || 0;
                    if (stats[stat] < 0) stats[stat] = 0;
                }
            }
        }
    }
    updateStatsDisplay();
}

function showDescription(activity) {
    const description = activityDescriptions[activity] || 'Descripción no disponible.';
    document.getElementById('description-content').textContent = description;
}

function incrementActivity(activity) {
    const today = new Date().toISOString().split('T')[0];
    if (!activitiesDoneToday[today]) {
        activitiesDoneToday[today] = {};
    }
    if (!activitiesDoneToday[today][activity]) {
        activitiesDoneToday[today][activity] = 0;
    }
    activitiesDoneToday[today][activity]++;
    document.getElementById(`count-${activity}`).textContent = activitiesDoneToday[today][activity];
    performActivity(activity);
}

function saveData() {
    localStorage.setItem('stats', JSON.stringify(stats));
    localStorage.setItem('activitiesDoneToday', JSON.stringify(activitiesDoneToday));
    localStorage.setItem('lastActivityDate', JSON.stringify(lastActivityDate));
    localStorage.setItem('specialSkills', JSON.stringify(specialSkills));
    localStorage.setItem('skillProgress', JSON.stringify(skillProgress));
}

function loadData() {
    updateStatsDisplay();
    updateSpecialSkillsDisplay();
    const today = new Date().toISOString().split('T')[0];
    if (activitiesDoneToday[today]) {
        for (const activity in activitiesDoneToday[today]) {
            document.getElementById(`count-${activity}`).textContent = activitiesDoneToday[today][activity];
        }
    }
}

window.addEventListener('beforeunload', saveData);
window.addEventListener('load', () => {
    loadData();
    setInterval(decrementDailyStats, 86400000);
});
