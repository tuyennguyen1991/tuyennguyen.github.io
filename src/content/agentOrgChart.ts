export interface AgentNode {
  id: string
  name: string
  tier: 'Tier-2'
  inputs: string[]
  produces: string[]
}

export interface AgentOrchestrator {
  id: string
  name: string
  tier: 'Tier-1'
  kr: string
  inputs: string[]
  produces: string[]
}

export interface AgentDepartment {
  id: string
  name: string
  accentColor: string
  orchestrator: AgentOrchestrator
  skills: AgentNode[]
}

export interface CeoAgentInfo {
  name: string
  responsibilities: string[]
  tieringNote: string
}

export const ceoAgent: CeoAgentInfo = {
  name: 'CEO Agent',
  responsibilities: [
    'Strategic objectives',
    'OKRs',
    'Budget allocation (incl. gating Growth HC via WF-5)',
    'Cross-department conflict resolution',
    'Executive reporting',
    'Board communication',
  ],
  tieringNote:
    'Tier-1 orchestrators (5) are persistent, always-on agents — one per department. Tier-2 skills (18) are on-demand specialists invoked by their department orchestrator, not standing processes.',
}

export const agentDepartments: AgentDepartment[] = [
  {
    id: 'bd',
    name: 'BD / Kinh doanh',
    accentColor: '#2e7d32',
    orchestrator: {
      id: 'head_of_sales',
      name: 'Head of Sales Agent',
      tier: 'Tier-1',
      kr: 'KR1, KR2',
      inputs: ['sales_targets', 'pipeline_summary', 'market_intel'],
      produces: ['revenue_forecast', 'sales_strategy', 'kr1_kr2_report'],
    },
    skills: [
      {
        id: 'account_director',
        name: 'Account Director Agent',
        tier: 'Tier-2',
        inputs: ['key_accounts', 'strategic_opportunities', 'international_leads'],
        produces: ['account_plans', 'international_pipeline', 'kr2_report'],
      },
      {
        id: 'bd_executive',
        name: 'BD Executive Agent',
        tier: 'Tier-2',
        inputs: ['domestic_leads', 'market_events', 'prospect_list'],
        produces: ['qualified_leads', 'meeting_notes', 'opportunity_updates'],
      },
      {
        id: 'presales',
        name: 'Presales Agent',
        tier: 'Tier-2',
        inputs: ['customer_requirements', 'rfp', 'proposal_request'],
        produces: ['solution_design', 'effort_estimate', 'proposal'],
      },
      {
        id: 'bid_compliance',
        name: 'Bid Compliance Agent',
        tier: 'Tier-2',
        inputs: ['bid_requirements', 'certification_status', 'compliance_rules'],
        produces: ['bid_submission (HITL)', 'compliance_checklist', 'certification_request (→ WF-2)'],
      },
      {
        id: 'crm_operations',
        name: 'CRM Operations Agent',
        tier: 'Tier-2',
        inputs: ['crm_events', 'sales_activities', 'customer_data'],
        produces: ['pipeline_report', 'crm_hygiene_report', 'sales_ops_dashboard'],
      },
    ],
  },
  {
    id: 'delivery',
    name: 'Delivery / Kỹ thuật',
    accentColor: '#1565c0',
    orchestrator: {
      id: 'delivery_manager',
      name: 'Delivery Manager Agent',
      tier: 'Tier-1',
      kr: 'KR3',
      inputs: ['project_plans', 'milestones', 'team_status'],
      produces: ['project_status', 'risk_register', 'kr3_report'],
    },
    skills: [
      {
        id: 'solution_architect',
        name: 'Solution Architect Agent',
        tier: 'Tier-2',
        inputs: ['requirements', 'technical_constraints', 'esg_requirements'],
        produces: ['architecture_design', 'technical_spec', 'go_live_approval (blocking, via WF-3)'],
      },
      {
        id: 'automation_engineer',
        name: 'Automation Engineer Agent',
        tier: 'Tier-2',
        inputs: ['process_inventory', 'automation_opportunities', 'ai_capabilities'],
        produces: ['automation_roadmap', 'automated_processes', 'efficiency_report'],
      },
      {
        id: 'capacity_planner',
        name: 'Capacity Planner Agent',
        tier: 'Tier-2',
        inputs: ['resource_pool', 'active_projects', 'future_pipeline'],
        produces: ['resource_forecast', 'hiring_request', 'utilization_report'],
      },
      {
        id: 'governance_analyst',
        name: 'Governance Analyst Agent',
        tier: 'Tier-2',
        inputs: ['digital_maturity_assessment', 'data_governance_rules', 'project_metrics'],
        produces: ['maturity_score', 'data_governance_report', 'kr3_maturity_report'],
      },
    ],
  },
  {
    id: 'rd',
    name: 'R&D / Đổi mới sáng tạo',
    accentColor: '#ef6c00',
    orchestrator: {
      id: 'rnd_director',
      name: 'R&D Director Agent',
      tier: 'Tier-1',
      kr: 'KR1, KR5',
      inputs: ['research_portfolio', 'budget_allocation', 'strategic_direction'],
      produces: ['rnd_strategy', 'budget_report', 'kr1_rnd_report'],
    },
    skills: [
      {
        id: 'ai_scientist',
        name: 'AI Scientist Agent',
        tier: 'Tier-2',
        inputs: ['research_questions', 'data_sources', 'experiment_designs'],
        produces: ['research_findings', 'models', 'experiment_results'],
      },
      {
        id: 'innovation',
        name: 'Innovation Agent',
        tier: 'Tier-2',
        inputs: ['market_trends', 'pilot_ideas', 'customer_feedback'],
        produces: ['pilot_proposals', 'commercialization_handoff (→ WF-1)', 'innovation_report'],
      },
      {
        id: 'ip_documentation',
        name: 'IP Documentation Agent',
        tier: 'Tier-2',
        inputs: ['invention_disclosures', 'technical_designs', 'patent_filings'],
        produces: ['patent_applications (HITL: legal review)', 'technical_docs', 'ip_register'],
      },
    ],
  },
  {
    id: 'esg',
    name: 'ESG / Vận hành Xanh',
    accentColor: '#5e35b1',
    orchestrator: {
      id: 'esg_director',
      name: 'ESG Director Agent',
      tier: 'Tier-1',
      kr: 'KR4',
      inputs: ['esg_targets', 'compliance_regulations', 'sustainability_goals'],
      produces: ['esg_strategy', 'kr4_report', 'esg_policy'],
    },
    skills: [
      {
        id: 'compliance',
        name: 'Compliance Agent',
        tier: 'Tier-2',
        inputs: ['project_plans', 'esg_checklist', 'regulatory_rules'],
        produces: ['esg_checklist_status', 'compliance_audit (HITL)', 'go_live_gate (blocking, → WF-3)'],
      },
      {
        id: 'carbon_analyst',
        name: 'Carbon Analyst Agent',
        tier: 'Tier-2',
        inputs: ['electricity', 'cloud_usage', 'travel_data'],
        produces: ['scope1', 'scope2', 'scope3', 'reports'],
      },
      {
        id: 'esg_education',
        name: 'ESG Education Agent',
        tier: 'Tier-2',
        inputs: ['training_needs', 'awareness_campaigns', 'employee_engagement'],
        produces: ['training_materials', 'awareness_report', 'esg_culture_score'],
      },
    ],
  },
  {
    id: 'hr',
    name: 'Nhân sự / Quản trị',
    accentColor: '#d84315',
    orchestrator: {
      id: 'hrbp',
      name: 'HRBP Agent',
      tier: 'Tier-1',
      kr: 'KR5',
      inputs: ['people_records', 'performance_reviews', 'department_needs'],
      produces: ['people_insights', 'retention_report', 'hr_support_plan'],
    },
    skills: [
      {
        id: 'governance_trainer',
        name: 'Governance Trainer Agent',
        tier: 'Tier-2',
        inputs: ['training_curriculum', 'okr_cycles', 'rag_status'],
        produces: ['training_records', 'governance_training (→ WF-4)', 'completion_report'],
      },
      {
        id: 'okr_analyst',
        name: 'OKR Analyst Agent',
        tier: 'Tier-2',
        inputs: ['kr_scores', 'department_updates', 'dashboard_data'],
        produces: ['okr_dashboard', 'rag_report', 'kr5_report'],
      },
      {
        id: 'talent',
        name: 'Talent Agent',
        tier: 'Tier-2',
        inputs: ['hiring_requests', 'growth_forecast', 'budget_approval'],
        produces: ['hiring_plan (HITL: budget)', 'onboarding_plan', 'talent_pipeline (→ WF-5)'],
      },
    ],
  },
]
