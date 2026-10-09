# 仓库合并记录

迁移日期：2026-10-09（Asia/Bangkok）。

## 来源

| 原仓库 | 统一仓库中的目录 | 导入的默认分支提交 |
| --- | --- | --- |
| xiaowen-wechat-miniprogram | `wechat-miniprogram/` | `1df06a5c3a2253d7282a9634ac2f9dc2e528d5db` |
| xiaowen-backend | `backend/` | `8f7c097be8df773da99266102d6995275ecf2914` |
| xiaowen-BMC | `admin/` | `b4bdb855fd18931055d518450511b57ec365303f` |
| xiaowen-sd-model | `sd-model/` | `becba820b7ee948db689cc38a4184d57a9c511bd` |

README 中的旧名称 `xiaowen-generate-server` 已重定向到 `xiaowen-sd-model`，迁移以实际仓库为准。

## 提交历史与分支

小程序文件通过 `git mv` 移入子目录，另外三个仓库以不压缩历史的 `git subtree add` 导入。原始提交 ID 保持不变，并可从合并后的默认分支历史中访问。

原始分支头以带注释的标签保留，名称为 `legacy/<模块>/<原分支名>`。例如：

```bash
git show legacy/backend/master
git log legacy/wechat-miniprogram/fengjun/master
```

这些标签指向迁移前的原始目录结构，用于查阅旧版本；后续开发基于统一仓库默认分支。原本已存在的小程序开发分支也继续保留，不会强制改写。

完整的来源提交、分支和文件数记录在 [repository-consolidation.json](./repository-consolidation.json)。另外三个来源仓库在主仓库合并并完成远端校验后归档，仍可只读访问其提交、Issues 和 Pull Requests。

## 文件与启动校验

迁移时逐项比较原始 Git 文件对象与子目录中的文件对象，检查路径、文件模式和内容。业务源码、锁文件、图片和训练数据均保持原始内容。以下文件有明确调整：

- 各模块 README：指向统一仓库子目录，补充新的工作目录与启动说明。
- `backend/.env.test`：调整为本地服务地址与凭据占位值，实际环境配置保存在被忽略的 `.env` 中。
- `backend/package.json`：仓库、Issues 和主页链接改为统一仓库；依赖与启动脚本保留。
- 根目录新增项目说明、命令转发脚本、忽略规则和本迁移记录。

同时核对原始提交的可达性、历史标签指向、根目录命令与各模块脚本的对应关系，以及私有配置和构建产物的忽略规则。此次迁移的校验范围是目录、内容和历史完整性；业务运行、前端构建、微信真机以及外部服务连接需在配置运行环境后另行验证。

## 部署与自动化

各应用保留独立依赖及锁文件，安装和运行时的工作目录为对应子目录。后端依赖当前工作目录读取 `.env`，根目录命令通过 `npm --prefix backend run start` 确保它在 `backend/` 中启动。

微信开发者工具应打开 `wechat-miniprogram/`，读取该目录中的 `project.config.json`，输出目录仍为模块内的 `dist/`。

原后端的 SSH 部署工作流保存在 `backend/.github/workflows/`，不在统一仓库根目录的 `.github/workflows/` 中，因此不会在迁移推送时自动部署。未来若需要统一部署流程，应按模块调整工作目录并单独配置服务凭据。
