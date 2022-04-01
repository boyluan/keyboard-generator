module.exports = {
  images: {
    dangerouslyAllowSVG: true, // See: <https://nextjs.org/docs/api-reference/next/image>
    contentSecurityPolicy: "default-src 'self'; script-src 'none; sandbox;",
  },
  reactStrictMode: true,
}
