export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:4500',
  geminiApiKey: 'AIzaSyCefTA1BsNhDo1JvMZmVKWetRmO9lWFEZk', // Clave de API de Gemini
  geminiBaseUrl: 'https://generativelanguage.googleapis.com/v1beta/', // URL base de la API de Gemini
  geminiModelEndpoint: 'models/gemini-1.5-flash-latest:generateContent', // Endpoint específico
  geminiTimeout: 30000 // Tiempo de espera en milisegundos
};
