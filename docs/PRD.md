# 学霸助手 - Product Requirements Document (PRD)

**Version:** 1.0 Demo  
**Date:** March 2026  
**Author:** Ky  

---

## 1. Executive Summary

学霸助手 is an intelligent question bank platform designed for the Chinese education market. It targets teachers, students, and educational agencies who need efficient ways to create, manage, and practice exam-style questions.

This document outlines the competitive analysis of existing solutions, our differentiation strategy, and the demo MVP scope.

---

## 2. Competitive Analysis: QuesBank

### 2.1 What QuesBank Does

QuesBank (https://github.com/Weeexiao/QuesBank) is an open-source question bank system with these features:

| Feature | Description |
|---------|-------------|
| JSON Question Input | Users paste raw JSON to add questions |
| AI Generation | Generate questions from text prompts via DeepSeek API |
| Question Types | Multiple choice (选择题), Fill-in-blank (填空题), True/False (判断题) |
| Practice Mode | Display questions, show answers and explanations |
| Exam Mode | Timed tests with auto-grading |
| Question Banks | Save and manage question collections locally |
| Import/Export | JSON file import and export |

### 2.2 Pros ✅

| Pro | Details |
|-----|---------|
| Feature Complete MVP | Covers basic create → practice → test loop |
| AI Generation | Time-saver for teachers (when it works) |
| Multiple Question Types | MCQ, fill-blank, true/false supported |
| Exam Timer | Basic timed exam functionality |
| Local Storage | Works offline, privacy-friendly |
| Open Source | Free to use and modify |
| Responsive Design | Works on mobile devices |

### 2.3 Cons ❌

#### Content Creation Issues
| Issue | Impact | Severity |
|-------|--------|----------|
| JSON-only input | Teachers don't know JSON syntax | 🔴 Critical |
| No manual question builder | Can't add questions via form | 🔴 Critical |
| No Word/Excel import | Teachers' existing content is trapped | 🔴 Critical |
| No OCR/photo import | Can't digitize paper tests | 🟡 Medium |
| Can't edit AI output | Stuck with AI mistakes | 🔴 Critical |
| No question templates | Start from scratch every time | 🟡 Medium |

#### Organization Issues
| Issue | Impact | Severity |
|-------|--------|----------|
| No difficulty tagging | Can't filter by easy/medium/hard | 🟡 Medium |
| No knowledge point system | Can't organize by topic | 🟡 Medium |
| Flat structure | No folders or categories | 🟡 Medium |
| No search | Can't find specific questions | 🟡 Medium |

#### Learning & Practice Issues
| Issue | Impact | Severity |
|-------|--------|----------|
| No spaced repetition | Doesn't track forgotten material | 🟡 Medium |
| No 错题本 | Wrong answers not collected | 🔴 Critical |
| No weakness analysis | Students don't know what to study | 🟡 Medium |
| No progress tracking | No sense of improvement | 🟡 Medium |
| Random questions only | No smart selection | 🟡 Medium |

#### Exam Issues
| Issue | Impact | Severity |
|-------|--------|----------|
| No difficulty balancing | Could get all hard or all easy | 🟡 Medium |
| No detailed results | Just a score, no breakdown | 🟡 Medium |
| No anti-cheat | Easy to cheat | 🟢 Low |

#### Platform Issues
| Issue | Impact | Severity |
|-------|--------|----------|
| No WeChat Mini Program | High friction in China | 🔴 Critical |
| localStorage only | No cross-device sync | 🟡 Medium |
| No mobile app | Suboptimal mobile experience | 🟡 Medium |
| Dated UI | Looks like 2020 template | 🟡 Medium |

#### Missing Features
| Feature | Impact | Severity |
|---------|--------|----------|
| No similar question generation | Key differentiator missing | 🔴 Critical |
| No classroom management | Teachers can't assign homework | 🟡 Medium |
| No analytics | No insights for teachers | 🟡 Medium |
| No parent view | Parents want visibility | 🟢 Low |
| No gamification | No motivation system | 🟢 Low |

---

## 3. Our Solution: 学霸助手

### 3.1 Vision

> "The intelligent question bank that actually understands education"

We're not building a JSON parser with an AI wrapper. We're building a platform that:
- Lets teachers create content WITHOUT technical knowledge
- Generates questions SIMILAR to real exams
- Helps students learn SMARTER, not just more
- Works seamlessly in the WeChat ecosystem

### 3.2 Key Differentiators

| Feature | QuesBank | 学霸助手 |
|---------|----------|--------------|
| Question Input | JSON only | Visual form + Word + AI |
| Similar Questions | ❌ None | ✅ Generate from examples |
| Edit AI Output | ❌ No | ✅ Full editing |
| 错题本 | ❌ None | ✅ Auto-collect + review |
| Difficulty System | ❌ None | ✅ Easy/Medium/Hard |
| Knowledge Points | ❌ None | ✅ Tagging system |
| Analytics | ❌ None | ✅ Progress dashboard |
| UI/UX | Dated | Modern, clean |

### 3.3 Target Users

#### Primary: Teachers (教师)
- Create and manage question banks
- Generate exam-style questions quickly
- Track student progress (future)

#### Secondary: Students (学生)
- Practice with smart review
- Collect and conquer wrong answers
- Prepare for exams efficiently

#### Tertiary: Educational Agencies (教培机构)
- Bulk question bank management
- Licensed content distribution
- White-label solutions (future)

---

## 4. Demo MVP Scope (v0.1)

### 4.1 Core Features for Demo

#### ✅ Must Have (Demo)

**1. Visual Question Builder**
- Form-based question creation (no JSON required)
- Support for MCQ, fill-blank, true/false
- Add/edit/delete questions
- Set difficulty (easy/medium/hard)

**2. Similar Question Generator** ⭐ Key Feature
- Input an example question (real exam question)
- AI analyzes: knowledge point, difficulty, structure
- Generate N similar questions with different content
- Edit generated questions before saving

**3. Question Bank Management**
- Create/rename/delete banks
- View all questions in a bank
- Search within bank
- Export as JSON

**4. Practice Mode**
- Select questions from banks
- Answer and see immediate feedback
- View explanations
- Auto-collect wrong answers to 错题本

**5. 错题本 (Wrong Answer Book)**
- Auto-collect all wrong answers
- Review wrong answers
- Mark as "mastered"
- Generate similar questions from wrong answers

**6. Basic Exam Mode**
- Select questions/banks
- Set question count and time limit
- Timer with warnings
- Auto-grade and show results
- Detailed breakdown by question

**7. Progress Dashboard**
- Total questions practiced
- Accuracy rate
- Questions by difficulty
- Wrong answers pending review

#### ❌ Not in Demo (Future)

- User authentication
- Cloud sync
- Classroom/assignment features
- Parent dashboard
- WeChat Mini Program
- Word/Excel import
- OCR import
- Leaderboards/gamification
- Content marketplace

### 4.2 Pages

| Page | Purpose |
|------|---------|
| `index.html` | Landing + Dashboard |
| `create.html` | Visual question builder + AI similar generator |
| `bank.html` | Question bank management |
| `practice.html` | Practice mode |
| `exam.html` | Exam mode |
| `wrong.html` | 错题本 (wrong answer book) |
| `results.html` | Exam results detail |

### 4.3 Data Model

```javascript
// Question
{
  id: "uuid",
  type: "choice" | "blank" | "truefalse",
  question: "题目内容",
  options: ["A", "B", "C", "D"],  // for choice only
  answer: "正确答案",
  explanation: "解析",
  difficulty: "easy" | "medium" | "hard",
  knowledgePoint: "知识点",
  source: "manual" | "ai" | "import",
  createdAt: timestamp
}

// Question Bank
{
  id: "uuid",
  name: "题库名称",
  description: "描述",
  questions: [Question],
  createdAt: timestamp,
  updatedAt: timestamp
}

// Wrong Answer Entry
{
  id: "uuid",
  question: Question,
  userAnswer: "用户答案",
  addedAt: timestamp,
  reviewCount: number,
  mastered: boolean
}

// Exam Record
{
  id: "uuid",
  bankIds: ["uuid"],
  questions: [Question],
  answers: { questionId: userAnswer },
  score: number,
  totalQuestions: number,
  timeLimit: number,
  timeTaken: number,
  completedAt: timestamp
}

// User Stats
{
  totalPracticed: number,
  totalCorrect: number,
  byDifficulty: { easy: {total, correct}, medium: {...}, hard: {...} },
  practiceHistory: [{ date, count, correct }]
}
```

### 4.4 Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | HTML + Tailwind CSS + Vanilla JS | Fast, no build step, easy to deploy |
| Storage | localStorage + IndexedDB (Dexie.js) | Local-first, no backend needed |
| AI | DeepSeek API | China-accessible, good quality |
| Hosting | GitHub Pages / Vercel | Free, fast CDN |
| Future | WeChat Mini Program | China distribution |

### 4.5 UI/UX Principles

1. **Clean & Modern** - Gradient headers, rounded corners, subtle shadows
2. **Mobile-First** - Works great on phones
3. **Immediate Feedback** - No waiting, instant responses
4. **Chinese-First** - All UI in Chinese, culturally appropriate
5. **Accessible** - Clear fonts, good contrast, touch-friendly

---

## 5. User Flows

### 5.1 Create Questions (Manual)

```
Dashboard → 创建题目 → Select Type
    ↓
Fill Form (question, options, answer, explanation, difficulty)
    ↓
Preview → Save to Bank (select or create)
    ↓
Success → Add Another or Go to Bank
```

### 5.2 Generate Similar Questions

```
Dashboard → 生成相似题 → Paste Example Question
    ↓
Set: count, difficulty, API key
    ↓
Generate → AI Analysis Shown (knowledge point, difficulty, type)
    ↓
Review Generated Questions → Edit Any → Save to Bank
```

### 5.3 Practice Mode

```
Dashboard → 刷题模式 → Select Bank(s)
    ↓
Questions Displayed One by One
    ↓
Answer → Immediate Feedback (correct/wrong + explanation)
    ↓
Wrong Answer → Auto-saved to 错题本
    ↓
Complete → Summary Stats
```

### 5.4 Exam Mode

```
Dashboard → 考试模式 → Select Bank(s)
    ↓
Set: question count, time limit
    ↓
Start Exam → Timer Running
    ↓
Answer All Questions (can navigate, mark for review)
    ↓
Submit (or auto-submit when time up)
    ↓
Results: Score, Breakdown, Wrong Answer Review
    ↓
Wrong Answers → Add to 错题本
```

### 5.5 错题本 Review

```
Dashboard → 错题本 → View All Wrong Answers
    ↓
Filter by: knowledge point, difficulty, date
    ↓
Review Question → See Explanation
    ↓
Options: Mark Mastered | Generate Similar | Practice Again
```

---

## 6. Success Metrics (Demo)

| Metric | Target |
|--------|--------|
| Core flows working | 100% |
| Page load time | < 2s |
| Mobile responsive | Yes |
| Stakeholder approval | Demo impresses |

---

## 7. Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Demo MVP | Today | Fully functional demo |
| User Testing | 1 week | Feedback from 5+ teachers |
| v1.0 Polish | 2 weeks | Production-ready web app |
| WeChat Mini Program | 4 weeks | Mini Program launch |

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| AI API costs | Rate limiting, user provides own key |
| AI quality varies | Allow editing, regeneration |
| localStorage limits | IndexedDB for larger storage |
| Competition copies features | Move fast, build community |

---

## 9. Appendix

### A. QuesBank JSON Format (Reference)

```json
{
  "选择题": [
    {
      "question": "题目",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "解析"
    }
  ],
  "填空题": [
    {
      "question": "题目( )空格",
      "answer": "答案",
      "explanation": "解析"
    }
  ],
  "判断题": [
    {
      "question": "题目",
      "answer": "正确/错误",
      "explanation": "解析"
    }
  ]
}
```

### B. Competitive Landscape

| Product | Strengths | Weaknesses |
|---------|-----------|------------|
| QuesBank | Free, open source | Poor UX, no smart features |
| 猿题库 | Large question DB | Expensive, no customization |
| 作业帮 | Brand recognition | Generic, not teacher-focused |
| 学霸助手 | Smart generation, clean UX | New, unproven |

---

*End of PRD*
