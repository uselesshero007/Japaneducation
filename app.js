(function () {
  'use strict';

  var STORAGE_KEY = 'japanEducationProgress';
  var page = window.location.pathname.split('/').pop() || 'index.html';
  var state = loadState();

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

  function updateProgress() {
    document.querySelectorAll('[data-study-streak]').forEach(function (element) { element.textContent = state.streak + ' Days'; });
    document.querySelectorAll('[data-daily-minutes]').forEach(function (element) { element.textContent = Math.min(state.dailyMinutes, 20) + ' / 20 minutes'; });
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
  registerWorker();
}());
