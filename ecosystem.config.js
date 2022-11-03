module.exports = {
  apps: [
    {
      name: "server",
      cwd: "./server",
      script: "./app.js",
      instances: 2,
      out_file: "/logs/pm2.out.log",
      error_file: "/logs/pm2.err.log",
      node_args: ["--max_old_space_size=256"],
      max_memory_restart: '256M',
      max_restarts: '10',
      restart_delay: '3000',
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      },
    },
    {
      name: "admin",
      cwd: './admin/v2',
      script: 'npm',
      args: "start",
      instances: 1,
      out_file: "/logs/pm2.out.log",
      error_file: "/logs/pm2.err.log",
      node_args: ["--max_old_space_size=256"],
      max_memory_restart: '256M',
      max_restarts: '3',
      restart_delay: '3000',
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    },
    {
      name: "chat",
      cwd: "./chat",
      script: "./app.js",
      instances: 1,
      out_file: "/logs/pm2.out.log",
      error_file: "/logs/pm2.err.log",
      node_args: ["--max_old_space_size=128"],
      max_memory_restart: '128M',
      max_restarts: '10',
      restart_delay: '3000',
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    },
  ]
}
