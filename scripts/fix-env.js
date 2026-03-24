const bcrypt = require('bcryptjs');
const fs = require('fs');

async function fixEnv() {
    const password = 'DameMiAguinaldo01';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const hashHex = Buffer.from(hash).toString('hex');
    const secret = require('crypto').randomBytes(32).toString('hex');

    let content = fs.readFileSync('.env.local', 'utf8');
    
    // Actualizar Username
    content = content.replace(/ADMIN_USERNAME=.*/, "ADMIN_USERNAME='jcrisantogAdmin'");
    
    // Agregar o actualizar HASH_HEX
    if (content.includes('ADMIN_PASSWORD_HASH_HEX')) {
        content = content.replace(/ADMIN_PASSWORD_HASH_HEX=.*/, `ADMIN_PASSWORD_HASH_HEX='${hashHex}'`);
    } else {
        content += `\nADMIN_PASSWORD_HASH_HEX='${hashHex}'`;
    }
    
    // Eliminar el HASH viejo para evitar confusiones
    content = content.replace(/ADMIN_PASSWORD_HASH=.*\n?/, '');
    
    // Actualizar Secret
    content = content.replace(/JWT_SECRET=.*/, `JWT_SECRET='${secret}'`);

    fs.writeFileSync('.env.local', content);
    console.log('✅ .env.local actualizado con éxito con formato HEX.');
}

fixEnv();
