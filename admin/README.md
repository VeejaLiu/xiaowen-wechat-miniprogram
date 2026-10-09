# 小纹 AI 管理前端

本模块从 `xiaowen-BMC` 合并到统一仓库的 `admin/` 子目录，使用 React 18、Vite 和 Ant Design。

## 开发

在 `admin/` 目录中执行：

```bash
npm ci
npm run dev
```

修改 [`src/service/config.ts`](./src/service/config.ts) 中的 `backendUrl`，指向自己的业务后端。

## 构建

```bash
npm run build
npm run preview
```

构建输出位于 `admin/dist/`。也可在仓库根目录执行 `npm run dev:admin`、`npm run build:admin` 和 `npm run preview:admin`。

项目总览见 [根目录 README](../README.md)，业务后端见 [backend/](../backend/)。
