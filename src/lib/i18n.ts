export const locales = ['zh', 'en'] as const;

export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'zh';

export const localeLanguageTags: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
};

export const ui = {
  zh: {
    siteDescription: '生活、阅读与技术分享',
    languageShortName: '中',
    switchLanguage: 'View in English',
    mobileMenuLabel: '打开导航菜单',
    themeToggleLabel: '切换颜色主题',
    readingPrefix: '读书有感：',
    authorLabel: '作者',
    bookTitleLabel: '书名',
    ratingLabel: '评分',
    ratingAria: (rating: number) => `评分 ${rating}，满分 5 星`,
    search: {
      dialogLabel: '站内搜索',
      buttonLabel: '搜索',
      closeLabel: '关闭搜索',
      placeholder: '输入关键词搜索',
      prompt: '输入关键词开始搜索',
      searching: '搜索中...',
      found: '找到 {count} 个符合“{query}”的结果',
      notFound: '找不到符合“{query}”的结果',
      untitled: '无标题',
      loadError: '搜索功能加载失败',
      searchError: '搜索过程中发生错误',
      unknownError: '未知错误',
    },
    image: {
      previewLabel: '图片预览',
      playLivePhotoLabel: '播放 Live Photo',
      zoomLabel: '查看大图',
    },
  },
  en: {
    siteDescription: 'Stories about life, reading, and technology',
    languageShortName: 'EN',
    switchLanguage: '查看中文版',
    mobileMenuLabel: 'Open navigation menu',
    themeToggleLabel: 'Toggle color theme',
    readingPrefix: 'Reading notes: ',
    authorLabel: 'Author',
    bookTitleLabel: 'Book',
    ratingLabel: 'Rating',
    ratingAria: (rating: number) => `Rated ${rating} out of 5 stars`,
    search: {
      dialogLabel: 'Site search',
      buttonLabel: 'Search',
      closeLabel: 'Close search',
      placeholder: 'Search by keyword',
      prompt: 'Enter a keyword to search',
      searching: 'Searching...',
      found: '{count} results for “{query}”',
      notFound: 'No results for “{query}”',
      untitled: 'Untitled',
      loadError: 'Search could not be loaded',
      searchError: 'Something went wrong while searching',
      unknownError: 'Unknown error',
    },
    image: {
      previewLabel: 'Image preview',
      playLivePhotoLabel: 'Play Live Photo',
      zoomLabel: 'View full-size image',
    },
  },
} as const;

export const localizePath = (locale: Locale, path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? normalizedPath : `/en${normalizedPath}`;
};

export const getAlternateLocale = (locale: Locale): Locale => locale === 'zh' ? 'en' : 'zh';
