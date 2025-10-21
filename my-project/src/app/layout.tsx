import "./globals.css";
import Navbar from "@/components/app/Navbar";
import { ToastContainer } from "react-toastify";
import { UserSyncProvider } from "@/components/sections/UserSyncProvider";
import QueryClientContextProvider from "@/components/app/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientContextProvider>
          <Navbar />
          <main>
            <UserSyncProvider />
            {children}
            <div id="modal-root" />
            <ToastContainer position="top-right" autoClose={3000} />
          </main>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
