"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

const testimonials = [
  {
    quote:
      "Video Casero has revolutionized how I create tutorials. The quality is amazing and it's so easy to use!",
    author: "Sarah Chen",
    role: "Content Creator",
    company: "TechTutorials",
  },
  {
    quote:
      "I've tried many screen recording tools, but Video Casero is by far the most intuitive and reliable.",
    author: "Marcus Rodriguez",
    role: "Product Manager",
    company: "StartupFlow",
  },
  {
    quote:
      "The sharing features are incredible. I can get feedback on my recordings instantly from my team.",
    author: "Emily Watson",
    role: "UX Designer",
    company: "DesignStudio",
  },
];

const Page = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleSignIn = async () => {
    return await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column - Testimonials */}
      <div className="lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/20 p-3 rounded-xl">
              <Video className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Video Casero</h1>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Play className="h-5 w-5 text-white" />
                <span className="text-white/80 text-sm font-medium">
                  TESTIMONIAL
                </span>
              </div>

              <blockquote className="text-white text-lg leading-relaxed mb-6">
                &quot;{testimonials[currentTestimonial].quote}&quot;
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-white/70 text-sm">
                    {testimonials[currentTestimonial].role} at{" "}
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevTestimonial}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextTestimonial}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mt-4 justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Column - Sign Up */}
      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Start Recording Today
            </h2>
            <p className="text-gray-600">
              Join thousands of creators who trust Video Casero for their screen
              recordings
            </p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={handleSignIn}
              className="w-full h-12 text-base font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              variant="outline"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                By signing up, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </a>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-xs text-gray-500">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-xs text-gray-500">Videos Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-xs text-gray-500">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
