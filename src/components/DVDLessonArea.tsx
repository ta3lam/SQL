import { useState, useEffect, useCallback, useRef } from 'react';
import { usePlaygroundSQL } from '../hooks/usePlaygroundSQL';
import { dvdLessons } from '../data/lessons_dvd';
import { LessonContent } from './LessonContent';
import { LessonPane, ResizeHandle } from './LessonPane';
import { DVDRentalSchema } from './DVDRentalSchema';
import { Playground } from './Playground';
import { ErrorBoundary } from './ErrorBoundary';
import { useLanguage } from '../contexts/LanguageContext';

interface DVDLessonAreaProps {
  currentLessonId: number;
  completedLessons: number[];
  onLessonComplete: () => void;
  onPrev: () => void;
  onNext: () => void;
  isRTL: boolean;
  focusMode: boolean;
  fontSize: number;
  view: 'lesson' | 'playground';
  /** PERF 1: set to true the first time the user activates the DVD module */
  shouldLoad: boolean;
}

// Defined outside to avoid re-creation on each render
function NavArrow({ direction, isRTL }: { direction: 'prev' | 'next'; isRTL: boolean }) {
  const isPrev = direction === 'prev';
  const d = (isPrev !== isRTL) ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7';
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  );
}

export function DVDLessonArea({
  currentLessonId,
  completedLessons,
  onLessonComplete,
  onPrev,
  onNext,
  isRTL,
  focusMode,
  fontSize,
  view,
  shouldLoad,
}: DVDLessonAreaProps) {
  const { t } = useLanguage();

  // PERF 1: lazy-load the 7.4 MB SQL file only when the DVD module is first opened
  const [dvdSQL, setDvdSQL] = useState<string | null>(null);
  useEffect(() => {
    if (!shouldLoad || dvdSQL !== null) return;
    import('../data/dvdRental')
      .then(m => m.loadDvdRentalSQL())
      .then(setDvdSQL);
  }, [shouldLoad, dvdSQL]);

  const { loading, error, executeQuery, resetDatabase } = usePlaygroundSQL(dvdSQL);

  const currentLesson = dvdLessons.find(l => l.id === currentLessonId) || dvdLessons[0];
  const currentIndex = dvdLessons.findIndex(l => l.id === currentLessonId);

  const handleReset = useCallback(() => resetDatabase(), [resetDatabase]);

  // Split-pane state (persisted in localStorage)
  const [leftPct, setLeftPct] = useState<number>(() => {
    const saved = localStorage.getItem('sql-mastery-dvd-split');
    const n = saved ? parseFloat(saved) : 58;
    return (n >= 30 && n <= 70) ? n : 58;
  });
  const handleResize = useCallback((pct: number) => {
    setLeftPct(pct);
    localStorage.setItem('sql-mastery-dvd-split', String(pct));
  }, []);

  const leftPaneRef = useRef<HTMLDivElement>(null);

  // Scroll left pane to top on lesson change
  useEffect(() => {
    leftPaneRef.current?.scrollTo(0, 0);
  }, [currentLessonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
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
      <div className="flex items-center justify-center py-24">
        <div className="text-center bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">{t.failedToLoad}</p>
          <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>
          <button onClick={handleReset} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'playground') {
    return (
      <div className="h-full overflow-y-auto p-4 sm:p-6">
        <Playground onExecute={executeQuery} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">

      {/* LEFT — lesson content (scrollable) */}
      <div
        ref={leftPaneRef}
        className="overflow-y-auto flex-shrink-0 p-4 sm:p-6 transition-all duration-300"
        style={{ width: focusMode ? '100%' : `${leftPct}%` }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <LessonContent lesson={currentLesson} fontSize={fontSize} />

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              aria-label={t.previous}
              className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              <NavArrow direction="prev" isRTL={isRTL} />
              {t.previous}
            </button>

            <div className="flex items-center gap-1" role="group" aria-label="lesson progress">
              {dvdLessons.slice(Math.max(0, currentIndex - 2), Math.min(dvdLessons.length, currentIndex + 3)).map((l) => (
                <div
                  key={l.id}
                  className={`rounded-full transition-all ${
                    l.id === currentLessonId
                      ? 'bg-violet-500 w-4 h-2'
                      : completedLessons.includes(l.id)
                      ? 'bg-emerald-400 w-2 h-2'
                      : 'bg-gray-300 dark:bg-gray-600 w-2 h-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={onNext}
              disabled={currentIndex === dvdLessons.length - 1}
              aria-label={t.next}
              className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:from-violet-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all text-sm font-medium"
            >
              {t.next}
              <NavArrow direction="next" isRTL={isRTL} />
            </button>
          </div>
        </div>
      </div>

      {/* Resize handle */}
      {!focusMode && <ResizeHandle leftPct={leftPct} onResize={handleResize} isRTL={isRTL} />}

      {/* RIGHT — sticky panel (editor + schema + exercises) */}
      <div
        className={`overflow-y-auto p-4 sm:p-5 bg-gray-50 dark:bg-gray-900 border-s border-gray-200 dark:border-gray-700 transition-all duration-300 ${focusMode ? 'w-0 p-0 opacity-0 overflow-hidden' : 'flex-1'}`}
      >
        <ErrorBoundary>
          <LessonPane
            lesson={currentLesson}
            isCompleted={completedLessons.includes(currentLessonId)}
            onExecute={executeQuery}
            onReset={handleReset}
            onComplete={onLessonComplete}
            schemaSlot={<DVDRentalSchema />}
          />
        </ErrorBoundary>
      </div>

    </div>
  );
}
