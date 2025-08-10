"use client"
import { motion } from 'framer-motion'

export default function HealthGauge({ score }: { score: number }) {
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const normalized = Math.max(0, Math.min(100, score))
  const dash = (normalized / 100) * circumference
  const color = normalized >= 80 ? '#16a34a' : normalized >= 60 ? '#f59e0b' : '#dc2626'

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth="12" fill="none" />
      <motion.circle
        cx="60"
        cy="60"
        r={radius}
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${dash} ${circumference - dash}`}
        transform="rotate(-90 60 60)"
        initial={{ strokeDasharray: `0 ${circumference}` }}
        animate={{ strokeDasharray: `${dash} ${circumference - dash}` }}
        transition={{ duration: 0.8 }}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fontWeight={700} fill="#111827">
        {normalized}
      </text>
    </svg>
  )
}


