import "./globals.css";
import Navbar from "@/components/app/Navbar";
import { ToastContainer } from "react-toastify";


import { getAuthUser } from "@/lib/actions/auth.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <Navbar user={await getAuthUser()} />
          <main>

            {children}
            <div id="modal-root" />
            <ToastContainer position="top-right" autoClose={3000} />
          </main>

      </body>
    </html>
  );
}
