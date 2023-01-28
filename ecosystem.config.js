module.exports = {
  apps: [
    {
      name: "inv-nduoseh",
      script: "next start -p 3030",
      error_file: "./logs/error.log",
      log_file: "./logs/log.log",
      time: true,
      autorestart: true,
      exec_mode: "fork",
      max_memory_restart: "512M",
    },
  ],
};
