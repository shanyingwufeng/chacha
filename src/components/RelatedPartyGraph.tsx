import React from "react";

const TARGET = "北京智慧易科技有限公司";

/** 演示数据：docx 2.2–2.5、2.9–2.10、主要人员 */
const PARENT_HOLDERS = [
    { name: "北京元子拓扑科技有限公司", note: "直接持股 97.00%" },
] as const;

const KEY_PERSONS = [
    { name: "关涛", role: "董事长、经理" },
    { name: "王东晖", role: "董事" },
    { name: "李国亮", role: "董事" },
    { name: "张少游", role: "监事" },
    { name: "李影欣", role: "财务负责人" },
] as const;

const CONTROL_ENTERPRISES = [
    { name: "东莞市知慧易科技有限责任公司", pct: "100%", status: "存续" },
    { name: "海南智慧易科技有限公司", pct: "100%", status: "注销" },
] as const;

const INFLUENCE_ENTERPRISES = [
    { name: "北京元子拓扑科技有限公司", note: "表决权 97%" },
    { name: "合肥知慧易科技有限公司", note: "相同电话/邮箱" },
] as const;

function Panel({
    title,
    tone,
    children,
}: {
    title: string;
    tone: "blue" | "red";
    children: React.ReactNode;
}) {
    const head =
        tone === "blue"
            ? "bg-blue-600 text-white"
            : "bg-red-500 text-white";
    return (
        <div className="rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm min-w-[200px] max-w-[280px]">
            <div className={`px-3 py-1.5 text-xs font-bold ${head}`}>
                {title}
            </div>
            <ul className="px-3 py-2 space-y-1.5 text-[11px] text-slate-700 leading-snug">
                {children}
            </ul>
        </div>
    );
}

function ListItem({
    name,
    meta,
    tag,
}: {
    name: string;
    meta?: string;
    tag?: string;
}) {
    return (
        <li className="flex flex-wrap items-start gap-1">
            <span className="font-medium text-slate-900">{name}</span>
            {meta && (
                <span className="text-blue-600 font-semibold">{meta}</span>
            )}
            {tag && (
                <span className="rounded bg-orange-100 px-1 py-0.5 text-[9px] font-bold text-orange-700">
                    {tag}
                </span>
            )}
        </li>
    );
}

function ArrowDown({ label, tone }: { label: string; tone: "blue" | "red" }) {
    const color = tone === "blue" ? "text-blue-600" : "text-red-500";
    const line = tone === "blue" ? "border-blue-400" : "border-red-400";
    return (
        <div
            className={`flex flex-col items-center gap-0.5 py-1 ${color}`}
            aria-hidden
        >
            <div className={`w-px h-4 border-l-2 border-dashed ${line}`} />
            <span className="text-[10px] font-bold">{label}</span>
            <span className="text-slate-400 text-[10px]">▼</span>
        </div>
    );
}

export function RelatedPartyGraph() {
    return (
        <div
            className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm py-6 px-4"
            role="img"
            aria-label={`${TARGET}关联方认定图（演示数据）`}
        >
            <p className="text-center text-xs text-slate-500 mb-6">
                关联方认定（数据依据企业信用决策报告 · 演示）
            </p>

            <div className="flex flex-col items-center gap-1 min-w-[320px] mx-auto">
                {/* 上方：股东 / 母公司 */}
                <div className="flex flex-wrap justify-center gap-3">
                    <Panel title="母公司 / 控股股东" tone="blue">
                        {PARENT_HOLDERS.map((p) => (
                            <ListItem
                                key={p.name}
                                name={p.name}
                                meta={p.note}
                            />
                        ))}
                    </Panel>
                    <Panel title="董监高" tone="red">
                        {KEY_PERSONS.map((p) => (
                            <ListItem
                                key={p.name}
                                name={p.name}
                                meta={p.role}
                            />
                        ))}
                    </Panel>
                </div>

                <div className="flex gap-6">
                    <ArrowDown label="控制" tone="blue" />
                    <ArrowDown label="影响" tone="red" />
                </div>

                {/* 中心 */}
                <div className="rounded-xl bg-blue-600 px-6 py-3 text-center shadow-lg max-w-md">
                    <p className="text-sm sm:text-base font-bold text-white">
                        {TARGET}
                    </p>
                    <p className="text-[10px] text-blue-100 mt-1">
                        实际控制人：关涛（表决权约 97%）
                    </p>
                </div>

                <ArrowDown label="控制" tone="blue" />

                {/* 下方：控制企业 */}
                <div className="flex flex-wrap justify-center gap-3">
                    <Panel title="控制企业" tone="blue">
                        {CONTROL_ENTERPRISES.map((p) => (
                            <ListItem
                                key={p.name}
                                name={p.name}
                                meta={p.pct}
                                tag={
                                    p.status === "注销" ? "注销" : undefined
                                }
                            />
                        ))}
                    </Panel>
                    <Panel title="直接或间接持股 5% 及以上" tone="blue">
                        {INFLUENCE_ENTERPRISES.map((p) => (
                            <ListItem
                                key={p.name}
                                name={p.name}
                                meta={p.note}
                            />
                        ))}
                    </Panel>
                </div>
            </div>

            <p className="text-center text-[9px] text-slate-400 mt-6">
                蓝线：控制关系 · 红线：影响关系 · 由公开工商数据整理，仅供演示
            </p>
        </div>
    );
}

export default RelatedPartyGraph;
