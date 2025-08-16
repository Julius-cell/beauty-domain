export const environment = {
  production: false,
  googleCalendar: {
    clientId: 'TU_CLIENT_ID.apps.googleusercontent.com',
    apiKey: 'TU_API_KEY', // Opcional para requests públicos
    scopes: 'https://www.googleapis.com/auth/calendar',
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ],
  },
};
