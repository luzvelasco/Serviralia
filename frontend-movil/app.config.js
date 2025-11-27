import os from 'os';

function getLocalIP() {
    let IPv4List = []
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        if (name == "Wi-Fi") {
            for (const iface of interfaces[name]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    console.log("IPv4 ADDRESS:", iface.address);
                    IPv4List.push(iface.address)
                    // return iface.address;             // e.g. 192.168.1.123
                }
            }
        }
    }
    console.log("IPv4 ADDRESS:", IPv4List[0]);
    return IPv4List[0]
}

export default {
    expo: {
        extra: {
            apiUrl: `http://${getLocalIP()}:3003/`
        }
    }
};
