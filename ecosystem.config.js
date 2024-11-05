
module.exports = {
  apps: [
    {
      name: "VRT",                      // Application name
      script: "./backend/dist/index.js",// Start script path
      instances: -1,                     // Number of instances (can be set to "max" to use all CPU cores)
      exec_mode: "cluster",             // Cluster mode for load balancing
      max_memory_restart: "500M",       // Restart the app if memory exceeds 500MB
      log_file: "./logs/app.log",       // Combined log for stdout and stderr
      error_file: "./logs/error.log",   // Error log file
      out_file: "./logs/output.log",    // Standard output log file
      merge_logs: true,                 // Combine logs from all instances into one file
      time: true,                       // Include timestamps in logs
      autorestart: true,                // Automatically restart the app on crash
      restart_delay: 1000,              // Delay between restarts (1 second)
      min_uptime: "60s",                // Minimum uptime before considering the app stable
      instance_var: "INSTANCE_ID",       // Unique identifier for each instance in a cluster
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000, // Ensure the app listens on the Render-provided PORT
      },
    }
  ]
};

