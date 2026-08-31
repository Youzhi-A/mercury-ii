const configuredBase = import.meta.env.BASE_URL ?? '/';

export const BASE_PATH = configuredBase === '/'
  ? ''
  : `/${configuredBase.replace(/^\/+|\/+$/g, '')}`;

export function sitePath(pathname = '/') {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) {
    return path;
  }

  return `${BASE_PATH}${path}` || '/';
}
