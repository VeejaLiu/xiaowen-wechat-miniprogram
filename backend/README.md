# xiaowen-backend

# 1 快速开始

## 1.1 安装node和npm

【推荐】使用特定版本的node和npm，以避免不必要的错误。

```
"node": "18.20.3",
"npm": "10.7.0"
```

## 1.2 配置环境变量

将`.env.test`复制到`.env`，并修改`.env`中的变量值。

请确保你可以访问`.env`中的所有资源。

env列表：
> APP_XXX: 应用相关配置 \
> LOG_XXX: 日志相关配置 \
> MONITOR_XXX: 监控相关配置 \
> MYSQL_XXX: mysql相关配置 \
> MINIO_XXX: minio相关配置 \
> BAIDU_TRANSLATION_XXX: 百度翻译相关配置 \
> WECHAT_MINI_PROGRAM_XXX: 微信小程序相关配置 \
> SECRET_JWT: jwt密钥 \

## 1.3 安装依赖

```
npm i

```

## 1.4 启动项目

```
npm run start
```

PM2启动项目:

```
pm2 start npm --name "xiaowen-backend" -- run start
```