import { useState, useCallback, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonContent } from './components/LessonContent';
import { LessonPane, ResizeHandle } from './components/LessonPane';
import { Playground } from './components/Playground';
import { DVDLessonArea } from './components/DVDLessonArea';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSQL } from './hooks/useSQL';
import { lessons } from './data/lessons';
import { dvdLessons } from './data/lessons_dvd';
import { useLanguage } from './contexts/LanguageContext';

type View = 'lesson' | 'playground';
type Module = 'company' | 'dvd';

// BUG 9: defined outside App to avoid re-creation on every render
function NavArrow({ direction, isRTL }: { direction: 'prev' | 'next'; isRTL: boolean }) {
  const isPrev = direction === 'prev';
  const d = (isPrev !== isRTL) ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7';
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  );
}

export default function App() {
  const { t, isRTL, lang, setLang } = useLanguage();

  // ── Company module state ──────────────────────────────────────
  const [currentLessonId, setCurrentLessonId] = useState<number>(() => {
    const saved = localStorage.getItem('sql-mastery-current-lesson');
    const parsed = saved ? parseInt(saved, 10) : NaN;
    return !isNaN(parsed) && lessons.some(l => l.id === parsed) ? parsed : 1;
  });
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sql-mastery-completed');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) && parsed.every((n: unknown) => typeof n === 'number') ? parsed : [];
    } catch { return []; }
  });

  // ── DVD module state ──────────────────────────────────────────
  const [currentModule, setCurrentModule] = useState<Module>(() => {
    const saved = localStorage.getItem('sql-mastery-module');
    return (saved === 'company' || saved === 'dvd') ? saved : 'dvd';
  });
  const [currentDvdLessonId, setCurrentDvdLessonId] = useState<number>(() => {
    const saved = localStorage.getItem('sql-mastery-dvd-lesson');
    const parsed = saved ? parseInt(saved, 10) : NaN;
    return !isNaN(parsed) ? parsed : 101;
  });
  const [completedDvdLessons, setCompletedDvdLessons] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sql-mastery-dvd-completed');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) && parsed.every((n: unknown) => typeof n === 'number') ? parsed : [];
    } catch { return []; }
  });

  const [currentView, setCurrentView] = useState<View>('lesson');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // PERF 1: DVD SQL only loaded on first visit
  const [dvdEverActivated, setDvdEverActivated] = useState(currentModule === 'dvd');

  // ── Focus mode (hide right panel) ────────────────────────────
  const [focusMode, setFocusMode] = useState(false);

  // ── Dark mode ─────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sql-mastery-dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('sql-mastery-dark', String(darkMode));
  }, [darkMode]);

  // ── Font size (0=14px, 1=16px, 2=18px) ───────────────────────
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('sql-mastery-fontsize');
    const n = saved ? parseInt(saved, 10) : 0;
    return (n >= 0 && n <= 2) ? n : 0;
  });
  useEffect(() => {
    localStorage.setItem('sql-mastery-fontsize', String(fontSize));
  }, [fontSize]);

  // ── Split-pane width (left %) ─────────────────────────────────
  const [leftPct, setLeftPct] = useState<number>(() => {
    const saved = localStorage.getItem('sql-mastery-split');
    const n = saved ? parseFloat(saved) : 58;
    return (n >= 30 && n <= 70) ? n : 58;
  });
  const handleResize = useCallback((pct: number) => {
    setLeftPct(pct);
    localStorage.setItem('sql-mastery-split', String(pct));
  }, []);

  const leftPaneRef = useRef<HTMLDivElement>(null);

  // ── Persist state ─────────────────────────────────────────────
  useEffect(() => { localStorage.setItem('sql-mastery-current-lesson', String(currentLessonId)); }, [currentLessonId]);
  useEffect(() => { localStorage.setItem('sql-mastery-completed', JSON.stringify(completedLessons)); }, [completedLessons]);
  useEffect(() => { localStorage.setItem('sql-mastery-module', currentModule); }, [currentModule]);
  useEffect(() => { localStorage.setItem('sql-mastery-dvd-lesson', String(currentDvdLessonId)); }, [currentDvdLessonId]);
  useEffect(() => { localStorage.setItem('sql-mastery-dvd-completed', JSON.stringify(completedDvdLessons)); }, [completedDvdLessons]);

  const { loading, error, executeQuery, resetDatabase } = useSQL();
  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];

  // ── Company handlers ──────────────────────────────────────────
  const handleLessonComplete = useCallback(() => {
    setCompletedLessons(prev => prev.includes(currentLessonId) ? prev : [...prev, currentLessonId]);
  }, [currentLessonId]);

  const goToNextLesson = useCallback(() => {
    const idx = lessons.findIndex(l => l.id === currentLessonId);
    if (idx < lessons.length - 1) { setCurrentLessonId(lessons[idx + 1].id); leftPaneRef.current?.scrollTo(0, 0); }
  }, [currentLessonId]);

  const goToPrevLesson = useCallback(() => {
    const idx = lessons.findIndex(l => l.id === currentLessonId);
    if (idx > 0) { setCurrentLessonId(lessons[idx - 1].id); leftPaneRef.current?.scrollTo(0, 0); }
  }, [currentLessonId]);

  // ── DVD handlers ──────────────────────────────────────────────
  const handleDvdLessonComplete = useCallback(() => {
    setCompletedDvdLessons(prev => prev.includes(currentDvdLessonId) ? prev : [...prev, currentDvdLessonId]);
  }, [currentDvdLessonId]);

  const goToNextDvdLesson = useCallback(() => {
    const idx = dvdLessons.findIndex(l => l.id === currentDvdLessonId);
    if (idx < dvdLessons.length - 1) setCurrentDvdLessonId(dvdLessons[idx + 1].id);
  }, [currentDvdLessonId]);

  const goToPrevDvdLesson = useCallback(() => {
    const idx = dvdLessons.findIndex(l => l.id === currentDvdLessonId);
    if (idx > 0) setCurrentDvdLessonId(dvdLessons[idx - 1].id);
  }, [currentDvdLessonId]);

  // ── Breadcrumb helpers ────────────────────────────────────────
  const LEVEL_RANGES = [
    [1,3],[4,7],[8,11],[12,14],[15,17],[18,20],[21,25],[26,29],[30,33],[34,38],[39,44]
  ];
  const getLevelLabel = (id: number) => {
    const idx = LEVEL_RANGES.findIndex(([lo, hi]) => id >= lo && id <= hi);
    return idx >= 0 ? t.levels[idx] : '';
  };

  // ── Loading / Error screens ───────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">{t.loadingDb}</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{t.initializingSqlite}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">{t.failedToLoad}</p>
          <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
  const completedPct = Math.round((completedLessons.length / lessons.length) * 100);
  const levelLabel = getLevelLabel(currentLessonId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 z-30 flex-shrink-0
        ${isRTL ? 'right-0' : 'left-0'}
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
        lg:translate-x-0
        ${!sidebarOpen ? 'lg:hidden' : ''}
      `}>
        {currentModule === 'company' ? (
          <Sidebar
            lessons={lessons}
            currentLesson={currentLessonId}
            onSelectLesson={(id) => { setCurrentLessonId(id); setCurrentView('lesson'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
            completedLessons={completedLessons}
            onResetProgress={() => setCompletedLessons([])}
            module="company"
          />
        ) : (
          <Sidebar
            lessons={dvdLessons}
            currentLesson={currentDvdLessonId}
            onSelectLesson={(id) => { setCurrentDvdLessonId(id); setCurrentView('lesson'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
            completedLessons={completedDvdLessons}
            onResetProgress={() => setCompletedDvdLessons([])}
            module="dvd"
          />
        )}
      </div>

      {/* Main */}
      <main id="main-content" className="flex-1 overflow-hidden min-w-0 flex flex-col" tabIndex={-1}>

        {/* ── Header ── */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 flex-shrink-0">
          {/* Overall progress strip */}
          {currentView === 'lesson' && (
            <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-700">
              <div
                className="h-0.5 progress-shimmer transition-all duration-700"
                style={{ width: currentModule === 'dvd'
                  ? `${Math.round((completedDvdLessons.length / dvdLessons.length) * 100)}%`
                  : `${completedPct}%` }}
              />
            </div>
          )}

          <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={t.toggleSidebar} aria-label={t.toggleSidebar} aria-expanded={sidebarOpen}
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Module switcher */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => { setCurrentModule('dvd'); setDvdEverActivated(true); }}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentModule === 'dvd' ? 'bg-white dark:bg-gray-600 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                >
                  <span className="flex items-center gap-1.5">🎬 {t.moduleDvd}</span>
                </button>
                <button
                  onClick={() => setCurrentModule('company')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentModule === 'company' ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                >
                  <span className="flex items-center gap-1.5">🎓 {t.moduleCompany}</span>
                </button>
              </div>

              {/* View switcher — company only */}
              {currentModule === 'company' && (
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setCurrentView('lesson')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentView === 'lesson' ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {t.lessons}
                    </span>
                  </button>
                  <button
                    onClick={() => setCurrentView('playground')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentView === 'playground' ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      {t.playground}
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Focus mode toggle */}
              {currentView === 'lesson' && (
                <button
                  onClick={() => setFocusMode(f => !f)}
                  title={focusMode ? (lang === 'ar' ? 'إظهار اللوحة' : 'Show panel') : (lang === 'ar' ? 'وضع التركيز' : 'Focus mode')}
                  className={`p-2 rounded-lg transition-colors ${focusMode ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {focusMode ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  )}
                </button>
              )}

              {/* Font size toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setFontSize(f => Math.max(0, f - 1))}
                  disabled={fontSize === 0}
                  title="Decrease font size"
                  className="px-2 py-1 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
                >A-</button>
                <button
                  onClick={() => setFontSize(f => Math.min(2, f + 1))}
                  disabled={fontSize === 2}
                  title="Increase font size"
                  className="px-2 py-1 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
                >A+</button>
              </div>

              {/* Lesson counter */}
              {currentView === 'lesson' && currentModule === 'company' && (
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  {t.lessonOf(currentIndex + 1, lessons.length)}
                </span>
              )}
              {currentView === 'lesson' && currentModule === 'dvd' && (
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  {t.lessonOf(dvdLessons.findIndex(l => l.id === currentDvdLessonId) + 1, dvdLessons.length)}
                </span>
              )}

              {/* Reset DB */}
              {currentModule === 'company' && (
                <button
                  onClick={resetDatabase}
                  className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={t.resetDbTitle}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t.resetDb}
                </button>
              )}

              {/* Dark mode */}
              <button
                onClick={() => setDarkMode(d => !d)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={darkMode ? t.lightMode : t.darkMode} aria-label={darkMode ? t.lightMode : t.darkMode}
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Language switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors border border-indigo-200 dark:border-indigo-700"
              >
                {t.switchLang}
              </button>
            </div>
          </div>

          {/* Breadcrumb — lesson view only */}
          {currentModule === 'company' && currentView === 'lesson' && levelLabel && (
            <div className="px-4 sm:px-6 pb-2 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <span>{levelLabel}</span>
              <span>›</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium truncate">
                {lang === 'ar' && currentLesson.titleAr ? currentLesson.titleAr : currentLesson.title}
              </span>
              <span className="ms-auto hidden sm:flex items-center gap-1 text-indigo-500 dark:text-indigo-400 font-medium">
                {completedPct}%
              </span>
            </div>
          )}
        </header>

        {/* ── Content ── */}
        <div className="flex-1 overflow-hidden">

          {/* DVD module — stays mounted to avoid re-init */}
          <div className={`h-full ${currentModule === 'dvd' ? 'block' : 'hidden'}`}>
            <ErrorBoundary>
              <DVDLessonArea
                currentLessonId={currentDvdLessonId}
                completedLessons={completedDvdLessons}
                onLessonComplete={handleDvdLessonComplete}
                onPrev={goToPrevDvdLesson}
                onNext={goToNextDvdLesson}
                isRTL={isRTL}
                focusMode={focusMode}
                fontSize={fontSize}
                shouldLoad={dvdEverActivated}
              />
            </ErrorBoundary>
          </div>

          {currentModule === 'company' && (
            currentView === 'playground' ? (
              <div className="h-full overflow-y-auto p-4 sm:p-6">
                <Playground onExecute={executeQuery} onReset={resetDatabase} />
              </div>
            ) : (
              /* ── Split-pane lesson view ── */
              <div className="flex h-full overflow-hidden">

                {/* LEFT — lesson content (scrollable) */}
                <div
                  ref={leftPaneRef}
                  className="overflow-y-auto flex-shrink-0 p-4 sm:p-6 transition-all duration-300"
                  style={{ width: focusMode ? '100%' : `${leftPct}%` }}
                >
                  <div className="max-w-2xl mx-auto space-y-6">
                    <LessonContent
                      lesson={currentLesson}
                      fontSize={fontSize}
                    />

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={goToPrevLesson}
                        disabled={currentIndex === 0}
                        aria-label={t.previous}
                        className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        <NavArrow direction="prev" isRTL={isRTL} />
                        {t.previous}
                      </button>

                      <div className="flex items-center gap-1" role="group" aria-label="lesson progress">
                        {lessons.slice(Math.max(0, currentIndex - 2), Math.min(lessons.length, currentIndex + 3)).map((l) => (
                          <button
                            key={l.id}
                            onClick={() => setCurrentLessonId(l.id)}
                            aria-label={`Lesson ${l.id}`}
                            aria-current={l.id === currentLessonId ? 'true' : undefined}
                            className={`w-2 h-2 rounded-full transition-all ${
                              l.id === currentLessonId ? 'bg-indigo-500 w-4'
                              : completedLessons.includes(l.id) ? 'bg-emerald-400'
                              : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={goToNextLesson}
                        disabled={currentIndex === lessons.length - 1}
                        aria-label={t.next}
                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all text-sm font-medium"
                      >
                        {t.next}
                        <NavArrow direction="next" isRTL={isRTL} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resize handle */}
                {!focusMode && <ResizeHandle leftPct={leftPct} onResize={handleResize} isRTL={isRTL} />}

                {/* RIGHT — sticky panel (editor + exercises) */}
                <div
                  className={`overflow-y-auto p-4 sm:p-5 bg-gray-50 dark:bg-gray-900 border-s border-gray-200 dark:border-gray-700 transition-all duration-300 ${focusMode ? 'w-0 p-0 opacity-0 overflow-hidden' : 'flex-1'}`}
                >
                  <LessonPane
                    lesson={currentLesson}
                    isCompleted={completedLessons.includes(currentLessonId)}
                    onExecute={executeQuery}
                    onReset={resetDatabase}
                    onComplete={handleLessonComplete}
                  />
                </div>

              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
