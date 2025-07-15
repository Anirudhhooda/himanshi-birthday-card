
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function BirthdayCard() {
  const audioRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [messagesShown, setMessagesShown] = useState(0);

  const messages = [
    "You are the most precious person in my life.",
    "Your smile makes my day better.",
    "On your special day, I wish you all the love and happiness in the world.",
    "Thank you for always being there for me.",
    "May this year bring you success, joy, and endless memories.",
    "You deserve all the beautiful things life has to offer.",
    "Never forget how special you are to me.",
    "Happy Birthday once again, Himanshi. Stay happy always!"
  ];

  useEffect(() => {
    const audio = audioRef.current;
    audio.play();

    const interval = setInterval(() => {
      setMessagesShown((prev) => {
        if (prev < messages.length) return prev + 1;
        else {
          setShowConfetti(true);
          clearInterval(interval);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}      
      <audio ref={audioRef} src="/birthday_music.mp3" loop />

      <div className="absolute -top-10 animate-bounce-slow">
        <img src="/balloons.png" alt="Balloons" className="w-80 opacity-70" />
      </div>

      <div className="max-w-xl text-center">
        {messages.slice(0, messagesShown).map((msg, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3 }}
            className="text-xl md:text-2xl font-medium text-gray-800 mb-4"
          >
            {msg}
          </motion.p>
        ))}

        {messagesShown === messages.length && (
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-pink-600 mt-10"
          >
            Happy Birthday Himanshi ❤️
          </motion.h1>
        )}
      </div>
    </div>
  );
}
