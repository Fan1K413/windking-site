export const siteConfig = {
  serverAddress: import.meta.env.VITE_SERVER_ADDRESS ?? 'windking.fans',
  statusApiUrl:
    import.meta.env.VITE_STATUS_API_URL ??
    'https://status.windking.fans/api/v1/status/simple',
  registrationApiUrl:
    import.meta.env.VITE_REGISTRATION_API_URL ?? 'https://reg.windking.fans/api/',
  registrationPageUrl: 'https://reg.windking.fans/',
  statusPageUrl: 'https://status.windking.fans/',
  bilibiliUrl: 'https://space.bilibili.com/3546618253020021',
  supportEmail: 'f@fan1k.cn',
} as const
