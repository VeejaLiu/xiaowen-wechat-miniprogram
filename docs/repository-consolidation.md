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

原始分支头通过带注释的标签保留，名称为 `legacy/<模块>/<原分支名>`。每个标签指向该模块的子目录快照提交，其第一个父提交为未修改的原始分支头。例如：

```bash
git show legacy/backend/master
git log legacy/wechat-miniprogram/fengjun/master
```

标签快照仅包含对应模块子目录，用于查阅旧版本；执行 `git rev-parse legacy/backend/master^{}^` 可以获取该分支的原始提交 ID。后续开发基于统一仓库默认分支。原本已存在的小程序开发分支也继续保留，不会强制改写。后端快照中同时删除了已停用的部署工作流，原始分支提交仍作为父提交保留。

完整的来源提交、分支和文件数记录在 [repository-consolidation.json](./repository-consolidation.json)。另外三个来源仓库在主仓库合并并完成远端校验后归档，仍可只读访问其提交、Issues 和 Pull Requests。

## 文件与启动校验

迁移时逐项比较原始 Git 文件对象与子目录中的文件对象，检查路径、文件模式和内容。业务源码、锁文件、图片和训练数据均保持原始内容。以下文件有明确调整：

- 删除 `backend/.github/workflows/push_code_to_server.yml`，历史标签的后端模块快照也移除该文件。

- 各模块 README：指向统一仓库子目录，补充新的工作目录与启动说明。
- `backend/.env.test`：调整为本地服务地址与凭据占位值，实际环境配置保存在被忽略的 `.env` 中。
- `backend/package.json`：仓库、Issues 和主页链接改为统一仓库；依赖与启动脚本保留。
- 根目录新增项目说明、命令转发脚本、忽略规则和本迁移记录。

同时核对原始提交的可达性、历史标签快照及父提交指向、根目录命令与各模块脚本的对应关系，以及私有配置和构建产物的忽略规则。此次迁移的校验范围是目录、内容和历史完整性；业务运行、前端构建、微信真机以及外部服务连接需在配置运行环境后另行验证。

## 部署与自动化

各应用保留独立依赖及锁文件，安装和运行时的工作目录为对应子目录。后端依赖当前工作目录读取 `.env`，根目录命令通过 `npm --prefix backend run start` 确保它在 `backend/` 中启动。

微信开发者工具应打开 `wechat-miniprogram/`，读取该目录中的 `project.config.json`，输出目录仍为模块内的 `dist/`。

按迁移要求删除原后端的 SSH 部署工作流，统一仓库没有自动部署工作流。手动部署时应按模块选择工作目录，并单独配置服务凭据。
