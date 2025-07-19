import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CVDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CVDownloadDialog: React.FC<CVDownloadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  // Update these URLs as needed
  const cvUrl = "/cv/mahar-saad-theme.pdf";
  const certificationsUrl = "/cv/mahar-saad-certifications.pdf";

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm sm:max-w-md w-full rounded-xl p-4 sm:p-6"
        style={{ wordBreak: "break-word" }}
      >
        <DialogHeader>
          <DialogTitle
            className="text-xl sm:text-2xl font-bold font-electric break-words"
            style={{ wordBreak: "break-word" }}
          >
            CHOOSE DOWNLOAD
          </DialogTitle>
          <DialogDescription
            className="text-xs sm:text-base font-electrolize break-words"
            style={{ wordBreak: "break-word" }}
          >
            What would you like to download?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="w-full justify-start font-electrolize text-sm sm:text-base break-words"
            variant="default"
            onClick={() => handleDownload(cvUrl)}
            style={{ wordBreak: "break-word", whiteSpace: "normal" }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </Button>
          <Button
            className="w-full justify-start font-electrolize text-sm sm:text-base break-words"
            variant="outline"
            onClick={() => handleDownload(certificationsUrl)}
            style={{ wordBreak: "break-word", whiteSpace: "normal" }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Certifications
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="font-electric text-sm sm:text-base"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVDownloadDialog;
