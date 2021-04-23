## 数据库初始化
1. 创建一个数据库
2. 使用`sequelize cli` 初始化项目, 数据库配置信息
    `npx sequelize-cli init`
3. 生成模型文件
   1. migrate文件
   2. model文件
   `npx sequelize-cli model:generate --name Todo --attributes name:string,deadline:date,content:string`
4. 持久化, 模型对应的数据库表
   `npx sequelize-cli db:migrate`


##  运维和发布
PM2

启动命令/运维命令/运维文档

1. pm2 start ecosystem.config.js
2. pm2 log
3. pm2 restart ecosystem.config.js


## 总结

### 技术栈回顾
1. node => http, 异常
2. web框架, express, hapi, koa, egg
3. 参数校验valid
4. mysql 的使用, 了解
5. ORM框架学习, sequelize

### 技术关键点

api
流程: web => web服务 => router => handle => orm => db
并发, 数据库锁

### 注意事项
 1. 需要做详细的模型设计 => 模型之间的关系(一对一, 一对多, 多对多)
 2. api使用文档, api文档的使用工具
 3. 测试# node-express-demo-
