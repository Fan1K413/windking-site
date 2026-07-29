export function publicPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export function resolveContentUrl(url: string) {
  if (/^(?:https?:|mailto:|tel:|#)/i.test(url)) return url
  return publicPath(url)
}
