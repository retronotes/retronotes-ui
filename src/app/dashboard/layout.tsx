import {
    SquareTerminal,
    StepBack
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"
import Link from 'next/link'
import { Toaster } from "@/components/ui/toaster"
import {
    ClerkProvider,
  } from '@clerk/nextjs'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ClerkProvider>
        <div className="grid h-screen w-full pl-[56px]">
            <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                <div className="border-b p-2">
                    <Link href="/">
                        <Button variant="outline" size="icon" aria-label="Home">
                            <StepBack className="size-5 fill-foreground" />
                        </Button>
                    </Link>
                </div>
                <nav className="grid gap-1 p-2">

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/dashboard">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-lg bg-muted"
                                        aria-label="Dashboard"
                                    >
                                        <SquareTerminal className="size-5" />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5} >
                                Dashboard
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
            {children}
            <Toaster />
        </div>
        </ClerkProvider>
    )
}