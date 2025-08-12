# Backend Alexa Móvil - API de Cuentos

API REST para una skill de Alexa que maneja usuarios y cuentos. Incluye autenticación básica y gestión de cuentos predefinidos y personalizados.

## Características

- Autenticación con JWT
- Gestión de usuarios (registro/login)
- CRUD de cuentos
- Cuentos predefinidos para todos los usuarios
- Cuentos personalizados por usuario
- Base de datos SQLite con Sequelize

## Instalación

```bash
npm install
```

## Configuración

Copia el archivo `.env` y ajusta las variables según tu entorno:

```
NODE_ENV=development
PORT=3000
JWT_SECRET=tu_clave_secreta_aqui
DB_STORAGE=./database.sqlite
```

## Uso

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión

### Cuentos
- `GET /api/cuentos` - Listar cuentos (predefinidos + del usuario)
- `GET /api/cuentos/:id` - Obtener cuento específico
- `POST /api/cuentos` - Crear cuento personalizado
- `PUT /api/cuentos/:id` - Actualizar cuento personalizado
- `DELETE /api/cuentos/:id` - Eliminar cuento personalizado

## Estructura de datos

### Usuario
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

### Cuento
```json
{
  "titulo": "Título del cuento",
  "contenido": "Contenido del cuento...",
  "esDefault": false
}
```
