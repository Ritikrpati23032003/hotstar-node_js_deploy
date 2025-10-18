import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, User, Home, Users } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Film className="h-8 w-8 text-primary transition-smooth group-hover:scale-110" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HotStar
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            
            <Link to="/users">
              <Button 
                variant={isActive("/users") ? "default" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Users
              </Button>
            </Link>
            
            <Link to="/login">
              <Button 
                variant={isActive("/login") || isActive("/signup") ? "default" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <User className="h-4 w-4" />
                Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
