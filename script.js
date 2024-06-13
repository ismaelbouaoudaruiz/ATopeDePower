const stats = {
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

let activitiesDoneToday = {};
let lastActivityDate = {};
let specialSkills = [];

function updateStatsDisplay() {
    for (const stat in stats) {
        if (stat !== "experience") {
            document.getElementById(stat).textContent = Math.round(stats[stat] * 100) / 100;
        }
    }
}

function updateSpecialSkillsDisplay() {
    const summaryList = document.getElementById('skills-summary');
    const detailDiv = document.getElementById('skills-detail');

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

    if (activitiesDoneToday[today].has(activity)) {
        alert("Ya has realizado esta actividad hoy.");
        return;
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
    updateStatsDisplay();
}

function checkLevelUp() {
    let expNeeded = 20 * Math.pow(1.2, stats.level - 1);
    while (stats.experience >= expNeeded) {
        stats.experience -= expNeeded;
        stats.level++;
        expNeeded = 20 * Math.pow(1.2, stats.level - 1);

        // Apply pending stats
        for (const stat in pendingStats) {
            stats[stat] += pendingStats[stat];
            pendingStats[stat] = 0; // Reset pending stats after applying
        }

        // Add the special skill "Resistencia Mental"
        specialSkills.push({
            name: 'Resistencia Mental',
            description: 'Esta habilidad fruto de un gran esfuerzo mental seguido para conseguir valores, principios y objetivos por parte del jugador le permiten tener un 15% más de resistencia a darse por vencido ante las adversidades del día a día. Esta habilidad se pierde si en 15 días no se ha realizado una tarea como gran objetivo.'
        });

        updateSpecialSkillsDisplay();
        alert("¡Has subido de nivel!");
    }
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
                    stats[stat] += dailyDecrementEffects[activity][stat] || 0; // Apply negative effect
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

updateStatsDisplay();
updateSpecialSkillsDisplay();
setInterval(decrementDailyStats, 86400000); // Decrease daily stats every 24 hours
