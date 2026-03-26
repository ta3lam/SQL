export type Lang = 'en' | 'ar';

export interface Translations {
  // Loading / Error states
  loadingDb: string;
  initializingSqlite: string;
  failedToLoad: string;
  retry: string;
  // Header
  toggleSidebar: string;
  lessons: string;
  playground: string;
  lessonOf: (current: number, total: number) => string;
  resetDb: string;
  resetDbTitle: string;
  tryItOut: string;
  previous: string;
  next: string;
  // Sidebar
  appTitle: string;
  appSubtitle: string;
  lessonsProgress: (done: number, total: number) => string;
  levels: string[];
  // SQLEditor
  sqlEditor: string;
  ctrlEnterToRun: string;
  running: string;
  runQuery: string;
  reset: string;
  resetToOriginal: string;
  sqlError: string;
  noRowsReturned: string;
  rowsReturned: (n: number) => string;
  columnsCount: (n: number) => string;
  // ExercisePanel
  exerciseOf: (current: number, total: number) => string;
  exercisesCompleted: (done: number, total: number) => string;
  showHint: string;
  hideHint: string;
  correct: string;
  previousExercise: string;
  nextExercise: string;
  // DatabaseSchema
  databaseSchema: string;
  tablesCount: string;
  columnHeader: string;
  typeHeader: string;
  keyHeader: string;
  tableDescriptions: Record<string, string>;
  // Playground
  sqlPlayground: string;
  playgroundSubtitle: string;
  queryEditor: string;
  sampleQueries: string;
  playgroundInitialQuery: string;
  sampleQueryLabels: string[];
  // useSQL messages
  dbInitError: string;
  dbNotAvailable: string;
  querySuccess: (rows: number) => string;
  queryFailed: string;
  // Language switcher
  switchLang: string;
}

export const translations: Record<Lang, Translations> = {
  en: {
    // Loading / Error states
    loadingDb: 'Loading database engine...',
    initializingSqlite: 'Initializing SQLite WASM',
    failedToLoad: 'Failed to load database',
    retry: 'Retry',
    // Header
    toggleSidebar: 'Toggle Sidebar',
    lessons: 'Lessons',
    playground: 'Playground',
    lessonOf: (current, total) => `Lesson ${current} of ${total}`,
    resetDb: 'Reset DB',
    resetDbTitle: 'Reset all data to defaults',
    tryItOut: 'Try it out',
    previous: 'Previous',
    next: 'Next',
    // Sidebar
    appTitle: 'SQL Mastery',
    appSubtitle: 'Zero to Expert',
    lessonsProgress: (done, total) => `${done} / ${total} lessons`,
    levels: [
      'Level 0 — Introduction',
      'Level 1 — SELECT & Basics',
      'Level 2 — Filtering',
      'Level 3 — DDL',
      'Level 4 — DML',
      'Level 5 — Aggregates',
      'Level 6 — JOINs',
      'Level 7 — Functions',
      'Level 8 — Subqueries',
      'Level 9 — Advanced',
      'Level 10 — Expert',
    ],
    // SQLEditor
    sqlEditor: 'SQL Editor',
    ctrlEnterToRun: 'Ctrl+Enter to run',
    running: 'Running...',
    runQuery: 'Run Query',
    reset: 'Reset',
    resetToOriginal: 'Reset to original example',
    sqlError: 'SQL Error',
    noRowsReturned: 'Query executed successfully — no rows returned.',
    rowsReturned: (n) => `${n} row${n !== 1 ? 's' : ''} returned`,
    columnsCount: (n) => `${n} columns`,
    // ExercisePanel
    exerciseOf: (current, total) => `Exercise ${current} of ${total}`,
    exercisesCompleted: (done, total) => `${done}/${total} completed`,
    showHint: 'Show hint',
    hideHint: 'Hide hint',
    correct: 'Correct! Query executed successfully 🎉',
    previousExercise: 'Previous',
    nextExercise: 'Next exercise',
    // DatabaseSchema
    databaseSchema: 'Database Schema',
    tablesCount: '7 tables — click to expand',
    columnHeader: 'Column',
    typeHeader: 'Type',
    keyHeader: 'Key',
    tableDescriptions: {
      departments: '6 rows — company departments',
      employees: '25 rows — staff with salaries & managers',
      customers: '20 rows — registered customers',
      categories: '5 rows — product categories',
      products: '20 rows — items for sale',
      orders: '30 rows — customer purchase orders',
      order_items: '54 rows — line items per order',
    },
    // Playground
    sqlPlayground: 'SQL Playground',
    playgroundSubtitle: 'Run any query against the training database',
    queryEditor: 'Query Editor',
    sampleQueries: 'Sample Queries — click to run',
    playgroundInitialQuery: `-- Welcome to the SQL Playground!\n-- Try any query you want against the training database.\n-- The database has 7 tables: departments, employees,\n-- customers, categories, products, orders, order_items\n\nSELECT * FROM employees ORDER BY salary DESC LIMIT 10;`,
    sampleQueryLabels: [
      'All employees with departments',
      'Revenue by order status',
      'Top 5 best-selling products',
      'Customer spending analysis',
      'Employees above dept average salary',
      'Org chart (employee → manager)',
    ],
    // useSQL messages
    dbInitError: 'Failed to initialize database engine.',
    dbNotAvailable: 'Database not available.',
    querySuccess: (rows) => `✅ Query executed successfully.${rows > 0 ? ` ${rows} row(s) affected.` : ''}`,
    queryFailed: 'Query execution failed.',
    // Language switcher
    switchLang: 'العربية',
  },

  ar: {
    // Loading / Error states
    loadingDb: 'جارٍ تحميل محرك قاعدة البيانات...',
    initializingSqlite: 'تهيئة SQLite WASM',
    failedToLoad: 'فشل تحميل قاعدة البيانات',
    retry: 'إعادة المحاولة',
    // Header
    toggleSidebar: 'إظهار/إخفاء الشريط الجانبي',
    lessons: 'الدروس',
    playground: 'الملعب',
    lessonOf: (current, total) => `الدرس ${current} من ${total}`,
    resetDb: 'إعادة تعيين',
    resetDbTitle: 'إعادة تعيين جميع البيانات إلى الإعدادات الافتراضية',
    tryItOut: 'جرّبها بنفسك',
    previous: 'السابق',
    next: 'التالي',
    // Sidebar
    appTitle: 'SQL Mastery',
    appSubtitle: 'من الصفر إلى الاحتراف',
    lessonsProgress: (done, total) => `${done} / ${total} دروس`,
    levels: [
      'المستوى 0 — مقدمة',
      'المستوى 1 — SELECT والأساسيات',
      'المستوى 2 — التصفية',
      'المستوى 3 — DDL',
      'المستوى 4 — DML',
      'المستوى 5 — التجميعات',
      'المستوى 6 — JOINs',
      'المستوى 7 — الدوال',
      'المستوى 8 — الاستعلامات الفرعية',
      'المستوى 9 — متقدم',
      'المستوى 10 — خبير',
    ],
    // SQLEditor
    sqlEditor: 'محرر SQL',
    ctrlEnterToRun: 'Ctrl+Enter للتشغيل',
    running: 'جارٍ التنفيذ...',
    runQuery: 'تشغيل الاستعلام',
    reset: 'إعادة تعيين',
    resetToOriginal: 'إعادة إلى المثال الأصلي',
    sqlError: 'خطأ SQL',
    noRowsReturned: 'تم تنفيذ الاستعلام بنجاح — لم يتم إرجاع أي صفوف.',
    rowsReturned: (n) => `تم إرجاع ${n} ${n === 1 ? 'صف' : 'صفوف'}`,
    columnsCount: (n) => `${n} أعمدة`,
    // ExercisePanel
    exerciseOf: (current, total) => `التمرين ${current} من ${total}`,
    exercisesCompleted: (done, total) => `${done}/${total} مكتمل`,
    showHint: 'إظهار التلميح',
    hideHint: 'إخفاء التلميح',
    correct: 'صحيح! تم تنفيذ الاستعلام بنجاح 🎉',
    previousExercise: 'السابق',
    nextExercise: 'التمرين التالي',
    // DatabaseSchema
    databaseSchema: 'مخطط قاعدة البيانات',
    tablesCount: '7 جداول — انقر للتوسيع',
    columnHeader: 'العمود',
    typeHeader: 'النوع',
    keyHeader: 'المفتاح',
    tableDescriptions: {
      departments: '6 صفوف — أقسام الشركة',
      employees: '25 صفاً — الموظفون مع الرواتب والمدراء',
      customers: '20 صفاً — العملاء المسجلون',
      categories: '5 صفوف — فئات المنتجات',
      products: '20 صفاً — المنتجات المعروضة للبيع',
      orders: '30 صفاً — طلبات شراء العملاء',
      order_items: '54 صفاً — بنود كل طلب',
    },
    // Playground
    sqlPlayground: 'ملعب SQL',
    playgroundSubtitle: 'شغّل أي استعلام على قاعدة بيانات التدريب',
    queryEditor: 'محرر الاستعلامات',
    sampleQueries: 'استعلامات نموذجية — انقر للتشغيل',
    playgroundInitialQuery: `-- مرحباً بك في ملعب SQL!\n-- جرّب أي استعلام تريده على قاعدة بيانات التدريب.\n-- تحتوي قاعدة البيانات على 7 جداول: departments, employees,\n-- customers, categories, products, orders, order_items\n\nSELECT * FROM employees ORDER BY salary DESC LIMIT 10;`,
    sampleQueryLabels: [
      'جميع الموظفين مع أقسامهم',
      'الإيرادات حسب حالة الطلب',
      'أفضل 5 منتجات مبيعاً',
      'تحليل إنفاق العملاء',
      'الموظفون فوق متوسط راتب القسم',
      'المخطط التنظيمي (موظف ← مدير)',
    ],
    // useSQL messages
    dbInitError: 'فشل تهيئة محرك قاعدة البيانات.',
    dbNotAvailable: 'قاعدة البيانات غير متاحة.',
    querySuccess: (rows) => `✅ تم تنفيذ الاستعلام بنجاح.${rows > 0 ? ` ${rows} صف/صفوف متأثرة.` : ''}`,
    queryFailed: 'فشل تنفيذ الاستعلام.',
    // Language switcher
    switchLang: 'English',
  },
};
