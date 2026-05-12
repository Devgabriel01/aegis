// AEGIS — Shared TypeScript Types

// ============================================================
// ENUMS
// ============================================================

export type Plan = "FREE" | "STARTER" | "PROFESSIONAL" | "ENTERPRISE"

export type OrganizationRole = "OWNER" | "ADMIN" | "ANALYST" | "VIEWER" | "READONLY"

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO"

export type ThreatType =
  | "MALWARE" | "PHISHING" | "RANSOMWARE" | "APT" | "BOTNET"
  | "DDOS" | "BRUTEFORCE" | "SQLI" | "XSS" | "RCE"
  | "PRIVESC" | "LATERAL_MOVEMENT" | "EXFILTRATION"
  | "INSIDER_THREAT" | "SOCIAL_ENGINEERING" | "SUPPLY_CHAIN"
  | "ZERO_DAY" | "OTHER"

export type ThreatStatus = "ACTIVE" | "MONITORING" | "MITIGATED" | "RESOLVED" | "FALSE_POSITIVE"

export type IocType =
  | "IP" | "DOMAIN" | "URL" | "EMAIL"
  | "FILE_HASH_MD5" | "FILE_HASH_SHA1" | "FILE_HASH_SHA256"
  | "REGISTRY_KEY" | "MUTEX" | "USER_AGENT" | "ASN" | "CVE"

export type IncidentStatus =
  | "OPEN" | "INVESTIGATING" | "CONTAINED" | "ERADICATED"
  | "RECOVERING" | "RESOLVED" | "CLOSED" | "FALSE_POSITIVE"

export type IncidentCategory =
  | "UNAUTHORIZED_ACCESS" | "MALWARE" | "RANSOMWARE" | "DATA_BREACH"
  | "PHISHING" | "DDOS" | "VULNERABILITY_EXPLOIT" | "INSIDER_THREAT"
  | "SUPPLY_CHAIN" | "SYSTEM_COMPROMISE" | "POLICY_VIOLATION" | "OTHER"

export type Priority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"

export type TlpLevel = "RED" | "AMBER" | "GREEN" | "WHITE"

export type VulnStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "ACCEPTED_RISK" | "FALSE_POSITIVE"

export type ScanType = "FULL" | "PORT" | "SSL" | "DNS" | "HEADERS" | "SUBDOMAIN" | "CVE" | "WEB_APP"

export type ScanStatus = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED"

export type AssetType =
  | "SERVER" | "WORKSTATION" | "DOMAIN" | "IP_ADDRESS" | "CLOUD_INSTANCE"
  | "CONTAINER" | "DATABASE" | "API_ENDPOINT" | "CERTIFICATE"
  | "NETWORK_DEVICE" | "MOBILE_DEVICE" | "IOT_DEVICE"

export type Environment = "PRODUCTION" | "STAGING" | "DEVELOPMENT" | "TESTING" | "DR"

export type LogSourceType =
  | "NGINX" | "APACHE" | "LINUX_SYSLOG" | "WINDOWS_EVENT" | "CLOUDFLARE"
  | "AWS_CLOUDTRAIL" | "GCP_AUDIT" | "AZURE_ACTIVITY" | "PALO_ALTO"
  | "FORTINET" | "CISCO_ASA" | "CROWDSTRIKE" | "CUSTOM"

// ============================================================
// INTERFACES
// ============================================================

export interface Organization {
  id: string
  clerkOrgId: string
  name: string
  slug: string
  plan: Plan
  logoUrl?: string | null
  website?: string | null
  industry?: string | null
  country?: string | null
  timezone: string
  createdAt: Date
  updatedAt: Date
}

export interface OrganizationMember {
  id: string
  organizationId: string
  userId: string
  clerkUserId: string
  email: string
  name: string
  avatarUrl?: string | null
  role: OrganizationRole
  lastSeenAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Threat {
  id: string
  workspaceId: string
  type: ThreatType
  title: string
  description: string
  severity: Severity
  status: ThreatStatus
  confidence: number
  source?: string | null
  sourceUrl?: string | null
  iocType?: IocType | null
  iocValue?: string | null
  ipReputation?: number | null
  geoCountry?: string | null
  geoCity?: string | null
  geoLat?: number | null
  geoLon?: number | null
  aiSummary?: string | null
  aiScore?: number | null
  tags: string[]
  firstSeenAt: Date
  lastSeenAt: Date
  resolvedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Incident {
  id: string
  workspaceId: string
  assignedToId?: string | null
  title: string
  description: string
  severity: Severity
  status: IncidentStatus
  priority: Priority
  category: IncidentCategory
  tlp: TlpLevel
  slaDeadlineAt?: Date | null
  slaBreached: boolean
  detectedAt: Date
  acknowledgedAt?: Date | null
  containedAt?: Date | null
  resolvedAt?: Date | null
  closedAt?: Date | null
  aiSummary?: string | null
  aiRecommendation?: string | null
  aiScore?: number | null
  tags: string[]
  affectedAssets: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Vulnerability {
  id: string
  workspaceId: string
  cveId?: string | null
  title: string
  description: string
  severity: Severity
  cvssScore?: number | null
  cvssVector?: string | null
  status: VulnStatus
  targetType: string
  targetValue: string
  assetId?: string | null
  affectedComponent?: string | null
  affectedVersion?: string | null
  patchVersion?: string | null
  exploitAvailable: boolean
  exploitInWild: boolean
  recommendation?: string | null
  remediationSteps?: string | null
  references: string[]
  scanJobId?: string | null
  discoveredAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Asset {
  id: string
  workspaceId: string
  type: AssetType
  name: string
  value: string
  description?: string | null
  environment: Environment
  tags: string[]
  owner?: string | null
  criticality: Severity
  status: "ACTIVE" | "INACTIVE" | "DECOMMISSIONED" | "UNKNOWN"
  ipAddress?: string | null
  sslExpiry?: Date | null
  sslGrade?: string | null
  lastSeenAt?: Date | null
  lastScannedAt?: Date | null
  uptimePercent?: number | null
  riskScore?: number | null
  createdAt: Date
  updatedAt: Date
}

export interface ScanJob {
  id: string
  workspaceId: string
  type: ScanType
  target: string
  status: ScanStatus
  progress: number
  options: Record<string, unknown>
  results?: Record<string, unknown> | null
  errorLog?: string | null
  startedAt?: Date | null
  completedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// API TYPES
// ============================================================

export interface ApiResponse<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: "asc" | "desc"
}

export interface ThreatFilters extends PaginationParams {
  severity?: Severity
  status?: ThreatStatus
  type?: ThreatType
  search?: string
  workspaceId?: string
}

export interface IncidentFilters extends PaginationParams {
  severity?: Severity
  status?: IncidentStatus
  category?: IncidentCategory
  assignedToId?: string
  search?: string
  workspaceId?: string
}

export interface VulnFilters extends PaginationParams {
  severity?: Severity
  status?: VulnStatus
  exploitInWild?: boolean
  search?: string
  workspaceId?: string
}

// ============================================================
// AI TYPES
// ============================================================

export interface AiThreatAnalysis {
  summary: string
  riskScore: number
  category: ThreatType
  severity: Severity
  indicators: string[]
  recommendations: string[]
  confidence: number
  references: string[]
}

export interface AiIncidentSummary {
  summary: string
  timeline: string
  impactAssessment: string
  immediateActions: string[]
  longTermRecommendations: string[]
  estimatedSeverity: Severity
  confidence: number
}

export interface AiVulnerabilityReport {
  summary: string
  technicalDetails: string
  exploitability: "NONE" | "POC" | "FUNCTIONAL" | "WEAPONIZED"
  impactScore: number
  remediationPriority: "IMMEDIATE" | "URGENT" | "SCHEDULED" | "LOW"
  remediationSteps: string[]
  references: string[]
}

// ============================================================
// DASHBOARD TYPES
// ============================================================

export interface SecurityMetrics {
  securityScore: number
  activeThreats: number
  openIncidents: number
  criticalVulnerabilities: number
  assetsMonitored: number
  assetsAtRisk: number
  eventsToday: number
  blockedAttacks: number
  slaBreached: number
  mttr: number
}

export interface ThreatMapPoint {
  lat: number
  lon: number
  country: string
  count: number
  severity: Severity
  types: ThreatType[]
}

export interface ActivityDataPoint {
  date: string
  threats: number
  incidents: number
  events: number
  blocked: number
}
