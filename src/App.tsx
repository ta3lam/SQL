import { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonContent } from './components/LessonContent';
import { SQLEditor } from './components/SQLEditor';
import { ExercisePanel } from './components/ExercisePanel';
import { DatabaseSchema } from './components/DatabaseSchema';
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

  // Company module state
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

  // DVD module state
  const [currentModule, setCurrentModule] = useState<Module>(() => {
    const saved = localStorage.getItem('sql-mastery-module');
    return (saved === 'company' || saved === 'dvd') ? saved : 'company';
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

  // Persist company module state
  useEffect(() => {
    localStorage.setItem('sql-mastery-current-lesson', String(currentLessonId));
  }, [currentLessonId]);

  useEffect(() => {
    localStorage.setItem('sql-mastery-completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Persist module selection and DVD state
  useEffect(() => {
    localStorage.setItem('sql-mastery-module', currentModule);
  }, [currentModule]);

  useEffect(() => {
    localStorage.setItem('sql-mastery-dvd-lesson', String(currentDvdLessonId));
  }, [currentDvdLessonId]);

  useEffect(() => {
    localStorage.setItem('sql-mastery-dvd-completed', JSON.stringify(completedDvdLessons));
  }, [completedDvdLessons]);

  const { loading, error, executeQuery, resetDatabase } = useSQL();

  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];

  // Company module handlers
  const handleLessonComplete = useCallback(() => {
    setCompletedLessons(prev =>
      prev.includes(currentLessonId) ? prev : [...prev, currentLessonId]
    );
  }, [currentLessonId]);

  const goToNextLesson = useCallback(() => {
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex < lessons.length - 1) {
      setCurrentLessonId(lessons[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  }, [currentLessonId]);

  const goToPrevLesson = useCallback(() => {
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex > 0) {
      setCurrentLessonId(lessons[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  }, [currentLessonId]);

  // DVD module handlers
  const handleDvdLessonComplete = useCallback(() => {
    setCompletedDvdLessons(prev =>
      prev.includes(currentDvdLessonId) ? prev : [...prev, currentDvdLessonId]
    );
  }, [currentDvdLessonId]);

  const goToNextDvdLesson = useCallback(() => {
    const currentIndex = dvdLessons.findIndex(l => l.id === currentDvdLessonId);
    if (currentIndex < dvdLessons.length - 1) {
      setCurrentDvdLessonId(dvdLessons[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  }, [currentDvdLessonId]);

  const goToPrevDvdLesson = useCallback(() => {
    const currentIndex = dvdLessons.findIndex(l => l.id === currentDvdLessonId);
    if (currentIndex > 0) {
      setCurrentDvdLessonId(dvdLessons[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  }, [currentDvdLessonId]);

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
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = lessons.findIndex(l => l.id === currentLessonId);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Mobile overlay backdrop — closes sidebar on tap outside */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — fixed drawer on mobile, static on desktop */}
      <div className={`
        fixed lg:static inset-y-0 z-30 flex-shrink-0
        ${isRTL ? 'right-0' : 'left-0'}
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen
          ? 'translate-x-0'
          : isRTL ? 'translate-x-full' : '-translate-x-full'}
        lg:translate-x-0
        ${!sidebarOpen ? 'lg:hidden' : ''}
      `}>
        {currentModule === 'company' ? (
          <Sidebar
            lessons={lessons}
            currentLesson={currentLessonId}
            onSelectLesson={(id) => {
              setCurrentLessonId(id);
              setCurrentView('lesson');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            completedLessons={completedLessons}
            module="company"
          />
        ) : (
          <Sidebar
            lessons={dvdLessons}
            currentLesson={currentDvdLessonId}
            onSelectLesson={(id) => {
              setCurrentDvdLessonId(id);
              setCurrentView('lesson');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            completedLessons={completedDvdLessons}
            module="dvd"
          />
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={t.toggleSidebar}
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Module Switcher */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setCurrentModule('company')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentModule === 'company'
                      ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    🎓 {t.moduleCompany}
                  </span>
                </button>
                <button
                  onClick={() => setCurrentModule('dvd')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentModule === 'dvd'
                      ? 'bg-white dark:bg-gray-600 text-violet-600 dark:text-violet-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    🎬 {t.moduleDvd}
                  </span>
                </button>
              </div>

              {/* View Switcher — only show for company module (DVD has no playground for now) */}
              {currentModule === 'company' && (
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setCurrentView('lesson')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'lesson'
                        ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
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
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'playground'
                        ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
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
              {currentView === 'lesson' && currentModule === 'company' && (
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  {t.lessonOf(currentIndex + 1, lessons.length)}
                </span>
              )}
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

              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors border border-indigo-200 dark:border-indigo-700"
                title={t.switchLang}
              >
                {t.switchLang}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* FIX BUG 8: DVDLessonArea stays mounted (hidden) to avoid re-initializing 7.4MB DB on every module switch */}
          <div className={currentModule === 'dvd' ? 'block' : 'hidden'}>
            <ErrorBoundary>
              <DVDLessonArea
                currentLessonId={currentDvdLessonId}
                completedLessons={completedDvdLessons}
                onLessonComplete={handleDvdLessonComplete}
                onPrev={goToPrevDvdLesson}
                onNext={goToNextDvdLesson}
                isRTL={isRTL}
              />
            </ErrorBoundary>
          </div>
          {currentModule === 'company' && (currentView === 'playground' ? (
            <Playground onExecute={executeQuery} onReset={resetDatabase} />
          ) : (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Lesson Content */}
              <LessonContent lesson={currentLesson} />

              {/* Try It Example */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t.tryItOut}
                </h2>
                <SQLEditor
                  initialValue={currentLesson.example}
                  onExecute={executeQuery}
                  onReset={resetDatabase}
                />
              </div>

              {/* Database Schema */}
              <DatabaseSchema />

              {/* Exercises */}
              {currentLesson.exercises.length > 0 && (
                <ErrorBoundary>
                  <ExercisePanel
                    exercises={currentLesson.exercises}
                    onExecute={executeQuery}
                    onComplete={handleLessonComplete}
                  />
                </ErrorBoundary>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={goToPrevLesson}
                  disabled={currentIndex === 0}
                  className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <NavArrow direction="prev" isRTL={isRTL} />
                  {t.previous}
                </button>

                <div className="flex items-center gap-1">
                  {lessons.slice(Math.max(0, currentIndex - 2), Math.min(lessons.length, currentIndex + 3)).map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setCurrentLessonId(l.id)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        l.id === currentLessonId
                          ? 'bg-indigo-500 w-4'
                          : completedLessons.includes(l.id)
                          ? 'bg-emerald-400'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextLesson}
                  disabled={currentIndex === lessons.length - 1}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all text-sm font-medium"
                >
                  {t.next}
                  <NavArrow direction="next" isRTL={isRTL} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
