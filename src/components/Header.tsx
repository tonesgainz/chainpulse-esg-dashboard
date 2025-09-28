
import { useState } from "react";
import { Search, Bell, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

export default function Header({ onRefresh, isLoading = false }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useIsMobile();

  return (
    <header className="glass-panel py-4 px-6 md:px-8 border-b border-white/10 flex items-center justify-between animate-fade-in backdrop-blur-xl">
      <div className="flex-1">
        <h1 className="text-2xl font-bold font-display gradient-text">
          Sustainability Dashboard
        </h1>
        <p className="text-sm text-muted-foreground/80 mt-1">
          Your ESG & Carbon insights for{" "}
          <span className="text-primary font-medium">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onRefresh}
          className={cn(
            "h-10 w-10 rounded-xl button-gradient flex items-center justify-center transition-all duration-300",
            isLoading && "animate-spin-slow"
          )}
          disabled={isLoading}
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </button>
        
        <button className="h-10 w-10 rounded-xl stat-card flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-105 relative group">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse shadow-lg"></span>
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-ping"></span>
        </button>

        <div className="relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search size={16} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search projects..."
            className="pl-12 pr-4 py-3 h-10 rounded-xl text-sm stat-card border border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 w-[240px] md:w-[320px] backdrop-blur-xl"
          />
        </div>
      </div>
    </header>
  );
}
