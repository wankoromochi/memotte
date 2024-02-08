export const pagesPath = {
  "chat": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/chat' as const, hash: url?.hash })
  },
  "signin": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  "signup": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/' as const, hash: url?.hash })
};

export type PagesPath = typeof pagesPath;
