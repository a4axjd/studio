import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
// Your stats here
const stats = [
  "5+ Years Experience",
  "50+ Projects Delivered",
  "Full Stack Engineer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

function useTypewriterLoop(strings: string[], speed = 50, pause = 1000) {
  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fullText = strings[index % strings.length];

    if (!isDeleting && typed.length < fullText.length) {
      timeoutRef.current = setTimeout(() => {
        setTyped(fullText.slice(0, typed.length + 1));
      }, speed);
    } else if (!isDeleting && typed.length === fullText.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && typed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setTyped(fullText.slice(0, typed.length - 1));
      }, speed / 2);
    } else if (isDeleting && typed.length === 0) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % strings.length);
        setIsDeleting(false);
      }, 300);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [typed, isDeleting, index, strings, speed, pause]);

  return typed;
}

const HomeSection: React.FC = () => {
  const currentTyped = useTypewriterLoop(stats, 50, 1000);

  return (
    <section
      id="home"
      className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-20 px-3 sm:px-4 lg:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-electric break-words">
                SAAD AKA
                <br />
                <span className="text-muted-foreground">ASJAD</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 font-electrolize leading-relaxed">
                I design, build, and launch digital experiences. From intuitive
                interfaces to rock-solid engineering—I turn ideas into products
                that matter.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start">
              <Link to="/projects">
                <Button className="bg-foreground text-background hover:bg-muted-foreground font-electric text-xs sm:text-sm h-9 sm:h-10 px-4 sm:px-6">
                  View My Work
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </Button>
              </Link>

              <a href="#contact">
                <Button
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background font-electric text-xs sm:text-sm h-9 sm:h-10 px-4 sm:px-6"
                >
                  Get In Touch
                </Button>
              </a>
            </div>

            {/* Icons */}
            {/* Icons */}
            <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4">
              <a
                href="https://github.com/a4axjd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/axjad" // Replace with your actual LinkedIn URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="mailto:hi@asjad.is-a.dev" // Replace with your actual email
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Typing Card */}
          <div className="relative order-first lg:order-last w-full">
            <div className="w-full min-h-[150px] sm:min-h-[200px] bg-gradient-to-br from-muted to-card rounded-2xl flex items-center justify-center p-4 overflow-hidden">
              <div className="text-center font-electric font-bold text-muted-foreground text-base sm:text-lg md:text-xl w-full">
                {currentTyped}
                <span className="blinking-cursor">|</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor Blink Animation */}
      <style>
        {`
          .blinking-cursor {
            display: inline-block;
            width: 1ch;
            animation: blink 1s steps(2, start) infinite;
            vertical-align: baseline;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default HomeSection;
