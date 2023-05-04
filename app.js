const EwelinkApi = require('./app/IL/lib/EwelinkApi');
const GoogleSheetsApi = require('./app/IL/lib/GoogleSheetsApi')
const credentials = require('./credentials.json');

const api = new EwelinkApi();
const sheet = new GoogleSheetsApi(credentials, '1mGeTVjI-gfXdgii3tJL7Yj2EQ7vhW6v0cYeY25SMe8I', 'Datos del sensor!A2:E');

(async () => {
    const devices = await api.getDeviceByDeviceId('10018b5a84');
    const values = [
        devices.deviceid,
        devices.name,
        devices.params.power,
        devices.params.voltage,
        devices.params.current,
        devices.onlineTime
    ];
    
    await sheet.appendValues(values);
})();
