# 安装 Python 3 环境

::: tip 提示
本次案例使用 `MAC mini M4 (24G)` 作为演示环境，你可以根据自己的硬件配置进行调整。

Mac mini 默认自带了 Python 2.x 版本（已过时），我们需要安装最新的 Python 3 版本，并配置好环境，避免版本冲突。
:::

## 1. 通过官方安装包（最简单，适合新手）

这是最直观、不易出错的方式。

### 1.1 下载官方安装包

1. 打开浏览器，访问 Python 官方下载页面：[https://www.python.org/downloads/mac-osx/](https://www.python.org/downloads/mac-osx/)
2. 下载最新的 **Python 3.x** 版本（比如 Python 3.12.x），选择适配 macOS 的安装包（通常是 `.pkg` 格式）。

### 1.2 安装 Python

1. 双击下载好的 `.pkg` 文件，按照安装向导提示操作：
   - 点击「继续」→「同意」→「安装」；
   - 输入你的 Mac 密码完成授权；
   - 等待安装完成，最后点击「关闭」。

### 1.3 验证安装

1. 打开 Mac mini 的「终端」（可以通过 Spotlight 搜索「终端」）；
2. 输入以下命令，检查 Python 版本：
   ```bash
   python3 --version
   # 或
   python --version  # 若显示 Python 3.x 则说明配置正常，否则用 python3
   pip3 --version  # 检查包管理工具 pip
   ```
   如果输出类似 `Python 3.12.1` 和 `pip 24.0 from ...`，说明安装成功。

## 2. 通过 Homebrew 安装（推荐，适合开发者）

Homebrew 是 Mac 的包管理器，能更方便地管理 Python 版本和依赖，后续升级/卸载也更简单。

### 2.1 安装 Homebrew（若未安装）

1. 打开终端，输入以下命令并回车：
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. 按提示输入 Mac 密码，等待 Homebrew 安装完成。

### 2.2 用 Homebrew 安装 Python

1. 终端输入以下命令，安装最新版 Python 3：
   ```bash
   brew install python3
   ```
2. 安装完成后，验证版本：
   ```bash
   python3 --version
   pip3 --version
   ```

## 3. 可选操作

### 3.1 配置 Python 别名（简化命令）   

默认需要用 `python3`/`pip3` 调用新版本，若想直接用 `python`/`pip`，可配置别名：

1. 终端输入：
   ```bash
   nano ~/.zshrc  # Mac mini 新版系统默认用 zsh，若用 bash 则改 ~/.bash_profile
   ```
2. 在文件末尾添加：
   ```bash
   alias python=/usr/local/bin/python3
   alias pip=/usr/local/bin/pip3
   ```
3. 按 `Ctrl+O` 保存，`Ctrl+X` 退出，再输入：
   ```bash
   source ~/.zshrc  # 使配置生效
   ```
4. 验证：输入 `python --version`，应显示 Python 3.x。

### 3.2 安装虚拟环境（推荐）

为避免不同项目的依赖冲突，建议安装 `venv`（Python 内置）或 `virtualenv`：

1. 用内置 `venv` 创建虚拟环境：
   ```bash
   # 创建项目文件夹
   mkdir my_python_project
   cd my_python_project
   # 创建虚拟环境
   python -m venv venv
   # 激活虚拟环境
   source venv/bin/activate
   ```
2. 激活后终端前缀会显示 `(venv)`，此时安装的包仅作用于该环境；
3. 退出虚拟环境：
   ```bash
   deactivate
   ```

## 4. 总结

1. **新手首选**：直接下载 Python 官方 `.pkg` 安装包，步骤简单无依赖；
2. **开发者推荐**：用 Homebrew 安装，方便后续版本管理和升级；
3. **核心注意**：Mac 自带 Python 2.x 已废弃，务必使用 `python3`/`pip3`（或配置别名），且建议用虚拟环境隔离项目依赖。

## 5. 补充：解决 `zsh: no such file or directory: /usr/local/bin/python3` 错误

::: tip 提示
如果遇到的 `zsh: no such file or directory: /usr/local/bin/python3` 错误，核心原因是你配置别名时写的 Python 3 路径不对，Mac mini 上通过不同方式安装的 Python，实际路径会不一样。我会先解释原因，再给你可直接操作的解决方案。
:::

### 5.1 找到 Python 3 的真实路径

首先要定位你的 Python 3 到底安装在哪个位置，打开终端执行以下命令：

```bash
which python3
```

执行后会输出类似以下的真实路径（不同安装方式路径不同）：

- 官方安装包：可能是 `/Library/Frameworks/Python.framework/Versions/3.x/bin/python3`
- Homebrew 安装：可能是 `/opt/homebrew/bin/python3`（M1/M2/M3 芯片的 Mac mini）或 `/usr/local/bin/python3`（Intel 芯片）

**示例输出**（M 芯片 Mac mini）：

```
/opt/homebrew/bin/python3
```

### 5.2 修正别名配置

根据上面查到的真实路径，重新配置 `~/.zshrc` 文件：

1. 打开配置文件：
   ```bash
   nano ~/.zshrc
   ```
2. 删除之前错误的别名行，替换成你查到的真实路径（以下是 M 芯片示例，你要换成自己的路径）：
   ```bash
   # 替换成 which python3 查到的路径
   alias python=/opt/homebrew/bin/python3
   alias pip=/opt/homebrew/bin/pip3
   ```
3. 保存并退出：按 `Ctrl+O` → 回车确认 → `Ctrl+X`。
4. 让配置生效：
   ```bash
   source ~/.zshrc
   ```

### 5.3 验证是否修复

执行以下命令，若显示 Python 3.x 版本则说明成功：

```bash
python --version
pip --version
```

### 5.4 补充：如果 `which python3` 也找不到

如果执行 `which python3` 输出为空，说明你之前的 Python 3 安装可能没成功，重新安装即可：

1. 用 Homebrew 重新安装（推荐）：
   ```bash
   brew install python3
   ```
2. 安装完成后再执行 `which python3`，就能拿到正确路径了。
