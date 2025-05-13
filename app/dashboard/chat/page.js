"use client"
import StrategyChat from "@/components/StrategyChat";


export default function Chat() {
  const handleComplete = (data) => {
    console.log("Chat completed with data:", data);
    // For now, just log the data to see if it works
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chat Test</h1>
      <StrategyChat onComplete={handleComplete} />
    </div>
  );
}