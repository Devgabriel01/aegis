import OpenAI from "openai"
import type {
  AiThreatAnalysis,
  AiIncidentSummary,
  AiVulnerabilityReport,
  Threat,
  Incident,
  Vulnerability,
  Severity,
  ThreatType,
} from "@aegis/types"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const AEGIS_SYSTEM_PROMPT = `You are AEGIS AI — an elite cybersecurity analyst with deep expertise in threat intelligence,
incident response, vulnerability management, and security operations. You analyze security data with military precision
and provide actionable, accurate intelligence. You communicate like a senior SOC analyst: concise, technical, and direct.
Always respond with structured JSON matching the requested schema exactly.`

// ============================================================
// THREAT ANALYSIS
// ============================================================

export async function analyzeThreat(threat: {
  title: string
  description: string
  iocValue?: string
  iocType?: string
  source?: string
}): Promise<AiThreatAnalysis> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: AEGIS_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analyze this cybersecurity threat and respond with JSON:

Threat Title: ${threat.title}
Description: ${threat.description}
${threat.iocValue ? `IOC: ${threat.iocType} — ${threat.iocValue}` : ""}
${threat.source ? `Source: ${threat.source}` : ""}

Return JSON with fields:
- summary (string): 2-3 sentence technical summary
- riskScore (number): 0-100
- category (string): one of MALWARE|PHISHING|RANSOMWARE|APT|BOTNET|DDOS|BRUTEFORCE|SQLI|XSS|RCE|PRIVESC|LATERAL_MOVEMENT|EXFILTRATION|INSIDER_THREAT|SOCIAL_ENGINEERING|SUPPLY_CHAIN|ZERO_DAY|OTHER
- severity (string): CRITICAL|HIGH|MEDIUM|LOW|INFO
- indicators (array of strings): key indicators of compromise
- recommendations (array of strings): immediate action items
- confidence (number): 0-100
- references (array of strings): relevant CVEs, MITRE ATT&CK techniques`,
      },
    ],
    max_tokens: 800,
    temperature: 0.1,
  })

  return JSON.parse(response.choices[0].message.content ?? "{}") as AiThreatAnalysis
}

// ============================================================
// INCIDENT SUMMARY
// ============================================================

export async function summarizeIncident(incident: {
  title: string
  description: string
  severity: string
  category: string
  timeline?: string
  affectedAssets?: string[]
  evidences?: string[]
}): Promise<AiIncidentSummary> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: AEGIS_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analyze this security incident and provide a structured response:

Title: ${incident.title}
Description: ${incident.description}
Severity: ${incident.severity}
Category: ${incident.category}
${incident.timeline ? `Timeline: ${incident.timeline}` : ""}
${incident.affectedAssets?.length ? `Affected Assets: ${incident.affectedAssets.join(", ")}` : ""}

Return JSON with:
- summary (string): executive summary (3-4 sentences)
- timeline (string): incident timeline description
- impactAssessment (string): business impact assessment
- immediateActions (array): 3-5 immediate containment actions
- longTermRecommendations (array): 3-5 long-term remediation steps
- estimatedSeverity (string): CRITICAL|HIGH|MEDIUM|LOW
- confidence (number): 0-100`,
      },
    ],
    max_tokens: 900,
    temperature: 0.1,
  })

  return JSON.parse(response.choices[0].message.content ?? "{}") as AiIncidentSummary
}

// ============================================================
// VULNERABILITY REPORT
// ============================================================

export async function analyzeVulnerability(vuln: {
  title: string
  description: string
  cveId?: string
  cvssScore?: number
  affectedComponent?: string
  exploitAvailable?: boolean
  exploitInWild?: boolean
}): Promise<AiVulnerabilityReport> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: AEGIS_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analyze this vulnerability:

Title: ${vuln.title}
Description: ${vuln.description}
${vuln.cveId ? `CVE: ${vuln.cveId}` : ""}
${vuln.cvssScore ? `CVSS Score: ${vuln.cvssScore}` : ""}
${vuln.affectedComponent ? `Component: ${vuln.affectedComponent}` : ""}
Exploit Available: ${vuln.exploitAvailable ? "Yes" : "No"}
Exploit in Wild: ${vuln.exploitInWild ? "Yes — CRITICAL" : "No"}

Return JSON with:
- summary (string): technical summary
- technicalDetails (string): technical impact explanation
- exploitability (string): NONE|POC|FUNCTIONAL|WEAPONIZED
- impactScore (number): 0-100
- remediationPriority (string): IMMEDIATE|URGENT|SCHEDULED|LOW
- remediationSteps (array): ordered remediation steps
- references (array): CVE links, vendor advisories, MITRE ATT&CK`,
      },
    ],
    max_tokens: 700,
    temperature: 0.1,
  })

  return JSON.parse(response.choices[0].message.content ?? "{}") as AiVulnerabilityReport
}

// ============================================================
// RISK SCORING
// ============================================================

export async function calculateSecurityScore(metrics: {
  criticalThreats: number
  highThreats: number
  openIncidents: number
  criticalVulns: number
  assetsAtRisk: number
  totalAssets: number
  slaBreached: number
  daysWithoutIncident: number
}): Promise<{ score: number; breakdown: Record<string, number>; recommendations: string[] }> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: AEGIS_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Calculate a security posture score for these metrics:
${JSON.stringify(metrics, null, 2)}

Return JSON with:
- score (number): 0-100 overall security score
- breakdown (object): scores for network, endpoint, identity, data, response categories
- recommendations (array): top 3 improvement actions`,
      },
    ],
    max_tokens: 400,
    temperature: 0.1,
  })

  return JSON.parse(response.choices[0].message.content ?? "{}") as {
    score: number
    breakdown: Record<string, number>
    recommendations: string[]
  }
}

// ============================================================
// EXECUTIVE REPORT GENERATION
// ============================================================

export async function generateExecutiveReport(data: {
  period: string
  metrics: Record<string, number>
  topThreats: Array<{ title: string; severity: string }>
  resolvedIncidents: number
  openIncidents: number
}): Promise<{ title: string; summary: string; keyFindings: string[]; recommendations: string[]; outlook: string }> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: AEGIS_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Generate an executive security report for ${data.period}:
${JSON.stringify(data, null, 2)}

Return JSON with:
- title (string): report title
- summary (string): 3-4 paragraph executive summary
- keyFindings (array): 5 key security findings
- recommendations (array): 5 strategic recommendations
- outlook (string): security outlook for next period`,
      },
    ],
    max_tokens: 1200,
    temperature: 0.2,
  })

  return JSON.parse(response.choices[0].message.content ?? "{}") as {
    title: string
    summary: string
    keyFindings: string[]
    recommendations: string[]
    outlook: string
  }
}
