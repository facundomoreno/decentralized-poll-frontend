import { Inter } from "next/font/google"
import "./globals.css"
import LayoutUseClientContent from "./components/LayoutUseClientContent"
const inter = Inter({ subsets: ["latin"] })
import type { Metadata } from "next"
export const metadata: Metadata = {
    title: "Decentralized Polls",
    icons: {
        icon: "icon.png"
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <LayoutUseClientContent>{children}</LayoutUseClientContent>
            </body>
        </html>
    )
}
