const msalConfig = {
    auth: {
        clientId: 'e1cda4f7-1bd6-4f91-8959-5cad3e656b25',
        redirectUri: 'http://localhost:8080'
    }
};

const msalRequest = {
    scopes: [
        'user.read',
        'mailboxsettings.read',
        'calendars.readwrite'
    ]
}