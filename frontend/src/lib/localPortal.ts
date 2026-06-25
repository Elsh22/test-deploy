export function isLocalPortalEnabled() {
  return process.env.NODE_ENV !== "production";
}
