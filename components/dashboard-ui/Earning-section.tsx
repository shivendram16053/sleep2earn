import { DollarSign } from "lucide-react"


export function EarningsSection({ totalrewards, todayrewards }) {
    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-[20px] border border-white/10 py-6 px-6">
            <div className="flex md:flex-row flex-col h-full gap-6 items-center justify-center">
                <div className="bg-black/30 backdrop-blur-sm md:w-1/2 w-full rounded-[20px] text-white/90 py-6 px-4 border border-white/10">
                    <div className="flex flex-row items-center gap-1 md:justify-between">
                        <div className="text-2xl font-semibold">Total Rewards</div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-8 w-8 text-purple-400" />
                            <span className="text-4xl font-bold w-36">{totalrewards}</span>
                        </div>
                    </div>
                    <div className="text-xs text-white/60 mt-2"></div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm md:w-1/2 w-full rounded-[20px] text-white/90 py-6 px-4 border border-white/10">
                    <div className="flex flex-row items-center gap-1 justify-between">
                        <div className="text-2xl font-semibold">Daily's Rewards</div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-8 w-8 text-purple-400" />
                            <span className="text-4xl font-bold w-36">{todayrewards}</span>
                        </div>
                    </div>
                    <div className="text-xs text-white/60 mt-2"></div>
                </div>
            </div>
        </div>
    )
}

