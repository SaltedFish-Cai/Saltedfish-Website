# 本地 AI 环境安装

:::warning
本次案例使用 `MAC mini M4 (24G)` 作为演示环境，你可以根据自己的硬件配置进行调整。
:::

## 一、整体方案思路

1. 利用 macOS 的优势，优先选择适配 Apple Silicon 的开源框架（Ollama + Open WebUI），无需复杂的环境配置；
2. 选择轻量且性能足够的本地模型（如 Llama 3 8B、Qwen 7B），适配 24G 内存；
3. 通过插件实现本地模型的网络搜索能力；
4. Open WebUI 提供开箱即用的可视化对话界面，支持多模型切换、对话历史管理。

## 二、分步搭建教程

### 步骤 1：准备基础环境

Mac mini M4 的 macOS 已预装 Python，只需确认 Homebrew（包管理器）是否安装，没有则执行：

```bash
# 安装Homebrew（Apple Silicon适配版）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 验证安装
brew --version
```

### 步骤 2：安装 Ollama（本地模型运行核心）

Ollama 是专为 macOS（尤其是 Apple Silicon）优化的本地 LLM 运行工具，一键部署模型，无需手动配置 CUDA/Metal。

```bash
# 通过Homebrew安装Ollama
brew install ollama

# 启动Ollama服务（后台常驻）
ollama serve &

# 验证安装（输出版本即成功）
ollama --version
```

### 步骤 3：拉取并运行适配的本地 AI 模型

24G 内存推荐选择 7B/8B 量级的模型，兼顾性能和体验：

```bash
# 方案1：Meta Llama 3 8B（英文优秀，基础对话首选）
ollama pull llama3:8b

# 方案2：通义千问 Qwen 7B（中文优化，更适配中文对话）
ollama pull qwen:7b

# 测试模型（终端直接对话，验证本地模型可用）
ollama run llama3:8b
# 输入问题如“介绍一下Mac mini M4”，测试回复后按Ctrl+D退出
```

### 步骤 4：安装 Open WebUI（可视化对话界面）

Open WebUI 是开源的 AI 对话界面，适配 Ollama，支持网络搜索、多模型切换、自定义提示词等，且原生支持 Apple Silicon。

```bash
# 安装Docker（运行Open WebUI的最简方式，Homebrew一键安装）
brew install --cask docker

# 启动Docker（需在应用列表打开Docker.app，或终端执行）
open /Applications/Docker.app

# 等待Docker启动完成后，运行Open WebUI容器
docker run -d -p 3000:8080 --env ENABLE_WEB_SEARCH=true --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main

# 验证容器运行（输出open-webui即成功）
docker ps | grep open-webui
```

### 步骤 5：配置网络搜索功能

Open WebUI 内置网络搜索插件，只需简单配置即可让本地模型调用网络资源：

1. 打开浏览器，访问 `http://localhost:3000`；
2. 首次登录需创建管理员账号（随意设置即可）；
3. 点击界面右上角「设置」→「插件」；
4. 找到「Web Search」插件，启用并保存；
5. 回到对话界面，输入问题时勾选输入框下方的「Web Search」选项，模型会自动联网搜索并整合结果。

### 步骤 6：优化 M4 芯片性能（可选）

为充分利用 M4 的 Metal 加速，调整 Ollama 配置：

```bash
# 创建Ollama配置文件
mkdir -p ~/.ollama
echo 'NUM_PARALLEL=4
METAL=true
BLAS_NUM_THREADS=8' > ~/.ollama/config

# 重启Ollama服务
pkill ollama && ollama serve &
```

## 三、使用说明

1. **启动服务**：每次开机后，只需执行以下命令即可启动全套服务：
   ```bash
   ollama serve &
   docker start open-webui
   ```
2. **访问界面**：打开浏览器输入 `http://localhost:3000`，即可进入可视化对话界面；
3. **切换模型**：界面左上角可选择已拉取的模型（llama3:8b/qwen:7b）；
4. **网络搜索**：输入问题时勾选「Web Search」，模型会先联网搜索再回复（如“2026 年 Mac mini 最新配置”）；
5. **停止服务**：
   ```bash
   pkill ollama
   docker stop open-webui
   ```

## 总结

1. 核心架构：**Ollama（本地模型运行） + Open WebUI（可视化界面+网络搜索）**，完美适配 Mac mini M4 的 24G 内存和 Apple Silicon 架构；
2. 关键优势：无需复杂的环境配置，一键部署，模型轻量（7B/8B），兼顾本地对话和网络搜索；
3. 扩展建议：若需更好的中文体验，可替换为`ollama pull qwen:7b-chat`；若内存充足（24G 可尝试），可拉取 13B 模型（如`ollama pull llama3:13b`）提升效果。

整个方案全程基于 macOS 原生工具链，适配 M4 芯片的 ARM 架构，24G 内存运行 7B/8B 模型无压力，可视化界面操作简单，网络搜索功能满足基础的实时信息需求。
