import { Wifi } from "lucide-react"

export function ConnectionStatus() {
    return (
        <div className="bg-gray-100 rounded-[20px] p-4 border-2 border-[#1E3A8A] border-b-8 md:w-1/2 ">
            <div className="flex items-center gap-2 mb-4">
                <Wifi className="h-5 w-5 text-[#1E3A8A]" />
                <div className="flex-1 h-8 bg-[#1E3A8A] text-white dark:bg-success-background rounded-full flex items-center px-4">
                    <span className="text-md font-semibold">Device Name :</span>
                </div>
            </div>
            <p className="text-md text-muted-foreground mb-4 font-medium">
                Sleep more to earn more. Your device is connected.
                <br />
                <span className="text-xs">You can always disconnect device and add new device in the profile tab</span>

            </p>
            <div>
                <button className="bg-[#1E3A8A] text-white border-b-4 border-transparent transition-all duration-200 ease-in-out hover:border-gray-600 dark:bg-success-background font-medium rounded-full px-6 py-2 shadow-none hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                    Device Profile
                </button>



            </div>

        </div>
    )
}

