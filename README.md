# xiaowen-wechat-miniprogram

版本需求：

```
"node": "18.12.1",
"npm": "8.19.2"
```

安装依赖：

```bash
npm install
```

运行脚本 'dev:weapp' 启动项目。

```
npm run dev:weapp
```

在微信开发者工具中打开该项目，即可看到效果。


> **需要额外修改的地方：**
> 1. src/constant/Urls.ts 中的 BASE_URL 需要修改为自己的后端服务地址。
> 2. 修改 project.private.config.json 中的 setting.urlCheck 为
     false。或者在微信开发者工具中关闭服务端校验域名。
