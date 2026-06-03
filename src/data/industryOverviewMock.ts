export type SciTechMetric = {
    label: string;
    value: number;
    accent: string;
};

export const SCI_TECH_ENTERPRISE_METRICS: SciTechMetric[] = [
    { label: "A股上市企业", value: 2, accent: "from-orange-500/10 to-orange-500/5 ring-orange-800" },
    { label: "新三板企业", value: 1, accent: "from-violet-500/10 to-violet-500/5 ring-violet-200" },
    { label: "高新技术企业", value: 118, accent: "from-orange-500/10 to-orange-500/5 ring-orange-800" },
    { label: "企业技术中心", value: 11, accent: "from-cyan-500/10 to-cyan-500/5 ring-cyan-200" },
    { label: "科技型中小企业", value: 107, accent: "from-sky-500/10 to-sky-500/5 ring-sky-200" },
    { label: "创新型中小企业", value: 63, accent: "from-teal-500/10 to-teal-500/5 ring-teal-200" },
    { label: "专精特新企业", value: 55, accent: "from-emerald-500/10 to-emerald-500/5 ring-emerald-200" },
    { label: "专精特新小巨人", value: 2, accent: "from-green-500/10 to-green-500/5 ring-green-200" },
    { label: "国家技术创新示范", value: 0, accent: "from-amber-500/10 to-amber-500/5 ring-amber-200" },
    { label: "省级技术创新示范", value: 0, accent: "from-orange-500/10 to-orange-500/5 ring-orange-200" },
    { label: "制造业单项冠军", value: 4, accent: "from-rose-500/10 to-rose-500/5 ring-rose-200" },
    { label: "隐形冠军企业", value: 0, accent: "from-fuchsia-500/10 to-fuchsia-500/5 ring-fuchsia-200" },
];

export const ENTERPRISE_TREND_YEARS = [
    "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025",
];

export const ENTERPRISE_TREND_COUNTS = [6, 8, 11, 13, 21, 19, 18, 12, 8, 5, 4];

export const CAPITAL_DISTRIBUTION = [
    { name: "100万以内", value: 16 },
    { name: "100万-300万", value: 16 },
    { name: "300万-500万", value: 46 },
    { name: "500万-1000万", value: 52 },
    { name: "1000万以上", value: 82 },
];

export const ENTERPRISE_TOTAL = 212;
