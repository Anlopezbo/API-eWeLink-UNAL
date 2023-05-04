const Ewelink = require('ewelink-api');
require('dotenv').config();

class EwelinkApi {
    constructor(region = 'us') {
        this.email = process.env.EWELINK_MAIL;
        this.password = process.env.EWELINK_PASSWORD;
        this.region = region;
        this.connection = new Ewelink({
            email: this.email,
            password: this.password,
            region: this.region,
        });
    }

    async getDevices() {
        const devices = await this.connection.getDevices();
        return devices;
    }

    async toggleDevice(deviceId, state) {
        const status = state ? 'on' : 'off';
        await this.connection.toggleDevice(deviceId, status);
    }

    async getDeviceByDeviceId(id) {
        const devices = await this.getDevices();
        const device = devices.find((d) => d.deviceid === id);
        return device;
    }
}

module.exports = EwelinkApi;
