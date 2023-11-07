import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import blogRouter from './routes/blogRoutes.js';

// Conexion con la DB
import './database/database.js';

// 1. Iniciar la aplicación
const app = express();

// 2. Configuraciones generales
const PORT = process.env.PORT || 5000;

// 3. Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// 4. Rutas
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blogs', blogRouter);

// 5. Iniciar el loop del servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
