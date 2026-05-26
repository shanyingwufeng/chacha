import React from "react";

const TARGET = "北京智慧易科技有限公司";

type UpstreamNode = {
    name: string;
    pct: string;
    person?: boolean;
    role?: string;
    muted?: boolean;
};

const YUANZI_UPSTREAM: UpstreamNode[] = [
    { name: "关涛", pct: "45.01%", role: "实际控制人", person: true },
    { name: "北京元拓企业管理中心（有限合伙）", pct: "10.28%" },
    { name: "杭州阿米巴博远创业投资合伙企业（有限合伙）", pct: "9.99%" },
    { name: "北京海淀开元企业管理中心（有限合伙）", pct: "8.12%" },
    { name: "其余机构股东", pct: "等6家", muted: true },
];

const YINGTAN_UPSTREAM: UpstreamNode[] = [
    { name: "陈凤珍", pct: "90%", person: true },
    { name: "陈国文", pct: "10%", person: true },
];

const DIRECT_SHAREHOLDERS = [
    { name: "北京元子拓扑科技有限公司", pct: "97.00%" },
    { name: "鹰潭鼎创投资咨询（有限合伙）", pct: "3.00%" },
] as const;

const SUBSIDIARIES = [
    { name: "东莞市知慧易科技有限责任公司", pct: "100%", status: "存续" as const },
    { name: "海南智慧易科技有限公司", pct: "100%", status: "注销" as const },
] as const;

function NodeCard({
    name,
    sub,
    variant = "company",
    badge,
    className = "",
}: {
    name: string;
    sub?: string;
    variant?: "person" | "company" | "target" | "muted";
    badge?: string;
    className?: string;
}) {
    const styles = {
        person: "border-red-300 bg-red-50 text-slate-900",
        company: "border-blue-200 bg-white text-slate-900",
        target: "border-blue-700 bg-blue-600 text-white shadow-md",
        muted: "border-slate-200 bg-slate-50 text-slate-600",
    }[variant];

    const subClass =
        variant === "target" ? "text-blue-100" : "text-slate-500";

    return (
        <div
            className={`relative rounded-lg border px-3 py-2.5 text-center min-w-[7.5rem] max-w-[11rem] ${styles} ${className}`}
            title={name}
        >
            {badge && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
                    {badge}
                </span>
            )}
            <p
                className={`text-[11px] font-semibold leading-snug break-words ${
                    badge ? "mt-2" : ""
                }`}
            >
                {name}
            </p>
            {sub && (
                <p className={`mt-1 text-[10px] font-bold ${subClass}`}>{sub}</p>
            )}
        </div>
    );
}

function VConnector({ label }: { label?: string }) {
    return (
        <div className="flex flex-col items-center py-1 text-slate-400" aria-hidden>
            <div className="w-px h-4 border-l-2 border-dashed border-slate-300" />
            {label && (
                <span className="my-0.5 text-[11px] font-bold text-blue-600">
                    {label}
                </span>
            )}
            <span className="text-[10px]">▼</span>
        </div>
    );
}

function HBranch() {
    return (
        <div
            className="flex items-center justify-center w-full max-w-2xl mx-auto py-1"
            aria-hidden
        >
            <div className="h-px flex-1 border-t-2 border-dashed border-slate-300" />
            <div className="w-px h-3 border-l-2 border-dashed border-slate-300 mx-2" />
            <div className="h-px flex-1 border-t-2 border-dashed border-slate-300" />
        </div>
    );
}

export function EquityPenetrationGraph() {
    return (
        <div
            className="w-full rounded-xl border border-slate-200 bg-white shadow-sm py-5 px-3 sm:px-5"
            role="img"
            aria-label={`${TARGET}股权穿透图谱（演示数据）`}
        >
            <p className="text-center text-xs text-slate-500 mb-5">
                股权穿透（数据依据企业信用决策报告 · 演示）
            </p>

            <div className="flex flex-col items-center gap-0 max-w-4xl mx-auto">
                {/* 上游股东 */}
                <div className="w-full space-y-3">
                    <p className="text-[10px] font-semibold text-slate-400 text-center uppercase tracking-wide">
                        上游股东（元子拓扑）
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {YUANZI_UPSTREAM.map((node) => (
                            <NodeCard
                                key={node.name}
                                name={node.name}
                                sub={node.pct}
                                variant={
                                    node.person
                                        ? "person"
                                        : node.muted
                                          ? "muted"
                                          : "company"
                                }
                                badge={node.role}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full space-y-3 mt-2">
                    <p className="text-[10px] font-semibold text-slate-400 text-center">
                        鹰潭鼎创上游
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {YINGTAN_UPSTREAM.map((node) => (
                            <NodeCard
                                key={node.name}
                                name={node.name}
                                sub={node.pct}
                                variant="person"
                            />
                        ))}
                    </div>
                </div>

                <HBranch />
                <VConnector />

                {/* 直接股东 */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 w-full">
                    {DIRECT_SHAREHOLDERS.map((sh) => (
                        <div
                            key={sh.name}
                            className="flex flex-col items-center"
                        >
                            <NodeCard
                                name={sh.name}
                                sub={sh.pct}
                                className="max-w-[13rem] sm:max-w-[15rem]"
                            />
                        </div>
                    ))}
                </div>

                <VConnector />

                <NodeCard
                    name={TARGET}
                    variant="target"
                    className="max-w-md w-full sm:w-auto px-6 py-3"
                />

                <VConnector label="100%" />

                {/* 对外投资 */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 w-full">
                    {SUBSIDIARIES.map((sub) => (
                        <div key={sub.name} className="relative">
                            <NodeCard
                                name={sub.name}
                                sub={`${sub.pct} · ${sub.status}`}
                                className="max-w-[14rem]"
                            />
                            {sub.status === "注销" && (
                                <span className="absolute -top-1.5 -right-1 rounded bg-orange-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
                                    注销
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-center text-[9px] text-slate-400 mt-5 leading-relaxed">
                上图由公开工商与报告数据整理生成，仅供演示，不构成投资建议
            </p>
        </div>
    );
}

export default EquityPenetrationGraph;
