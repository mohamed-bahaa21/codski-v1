module.exports = {
    apps: [{
        name: "server",
        script: "./app.js",
        watch: true,
        out_file: "./logs/pm2.out.log",
        error_file: "./logs/pm2.err.log",
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}
