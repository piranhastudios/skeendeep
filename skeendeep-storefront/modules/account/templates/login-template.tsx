"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/modules/account/components/login"
import Register from "@/modules/account/components/register"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              {currentView === "sign-in" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {currentView === "sign-in" 
                ? "Sign in to your account to access your orders and preferences"
                : "Join our community to start curating your space"
              }
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Tabs value={currentView} onValueChange={setCurrentView} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sign-in" className="space-y-4">
                  <Login setCurrentView={setCurrentView} />
                </TabsContent>
                
                <TabsContent value="register" className="space-y-4">
                  <Register setCurrentView={setCurrentView} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default LoginTemplate