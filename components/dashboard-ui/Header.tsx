"use client"

import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function Header() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="border-b w-full">
            <div className="flex  items-center w-full justify-between p-4 ">
                <div className="text-2xl font-bold text-gray-500">
                    Dashboard
                </div>
                <div className="flex items-center gap-4">
                    <Switch
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <div>
                        <p className="font-bold  text-xl text-[#1E3A8A] dark:text-gray-500 ">Hello Rajesh </p>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}
