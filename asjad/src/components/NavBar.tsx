import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Download, Menu, X } from "lucide-react";
import CVDownloadDialog from "@/components/CVDownloadDialog";

interface NavBarProps {
  onNavClick?: (href: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNavClick }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cvDialogOpen, setCVDialogOpen] = useState(false);

  const handleNav = (href: string) => {
    setIsDrawerOpen(false);
    if (onNavClick) {
      onNavClick(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="text-base sm:text-lg lg:text-xl font-bold font-electric">
            asjad
          </div>
          <div className="hidden lg:flex space-x-4 xl:space-x-6 font-electrolize text-xs xl:text-sm">
            <a
              href="#home"
              className="hover:text-muted-foreground transition-colors"
              onClick={() => handleNav("#home")}
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-muted-foreground transition-colors"
              onClick={() => handleNav("#about")}
            >
              About
            </a>
            <a
              href="#experience"
              className="hover:text-muted-foreground transition-colors"
              onClick={() => handleNav("#experience")}
            >
              Experience
            </a>
            <a
              href="#projects"
              className="hover:text-muted-foreground transition-colors"
              onClick={() => handleNav("#projects")}
            >
              Projects
            </a>
            <a
              href="#research"
              className="hover:text-muted-foreground transition-colors"
              onClick={() => handleNav("#research")}
            >
              Research
            </a>
            <a
              href="#contact"
              className="hover:text-muted-foreground transition-colors"
              onClick={() => handleNav("#contact")}
            >
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-electrolize text-xs h-8 px-2 sm:h-9 sm:px-3"
              onClick={() => setCVDialogOpen(true)}
              type="button"
            >
              <Download className="w-3 h-3 mr-1" />
              <span className="hidden xs:inline">Resume</span>
              <span className="xs:hidden">CV</span>
            </Button>
            <CVDownloadDialog
              open={cvDialogOpen}
              onOpenChange={setCVDialogOpen}
            />
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-8 w-8 p-0 sm:h-9 sm:w-9"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="px-4 pb-8">
                <div className="flex justify-between items-center py-4">
                  <div className="text-lg font-bold font-electric">
                    Navigation
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <X className="w-4 h-4" />
                    </Button>
                  </DrawerClose>
                </div>
                <div className="space-y-4 font-electrolize">
                  <button
                    onClick={() => handleNav("#home")}
                    className="block w-full text-left py-3 px-2 text-base hover:bg-muted rounded-md transition-colors"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNav("#about")}
                    className="block w-full text-left py-3 px-2 text-base hover:bg-muted rounded-md transition-colors"
                  >
                    About
                  </button>
                  <button
                    onClick={() => handleNav("#experience")}
                    className="block w-full text-left py-3 px-2 text-base hover:bg-muted rounded-md transition-colors"
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => handleNav("#projects")}
                    className="block w-full text-left py-3 px-2 text-base hover:bg-muted rounded-md transition-colors"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => handleNav("#research")}
                    className="block w-full text-left py-3 px-2 text-base hover:bg-muted rounded-md transition-colors"
                  >
                    Research
                  </button>
                  <button
                    onClick={() => handleNav("#contact")}
                    className="block w-full text-left py-3 px-2 text-base hover:bg-muted rounded-md transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
