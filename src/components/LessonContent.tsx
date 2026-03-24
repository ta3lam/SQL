import { Lesson } from '../types';
import ReactMarkdown from 'react-markdown';
import { ReactNode } from 'react';

interface LessonContentProps {
  lesson: Lesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none" dir="rtl">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6 mb-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-white">{lesson.titleAr}</h1>
        <p className="text-indigo-100 text-lg">{lesson.description}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <ReactMarkdown
          components={{
            h2: ({ children }: { children?: ReactNode }) => (
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-6 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                {children}
              </h2>
            ),
            h3: ({ children }: { children?: ReactNode }) => (
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-3">
                {children}
              </h3>
            ),
            p: ({ children }: { children?: ReactNode }) => (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {children}
              </p>
            ),
            code: ({ className, children }: { className?: string; children?: ReactNode }) => {
              const isBlock = className?.includes('language-');
              if (isBlock) {
                return (
                  <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm font-mono my-4" dir="ltr">
                    <code>{children}</code>
                  </pre>
                );
              }
              return (
                <code className="bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded text-sm font-mono" dir="ltr">
                  {children}
                </code>
              );
            },
            pre: ({ children }: { children?: ReactNode }) => <>{children}</>,
            ul: ({ children }: { children?: ReactNode }) => (
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mr-4">
                {children}
              </ul>
            ),
            li: ({ children }: { children?: ReactNode }) => (
              <li className="text-gray-600 dark:text-gray-300">{children}</li>
            ),
            table: ({ children }: { children?: ReactNode }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }: { children?: ReactNode }) => (
              <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>
            ),
            th: ({ children }: { children?: ReactNode }) => (
              <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                {children}
              </th>
            ),
            td: ({ children }: { children?: ReactNode }) => (
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" dir="ltr">
                {children}
              </td>
            ),
            strong: ({ children }: { children?: ReactNode }) => (
              <strong className="font-bold text-gray-800 dark:text-white">{children}</strong>
            ),
          }}
        >
          {lesson.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
