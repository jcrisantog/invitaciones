const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

function fixEnv() {
    if (!fs.existsSync(envPath)) {
        console.log('No se encontró .env.local');
        return;
    }

    let content = fs.readFileSync(envPath, 'utf8');
    
    // Buscar si existe ADMIN_PASSWORD_HASH con símbolos $
    // En Windows/Next.js esto suele causar problemas si no se escapa.
    // La solución es usar la versión HEX que ya implementamos.
    
    if (content.includes('ADMIN_PASSWORD_HASH=$')) {
        console.log('Detectado hash con símbolos $ en .env.local. Se recomienda usar ADMIN_PASSWORD_HASH_HEX.');
        console.log('Asegúrate de ejecutar: node scripts/generate-auth.js TU_CONTRASEÑA');
    }

    console.log('\n--- ESTADO DE .env.local ---');
    const lines = content.split('\n');
    lines.forEach(line => {
        if (line.startsWith('ADMIN_') || line.startsWith('JWT_')) {
            const [key] = line.split('=');
            console.log(`✅ ${key} está presente.`);
        }
    });
}

fixEnv();
