import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export function ReferralCard() {
    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-[20px] p-4 border border-white/10 lg:hidden">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-white/90">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Referrals</span>
                    <span className="font-medium">0</span>
                </div>
                <Button className="bg-purple-600/50 text-white hover:bg-purple-500/50 rounded-full px-6 backdrop-blur-sm">
                    INVITE LINK
                </Button>
            </div>
            <div className="flex items-center gap-1 text-sm text-white/60">
                <span>Pending Referrals: 0</span>
                <div className="h-5 w-5 rounded-full border border-white/20 flex items-center justify-center text-xs">?</div>
            </div>
        </div>
    )
}

