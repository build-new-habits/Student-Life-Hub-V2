/*
  LOCAL STORAGE UTILITIES
  Purpose: Save and load all user data from browser localStorage
  This allows data to persist even when user closes browser
*/

// ============================================
// STORAGE KEYS - All keys used in the app
// ============================================

const STORAGE_KEYS = {
    // User Profile & Gamification
    USER_PROFILE: 'slh_user_profile',
    USER_POINTS: 'slh_user_points',
    USER_LEVEL: 'slh_user_level',
    USER_STREAK: 'slh_user_streak',
    LAST_ACTIVE: 'slh_last_active',
    ACHIEVEMENTS: 'slh_achievements',
    
    // Study Section
    STUDY_TIMETABLE: 'slh_study_timetable',
    STUDY_GOALS: 'slh_study_goals',
    FLASHCARDS: 'slh_flashcards',
    PRACTICE_PROGRESS: 'slh_practice_progress',
    
    // Meals Section
    PLANNED_MEALS: 'slh_planned_meals',
    FAVORITE_MEALS: 'slh_favorite_meals',
    CUSTOM_MEALS: 'slh_custom_meals',
    MEAL_RATINGS: 'slh_meal_ratings',
    
    // Shopping & Planning
    SHOPPING_LIST: 'slh_shopping_list',
    LEFTOVERS: 'slh_leftovers',
    
    // Cleaning & DIY
    CLEANING_ROUTINE: 'slh_cleaning_routine',
    DIY_TASKS: 'slh_diy_tasks',
    
    // Budget & Money
    BUDGET_DATA: 'slh_budget_data',
    SAVINGS_GOALS: 'slh_savings_goals',
    
    // Uni Essentials
    UNI_CHECKLIST: 'slh_uni_checklist',
    
    // Completed Items (for tracking)
    COMPLETED_ITEMS: 'slh_completed_items',
    
    // Settings & Preferences
    USER_TIER: 'slh_user_tier',  // 'free' or 'premium'
    USER_PREFERENCES: 'slh_user_preferences',
    NOTIFICATION_SETTINGS: 'slh_notification_settings'
};

// ============================================
// SAVE DATA TO LOCALSTORAGE
// ============================================

/**
 * Save data to localStorage
 * @param {string} key - The storage key from STORAGE_KEYS
 * @param {any} data - The data to save (will be converted to JSON)
 * @returns {boolean} - True if successful, false if error
 */
function saveToStorage(key, data) {
    try {
        // Convert data to JSON string
        const jsonData = JSON.stringify(data);
        
        // Save to localStorage
        localStorage.setItem(key, jsonData);
        
        console.log(`✅ Saved to storage: ${key}`);
        return true;
    } catch (error) {
        console.error(`❌ Error saving to storage (${key}):`, error);
        
        // Check if storage is full
        if (error.name === 'QuotaExceededError') {
            console.error('⚠️ Storage quota exceeded! Consider clearing old data.');
        }
        
        return false;
    }
}

// ============================================
// LOAD DATA FROM LOCALSTORAGE
// ============================================

/**
 * Load data from localStorage
 * @param {string} key - The storage key from STORAGE_KEYS
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} - The loaded data or defaultValue
 */
function loadFromStorage(key, defaultValue = null) {
    try {
        // Get JSON string from localStorage
        const jsonData = localStorage.getItem(key);
        
        // If nothing stored, return default value
        if (jsonData === null || jsonData === undefined) {
            console.log(`ℹ️ No data found for: ${key}, using default value`);
            return defaultValue;
        }
        
        // Parse JSON string back to original data type
        const data = JSON.parse(jsonData);
        
        console.log(`✅ Loaded from storage: ${key}`);
        return data;
    } catch (error) {
        console.error(`❌ Error loading from storage (${key}):`, error);
        return defaultValue;
    }
}

// ============================================
// REMOVE ITEM FROM LOCALSTORAGE
// ============================================

/**
 * Remove a specific item from localStorage
 * @param {string} key - The storage key to remove
 * @returns {boolean} - True if successful
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        console.log(`✅ Removed from storage: ${key}`);
        return true;
    } catch (error) {
        console.error(`❌ Error removing from storage (${key}):`, error);
        return false;
    }
}

// ============================================
// CLEAR ALL APP DATA
// ============================================

/**
 * Clear all app data from localStorage
 * WARNING: This cannot be undone!
 * @returns {boolean} - True if successful
 */
function clearAllStorage() {
    try {
        // Get confirmation (commented out for now - implement in UI)
        // const confirmed = confirm('Are you sure you want to delete ALL data? This cannot be undone!');
        // if (!confirmed) return false;
        
        // Remove all keys
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        
        console.log('✅ All storage cleared');
        return true;
    } catch (error) {
        console.error('❌ Error clearing storage:', error);
        return false;
    }
}

// ============================================
// CLEAR SPECIFIC SECTION DATA
// ============================================

/**
 * Clear data for a specific section (e.g., meals, study, budget)
 * @param {string} section - Section name: 'meals', 'study', 'budget', etc.
 * @returns {boolean} - True if successful
 */
function clearSectionStorage(section) {
    try {
        // Define which keys belong to each section
        const sectionKeys = {
            study: ['STUDY_TIMETABLE', 'STUDY_GOALS', 'FLASHCARDS', 'PRACTICE_PROGRESS'],
            meals: ['PLANNED_MEALS', 'FAVORITE_MEALS', 'CUSTOM_MEALS', 'MEAL_RATINGS', 'SHOPPING_LIST', 'LEFTOVERS'],
            cleaning: ['CLEANING_ROUTINE'],
            diy: ['DIY_TASKS'],
            budget: ['BUDGET_DATA', 'SAVINGS_GOALS'],
            uni: ['UNI_CHECKLIST']
        };
        
        // Get keys for this section
        const keysToRemove = sectionKeys[section];
        
        if (!keysToRemove) {
            console.error(`❌ Unknown section: ${section}`);
            return false;
        }
        
        // Remove each key
        keysToRemove.forEach(keyName => {
            const key = STORAGE_KEYS[keyName];
            localStorage.removeItem(key);
        });
        
        console.log(`✅ Cleared ${section} section data`);
        return true;
    } catch (error) {
        console.error(`❌ Error clearing ${section} section:`, error);
        return false;
    }
}

// ============================================
// CHECK IF STORAGE IS AVAILABLE
// ============================================

/**
 * Check if localStorage is available in browser
 * @returns {boolean} - True if available
 */
function isStorageAvailable() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        console.error('⚠️ localStorage not available:', error);
        return false;
    }
}

// ============================================
// GET STORAGE SIZE (APPROXIMATE)
// ============================================

/**
 * Get approximate size of stored data in bytes
 * @returns {object} - Object with size info
 */
function getStorageSize() {
    try {
        let totalSize = 0;
        const sizes = {};
        
        // Check each key
        Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
            const data = localStorage.getItem(key);
            if (data) {
                const size = new Blob([data]).size;
                sizes[name] = size;
                totalSize += size;
            }
        });
        
        return {
            totalBytes: totalSize,
            totalKB: (totalSize / 1024).toFixed(2),
            totalMB: (totalSize / 1024 / 1024).toFixed(2),
            breakdown: sizes,
            limit: '5MB-10MB (browser dependent)'
        };
    } catch (error) {
        console.error('❌ Error calculating storage size:', error);
        return null;
    }
}

// ============================================
// EXPORT/IMPORT DATA (FOR BACKUP)
// ============================================

/**
 * Export all user data as JSON string (for download/backup)
 * @returns {string} - JSON string of all data
 */
function exportAllData() {
    try {
        const exportData = {};
        
        // Collect all data
        Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
            const data = localStorage.getItem(key);
            if (data) {
                exportData[name] = JSON.parse(data);
            }
        });
        
        // Add metadata
        exportData._metadata = {
            exportDate: new Date().toISOString(),
            appVersion: '2.0',
            dataKeys: Object.keys(exportData)
        };
        
        console.log('✅ Data exported successfully');
        return JSON.stringify(exportData, null, 2);
    } catch (error) {
        console.error('❌ Error exporting data:', error);
        return null;
    }
}

/**
 * Import data from JSON string (restore from backup)
 * @param {string} jsonString - JSON string to import
 * @returns {boolean} - True if successful
 */
function importAllData(jsonString) {
    try {
        // Parse JSON
        const importData = JSON.parse(jsonString);
        
        // Remove metadata before importing
        delete importData._metadata;
        
        // Import each key
        Object.entries(importData).forEach(([name, data]) => {
            const key = STORAGE_KEYS[name];
            if (key) {
                saveToStorage(key, data);
            }
        });
        
        console.log('✅ Data imported successfully');
        return true;
    } catch (error) {
        console.error('❌ Error importing data:', error);
        return false;
    }
}

// ============================================
// INITIALIZE STORAGE (FIRST TIME SETUP)
// ============================================

/**
 * Initialize storage with default values for new users
 */
function initializeStorage() {
    try {
        // Check if already initialized
        const existingProfile = loadFromStorage(STORAGE_KEYS.USER_PROFILE);
        if (existingProfile) {
            console.log('ℹ️ Storage already initialized');
            return;
        }
        
        // Set default values
        const defaults = {
            [STORAGE_KEYS.USER_PROFILE]: {
                name: 'Student',
                joinDate: new Date().toISOString(),
                preferences: {}
            },
            [STORAGE_KEYS.USER_POINTS]: 0,
            [STORAGE_KEYS.USER_LEVEL]: 1,
            [STORAGE_KEYS.USER_STREAK]: 0,
            [STORAGE_KEYS.LAST_ACTIVE]: new Date().toISOString(),
            [STORAGE_KEYS.ACHIEVEMENTS]: [],
            [STORAGE_KEYS.USER_TIER]: 'free',
            [STORAGE_KEYS.COMPLETED_ITEMS]: []
        };
        
        // Save defaults
        Object.entries(defaults).forEach(([key, value]) => {
            saveToStorage(key, value);
        });
        
        console.log('✅ Storage initialized with default values');
    } catch (error) {
        console.error('❌ Error initializing storage:', error);
    }
}

// ============================================
// UPDATE LAST ACTIVE DATE
// ============================================

/**
 * Update the last active timestamp (for streak tracking)
 */
function updateLastActive() {
    saveToStorage(STORAGE_KEYS.LAST_ACTIVE, new Date().toISOString());
}

// ============================================
// CHECK IF USER WAS ACTIVE TODAY
// ============================================

/**
 * Check if user was active today (for streak tracking)
 * @returns {boolean} - True if active today
 */
function wasActiveToday() {
    const lastActive = loadFromStorage(STORAGE_KEYS.LAST_ACTIVE);
    
    if (!lastActive) return false;
    
    const lastDate = new Date(lastActive);
    const today = new Date();
    
    return (
        lastDate.getFullYear() === today.getFullYear() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getDate() === today.getDate()
    );
}

// ============================================
// EXPORT FUNCTIONS FOR USE IN OTHER FILES
// ============================================

// These functions are now available globally
// Usage example: saveToStorage(STORAGE_KEYS.USER_POINTS, 100);

console.log('✅ Storage utilities loaded');
