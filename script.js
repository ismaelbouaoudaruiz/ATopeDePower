const stats = {
    level: 28,
    vitality: 50,
    energy: 50,
    strength: 10,
    agility: 10,
    intelligence: 10,
    luck: 10,
    confidence: 10
};

const effects = {
    running: { vitality: 0.1, energy: 0.2, strength: 0.05, agility: 0.1 },
    reading: { energy: 0.1, intelligence: 0.2, confidence: 0.051 },
    sleeping: { vitality: 0.2, energy: 0.2 },
    meditating: { intelligence: 0.2, energy: 0.1, confidence: 0.1 },
    cooking: { vitality: 0.3, energy: 0.2, intelligence: 0.1 },
    weightlifting: { strength: 0.2, confidence: 0.2 },
    walking: { vitality: 0.3, energy: 0.2, agility: 0.1 }
};

const dailyDecrementEffects = {
    running: { vitality: -0.1, energy: -0.2, strength: -0.05, agility: -0.1 },
    reading: { energy: -0.1, intelligence: -0.2, confidence: -0.051 },
    sleeping: { vitality: -0.2, energy: -0.2 },
    meditating: { intelligence: -0.2, energy: -0.1, confidence: -0.1 },
    cooking: { vitality: -0.3, energy: -0.2, intelligence: -0.1 },
    weightlifting: { strength: -0.2, confidence: -0.2 },
    walking: { vitality: -0.3, energy: -0.2, agility: -0.1 }
};

let activityCounts = {
    running: 0,
    reading: 0,
    sleeping: 0,
    meditating: 0,
    cooking: 0,
    weightlifting: 0,
    walking: 0
};

let activitiesDoneToday = {};
let lastActivityDate = {};

function updateStatsDisplay() {
    for (const stat in stats) {
        document.getElementById(stat).textContent = `${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${Math.round(stats[stat])}`;
    }
}

function updateActivityCounts() {
    for (const activity in activityCounts) {
        document.getElementById(`${activity}-count`).textContent = `${activity.charAt(0).toUpperCase() + activity.slice(1)}: ${activityCounts[activity]}`;
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

    const effect = effects[activity];
    for (const stat in effect) {
        stats[stat] += effect[stat];
    }
    if (activityCounts.hasOwnProperty(activity)) {
        activityCounts[activity]++;
        updateActivityCounts();
    }
    updateStatsDisplay();
}

function decrementDailyStats() {
    const today = new Date().toISOString().split('T')[0];
    for (const activity in dailyDecrementEffects) {
        const lastDate = new Date(lastActivityDate[activity] || today);
        const daysSinceLastActivity = Math.floor((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));

        if (daysSinceLastActivity >= 2) {
            const effect = dailyDecrementEffects[activity];
            for (const stat in effect) {
                stats[stat] += effect[stat]; // Apply negative effect
                if (stats[stat] < 0) stats[stat] = 0;
            }
        }
    }
    updateStatsDisplay();
}

function increaseLevel() {
    stats.level++;
    updateStatsDisplay();
}

updateStatsDisplay();
updateActivityCounts();
setInterval(decrementDailyStats, 86400000); // Decrease daily stats every 24 hours
setInterval(increaseLevel, 31536000000); // Increase level every 365 days
