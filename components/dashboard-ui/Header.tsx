import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
    return (
        <div className="border-b border-white/10">
            <div className="flex items-center justify-end p-4">
                <div className="flex items-center gap-4">
                    <div>
                        <p className="font-bold text-xl text-white/90">Hello Rajesh</p>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}

