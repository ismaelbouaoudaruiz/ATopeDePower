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
    running: 'Correr es una actividad física que mejora tu vitalidad y energía. También incrementa tu fuerza y agilidad.',
    reading: 'Leer un libro mejora tu inteligencia y confianza. También proporciona energía.',
    sleeping: 'Dormir bien es crucial para mejorar tu vitalidad y energía.',
    meditating: 'Meditar aumenta tu inteligencia, energía y confianza.',
    cooking: 'Cocinar una comida saludable mejora tu vitalidad, energía e inteligencia.',
    weightlifting: 'Hacer pesas incrementa tu fuerza y confianza.',
    walking: 'Hacer una caminata mejora tu vitalidad, energía y agilidad.',
    martialArts: 'Las artes marciales incrementan tu vitalidad, energía, fuerza, agilidad, inteligencia y confianza.',
    sedentary: 'El sedentarismo reduce tu vitalidad, energía, fuerza, agilidad y confianza.',
    climbStairs: 'Subir escaleras mejora tu vitalidad, energía, fuerza, agilidad y suerte.',
    soda: 'Beber sodas reduce tu vitalidad y suerte, pero aumenta tu energía.',
    healthyFood: 'Comer saludable incrementa tu vitalidad, energía, inteligencia y confianza.',
    lowCalorieDiet: 'Una dieta de pocas calorías mejora tu vitalidad, energía y agilidad, pero reduce tu fuerza.',
    highCalorieDiet: 'Una dieta de muchas calorías incrementa tu vitalidad, energía y fuerza, pero reduce tu agilidad.',
    infusions: 'Tomar infusiones mejora tu vitalidad, energía, inteligencia y confianza.',
    pastries: 'La bollería reduce tu vitalidad, agilidad y confianza, pero incrementa tu energía.',
    learnSkill: 'Aprender una nueva habilidad mejora tu inteligencia y confianza, y proporciona energía.',
    mentalExercise: 'Hacer ejercicios mentales mejora tu inteligencia y confianza, y proporciona energía.',
    programming: 'Programar incrementa tu inteligencia, suerte y confianza.',
    globalSolutions: 'Pensar en soluciones mundiales mejora tu inteligencia, suerte y confianza.',
    organizeWeek: 'Organizar la semana incrementa tu inteligencia, energía y confianza.',
    meetNewPerson: 'Conocer a alguien nuevo mejora tu suerte y confianza.',
    seeFriends: 'Ver a tus amigos mejora tu vitalidad, energía, suerte y confianza.',
    sendMeme: 'Mandar un meme mejora tu suerte y confianza.',
    talkFamily: 'Hablar con tu familia mejora tu vitalidad, energía, suerte y confianza.'
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
