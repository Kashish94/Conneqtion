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
}


const production = {
    name: 'production'
}



module.exports = development;