import { Lesson } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LessonContentProps {
  lesson: Lesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  const { lang, isRTL } = useLanguage();
  const displayTitle = lang === 'ar' && lesson.titleAr ? lesson.titleAr : lesson.title;
  const displayDescription = lang === 'ar' && lesson.descriptionAr ? lesson.descriptionAr : lesson.description;
  const displayContent = lang === 'ar' && lesson.contentAr ? lesson.contentAr : lesson.content;
  const contentDir = lang === 'ar' && lesson.contentAr ? 'rtl' : 'ltr';

  return (
    <div className="prose prose-base dark:prose-invert max-w-none" dir={contentDir}>
      {/* Lesson header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6 mb-0 shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{displayTitle}</h1>
            <p className="text-indigo-100 text-sm leading-relaxed">{displayDescription}</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold">
            #{lesson.id}
          </div>
        </div>
      </div>

      {/* Lesson body */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-0 rounded-t-none border-t-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }: { children?: ReactNode }) => (
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-4 flex items-center gap-2 first:mt-0">
                <span className="w-1 h-5 bg-indigo-500 rounded-full flex-shrink-0" />
                {children}
              </h2>
            ),
            h3: ({ children }: { children?: ReactNode }) => (
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-5 mb-2.5">
                {children}
              </h3>
            ),
            h4: ({ children }: { children?: ReactNode }) => (
              <h4 className="text-base font-semibold text-gray-600 dark:text-gray-300 mt-4 mb-2">
                {children}
              </h4>
            ),
            p: ({ children }: { children?: ReactNode }) => (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3 text-sm">
                {children}
              </p>
            ),
            code: ({ className, children }: { className?: string; children?: ReactNode }) => {
              const isBlock = className?.includes('language-');
              if (isBlock) {
                return (
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-xs font-mono my-4 leading-relaxed" dir="ltr">
                    <code>{children}</code>
                  </pre>
                );
              }
              return (
                <code className="bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded text-xs font-mono" dir="ltr">
                  {children}
                </code>
              );
            },
            pre: ({ children }: { children?: ReactNode }) => <>{children}</>,
            ul: ({ children }: { children?: ReactNode }) => (
              <ul className="list-disc list-outside ms-5 space-y-1.5 text-gray-600 dark:text-gray-300 mb-3">
                {children}
              </ul>
            ),
            ol: ({ children }: { children?: ReactNode }) => (
              <ol className="list-decimal list-outside ms-5 space-y-1.5 text-gray-600 dark:text-gray-300 mb-3">
                {children}
              </ol>
            ),
            li: ({ children }: { children?: ReactNode }) => (
              <li className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{children}</li>
            ),
            table: ({ children }: { children?: ReactNode }) => (
              <div className="overflow-x-auto my-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full" dir="auto">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }: { children?: ReactNode }) => (
              <thead className="bg-gray-50 dark:bg-gray-700/50">{children}</thead>
            ),
            tbody: ({ children }: { children?: ReactNode }) => (
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">{children}</tbody>
            ),
            tr: ({ children }: { children?: ReactNode }) => (
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                {children}
              </tr>
            ),
            th: ({ children }: { children?: ReactNode }) => (
              <th className="px-4 py-2.5 text-start text-xs font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 uppercase tracking-wide whitespace-nowrap">
                {children}
              </th>
            ),
            td: ({ children }: { children?: ReactNode }) => (
              <td className="px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700/50 text-xs" dir="auto">
                {children}
              </td>
            ),
            strong: ({ children }: { children?: ReactNode }) => (
              <strong className="font-semibold text-gray-800 dark:text-gray-100">{children}</strong>
            ),
            blockquote: ({ children }: { children?: ReactNode }) => (
              <blockquote className="border-s-4 border-indigo-400 ps-4 my-3 bg-indigo-50 dark:bg-indigo-900/20 py-2 pe-3 rounded-e-lg text-sm text-indigo-800 dark:text-indigo-200">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="border-gray-200 dark:border-gray-700 my-6" />,
          }}
        >
          {displayContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
