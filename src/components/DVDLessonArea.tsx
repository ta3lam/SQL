import { useCallback } from 'react';
import { usePlaygroundSQL } from '../hooks/usePlaygroundSQL';
import { dvdRentalSQL } from '../data/dvdRental';
import { dvdLessons } from '../data/lessons_dvd';
import { LessonContent } from './LessonContent';
import { SQLEditor } from './SQLEditor';
import { DVDRentalSchema } from './DVDRentalSchema';
import { ExercisePanel } from './ExercisePanel';
import { useLanguage } from '../contexts/LanguageContext';

interface DVDLessonAreaProps {
  currentLessonId: number;
  completedLessons: number[];
  onLessonComplete: () => void;
  onPrev: () => void;
  onNext: () => void;
  isRTL: boolean;
}

export function DVDLessonArea({
  currentLessonId,
  completedLessons,
  onLessonComplete,
  onPrev,
  onNext,
  isRTL,
}: DVDLessonAreaProps) {
  const { t } = useLanguage();
  const { loading, error, executeQuery, resetDatabase } = usePlaygroundSQL(dvdRentalSQL);

  const currentLesson = dvdLessons.find(l => l.id === currentLessonId) || dvdLessons[0];
  const currentIndex = dvdLessons.findIndex(l => l.id === currentLessonId);

  const handleReset = useCallback(() => {
    resetDatabase();
  }, [resetDatabase]);

  // Arrow icons that flip in RTL
  const PrevArrow = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
    </svg>
  );
  const NextArrow = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  );

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
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
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
          onReset={handleReset}
        />
      </div>

      {/* DVD Rental Schema */}
      <DVDRentalSchema />

      {/* Exercises */}
      {currentLesson.exercises.length > 0 && (
        <ExercisePanel
          exercises={currentLesson.exercises}
          onExecute={executeQuery}
          onComplete={onLessonComplete}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
        >
          <PrevArrow />
          {t.previous}
        </button>

        <div className="flex items-center gap-1">
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
          className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:from-violet-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all text-sm font-medium"
        >
          {t.next}
          <NextArrow />
        </button>
      </div>
    </div>
  );
}
