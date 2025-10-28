"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useRouter} from "next/navigation";
import {LogOut} from "lucide-react";
import NavItems from "@/components/NavItems";
import { signOut } from "@/lib/actions/auth.action";

const UserDropdown = ({user}: {user: User}) => {
    const router = useRouter()
    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow-500">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-base font-medium text-gray-400">{user.name}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-400">
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-400">{user.name}</span>
                            <span className="text-base font-medium text-gray-400">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="text-gray-500"></DropdownMenuSeparator>
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">Sign Out
                    <LogOut className='h-4 w-4 hidden sm:block'></LogOut>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="hidden sm:block text-gray-600"/>
                <nav className="sm:hidden">
                    <NavItems/>
                </nav>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserDropdown
