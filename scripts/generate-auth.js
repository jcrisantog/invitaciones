const bcrypt = require('bcryptjs');
const crypto = require('crypto');

async function generate() {
    const password = process.argv[2] || 'cambiame123';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Convertir el hash a Hexadecimal para evitar problemas con símbolos $ en el shell
    const hashHex = Buffer.from(hash).toString('hex');
    const secret = crypto.randomBytes(32).toString('hex');

    console.log('\n--- CREDENCIALES SEGURAS ---');
    console.log('Username: admin (puedes cambiarlo)');
    console.log('Password original:', password);
    console.log('\n--- COPIA ESTO A TU .env.local ---');
    console.log(`ADMIN_USERNAME=admin`);
    console.log(`ADMIN_PASSWORD_HASH_HEX=${hashHex}`);
    console.log(`JWT_SECRET=${secret}`);
    console.log('\n--- NOTA: He cambiado ADMIN_PASSWORD_HASH por ADMIN_PASSWORD_HASH_HEX ---');
    console.log('--- para máxima compatibilidad con Windows/Next.js ---');
    console.log('----------------------------\n');
}

generate();
