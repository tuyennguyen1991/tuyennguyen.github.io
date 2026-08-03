export interface KeyResultSummary {
  code: string
  title: string
  target: string
}

export interface OrgRole {
  title: string
  headcount: number
  kpi: string
  children?: OrgRole[]
}

export interface Department {
  id: string
  name: string
  headTitle: string
  headKpi: string
  totalHeadcount: number
  accentColor: string
  mission: string
  keyResults: KeyResultSummary[]
  valueStream: string[]
  roles: OrgRole[]
}

export interface CompanyInfo {
  name: string
  ceoTitle: string
  period: string
  smartObjective: string
  totalHeadcount: string
}

export const company: CompanyInfo = {
  name: 'TRUONG TON OPC TECHNOLOGY JSC',
  ceoTitle: 'CEO / Ban điều hành',
  period: 'Chiến lược 2026–2030',
  smartObjective:
    'Đến hết Quý 4/2030, trở thành đối tác công nghệ và chuyển đổi số hàng đầu tại Việt Nam trong lĩnh vực dịch vụ số/AI cho doanh nghiệp, bằng cách tăng trưởng doanh thu ≥25%/năm, đạt chuẩn ESG cho 100% dự án lớn, và nâng năng lực R&D nội địa lên ≥5% doanh thu.',
  totalHeadcount: '41 FTE + CEO = 42 FTE (Recommended, 2026–2027)',
}

export const departments: Department[] = [
  {
    id: 'bd',
    name: 'BD / Kinh doanh',
    headTitle: 'Trưởng phòng BD/Kinh doanh',
    headKpi: 'KR1, KR2 (Accountable)',
    totalHeadcount: 11,
    accentColor: '#2e7d32',
    mission:
      'Phát triển khách hàng mới, mở rộng chuỗi cung ứng giá trị cao, chuyển hóa nhu cầu chuyển đổi số/AI của thị trường thành doanh thu.',
    keyResults: [
      { code: 'KR1', title: 'Tăng trưởng doanh thu dịch vụ số/AI', target: '≥25%/năm (CAGR 2026–2030)' },
      { code: 'KR2', title: 'Khách hàng doanh nghiệp lớn mới', target: '≥30 khách hàng lớn vào 2030' },
      { code: 'KR2', title: 'Tỷ lệ khách hàng quốc tế trong danh mục', target: '≥40%' },
    ],
    valueStream: [
      'Thị trường (nhu cầu chuyển đổi số/AI)',
      'Lead Generation',
      'Lead Qualification',
      'Opportunity & Solution Design',
      'Proposal / Bid (kèm compliance quốc tế)',
      'Negotiation',
      'Deal Won',
      'Doanh thu (KR1) + Khách hàng chuỗi giá trị cao (KR2)',
    ],
    roles: [
      { title: 'Account Director – Chiến lược/Quốc tế', headcount: 2, kpi: 'Tỷ lệ khách hàng quốc tế ≥40%' },
      { title: 'BD Executive – Trong nước', headcount: 4, kpi: 'Số khách hàng mới/quý, doanh thu' },
      { title: 'Presales & Solution Consultant', headcount: 2, kpi: 'Win rate, chất lượng giải pháp' },
      { title: 'Bid & Compliance Specialist', headcount: 1, kpi: 'Tỷ lệ hồ sơ đạt chuẩn hội nhập' },
      { title: 'CRM & Sales Operations', headcount: 1, kpi: 'Chất lượng dữ liệu pipeline' },
    ],
  },
  {
    id: 'delivery',
    name: 'Delivery / Kỹ thuật',
    headTitle: 'Trưởng phòng Delivery/Kỹ thuật',
    headKpi: 'KR3 (Accountable)',
    totalHeadcount: 12,
    accentColor: '#1565c0',
    mission:
      'Triển khai dự án đúng tiến độ/ngân sách, đồng thời số hóa và tự động hóa quy trình vận hành nội bộ và cho khách hàng.',
    keyResults: [
      { code: 'KR3', title: 'Digital Maturity Assessment Score', target: 'Cấp 4/5 vào 2028' },
      { code: 'KR3', title: 'Quy trình nghiệp vụ được tự động hóa/AI hóa', target: '≥3 quy trình/năm' },
      { code: 'KR3', title: 'Dự án delivery đúng tiến độ & ngân sách', target: '≥95%' },
    ],
    valueStream: [
      'Nhu cầu Dự án / Quy trình cần số hóa',
      'Lập kế hoạch & Ước lượng (BRD → Estimate)',
      'Phân bổ Nguồn lực',
      'Triển khai Delivery / Automation',
      'Kiểm thử & QA (kèm ESG checklist)',
      'Go-Live & Đo lường (CSAT, Digital Maturity)',
      'Digital Maturity Cấp 4/5 + ≥95% đúng tiến độ/ngân sách',
    ],
    roles: [
      {
        title: 'Delivery Manager',
        headcount: 2,
        kpi: 'Đúng tiến độ & ngân sách',
        children: [
          { title: 'Solution Architect / Delivery Lead', headcount: 3, kpi: 'Chất lượng delivery, CSAT' },
        ],
      },
      {
        title: 'Automation & AI Engineering Lead',
        headcount: 1,
        kpi: 'Số quy trình tự động hóa/năm',
        children: [{ title: 'Automation Engineer', headcount: 3, kpi: 'Triển khai automation/AI' }],
      },
      { title: 'Resource & Capacity Planner', headcount: 1, kpi: 'Tỷ lệ sử dụng nguồn lực' },
      { title: 'Digital Maturity & Data Governance Analyst', headcount: 1, kpi: 'Digital Maturity Score' },
    ],
  },
  {
    id: 'rd',
    name: 'R&D / Đổi mới sáng tạo',
    headTitle: 'Giám đốc R&D/Đổi mới sáng tạo',
    headKpi: 'KR1, KR5 (Accountable)',
    totalHeadcount: 7,
    accentColor: '#ef6c00',
    mission:
      'Dẫn dắt R&D nội bộ, pilot giải pháp AI/công nghệ mới trước khi thương mại hóa cho khách hàng, nuôi dưỡng năng lực sáng tạo của doanh nghiệp.',
    keyResults: [
      { code: 'KR1', title: 'Chi R&D / tổng doanh thu', target: '≥5%/năm từ 2027' },
      { code: 'KR5', title: 'Sản phẩm/giải pháp mới pilot & thương mại hóa', target: '≥2–3/năm' },
      { code: 'KR5', title: 'Bằng sáng chế/IP/case study công nghệ', target: 'Theo năm' },
    ],
    valueStream: [
      'Ý tưởng / Xu hướng công nghệ mới',
      'Nghiên cứu khả thi (Feasibility Study)',
      'Prototype / Pilot',
      'Đánh giá giá trị thương mại',
      'Thương mại hóa (cùng BD/Delivery)',
      'Công bố IP/Case Study',
      'Chi R&D ≥5% doanh thu tạo ra giá trị đo được (KR1, KR5)',
    ],
    roles: [
      {
        title: 'AI/Data Science Lead',
        headcount: 1,
        kpi: 'Số pilot hoàn thành, chất lượng kỹ thuật',
        children: [{ title: 'R&D Engineer / AI Specialist', headcount: 3, kpi: 'Số prototype/pilot theo quý' }],
      },
      {
        title: 'Innovation Pilot & Commercialization Manager',
        headcount: 1,
        kpi: 'Số giải pháp thương mại hóa/năm',
      },
      { title: 'IP & Technical Documentation Specialist', headcount: 1, kpi: 'Số bằng sáng chế/case study công bố' },
    ],
  },
  {
    id: 'esg',
    name: 'ESG / Vận hành Xanh',
    headTitle: 'Trưởng phòng ESG/Vận hành Xanh',
    headKpi: 'KR4 (Accountable)',
    totalHeadcount: 5,
    accentColor: '#5e35b1',
    mission: 'Tích hợp chuẩn ESG/xanh vào toàn bộ vòng đời dự án và giảm phát thải carbon vận hành của doanh nghiệp.',
    keyResults: [
      { code: 'KR4', title: 'Dự án lớn (>500 man-day) có ESG checklist hoàn tất', target: '100% vào 2028' },
      { code: 'KR4', title: 'Giảm phát thải carbon vận hành (Scope 1+2)', target: '-20% vào 2030 (baseline 2026)' },
      { code: 'KR4', title: 'Nhân sự/dự án được đào tạo chuẩn ESG', target: 'Theo quý' },
    ],
    valueStream: [
      'Dự án mới (Proposal/BRD) hoặc Hoạt động vận hành',
      'Tích hợp ESG Checklist vào kế hoạch dự án/vận hành',
      'Thực thi & Đo lường (phát thải, tuân thủ)',
      'Xác nhận trước Go-Live (ESG Compliance Officer)',
      'Báo cáo & Cải tiến (Carbon Analyst)',
      '100% dự án đạt ESG checklist + -20% phát thải Scope 1+2 (KR4)',
    ],
    roles: [
      { title: 'ESG Project Compliance Officer', headcount: 2, kpi: '% dự án đạt ESG checklist' },
      { title: 'Carbon & Environmental Data Analyst', headcount: 1, kpi: '% giảm phát thải Scope 1+2' },
      { title: 'ESG Training & Awareness Specialist', headcount: 1, kpi: 'Số nhân sự được đào tạo/quý' },
    ],
  },
  {
    id: 'hr',
    name: 'Nhân sự / Quản trị',
    headTitle: 'Trưởng phòng Nhân sự/Quản trị',
    headKpi: 'KR5 (Accountable)',
    totalHeadcount: 6,
    accentColor: '#d84315',
    mission:
      'Xây dựng năng lực quản trị hiện đại (result-based governance) cho toàn doanh nghiệp và đảm bảo hệ thống OKR/KPI được vận hành đúng kỷ luật.',
    keyResults: [
      { code: 'KR5', title: 'Quản lý cấp trung hoàn thành đào tạo result-based governance', target: '100% vào 2027' },
      { code: 'KR5', title: 'Cập nhật OKR/KPI đúng hạn hàng tuần toàn doanh nghiệp', target: '≥95% từ Q2/2027' },
      { code: 'KR5', title: 'Tham gia Retrospective/Improvement Portal', target: 'Theo quý' },
    ],
    valueStream: [
      'Chính sách Quản trị theo Kết quả (Performance Alignment Policy)',
      'Đào tạo Result-Based Governance',
      'Áp dụng vào Vận hành (cập nhật OKR/KPI hàng tuần)',
      'Giám sát & Nhắc nhở (OKR/KPI Governance Analyst)',
      'Retrospective & Cải tiến (Improvement Portal)',
      '100% đào tạo + ≥95% cập nhật đúng hạn (KR5)',
    ],
    roles: [
      { title: 'HR Business Partner', headcount: 2, kpi: 'Tham gia Retrospective, gắn kết hiệu suất' },
      { title: 'Result-Based Governance Trainer', headcount: 1, kpi: '% quản lý hoàn thành đào tạo' },
      { title: 'OKR/KPI Governance Analyst', headcount: 1, kpi: 'Tỷ lệ cập nhật OKR/KPI đúng hạn' },
      { title: 'Talent Acquisition & Compensation Specialist', headcount: 1, kpi: 'Tuyển dụng, đãi ngộ gắn KPI' },
    ],
  },
]
