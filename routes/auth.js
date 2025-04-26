// routes/auth.routes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación para asegurarse de que los datos estén presentes
    if (!username || !password) {
      return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
    }

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10); // Crear un "sal" para el cifrado
    const hashedPassword = await bcrypt.hash(password, salt); // Cifrar la contraseña

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      password: hashedPassword
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Responder con un mensaje de éxito
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al registrar el usuario.' });
  }
});


// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Verificar que los campos no estén vacíos
      if (!username || !password) {
        return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
      }
  
      // Buscar al usuario en la base de datos
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado.' });
      }
  
      // Comparar la contraseña proporcionada con la contraseña cifrada en la base de datos
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta.' });
      }
  
      // Responder con un mensaje de autenticación satisfactoria
      res.status(200).json({ message: 'Autenticación exitosa.' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error en el inicio de sesión.' });
    }
  });
  

module.exports = router;
