# LLaMA-Factory 模型微调项目

本项目旨在使用 LLaMA-Factory 和相关工具对大型语言模型进行微调，包含 2 套微调脚本，分别为：

**1. 实现基础**

- **简单微调脚本**：使用 `transformers` 和 `peft` 库进行微调，适合快速验证和小规模数据集。
- **LLaMA-Factory**：使用 LLaMA-Factory 提供的功能进行微调，支持更多高级功能，如模型量化、多 GPU 训练等。

**2. 使用复杂度**

- **简单微调脚本**：命令简单，只需执行 `python3 simple_finetune.py`
- **LLaMA-Factory**：命令复杂，包含多个参数，如模型路径、数据集配置、训练参数等

**3. 功能特性**

**简单微调脚本**

- **优点**：
  - 代码简洁，易于理解和修改
  - 依赖少，安装简单
  - 运行速度快，适合快速验证
  - 内存占用相对较低
- **缺点**：
  - 功能有限，只支持基本的 LoRA 微调
  - 缺乏高级功能，如模型量化、多 GPU 训练等
  - 配置固定，需要修改代码才能调整参数

**LLaMA-Factory**

- **优点**：
  - 功能丰富，支持多种微调方法（LoRA、QLoRA、全参数微调等）
  - 支持多种模型架构
  - 提供详细的参数配置
  - 包含评估和推理功能
  - 支持分布式训练
- **缺点**：
  - 依赖较多，安装复杂
  - 配置参数多，学习成本高
  - 内存占用可能更高
  - 运行速度相对较慢

**4. 适用场景**

- **简单微调脚本**：

  - 适合快速入门和测试
  - 适合资源有限的设备（如 Mac mini）
  - 适合简单的微调任务
  - 适合需要自定义微调逻辑的场景

- **LLaMA-Factory**：
  - 适合生产环境和专业微调
  - 适合复杂的微调任务
  - 适合需要多种微调方法的场景
  - 适合需要详细配置和监控的场景

**5. 技术实现**

- **简单微调脚本**：使用 `transformers.Trainer` 进行训练，自定义 `CustomDataset` 处理数据
- **LLaMA-Factory**：使用 LLaMA-Factory 的工作流系统，提供更完整的训练流程

**6. 模型支持**

- **简单微调脚本**：主要支持 Hugging Face 格式的模型
- **LLaMA-Factory**：支持更多模型格式，包括部分 GGUF 模型（通过 Ollama）

## 1. 项目结构

```
├── data/                 # 数据集目录
│   ├── fish_care_dataset.jsonl  # 鱼病相关问答数据集
│   └── dataset_info.json        # LLaMA-Factory 数据集配置
├── simple_finetune.py    # 简单微调脚本
├── LLaMA-Factory/        # LLaMA-Factory 目录
├── Modelfile             # Ollama 模型配置文件
└── README.md             # 项目说明
```

## 2. 环境配置

### 2.1 创建虚拟环境

```bash
# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境
source venv/bin/activate
```

### 2.2 安装依赖

```bash
# 安装基础依赖
python3 -m pip install torch torchvision torchaudio
python3 -m pip install transformers peft datasets==4.0

# 安装 LLaMA-Factory
git clone https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory
python3 -m pip install -e .
cd ..
```

### 2.3 安装 Ollama（可选）

如果需要使用 Ollama 进行模型管理和推理，请从 [Ollama 官网](https://ollama.com/download) 下载并安装。

## 3. 使用方法

### 3.1 使用简单微调脚本

这是最直接的方法，使用 `transformers` 和 `peft` 库进行微调：

```bash
# 激活虚拟环境
source venv/bin/activate

# 运行微调脚本
python3 simple_finetune.py
```

### 3.2 使用 LLaMA-Factory（实验性）

```bash
# 激活虚拟环境
source venv/bin/activate

# 运行 LLaMA-Factory 微调
python3 -m llamafactory.cli train \
  --model_name_or_path Qwen/Qwen2-0.5B \
  --dataset custom_dataset \
  --dataset_dir ./data \
  --output_dir ./finetuned_model \
  --stage sft \
  --finetuning_type lora \
  --lora_rank 2 \
  --per_device_train_batch_size 1 \
  --gradient_accumulation_steps 1 \
  --learning_rate 1e-4 \
  --max_steps 10 \
  --logging_steps 1 \
  --save_steps 5 \
  --warmup_steps 1 \
  --do_train
```

这些参数是 LLaMA-Factory 训练命令的配置参数，用于控制模型微调的各个方面：

| 参数                                   | 含义                                                     |
| -------------------------------------- | -------------------------------------------------------- |
| `python3 -m llamafactory.cli train`    | 执行 LLaMA-Factory 的训练命令                            |
| `--model_name_or_path Qwen/Qwen2-0.5B` | 指定预训练模型的名称或路径，这里使用的是 Qwen2-0.5B 模型 |
| `--dataset custom_dataset`             | 指定要使用的数据集名称，这里使用的是自定义数据集         |
| `--dataset_dir ./data`                 | 指定数据集的目录路径                                     |
| `--output_dir ./finetuned_model`       | 指定微调后模型的输出目录                                 |
| `--stage sft`                          | 指定训练阶段，sft 表示监督微调 (Supervised Fine-Tuning)  |
| `--finetuning_type lora`               | 指定微调方法，lora 表示使用 Low-Rank Adaptation 方法     |
| `--lora_rank 2`                        | 指定 LoRA 的秩，数值越小，参数量越少，训练速度越快       |
| `--per_device_train_batch_size 1`      | 指定每个设备的训练批量大小                               |
| `--gradient_accumulation_steps 1`      | 指定梯度累积的步数，用于模拟更大的批量大小               |
| `--learning_rate 1e-4`                 | 指定学习率，控制模型参数更新的步长                       |
| `--max_steps 5`                        | 指定最大训练步数，限制训练过程的总步数                   |
| `--logging_steps 1`                    | 指定日志记录的步数间隔，每训练 1 步记录一次日志          |
| `--save_steps 2`                       | 指定模型保存的步数间隔，每训练 2 步保存一次模型          |
| `--warmup_steps 1`                     | 指定学习率预热的步数，在预热阶段学习率会逐渐增加到指定值 |

## 4. 数据集格式

本项目使用 JSONL 格式的数据集，每条数据包含以下字段：

```json
{
  "question": "用户问题",
  "answer": "回答"
}
```

示例：

```json
{
  "question": "如何识别和治疗观赏鱼的白点病？",
  "answer": "白点病是观赏鱼常见的寄生虫病，由小瓜虫引起。症状：鱼体表面出现白色小点，鱼会摩擦身体。治疗方法：1. 提高水温至28-30℃，小瓜虫在高温下会停止繁殖；2. 使用白点净等药物；3. 保持水质清洁；4. 隔离病鱼，防止传染。"
}
```

## 5. 模型选择

由于 Mac mini M4 的内存限制（24GB），建议选择以下模型：

1. **小型模型**：Qwen/Qwen2-0.5B、TinyLlama/TinyLlama-1.1B-Chat-v1.0
2. **中型模型**：Qwen/Qwen2-1.5B（需要谨慎）
3. **量化模型**：使用 GGUF 格式的量化模型，如 qwen1_5-7b-chat-q4_k_m.gguf

## 6. 推理使用

以下是使用微调后的模型进行推理和测试的完整指南：

### 6.1 使用推理脚本进行交互式推理

1. **使用简单微调模型（默认）**：

   ```bash
   source venv/bin/activate
   python3 inference.py
   ```

2. **使用 LLaMA-Factory 微调模型**：

   ```bash
   source venv/bin/activate
   python3 inference.py ./finetuned_model
   ```

3. **使用方法**：
   - 运行脚本后，会提示您输入问题
   - 输入相关信息（可选，直接回车跳过）
   - 模型会生成回答
   - 输入 `exit` 退出程序

### 6.2 使用 LLaMA-Factory 的 chat 命令进行测试

1. **运行 chat 命令**：

   ```bash
   source venv/bin/activate
   python3 -m llamafactory.cli chat \
     --model_name_or_path Qwen/Qwen2-0.5B \
     --adapter_name_or_path ./finetuned_model \
     --max_new_tokens 512

   python3 -m llamafactory.cli chat --model_name_or_path Qwen/Qwen2-0.5B --max_new_tokens 100

   ```

2. **使用方法**：
   - 运行命令后，会进入交互式聊天界面
   - 输入您的问题，模型会生成回答
   - 输入 `exit` 退出聊天

### 6.3 编写自定义测试脚本

您可以根据需要编写自己的测试脚本，例如批量测试多个问题：

```python
#!/usr/bin/env python3
"""
批量测试模型性能
"""

from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel

def load_model():
    """加载模型"""
    base_model = "Qwen/Qwen2-0.5B"
    tokenizer = AutoTokenizer.from_pretrained(base_model)
    model = AutoModelForCausalLM.from_pretrained(base_model)
    model = PeftModel.from_pretrained(model, "./finetuned_model")
    return tokenizer, model

def test_questions(tokenizer, model):
    """测试多个问题"""
    test_questions = [
        "如何识别和治疗观赏鱼的白点病？",
        "新手适合养什么淡水观赏鱼？",
        "鱼缸换水的正确频率是多少？",
        "金鱼为什么容易浮头？"
    ]

    for question in test_questions:
        print(f"\n问题: {question}")

        prompt = "### Instruction:\n{instruction}\n\n### Input:\n\n### Response:\n"
        formatted_prompt = prompt.format(instruction=question)

        inputs = tokenizer(formatted_prompt, return_tensors="pt")
        outputs = model.generate(
            **inputs,
            max_new_tokens=512,
            repetition_penalty=1.5,
            pad_token_id=tokenizer.eos_token_id
        )

        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        if "### Response:" in response:
            response = response.split("### Response:")[1].strip()

        print(f"回答: {response}")

if __name__ == "__main__":
    tokenizer, model = load_model()
    test_questions(tokenizer, model)
```

### 6.4 模型文件说明

微调后的模型保存在以下位置：

- **简单微调脚本**：`./simple_finetuned_model/`
- **LLaMA-Factory**：`./finetuned_model/`

模型文件包含：

- `adapter_model.safetensors`：LoRA 适配器权重
- `adapter_config.json`：LoRA 适配器配置
- `tokenizer.json`：分词器配置
- `chat_template.jinja`：聊天模板

### 6.5 注意事项

1. **内存要求**：由于使用的是 Qwen2-0.5B 模型，内存要求相对较低，适合在 Mac mini M4 (24GB RAM)上运行。

2. **推理速度**：在 Apple Silicon 芯片上，模型推理速度会比 CPU 快很多。

3. **模型性能**：由于使用的是小型模型（0.5B 参数），生成的回答可能不够详细和准确。如果需要更好的性能，可以考虑使用更大的模型，如 Qwen2-1.5B。

4. **输入格式**：模型使用特定的输入格式（`### Instruction:`、`### Input:`、`### Response:`），请确保按照此格式构建提示。

## 7. 许可证

本项目仅供学习和研究使用。

## 8. 参考资料

- [LLaMA-Factory GitHub](https://github.com/hiyouga/LLaMA-Factory)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/index)
- [PEFT: Parameter-Efficient Fine-Tuning](https://huggingface.co/docs/peft/index)
- [Ollama Documentation](https://ollama.com/docs)
