import { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonContent } from './components/LessonContent';
import { SQLEditor } from './components/SQLEditor';
import { ExercisePanel } from './components/ExercisePanel';
import { DatabaseSchema } from './components/DatabaseSchema';
import { Playground } from './components/Playground';
import { useSQL } from './hooks/useSQL';
import { lessons } from './data/lessons';

type View = 'lesson' | 'playground';

export default function App() {
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<View>('lesson');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { loading, error, executeQuery, resetDatabase } = useSQL();

  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];

  const handleLessonComplete = useCallback(() => {
    if (!completedLessons.includes(currentLessonId)) {
      setCompletedLessons(prev => [...prev, currentLessonId]);
    }
  }, [currentLessonId, completedLessons]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center" dir="ltr">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Loading database engine...</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Initializing SQLite WASM</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center" dir="ltr">
        <div className="text-center bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">Failed to load database</p>
          <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = lessons.findIndex(l => l.id === currentLessonId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex" dir="ltr">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block flex-shrink-0`}>
        <Sidebar
          lessons={lessons}
          currentLesson={currentLessonId}
          onSelectLesson={(id) => {
            setCurrentLessonId(id);
            setCurrentView('lesson');
          }}
          completedLessons={completedLessons}
        />
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
                title="Toggle Sidebar"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

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
                    Lessons
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
                    Playground
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentView === 'lesson' && (
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Lesson {currentIndex + 1} of {lessons.length}
                </span>
              )}
              <button
                onClick={resetDatabase}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Reset all data to defaults"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset DB
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {currentView === 'playground' ? (
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
                  Try it out
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
                <ExercisePanel
                  exercises={currentLesson.exercises}
                  onExecute={executeQuery}
                  onComplete={handleLessonComplete}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={goToPrevLesson}
                  disabled={currentIndex === 0}
                  className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
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
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
