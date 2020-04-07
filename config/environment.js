const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'conneqtion_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'kashishsinghlive@gmail.com',
            pass: 'fxisvvthvhxstsfd'
        }
    },
    google_client_id: "430909875612-29b4eulntcpmpji7a69ideehe5sg5ag7.apps.googleusercontent.com",
    google_client_secret: "JpqCPVOz1kt4oJY1hOkKJKv-",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "conneqtion",
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
}


const newLocal = process.env.CONNEQTION_JWT_SECRET;
const production = {
    name: 'production',
    asset_path: process.env.CONNEQTION_ASSET_PATH,
    session_cookie_key: process.env.CONNEQTION_SESSION_COOKIE_KEY,
    db: process.env.CONNEQION_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CONNEQTION_GMAIL_USERNAME,
            pass: process.env.CONNEQTION_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CONNEQTION_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CONNEQTION_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CONNEQTION_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CONNEQTION_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}



module.exports = eval(process.env.CONNEQTION_ENVIRONMENT) == undefined ? development : eval(process.env.CONNEQTION_ENVIRONMENT);