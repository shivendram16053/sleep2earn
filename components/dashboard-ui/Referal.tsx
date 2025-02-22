import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export function ReferralCard() {
    return (
        <div className="bg-card rounded-[20px] p-4 border lg:hidden">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Referrals</span>
                    <span className="font-medium">0</span>
                </div>
                <Button className="bg-[#1e3a8a] text-white hover:bg-[#9ee500] rounded-full px-6">INVITE LINK</Button>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>Pending Referrals: 0</span>
                <div className="h-5 w-5 rounded-full border flex items-center justify-center text-xs">?</div>
            </div>
        </div>
    )
}

