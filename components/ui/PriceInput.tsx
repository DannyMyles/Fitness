'use client'

const PERIOD_OPTIONS = [
  { label: '/week', value: 'week' },
  { label: '/month', value: 'month' },
  { label: '/year', value: 'year' },
]

interface PriceInputProps {
  value: string // the full composed price string, e.g. "From KES 3,000/month"
  onChange: (price: string) => void
}

function parsePrice(value: string): { amount: string; period: string } {
  const match = value.match(/^From KES\s*(.+?)\/(\w+)$/i)
  if (match && PERIOD_OPTIONS.some((p) => p.value === match[2].toLowerCase())) {
    return { amount: match[1].trim(), period: match[2].toLowerCase() }
  }
  // Doesn't match the expected shape (legacy/free-form value) — keep
  // whatever text is there in the amount field rather than silently
  // dropping it, default the period to month.
  return { amount: value.replace(/^From KES\s*/i, '').replace(/\/\w+$/, '').trim(), period: 'month' }
}

export default function PriceInput({ value, onChange }: PriceInputProps) {
  const { amount, period } = parsePrice(value)

  const compose = (nextAmount: string, nextPeriod: string) => {
    onChange(nextAmount.trim() ? `From KES ${nextAmount.trim()}/${nextPeriod}` : '')
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
      <div className="flex">
        <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-600 text-sm whitespace-nowrap">
          From KES
        </span>
        <input
          type="text"
          value={amount}
          onChange={(e) => compose(e.target.value, period)}
          placeholder="2,000"
          className="flex-1 min-w-0 px-4 py-3 border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:z-10"
          required
        />
        <select
          value={period}
          onChange={(e) => compose(amount, e.target.value)}
          className="px-3 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:z-10 bg-white"
        >
          {PERIOD_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
