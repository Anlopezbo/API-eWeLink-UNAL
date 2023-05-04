const { google } = require('googleapis');

class GoogleSheetsApi {
    constructor(credentials ,spreadsheetId, range) {
        this.credentials = credentials;
        this.spreadsheetId = spreadsheetId;
        this.range = range;
        this.authClient = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            ['https://www.googleapis.com/auth/spreadsheets']
        );
        this.sheetsApi = google.sheets({ version: 'v4', auth: this.authClient });
    }

    async appendValues(values) {
        const result = await this.sheetsApi.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: this.range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [values],
            },
        });
        return result.data;
    }
}

module.exports = GoogleSheetsApi;
