import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, ArrowRight } from 'lucide-react';

const results = [
  { name: "Red Line Survivor", desc: "You've been through it all—delays, smoke, breakdowns—nothing can break your zen." },
  { name: "Brunch in Back Bay Menace", desc: "A connoisseur of refined living, waiting in line for an hour just for that perfect brunch." },
  { name: "Charles River Melancholy Pigeon", desc: "You enjoy pondering life by the river, deep and melancholy, the ultimate observer of the Boston soul." },
  { name: "Beacon Hill Overthinker", desc: "You've studied the texture of every brick. You overthink everything, yet live with utmost elegance." },
  { name: "Cambridge Tote Bag Entity", desc: "The tote is your essence, stuffed with ideals, books, and an obsession with academia." },
  { name: "Allston Chaos Fairy", desc: "Loudest in Allston, wildest party animal—you’re the lightning in the city’s night." },
  { name: "Library Goblin with Seasonal Depression", desc: "The library is your sanctuary. It's gloomy in winter, but holds infinite spirit-food for you." },
  { name: "Fenway Loud Person", desc: "Die-hard Red Sox fan. Your voice is the heartbeat of this city, intense and full of passion." },
  { name: "Snowy Sidewalk Philosopher", desc: "Navigating through blizzards, pondering the profound philosophy of this city." },
];

const questions = [
  {
    q: "The Red Line is delayed again. Your immediate reaction?",
    options: [
      { text: "Habitually start reading/zoning out", result: "Red Line Survivor" },
      { text: "Take out your phone and rant on X/Twitter", result: "Fenway Loud Person" },
      { text: "Pull a book out of your tote bag", result: "Cambridge Tote Bag Entity" }
    ]
  },
  {
    q: "The perfect Saturday in Boston involves?",
    options: [
      { text: "An elegant brunch in Back Bay", result: "Brunch in Back Bay Menace" },
      { text: "Pondering life while watching pigeons by the Charles", result: "Charles River Melancholy Pigeon" },
      { text: "A wild live music gig in Allston", result: "Allston Chaos Fairy" }
    ]
  },
  {
    q: "How do you view winter?",
    options: [
      { text: "The warm sanctuary of the library", result: "Library Goblin with Seasonal Depression" },
      { text: "Walking through snow, meditating on urban philosophy", result: "Snowy Sidewalk Philosopher" },
      { text: "Charmed by the brick beauty of Beacon Hill", result: "Beacon Hill Overthinker" }
    ]
  }
];

export default function BostonCreatureQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finalResult, setFinalResult] = useState<string | null>(null);

  const handleSelect = (result: string) => {
    const newScores = { ...scores, [result]: (scores[result] || 0) + 1 };
    setScores(newScores);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setFinalResult(winner);
    }
  };

  if (finalResult) {
    const res = results.find(r => r.name === finalResult);
    return (
      <div className="bg-artistic-bg p-12 border border-artistic-accent text-center">
        <h3 className="font-serif text-3xl font-black mb-6">You are a: {res?.name}</h3>
        <p className="font-sans text-lg mb-8 text-artistic-text/80">{res?.desc}</p>
        <button onClick={() => { setStep(0); setScores({}); setFinalResult(null); }} className="flex items-center gap-2 mx-auto font-sans font-bold uppercase tracking-widest text-artistic-accent">
          <RefreshCw className="w-4 h-4" /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-artistic-bg p-8 border border-artistic-border">
      <h3 className="font-serif text-2xl font-black mb-8">{questions[step].q}</h3>
      <div className="flex flex-col gap-4">
        {questions[step].options.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(opt.result)} className="p-4 border border-artistic-border text-left hover:border-artistic-accent transition-all font-sans text-sm font-bold uppercase tracking-widest">
            {opt.text}
          </button>
        ))}
      </div>
      <p className="mt-8 text-xs opacity-50 font-sans">Question {step + 1} / {questions.length}</p>
    </div>
  );
}
