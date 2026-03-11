/**
 * API Module - DeepSeek API integration for AI question generation
 */

const API = {
  /**
   * Generate similar questions based on an example
   * @param {string} example - The example question
   * @param {number} count - Number of questions to generate
   * @param {string} difficulty - Target difficulty (same/easy/medium/hard)
   * @param {string} apiKey - DeepSeek API key
   * @returns {Promise<Object>} Generated questions and analysis
   */
  async generateSimilarQuestions(example, count, difficulty, apiKey) {
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
- 如果是选择题，必须包含4个选项

例题：
${example}

请严格以JSON格式返回（不要有任何其他文字，只返回JSON）：
{
  "原题分析": {
    "知识点": "这道题考察的知识点",
    "难度": "简单/中等/困难",
    "题型": "选择题/填空题/判断题/解答题"
  },
  "相似题目": [
    {
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer": "正确答案（如A、B、C、D，或具体答案）",
      "explanation": "详细解析"
    }
  ]
}

注意：
1. 如果不是选择题，则不需要options字段
2. 如果是判断题，answer应为"正确"或"错误"
3. 如果是填空题，answer应为填空的内容
4. 确保生成的题目有变化，不要简单复制`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API 请求失败 (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('API 返回内容为空');
    }

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('无法解析返回的 JSON 格式');
    }
    
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      throw new Error('JSON 解析失败：' + e.message);
    }
  },

  /**
   * Generate questions from a topic/prompt
   * @param {string} topic - The topic to generate questions about
   * @param {Object} counts - Number of each question type {choice, blank, truefalse}
   * @param {string} apiKey - DeepSeek API key
   * @returns {Promise<Object>} Generated questions
   */
  async generateFromTopic(topic, counts, apiKey) {
    const prompt = `你是一位专业的教育出题专家。

请根据以下主题，生成一组题目：
主题：${topic}

要求：
- 选择题：${counts.choice || 0} 道（每题4个选项）
- 填空题：${counts.blank || 0} 道
- 判断题：${counts.truefalse || 0} 道

请严格以JSON格式返回（不要有任何其他文字）：
{
  "选择题": [
    {
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer": "正确选项字母",
      "explanation": "解析"
    }
  ],
  "填空题": [
    {
      "question": "题目内容，空格用( )表示",
      "answer": "正确答案",
      "explanation": "解析"
    }
  ],
  "判断题": [
    {
      "question": "题目内容",
      "answer": "正确或错误",
      "explanation": "解析"
    }
  ]
}`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API 请求失败 (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('API 返回内容为空');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('无法解析返回的 JSON 格式');
    }
    
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      throw new Error('JSON 解析失败：' + e.message);
    }
  }
};
