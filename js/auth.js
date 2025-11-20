/*
  AUTHENTICATION UTILITIES
  Purpose: Handle user login, signup, logout (Firebase integration ready)
  Note: This is prepared for Firebase but works without it initially
*/

// ============================================
// AUTHENTICATION STATE
// ============================================

let currentUser = null;
let isAuthenticated = false;

// ============================================
// INITIALIZE AUTH SYSTEM
// ============================================

/**
 * Initialize authentication on page load
 */
function initializeAuth() {
    try {
        // Check if user is logged in (from localStorage for now)
        const savedUser = loadFromStorage(STORAGE_KEYS.USER_PROFILE);
        
        if (savedUser) {
            currentUser = savedUser;
            isAuthenticated = true;
            console.log('✅ User authenticated:', currentUser.name);
            
            // Update last active
            updateLastActive();
            
            // Dispatch auth event
            dispatchAuthEvent('login', currentUser);
        } else {
            console.log('ℹ️ No user logged in');
            
            // Initialize storage for new user
            initializeStorage();
            
            // Load the new user profile
            currentUser = loadFromStorage(STORAGE_KEYS.USER_PROFILE);
            isAuthenticated = true;
        }
    } catch (error) {
        console.error('❌ Error initializing auth:', error);
    }
}

// ============================================
// GET CURRENT USER
// ============================================

/**
 * Get the currently logged in user
 * @returns {object|null} - User object or null
 */
function getCurrentUser() {
    return currentUser;
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if logged in
 */
function isUserAuthenticated() {
    return isAuthenticated;
}

// ============================================
// LOGIN (LOCAL - FIREBASE READY)
// ============================================

/**
 * Login user (currently local, will integrate Firebase)
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} - User object if successful
 */
async function login(email, password) {
    try {
        console.log('🔐 Attempting login...');
        
        // TODO: Replace with Firebase authentication
        // For now, simulate login
        
        // Check if user exists in storage
        let user = loadFromStorage(STORAGE_KEYS.USER_PROFILE);
        
        if (!user) {
            // Create new user profile
            user = {
                email: email,
                name: email.split('@')[0], // Use email prefix as name
                joinDate: new Date().toISOString(),
                preferences: {},
                tier: 'free'
            };
            
            saveToStorage(STORAGE_KEYS.USER_PROFILE, user);
            initializeStorage();
        }
        
        // Set as current user
        currentUser = user;
        isAuthenticated = true;
        
        // Update last active
        updateLastActive();
        
        // Dispatch event
        dispatchAuthEvent('login', currentUser);
        
        console.log('✅ Login successful:', user.name);
        return user;
        
    } catch (error) {
        console.error('❌ Login error:', error);
        throw error;
    }
}

// ============================================
// SIGNUP (LOCAL - FIREBASE READY)
// ============================================

/**
 * Signup new user (currently local, will integrate Firebase)
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User name
 * @returns {Promise<object>} - User object if successful
 */
async function signup(email, password, name) {
    try {
        console.log('📝 Attempting signup...');
        
        // TODO: Replace with Firebase authentication
        // For now, create local profile
        
        const user = {
            email: email,
            name: name,
            joinDate: new Date().toISOString(),
            preferences: {},
            tier: 'free'
        };
        
        // Save user profile
        saveToStorage(STORAGE_KEYS.USER_PROFILE, user);
        
        // Initialize all storage
        initializeStorage();
        
        // Set as current user
        currentUser = user;
        isAuthenticated = true;
        
        // Dispatch event
        dispatchAuthEvent('signup', currentUser);
        
        console.log('✅ Signup successful:', user.name);
        return user;
        
    } catch (error) {
        console.error('❌ Signup error:', error);
        throw error;
    }
}

// ============================================
// LOGOUT
// ============================================

/**
 * Logout current user
 */
function logout() {
    try {
        console.log('👋 Logging out...');
        
        // Clear current user
        const loggedOutUser = currentUser;
        currentUser = null;
        isAuthenticated = false;
        
        // Dispatch event before clearing
        dispatchAuthEvent('logout', loggedOutUser);
        
        // Note: We keep localStorage data for when user logs back in
        // If you want to clear data on logout, uncomment:
        // clearAllStorage();
        
        console.log('✅ Logged out successfully');
        
    } catch (error) {
        console.error('❌ Logout error:', error);
    }
}

// ============================================
// UPDATE USER PROFILE
// ============================================

/**
 * Update user profile information
 * @param {object} updates - Object with fields to update
 * @returns {boolean} - True if successful
 */
function updateUserProfile(updates) {
    try {
        if (!currentUser) {
            console.error('❌ No user logged in');
            return false;
        }
        
        // Merge updates with current profile
        currentUser = {
            ...currentUser,
            ...updates
        };
        
        // Save to storage
        saveToStorage(STORAGE_KEYS.USER_PROFILE, currentUser);
        
        // Dispatch event
        dispatchAuthEvent('profile-updated', currentUser);
        
        console.log('✅ Profile updated');
        return true;
        
    } catch (error) {
        console.error('❌ Error updating profile:', error);
        return false;
    }
}

// ============================================
// GET USER TIER (FREE OR PREMIUM)
// ============================================

/**
 * Get user's current tier
 * @returns {string} - 'free' or 'premium'
 */
function getUserTier() {
    const tier = loadFromStorage(STORAGE_KEYS.USER_TIER, 'free');
    return tier;
}

/**
 * Check if user has premium access
 * @returns {boolean} - True if premium
 */
function isPremiumUser() {
    return getUserTier() === 'premium';
}

/**
 * Upgrade user to premium
 * @returns {boolean} - True if successful
 */
function upgradeToPremium() {
    try {
        saveToStorage(STORAGE_KEYS.USER_TIER, 'premium');
        
        // Update user profile
        if (currentUser) {
            currentUser.tier = 'premium';
            saveToStorage(STORAGE_KEYS.USER_PROFILE, currentUser);
        }
        
        // Dispatch event
        dispatchAuthEvent('tier-upgraded', { tier: 'premium' });
        
        console.log('✅ Upgraded to premium');
        return true;
        
    } catch (error) {
        console.error('❌ Error upgrading to premium:', error);
        return false;
    }
}

// ============================================
// AUTH EVENTS (FOR OTHER PARTS OF APP)
// ============================================

/**
 * Dispatch custom authentication event
 * @param {string} eventName - Event name: 'login', 'logout', 'signup', etc.
 * @param {any} data - Event data
 */
function dispatchAuthEvent(eventName, data) {
    const event = new CustomEvent(`auth:${eventName}`, {
        detail: data
    });
    window.dispatchEvent(event);
}

/**
 * Listen for auth events
 * Usage: onAuthEvent('login', (user) => { console.log('User logged in:', user); });
 * @param {string} eventName - Event name to listen for
 * @param {function} callback - Function to call when event fires
 */
function onAuthEvent(eventName, callback) {
    window.addEventListener(`auth:${eventName}`, (event) => {
        callback(event.detail);
    });
}

// ============================================
// GOOGLE SIGN-IN (FIREBASE READY)
// ============================================

/**
 * Sign in with Google (will integrate Firebase)
 * @returns {Promise<object>} - User object
 */
async function signInWithGoogle() {
    try {
        console.log('🔐 Google Sign-In...');
        
        // TODO: Implement Firebase Google Sign-In
        // For now, simulate
        
        const user = {
            email: 'user@gmail.com',
            name: 'Google User',
            joinDate: new Date().toISOString(),
            preferences: {},
            tier: 'free',
            provider: 'google'
        };
        
        currentUser = user;
        isAuthenticated = true;
        
        saveToStorage(STORAGE_KEYS.USER_PROFILE, user);
        initializeStorage();
        
        dispatchAuthEvent('login', currentUser);
        
        console.log('✅ Google Sign-In successful');
        return user;
        
    } catch (error) {
        console.error('❌ Google Sign-In error:', error);
        throw error;
    }
}

// ============================================
// PASSWORD RESET (FIREBASE READY)
// ============================================

/**
 * Send password reset email (will integrate Firebase)
 * @param {string} email - User email
 * @returns {Promise<boolean>} - True if email sent
 */
async function resetPassword(email) {
    try {
        console.log('📧 Sending password reset email...');
        
        // TODO: Implement Firebase password reset
        // For now, simulate
        
        console.log('✅ Password reset email sent to:', email);
        return true;
        
    } catch (error) {
        console.error('❌ Password reset error:', error);
        throw error;
    }
}

// ============================================
// DELETE ACCOUNT
// ============================================

/**
 * Delete user account and all data
 * WARNING: Cannot be undone!
 * @returns {Promise<boolean>} - True if successful
 */
async function deleteAccount() {
    try {
        console.log('🗑️ Deleting account...');
        
        // TODO: Implement Firebase account deletion
        
        // Clear all data
        clearAllStorage();
        
        // Logout
        logout();
        
        console.log('✅ Account deleted');
        return true;
        
    } catch (error) {
        console.error('❌ Account deletion error:', error);
        throw error;
    }
}

// ============================================
// INITIALIZE ON LOAD
// ============================================

// Initialize auth when script loads
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAuth);
    } else {
        initializeAuth();
    }
}

console.log('✅ Authentication utilities loaded');
