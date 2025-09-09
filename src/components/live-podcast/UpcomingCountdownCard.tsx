"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

// Define props
interface CountdownTimerCardProps {
  eventName?: string;
  eventDate?: string; // ISO string (e.g., "2025-08-21T18:08:00")
  backgroundImage?: string;
}

// Define state
interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimerCard: React.FC<CountdownTimerCardProps> = ({
  eventName = "Tech Innovation Summit 2025",
  eventDate = "2025-08-21T18:08:00",
  backgroundImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center",
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(eventDate).getTime() - new Date().getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const formatTime = (time: number): string =>
    String(time).padStart(2, "0");

  const formatEventDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className="p-4 border border-slight-border">
      {/* Timer Section with Background */}
      <div
        className="relative h-40 overflow-hidden mb-4 object-cover object-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          {/* Clock Icon */}
          <Clock className="w-5 h-5 mb-4 text-white" strokeWidth={2} />

          {/* Countdown Display */}
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="bg-white/20 border-2 border-white/40 px-2 py-1 mb-2 backdrop:blur-sm">
                <span className="text-base font-medium">
                  {formatTime(timeLeft.hours)}
                </span>
              </div>
              <div className="text-sm font-medium">Hours</div>
            </div>

            <div className="text-center">
              <div className="bg-black/40 border-2 border-white/40 px-2 py-1 mb-2">
                <span className="text-base font-medium">
                  {formatTime(timeLeft.minutes)}
                </span>
              </div>
              <div className="text-sm font-medium">Minutes</div>
            </div>

            <div className="text-center">
              <div className="bg-black/40 border-2 border-white/40 px-2 py-1 mb-2">
                <span className="text-base font-medium">
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
              <div className="text-sm font-medium">Seconds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div>
        <h1 className="text-lg font-playfair font-semibold mb-3 text-gray-900">
          {eventName}
        </h1>
        <p className="text-sm text-gray-600">
          Scheduled for {formatEventDate(eventDate)}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimerCard;
