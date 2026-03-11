# 学霸助手

> 基于真题生成相似练习 · 智能错题管理 · 高效备考

![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ 特性

- **🎯 AI 相似题生成** - 输入一道真题，AI 生成多道同类型练习题
- **📝 可视化题目编辑** - 无需 JSON，表单式添加和编辑题目
- **📚 题库管理** - 创建、编辑、导入导出题库
- **✏️ 刷题模式** - 自由练习，查看解析
- **⏱️ 考试模式** - 计时测试，模拟真实考试
- **📕 智能错题本** - 自动收集错题，针对性复习
- **📊 学习统计** - 追踪进度，了解薄弱环节
- **📱 响应式设计** - 完美适配手机和电脑

## 🚀 快速开始

### 在线体验

访问 Demo: [https://your-username.github.io/quesbank-demo/](https://your-username.github.io/quesbank-demo/)

### 本地运行

1. 克隆仓库
```bash
git clone https://github.com/your-username/quesbank-demo.git
cd quesbank-demo
```

2. 启动本地服务器
```bash
# 使用 Python
python -m http.server 8080

# 或使用 Node.js
npx serve
```

3. 打开浏览器访问 `http://localhost:8080`

## 📖 使用说明

### AI 相似题生成

1. 进入「创建题目」页面
2. 切换到「AI 相似题生成」标签
3. 粘贴一道真题或例题
4. 输入 DeepSeek API Key（从 https://platform.moonshot.cn 获取）
5. 点击「生成相似题目」
6. 编辑生成的题目（可选）
7. 保存到题库

### 刷题模式

1. 进入「刷题」页面
2. 选择一个或多个题库
3. 设置随机顺序和数量限制
4. 开始答题
5. 错题自动收集到错题本

### 考试模式

1. 进入「考试」页面
2. 选择题库
3. 设置题目数量和考试时间
4. 开始考试
5. 查看成绩和错题分析

## 🛠️ 技术栈

- **前端**: HTML5 + Tailwind CSS + Vanilla JavaScript
- **存储**: localStorage / IndexedDB
- **AI**: DeepSeek API
- **部署**: GitHub Pages / Vercel

## 📁 项目结构

```
quesbank-demo/
├── index.html        # 首页/仪表盘
├── create.html       # 创建题目页面
├── bank.html         # 题库管理页面
├── practice.html     # 刷题模式页面
├── exam.html         # 考试模式页面
├── wrong.html        # 错题本页面
├── css/
│   └── style.css     # 样式文件
├── js/
│   ├── storage.js    # 本地存储模块
│   ├── api.js        # API 调用模块
│   └── app.js        # 应用逻辑
├── docs/
│   └── PRD.md        # 产品需求文档
└── README.md
```

## 🔑 API Key

AI 相似题生成功能需要 DeepSeek API Key:

1. 访问 [DeepSeek Platform](https://platform.moonshot.cn)
2. 注册/登录账号
3. 创建 API Key
4. 在应用中输入 API Key

API Key 会保存在浏览器本地，不会上传到任何服务器。

## 📝 数据存储

所有数据存储在浏览器本地（localStorage），包括：
- 题库和题目
- 错题本
- 学习统计
- 考试记录

清除浏览器数据会导致数据丢失，请定期导出备份。

## 🔮 未来计划

- [ ] 用户账号系统
- [ ] 云端数据同步
- [ ] Word/Excel 导入
- [ ] OCR 图片识别
- [ ] 微信小程序版本
- [ ] 教师端/班级管理
- [ ] 家长查看功能
- [ ] 更多 AI 模型支持

## 📄 License

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- [DeepSeek](https://deepseek.com) - AI 能力支持
- [Tailwind CSS](https://tailwindcss.com) - UI 框架
- [Font Awesome](https://fontawesome.com) - 图标库

---

Made with ❤️ for better education
