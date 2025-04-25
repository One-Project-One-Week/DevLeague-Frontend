import Link from "next/link"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card"

export default function UserLogin() {
    return (
        <div className="w-full max-w-sm md:max-w-3xl ">
            <Card className="overflow-hidden p-0 shadow-2xl bg-gradient-to-b from-slate-950 from-20%  to-gray-900 to-60%">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-semibold text-neutral-300">Welcome back</h1>
                                <p className="text-muted-foreground text-balance text-sm">
                                    Login to your DevLeague account
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email" className="text-neutral-300">Email</Label>
                                <Input id="email" type="email"
                                    className="text-sm text-neutral-200"
                                    placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-neutral-300">Password</Label>
                                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline text-neutral-300">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" className="text-sm text-neutral-200" type="password" required />
                            </div>
                            <Button type="submit" className="w-full bg-green-500 hover:bg-white hover:text-green-500">
                                Login
                            </Button>
                            <div
                                className="relative flex items-center justify-center text-sm text-muted-foreground">
                                <span className="text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" type="button" className="w-full">
                                    <img src="/logo-github.svg" alt="" width={20} />
                                </Button>
                                <Button variant="outline" type="button" className="w-full">
                                    <img src="/logo-google.svg" alt="" width={20} />
                                </Button>
                            </div>
                            <div className="text-center text-muted-foreground text-balance text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/user/auth/register" className="underline underline-offset-4 text-green-500">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/vercel.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
