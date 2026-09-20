(function () {
  'use strict';

  var STORAGE_KEY = 'japanEducationProgress';
  var page = window.location.pathname.split('/').pop() || 'index.html';
  var state = loadState();
  var kanjiCatalog = [];
  var kanaGojuon = [
    ['a', 'あ', 'ア', 'আ'], ['i', 'い', 'イ', 'ই'], ['u', 'う', 'ウ', 'উ'], ['e', 'え', 'エ', 'এ'], ['o', 'お', 'オ', 'ও'],
    ['ka', 'か', 'カ', 'কা'], ['ki', 'き', 'キ', 'কি'], ['ku', 'く', 'ク', 'কু'], ['ke', 'け', 'ケ', 'কে'], ['ko', 'こ', 'コ', 'কো'],
    ['sa', 'さ', 'サ', 'সা'], ['shi', 'し', 'シ', 'শি'], ['su', 'す', 'ス', 'সু'], ['se', 'せ', 'セ', 'সে'], ['so', 'そ', 'ソ', 'সো'],
    ['ta', 'た', 'タ', 'তা'], ['chi', 'ち', 'チ', 'চি'], ['tsu', 'つ', 'ツ', 'ৎসু'], ['te', 'て', 'テ', 'তে'], ['to', 'と', 'ト', 'তো'],
    ['na', 'な', 'ナ', 'না'], ['ni', 'に', 'ニ', 'নি'], ['nu', 'ぬ', 'ヌ', 'নু'], ['ne', 'ね', 'ネ', 'নে'], ['no', 'の', 'ノ', 'নো'],
    ['ha', 'は', 'ハ', 'হা'], ['hi', 'ひ', 'ヒ', 'হি'], ['fu', 'ふ', 'フ', 'ফু'], ['he', 'へ', 'ヘ', 'হে'], ['ho', 'ほ', 'ホ', 'হো'],
    ['ma', 'ま', 'マ', 'মা'], ['mi', 'み', 'ミ', 'মি'], ['mu', 'む', 'ム', 'মু'], ['me', 'め', 'メ', 'মে'], ['mo', 'も', 'モ', 'মো'],
    ['ya', 'や', 'ヤ', 'ইয়া'], ['yu', 'ゆ', 'ユ', 'ইউ'], ['yo', 'よ', 'ヨ', 'ইয়ো'],
    ['ra', 'ら', 'ラ', 'রা'], ['ri', 'り', 'リ', 'রি'], ['ru', 'る', 'ル', 'রু'], ['re', 'れ', 'レ', 'রে'], ['ro', 'ろ', 'ロ', 'রো'],
    ['wa', 'わ', 'ワ', 'ওয়া'], ['wo', 'を', 'ヲ', 'ও'], ['n', 'ん', 'ン', 'ন']
  ].map(function (item) { return { romaji: item[0], hiragana: item[1], katakana: item[2], banglaPronunciation: item[3] }; });
  var kanaCategories = {
    Gojuon: kanaGojuon,
    Dakuon: [['ga', 'が', 'ガ', 'গা'], ['gi', 'ぎ', 'ギ', 'গি'], ['gu', 'ぐ', 'グ', 'গু'], ['ge', 'げ', 'ゲ', 'গে'], ['go', 'ご', 'ゴ', 'গো'], ['za', 'ざ', 'ザ', 'জা'], ['ji', 'じ', 'ジ', 'জি'], ['zu', 'ず', 'ズ', 'জু'], ['ze', 'ぜ', 'ゼ', 'জে'], ['zo', 'ぞ', 'ゾ', 'জো'], ['da', 'だ', 'ダ', 'দা'], ['ji', 'ぢ', 'ヂ', 'জি'], ['zu', 'づ', 'ヅ', 'জু'], ['de', 'で', 'デ', 'দে'], ['do', 'ど', 'ド', 'দো'], ['ba', 'ば', 'バ', 'বা'], ['bi', 'び', 'ビ', 'বি'], ['bu', 'ぶ', 'ブ', 'বু'], ['be', 'べ', 'ベ', 'বে'], ['bo', 'ぼ', 'ボ', 'বো']].map(function (item) { return { romaji: item[0], hiragana: item[1], katakana: item[2], banglaPronunciation: item[3] }; }),
    Handakuon: [['pa', 'ぱ', 'パ', 'পা'], ['pi', 'ぴ', 'ピ', 'পি'], ['pu', 'ぷ', 'プ', 'পু'], ['pe', 'ぺ', 'ペ', 'পে'], ['po', 'ぽ', 'ポ', 'পো']].map(function (item) { return { romaji: item[0], hiragana: item[1], katakana: item[2], banglaPronunciation: item[3] }; }),
    Yoon: [['kya', 'きゃ', 'キャ', 'ক্যা'], ['kyu', 'きゅ', 'キュ', 'কিউ'], ['kyo', 'きょ', 'キョ', 'কিয়ো'], ['sha', 'しゃ', 'シャ', 'শা'], ['shu', 'しゅ', 'シュ', 'শু'], ['sho', 'しょ', 'ショ', 'শো'], ['cha', 'ちゃ', 'チャ', 'চা'], ['chu', 'ちゅ', 'チュ', 'চু'], ['cho', 'ちょ', 'チョ', 'চো']].map(function (item) { return { romaji: item[0], hiragana: item[1], katakana: item[2], banglaPronunciation: item[3] }; })
  };
  var curriculum = {
    N5: {
      title: 'Foundation',
      description: 'Everyday words, kana, beginner kanji, and polite patterns.',
      vocabulary: [{ japanese: '食べる', reading: 'たべる', banglaPronunciation: 'তাবেরু', english: 'to eat', bangla: 'খাওয়া', example: '毎日、ご飯を食べます。', exampleEnglish: 'I eat rice every day.', exampleBangla: 'আমি প্রতিদিন ভাত খাই।' }],
      grammar: [{ point: 'です', english: 'is / am / are', bangla: 'হওয়া', explanation: 'Use です to make a polite statement.', example: '私は学生です。', pronunciation: 'ওয়াতাশি ওয়া গাকুসেই দেশু', exampleBangla: 'আমি একজন ছাত্র।' }],
      kanji: [{ character: '日', meaning: 'day / sun', reading: 'ひ・にち', banglaPronunciation: 'হি / নিচি', example: '毎日', exampleMeaning: 'every day' }],
      lessons: ['Greetings and introductions', 'Numbers and time', 'Daily routines', 'Review and practice']
    },
    N4: {
      title: 'Growing fluency',
      description: 'Useful intermediate vocabulary, connected sentences, and daily-life kanji.',
      vocabulary: [{ japanese: '準備する', reading: 'じゅんびする', banglaPronunciation: 'জুম্বি সুরু', english: 'to prepare', bangla: 'প্রস্তুত করা', example: '旅行の準備をします。', exampleEnglish: 'I prepare for the trip.', exampleBangla: 'আমি ভ্রমণের প্রস্তুতি নিই।' }],
      grammar: [{ point: '〜ながら', english: 'while doing', bangla: 'করতে করতে', explanation: 'Join two actions done at the same time.', example: '音楽を聞きながら勉強します。', pronunciation: 'ওঙ্গাকু ও কিকিনাগারা বেনকিয়ো শিমাস', exampleBangla: 'গান শুনতে শুনতে পড়াশোনা করি।' }],
      kanji: [{ character: '習', meaning: 'learn / practice', reading: 'しゅう・ならう', banglaPronunciation: 'শিউ / নারাউ', example: '練習', exampleMeaning: 'practice' }],
      lessons: ['Connected actions with ながら', 'Giving reasons with ので', 'Everyday plans and advice', 'Review and practice']
    },
    N3: {
      title: 'Confident communication',
      description: 'Upper-intermediate expressions, abstract vocabulary, and reading-focused kanji.',
      vocabulary: [{ japanese: '影響', reading: 'えいきょう', banglaPronunciation: 'এইকিয়ো', english: 'influence / effect', bangla: 'প্রভাব', example: '天気は生活に影響します。', exampleEnglish: 'Weather affects daily life.', exampleBangla: 'আবহাওয়া দৈনন্দিন জীবনে প্রভাব ফেলে।' }],
      grammar: [{ point: '〜わけではない', english: 'it does not mean that...', bangla: 'এমন নয় যে...', explanation: 'Softly deny a full or absolute interpretation.', example: '嫌いなわけではありません。', pronunciation: 'কিরাইনা ওয়াকে দে ওয়া আরিমাসেন', exampleBangla: 'এমন নয় যে আমি অপছন্দ করি।' }],
      kanji: [{ character: '際', meaning: 'occasion / when', reading: 'さい・きわ', banglaPronunciation: 'সাই / কিওয়া', example: '利用の際', exampleMeaning: 'when using' }],
      lessons: ['Reading cause and contrast', 'Softening opinions', 'Formal written expressions', 'Review and practice']
    }
  };

  function loadState() {
    try {
      return Object.assign({
        completedLessons: [],
        quizScores: [],
        vocabularyLearned: [],
        favorites: [],
        kanaMastery: {},
        dailyMinutes: 0,
        lastStudyDate: '',
        streak: 0,
        level: 'Beginner'
      }, JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch (error) {
      return { completedLessons: [], quizScores: [], vocabularyLearned: [], favorites: [], kanaMastery: {}, dailyMinutes: 0, lastStudyDate: '', streak: 0, level: 'Beginner' };
    }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { /* WebView storage may be unavailable. */ }
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function recordStudy(minutes) {
    var currentDay = today();
    if (state.lastStudyDate !== currentDay) {
      var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      state.streak = state.lastStudyDate === yesterday ? state.streak + 1 : 1;
      state.lastStudyDate = currentDay;
      state.dailyMinutes = 0;
    }
    state.dailyMinutes += minutes || 1;
    saveState();
  }

  function addSplash() {
    if (sessionStorage.getItem('jeSplashShown')) return;
    sessionStorage.setItem('jeSplashShown', '1');
    var splash = document.createElement('div');
    splash.className = 'je-splash';
    splash.innerHTML = '<img class="je-splash-logo" src="assets/logo.png" alt="Japan Education logo"><strong>Japan Education</strong><span>Create by</span><b>Md Injamam Ul Haque</b>';
    document.body.appendChild(splash);
    window.setTimeout(function () { splash.classList.add('je-splash-hide'); window.setTimeout(function () { splash.remove(); }, 350); }, 900);
  }

  function addOfflineStatus() {
    var status = document.createElement('div');
    status.className = 'je-offline-status';
    status.setAttribute('role', 'status');
    status.textContent = 'Offline mode: your lessons and progress are available on this device.';
    document.body.appendChild(status);
    function update() { status.classList.toggle('je-visible', !navigator.onLine); }
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }

  function speak(text) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }

  function loadKanjiCatalog() {
    fetch('assets/kanji-data.json').then(function (response) { return response.json(); }).then(function (source) {
      var bangla = { '一': ['এক', 'ইচি'], '二': ['দুই', 'নি'], '三': ['তিন', 'সান'], '日': ['দিন / সূর্য', 'হি / নিচি'], '月': ['মাস / চাঁদ', 'গেতসু / সুকি'], '人': ['মানুষ', 'হিতো'], '学': ['পড়াশোনা', 'গাকু'], '食': ['খাওয়া / খাবার', 'তাবেরু'], '水': ['পানি', 'মিজু'], '年': ['বছর', 'তোশি'] };
      kanjiCatalog = Object.keys(source).map(function (character) {
        var item = source[character];
        return { character: character, level: item.jlpt_new === 5 ? 'N5' : (item.jlpt_new === 4 ? 'N4' : 'N3'), frequency: item.freq || 99999, onyomi: (item.readings_on || []).join('・'), kunyomi: (item.readings_kun || []).join('・'), reading: (item.readings_kun || item.readings_on || [''])[0], romaji: '', english: (item.meanings || []).join(' / '), bangla: bangla[character] ? bangla[character][0] : '', pronunciation: bangla[character] ? bangla[character][1] : '', exampleWord: '', exampleRomaji: '', exampleEnglish: '', exampleBangla: '' };
      }).filter(function (item) { return item.level === 'N5' || item.level === 'N4' || item.level === 'N3'; }).sort(function (left, right) { return left.frequency - right.frequency || left.level.localeCompare(right.level); }).slice(0, 500);
      window.dispatchEvent(new Event('je-kanji-data-ready'));
    }).catch(function () { /* The existing local Kanji fallback remains available. */ });
  }

  function updateProgress() {
    document.querySelectorAll('[data-study-streak]').forEach(function (element) { element.textContent = state.streak + ' Days'; });
    document.querySelectorAll('[data-daily-minutes]').forEach(function (element) { element.textContent = Math.min(state.dailyMinutes, 20) + ' / 20 minutes'; });
  }

  function updateFooterBranding() {
    document.querySelectorAll('span').forEach(function (element) {
      if (element.textContent.indexOf('Version 3.2.0') !== -1) element.textContent = 'Version 2026 september > Md injamam ul haque for Bengali Nihongo Learners';
    });
  }

  function levelProgress(level) {
    var saved = state.levels && state.levels[level];
    if (!saved) return { vocabulary: 0, grammar: 0, kanji: 0, quiz: 0 };
    return { vocabulary: saved.vocabulary || 0, grammar: saved.grammar || 0, kanji: saved.kanji || 0, quiz: saved.quiz || 0 };
  }

  function levelOverall(level) {
    var progress = levelProgress(level);
    return Math.round((progress.vocabulary + progress.grammar + progress.kanji + progress.quiz) / 4);
  }

  function levelUnlocked(level) {
    return level === 'N5' || levelOverall(level === 'N4' ? 'N5' : 'N4') >= 70;
  }

  function saveLevelProgress(level, category) {
    state.levels = state.levels || {};
    state.levels[level] = state.levels[level] || {};
    state.levels[level][category] = Math.min(100, (state.levels[level][category] || 0) + 25);
    state.level = level;
    recordStudy(2);
    saveState();
    renderLevels();
  }

  function addLevelLink() {
    if (page !== 'index.html' || !document.querySelector('main') || document.getElementById('je-level-link')) return;
    var section = document.createElement('section');
    section.id = 'je-level-link';
    section.className = 'px-4 pb-4';
    section.innerHTML = '<a href="levels.html" class="flex items-center justify-between gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm"><span><strong class="font-headline-sm text-headline-sm text-on-surface">JLPT Level Path</strong><span class="block font-body-sm text-body-sm text-secondary">N5 → N4 → N3 • vocabulary, grammar and kanji</span></span><span class="material-symbols-outlined text-primary">arrow_forward</span></a>';
    document.querySelector('main').appendChild(section);
  }

  function courseLessons(level) {
    state.courseLessons = state.courseLessons || {};
    state.courseLessons[level] = state.courseLessons[level] || [];
    return state.courseLessons[level];
  }

  function showLesson(root, level, lessonIndex) {
    var lessons = curriculum[level].lessons;
    var completed = courseLessons(level);
    var detail = root.querySelector('.je-level-detail');
    if (!detail) { detail = document.createElement('div'); detail.className = 'je-level-detail'; root.appendChild(detail); }
    if (lessonIndex > 0 && !completed[lessonIndex - 1]) {
      detail.innerHTML = '<button class="je-detail-close" type="button">Close</button><span class="je-level-kicker">' + level + ' COURSE</span><h2>Please complete Lesson ' + lessonIndex + ' first.</h2><p>Lessons stay visible, but this activity follows the learning order.</p><button class="je-quiz-button" data-start-lesson="' + (lessonIndex - 1) + '">Go to Lesson ' + lessonIndex + '</button>';
      detail.querySelector('[data-start-lesson]').addEventListener('click', function () { detail.remove(); showLesson(root, level, lessonIndex - 1); });
    } else {
      detail.innerHTML = '<button class="je-detail-close" type="button">Close</button><span class="je-level-kicker">' + level + ' LESSON ' + (lessonIndex + 1) + '</span><h2>' + lessons[lessonIndex] + '</h2><p>Study the Japanese examples, English meaning, Bangla meaning, and Bangla pronunciation in this lesson.</p><button class="je-quiz-button" data-complete-lesson="' + lessonIndex + '">' + (completed[lessonIndex] ? 'Review completed lesson' : 'Complete Lesson ' + (lessonIndex + 1)) + '</button>';
      detail.querySelector('[data-complete-lesson]').addEventListener('click', function () {
        completed[lessonIndex] = true;
        saveState();
        detail.remove();
        renderLevels();
      });
    }
    detail.querySelector('.je-detail-close').addEventListener('click', function () { detail.remove(); });
  }

  function normalizeLevelCards(root) {
    root.querySelectorAll('.je-level-card').forEach(function (card, cardIndex) {
      var level = Object.keys(curriculum)[cardIndex];
      card.classList.remove('je-level-locked');
      card.querySelectorAll('[disabled]').forEach(function (control) { control.removeAttribute('disabled'); });
      var status = card.querySelector('.je-level-status');
      if (status && status.textContent.indexOf('Locked') !== -1) status.textContent = 'Available';
      var percentage = card.querySelector('.je-level-head > strong');
      if (percentage && percentage.textContent.indexOf('🔒') !== -1) percentage.textContent = '0%';
      var openButton = document.createElement('button');
      openButton.className = 'je-level-open';
      openButton.type = 'button';
      openButton.textContent = 'Open ' + level + ' course';
      openButton.setAttribute('data-open-level', level);
      card.querySelector('.je-level-head').appendChild(openButton);
      var lessonList = document.createElement('div');
      lessonList.className = 'je-course-lessons';
      lessonList.innerHTML = '<strong>Lessons</strong>' + curriculum[level].lessons.map(function (lesson, index) { return '<button type="button" data-course-level="' + level + '" data-lesson-index="' + index + '"><span>Lesson ' + (index + 1) + '</span><small>' + lesson + '</small></button>'; }).join('');
      card.appendChild(lessonList);
      lessonList.querySelectorAll('[data-lesson-index]').forEach(function (lessonButton) { lessonButton.addEventListener('click', function () { showLesson(root, level, Number(lessonButton.getAttribute('data-lesson-index'))); }); });
      openButton.addEventListener('click', function () { card.scrollIntoView({ behavior: 'smooth', block: 'start' }); openButton.focus(); });
    });
  }

  function renderLevels() {
    var root = document.getElementById('je-levels-app');
    if (!root) return;
    root.innerHTML = '<div class="je-level-intro"><span>JLPT LEARNING PATH</span><h1>Choose your level</h1><p>Build from N5 foundations to N3 reading confidence. Completed levels stay open for review.</p></div>' + Object.keys(curriculum).map(function (level) {
      var data = curriculum[level];
      var progress = levelProgress(level);
      var overall = levelOverall(level);
      var unlocked = true;
      var status = overall >= 100 ? 'Completed' : (unlocked ? (overall ? 'In progress' : 'Available') : 'Locked');
      return '<article class="je-level-card ' + (unlocked ? '' : 'je-level-locked') + '"><div class="je-level-head"><div><span class="je-level-kicker">JLPT ' + level + '</span><h2>' + data.title + '</h2><p>' + data.description + '</p></div><strong>' + (unlocked ? overall + '%' : '🔒') + '</strong></div><div class="je-level-bar"><i style="width:' + overall + '%"></i></div><div class="je-level-status">' + status + (level !== 'N5' && !unlocked ? ' • Complete ' + (level === 'N4' ? 'N5' : 'N4') + ' to unlock' : '') + '</div><div class="je-level-columns"><div><b>Vocabulary</b><span>' + progress.vocabulary + '%</span><button data-level="' + level + '" data-category="vocabulary" ' + (unlocked ? '' : 'disabled') + '>Open words</button></div><div><b>Grammar</b><span>' + progress.grammar + '%</span><button data-level="' + level + '" data-category="grammar" ' + (unlocked ? '' : 'disabled') + '>Open lesson</button></div><div><b>Kanji</b><span>' + progress.kanji + '%</span><button data-level="' + level + '" data-category="kanji" ' + (unlocked ? '' : 'disabled') + '>Open kanji</button></div><div><b>Flashcards</b><span>Review words</span><button data-level="' + level + '" data-category="vocabulary" ' + (unlocked ? '' : 'disabled') + '>Open cards</button></div></div><div class="je-level-example"><strong>' + data.vocabulary[0].japanese + ' • ' + data.vocabulary[0].banglaPronunciation + '</strong><span>' + data.vocabulary[0].english + ' • ' + data.vocabulary[0].bangla + '</span><small>' + data.vocabulary[0].example + '<br>' + data.vocabulary[0].exampleBangla + '</small></div><button class="je-quiz-button" data-level-quiz="' + level + '" ' + (unlocked ? '' : 'disabled') + '>Practice ' + level + ' quiz</button></article>';
    }).join('');
    normalizeLevelCards(root);
    root.querySelectorAll('[data-level]').forEach(function (button) {
      button.addEventListener('click', function () {
        var level = button.getAttribute('data-level');
        var category = button.getAttribute('data-category');
        var item = curriculum[level][category][0];
        var detail = root.querySelector('.je-level-detail');
        if (!detail) { detail = document.createElement('div'); detail.className = 'je-level-detail'; root.appendChild(detail); }
        detail.innerHTML = '<button class="je-detail-close" type="button">Close</button><span class="je-level-kicker">' + level + ' ' + category + '</span><h2>' + (item.character || item.point || item.japanese) + '</h2><p>' + (item.explanation || item.meaning || item.english) + '</p><p><b>Bangla:</b> ' + (item.bangla || item.banglaPronunciation || item.exampleMeaning) + '</p><p><b>Example:</b> ' + item.example + '</p><button class="je-quiz-button" data-complete-level="' + level + '" data-complete-category="' + category + '">Mark as learned</button>';
        detail.querySelector('.je-detail-close').addEventListener('click', function () { detail.remove(); });
        detail.querySelector('[data-complete-level]').addEventListener('click', function () { saveLevelProgress(level, category); detail.remove(); });
      });
    });
    root.querySelectorAll('[data-level-quiz]').forEach(function (button) { button.addEventListener('click', function () { saveLevelProgress(button.getAttribute('data-level-quiz'), 'quiz'); }); });
  }

  function setupAlphabetTabs() {
    if (page !== 'alphabet.html') return;
    var tabSection = document.getElementById('tab-hiragana')?.closest('section');
    if (!tabSection) return;
    var following = Array.from(document.querySelectorAll('main > section')).filter(function (section) { return section !== tabSection && tabSection.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING; });
    var panel = document.createElement('section');
    panel.id = 'je-script-panel';
    panel.className = 'px-4 py-4';
    tabSection.after(panel);
    var activeScript = 'hiragana';
    var selectedCategory = 'Gojuon';
    var kanjiData = [{ char: '人', reading: 'ひと', onyomi: 'ジン', kunyomi: 'ひと', pronunciation: 'হিতো', english: 'person', bangla: 'মানুষ', example: '日本人 • Japanese person' }, { char: '学', reading: 'がく', onyomi: 'ガク', kunyomi: 'まなぶ', pronunciation: 'গাকু', english: 'study', bangla: 'পড়াশোনা', example: '学校 • school' }, { char: '食', reading: 'しょく', onyomi: 'ショク', kunyomi: 'たべる', pronunciation: 'শোকু', english: 'eat / food', bangla: 'খাওয়া / খাবার', example: '食べる • to eat' }, { char: '水', reading: 'みず', onyomi: 'スイ', kunyomi: 'みず', pronunciation: 'মিজু', english: 'water', bangla: 'পানি', example: '水を飲む • drink water' }];
    function kanaCard(item, mode) {
      var character = mode === 'katakana' ? item.katakana : item.hiragana;
      return '<button class="je-script-card bg-surface-container-low p-3 rounded-xl text-left" data-speak="' + character + '"><strong class="text-primary text-[28px]">' + character + '</strong><span class="block font-label-sm text-label-sm">' + item.romaji.toUpperCase() + ' • ' + item.banglaPronunciation + '</span><small class="text-secondary">' + item.hiragana + ' ↔ ' + item.katakana + '</small></button>';
    }
    function renderKanaPanel(mode) {
      var title = mode === 'hiragana' ? 'Hiragana • ひらがな' : 'Katakana • カタカナ';
      panel.innerHTML = '<div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm"><h2 class="font-headline-sm text-headline-sm text-on-surface">' + title + '</h2><p class="font-body-sm text-body-sm text-secondary">Romaji → Japanese → Bangla pronunciation</p><div class="grid grid-cols-2 gap-2 mt-3">' + kanaCategories[selectedCategory].map(function (item) { return kanaCard(item, mode); }).join('') + '</div></div>';
    }
    function renderKanjiPanel() {
      var records = kanjiCatalog.length ? kanjiCatalog : kanjiData.map(function (item) { return { character: item.char, level: 'N5', reading: item.reading, onyomi: item.onyomi, kunyomi: item.kunyomi, pronunciation: item.pronunciation, english: item.english, bangla: item.bangla, exampleWord: item.example, exampleEnglish: '', exampleBangla: '' }; });
      panel.innerHTML = '<div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm"><h2 class="font-headline-sm text-headline-sm text-on-surface">Kanji learning • 漢字</h2><p class="font-body-sm text-body-sm text-secondary">' + records.length + ' local N5-N3 Kanji • search by character, Romaji, English or Bangla</p><div class="flex gap-2 mt-3"><input id="je-kanji-search" class="min-w-0 flex-1 rounded-lg bg-surface-container-low p-2" type="search" placeholder="Search 漢字, English or বাংলা"><select id="je-kanji-level" class="rounded-lg bg-surface-container-low p-2"><option value="all">All</option><option>N5</option><option>N4</option><option>N3</option></select></div><div id="je-kanji-results" class="grid gap-2 mt-3"></div></div>';
      var results = panel.querySelector('#je-kanji-results');
      function updateResults() {
        var query = panel.querySelector('#je-kanji-search').value.toLowerCase().trim();
        var level = panel.querySelector('#je-kanji-level').value;
        var matches = records.filter(function (item) { var haystack = [item.character, item.reading, item.romaji, item.english, item.bangla, item.pronunciation].join(' ').toLowerCase(); return (level === 'all' || item.level === level) && (!query || haystack.indexOf(query) !== -1); }).slice(0, query ? 100 : 40);
        results.innerHTML = matches.map(function (item) { return '<button class="je-script-card bg-surface-container-low p-3 rounded-xl text-left" data-speak="' + item.character + '"><strong class="text-primary text-[28px]">' + item.character + '</strong><span class="block font-label-sm text-label-sm">' + item.level + ' • Reading: ' + (item.reading || 'See readings') + ' • ' + (item.pronunciation || 'Bangla pronunciation') + '</span><small class="block text-secondary">Onyomi: ' + (item.onyomi || '—') + ' • Kunyomi: ' + (item.kunyomi || '—') + '</small><small class="block text-secondary">' + (item.english || 'Meaning available in source data') + (item.bangla ? ' • ' + item.bangla : '') + '</small></button>'; }).join('') || '<p class="text-secondary">No matching Kanji found.</p>';
      }
      panel.querySelector('#je-kanji-search').addEventListener('input', updateResults);
      panel.querySelector('#je-kanji-level').addEventListener('change', updateResults);
      updateResults();
    }
    function show(name) {
      var isHiragana = name === 'hiragana';
      activeScript = name;
      following.forEach(function (section) { section.style.display = isHiragana ? '' : 'none'; });
      panel.style.display = '';
      if (name === 'kanji') renderKanjiPanel(); else renderKanaPanel(name);
      document.querySelectorAll('#tab-hiragana,#tab-katakana,#tab-kanji').forEach(function (button) { button.classList.toggle('bg-surface-container-lowest', button.id === 'tab-' + name); button.classList.toggle('text-primary', button.id === 'tab-' + name); });
    }
    ['hiragana', 'katakana', 'kanji'].forEach(function (name) { var button = document.getElementById('tab-' + name); if (button) button.addEventListener('click', function () { show(name); }); });
    window.addEventListener('je-kanji-data-ready', function () { if (activeScript === 'kanji') renderKanjiPanel(); });
    show('hiragana');
    Object.keys(kanaCategories).forEach(function (category) {
      var categoryButton = Array.from(document.querySelectorAll('main button')).find(function (button) { return button.textContent.indexOf(category) !== -1; });
      if (categoryButton) categoryButton.addEventListener('click', function () { selectedCategory = category; if (activeScript !== 'kanji') renderKanaPanel(activeScript); });
    });
    document.querySelectorAll('main button').forEach(function (button) {
      if (button.id || button.classList.contains('kana-card')) return;
      button.addEventListener('click', function () {
        document.querySelectorAll('main button').forEach(function (item) { item.classList.remove('bg-primary', 'text-on-primary'); });
        button.classList.add('bg-primary', 'text-on-primary');
      });
    });
    var alphabetQuiz = Array.from(document.querySelectorAll('main button')).find(function (button) { return button.textContent.indexOf('কুইজ টেস্ট') !== -1; });
    if (alphabetQuiz) alphabetQuiz.addEventListener('click', function () { window.location.href = 'quiz.html'; });
  }

  function wireLearningActions() {
    document.addEventListener('click', function (event) {
      var target = event.target.closest('button, a');
      if (!target) return;

      if (target.matches('.kana-card')) {
        var character = target.getAttribute('data-char');
        if (character) state.kanaMastery[character] = true;
        recordStudy(1);
      }

      if (target.id === 'bookmark-btn' || target.id === 'favorite-toggle') {
        var item = page + ':' + (document.querySelector('h1') || {}).textContent;
        if (item && item !== page + ':undefined') {
          var index = state.favorites.indexOf(item);
          if (index === -1) state.favorites.push(item); else state.favorites.splice(index, 1);
          saveState();
        }
      }

      if (target.id === 'next-step-btn') {
        if (state.completedLessons.indexOf('lesson-3') === -1) state.completedLessons.push('lesson-3');
        recordStudy(5);
      }

      if (target.classList.contains('practice-opt') || target.closest('#options-group')) recordStudy(1);

      var japanese = target.closest('[data-speak]');
      if (japanese) speak(japanese.getAttribute('data-speak'));
    });

    ['main-audio-btn', 'speaker-btn', 'audio-btn', 'dialogue-audio-btn'].forEach(function (id) {
      var button = document.getElementById(id);
      if (button) button.addEventListener('click', function () {
        var japanese = document.querySelector('.font-body-cjk-char, .font-body-cjk-char-mobile, h1');
        speak(japanese ? japanese.textContent.trim() : 'こんにちは');
      });
    });

    document.querySelectorAll('.kana-card').forEach(function (card) {
      card.setAttribute('data-speak', card.getAttribute('data-char') || 'こんにちは');
    });
    updateProgress();
  }

  function registerWorker() {
    var headerLogo = document.querySelector('img[alt="Japan Education Logo"]');
    if (headerLogo) headerLogo.src = 'assets/logo.png';
    var manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = 'manifest.webmanifest';
    document.head.appendChild(manifest);
    var themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#b7131a';
    document.head.appendChild(themeColor);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(function () { /* Offline enhancement is optional in restricted WebViews. */ });
  }

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = '.je-splash{position:fixed;inset:0;z-index:1000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#f8f9ff;color:#0b1c30;font-family:Plus Jakarta Sans,Noto Sans,sans-serif;opacity:1;transition:opacity .35s ease}.je-splash-logo{width:128px;height:128px;object-fit:cover;border-radius:50%;box-shadow:0 8px 24px rgba(11,28,48,.16);margin-bottom:8px}.je-splash strong{font-size:24px;color:#b7131a}.je-splash span{font-size:12px;color:#545f73}.je-splash b{font-size:14px;color:#0b1c30}.je-splash-hide{opacity:0;pointer-events:none}.je-offline-status{position:fixed;left:12px;right:12px;bottom:72px;z-index:60;padding:9px 12px;border-radius:10px;background:#0b1c30;color:#fff;font:600 12px/1.4 Plus Jakarta Sans,Noto Sans,sans-serif;text-align:center;opacity:0;transform:translateY(8px);transition:opacity .2s ease,transform .2s ease;pointer-events:none}.je-offline-status.je-visible{opacity:1;transform:translateY(0)}';
    document.head.appendChild(style);
  }

  injectStyles();
  addSplash();
  addOfflineStatus();
  wireLearningActions();
  updateFooterBranding();
  addLevelLink();
  setupAlphabetTabs();
  renderLevels();
  loadKanjiCatalog();
  registerWorker();
}());
