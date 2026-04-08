import { useState, useEffect } from 'react';
import { Exercise, QueryResult } from '../types';
import { SQLEditor } from './SQLEditor';
import { useLanguage } from '../contexts/LanguageContext';

// BUG 9: defined outside component to avoid re-creation on every render
function NavArrow({ direction, isRTL }: { direction: 'prev' | 'next'; isRTL: boolean }) {
  const isPrev = direction === 'prev';
  const d = (isPrev !== isRTL) ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7';
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  );
}

interface ExercisePanelProps {
  exercises: Exercise[];
  onExecute: (query: string) => QueryResult;
  onComplete: () => void;
}

export function ExercisePanel({ exercises, onExecute, onComplete }: ExercisePanelProps) {
  const { t, isRTL, lang } = useLanguage();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [exerciseResults, setExerciseResults] = useState<Record<number, boolean>>({});
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  // FIX BUG 1: reset index when exercises prop changes (switching to shorter lesson)
  useEffect(() => {
    setCurrentExercise(0);
    setShowHint(false);
    setWrongAnswer(false);
    setAttempts(0);
    setShowSolution(false);
  }, [exercises]);

  const exercise = exercises[currentExercise];

  // FIX BUG 1: guard against out-of-bounds access
  if (!exercise) return null;

  const handleExecute = (query: string): QueryResult => {
    const result = onExecute(query);
    setWrongAnswer(false);

    if (!result.error) {
      const passed = exercise.checkFunction(result.values ?? [], query);
      if (passed) {
        setAttempts(0);
        setShowSolution(false);
        setExerciseResults(prev => {
          const next = { ...prev, [exercise.id]: true };
          const allCompleted = exercises.every((ex) => next[ex.id]);
          if (allCompleted) onComplete();
          return next;
        });
      } else {
        setWrongAnswer(true);
        setAttempts(prev => prev + 1);
      }
    }

    return result;
  };

  const goToNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setShowHint(false);
      setWrongAnswer(false);
      setAttempts(0);
      setShowSolution(false);
    }
  };

  const goToPrev = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
      setShowHint(false);
      setWrongAnswer(false);
      setAttempts(0);
      setShowSolution(false);
    }
  };

  const completedCount = exercises.filter(ex => exerciseResults[ex.id]).length;

  // Show Arabic text if available
  const questionText = lang === 'ar' && exercise.questionAr ? exercise.questionAr : exercise.question;
  const hintText = lang === 'ar' && exercise.hintAr ? exercise.hintAr : exercise.hint;


  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm">{t.exerciseOf(currentExercise + 1, exercises.length)}</h3>
              <p className="text-amber-50 text-xs">{t.exercisesCompleted(completedCount, exercises.length)}</p>
            </div>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5" role="group" aria-label="exercise progress">
            {exercises.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentExercise(idx); setShowHint(false); setAttempts(0); setShowSolution(false); }}
                aria-label={`Exercise ${idx + 1}${exerciseResults[exercises[idx].id] ? ' (completed)' : idx === currentExercise ? ' (current)' : ''}`}
                aria-current={idx === currentExercise ? 'true' : undefined}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  exerciseResults[exercises[idx].id]
                    ? 'bg-emerald-300'
                    : idx === currentExercise
                    ? 'bg-white'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Question */}
        <div className="mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-7 h-7 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
              {questionText}
            </p>
          </div>

          {/* Hint button */}
          <button
            onClick={() => setShowHint(!showHint)}
            className={`text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 transition-colors ${isRTL ? 'mr-10' : 'ml-10'}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showHint ? t.hideHint : t.showHint}
          </button>

          {showHint && (
            <div className={`mt-2 ${isRTL ? 'mr-10' : 'ml-10'} bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3`}>
              <p className="text-indigo-700 dark:text-indigo-300 text-xs font-mono" dir="auto">
                💡 {hintText}
              </p>
            </div>
          )}
        </div>

        {/* Editor — key forces remount on exercise change, clearing stale query (FIX BUG 4) */}
        <SQLEditor
          key={currentExercise}
          initialValue=""
          onExecute={handleExecute}
          height="260px"
        />

        {/* Feedback messages */}
        {exerciseResults[exercise.id] ? (
          <div className="mt-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{t.correct}</span>
            </div>
          </div>
        ) : wrongAnswer ? (
          <div className="mt-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-start gap-2 text-red-700 dark:text-red-400">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-sm" dir="auto">{t.wrongAnswer}</span>
                {/* Show Solution after 3 failed attempts */}
                {attempts >= 3 && (
                  <div className="mt-2">
                    <button
                      onClick={() => setShowSolution(s => !s)}
                      className="text-xs text-red-500 dark:text-red-400 underline hover:no-underline"
                    >
                      {showSolution ? (lang === 'ar' ? 'إخفاء الحل' : 'Hide solution') : (lang === 'ar' ? 'عرض الحل' : 'Show solution')}
                    </button>
                    {showSolution && (
                      <pre className="mt-1 text-xs font-mono bg-red-100 dark:bg-red-900/40 rounded p-2 whitespace-pre-wrap break-all" dir="ltr">
                        {exercise.expectedQuery}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Navigation */}
        <div className="flex justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={goToPrev}
            disabled={currentExercise === 0}
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            <NavArrow direction="prev" isRTL={isRTL} />
            {t.previousExercise}
          </button>
          <button
            onClick={goToNext}
            disabled={currentExercise === exercises.length - 1}
            className="px-3 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            {t.nextExercise}
            <NavArrow direction="next" isRTL={isRTL} />
          </button>
        </div>
      </div>
    </div>
  );
}
