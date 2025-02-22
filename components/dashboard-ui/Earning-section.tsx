import { DollarSign } from "lucide-react"

export function EarningsSection() {
    return (
        <div className=" dark:bg-success-background cursor-default bg-gray-100 rounded-[20px] md:w-3/4 border-2 border-[#1E3A8A] border-b-8 py-6 px-6 ">

            <div className="flex md:flex-row flex-col h-full gap-6 items-center justify-center ">
                <div className="bg-white md:w-1/2 w-full rounded-[20px] text-[#1E3A8A] py-6 px-4 ">
                    <div className="flex flex-row items-center gap-1 md:justify-between">
                        <div className="text-2xl  font-semibold ">Total Earnings</div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-8 w-8 " />
                            <span className="text-4xl font-bold">7,059.96</span>
                        </div>
                    </div>
                    <div className="text-xs  mt-2">Uptime: 1 day, 23 hrs, 4 mins</div>
                </div>
                <div className="bg-white md:w-1/2 rounded-[20px] text-[#1E3A8A] py-6 px-4 ">
                    <div className="flex flex-row items-center gap-1 justify-between">
                        <div className="text-2xl  font-semibold ">Today's Earnings</div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-8 w-8 " />
                            <span className="text-4xl font-bold">7,059.96</span>
                        </div>
                    </div>
                    <div className="text-xs  mt-2">Uptime: 1 day, 23 hrs, 4 mins</div>
                </div>
            </div>
        </div>
    )
}

