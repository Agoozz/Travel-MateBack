const fs = require('fs');
const path = require('path');
const frontDir = 'C:/Users/joseg/.gemini/antigravity/scratch/Travel-MateBack/frontend';
const css = fs.readFileSync(path.join(frontDir, 'styles.css'), 'utf8');
const jsFiles = fs.readdirSync(path.join(frontDir, 'js')).filter(f => f.endsWith('.js'));
let jsContent = '';
jsFiles.forEach(f => jsContent += fs.readFileSync(path.join(frontDir, 'js', f), 'utf8'));

const classes = ['afinidad-badge','avatar-img','avatar-selector-img','bio-text','budget-text','calendar-container','card-destino','card-icon-40','card-icon-55','chat-container','chat-input-wrapper','companion-avatar-wrap','companion-card','companion-card-banner','companion-item','companion-type-badge','destination-text','letter-spacing-1','location-text','match-plane-icon','modal-avatar-frame','modal-left-card','name-age','profile-avatar-frame','profile-header-banner','profile-photo-grid','profile-summary-card','progress-loader','progress-sm','quick-filter','region-tab','result-img','step-circle-indicator','style-text','test-option-card','type-text','typing-dot','typing-indicator','wizard-step'];

const unused = classes.filter(c => !css.includes(c) && !jsContent.includes(c));
console.log('UNUSED/JUNK CLASSES:');
console.log(unused.join(', '));
