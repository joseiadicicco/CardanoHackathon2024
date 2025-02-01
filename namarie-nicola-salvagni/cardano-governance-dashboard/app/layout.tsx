import { GovernanceProvider } from '../contexts/GovernanceContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GovernanceProvider>
          {/* Existing layout components */}
          {children}
        </GovernanceProvider>
      </body>
    </html>
  );
}

