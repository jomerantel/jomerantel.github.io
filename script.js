window.showSection = function(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    const navLinksContainer = document.querySelector('.nav-links');
    if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        const icon = document.querySelector('#hamburger i');
        icon.classList.replace('fa-times', 'fa-bars');
    }

    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Theme Toggle Logic
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // --- ONE SINGLE FORM SUBMISSION LOGIC ---
    const form = document.getElementById('foodOrderForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const orderInput = document.getElementById('orderText');
            const orderDetails = orderInput.value;
            const emailAddress = "jomerantel07@gmail.com"; 
            
            const now = new Date();
            const timestamp = now.toLocaleString(); 

            const subject = encodeURIComponent("New Food Order - Fhe's Food Stall");
            const body = encodeURIComponent(
                `Order Details:\n----------------\n${orderDetails}\n\n----------------\nSent on: ${timestamp}`
            );

            window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

            alert("Success! Your email app is opening. Please click 'Send' in your email app to submit your order.");
            form.reset(); 
        });
    }
});