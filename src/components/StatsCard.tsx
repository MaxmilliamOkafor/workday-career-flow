import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  delay?: number;
}

export function StatsCard({ icon: Icon, label, value, change, positive, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-gradient rounded-xl border border-border p-4"
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${positive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
            {change}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}
