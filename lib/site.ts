export function getAppUrl() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  return appUrl.endsWith("/") ? appUrl.slice(0, -1) : appUrl
}
