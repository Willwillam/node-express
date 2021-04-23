const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const models = require("../db/models");
const { sequelize, Sequelize } = require("../db/models");

// {
//     [model: Todo],
//     sequelize,
//     Sequelize
// }

// 处理post参数
app.use(express.json());

app.use(express.urlencoded());

// app.use(bodyParser.urlencoded({ extended: true }));

// 1. 查询列表
app.get("/list/:status/:page", async (req, res) => {
    // 1. 状态 1: 待办 2. 完成 3. 删除 -1:全部
    // 2. 分页处理
    let {status, page} = req.params
    let limit = 10;
    let offset = (page-1) * limit;
    let where ={};
    if(status!=-1){
        where.status = status
    }
   let list =  await models.Todo.findAndCountAll({
        where,
        offset
    })
  res.json({
      list,
      message:'列表查询成功'
  });
});

// 2. 新增一个todo
app.post("/create", async (req, res, next) => {
  try {
    let { name, deadline, content } = req.body;
    let todo = await models.Todo.create({
      name,
      deadline,
      content,
    });
    res.json({
      todo,
    });
  } catch (error) {
    next(error);
  }
});

// 3. 修改一个todo
app.post("/update", async (req, res) => {
  try {
    let { name, deadline, content, id } = req.body;
    let todo = await models.Todo.findOne({
      where: {
        id,
      },
    });
    if (todo) {
      // 执行更新功能
      todo = await todo.update({
        name,
        deadline,
        content,
      });
    }
    res.json({
      todo,
    });
  } catch (error) {
    next(error);
  }
});

// 4. 删除一个任务/ 修改一个任务状态
app.post("/update_status", async (req, res) => {
  try {
    let { id, status } = req.body;
    let todo = await models.Todo.findOne({
      where: {
        id,
      },
    });
    if (todo && todo.status != status) {
      todo = await todo.update({
        status,
      });
    }
    res.json({
      todo,
    });
  } catch (error) {
    next(error);
  }
});

// 所有的错误处理, http, status
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
app.listen(3005, () => {
  console.log("服务启动成功");
});
