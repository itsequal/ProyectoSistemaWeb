
const bcrypt = require('bcryptjs');
const encrypt = {};

encrypt.encryptPassword = async (contraseña) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña,salt);
    return hash;
};

encrypt.matchPassword = async (contraseña, bdcontraseña) => {
   try {
    return await bcrypt.compare(contraseña, bdcontraseña);
   } catch (error) {
       console.log(error);
   }
};

module.exports=encrypt;