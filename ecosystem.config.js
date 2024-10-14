module.exports = {
  apps: [
    {
      "name": "VRT",                    // Application name
      "script": "node ./backend/dist/index.js",// Command to start the app (can be "index.js" or any other script)
      "instances": 2,              // Automatically scale to maximum available CPU cores
      "exec_mode": "cluster",          // Cluster mode for load balancing across multiple CPU cores
      "max_memory_restart": "500M",    // Restart the app if it exceeds 500MB of memory usage
      "log_file": "./logs/app.log",    // Combined log file for both stdout and stderr
      "error_file": "./logs/error.log",// Error log file
      "out_file": "./logs/output.log", // Output log file
      "merge_logs": true,              // Combine logs from different instances into a single file
      "time": true,                    // Append timestamps to log entries
      "autorestart": true,             // Automatically restart the app if it crashes
      "restart_delay": 1000,           // Delay between restarts (in milliseconds)
      "min_uptime": "60s",             // Minimum uptime to consider the app stable
      "instance_var": "INSTANCE_ID"    // A unique ID for each instance when using clusters
    }
  ]
}
