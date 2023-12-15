const express = require('express');
const cors = require('cors');
const db = require('./database/database');
const userRoutes = require('./routes/userRoutes');
const depaRoutes = require('./routes/departamentoRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
// const creditoRoutes = require('./app/routes/creditosRoutes');
// const empleadoRoutes = require('./app/routes/empleadoRoutes');
// const usuarioRoutes = require('./app/routes/usuarioRoutes');

const User = require('./app/models/User');
const Departamento = require('./app/models/Departamentos');
const Alumno = require('./app/models/Alumno');
// const Credito = require('./app/models/credito');
// const Empleado = require('./app/models/empleado');
// const Usuario = require('./app/models/usuario');

const app = express();
const PORT = 8082;

app.use(express.json());
app.use(cors());

db.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida correctamente.'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error));

User.sync();
Departamento.sync();
Alumno.sync();
// Credito.sync();
// Empleado.sync();
// Usuario.sync();

app.use('/api/usuarios', userRoutes);  // Agregué una barra diagonal al inicio de la ruta
app.use('/api/departamentos', depaRoutes);  // Agregué una barra diagonal al inicio de la ruta
app.use('/api/alumnos', alumnoRoutes);  // Agregué una barra diagonal al inicio de la ruta
// app.use('/api/empleados', empleadoRoutes);  // Agregué una barra diagonal al inicio de la ruta
// app.use('/api/usuarios', usuarioRoutes);  // Agregué una barra diagonal al inicio de la ruta

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
