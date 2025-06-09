module.exports = {
  apps: [
    {
      name: 'auth_service',
      script: 'index.js',
      cwd: './services/auth', // Servisin çalışma dizini
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'user_service',
      script: 'index.js',
      cwd: './services/user', // Servisin çalışma dizini
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
      },
    }
  ],
};