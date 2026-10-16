// Minimal root pass-through. The <html>/<body> tags (with the locale-aware
// lang attribute) are rendered by src/app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
