import React from "react";

const TARGET = "北京智慧易科技有限公司";

type BranchItem = {
    category: string;
    tone: "amber" | "sky" | "slate";
    items: { primary: string; secondary?: string; tag?: string }[];
};

const LEFT_BRANCHES: BranchItem[] = [
    {
        category: "控制企业",
        tone: "sky",
        items: [
            {
                primary: "东莞市知慧易科技有限责任公司",
                secondary: "100%",
                tag: "存续",
            },
            {
                primary: "海南智慧易科技有限公司",
                secondary: "100%",
                tag: "注销",
            },
        ],
    },
    {
        category: "分支机构",
        tone: "sky",
        items: [
            {
                primary: "台州分公司",
                secondary: "负责人：石岩 · 2025-03-18",
            },
            {
                primary: "太原分公司",
                secondary: "负责人：石岩 · 2024-04-25",
            },
        ],
    },
    {
        category: "客户（节选）",
        tone: "slate",
        items: [
            { primary: "上海星图金融服务集团有限公司" },
            { primary: "青岛澳柯玛智慧冷链有限公司" },
            { primary: "中国医学科学院医学信息研究所", secondary: "30万元" },
            { primary: "联通（山东）产业互联网有限公司", secondary: "62.54万元" },
            { primary: "等13家客户…" },
        ],
    },
    {
        category: "疑似关系（节选）",
        tone: "slate",
        items: [
            { primary: "北京元子拓扑科技有限公司", secondary: "相同电话/邮箱" },
            { primary: "北京元拓扑企业管理中心（有限合伙）" },
            { primary: "合肥知慧易科技有限公司" },
            { primary: "等5家…" },
        ],
    },
];

const RIGHT_BRANCHES: BranchItem[] = [
    {
        category: "法定代表人",
        tone: "amber",
        items: [{ primary: "关涛" }],
    },
    {
        category: "实际控制人",
        tone: "amber",
        items: [
            {
                primary: "关涛",
                secondary: "总持股 54.7931% · 表决权 97%",
            },
        ],
    },
    {
        category: "受益所有人",
        tone: "amber",
        items: [
            {
                primary: "关涛",
                secondary: "间接持股 · 董事长、经理",
            },
        ],
    },
    {
        category: "股东信息",
        tone: "amber",
        items: [
            {
                primary: "北京元子拓扑科技有限公司",
                secondary: "97.00%",
            },
            {
                primary: "鹰潭鼎创投资咨询（有限合伙）",
                secondary: "3.00%",
            },
        ],
    },
    {
        category: "主要人员",
        tone: "amber",
        items: [
            { primary: "关涛", secondary: "董事长、经理" },
            { primary: "王东晖", secondary: "董事" },
            { primary: "李国亮", secondary: "董事" },
            { primary: "张少游", secondary: "监事" },
            { primary: "李影欣", secondary: "财务负责人" },
        ],
    },
    {
        category: "对外投资",
        tone: "amber",
        items: [
            {
                primary: "东莞市知慧易科技有限责任公司",
                secondary: "100%",
                tag: "存续",
            },
            {
                primary: "海南智慧易科技有限公司",
                secondary: "100%",
                tag: "注销",
            },
        ],
    },
];

const toneStyles = {
    amber: {
        head: "bg-amber-500 text-white",
        border: "border-amber-200",
        bg: "bg-amber-50/50",
    },
    sky: {
        head: "bg-sky-600 text-white",
        border: "border-sky-200",
        bg: "bg-sky-50/50",
    },
    slate: {
        head: "bg-slate-600 text-white",
        border: "border-slate-200",
        bg: "bg-slate-50/80",
    },
} as const;

function BranchCard({
    branch,
    compact,
}: {
    branch: BranchItem;
    compact?: boolean;
}) {
    const s = toneStyles[branch.tone];
    return (
        <div
            className={`rounded-lg border ${s.border} ${s.bg} overflow-hidden text-left shadow-sm`}
        >
            <div
                className={`font-bold ${s.head} ${
                    compact ? "px-1.5 py-0.5 text-[8px]" : "px-2.5 py-1 text-[10px]"
                }`}
            >
                {branch.category}
            </div>
            <ul
                className={
                    compact ? "px-1.5 py-1 space-y-0.5" : "px-2.5 py-2 space-y-1.5"
                }
            >
                {branch.items.map((item) => (
                    <li
                        key={`${branch.category}-${item.primary}`}
                        className={
                            compact ? "text-[8px] leading-tight" : "text-[10px] leading-snug"
                        }
                    >
                        <span className="font-semibold text-slate-900">
                            {item.primary}
                        </span>
                        {item.secondary && (
                            <span className="block text-slate-500 mt-0.5">
                                {item.secondary}
                            </span>
                        )}
                        {item.tag && (
                            <span className="ml-1 inline-block rounded bg-orange-100 px-1 text-[9px] font-bold text-orange-700">
                                {item.tag}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Connector({ side }: { side: "left" | "right" }) {
    return (
        <div
            className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-8 h-px border-t-2 border-dashed border-slate-300 ${
                side === "left" ? "right-0 translate-x-full" : "left-0 -translate-x-full"
            }`}
            aria-hidden
        />
    );
}

export function EnterpriseGraph({ compact = false }: { compact?: boolean }) {
    return (
        <div
            className={`w-full ${
                compact
                    ? "py-2 px-1"
                    : "overflow-x-auto rounded-xl border border-slate-200 shadow-sm py-5 px-3 sm:px-4"
            }`}
            role="img"
            aria-label={`${TARGET}企业图谱`}
        >
            <p
                className={`text-center text-slate-500 ${
                    compact ? "text-[9px] mb-2" : "text-xs mb-4"
                }`}
            >
                企业图谱（数据依据企业信用决策报告）
            </p>

            <div
                className={`grid items-start min-w-0 ${
                    compact
                        ? "grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-1.5"
                        : "grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-3 min-w-[640px]"
                }`}
            >
                <div className={compact ? "space-y-1" : "space-y-2 lg:pr-2"}>
                    {LEFT_BRANCHES.map((b) => (
                        <div key={b.category} className="relative">
                            <BranchCard branch={b} compact={compact} />
                            {!compact && <Connector side="left" />}
                        </div>
                    ))}
                </div>

                <div
                    className={`flex items-center justify-center ${
                        compact ? "py-1 sm:py-2" : "py-4 lg:py-8 lg:sticky lg:top-4"
                    }`}
                >
                    <div
                        className={`relative rounded-xl bg-blue-600 text-center shadow-lg w-full ${
                            compact
                                ? "px-2 py-2 max-w-full sm:max-w-[9rem]"
                                : "px-4 py-4 sm:px-6 max-w-[220px]"
                        }`}
                    >
                        <p
                            className={`font-bold text-white leading-snug ${
                                compact ? "text-[9px]" : "text-sm"
                            }`}
                        >
                            {TARGET}
                        </p>
                        <p
                            className={`text-blue-100 ${
                                compact ? "text-[7px] mt-0.5" : "text-[10px] mt-2"
                            }`}
                        >
                            科学研究和技术服务业
                        </p>
                    </div>
                </div>

                <div className={compact ? "space-y-1" : "space-y-2 lg:pl-2"}>
                    {RIGHT_BRANCHES.map((b) => (
                        <div key={b.category} className="relative">
                            {!compact && <Connector side="right" />}
                            <BranchCard branch={b} compact={compact} />
                        </div>
                    ))}
                </div>
            </div>

            <p
                className={`text-center text-slate-400 ${
                    compact ? "text-[8px] mt-2" : "text-[9px] mt-4"
                }`}
            >
                左：控制与经营扩展 · 右：治理与股权 · 由公开数据整理
            </p>
        </div>
    );
}

export default EnterpriseGraph;
