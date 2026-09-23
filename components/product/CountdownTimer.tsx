import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isExpired: false
  });

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const formattedDate = targetDate.replace(' ', 'T');
      const difference = new Date(formattedDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
        isExpired: false
      });
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) return null;

  return (
    <div className="flex gap-2 items-center">
      {parseInt(timeLeft.days) > 0 && (
        <>
          <span className="bg-red-600 text-white font-bold px-2 py-1 rounded">{timeLeft.days}d</span>
          <span className="text-red-600 font-bold">:</span>
        </>
      )}
      <span className="bg-red-600 text-white font-bold px-2 py-1 rounded">{timeLeft.hours}</span>
      <span className="text-red-600 font-bold">:</span>
      <span className="bg-red-600 text-white font-bold px-2 py-1 rounded">{timeLeft.minutes}</span>
      <span className="text-red-600 font-bold">:</span>
      <span className="bg-red-600 text-white font-bold px-2 py-1 rounded">{timeLeft.seconds}</span>
    </div>
  );
}
