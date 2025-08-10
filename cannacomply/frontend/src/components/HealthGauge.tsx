"use client"
import { motion } from 'framer-motion'

export default function HealthGauge({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score))
  const color = pct >= 80 ? '#16a34a' : pct >= 60 ? '#f59e0b' : '#dc2626'
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const dash = (pct / 100) * circumference
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="12" />
      <motion.circle
        cx="70"
        cy="70"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        initial={{ strokeDasharray: `0 ${circumference}` }}
        animate={{ strokeDasharray: `${dash} ${circumference}` }}
        transition={{ duration: 0.8 }}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fontWeight={600} fill="#111827">
        {pct}
      </text>
    </svg>
  )
}


