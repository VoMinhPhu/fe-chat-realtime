'use client'
import { useState, useEffect } from 'react'
import { ThemeProvider } from "@/components/theme/ThemeProvider";

type Props = {
    children: React.ReactNode
}

export default function ThemeProviderClient({ children }: Props) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient
        ? <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >{children}</ThemeProvider>
        : <>{children}</>
}
