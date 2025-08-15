# API Unificada de Historias

Esta API unifica los cuentos lineales y las historias interactivas en un formato consistente para el frontend.

## Endpoints

### 1. Obtener todas las historias unificadas

```
GET /api/unified-stories
```

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "message": "Historias unificadas obtenidas exitosamente",
  "stories": [
    {
      "id": "cuento_1",
      "title": "El León y el Ratón",
      "image": "https://placehold.co/600x360/FFB6C1/FFFFFF?text=León+y+Ratón&font=montserrat",
      "description": "Una historia sobre la amistad y la ayuda mutua",
      "duration": "3 min",
      "category": "Fábulas",
      "storyKey": "leon_raton",
      "type": "cuento",
      "originalId": 1
    },
    {
      "id": "story_1",
      "title": "El Bosque Brillante",
      "image": "files/bosque-brillante.png", 
      "description": "Te despiertas en un bosque brillante...",
      "duration": "6 min",
      "category": "Aventuras Interactivas",
      "storyKey": "bosque_brillante",
      "type": "story",
      "originalId": 1
    }
  ]
}
```

### 2. Obtener StoryGraph por storyKey

```
GET /api/unified-stories/graph/:storyKey
```

**Parámetros:**
- `storyKey`: Clave única de la historia (ej: "leon_raton")

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta para historia interactiva:**
```json
{
  "message": "StoryGraph obtenido exitosamente",
  "storyKey": "leon_raton",
  "type": "interactive",
  "graph": {
    "start": {
      "id": "start",
      "content": "Un león dormía plácidamente bajo un gran árbol. De pronto, un pequeño ratón corre por su cuerpo y lo despierta.",
      "choices": [
        { "text": "Atrapar al ratón", "nextId": "catchMouse" },
        { "text": "Dejarlo escapar", "nextId": "letGo" }
      ]
    },
    "catchMouse": {
      "id": "catchMouse",
      "content": "El león atrapa al ratón con su gran garra...",
      "choices": [
        { "text": "Perdonarlo", "nextId": "letGo" },
        { "text": "Comérselo", "nextId": "finalEat" }
      ]
    },
    // ... más nodos
  },
  "metadata": {
    "title": "El León y el Ratón",
    "image": "https://placehold.co/600x360/FFB6C1/FFFFFF",
    "duration": "3 min",
    "category": "Fábulas"
  }
}
```

**Respuesta para cuento lineal:**
```json
{
  "message": "StoryGraph obtenido exitosamente", 
  "storyKey": "caperucita_roja",
  "type": "cuento",
  "graph": {
    "start": {
      "id": "start",
      "content": "Caperucita Roja iba por el bosque a llevar comida a su abuelita cuando se encontró con el lobo..."
    }
  },
  "metadata": {
    "title": "Caperucita Roja",
    "image": "files/caperucita-roja.png",
    "duration": "5 min", 
    "category": "Cuentos Clásicos"
  }
}
```

## Uso en el Frontend

### 1. Obtener y mostrar lista de historias

```javascript
// Obtener todas las historias
const response = await fetch('/api/unified-stories', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
const stories = data.stories;

// Usar como el array que ya tienes
stories.forEach(story => {
  console.log(story.title, story.storyKey);
});
```

### 2. Obtener StoryGraph para iniciar historia

```javascript
// Al hacer clic en una historia
const startStory = async (storyKey) => {
  const response = await fetch(`/api/unified-stories/graph/${storyKey}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  const storyGraph = data.graph;
  
  // Usar el storyGraph con tu StoryPlayer
  return storyGraph;
};

// Ejemplo de uso
const leonRatonGraph = await startStory('leon_raton');
// leonRatonGraph tiene la misma estructura que tu objeto leonRaton
```

## Tipos de Historias

### Interactive (Predefinidas)
- `leon_raton`: El León y el Ratón con decisiones
- `tortuga_liebre`: La Tortuga y la Liebre con múltiples finales
- `tres_cerditos`: Los Tres Cerditos con decisiones

### Cuento (Lineales)
- `caperucita_roja`: Caperucita Roja (solo lectura)
- `patito_feo`: El Patito Feo (solo lectura)
- `hormiga_cigarra`: La Hormiga y la Cigarra (solo lectura)

### Story (De base de datos)
- `bosque_brillante`: El Bosque Brillante (interactiva BD)
- `isla_misteriosa`: La Isla Misteriosa (interactiva BD)

## Migración del Frontend

### Antes:
```javascript
const stories = [
  {
    id: 1,
    title: "El León y el Ratón",
    storyKey: "leon_raton"
  }
];

// Objeto hardcodeado
import { leonRaton } from './storyGraphs/leonRaton.js';
```

### Ahora:
```javascript
// Obtener dinámicamente
const stories = await fetchUnifiedStories();

// Obtener StoryGraph dinámicamente  
const storyGraph = await fetchStoryGraph(story.storyKey);
```

Este enfoque unifica ambos sistemas y permite que tu frontend maneje todas las historias de manera consistente.