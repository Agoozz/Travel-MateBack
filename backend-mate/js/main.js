document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            e.preventDefault();
            document.querySelectorAll('.navbar .nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            document.querySelectorAll('.navbar .nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            const menuToggle = document.getElementById('navbarNav');
            if (menuToggle && menuToggle.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(menuToggle);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else if (typeof bootstrap !== 'undefined') {
                    new bootstrap.Collapse(menuToggle).hide();
                }
            }
            
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
