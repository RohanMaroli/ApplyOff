// Layout for pages that need a logged-in user (the proxy and requireUser() enforce it).
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">{children}</div>;
}
