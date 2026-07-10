const fs = require('fs');
const path = require('path');

const frontendPath = 'C:/Users/joseg/.gemini/antigravity/scratch/Travel-MateBack/frontend';

// Helper to modify file
function modify(file, fn) {
    const p = path.join(frontendPath, file);
    if (!fs.existsSync(p)) {
        console.warn('File not found:', p);
        return;
    }
    const orig = fs.readFileSync(p, 'utf8');
    const modified = fn(orig);
    if (orig !== modified) {
        fs.writeFileSync(p, modified);
        console.log('Modified', file);
    }
}

// 1. Unify the step indicator name
modify('styles.css', content => content.replace(/\.step-indicator\b/g, '.step-circle-indicator'));
modify('js/auth.js', content => content.replace(/step-circle\b/g, 'step-circle-indicator'));

// 2. Remove calendar-day-btn
modify('js/traveler-test.js', content => {
    // calendar-day-btn is added during calendar generation.
    // The user wants to replace the class string entirely.
    // E.g., class="calendar-day-btn" -> "btn btn-sm border-0 rounded-2 p-2 small fw-semibold"
    // And for disabled: "btn btn-sm border-0 rounded-2 p-2 small text-muted opacity-50"
    
    // First, let's see how it's created. Usually btn.className = ...
    // Since I'm doing regex, let's just do a specific replace.
    // Wait, let's see how it's written in the code. I'll search traveler-test.js for calendar-day-btn.
    return content; 
});

// 3. Remove back-to-top
modify('index.html', content => {
    // Replace 'btn btn-success rounded-circle shadow-lg back-to-top' with 'btn btn-success rounded-circle shadow-lg position-fixed bottom-0 end-0 m-4 d-none'
    // Or whatever class combination exists containing back-to-top.
    let html = content.replace(/class="([^"]*)back-to-top([^"]*)"/g, 'class="btn btn-success rounded-circle shadow-lg position-fixed bottom-0 end-0 m-4 d-none"');
    
    // Also fix step-indicator to just step-circle-indicator
    html = html.replace(/step-circle-indicator step-indicator/g, 'step-circle-indicator');
    
    // Ensure avatars have object-fit-cover
    html = html.replace(/class="([^"]*avatar-lg[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);
    html = html.replace(/class="([^"]*avatar-sm[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);
    html = html.replace(/class="([^"]*testimonial-avatar[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);

    return html;
});

modify('perfil.html', content => {
    let html = content.replace(/step-circle-indicator step-indicator/g, 'step-circle-indicator');
    html = html.replace(/class="([^"]*avatar-lg[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);
    html = html.replace(/class="([^"]*avatar-sm[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);
    html = html.replace(/class="([^"]*testimonial-avatar[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);
    return html;
});

modify('inicio.html', content => {
    let html = content.replace(/step-circle-indicator step-indicator/g, 'step-circle-indicator');
    html = html.replace(/class="([^"]*avatar-lg[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);
    html = html.replace(/class="([^"]*avatar-sm[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);
    html = html.replace(/class="([^"]*testimonial-avatar[^"]*)"/g, (match, p1) => match.includes('object-fit-cover') ? match : `class="${p1} object-fit-cover"`);
    return html;
});

// Update main.js for back-to-top selector if it uses it
modify('js/main.js', content => {
    // If it uses document.querySelector(".back-to-top")
    // Wait, if we remove back-to-top, how does main.js select it?
    // Let's use document.getElementById("backToTopBtn") or just leave it. I need to check main.js.
    return content;
});

