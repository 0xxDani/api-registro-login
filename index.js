// index.js

// 1. Importamos los paquetes necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Para usar variables del archivo .env

// 2. Inicializamos la app
const app = express();

// 3. Middlewares
app.use(cors()); // Permite peticiones desde otras apps (como Postman)
app.use(express.json()); // Permite recibir datos en formato JSON

// 4. Rutas de la API de autenticación
const authRoutes = require('./routes/auth'); // Verifica que el nombre del archivo sea correcto
app.use('/api/auth', authRoutes); // Usa el prefijo /api/auth para todas las rutas en auth.routes.js

// 5. Servir los archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 6. Rutas para las páginas de registro y login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Página principal de login
});

// 7. Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// 8. Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
