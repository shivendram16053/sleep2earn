import { Wifi } from "lucide-react"

export function ConnectionStatus() {
    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-[20px] p-4 border border-white/10 md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
                <Wifi className="h-5 w-5 text-purple-400" />
                <div className="flex-1 h-8 bg-black/30 backdrop-blur-sm text-white border border-white/10 rounded-full flex items-center px-4">
                    <span className="text-md font-semibold">Device Name :</span>
                </div>
            </div>
            <p className="text-md text-white/70 mb-4 font-medium">
                Sleep more to earn more. Your device is connected.
                <br />
                <span className="text-xs text-white/60">
                    You can always disconnect device and add new device in the profile tab
                </span>
            </p>
            <div>
                <button className="bg-purple-600/50 text-white border border-white/10 transition-all duration-200 ease-in-out hover:bg-purple-500/50 font-medium rounded-full px-6 py-2 backdrop-blur-sm">
                    Device Profile
                </button>
            </div>
        </div>
    )
}

