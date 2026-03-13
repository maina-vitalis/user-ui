"use client";

import { useState } from "react";
import { User, ShieldCheck, Camera, LogOut } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Account Settings</CardTitle>
        <CardDescription>
          Manage your personal information, security preferences, and
          notifications.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 pb-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Settings Navigation */}
          <TabsList className="h-10 bg-muted/40 p-1 w-full justify-start rounded-xl mb-6">
            <TabsTrigger
              value="profile"
              className="text-xs font-semibold rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 h-8 gap-2"
            >
              <User className="h-3.5 w-3.5" />
              Profile details
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="text-xs font-semibold rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 h-8 gap-2"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Security & Login
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="pb-6">
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                  <Avatar className="h-20 w-20 ring-4 ring-background shadow-md">
                    <AvatarImage src="" alt="Vitalis Maina" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                      VM
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">
                    Profile Picture
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Supported formats: JPEG, PNG. Max size: 2MB.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="h-8 text-xs rounded-lg">
                      Upload New
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-xs rounded-lg text-muted-foreground hover:text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Personal Info Form */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-semibold">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="Vitalis"
                    className="h-10 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs font-semibold">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue="Maina"
                    className="h-10 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="vitalis@example.com"
                    className="h-10 rounded-xl bg-muted/30"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+254 712 345 678"
                    className="h-10 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="rounded-xl px-6">Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="pb-6">
            <div className="space-y-6">
              {/* Password */}
              <div>
                <h3 className="font-semibold text-sm mb-4">Change Password</h3>
                <div className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <Label
                      htmlFor="currentPassword"
                      className="text-xs font-semibold"
                    >
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="h-10 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="newPassword"
                      className="text-xs font-semibold"
                    >
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      className="h-10 rounded-xl"
                    />
                  </div>
                  <Button size="sm" className="rounded-xl w-full mt-2">
                    Update Password
                  </Button>
                </div>
              </div>

              <Separator />

              {/* 2FA */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-sm">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div>
                <h3 className="font-semibold text-sm text-destructive mb-4">
                  Danger Zone
                </h3>
                <div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                  <div>
                    <h4 className="text-sm font-semibold text-destructive">
                      Deactivate Account
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Temporarily hide your profile and products
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-lg h-8 px-4"
                  >
                    Deactivate
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
