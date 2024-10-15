## 一、Express 框架介绍

1. Express 是什么

[Express 基于 Node.js 平台，快速、开放、极简的 Web 开发框架](https://www.expressjs.com.cn/)

2. Express 有哪些特性

- 上手简单，学习门槛低
- 具有丰富的基础 API 支持
- 强大的路由功能
- 灵活的中间件机制及丰富的第三方中间支持
- 性能接近原生 Node
- 安全稳定，代码测试覆盖率进百分之百

3. Express 适合做什么

- 传统的 web 网站
- api 接口服务器
- 服务端渲染的中间层
- 开发辅助工具
- 自定义集成框架

## 二、Express 项目构建

1. 安装 express 框架代码模版

新建 express-g 项目

```bash
npx express-generator
npm i
```

2. 使用自定义的脚手架模版

新建 express-cli 文件夹

```bash
bincli create temp
```

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241012/1728739998548305660.png)

## 三、Express 框架基本使用

1. 新建项目`express-fm`,打开终端

```bash
npm init -y
npm i express
```

2. 新建`app.js`

```js
const express = require("express");
const fs = require("fs");
const app = express();
// 定义一个处理根路径（'/'）的 GET 请求的路由
app.get("/", function (req, res) {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (!err) {
      var back = JSON.parse(data);
      res.send(back.user);
    } else {
      res.status(500).json({ err });
    }
  });
});
// app.post();

app.listen(3000, () => {
  console.log("服务器运行在 http://127.0.0.1:3000");
});
```

3. 引入管理用户数据信息`da.json`

```json
{
  "user": [
    {
      "id": 1,
      "username": "沐沐",
      "age": 18
    },
    {
      "id": 2,
      "username": "小汐",
      "age": 18
    }
  ],
  "video": []
}
```

4. 打开终端执行`nodemon app js`

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728789033701339480.png)

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728789060429757754.png)

5. 修改`app.js`,使用 promisify 将回调函数转成 promise 方式

```js
const express = require("express");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const app = express();
// 定义一个处理根路径（'/'）的 GET 请求的路由
app.get("/", async function (req, res) {
  try {
    let back = await readFile("./db.json", "utf8");
    const Obj = JSON.parse(back);
    res.send(Obj.user);
  } catch (error) {
    res.status(500).json({ error });
  }
});
// app.post();

app.listen(3000, () => {
  console.log("服务器运行在 http://127.0.0.1:3000");
});
```

## 四、使用 Postman 工具

[postman 官网](https://www.postman.com/)

1. 什么是 postman
   Postman 是一个流行的 API 开发工具，帮助开发者和测试人员更高效地进行 API 开发和测试。根据系统下载不同版本，然后登录注册账号。

|      功能      |                                        作用                                        |
| :------------: | :--------------------------------------------------------------------------------: |
|    API 测试    | 可以轻松发送请求（如 GET、POST、PUT、DELETE），查看响应并验证 API 是否按预期工作。 |
| 用户友好的界面 |        Postman 提供了直观的图形用户界面，使得 API 调用和调试变得简单易懂。         |
|    环境管理    |        可以创建多个环境（如开发、测试、生产），便于在不同的环境中测试 API。        |
|    请求集合    |                     可以将多个请求组织到集合中，便于管理和分享                     |
|   自动化测试   |                 支持编写测试脚本，通过测试用例自动验证 API 响应。                  |
|    文档生成    |                    可以自动生成 API 文档，方便团队共享和参考。                     |
|    团队协作    |          支持团队协作功能，可以分享请求、集合和文档，提高团队的工作效率。          |
|      监控      |                       可以设置定期监控 API 的可用性和性能。                        |

2. new request 一个新请求

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728789770859507634.png)

输入 url 和请求发放，点击发送查看响应并验证 API 是否按预期工作。

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728789944691491045.png)

3. 点击 save 保存请求

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728790769424590707.png)

## 五、处理客户端 Post 请求数据

### 1、urlencoded 传送数据接收方式

1. 修改`app.js`,接收并处理 post 请求

```js
const express = require("express");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const app = express();
// 接受客户端发送回来urlencoded数据
app.use(express.urlencoded());
// 定义一个处理根路径（'/'）的 GET 请求的路由
app.get("/", async function (req, res) {
  try {
    let back = await readFile("./db.json", "utf8");
    const Obj = JSON.parse(back);
    res.send(Obj.user);
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.post("/", async (req, res) => {
  console.log(req.headers);
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("服务器运行在 http://127.0.0.1:3000");
});
```

2. 打开终端执行

```bash
nodemon app js
```

3. 选择`POST`请求，`Body`,`X-www-form-urlended`写入`username：xiaobai`和`age：20`，然后发送请求

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728791615794724100.png)

4. 查看接收到的 post 请求结果

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728791798196722957.png)

### 2、JSON 传送数据接收方式

1. 修改`app.js`,接收并处理 post 请求

```js
const express = require("express");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const app = express();
// 接受客户端发送回来json数据
app.use(express.json());
// 定义一个处理根路径（'/'）的 GET 请求的路由
app.get("/", async function (req, res) {
  try {
    let back = await readFile("./db.json", "utf8");
    const Obj = JSON.parse(back);
    res.send(Obj.user);
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.post("/", async (req, res) => {
  console.log(req.headers);
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("服务器运行在 http://127.0.0.1:3000");
});
```

2. 打开终端运行

```bash
nodemon app js
```

3. 选择`POST`请求，`Body`,`raw`和`JSON`写入`username：xiaomo`和`age：20`，然后发送请求

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728792306207899916.png)

4. 查看接收到的 post 请求结果

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241013/1728792405130684016.png)

### 3、添加用户信息到 db 文件

1. 将`app.js`代码优化，新建`utils.js`

```js
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

exports.getDb = async () => {
  let res = await readFile("./db.json", "utf8");
  return JSON.parse(res);
};

exports.serveDb = async (data) => {
  let res = JSON.stringify(data);
  return await writeFile("./db.json", res);
};
```

2. 修改`app.js`

```js
// 可以写结构赋值来替代
// {json}=require("express");
const express = require("express");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

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

app.listen(3000, () => {
  console.log("服务器运行在 http://127.0.0.1:3000");
});
```

3. 打开终端运行`nodemon app js`

```bash
nodemon app js
```

4. 在 postman 中 send 一个 json 数据

```json
{
  "username": "xiaofeo",
  "age": 20
}
```

### 4、修改用户信息

1. 修改`app.js`,处理 put 请求

```js
// 可以写结构赋值来替代
// {json}=require("express");
const express = require("express");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

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
```

2. 打开终端运行

```bash
nodemon app js
```

3. 选择`PUT`请求，`Body`,`raw`和`JSON`写入`username：xiaomo`和`age：18`，然后发送请求

![image.png](https://bbs-img.huaweicloud.com/blogs/img/20241015/1728958739022556084.png)
