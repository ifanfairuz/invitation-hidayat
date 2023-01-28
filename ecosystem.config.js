module.exports = {
  apps: [
    {
      name: "inv-nduoseh",
      script: "node_modules/next/dist/bin/next",
      args: 'start -p 3030',
      watch: false,
      error_file: "./logs/error.log",
      log_file: "./logs/log.log",
      time: true,
      autorestart: true,
      exec_mode: "fork",
      max_memory_restart: "512M",
    },
  ],
};
