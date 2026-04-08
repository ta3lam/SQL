/**
 * LessonPane — right-side sticky panel for the split layout.
 * Contains: TOC, "Try it out" editor (collapsible), Schema (collapsible), Exercises, Mark-Complete.
 */
import { useState, useRef, useEffect } from 'react';
import { Lesson } from '../types';
import { SQLEditor } from './SQLEditor';
import { DatabaseSchema } from './DatabaseSchema';
import { ExercisePanel } from './ExercisePanel';
import { ErrorBoundary } from './ErrorBoundary';
import { QueryResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TocEntry { id: string; text: string; level: number }

function parseToc(markdown: string): TocEntry[] {
  return markdown
    .split('\n')
    .filter(l => /^#{2,3}\s/.test(l))
    .map(l => {
      const m = l.match(/^(#{2,3})\s+(.+)/);
      if (!m) return null;
      const text = m[2].trim();
      return {
        id: text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
        text,
        level: m[1].length,
      };
    })
    .filter(Boolean) as TocEntry[];
}

interface LessonPaneProps {
  lesson: Lesson;
  isCompleted: boolean;
  onExecute: (q: string) => QueryResult;
  onReset: () => void;
  onComplete: () => void;
  /** call when user clicks a TOC heading — parent scrolls left pane */
  onTocClick: (id: string) => void;
}

export function LessonPane({
  lesson,
  isCompleted,
  onExecute,
  onReset,
  onComplete,
  onTocClick,
}: LessonPaneProps) {
  const { t, lang, isRTL } = useLanguage();
  const [editorOpen, setEditorOpen] = useState(true);
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [allDone, setAllDone] = useState(false);

  // reset panel state when lesson changes
  useEffect(() => {
    setEditorOpen(true);
    setSchemaOpen(false);
    setAllDone(false);
  }, [lesson.id]);

  const content = lang === 'ar' && lesson.contentAr ? lesson.contentAr : lesson.content;
  const toc = parseToc(content);

  const handleComplete = () => {
    setAllDone(true);
    onComplete();
  };

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pb-6">

      {/* TOC */}
      {toc.length > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700/60 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h10M4 14h7M4 18h5" />
            </svg>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {lang === 'ar' ? 'المحتويات' : 'Contents'}
            </span>
          </div>
          <nav className="px-3 py-2 space-y-0.5">
            {toc.map(entry => (
              <button
                key={entry.id}
                onClick={() => onTocClick(entry.id)}
                className={`w-full text-start text-xs py-1 px-2 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-600 dark:text-gray-400 transition-colors truncate ${entry.level === 3 ? (isRTL ? 'pr-4' : 'pl-4') : ''}`}
              >
                {entry.text}
              </button>
            ))}
          </nav>
        </div>
      )}

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
              height="140px"
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
            <DatabaseSchema />
          </div>
        )}
      </div>

      {/* Exercises */}
      {lesson.exercises.length > 0 && (
        <ErrorBoundary>
          <ExercisePanel
            exercises={lesson.exercises}
            onExecute={onExecute}
            onComplete={handleComplete}
          />
        </ErrorBoundary>
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
