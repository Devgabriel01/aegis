import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | number): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string | number): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string | number): string {
  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" })
  const diff = (new Date(date).getTime() - Date.now()) / 1000
  const absDiff = Math.abs(diff)

  if (absDiff < 60) return rtf.format(Math.round(diff), "second")
  if (absDiff < 3600) return rtf.format(Math.round(diff / 60), "minute")
  if (absDiff < 86400) return rtf.format(Math.round(diff / 3600), "hour")
  if (absDiff < 2592000) return rtf.format(Math.round(diff / 86400), "day")
  return rtf.format(Math.round(diff / 2592000), "month")
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toLocaleString()
}

export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"]
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(1)} ${units[i]}`
}

export function getSeverityColor(severity: string): string {
  const map: Record<string, string> = {
    critical: "text-aegis-critical",
    high: "text-aegis-high",
    medium: "text-aegis-medium",
    low: "text-aegis-low",
    info: "text-aegis-silver-400",
  }
  return map[severity.toLowerCase()] ?? "text-aegis-silver-400"
}

export function getSeverityBgColor(severity: string): string {
  const map: Record<string, string> = {
    critical: "bg-aegis-critical/10 border-aegis-critical/20",
    high: "bg-aegis-high/10 border-aegis-high/20",
    medium: "bg-aegis-medium/10 border-aegis-medium/20",
    low: "bg-aegis-low/10 border-aegis-low/20",
    info: "bg-aegis-silver-800 border-aegis-silver-700",
  }
  return map[severity.toLowerCase()] ?? "bg-aegis-silver-800 border-aegis-silver-700"
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: "text-aegis-green-400",
    online: "text-aegis-green-400",
    open: "text-aegis-cyan-400",
    investigating: "text-aegis-medium",
    resolved: "text-aegis-silver-400",
    closed: "text-aegis-silver-400",
    critical: "text-aegis-critical",
    offline: "text-aegis-critical",
    warning: "text-aegis-medium",
  }
  return map[status.toLowerCase()] ?? "text-aegis-silver-400"
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return `${str.slice(0, length)}...`
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }) as T
}

export function ipToLong(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0
}

export function isValidIp(ip: string): boolean {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) &&
    ip.split(".").every((o) => parseInt(o) >= 0 && parseInt(o) <= 255)
}

export function isValidDomain(domain: string): boolean {
  return /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(domain)
}

export function cvssScoreToSeverity(score: number): "critical" | "high" | "medium" | "low" | "info" {
  if (score >= 9.0) return "critical"
  if (score >= 7.0) return "high"
  if (score >= 4.0) return "medium"
  if (score >= 0.1) return "low"
  return "info"
}
