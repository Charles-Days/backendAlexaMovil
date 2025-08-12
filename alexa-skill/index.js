const Alexa = require('ask-sdk-core');
const axios = require('axios');

// Configuración de la API
const API_BASE_URL = 'https://0c798da609b4.ngrok-free.app/api';

// Headers para evitar problemas con ngrok
const API_HEADERS = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true'
};

// Usuario demo para simplificar
const DEMO_USER = {
  email: 'demo@alexa.com',
  password: 'alexa123',
  name: 'Usuario Demo',
  age: '25',
  nickname: 'Demo'
};

// Función helper para hacer llamadas a la API
async function callAPI(endpoint, method = 'GET', data = null, token = null) {
  try {
    const headers = { ...API_HEADERS };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers,
      timeout: 8000
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error en API:', error.message);
    throw error;
  }
}

// Función para obtener token automáticamente
async function getAuthToken() {
  try {
    // Intentar login primero
    const response = await callAPI('/auth/login', 'POST', DEMO_USER);
    return response.token;
  } catch (error) {
    // Si falla el login, registrar usuario
    try {
      const registerResponse = await callAPI('/auth/register', 'POST', DEMO_USER);
      return registerResponse.token;
    } catch (registerError) {
      throw new Error('No se pudo autenticar');
    }
  }
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
    try {
      // Autenticar automáticamente
      const token = await getAuthToken();
      
      // Obtener historias disponibles
      const storiesResponse = await callAPI('/stories', 'GET', null, token);
      const stories = storiesResponse.stories || [];

      if (stories.length === 0) {
        return handlerInput.responseBuilder
          .speak('¡Hola! Bienvenido a Cuentacuentos Colaborativo. No hay historias disponibles en este momento.')
          .getResponse();
      }

      // Seleccionar historia aleatoria
      const randomStory = stories[Math.floor(Math.random() * stories.length)];
      
      // Iniciar la historia automáticamente
      const startResponse = await callAPI('/stories/start', 'POST', 
        { storyId: randomStory.id }, token);

      const sessionAttributes = {
        token: token,
        sessionId: startResponse.session.id,
        currentDecision: startResponse.session.currentDecision,
        storyTitle: randomStory.title
      };
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

      const decision = startResponse.session.currentDecision;
      const opciones = decision.options.map((opt, index) => `opción ${index + 1}: ${opt.text}`).join(', ');
      
      const speechText = `¡Hola! Bienvenido a Cuentacuentos Colaborativo. Te voy a contar "${randomStory.title}". ${randomStory.description}. ${decision.text} Tienes estas opciones: ${opciones}. ¿Cuál eliges?`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt('¿Qué opción eliges? Puedes decir: opción 1, opción 2, etc.')
        .getResponse();

    } catch (error) {
      console.error('Error en Launch:', error);
      return handlerInput.responseBuilder
        .speak('¡Hola! Bienvenido a Cuentacuentos Colaborativo. Hubo un problema al cargar las historias. Por favor inténtalo de nuevo.')
        .getResponse();
    }
  }
};

const IniciarHistoriaIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getIntentName(handlerInput.requestEnvelope) === 'IniciarHistoriaIntent';
  },
  async handle(handlerInput) {
    try {
      // Autenticar automáticamente
      const token = await getAuthToken();
      
      // Obtener historias disponibles
      const storiesResponse = await callAPI('/stories', 'GET', null, token);
      const stories = storiesResponse.stories || [];

      if (stories.length === 0) {
        return handlerInput.responseBuilder
          .speak('No hay historias disponibles en este momento.')
          .getResponse();
      }

      // Seleccionar historia aleatoria
      const randomStory = stories[Math.floor(Math.random() * stories.length)];
      
      // Iniciar la historia automáticamente
      const startResponse = await callAPI('/stories/start', 'POST', 
        { storyId: randomStory.id }, token);

      const sessionAttributes = {
        token: token,
        sessionId: startResponse.session.id,
        currentDecision: startResponse.session.currentDecision,
        storyTitle: randomStory.title
      };
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

      const decision = startResponse.session.currentDecision;
      const opciones = decision.options.map((opt, index) => `opción ${index + 1}: ${opt.text}`).join(', ');
      
      const speechText = `¡Perfecto! Te voy a contar "${randomStory.title}". ${decision.text} Tienes estas opciones: ${opciones}. ¿Cuál eliges?`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt('¿Qué opción eliges? Puedes decir: opción 1, opción 2, etc.')
        .getResponse();

    } catch (error) {
      return handlerInput.responseBuilder
        .speak('Hubo un problema al cargar una nueva historia. Por favor inténtalo de nuevo.')
        .reprompt('Puedes decir: quiero comenzar una historia.')
        .getResponse();
    }
  }
};

const DecisionIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getIntentName(handlerInput.requestEnvelope) === 'DecisionIntent';
  },
  async handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const opcionTexto = Alexa.getSlotValue(handlerInput.requestEnvelope, 'opcion');

    if (!sessionAttributes.sessionId || !sessionAttributes.currentDecision) {
      return handlerInput.responseBuilder
        .speak('Primero necesitas comenzar una historia. Puedes decir: quiero comenzar una historia.')
        .reprompt('Puedes decir: quiero comenzar una historia.')
        .getResponse();
    }

    try {
      const currentDecision = sessionAttributes.currentDecision;
      let opcionElegida = null;

      // Buscar por número de opción (opción 1, opción 2, etc.)
      const numeroMatch = opcionTexto.match(/(\d+)/);
      if (numeroMatch) {
        const numero = parseInt(numeroMatch[1]) - 1; // Convertir a índice (0-based)
        if (numero >= 0 && numero < currentDecision.options.length) {
          opcionElegida = currentDecision.options[numero];
        }
      }

      // Si no encontró por número, buscar por texto similar
      if (!opcionElegida) {
        opcionElegida = currentDecision.options.find(opt => 
          opt.text.toLowerCase().includes(opcionTexto.toLowerCase()) ||
          opcionTexto.toLowerCase().includes(opt.text.toLowerCase().split(' ')[0])
        );
      }

      if (!opcionElegida) {
        const opciones = currentDecision.options.map((opt, index) => `opción ${index + 1}: ${opt.text}`).join(', ');
        return handlerInput.responseBuilder
          .speak(`No entendí esa opción. Puedes elegir: ${opciones}`)
          .reprompt('¿Qué opción eliges?')
          .getResponse();
      }

      // Enviar la decisión a la API
      const choiceResponse = await callAPI('/stories/choice', 'POST', {
        sessionId: sessionAttributes.sessionId,
        optionId: opcionElegida.id
      }, sessionAttributes.token);

      if (choiceResponse.storyFinished) {
        const speechText = `${choiceResponse.ending} ¡La historia ha terminado! ¿Quieres escuchar otra historia?`;
        
        // Limpiar la sesión
        delete sessionAttributes.sessionId;
        delete sessionAttributes.currentDecision;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt('Puedes decir: quiero comenzar una historia.')
          .getResponse();
      }

      if (choiceResponse.nextDecision) {
        sessionAttributes.currentDecision = choiceResponse.nextDecision;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const opciones = choiceResponse.nextDecision.options.map((opt, index) => `opción ${index + 1}: ${opt.text}`).join(', ');
        const speechText = `${choiceResponse.nextDecision.text} Tienes estas opciones: ${opciones}. ¿Cuál eliges?`;
        
        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt('¿Qué opción eliges?')
          .getResponse();
      }

    } catch (error) {
      console.error('Error en decisión:', error);
      return handlerInput.responseBuilder
        .speak('Hubo un problema al procesar tu decisión. ¿Podrías intentar de nuevo?')
        .reprompt('¿Qué opción eliges?')
        .getResponse();
    }
  }
};

const GuardarHistoriaIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getIntentName(handlerInput.requestEnvelope) === 'GuardarHistoriaIntent';
  },
  handle(handlerInput) {
    const speechText = 'Las historias se guardan automáticamente en tu cuenta. ¿Quieres comenzar una nueva historia?';
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('Puedes decir: quiero comenzar una historia.')
      .getResponse();
  }
};

const EscucharHistoriaGuardadaIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getIntentName(handlerInput.requestEnvelope) === 'EscucharHistoriaGuardadaIntent';
  },
  handle(handlerInput) {
    const speechText = 'Cada vez que abres Cuentacuentos te doy una historia nueva y emocionante. ¿Quieres comenzar una historia ahora?';
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('Puedes decir: quiero comenzar una historia.')
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Puedes registrarte, iniciar sesión, ver historias disponibles, comenzar historias interactivas y tomar decisiones. ¿Qué quieres hacer?';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('¿Qué quieres hacer?')
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    return intentName === 'AMAZON.CancelIntent' || intentName === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Gracias por usar Cuentacuentos Colaborativo. ¡Hasta la próxima aventura!')
      .getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('No entendí eso. Puedes decir: ayuda, o mostrar historias disponibles.')
      .reprompt('¿Qué quieres hacer?')
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error('Error:', error);
    return handlerInput.responseBuilder
      .speak('Hubo un problema. ¿Podrías intentar de nuevo?')
      .reprompt('¿Qué quieres hacer?')
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    IniciarHistoriaIntentHandler,
    DecisionIntentHandler,
    GuardarHistoriaIntentHandler,
    EscucharHistoriaGuardadaIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();