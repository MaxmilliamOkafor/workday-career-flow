import { useState } from "react";
import { Header } from "@/components/Header";
import { WorkdayFlowCard } from "@/components/WorkdayFlowCard";
import { BulkUrlManager } from "@/components/BulkUrlManager";
import { StatsCard } from "@/components/StatsCard";
import { CandidateConfig } from "@/components/CandidateConfig";
import { Send, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Toaster } from "sonner";

interface JobUrl {
  id: string;
  url: string;
  title: string;
  status: "pending" | "processing" | "completed" | "failed";
  addedAt: Date;
}

const Index = () => {
  const [workdayEnabled, setWorkdayEnabled] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [jobUrls, setJobUrls] = useState<JobUrl[]>([]);
  const [candidateData, setCandidateData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
  });

  const handleStartWorkdayFlow = () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    // Simulate flow steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          setIsRunning(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const handleAddUrls = (urls: string[]) => {
    const newUrls: JobUrl[] = urls.map((url) => ({
      id: crypto.randomUUID(),
      url,
      title: "",
      status: "pending",
      addedAt: new Date(),
    }));
    setJobUrls((prev) => [...prev, ...newUrls]);
  };

  const handleRemoveUrl = (id: string) => {
    setJobUrls((prev) => prev.filter((url) => url.id !== id));
  };

  const handleClearAll = () => {
    setJobUrls([]);
  };

  const stats = {
    totalApplications: 47,
    completed: 32,
    pending: 12,
    failed: 3,
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" theme="dark" />
      <Header />
      
      {/* Ambient glow effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent blur-3xl" />
      </div>

      <main className="container mx-auto px-6 py-8 relative">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={Send}
            label="Total Applications"
            value={stats.totalApplications}
            change="+12%"
            positive
            delay={0}
          />
          <StatsCard
            icon={CheckCircle2}
            label="Completed"
            value={stats.completed}
            delay={0.05}
          />
          <StatsCard
            icon={Clock}
            label="Pending"
            value={stats.pending}
            delay={0.1}
          />
          <StatsCard
            icon={XCircle}
            label="Failed"
            value={stats.failed}
            change="-2"
            positive
            delay={0.15}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Workday Flow */}
          <div className="lg:col-span-2 space-y-6">
            <WorkdayFlowCard
              enabled={workdayEnabled}
              onToggle={setWorkdayEnabled}
              onStart={handleStartWorkdayFlow}
              currentStep={currentStep}
              isRunning={isRunning}
            />
            
            <BulkUrlManager
              urls={jobUrls}
              onAddUrls={handleAddUrls}
              onRemoveUrl={handleRemoveUrl}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Right Column - Candidate Config */}
          <div>
            <CandidateConfig
              data={candidateData}
              onSave={setCandidateData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
