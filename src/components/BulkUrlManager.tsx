import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Plus, Trash2, ExternalLink, Copy, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface JobUrl {
  id: string;
  url: string;
  title: string;
  status: "pending" | "processing" | "completed" | "failed";
  addedAt: Date;
}

interface BulkUrlManagerProps {
  urls: JobUrl[];
  onAddUrls: (urls: string[]) => void;
  onRemoveUrl: (id: string) => void;
  onClearAll: () => void;
}

export function BulkUrlManager({ urls, onAddUrls, onRemoveUrl, onClearAll }: BulkUrlManagerProps) {
  const [singleUrl, setSingleUrl] = useState("");
  const [bulkUrls, setBulkUrls] = useState("");
  const [showBulkInput, setShowBulkInput] = useState(false);

  const handleAddSingle = () => {
    if (singleUrl.trim()) {
      onAddUrls([singleUrl.trim()]);
      setSingleUrl("");
      toast.success("URL added to queue");
    }
  };

  const handleAddBulk = () => {
    const urlList = bulkUrls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
    
    if (urlList.length > 0) {
      onAddUrls(urlList);
      setBulkUrls("");
      setShowBulkInput(false);
      toast.success(`${urlList.length} URLs added to queue`);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setBulkUrls(text);
      toast.success("Pasted from clipboard");
    } catch {
      toast.error("Failed to read clipboard");
    }
  };

  const getStatusIcon = (status: JobUrl["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "processing":
        return <Clock className="w-4 h-4 text-primary animate-spin" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: JobUrl["status"]) => {
    const styles = {
      pending: "bg-muted text-muted-foreground",
      processing: "bg-primary/20 text-primary",
      completed: "bg-success/20 text-success",
      failed: "bg-destructive/20 text-destructive",
    };
    return styles[status];
  };

  const extractDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-gradient rounded-xl border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Bulk Apply Dashboard</h3>
            <p className="text-sm text-muted-foreground">{urls.length} URLs in queue</p>
          </div>
        </div>
        {urls.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Single URL Input */}
      <div className="flex gap-2 mb-4">
        <Input
          value={singleUrl}
          onChange={(e) => setSingleUrl(e.target.value)}
          placeholder="Paste a job URL..."
          className="bg-input border-border focus:border-primary"
          onKeyDown={(e) => e.key === "Enter" && handleAddSingle()}
        />
        <Button onClick={handleAddSingle} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Toggle Bulk Input */}
      <button
        onClick={() => setShowBulkInput(!showBulkInput)}
        className="text-sm text-primary hover:text-primary/80 mb-4 flex items-center gap-1"
      >
        <Copy className="w-3 h-3" />
        {showBulkInput ? "Hide bulk input" : "Add multiple URLs at once"}
      </button>

      {/* Bulk URL Input */}
      <AnimatePresence>
        {showBulkInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <Textarea
              value={bulkUrls}
              onChange={(e) => setBulkUrls(e.target.value)}
              placeholder="Paste multiple URLs (one per line)..."
              className="bg-input border-border focus:border-primary min-h-[120px] font-mono text-sm mb-2"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePasteFromClipboard}
                className="border-border hover:bg-secondary"
              >
                <Copy className="w-4 h-4 mr-1" />
                Paste from Clipboard
              </Button>
              <Button size="sm" onClick={handleAddBulk} className="bg-primary hover:bg-primary/90">
                Add All URLs
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* URL List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        <AnimatePresence>
          {urls.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-muted-foreground"
            >
              <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No URLs in queue</p>
              <p className="text-xs">Add job URLs to start bulk applying</p>
            </motion.div>
          ) : (
            urls.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                {getStatusIcon(job.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{job.title || extractDomain(job.url)}</p>
                  <p className="text-xs text-muted-foreground truncate font-mono">{job.url}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(job.status)}`}>
                  {job.status}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7"
                    onClick={() => window.open(job.url, "_blank")}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 text-destructive hover:text-destructive"
                    onClick={() => onRemoveUrl(job.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
