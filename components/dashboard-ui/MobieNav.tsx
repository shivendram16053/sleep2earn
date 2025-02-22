import { Rocket, Gift, LayoutGrid, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Referral", icon: Rocket },
  { name: "Rewards", icon: Gift },
  { name: "Dashboard", icon: LayoutGrid, current: true },
  { name: "Store", icon: ShoppingBag },
  { name: "Profile", icon: User },
]

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t lg:hidden">
      <div className="flex justify-around">
        {navigation.map((item) => (
          <a
            key={item.name}
            href="#"
            className={cn("flex flex-col items-center p-3", item.current && "text-[#abf600]")}
          >
            <item.icon className="h-6 w-6" />
          </a>
        ))}
      </div>
    </nav>
  )
}

