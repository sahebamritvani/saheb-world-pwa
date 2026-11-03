import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { SadhanaHistoryDay } from '../utils/sadhanaStorage';
import { useLanguage } from '../context/LanguageContext';

interface SadhanaLineChartProps {
  data: SadhanaHistoryDay[];
  dailyGoal: number;
}

export const SadhanaLineChart: React.FC<SadhanaLineChartProps> = ({ data, dailyGoal }) => {
  const { lang } = useLanguage();

  return (
    <div className="w-full h-44 sm:h-52 pt-2">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1d6b0" opacity={0.6} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: '#78350f', fontWeight: 'bold' }}
            stroke="#b45309"
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#92400e' }}
            stroke="#b45309"
            tickLine={false}
            domain={[0, (dataMax: number) => Math.max(dailyGoal + 10, Math.ceil((Number.isFinite(dataMax) ? dataMax : 0) * 1.25))]}
            unit="m"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as SadhanaHistoryDay;
                const achieved = item.minutes >= dailyGoal;
                return (
                  <div className="bg-[#FFFDF9] border border-amber-400 p-2 rounded-xl shadow-xl text-xs space-y-1">
                    <p className="font-bold text-amber-950 m-0">
                      {item.date} ({item.day})
                    </p>
                    <p className="m-0 text-[#8B0000] font-black">
                      {item.minutes} {lang === 'pa' ? 'ਮਿੰਟ ਸਾਧਨਾ' : lang === 'en' ? 'min sadhana' : 'मिनट साधना'}
                    </p>
                    <p className="m-0 text-[10px] text-gray-500">
                      {lang === 'pa' ? `ਟੀਚਾ: ${dailyGoal} ਮਿੰਟ` : lang === 'en' ? `Goal: ${dailyGoal} min` : `दैनिक लक्ष्य: ${dailyGoal} मिनट`}
                    </p>
                    {achieved ? (
                      <span className="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1">
                        ✓ {lang === 'pa' ? 'ਟੀਚਾ ਪੂਰਾ' : lang === 'en' ? 'Goal Reached' : 'लक्ष्य पूर्ण'} 🌹
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-800">
                        {dailyGoal - item.minutes}m {lang === 'pa' ? 'ਬਾਕੀ' : lang === 'en' ? 'left' : 'शेष'}
                      </span>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#c2410c"
            strokeWidth={3}
            dot={{ r: 4, fill: '#b45309', stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#8B0000', stroke: '#fef3c7', strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
