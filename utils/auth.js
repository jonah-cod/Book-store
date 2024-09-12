const bcrypt = require("bcrypt");

async function encryptPass(plainPassword){
   return await bcrypt.hash(plainPassword, 8)
    
}

async function decryptPass(plainPassword, encryptedPassword){
    let theSame = await bcrypt.compare(plainPassword, encryptedPassword);
    return theSame
}


module.exports = { encryptPass, decryptPass}