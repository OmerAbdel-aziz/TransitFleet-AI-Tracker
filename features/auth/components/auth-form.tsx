"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormMode = "login" | "signup" | "forgot"

export function AuthForm({ className, ...props }: React.ComponentProps<"div">) {
  const [mode, setMode] = useState<FormMode>("login")

  const isLogin = mode === "login"
  const isSignup = mode === "signup"
  const isForgot = mode === "forgot"

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border border-[#cbb6f5] shadow-md">
        <CardHeader>
          <CardTitle>
            {isLogin && "Login to your account"}
            {isSignup && "Create a new account"}
            {isForgot && "Reset your password"}
          </CardTitle>
          <CardDescription>
            {isLogin && "Enter your email below to login to your account"}
            {isSignup && "Fill in your details to sign up"}
            {isForgot && "We’ll send you an email with reset instructions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Email */}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-[#cbb6f5] focus-visible:ring-[#6939db]"
              />
            </div>

            {/* Password + confirm */}
            {(isLogin || isSignup) && (
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="border-[#cbb6f5] focus-visible:ring-[#6939db]"
                />
              </div>
            )}

            {isSignup && (
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  className="border-[#cbb6f5] focus-visible:ring-[#6939db]"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-[#6939db] hover:bg-[#5a2fc3] text-white"
              >
                {isLogin && "Login"}
                {isSignup && "Sign up"}
                {isForgot && "Send reset link"}
              </Button>

              {isLogin && (
                <Button
                  variant="outline"
                  className="w-full border-[#cbb6f5] text-[#6939db] hover:bg-[#f5f0ff]"
                >
                  Login with Google
                </Button>
              )}
            </div>
          </form>

          {/* Footer links */}
          <div className="mt-4 text-center text-sm">
            {isLogin && (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="underline underline-offset-4"
                >
                  Sign up
                </button>
              </>
            )}
            {isSignup && (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="underline underline-offset-4"
                >
                  Login
                </button>
              </>
            )}
            {isForgot && (
              <>
                Remembered your password?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="underline underline-offset-4"
                >
                  Back to login
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
