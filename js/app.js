/**
 * App Module - Common utilities and UI helpers
 */

// ==================== Utility Functions ====================

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Generate unique ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Format date
 */
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format time duration
 */
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

// ==================== Mobile Menu ====================

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});

// ==================== Sample Data (for demo) ====================

const SampleData = {
  createSampleBank() {
    // Check if already exists
    const banks = Storage.getBanks();
    if (Object.keys(banks).length > 0) return;

    // Create a sample bank
    const bank = Storage.createBank('示例题库', '这是一个包含示例题目的题库');
    
    const sampleQuestions = [
      {
        id: generateId(),
        type: 'choice',
        question: '下列哪个是中国的首都？',
        options: ['上海', '北京', '广州', '深圳'],
        answer: 'B',
        explanation: '北京是中华人民共和国的首都，位于华北平原北部。',
        difficulty: 'easy',
        knowledgePoint: '中国地理',
        source: 'manual',
        createdAt: Date.now()
      },
      {
        id: generateId(),
        type: 'choice',
        question: '1 + 1 等于多少？',
        options: ['1', '2', '3', '4'],
        answer: 'B',
        explanation: '基础算术：1 + 1 = 2',
        difficulty: 'easy',
        knowledgePoint: '基础数学',
        source: 'manual',
        createdAt: Date.now()
      },
      {
        id: generateId(),
        type: 'choice',
        question: '水的化学式是什么？',
        options: ['CO2', 'H2O', 'O2', 'NaCl'],
        answer: 'B',
        explanation: '水由两个氢原子和一个氧原子组成，化学式为H2O。',
        difficulty: 'easy',
        knowledgePoint: '化学基础',
        source: 'manual',
        createdAt: Date.now()
      },
      {
        id: generateId(),
        type: 'choice',
        question: '《红楼梦》的作者是谁？',
        options: ['罗贯中', '吴承恩', '曹雪芹', '施耐庵'],
        answer: 'C',
        explanation: '《红楼梦》是清代作家曹雪芹创作的长篇小说。',
        difficulty: 'medium',
        knowledgePoint: '中国文学',
        source: 'manual',
        createdAt: Date.now()
      },
      {
        id: generateId(),
        type: 'blank',
        question: '地球绕太阳公转一周需要( )天。',
        options: null,
        answer: '365',
        explanation: '地球绕太阳公转一周约需要365.25天。',
        difficulty: 'medium',
        knowledgePoint: '天文学',
        source: 'manual',
        createdAt: Date.now()
      },
      {
        id: generateId(),
        type: 'blank',
        question: '中国最长的河流是( )。',
        options: null,
        answer: '长江',
        explanation: '长江全长约6300公里，是中国最长的河流。',
        difficulty: 'easy',
        knowledgePoint: '中国地理',
        source: 'manual',
        createdAt: Date.now()
      },
      {
        id: generateId(),
        type: 'truefalse',
        question: '太阳从西边升起。',
        options: null,
        answer: '错误',
        explanation: '太阳从东边升起，西边落下。',
        difficulty: 'easy',
        knowledgePoint: '常识',
        source: 'manual',
        createdAt: Date.now()
      },
      {
        id: generateId(),
        type: 'truefalse',
        question: '人体最大的器官是皮肤。',
        options: null,
        answer: '正确',
        explanation: '皮肤是人体最大的器官，面积约1.5-2平方米。',
        difficulty: 'medium',
        knowledgePoint: '人体科学',
        source: 'manual',
        createdAt: Date.now()
      }
    ];

    sampleQuestions.forEach(q => {
      Storage.addQuestionToBank(bank.id, q);
    });

    console.log('Sample data created');
  }
};

// Create sample data on first visit
if (!localStorage.getItem('sampleDataCreated')) {
  SampleData.createSampleBank();
  localStorage.setItem('sampleDataCreated', 'true');
}

// ==================== Toast Notifications ====================

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white z-50 ${
    type === 'success' ? 'bg-green-600' : 
    type === 'error' ? 'bg-red-600' : 'bg-blue-600'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ==================== Keyboard Shortcuts ====================

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + S to save (prevent default)
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
  }
  
  // Escape to close modals
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
      modal.classList.add('hidden');
    });
  }
});

// ==================== Debug Mode ====================

window.DEBUG = {
  clearAll() {
    if (confirm('This will delete all data. Are you sure?')) {
      Storage.clearAllData();
      localStorage.removeItem('sampleDataCreated');
      location.reload();
    }
  },
  
  exportData() {
    const data = Storage.exportAllData();
    console.log(JSON.stringify(data, null, 2));
    return data;
  },
  
  showStats() {
    console.log('Banks:', Storage.getBanks());
    console.log('Wrong Answers:', Storage.getWrongAnswers());
    console.log('Stats:', Storage.getStats());
    console.log('Exam Records:', Storage.getExamRecords());
  }
};

console.log('🎓 学霸助手 - Debug commands available:');
console.log('  DEBUG.clearAll() - Clear all data');
console.log('  DEBUG.exportData() - Export all data');
console.log('  DEBUG.showStats() - Show current stats');
