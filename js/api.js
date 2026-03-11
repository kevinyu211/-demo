/**
 * API Module - Kimi (Moonshot) API integration for AI question generation
 * API Key is embedded for seamless user experience
 */

const API = {
  // API Configuration
  config: {
    baseUrl: 'https://api.moonshot.ai/v1',
    model: 'kimi-k2.5',
    apiKey: 'sk-knVWB5KsEUKo960WMCZ8SDBGwSb0lF85O79nTGqWKkzXegzy',
  },

  /**
   * Quick practice - generate questions from a topic (for students)
   * @param {string} topic - What the student wants to practice
   * @param {number} count - Number of questions (default 10)
   * @returns {Promise<Array>} Array of questions
   */
  async quickPractice(topic, count = 10) {
    const prompt = `你是一位专业的教育出题专家。

学生想要练习：${topic}

请生成 ${count} 道练习题，包含多种题型（选择题、填空题、判断题混合）。
题目难度应该循序渐进，从简单到中等到困难。

请严格以JSON格式返回（不要有任何其他文字）：
{
  "topic": "知识点总结",
  "questions": [
    {
      "type": "choice",
      "question": "题目内容",
      "options": ["A选项", "B选项", "C选项", "D选项"],
      "answer": "A",
      "explanation": "解析",
      "difficulty": "easy"
    },
    {
      "type": "blank",
      "question": "题目内容，空格用____表示",
      "answer": "答案",
      "explanation": "解析",
      "difficulty": "medium"
    },
    {
      "type": "truefalse",
      "question": "判断题内容",
      "answer": "正确",
      "explanation": "解析",
      "difficulty": "easy"
    }
  ]
}`;

    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: '你是一位专业的教育出题专家，擅长根据学生需求生成高质量练习题。请始终以JSON格式返回结果。'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 1,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API 请求失败 (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) throw new Error('API 返回内容为空');

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('无法解析返回的 JSON 格式');
    
    const result = JSON.parse(jsonMatch[0]);
    return result.questions || [];
  },

  /**
   * Generate similar questions based on an example
   */
  async generateSimilarQuestions(example, count = 5, difficulty = 'same') {
    const difficultyInstruction = difficulty === 'same' 
      ? '保持与例题相同的难度' 
      : `难度设为${difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : '困难'}`;

    const prompt = `你是一位专业的教育出题专家。

请根据以下例题，生成 ${count} 道相似的题目：
- 保持相同的题型和考察方式
- 保持相同的知识点
- 改变具体的数值、情境或选项
- ${difficultyInstruction}
- 每道题都要有答案和解析

例题：
${example}

请严格以JSON格式返回：
{
  "analysis": {
    "topic": "知识点",
    "difficulty": "简单/中等/困难",
    "type": "选择题/填空题/判断题"
  },
  "questions": [
    {
      "type": "choice",
      "question": "题目内容",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "解析",
      "difficulty": "medium"
    }
  ]
}`;

    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: '你是一位专业的教育出题专家。请始终以JSON格式返回结果。'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 1,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API 请求失败 (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) throw new Error('API 返回内容为空');

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('无法解析返回的 JSON 格式');
    
    return JSON.parse(jsonMatch[0]);
  },

  /**
   * Analyze uploaded test and extract questions
   */
  async analyzeTest(testContent) {
    const prompt = `你是一位专业的教育专家。

请分析以下试卷/题目内容，提取所有题目并整理成结构化格式：

${testContent}

请严格以JSON格式返回：
{
  "subject": "科目",
  "grade": "年级",
  "totalQuestions": 10,
  "questions": [
    {
      "type": "choice",
      "question": "题目内容",
      "options": ["A", "B", "C", "D"],
      "answer": "正确答案",
      "explanation": "如果有解析",
      "difficulty": "medium"
    }
  ]
}`;

    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: '你是一位专业的教育专家，擅长分析试卷并提取题目。请始终以JSON格式返回结果。'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 1,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API 请求失败 (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) throw new Error('API 返回内容为空');

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('无法解析返回的 JSON 格式');
    
    return JSON.parse(jsonMatch[0]);
  },

  /**
   * Generate targeted practice based on wrong answers
   */
  async generateFromWrongAnswers(wrongQuestions, count = 5) {
    const questionsText = wrongQuestions.map((q, i) => 
      `${i + 1}. ${q.question}\n   正确答案: ${q.answer}`
    ).join('\n\n');

    const prompt = `你是一位专业的教育专家。

学生在以下题目上出错了：

${questionsText}

请针对这些错题涉及的知识点，生成 ${count} 道新的练习题帮助学生巩固。
题目应该从不同角度考察相同的知识点。

请严格以JSON格式返回：
{
  "weakPoints": ["薄弱知识点1", "薄弱知识点2"],
  "questions": [
    {
      "type": "choice",
      "question": "题目内容",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "解析",
      "difficulty": "medium",
      "targetPoint": "针对的知识点"
    }
  ]
}`;

    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: '你是一位专业的教育专家，擅长针对学生薄弱点生成练习题。请始终以JSON格式返回结果。'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 1,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API 请求失败 (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) throw new Error('API 返回内容为空');

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('无法解析返回的 JSON 格式');
    
    return JSON.parse(jsonMatch[0]);
  }
};
