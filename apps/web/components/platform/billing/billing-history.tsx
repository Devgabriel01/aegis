"use client"

import { motion } from "framer-motion"
import { Download, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const INVOICES = [
  { id: "inv-0012", date: "May 1, 2026", amount: "$499.00", status: "paid", period: "May 2026" },
  { id: "inv-0011", date: "Apr 1, 2026", amount: "$499.00", status: "paid", period: "April 2026" },
  { id: "inv-0010", date: "Mar 1, 2026", amount: "$499.00", status: "paid", period: "March 2026" },
  { id: "inv-0009", date: "Feb 1, 2026", amount: "$499.00", status: "paid", period: "February 2026" },
  { id: "inv-0008", date: "Jan 1, 2026", amount: "$499.00", status: "paid", period: "January 2026" },
  { id: "inv-0007", date: "Dec 1, 2025", amount: "$499.00", status: "paid", period: "December 2025" },
]

export function BillingHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="hud-panel rounded-2xl border border-aegis"
    >
      <div className="flex items-center justify-between p-4 border-b border-aegis">
        <div>
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// INVOICES</p>
          <h3 className="text-sm font-semibold text-foreground mt-0.5">Payment History</h3>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="size-3" />
          Export All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-aegis">
              {["Invoice", "Period", "Amount", "Date", "Status", ""].map((col) => (
                <th key={col} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv, i) => (
              <motion.tr
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group border-b border-aegis/50 last:border-0 hover:bg-aegis-elevated/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="text-xs font-mono text-aegis-blue-400">{inv.id}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-foreground">{inv.period}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold font-mono text-foreground">{inv.amount}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-mono text-muted-foreground">{inv.date}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {inv.status === "paid"
                      ? <CheckCircle className="size-3 text-aegis-green-400" />
                      : <Clock className="size-3 text-aegis-high" />
                    }
                    <span className="text-xs font-medium capitalize" style={{ color: inv.status === "paid" ? "var(--aegis-green-400, #4ADE80)" : undefined }}>
                      {inv.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download className="size-3" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
