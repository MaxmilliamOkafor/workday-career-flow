import { motion } from "framer-motion";
import { Play, MousePointerClick, LogIn, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface WorkdayFlowCardProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onStart: () => void;
  currentStep: number;
  isRunning: boolean;
}

const steps = [
  { icon: MousePointerClick, label: "Click Apply", description: "Blue apply button" },
  { icon: ArrowRight, label: "Apply Manually", description: "Select manual option" },
  { icon: LogIn, label: "Sign In", description: "Auto-login credentials" },
  { icon: FileText, label: "Auto-fill", description: "Fill all fields" },
];

export function WorkdayFlowCard({ enabled, onToggle, onStart, currentStep, isRunning }: WorkdayFlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card-gradient rounded-xl border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Play className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Workday Full Flow</h3>
            <p className="text-sm text-muted-foreground">4-step automation</p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>

      {/* Flow Steps */}
      <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep && isRunning;
          
          return (
            <div key={step.label} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center min-w-[70px]"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-success border-success"
                      : isCurrent
                      ? "bg-primary border-primary animate-pulse-glow"
                      : "bg-secondary border-border"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-success-foreground" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium text-center ${isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-muted-foreground text-center">{step.description}</span>
              </motion.div>
              
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${index < currentStep ? "bg-success" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>

      <Button
        onClick={onStart}
        disabled={!enabled || isRunning}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
      >
        {isRunning ? (
          <>
            <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse mr-2" />
            Running Flow...
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Start Workday Flow
          </>
        )}
      </Button>
    </motion.div>
  );
}
