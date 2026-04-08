import { useState } from 'react';
import { Lesson } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  lessons: Lesson[];
  currentLesson: number;
  onSelectLesson: (id: number) => void;
  completedLessons: number[];
  module?: 'company' | 'dvd';
}

const LEVEL_GROUPS = [
  { ids: [1, 2, 3] },
  { ids: [4, 5, 6, 7] },
  { ids: [8, 9, 10, 11] },
  { ids: [12, 13, 14] },
  { ids: [15, 16, 17] },
  { ids: [18, 19, 20] },
  { ids: [21, 22, 23, 24, 25] },
  { ids: [26, 27, 28, 29] },
  { ids: [30, 31, 32, 33] },
  { ids: [34, 35, 36, 37, 38] },
  { ids: [39, 40, 41, 42, 43, 44] },
];

const DVD_LEVEL_GROUPS = [
  { ids: [101, 102, 103] },
  { ids: [104, 105, 106] },
  { ids: [107, 108, 109] },
  { ids: [110, 111, 112] },
  { ids: [113, 114] },
];

export function Sidebar({ lessons, currentLesson, onSelectLesson, completedLessons, module = 'company' }: SidebarProps) {
  const { t, isRTL, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const completedCount = completedLessons.length;
  const progressPct = Math.round((completedCount / lessons.length) * 100);
  const activeGroups = module === 'dvd' ? DVD_LEVEL_GROUPS : LEVEL_GROUPS;
  const activeLevels = module === 'dvd' ? t.dvdLevels : t.levels;

  const query = search.trim().toLowerCase();
  const filteredIds = query
    ? new Set(lessons.filter(l =>
        l.title.toLowerCase().includes(query) ||
        (l.titleAr && l.titleAr.includes(search.trim()))
      ).map(l => l.id))
    : null;

  return (
    <aside className={`w-72 bg-white dark:bg-gray-800 ${isRTL ? 'border-l' : 'border-r'} border-gray-200 dark:border-gray-700 h-screen overflow-y-auto sticky top-0 flex flex-col`}>
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">{t.appTitle}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{t.lessonsProgress(completedCount, lessons.length)}</span>
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

      {/* Search */}
      <div className="px-3 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <svg className={`absolute top-2.5 ${isRTL ? 'right-2.5' : 'left-2.5'} w-3.5 h-3.5 text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'بحث في الدروس...' : 'Search lessons...'}
            dir="auto"
            className={`w-full ${isRTL ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-2 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-colors`}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className={`absolute top-2.5 ${isRTL ? 'left-2.5' : 'right-2.5'} text-gray-400 hover:text-gray-600 dark:hover:text-gray-200`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Lesson List with Level Groups */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {activeGroups.map((group, groupIndex) => {
          const groupLessons = lessons.filter(l => group.ids.includes(l.id) && (!filteredIds || filteredIds.has(l.id)));
          if (groupLessons.length === 0) return null;

          const groupCompleted = groupLessons.filter(l => completedLessons.includes(l.id)).length;
          const allDone = groupCompleted === groupLessons.length;
          const levelLabel = activeLevels[groupIndex];

          return (
            <div key={groupIndex}>
              <div className="flex items-center justify-between px-2 mb-1">
                <p className={`text-xs font-semibold uppercase tracking-wide ${
                  allDone ? 'text-emerald-500' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {levelLabel}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {groupCompleted}/{groupLessons.length}
                </span>
              </div>

              <div className="space-y-0.5">
                {groupLessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isCurrent = currentLesson === lesson.id;
                  const displayTitle = lang === 'ar' && lesson.titleAr ? lesson.titleAr : lesson.title;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`w-full px-3 py-2 rounded-lg transition-all duration-150 flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} ${
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
                        <p dir="auto" className={`text-sm truncate ${
                          isCurrent
                            ? 'font-semibold text-indigo-700 dark:text-indigo-300'
                            : isCompleted
                            ? 'text-gray-500 dark:text-gray-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {displayTitle}
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
