/*
  UTILITY FUNCTIONS
  Purpose: Helper functions used throughout the app
  Includes: Date formatting, validation, DOM manipulation, etc.
*/

// ============================================
// DATE & TIME UTILITIES
// ============================================

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or ISO string
 * @param {string} format - Format type: 'short', 'long', 'time'
 * @returns {string} - Formatted date string
 */
function formatDate(date, format = 'short') {
    const d = new Date(date);
    
    const options = {
        short: { day: 'numeric', month: 'short', year: 'numeric' },
        long: { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' },
        time: { hour: '2-digit', minute: '2-digit' },
        datetime: { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }
    };
    
    return d.toLocaleDateString('en-GB', options[format] || options.short);
}

/**
 * Get today's date at midnight
 * @returns {Date} - Today at 00:00:00
 */
function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

/**
 * Check if two dates are the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} - True if same day
 */
function isSameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

/**
 * Get days between two dates
 * @param {Date} date1 - Start date
 * @param {Date} date2 - End date
 * @returns {number} - Number of days
 */
function daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get day of week name
 * @param {Date|number} date - Date object or day number (0-6)
 * @returns {string} - Day name (Monday, Tuesday, etc.)
 */
function getDayName(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    if (typeof date === 'number') {
        return days[date];
    }
    
    return days[new Date(date).getDay()];
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated string with ellipsis
 */
function truncate(str, maxLength = 50) {
    if (!str || str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
}

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} - Random ID
 */
function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

/**
 * Slugify string (make URL-friendly)
 * @param {string} str - String to slugify
 * @returns {string} - Slugified string
 */
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
    return num.toLocaleString('en-GB');
}

/**
 * Format currency (GBP)
 * @param {number} amount - Amount in pounds
 * @returns {string} - Formatted currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    }).format(amount);
}

/**
 * Clamp number between min and max
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped number
 */
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

/**
 * Get percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} - Percentage (0-100)
 */
function getPercentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Shuffle array randomly
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Get random item from array
 * @param {Array} array - Array to pick from
 * @returns {any} - Random item
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} - Grouped object
 */
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

// ============================================
// DOM UTILITIES
// ============================================

/**
 * Select element (shorthand for querySelector)
 * @param {string} selector - CSS selector
 * @returns {Element} - Selected element
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * Select all elements (shorthand for querySelectorAll)
 * @param {string} selector - CSS selector
 * @returns {NodeList} - Selected elements
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Attributes object
 * @param {string} content - Inner HTML/text
 * @returns {Element} - Created element
 */
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'class') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    });
    
    if (content) {
        element.innerHTML = content;
    }
    
    return element;
}

/**
 * Show element
 * @param {Element|string} element - Element or selector
 */
function show(element) {
    const el = typeof element === 'string' ? $(element) : element;
    if (el) el.style.display = 'block';
}

/**
 * Hide element
 * @param {Element|string} element - Element or selector
 */
function hide(element) {
    const el = typeof element === 'string' ? $(element) : element;
    if (el) el.style.display = 'none';
}

/**
 * Toggle element visibility
 * @param {Element|string} element - Element or selector
 */
function toggle(element) {
    const el = typeof element === 'string' ? $(element) : element;
    if (el) {
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
}

/**
 * Add class to element
 * @param {Element|string} element - Element or selector
 * @param {string} className - Class name to add
 */
function addClass(element, className) {
    const el = typeof element === 'string' ? $(element) : element;
    if (el) el.classList.add(className);
}

/**
 * Remove class from element
 * @param {Element|string} element - Element or selector
 * @param {string} className - Class name to remove
 */
function removeClass(element, className) {
    const el = typeof element === 'string' ? $(element) : element;
    if (el) el.classList.remove(className);
}

/**
 * Toggle class on element
 * @param {Element|string} element - Element or selector
 * @param {string} className - Class name to toggle
 */
function toggleClass(element, className) {
    const el = typeof element === 'string' ? $(element) : element;
    if (el) el.classList.toggle(className);
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validate UK phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
function isValidPhone(phone) {
    const regex = /^(?:(?:\+44\s?|0)(?:\d{2}\s?\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4}|\d{4}\s?\d{6}))$/;
    return regex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate UK postcode
 * @param {string} postcode - Postcode to validate
 * @returns {boolean} - True if valid
 */
function isValidPostcode(postcode) {
    const regex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
    return regex.test(postcode.trim());
}

// ============================================
// DEBOUNCE & THROTTLE
// ============================================

/**
 * Debounce function (delay execution until after wait time)
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function (limit execution rate)
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// COPY TO CLIPBOARD
// ============================================

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - True if successful
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('✅ Copied to clipboard');
        return true;
    } catch (error) {
        console.error('❌ Failed to copy:', error);
        return false;
    }
}

// ============================================
// SCROLL UTILITIES
// ============================================

/**
 * Scroll to element smoothly
 * @param {Element|string} element - Element or selector
 */
function scrollToElement(element) {
    const el = typeof element === 'string' ? $(element) : element;
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// EXPORT MESSAGE
// ============================================

console.log('✅ Utility functions loaded');
