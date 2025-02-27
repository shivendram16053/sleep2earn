import { Rocket, Gift, LayoutGrid, ShoppingBag, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"


const navigation = [
  { name: "Referral Program", icon: LayoutGrid, href: "/referral" },
  { name: "Rewards", icon: Gift, href: "/claim-rewards" },
  { name: "Dashboard", icon: Rocket, href: "/dashboard" },
  { name: "Store", icon: ShoppingBag, href: "/redeem", isNew: true },
  { name: "Logout", icon: LogOut, href: "/logout" }
]

export function MobileNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 py-3  rounded-t-3xl   right-0 bg-gray-900 border-t lg:hidden">
      <div className="flex justify-around">
        {navigation.map((item) => {
          const isActive = path === item.href
          return (
            < a
              key={item.name}
              href={item.href}
              className={cn("flex flex-col items-center p-4", isActive && "text-purple-400 ")}
            >
              <item.icon className="h-6 w-6" />
            </a>
          )
        })}
      </div>
    </nav >
  )
}

