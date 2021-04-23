module.exports = {
  apps : [{
    name:'todo_api',
    script: 'src/app.js',
    watch: false,
    instances:1,
    autorestart:true,
    max_memory_restart: '1G'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

};
