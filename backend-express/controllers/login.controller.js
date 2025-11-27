const { response } = require('express');
const db = require('../config/db')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const responseJSON = {};

        // Validate data
        if (!email || !password) {
            return res.status(400).json({
                message: "Hubo un error al iniciar sesión",
                error: "Datos incompletos"
            })
        }

        const qr = "SELECT id_user, first_name, password_hash, pfp_file_name as pfp FROM Users LEFT JOIN Workers USING(id_user) WHERE email = ?;";
        const [result] = await db.query(qr, [email])

        if (!result[0]) {
            throw new Error("Correo o contraseña invalidos");
        }
        // console.log('hash:', result[0]);

        let auth = await bcrypt.compare(password, result[0].password_hash)

        if (auth) {
            responseJSON.idUser = result[0]["id_user"]
            responseJSON.firstName = result[0]["first_name"]
            responseJSON.pfp = result[0]["pfp"]
        } else {
            throw new Error("Correo o contraseña invalidos");
        }


        res.status(200).json({
            success: true,
            message: "Login exitoso",
            data: responseJSON
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error al iniciar sesión",
            error: error.message
        })
    }
}

module.exports = {
    login
    // otros metodos
}