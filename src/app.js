import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { sequelize } from './index.js';
import { seedDefaultCuentos } from './seeders/defaultCuentos.js';
import { seedDefaultStories } from './seeders/defaultStories.js';
import authRoutes from './routes/auth.js';
import cuentosRoutes from './routes/cuentos.js';
import storiesRoutes from './routes/stories.js';
import unifiedStoriesRoutes from './routes/unifiedStories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cuentos', cuentosRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/unified-stories', unifiedStoriesRoutes);

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
    await seedDefaultStories();
    
    app.listen(3003, '0.0.0.0', () => {
      console.log('Servidor corriendo en puerto 3003');
    });    
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();