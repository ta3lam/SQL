import { useState } from 'react';
import { Exercise, QueryResult } from '../types';
import { SQLEditor } from './SQLEditor';

interface ExercisePanelProps {
  exercises: Exercise[];
  onExecute: (query: string) => QueryResult;
  onComplete: () => void;
}

export function ExercisePanel({ exercises, onExecute, onComplete }: ExercisePanelProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [exerciseResults, setExerciseResults] = useState<Record<number, boolean>>({});

  const exercise = exercises[currentExercise];

  const handleExecute = (query: string): QueryResult => {
    const result = onExecute(query);
    
    if (!result.error && result.values.length >= 0) {
      setExerciseResults(prev => ({ ...prev, [exercise.id]: true }));
      
      // Check if all exercises are completed
      const allCompleted = exercises.every((ex, idx) => 
        exerciseResults[ex.id] || idx === currentExercise
      );
      if (allCompleted) {
        onComplete();
      }
    }
    
    return result;
  };

  const goToNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setShowHint(false);
    }
  };

  const goToPrev = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
      setShowHint(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">التمرين {currentExercise + 1} من {exercises.length}</h3>
              <p className="text-amber-100 text-sm">جرّب بنفسك!</p>
            </div>
          </div>
          <div className="flex gap-2">
            {exercises.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  exerciseResults[exercises[idx].id]
                    ? 'bg-emerald-400'
                    : idx === currentExercise
                    ? 'bg-white'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                {exercise.question}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showHint ? 'إخفاء التلميح' : 'إظهار التلميح'}
          </button>

          {showHint && (
            <div className="mt-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <p className="text-indigo-700 dark:text-indigo-300 text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {exercise.hint}
              </p>
            </div>
          )}
        </div>

        <SQLEditor
          initialValue=""
          onExecute={handleExecute}
        />

        {exerciseResults[exercise.id] && (
          <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">أحسنت! إجابة صحيحة 🎉</span>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={goToPrev}
            disabled={currentExercise === 0}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            السابق
          </button>
          <button
            onClick={goToNext}
            disabled={currentExercise === exercises.length - 1}
            className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            التالي
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
