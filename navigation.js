document.addEventListener('DOMContentLoaded', () => {
    const NAV_ITEMS = [
        // General
        { href: 'index.html', label: '🏠 Home', category: 'general' },
        { href: 'units.html', label: '📐 Units & Notation', category: 'general' },

        // Core Mathematics
        { href: 'algebra.html', label: '➗ Core Algebra', category: 'core-math' },
        { href: 'linear_methods.html', label: '📊 Linear Methods', category: 'core-math' },
        { href: 'sine_wave_fundamentals.html', label: '🌊 Sine Wave Fundamentals', category: 'core-math' },
        { href: 'trigonometry.html', label: '📐 Trigonometry', category: 'core-math' },
        { href: 'vectors.html', label: '➡️ Vectors', category: 'core-math' },
        { href: 'sinecosine.html', label: '📈 Sine/Cosine Calculus', category: 'core-math' },

        // Calculus
        { href: 'calculus.html', label: '📚 Calculus Fundamentals', category: 'calculus' },
        { href: 'advanced_calculus.html', label: '⚡ Advanced Calculus', category: 'calculus' },
        { href: 'rate_of_change.html', label: '📈 Rate of Change', category: 'calculus' },
        { href: 'chainrule.html', label: '⛓️ Chain Rule', category: 'calculus' },
        { href: 'inverse_trig_derivatives.html', label: '🔄 Inverse Trig Derivatives', category: 'calculus' },
        { href: 'repeated_differentiation.html', label: '🔄 Higher-Order Differentiation', category: 'calculus' },
        { href: 'turning_points.html', label: '📊 Max/Min Turning Points', category: 'calculus' },
        { href: 'quotient_rule.html', label: '➗ Quotient Rule', category: 'calculus' },
        { href: 'expocalc.html', label: '📈 Exponential Calculus', category: 'calculus' },

        // Applied & Specialized Topics
        { href: 'ac_circuits.html', label: '⚡ AC Circuit Analysis', category: 'applied' },
        { href: 'mechanics.html', label: '⚙️ Applied Mechanics', category: 'applied' },
        { href: 'economics.html', label: '💰 Financial Economics', category: 'applied' },
        { href: 'numerical_methods.html', label: '🔢 Numerical Methods', category: 'applied' },
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
            a.innerHTML = label;

            const itemPath = normalizePath(new URL(href, location.href).pathname);
            if (itemPath === currentPath) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        section.appendChild(ul);
        nav.appendChild(section);
    });

    // Add search functionality
    const searchContainer = document.createElement('div');
    searchContainer.className = 'nav-search';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search topics...';
    searchInput.className = 'search-input';
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allLinks = nav.querySelectorAll('a');
        
        allLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                link.parentElement.style.display = 'block';
                // Highlight matching section
                link.closest('.nav-section').style.display = 'block';
            } else {
                link.parentElement.style.display = 'none';
            }
        });
        
        // Hide empty sections
        document.querySelectorAll('.nav-section').forEach(section => {
            const visibleLinks = section.querySelectorAll('li[style=""]', 'li:not([style*="display: none"])');
            if (visibleLinks.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });
    
    searchContainer.appendChild(searchInput);
    nav.insertBefore(searchContainer, nav.children[1]); // Insert after header

    placeholder.replaceChildren(nav);

    function normalizePath(pathname) {
        let p = pathname.replace(/\/index\.html?$/i, '/');
        if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
        return p;
    }
});