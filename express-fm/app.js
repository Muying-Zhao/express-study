// 可以写结构赋值来替代
// {json}=require("express");
const express = require("express");

const dbUtils = require("./utils");

const app = express();
// 接受客户端发送回来json数据
app.use(express.json());
// 定义一个处理根路径（'/'）的 GET 请求的路由
app.get("/", async function (req, res) {
  try {
    let back = await dbUtils.getDb();
    res.send(back.user);
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.post("/", async (req, res) => {
  let body = req.body;
  if (!body) {
    res.status(403).json({
      error: "缺少用户信息",
    });
  }
  let back = await dbUtils.getDb();
  body.id = back.user[back.user.length - 1].id + 1;
  // console.log(body); // { username: 'xiaomo', age: 20, id: 3 }

  back.user.push(body);
  try {
    // 将接受到的json数据写入
    let w = await dbUtils.serveDb(back);
    if (!w) {
      // 成功状态码
      res.status(200).send({
        msg: "添加成功",
      });
    }
  } catch (error) {
    // 服务器端报错
    res.status(500).json({
      error,
    });
  }
});

app.put("/:id", async (req, res) => {
  try {
    let userInfo = await dbUtils.getDb();
    // 获取修改的id
    let userId = Number.parseInt(req.params.id);
    // 查找db.json对应id的用户信息
    let user = userInfo.user.find((item) => item.id === userId);
    if (!user) {
      res.status(403).json({
        error: "用户不存在",
      });
    }
    // 获取用户修改的全部信息
    const body = req.body;
    user.username = body.username ? body.username : user.username;
    user.age = body.age ? body.age : user.age;
    userInfo.user[userId - 1] = user;

    // 写入
    let writeData = await dbUtils.serveDb(userInfo);
    if (!writeData) {
      res.status(201).json({
        msg: "修改成功",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

app.listen(3000, () => {
  console.log("服务器运行在 http://127.0.0.1:3000");
});
