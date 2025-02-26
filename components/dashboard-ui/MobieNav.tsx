import { Rocket, Gift, LayoutGrid, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"


const navigation = [
  { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { name: "Referral Program", icon: Gift, href: "/referral" },
  { name: "Rewards", icon: Gift, href: "/claim-rewards" },
  { name: "Store", icon: ShoppingBag, href: "/redeem", isNew: true },
]

export function MobileNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t lg:hidden">
      <div className="flex justify-around">
        {navigation.map((item) => {
          const isActive = path === item.href
          return (
            < a
              key={item.name}
              href={item.href}
              className={cn("flex flex-col items-center p-3", isActive && "text-[#abf600]")}
            >
              <item.icon className="h-6 w-6" />
            </a>
          )
        })}
      </div>
    </nav >
  )
}

