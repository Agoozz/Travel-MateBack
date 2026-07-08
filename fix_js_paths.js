const fs = require('fs');
const glob = require('fs').readdirSync;
const path = require('path');

const jsFiles = glob('frontend/js').map(f => path.join('frontend/js', f)).filter(f => f.endsWith('.js'));

for (const file of jsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replaceAll('../index.html', 'index.html');
    newContent = newContent.replaceAll('pantallas/iniciar_sesion.html', 'iniciar_sesion.html');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Fixed paths in ${file}`);
    }
}
