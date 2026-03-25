import { Lesson } from '../types';

interface SidebarProps {
  lessons: Lesson[];
  currentLesson: number;
  onSelectLesson: (id: number) => void;
  completedLessons: number[];
}

const LEVEL_GROUPS = [
  { label: 'Level 0 — Introduction',    ids: [1, 2, 3] },
  { label: 'Level 1 — SELECT & Basics', ids: [4, 5, 6, 7] },
  { label: 'Level 2 — Filtering',       ids: [8, 9, 10, 11] },
  { label: 'Level 3 — DDL',             ids: [12, 13, 14] },
  { label: 'Level 4 — DML',             ids: [15, 16, 17] },
  { label: 'Level 5 — Aggregates',      ids: [18, 19, 20] },
  { label: 'Level 6 — JOINs',           ids: [21, 22, 23, 24, 25] },
  { label: 'Level 7 — Functions',       ids: [26, 27, 28, 29] },
  { label: 'Level 8 — Subqueries',      ids: [30, 31, 32, 33] },
  { label: 'Level 9 — Advanced',        ids: [34, 35, 36, 37, 38] },
  { label: 'Level 10 — Expert',         ids: [39, 40, 41, 42] },
];

export function Sidebar({ lessons, currentLesson, onSelectLesson, completedLessons }: SidebarProps) {
  const completedCount = completedLessons.length;
  const progressPct = Math.round((completedCount / lessons.length) * 100);

  return (
    <aside className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">SQL Mastery</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Zero to Expert</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{completedCount} / {lessons.length} lessons</span>
            <span className="font-medium text-indigo-600 dark:text-indigo-400">{progressPct}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson List with Level Groups */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {LEVEL_GROUPS.map((group) => {
          const groupLessons = lessons.filter(l => group.ids.includes(l.id));
          if (groupLessons.length === 0) return null;

          const groupCompleted = groupLessons.filter(l => completedLessons.includes(l.id)).length;
          const allDone = groupCompleted === groupLessons.length;

          return (
            <div key={group.label}>
              <div className="flex items-center justify-between px-2 mb-1">
                <p className={`text-xs font-semibold uppercase tracking-wide ${
                  allDone ? 'text-emerald-500' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {group.label}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {groupCompleted}/{groupLessons.length}
                </span>
              </div>

              <div className="space-y-0.5">
                {groupLessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isCurrent = currentLesson === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-150 flex items-center gap-2.5 ${
                        isCurrent
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent'
                      }`}
                    >
                      {/* Status icon */}
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                          : isCurrent
                          ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          lesson.id
                        )}
                      </div>

                      {/* Lesson title */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${
                          isCurrent
                            ? 'font-semibold text-indigo-700 dark:text-indigo-300'
                            : isCompleted
                            ? 'text-gray-500 dark:text-gray-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {lesson.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
