"use client"

import { useState } from "react"
import Image from "next/image"
import { LayoutGrid, BarChart2, Gift, ShoppingBag, MonitorSmartphone, Menu, X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
    { name: "Dashboard", icon: LayoutGrid, href: "#", current: true },
    { name: "Referral Program", icon: Gift, href: "#" },
    { name: "Rewards", icon: Gift, href: "#" },
    { name: "Store", icon: ShoppingBag, href: "#", isNew: true },
]

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-background border-b px-4 py-3 flex justify-between items-center">
                <div className="flex items-center justify-center gap-4">

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-bold  text-xl text-[#1E3A8A] dark:text-gray-500 ">Hello Sloths </p>
                </div>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-30  w-80  border-r-2 border-[#2b1847] transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="py-6 pr-6 ">
                    <div className=" flex items-center justify-center   ">
                        {/* <Image
                            src="/112255.png"
                            alt="Sloth Logo"
                            width={220}
                            height={32}

                        /> */}
                    </div>
                    <nav className="space-y-4 ">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center px-3 py-4 text-xl font-semibold rounded-r-xl",
                                    item.current ? "bg-[#3c1958] text-white border-l-none border-b-[6px] border-[#c084fc]  border-r-[1px] " : "text-white hover:bg-[#492969]",
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                <span className="flex-1">{item.name}</span>
                                {item.comingSoon && (
                                    <span className="ml-3 inline-block px-2 py-0.5 text-xs font-medium bg-secondary rounded-full">
                                        Coming Soon
                                    </span>
                                )}
                                {item.isNew && (
                                    <span className="ml-3 inline-block px-2 py-0.5 text-xs font-medium bg-black text-white dark:bg-white dark:text-black rounded-full">
                                        New
                                    </span>
                                )}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t bg-[#5a2f85] text-white mx-4 rounded-xl cursor-pointer border-b-[6px] hover:border-[#c084fc] duration-200">
                    <div className="flex items-center gap-2 px-3 py-2 bg-success-background rounded-lg">
                        <MonitorSmartphone className="h-8 w-8" /> {/* Play Store icon */}
                        <div className="flex-1">
                            <div className="text-md font-medium">Install Sleep2Earn <br /> Mobile App</div>
                        </div>
                    </div>
                </div>
                <div className="  px-4 py-8">
                    <button className="flex items-center w-full gap-2 px-3 py-2  text-white rounded-lg">
                        <LogOut className="h-8 w-8" /> {/* Log Out icon */}
                        <span className="text-lg font-medium">Log Out</span>
                    </button>
                </div>
            </div>
        </>
    )
}

