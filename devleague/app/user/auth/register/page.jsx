import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserRegister() {
    return (

        <div className="w-full max-w-sm md:max-w-3xl">
            <Card className="overflow-hidden p-0 shadow-2xl bg-gradient-to-b from-slate-950 from-20%  to-gray-900 to-60%">
                <CardContent className="grid p-0">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-xl font-bold text-neutral-300">Create Account</h1>
                                <p className="text-muted-foreground text-balance text-sm">
                                    Please enter your detais to register
                                </p>
                            </div>
                            {/*  */}
                            <div className="flex flex-row item-center justify-center gap-3">
                                <div className=" w-full grid gap-3">
                                    <Label className="text-neutral-300 text-sm" htmlFor="full_name">Full Name</Label>
                                    <Input className="text-sm text-neutral-200" type="text" placeholder="Full Name" required />
                                </div>
                                <div className="w-full grid gap-3">
                                    <Label className="text-neutral-300 text-sm" htmlFor="user_name">User Name</Label>
                                    <Input className="text-sm text-neutral-200" type="text" placeholder="User Name" required />
                                </div>
                            </div>
                            {/*  */}
                            <div className="flex flex-row item-center justify-center gap-3">
                                <div className="w-full grid gap-3">
                                    <Label
                                        className="text-neutral-300 text-sm"
                                        htmlFor="position">Role</Label>
                                    <Input className="text-sm text-neutral-200" type="text" placeholder="Enter your role" required />
                                </div>
                                <div className="w-full grid gap-3">
                                    <Label
                                        className="text-neutral-300 text-sm" htmlFor="dob">Date of Birth</Label>
                                    <Input className="text-sm text-neutral-200" id="dob" type="number" placeholder="y/m/d" required />
                                </div>
                            </div>
                            <div className="flex flex-row item-center justify-center gap-3">
                                <div className=" w-full grid gap-3">
                                    <Label
                                        className="text-neutral-300 text-sm"
                                        htmlFor="email">Email</Label>
                                    <Input className="text-sm text-neutral-200" id="email" type="email" placeholder="user@example.com" required />
                                </div>
                                <div className=" w-full grid gap-3">
                                    <Label className="text-neutral-300 text-sm" htmlFor="phone">Phone</Label>
                                    <Input className="text-sm text-neutral-200" id="phone" type="number" placeholder="+95*********" required />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label
                                        className="text-neutral-300 text-sm" htmlFor="password">Password</Label>
                                    <a href="#" className="ml-auto text-sm text-neutral-300 underline-offset-2 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input className="text-sm text-neutral-200" id="password" type="password" required />
                            </div>
                            <div className="flex gap-1 items-center">
                                <input className="text-sm text-neutral-200" type="checkbox" name="check" />
                                <p className="text-sm text-neutral-300">I accept <b>Terms and Conditions</b></p>
                            </div>
                            <Button type="submit" className="w-full bg-green-500 hover:bg-white hover:text-green-500">
                                Create an account
                            </Button>
                            {/*  */}
                            <div
                                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 ">
                                <Button variant="outline" type="button" className="w-full">
                                    <img src="/logo-github.svg" alt="" width={20} />
                                </Button>
                                <Button variant="outline" type="button" className="w-full">
                                    <img src="/logo-google.svg" alt="" width={20} />
                                </Button>
                            </div>
                            <div className="text-center text-sm text-neutral-300">
                                Already have an account?{" "}
                                <Link href="/user/auth/login" className="underline underline-offset-4 text-green-500">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}