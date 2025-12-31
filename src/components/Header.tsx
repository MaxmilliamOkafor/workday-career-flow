import { motion } from "framer-motion";
import { Sparkles, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground flex items-center gap-2">
              ATS Tailor
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                Extension
              </span>
            </h1>
            <p className="text-xs text-muted-foreground">Job Application Automation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5" />
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Run All
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
