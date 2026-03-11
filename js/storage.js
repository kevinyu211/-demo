/**
 * Storage Module - Local storage wrapper for question banks and user data
 */

const Storage = {
  // ==================== Question Banks ====================
  
  getBanks() {
    return JSON.parse(localStorage.getItem('questionBanks') || '{}');
  },

  getBank(id) {
    const banks = this.getBanks();
    return banks[id] || null;
  },

  createBank(name, description = '') {
    const banks = this.getBanks();
    const id = generateId();
    const bank = {
      id,
      name,
      description,
      questions: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    banks[id] = bank;
    localStorage.setItem('questionBanks', JSON.stringify(banks));
    return bank;
  },

  updateBank(id, updates) {
    const banks = this.getBanks();
    if (banks[id]) {
      banks[id] = { ...banks[id], ...updates, updatedAt: Date.now() };
      localStorage.setItem('questionBanks', JSON.stringify(banks));
    }
    return banks[id];
  },

  deleteBank(id) {
    const banks = this.getBanks();
    delete banks[id];
    localStorage.setItem('questionBanks', JSON.stringify(banks));
  },

  addQuestionToBank(bankId, question) {
    const banks = this.getBanks();
    if (banks[bankId]) {
      if (!banks[bankId].questions) {
        banks[bankId].questions = [];
      }
      banks[bankId].questions.push(question);
      banks[bankId].updatedAt = Date.now();
      localStorage.setItem('questionBanks', JSON.stringify(banks));
    }
  },

  updateQuestionInBank(bankId, questionId, updates) {
    const banks = this.getBanks();
    if (banks[bankId] && banks[bankId].questions) {
      const index = banks[bankId].questions.findIndex(q => q.id === questionId);
      if (index !== -1) {
        banks[bankId].questions[index] = { ...banks[bankId].questions[index], ...updates };
        banks[bankId].updatedAt = Date.now();
        localStorage.setItem('questionBanks', JSON.stringify(banks));
      }
    }
  },

  deleteQuestionFromBank(bankId, questionId) {
    const banks = this.getBanks();
    if (banks[bankId] && banks[bankId].questions) {
      banks[bankId].questions = banks[bankId].questions.filter(q => q.id !== questionId);
      banks[bankId].updatedAt = Date.now();
      localStorage.setItem('questionBanks', JSON.stringify(banks));
    }
  },

  // ==================== Wrong Answers ====================

  getWrongAnswers() {
    return JSON.parse(localStorage.getItem('wrongAnswers') || '[]');
  },

  addWrongAnswer(question, userAnswer) {
    const wrongAnswers = this.getWrongAnswers();
    
    // Check if already exists
    const existing = wrongAnswers.find(w => w.question.id === question.id);
    if (existing) {
      existing.userAnswer = userAnswer;
      existing.addedAt = Date.now();
      existing.mastered = false;
    } else {
      wrongAnswers.push({
        id: generateId(),
        question,
        userAnswer,
        addedAt: Date.now(),
        reviewCount: 0,
        mastered: false
      });
    }
    
    localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
  },

  markWrongMastered(id) {
    const wrongAnswers = this.getWrongAnswers();
    const item = wrongAnswers.find(w => w.id === id);
    if (item) {
      item.mastered = true;
      localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
    }
  },

  incrementWrongReview(id) {
    const wrongAnswers = this.getWrongAnswers();
    const item = wrongAnswers.find(w => w.id === id);
    if (item) {
      item.reviewCount = (item.reviewCount || 0) + 1;
      localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
    }
  },

  deleteWrongAnswer(id) {
    let wrongAnswers = this.getWrongAnswers();
    wrongAnswers = wrongAnswers.filter(w => w.id !== id);
    localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
  },

  // ==================== User Stats ====================

  getStats() {
    return JSON.parse(localStorage.getItem('userStats') || '{"totalPracticed":0,"totalCorrect":0}');
  },

  updateStats(updates) {
    const stats = this.getStats();
    if (updates.totalPracticed) {
      stats.totalPracticed = (stats.totalPracticed || 0) + updates.totalPracticed;
    }
    if (updates.totalCorrect) {
      stats.totalCorrect = (stats.totalCorrect || 0) + updates.totalCorrect;
    }
    localStorage.setItem('userStats', JSON.stringify(stats));
  },

  // ==================== Exam Records ====================

  getExamRecords() {
    return JSON.parse(localStorage.getItem('examRecords') || '[]');
  },

  saveExamRecord(record) {
    const records = this.getExamRecords();
    records.unshift({ id: generateId(), ...record });
    // Keep last 50 records
    if (records.length > 50) {
      records.pop();
    }
    localStorage.setItem('examRecords', JSON.stringify(records));
  },

  // ==================== Export/Import ====================

  exportAllData() {
    return {
      questionBanks: this.getBanks(),
      wrongAnswers: this.getWrongAnswers(),
      userStats: this.getStats(),
      examRecords: this.getExamRecords(),
      exportedAt: Date.now()
    };
  },

  importAllData(data) {
    if (data.questionBanks) {
      localStorage.setItem('questionBanks', JSON.stringify(data.questionBanks));
    }
    if (data.wrongAnswers) {
      localStorage.setItem('wrongAnswers', JSON.stringify(data.wrongAnswers));
    }
    if (data.userStats) {
      localStorage.setItem('userStats', JSON.stringify(data.userStats));
    }
    if (data.examRecords) {
      localStorage.setItem('examRecords', JSON.stringify(data.examRecords));
    }
  },

  clearAllData() {
    localStorage.removeItem('questionBanks');
    localStorage.removeItem('wrongAnswers');
    localStorage.removeItem('userStats');
    localStorage.removeItem('examRecords');
  }
};

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
