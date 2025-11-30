/*
  GAMIFICATION SYSTEM
  Purpose: Points, levels, streaks, achievements, celebrations
  Dependencies: storage.js, utils.js
*/

// ============================================
// GAMIFICATION CONSTANTS
// ============================================

const POINTS_CONFIG = {
    // Task completion points
    STUDY_SESSION: 15,
    COOK_MEAL: 10,
    CLEAN_TASK: 5,
    LOG_EXPENSE: 3,
    DIY_TASK: 8,
    
    // Daily goals
    DAILY_LOGIN: 5,
    ALL_TASKS_COMPLETE: 25,
    
    // Streaks
    WEEK_STREAK: 50,
    MONTH_STREAK: 200,
    
    // Level progression
    POINTS_PER_LEVEL: 100
};

const ACHIEVEMENTS = {
    FIRST_STEPS: {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Complete your first task',
        icon: '👣',
        requirement: 1,
        type: 'tasks_completed'
    },
    CHEF_APPRENTICE: {
        id: 'chef_apprentice',
        name: 'Chef Apprentice',
        description: 'Cook 10 meals',
        icon: '👨‍🍳',
        requirement: 10,
        type: 'meals_cooked'
    },
    CLEAN_SWEEP: {
        id: 'clean_sweep',
        name: 'Clean Sweep',
        description: 'Complete 25 cleaning tasks',
        icon: '✨',
        requirement: 25,
        type: 'cleaning_tasks'
    },
    SCHOLAR: {
        id: 'scholar',
        name: 'Scholar',
        description: 'Complete 50 study sessions',
        icon: '🎓',
        requirement: 50,
        type: 'study_sessions'
    },
    WEEK_WARRIOR: {
        id: 'week_warrior',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '⚔️',
        requirement: 7,
        type: 'streak'
    },
    MONTH_MASTER: {
        id: 'month_master',
        name: 'Month Master',
        description: 'Maintain a 30-day streak',
        icon: '👑',
        requirement: 30,
        type: 'streak'
    },
    LEVEL_10: {
        id: 'level_10',
        name: 'Rising Star',
        description: 'Reach level 10',
        icon: '⭐',
        requirement: 10,
        type: 'level'
    },
    LEVEL_25: {
        id: 'level_25',
        name: 'Super Student',
        description: 'Reach level 25',
        icon: '🌟',
        requirement: 25,
        type: 'level'
    },
    LEVEL_50: {
        id: 'level_50',
        name: 'Legend',
        description: 'Reach level 50',
        icon: '💫',
        requirement: 50,
        type: 'level'
    }
};

// ============================================
// AWARD POINTS
// ============================================

/**
 * Award points to user for an action
 * @param {number} points - Number of points to award
 * @param {string} reason - Reason for points (for logging)
 * @returns {object} Updated user data with new level if applicable
 */
function awardPoints(points, reason) {
    const userData = loadFromStorage('user_data') || {
        points: 0,
        level: 1,
        totalPoints: 0,
        achievements: []
    };
    
    const oldLevel = userData.level;
    
    // Add points
    userData.points += points;
    userData.totalPoints = (userData.totalPoints || 0) + points;
    
    // Check for level up
    const newLevel = calculateLevel(userData.points);
    const leveledUp = newLevel > oldLevel;
    
    if (leveledUp) {
        userData.level = newLevel;
        userData.points = userData.points % POINTS_CONFIG.POINTS_PER_LEVEL;
    }
    
    // Save
    saveToStorage('user_data', userData);
    
    // Log activity
    logActivity(reason, points);
    
    // Check achievements
    checkAchievements();
    
    // Show notification
    showPointsNotification(points, reason);
    
    // Show level up celebration if applicable
    if (leveledUp) {
        showLevelUpCelebration(newLevel);
    }
    
    return {
        points: userData.points,
        level: userData.level,
        leveledUp: leveledUp
    };
}

/**
 * Calculate level from total points
 * @param {number} points - Total points
 * @returns {number} Current level
 */
function calculateLevel(points) {
    return Math.floor(points / POINTS_CONFIG.POINTS_PER_LEVEL) + 1;
}

// ============================================
// STREAK MANAGEMENT
// ============================================

/**
 * Update streak on daily login
 * @returns {object} Streak data
 */
function updateStreak() {
    const userData = loadFromStorage('user_data') || {
        lastLogin: null,
        streak: 0,
        longestStreak: 0
    };
    
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = userData.lastLogin;
    
    if (lastLogin === today) {
        // Already logged in today
        return {
            streak: userData.streak,
            continued: false
        };
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastLogin === yesterdayStr) {
        // Streak continues
        userData.streak = (userData.streak || 0) + 1;
        
        // Award streak milestone points
        if (userData.streak === 7) {
            awardPoints(POINTS_CONFIG.WEEK_STREAK, 'Week streak milestone! 🔥');
        } else if (userData.streak === 30) {
            awardPoints(POINTS_CONFIG.MONTH_STREAK, 'Month streak milestone! 👑');
        }
        
    } else {
        // Streak broken or first login
        userData.streak = 1;
    }
    
    // Update longest streak
    if (userData.streak > (userData.longestStreak || 0)) {
        userData.longestStreak = userData.streak;
    }
    
    // Update last login
    userData.lastLogin = today;
    
    // Award daily login points
    awardPoints(POINTS_CONFIG.DAILY_LOGIN, 'Daily login');
    
    // Save
    saveToStorage('user_data', userData);
    
    return {
        streak: userData.streak,
        continued: true
    };
}

// ============================================
// ACHIEVEMENTS
// ============================================

/**
 * Check if user has unlocked any new achievements
 */
function checkAchievements() {
    const userData = loadFromStorage('user_data') || { achievements: [] };
    const stats = getUserStats();
    
    const unlockedAchievements = userData.achievements || [];
    
    // Check each achievement
    Object.values(ACHIEVEMENTS).forEach(achievement => {
        // Skip if already unlocked
        if (unlockedAchievements.includes(achievement.id)) {
            return;
        }
        
        // Check requirement
        let unlocked = false;
        
        switch (achievement.type) {
            case 'tasks_completed':
                unlocked = stats.totalTasksCompleted >= achievement.requirement;
                break;
            case 'meals_cooked':
                unlocked = stats.mealsCookedCount >= achievement.requirement;
                break;
            case 'cleaning_tasks':
                unlocked = stats.cleaningTasksCount >= achievement.requirement;
                break;
            case 'study_sessions':
                unlocked = stats.studySessionsCount >= achievement.requirement;
                break;
            case 'streak':
                unlocked = userData.streak >= achievement.requirement;
                break;
            case 'level':
                unlocked = userData.level >= achievement.requirement;
                break;
        }
        
        if (unlocked) {
            unlockAchievement(achievement);
        }
    });
}

/**
 * Unlock an achievement
 * @param {object} achievement - Achievement object
 */
function unlockAchievement(achievement) {
    const userData = loadFromStorage('user_data') || { achievements: [] };
    
    if (!userData.achievements) {
        userData.achievements = [];
    }
    
    userData.achievements.push(achievement.id);
    saveToStorage('user_data', userData);
    
    // Show achievement notification
    showAchievementNotification(achievement);
    
    // Award bonus points
    awardPoints(50, `Achievement unlocked: ${achievement.name}`);
}

/**
 * Get user statistics for achievement tracking
 * @returns {object} User stats
 */
function getUserStats() {
    return {
        totalTasksCompleted: loadFromStorage('total_tasks_completed') || 0,
        mealsCookedCount: loadFromStorage('meals_cooked_count') || 0,
        cleaningTasksCount: loadFromStorage('cleaning_tasks_count') || 0,
        studySessionsCount: loadFromStorage('study_sessions_count') || 0
    };
}

// ============================================
// ACTIVITY LOGGING
// ============================================

/**
 * Log user activity
 * @param {string} action - Action performed
 * @param {number} points - Points earned
 */
function logActivity(action, points) {
    const activityLog = loadFromStorage('activity_log') || [];
    
    activityLog.unshift({
        action: action,
        points: points,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-GB')
    });
    
    // Keep only last 100 activities
    if (activityLog.length > 100) {
        activityLog.splice(100);
    }
    
    saveToStorage('activity_log', activityLog);
}

// ============================================
// NOTIFICATIONS & CELEBRATIONS
// ============================================

/**
 * Show points notification
 * @param {number} points - Points earned
 * @param {string} reason - Reason for points
 */
function showPointsNotification(points, reason) {
    const notification = createElement('div', {
        class: 'points-notification'
    });
    
    notification.innerHTML = `
        <div class="notification-icon">⭐</div>
        <div class="notification-content">
            <div class="notification-points">+${points} points</div>
            <div class="notification-reason">${reason}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Show level up celebration
 * @param {number} newLevel - New level achieved
 */
function showLevelUpCelebration(newLevel) {
    const celebration = createElement('div', {
        class: 'level-up-celebration'
    });
    
    celebration.innerHTML = `
        <div class="celebration-content">
            <div class="celebration-icon">🎉</div>
            <h2 class="celebration-title">Level Up!</h2>
            <div class="celebration-level">Level ${newLevel}</div>
            <p class="celebration-message">You're getting stronger!</p>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    // Animate in
    setTimeout(() => {
        celebration.classList.add('show');
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        celebration.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(celebration);
        }, 500);
    }, 4000);
}

/**
 * Show achievement notification
 * @param {object} achievement - Achievement object
 */
function showAchievementNotification(achievement) {
    const notification = createElement('div', {
        class: 'achievement-notification'
    });
    
    notification.innerHTML = `
        <div class="achievement-badge">
            <div class="achievement-icon">${achievement.icon}</div>
        </div>
        <div class="achievement-info">
            <div class="achievement-title">Achievement Unlocked!</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

console.log('✅ Gamification system loaded');
