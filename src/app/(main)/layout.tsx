import { MainLayout } from '@/components/layout/MainLayout';
import { getUser } from '@/lib/auth';

// This layout wraps all pages inside the (main) route group
export default async function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch user data specific to this layout (or reuse from root if passed via context)
  const user = await getUser();
  const isAuthenticated = !!user;

  return (
    // Render MainLayout here, passing props and the actual page content as children
    <MainLayout user={user} isAuthenticated={isAuthenticated}>
      {children}
    </MainLayout>
  );
} 