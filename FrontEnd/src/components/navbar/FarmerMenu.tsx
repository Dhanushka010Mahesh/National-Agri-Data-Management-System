
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, UserRole } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  
  const getFallbackInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
          <Avatar>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>{getFallbackInitials()}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium leading-none">{user?.name}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-none">{user?.nic}</p>
        </div>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/farmer/profile" className="cursor-pointer">Profile</Link>
        </DropdownMenuItem>
        
        {user?.role === UserRole.FARMER && (
          <DropdownMenuItem asChild>
            <Link to="/farmer/lands" className="cursor-pointer">Land Details</Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
