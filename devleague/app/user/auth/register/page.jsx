import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function UserRegister() {
    return (

        <div className="w-full max-w-sm md:max-w-3xl">
            <Card className="overflow-hidden p-0 shadow-2xl">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-xl font-bold">Welcome to DevLeague</h1>
                                <p className="text-muted-foreground text-balance text-sm">
                                    Please enter your detais to register
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="flex gap-1 items-center">
                                <input type="checkbox" name="check" />
                                <p className="text-sm">I accept <b>Terms and Conditions</b></p>
                            </div>
                            <Button type="submit" className="w-full">
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
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a href="#" className="underline underline-offset-4 text-blue-700">
                                    Login
                                </a>
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
    )
}