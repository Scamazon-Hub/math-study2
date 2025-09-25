document.addEventListener('DOMContentLoaded', () => {
    const NAV_ITEMS = [
        // General
        { href: 'index.html', label: '🏠 Home', category: 'general' },
        { href: 'units.html', label: '📐 Units & Notation', category: 'general' },

        // Core Mathematics
        { href: 'core-algebra.html', label: '➗ Core Algebra', category: 'core-math' },
        { href: 'linear-methods.html', label: '📊 Linear Methods', category: 'core-math' },
        { href: 'sine-wave-fundamentals.html', label: '🌊 Sine Wave Fundamentals', category: 'core-math' },
        { href: 'trigonometry.html', label: '📐 Trigonometry', category: 'core-math' },
        { href: 'vectors.html', label: '➡️ Vectors', category: 'core-math' },
        { href: 'sine-cosine-calculus.html', label: '📈 Sine/Cosine Calculus', category: 'core-math' },

        // Calculus
        { href: 'calculus-fundamentals.html', label: '📚 Calculus Fundamentals', category: 'calculus' },
        { href: 'advanced-calculus.html', label: '⚡ Advanced Calculus', category: 'calculus' },
        { href: 'rate-of-change.html', label: '📈 Rate of Change', category: 'calculus' },
        { href: 'chainrule.html', label: '⛓️ Chain Rule', category: 'calculus' },
        { href: 'differential-equations.html', label: '⛓️ Differential Equations', category: 'calculus' },
        { href: 'inverse-trig-derivatives.html', label: '🔄 Inverse Trig Derivatives', category: 'calculus' },
        { href: 'higher-order-differentiation.html', label: '🔄 Higher-Order Differentiation', category: 'calculus' },
        { href: 'turning_points.html', label: '📊 Max/Min Turning Points', category: 'calculus' },
        { href: 'quotient-rule.html', label: '➗ Quotient Rule', category: 'calculus' },
        { href: 'exponential-calculus.html', label: '📈 Exponential Calculus', category: 'calculus' },
        { href: 'max-min.html', label: '📈 Maximum and Minimum', category: 'calculus' },
        { href: 'intergration.html', label: '⛓️ Integration Fundamentals', category: 'calculus' },
        { href: 'indefinite-integration.html', label: '⛓️ Indefinite Integration', category: 'calculus' },

        // Applied & Specialized Topics
        { href: 'ac-circuits-analysis.html', label: '⚡ AC Circuit Analysis', category: 'applied' },
        { href: 'applied-mechanics.html', label: '⚙️ Applied Mechanics', category: 'applied' },
        { href: 'economics.html', label: '💰 Financial Economics', category: 'applied' },
        { href: 'numerical-methods.html', label: '🔢 Numerical Methods', category: 'applied' },
        { href: 'statistics.html', label: '📊 Statistics', category: 'applied' }
    ];

    const CATEGORIES = {
        'general': { label: 'General', icon: '📁' },
        'core-math': { label: 'Core Mathematics', icon: '🧮' },
        'calculus': { label: 'Calculus', icon: '📚' },
        'applied': { label: 'Applied Topics', icon: '⚡' }
    };

    const placeholder = document.getElementById('navigation-placeholder');
    if (!placeholder) return;

    const currentPath = normalizePath(location.pathname);

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Main Navigation');

    // Create header
    const header = document.createElement('div');
    header.className = 'nav-header';

    const h2 = document.createElement('h2');
    h2.textContent = '📚 HNC Mathematics';
    header.appendChild(h2);

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Complete Reference Guide';
    subtitle.className = 'nav-subtitle';
    header.appendChild(subtitle);

    nav.appendChild(header);

    // Group items by category
    const categorizedItems = {};
    Object.keys(CATEGORIES).forEach(cat => {
        categorizedItems[cat] = NAV_ITEMS.filter(item => item.category === cat);
    });

    // Create category sections
    Object.entries(CATEGORIES).forEach(([catKey, catInfo]) => {
        const items = categorizedItems[catKey];
        if (items.length === 0) return;

        const section = document.createElement('div');
        section.className = 'nav-section';

        const sectionHeader = document.createElement('h3');
        sectionHeader.innerHTML = `${catInfo.icon} ${catInfo.label}`;
        section.appendChild(sectionHeader);

        const ul = document.createElement('ul');

        items.forEach(({ href, label }) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = href;
            a
