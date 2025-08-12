import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { sequelize } from './index.js';
import { seedDefaultCuentos } from './seeders/defaultCuentos.js';
import authRoutes from './routes/auth.js';
import cuentosRoutes from './routes/cuentos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cuentos', cuentosRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Cuentos para Alexa funcionando' });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos.');
    
    await seedDefaultCuentos();
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();