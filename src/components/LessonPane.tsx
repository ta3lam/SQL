/**
 * LessonPane — right-side sticky panel for the split layout.
 * Contains: "Try it out" editor (collapsible), Schema (collapsible), Exercises, Mark-Complete.
 */
import { useState, useRef, useEffect } from 'react';
import { Lesson } from '../types';
import { SQLEditor } from './SQLEditor';
import { DatabaseSchema } from './DatabaseSchema';
import { ExercisePanel } from './ExercisePanel';
import { ErrorBoundary } from './ErrorBoundary';
import { QueryResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';


interface LessonPaneProps {
  lesson: Lesson;
  isCompleted: boolean;
  onExecute: (q: string) => QueryResult;
  onReset: () => void;
  onComplete: () => void;
  schemaSlot?: React.ReactNode;
}

export function LessonPane({
  lesson,
  isCompleted,
  onExecute,
  onReset,
  onComplete,
  schemaSlot,
}: LessonPaneProps) {
  const { t, lang, isRTL } = useLanguage();
  const [editorOpen, setEditorOpen] = useState(true);
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [exercisesOpen, setExercisesOpen] = useState(true);
  const [allDone, setAllDone] = useState(false);

  // reset panel state when lesson changes
  useEffect(() => {
    setEditorOpen(true);
    setSchemaOpen(false);
    setExercisesOpen(true);
    setAllDone(false);
  }, [lesson.id]);

  const handleComplete = () => {
    setAllDone(true);
    onComplete();
  };

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pb-6">

      {/* Try It Out — collapsible */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <button
          onClick={() => setEditorOpen(o => !o)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.tryItOut}
          </span>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${editorOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {editorOpen && (
          <div className="px-4 pb-4">
            <SQLEditor
              initialValue={lesson.example}
              onExecute={onExecute}
              onReset={onReset}
              height="260px"
            />
          </div>
        )}
      </div>

      {/* Schema — collapsible */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <button
          onClick={() => setSchemaOpen(o => !o)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            {t.databaseSchema}
          </span>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${schemaOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {schemaOpen && (
          <div className="px-4 pb-4">
            {schemaSlot ?? <DatabaseSchema />}
          </div>
        )}
      </div>

      {/* Exercises — collapsible */}
      {lesson.exercises.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <button
            onClick={() => setExercisesOpen(o => !o)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {lang === 'ar' ? 'التمارين' : 'Exercises'}
              <span className="text-xs font-normal text-gray-400 dark:text-gray-500">
                ({lesson.exercises.length})
              </span>
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${exercisesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {exercisesOpen && (
            <div className="border-t border-gray-100 dark:border-gray-700">
              <ErrorBoundary>
                <ExercisePanel
                  exercises={lesson.exercises}
                  onExecute={onExecute}
                  onComplete={handleComplete}
                />
              </ErrorBoundary>
            </div>
          )}
        </div>
      )}

      {/* Mark as Complete — for lessons with no exercises */}
      {lesson.exercises.length === 0 && (
        <div className="flex justify-center">
          {isCompleted ? (
            <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-800 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.lessonCompleted}
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 shadow-sm transition-all text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.markComplete}
            </button>
          )}
        </div>
      )}

      {/* All-exercises celebration banner */}
      {allDone && lesson.exercises.length > 0 && (
        <div className="celebration-banner bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl mb-1">🎉</div>
          <p className="font-bold text-sm">{lang === 'ar' ? 'أكملت جميع التمارين!' : 'All exercises completed!'}</p>
          <p className="text-xs text-emerald-100 mt-0.5">{lang === 'ar' ? 'استمر في رحلتك إلى الاحتراف' : 'Keep going on your SQL journey!'}</p>
        </div>
      )}
    </div>
  );
}

/** Drag handle between left/right panes — updates leftPct via onResize */
export function ResizeHandle({
  leftPct,
  onResize,
  isRTL,
}: {
  leftPct: number;
  onResize: (pct: number) => void;
  isRTL: boolean;
}) {
  const dragging = useRef(false);

  const onMouseDown = () => { dragging.current = true; };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const pct = (e.clientX / window.innerWidth) * 100;
      const clamped = isRTL ? Math.min(Math.max(100 - pct, 30), 70) : Math.min(Math.max(pct, 30), 70);
      onResize(clamped);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [onResize, isRTL]);

  return (
    <div
      onMouseDown={onMouseDown}
      className="hidden lg:flex w-1.5 flex-shrink-0 cursor-col-resize group items-center justify-center relative"
      title="Drag to resize"
    >
      <div className="absolute inset-y-0 w-px bg-gray-200 dark:bg-gray-700 group-hover:bg-indigo-400 dark:group-hover:bg-indigo-500 transition-colors" />
      <div className="relative z-10 w-4 h-8 bg-gray-200 dark:bg-gray-700 group-hover:bg-indigo-400 dark:group-hover:bg-indigo-500 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5h2v14H8zM14 5h2v14h-2z"/>
        </svg>
      </div>
    </div>
  );
}
