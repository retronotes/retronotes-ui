import Link from "next/link"
import {
    Bell,
    Home,
    Menu,
    StepBack,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    UserButton
} from '@clerk/nextjs'
import ButtonSlot from "@/components/ButtonsSlot"
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <StepBack className="h-6 w-6" />
                            <span className="">Retro Notes</span>
                        </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary"
                                >
                                    <Home className="h-4 w-4" />
                                    Dashboard
                                </Link>
                            </nav>
                        </div>
                        <div className="mt-auto p-4">
                            <Card x-chunk="dashboard-02-chunk-0">
                                <CardHeader className="p-2 pt-0 md:p-4">
                                    <CardTitle>Support Us</CardTitle>
                                    <CardDescription>
                                        Your contribution ensures continuous improvements, new features and dedicated support.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                    <Link target="_blank" href="https://paypal.me/rakeshkumar1531?country.x=IN&locale.x=en_GB">
                                        <Button size="sm" className="w-full">
                                            Support Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
              </div>
            <div className="flex flex-col">

                <header className="flex h-14 justify-between md:justify-end items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <StepBack className="h-6 w-6" />
                                    Retro Notes
                                    <span className="sr-only">Retro Notes</span>
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-primary hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                            </nav>
                            <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Support Us</CardTitle>
                                        <CardDescription>
                                            Your contribution ensures continuous improvements, new features, and dedicated support.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link target="_blank" href="https://paypal.me/rakeshkumar1531?country.x=IN&locale.x=en_GB">
                                            <Button size="sm" className="w-full">
                                                Support Now
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <ButtonSlot />
                    <UserButton />
                </header>
                {children}
                <Toaster />
            </div>

        </div>


    )
}