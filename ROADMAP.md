# AEGIS — Technical Roadmap

## MVP (v0.1 — Current)
**Goal:** Functional security platform usable by small SOC teams.

### Done
- [x] Monorepo setup (Turborepo + pnpm)
- [x] Next.js 15 App Router
- [x] Design system (glassmorphism, HUD components, color tokens)
- [x] Landing page (cinematographic)
- [x] Authentication (Clerk)
- [x] Dashboard layout + sidebar navigation
- [x] Main dashboard (metrics, threat feed, incidents, chart)
- [x] Threat Intelligence page (IOC tracking, lookup)
- [x] Vulnerability Scanner page (interactive scanner)
- [x] Incident Response (Kanban board)
- [x] Prisma schema (complete data model)
- [x] Shared types package
- [x] AI lib (OpenAI integration)
- [x] Docker setup

### In Progress
- [ ] Supabase integration (database connection)
- [ ] Clerk webhooks (user/org sync)
- [ ] SIEM log ingestion API
- [ ] Assets management page
- [ ] Reports page
- [ ] Team management page

## v0.2 — Alpha
**Goal:** Working end-to-end with real data.

- [ ] Supabase Realtime (live threat feed)
- [ ] Vulnerability scanner backend (Shodan API, nvd.nist.gov)
- [ ] IOC enrichment (AbuseIPDB, VirusTotal API)
- [ ] Incident timeline & comments
- [ ] Evidence upload (Supabase Storage)
- [ ] Email notifications (Resend)
- [ ] Slack integration (webhook alerts)
- [ ] API key management
- [ ] Audit log viewer
- [ ] Billing (Stripe)

## v0.3 — Beta
**Goal:** Production-ready for early customers.

- [ ] SIEM log parser (nginx, syslog, Windows Event)
- [ ] Alert rule engine
- [ ] Asset discovery automation
- [ ] SSL certificate monitoring
- [ ] Global attack map (real geolocation data)
- [ ] Executive reports (PDF generation)
- [ ] Multi-workspace support
- [ ] RBAC full implementation
- [ ] SOC 2 controls
- [ ] Rate limiting (Upstash Redis)
- [ ] API rate limiting per plan

## v1.0 — Launch
**Goal:** Enterprise-grade, GA release.

- [ ] SSO / SAML 2.0 (Clerk)
- [ ] Advanced SIEM correlation engine
- [ ] Custom detection rules (SIGMA)
- [ ] MITRE ATT&CK mapping
- [ ] Threat hunting workbench
- [ ] Network topology visualization
- [ ] Compliance frameworks (NIST, ISO 27001, SOC 2)
- [ ] On-premise option (Docker)
- [ ] Mobile app (React Native)
- [ ] REST API (public)
- [ ] Webhooks
- [ ] SDKs (Python, Node.js)

## Enterprise (v2.0)
- [ ] Custom ML models (anomaly detection)
- [ ] SOAR integration
- [ ] Threat simulation
- [ ] Red team playbooks
- [ ] Zero-trust network access
- [ ] Hardware security module integration
- [ ] Air-gapped deployment option
