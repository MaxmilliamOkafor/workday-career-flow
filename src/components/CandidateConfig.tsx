import { useState } from "react";
import { motion } from "framer-motion";
import { User, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CandidateData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
}

interface CandidateConfigProps {
  data: CandidateData;
  onSave: (data: CandidateData) => void;
}

export function CandidateConfig({ data, onSave }: CandidateConfigProps) {
  const [formData, setFormData] = useState(data);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    onSave(formData);
    toast.success("Candidate data saved");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-gradient rounded-xl border border-border p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Candidate Profile</h3>
          <p className="text-sm text-muted-foreground">Auto-fill credentials</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="firstName" className="text-muted-foreground text-xs">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="bg-input border-border focus:border-primary mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-muted-foreground text-xs">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="bg-input border-border focus:border-primary mt-1"
          />
        </div>
      </div>

      <div className="space-y-4 mb-4">
        <div>
          <Label htmlFor="email" className="text-muted-foreground text-xs">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-input border-border focus:border-primary mt-1 font-mono text-sm"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-muted-foreground text-xs">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-input border-border focus:border-primary pr-10 font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="text-muted-foreground text-xs">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-input border-border focus:border-primary mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location" className="text-muted-foreground text-xs">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="City, United States"
            className="bg-input border-border focus:border-primary mt-1"
          />
        </div>
      </div>

      <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">
        <Save className="w-4 h-4 mr-2" />
        Save Profile
      </Button>
    </motion.div>
  );
}
