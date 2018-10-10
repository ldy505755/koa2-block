## 特性

1.  基于 Koa2 官方命令行工具 koa2-generator 脚手架搭建
2.  采用 Axios 进行 HTTP 操作
3.  搭载 jQuery 脚本库 和 PureCSS 样式库
4.  搭载 PostCSS 平台 并 装载 PreCSS 可以像 SASS 一样快乐的码样式
5.  搭载 Babel 编译器 可以使用 ES7 规范码脚本
6.  弃用 Pug 模板引擎 采用更倾向于 HTML 的 Nunjucks 模板引擎
7.  采用 BrowserSync 实现项目热更新
8.  采用 PM2 来部署生产环境

### \* 注意

> -   只有 静态资源 [ public ] 目录下的脚本文件 采用 ES7 编码规范
> -   其它 脚本文件都采用 CommonJS 编码规范

## 开发构建

### 目录结构

```bash
├── /bin/              # 服务入口
├── /config/           # 应用配置
├── /controllers/      # 控制器
├── /dist/             # 静态资源(生产)[ 由自动化构建工具 Gulp.js 构建 - 请无视它 ]
├── /middlewares/      # 中间件
├── /public/           # 静态资源(开发)[ 图片 脚本 样式 等静态资源都在这里存放或码代 ]
│ ├── /images          # 图片(使用 gulp-imagemin 压缩)
│ ├── /javascripts     # 脚本(采用 ES7 编码规范, 并使用 gulp-uglify 压缩)
│ └── /stylesheets     # 样式(采用 PreCSS 预处理, 并使用 cssnano 压缩)
├── /routes/           # 路由
├── /utils/            # 工具
├── /views/            # 视图
├── .editorconfig      # 定义代码格式
├── .eslintrc.js       # ES7语法规范配置
├── .gitignore         # git忽略文件
├── app.js             # 应用入口
├── gulpfile.js        # Gulp配置
├── LICENSE            # 版权信息
├── package-lock.json  # 项目依赖包
├── package.json       # 项目依赖包
└── README.md          # 项目文档
```

### 开发流程

Step 1, 新建路由 routes/index.js

```javascript
const compose = require('koa-compose')
const router = require('koa-router')()
const IndexCtrl = require('../controllers/IndexCtrl')

router.get('/', IndexCtrl.index)

module.exports = compose([
  router.routes(),
  router.allowedMethods()
])
```

Step 2, 使用路由 routes/routes.js

```javascript
const compose = require('koa-compose')

module.exports = compose([
  require('./index')
])
```

Step 3, 新建控制器 controllers/IndexCtrl.js

```javascript
const axios = require('../utils/axios')
const config = require('../config')

module.exports = class IndexCtrl {
  // index
  static async index(ctx, next) {
    // axios(url, data, method)
    const res = await axios('/journalismApi')
    const data = {
      layout: `${config.viewsPath}/layout.html`,
      title: 'Hello Koa2 block!',
      tech: res.data.tech
    }
    await ctx.render('index.html', data)
  }
}
```

Step 4, 新建视图 views/index.html

```html
{% extends layout %}

{% block head %}
<link rel="stylesheet" href="/stylesheets/style.css">
{% endblock %}

{% block content %}
<h1>{{ title }}</h1>
<p>Welcome to {{ title }}</p>
<p><img src="/images/IMG_7566.jpg" alt="keyboard"></p>

<h2>科技新闻</h2>
<ul class="tech">
  {% for val in tech %}
  <li>
    <a href="{{ val.link }}" target="_blank">{{ loop.index }}, {{ val.title }}</a>
  </li>
  {% endfor %}
</ul>

<script type="text/javascript" src="/javascripts/script.js"></script>
{% endblock %}
```

Step 5, 请移步到 [ public ] 目录继续码代, 图片 脚本 样式 等静态资源都在这处理

```bash
├── /public/        # 静态资源(开发)
│ ├── /images       # 图片(使用 gulp-imagemin 压缩)
│ ├── /javascripts  # 脚本(采用 ES7 编码规范, 并使用 gulp-uglify 压缩)
│ └── /stylesheets  # 样式(采用 PreCSS 预处理, 并使用 cssnano 压缩)
```

### 快速开始

Step 1, 安装依赖:

```bash
# 安装依赖
yarn
# 或
npm i
```

Step 2, 开发:

```bash
# 启动开发环境 http://localhost:8080/
npm start
# 或
npm run dev
```

Step 3, 部署:

```bash
# 部署生产环境
npm run prd
```
