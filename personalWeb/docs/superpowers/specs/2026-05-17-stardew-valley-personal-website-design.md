# Stardew Valley 风格个人网站 — 设计文档

## 概述

技术开发者的综合型个人网站，UI 深度还原《星露谷物语》(Stardew Valley) 像素游戏风格，包含：个人介绍、技能展示、项目作品集、博客、工作经历、联系方式。

## 技术选型

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **路由**: React Router v6 (BrowserRouter)
- **样式**: CSS Modules (无第三方 UI 库)
- **字体**: Press Start 2P (标题) + VT323 (正文) + 本地 Stardew Valley 字体 (HUD 数字) — 均来自 Google Fonts
- **博客**: Markdown 文件 + react-markdown 渲染
- **部署**: 纯静态输出 → GitHub Pages / Vercel

## 页面路由

```
/                    → 主页（农场仪表盘）
├── /about           → 关于我
├── /skills          → 技能树
├── /projects        → 项目作品集
├── /blog            → 博客列表
│   └── /blog/:slug  → 文章详情
├── /experience      → 工作经历
└── /contact         → 联系方式
```

所有页面包裹在持久 `GameFrame` 布局中。

## 核心组件系统

| 组件 | 职责 | 游戏原型 |
|------|------|---------|
| `GameFrame` | 全局木质边框外层、背景纹理 | 游戏主窗口 |
| `HUD` | 顶部状态栏：金币、日期、季节图标 | 游戏顶部 HUD |
| `HotBar` | 底部导航栏，格子样式切换页面 | 物品快捷栏 |
| `DialogBox` | 内容面板，头像槽 + 文字区 | NPC 对话气泡 |
| `GameButton` | 3D 凸起按钮，hover 下压 | 菜单按钮 |
| `ProgressBar` | 像素风进度条 | 体力/血量条 |
| `ItemCard` | 卡片组件，背包格子外观 | 背包物品格 |
| `SeasonBanner` | 季节主题横幅装饰 | 季节变换 |

## 四季主题系统

| 季节 | 配色方案 | 触发 |
|------|---------|------|
| 春 | 樱花粉 `#f2a0c0`、嫩绿 `#a8d870`、米白 `#f5e8c8`、草绿 `#6b8a40` | 3-5 月 或 手动 |
| 夏 | 阳光金 `#ffd040`、天蓝 `#40b8e0`、奶油 `#fff8e0`、深绿 `#60a838` | 6-8 月 或 手动 |
| 秋 | 南瓜橙 `#e07830`、枫叶红 `#c84040`、麦田金 `#f0d8a0`、橡木棕 `#8b5a2a` | 9-11 月 或 手动 |
| 冬 | 雪白 `#f0f8ff`、冰蓝 `#a0b8d0`、霜灰 `#e0e8f0`、石青 `#506880` | 12-2 月 或 手动 |

季节通过 `SeasonContext` 管理，默认跟随系统月份，用户可在 HUD 手动切换。

## 状态管理

- `SeasonContext` — 当前季节，影响全局 CSS 变量
- `GameStateContext` — 金币数、网站"天数"(访问计数)、HUD 显示状态
- 无需全局状态库，Context + hooks 足够

## 数据来源

- 个人信息 → 静态 TypeScript 文件
- 项目列表 → 静态 TypeScript 文件
- 博客文章 → `/content/blog/*.md`，构建时解析
- 联系表单 → 纯展示，后期接 Formspree

## 各页面设计

### 主页 `/`

农场全景背景 + HUD 顶部 + 个人简介 DialogBox + 6 个 ItemCard 快捷入口 + HotBar 底部导航

### 关于我 `/about`

NPC 对话框形式：左侧角色头像，右侧文字介绍，可翻页对话

### 技能 `/skills`

技能树布局，每项技能使用 ProgressBar 展示熟练度，分类（前端/后端/DevOps 等）

### 项目 `/projects`

ItemCard 网格（背包格子系统），每格一个项目，hover 弹出详情

### 博客 `/blog`

书架风格列表页 + Markdown 渲染文章详情，DialogBox 包裹内容

### 经历 `/experience`

垂直时间轴，每段经历为一个节点，类似矿洞层数标记

### 联系 `/contact`

信箱/邮筒视觉，展示社交媒体链接（GitHub、Twitter、Email 等），使用像素图标

## 文件结构

```
src/
├── components/
│   ├── game-ui/
│   │   ├── GameFrame/
│   │   ├── HUD/
│   │   ├── HotBar/
│   │   ├── DialogBox/
│   │   ├── GameButton/
│   │   ├── ProgressBar/
│   │   ├── ItemCard/
│   │   └── SeasonBanner/
│   └── layout/
│       ├── Header/
│       └── Footer/
├── context/
│   ├── SeasonContext.tsx
│   └── GameStateContext.tsx
├── pages/
│   ├── Home/
│   ├── About/
│   ├── Skills/
│   ├── Projects/
│   ├── Blog/
│   ├── BlogPost/
│   ├── Experience/
│   └── Contact/
├── data/
│   ├── about.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── experience.ts
│   └── social.ts
├── styles/
│   ├── variables.css
│   ├── seasons.css
│   ├── global.css
│   └── pixel-mixins.css
├── App.tsx
├── main.tsx
└── vite-env.d.ts
content/
└── blog/
    ├── hello-world.md
    └── ...
public/
├── fonts/
│   └── stardew-valley.ttf
└── textures/
    └── wood-pattern.png
```
