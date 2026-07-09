import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Smile, Folder, Coffee, Trophy } from 'lucide-react';

interface StatCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function StatCounter({ target, suffix = '', duration = 1.5 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statsList = [
    {
      id: 'clients',
      label: 'Happy Clients',
      target: 80,
      suffix: '+',
      icon: Smile,
    },
    {
      id: 'projects',
      label: 'Projects Completed',
      target: 120,
      suffix: '+',
      icon: Folder,
    },
    {
      id: 'experience',
      label: 'Years Experience',
      target: 5,
      suffix: '+',
      icon: Coffee,
    },
    {
      id: 'awards',
      label: 'Awards Received',
      target: 15,
      suffix: '+',
      icon: Trophy,
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#F45C6D] via-[#9F5CFC] to-[#3B82F6] p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
        >
          {/* Subtle overlay to match depth */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-2 md:gap-x-6 lg:gap-0 lg:divide-x divide-white/15">
            {statsList.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="flex items-center justify-start px-3 sm:px-6 md:px-8 lg:px-10 gap-3 sm:gap-4 md:gap-5"
                >
                  {/* Stat Icon */}
                  <div className="text-white/95 flex-shrink-0">
                    <Icon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 stroke-[1.5]" />
                  </div>

                  {/* Counter & Label */}
                  <div className="flex flex-col text-left">
                    <div className="leading-none">
                      <StatCounter target={stat.target} suffix={stat.suffix} />
                    </div>
                    <p className="text-[10px] sm:text-xs md:text-sm text-white/80 font-sans font-medium mt-1 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
