<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Student Life Hub</title>
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/variables.css">
    <link rel="stylesheet" href="../css/accessibility.css">
    <link rel="stylesheet" href="../css/layout.css">
    <link rel="stylesheet" href="../css/typography.css">
    <link rel="stylesheet" href="../css/animations.css">
    <link rel="stylesheet" href="../css/gamification.css">
    <link rel="stylesheet" href="../css/components/buttons.css">
    <link rel="stylesheet" href="../css/components/cards.css">
    <link rel="stylesheet" href="../css/components/navigation.css">
    <link rel="stylesheet" href="../css/sections/dashboard.css">
</head>
<body>
    <!-- Skip Link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Mobile-First Header -->
    <header class="main-header">
        <div class="container">
            <div class="header-top">
                <h1 class="logo">Student Life Hub</h1>
                <div class="header-stats">
                    <span class="header-stat">🔥 <span id="header-streak">0</span></span>
                    <span class="header-stat">⭐ <span id="header-points">0</span></span>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Main Content -->
    <main id="main-content" class="dashboard-main">
        <div class="container">
            
            <!-- Welcome Section -->
            <section class="dashboard-welcome">
                <div class="welcome-content">
                    <h2 class="welcome-title">
                        Welcome back, <span id="user-name">Student</span>! 👋
                    </h2>
                    <p class="welcome-date" id="current-date">
                        <!-- Date will be inserted by JavaScript -->
                    </p>
                    <p class="welcome-quote" id="motivational-quote">
                        <!-- Quote will be inserted by JavaScript -->
                    </p>
                </div>
            </section>
            
            <!-- Quick Stats -->
            <section class="dashboard-stats" aria-label="Your statistics">
                <div class="stats-grid">
                    <!-- Points Card -->
                    <div class="stat-card stat-points">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-content">
                            <div class="stat-value" id="user-points">0</div>
                            <div class="stat-label">Points</div>
                        </div>
                    </div>
                    
                    <!-- Level Card -->
                    <div class="stat-card stat-level">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-content">
                            <div class="stat-value" id="user-level">1</div>
                            <div class="stat-label">Level</div>
                        </div>
                    </div>
                    
                    <!-- Streak Card -->
                    <div class="stat-card stat-streak">
                        <div class="stat-icon">🔥</div>
                        <div class="stat-content">
                            <div class="stat-value" id="user-streak">0</div>
                            <div class="stat-label">Day Streak</div>
                        </div>
                    </div>
                    
                    <!-- Tasks Card -->
                    <div class="stat-card stat-tasks">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <div class="stat-value">
                                <span id="completed-tasks">0</span>/<span id="total-tasks">0</span>
                            </div>
                            <div class="stat-label">Tasks Today</div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Today's Schedule -->
            <section class="dashboard-today">
                <h2 class="section-title">Today's Schedule</h2>
                
                <!-- Meals Today -->
                <div class="today-section">
                    <h3 class="today-section-title">
                        <span class="section-icon" style="background-color: var(--color-meals);">🍳</span>
                        Meals
                    </h3>
                    <div id="today-meals" class="today-items">
                        <p class="empty-state">No meals planned yet. <a href="meals.html">Browse meals</a></p>
                    </div>
                </div>
                
                <!-- Study Sessions Today -->
                <div class="today-section">
                    <h3 class="today-section-title">
                        <span class="section-icon" style="background-color: var(--color-study);">📚</span>
                        Study Sessions
                    </h3>
                    <div id="today-study" class="today-items">
                        <p class="empty-state">No study sessions planned. <a href="study.html">Create schedule</a></p>
                    </div>
                </div>
                
                <!-- Cleaning Tasks Today -->
                <div class="today-section">
                    <h3 class="today-section-title">
                        <span class="section-icon" style="background-color: var(--color-cleaning);">🧹</span>
                        Cleaning Tasks
                    </h3>
                    <div id="today-cleaning" class="today-items">
                        <p class="empty-state">No tasks scheduled. <a href="cleaning.html">View tasks</a></p>
                    </div>
                </div>
            </section>
            
            <!-- Quick Actions -->
            <section class="dashboard-actions">
                <h2 class="section-title">Quick Actions</h2>
                <div class="action-buttons">
                    <a href="meals.html" class="btn btn-primary" style="background-color: var(--color-meals);">
                        + Add Meal
                    </a>
                    <a href="study.html" class="btn btn-primary" style="background-color: var(--color-study);">
                        + Study Block
                    </a>
                    <a href="cleaning.html" class="btn btn-primary" style="background-color: var(--color-cleaning);">
                        + Cleaning Task
                    </a>
                    <a href="budget.html" class="btn btn-primary" style="background-color: var(--color-budget);">
                        + Log Expense
                    </a>
                </div>
            </section>
            
        </div>
    </main>
    
    <!-- Bottom Tab Navigation (Mobile-First) -->
    <nav class="bottom-tabs" aria-label="Main navigation" role="navigation">
        <a href="dashboard.html" class="tab-item active" aria-current="page">
            <span class="tab-icon">🏠</span>
            <span class="tab-label">Home</span>
        </a>
        
        <a href="meals.html" class="tab-item">
            <span class="tab-icon">🍳</span>
            <span class="tab-label">Meals</span>
        </a>
        
        <a href="study.html" class="tab-item">
            <span class="tab-icon">📚</span>
            <span class="tab-label">Study</span>
        </a>
        
        <a href="cleaning.html" class="tab-item">
            <span class="tab-icon">🧹</span>
            <span class="tab-label">Clean</span>
        </a>
        
        <a href="budget.html" class="tab-item">
            <span class="tab-icon">💰</span>
            <span class="tab-label">Budget</span>
        </a>
        
        <a href="diy.html" class="tab-item">
            <span class="tab-icon">🔧</span>
            <span class="tab-label">DIY</span>
        </a>
        
        <a href="support.html" class="tab-item">
            <span class="tab-icon">💚</span>
            <span class="tab-label">Support</span>
        </a>
        
        <a href="legal.html" class="tab-item">
            <span class="tab-icon">⚖️</span>
            <span class="tab-label">Legal</span>
        </a>
        
        <a href="uni-essentials.html" class="tab-item">
            <span class="tab-icon">🎒</span>
            <span class="tab-label">Uni</span>
        </a>
    </nav>
    
    <!-- JavaScript Files -->
    <script src="../js/utils.js"></script>
    <script src="../js/storage.js"></script>
    <script src="../js/auth.js"></script>
    <script src="../js/components/cards.js"></script>
    <script src="../js/pages/dashboard.js"></script>
</body>
</html>