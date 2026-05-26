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
    compact,
}: {
    title: string;
    tone: "blue" | "red";
    children: React.ReactNode;
    compact?: boolean;
}) {
    const head =
        tone === "blue"
            ? "bg-blue-600 text-white"
            : "bg-red-500 text-white";
    return (
        <div
            className={`rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm ${
                compact
                    ? "min-w-[7.5rem] max-w-[9.5rem]"
                    : "min-w-[200px] max-w-[280px]"
            }`}
        >
            <div
                className={`font-bold ${head} ${
                    compact ? "px-2 py-1 text-[9px] leading-tight" : "px-3 py-1.5 text-xs"
                }`}
            >
                {title}
            </div>
            <ul
                className={`text-slate-700 leading-snug ${
                    compact
                        ? "px-2 py-1.5 space-y-1 text-[9px]"
                        : "px-3 py-2 space-y-1.5 text-[11px]"
                }`}
            >
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

export function RelatedPartyGraph({ compact = false }: { compact?: boolean }) {
    return (
        <div
            className={`w-full ${
                compact
                    ? "py-2 px-1"
                    : "overflow-x-auto rounded-xl border border-slate-200 shadow-sm py-6 px-4"
            }`}
            role="img"
            aria-label={`${TARGET}关联方认定图`}
        >
            <p
                className={`text-center text-slate-500 ${
                    compact ? "text-[9px] mb-2" : "text-xs mb-6"
                }`}
            >
                关联方认定（数据依据企业信用决策报告）
            </p>

            <div
                className={`flex flex-col items-center mx-auto ${
                    compact ? "gap-0.5" : "gap-1 min-w-[320px]"
                }`}
            >
                {/* 上方：股东 / 母公司 */}
                <div
                    className={`flex flex-wrap justify-center ${
                        compact ? "gap-1.5" : "gap-3"
                    }`}
                >
                    <Panel title="母公司 / 控股股东" tone="blue" compact={compact}>
                        {PARENT_HOLDERS.map((p) => (
                            <ListItem
                                key={p.name}
                                name={p.name}
                                meta={p.note}
                            />
                        ))}
                    </Panel>
                    <Panel title="董监高" tone="red" compact={compact}>
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
                <div
                    className={`rounded-xl bg-blue-600 text-center shadow-lg w-full ${
                        compact
                            ? "px-3 py-2 max-w-full"
                            : "px-6 py-3 max-w-md"
                    }`}
                >
                    <p
                        className={`font-bold text-white leading-snug ${
                            compact ? "text-[10px]" : "text-sm sm:text-base"
                        }`}
                    >
                        {TARGET}
                    </p>
                    <p
                        className={`text-blue-100 mt-0.5 ${
                            compact ? "text-[8px]" : "text-[10px] mt-1"
                        }`}
                    >
                        实际控制人：关涛（表决权约 97%）
                    </p>
                </div>

                <ArrowDown label="控制" tone="blue" />

                {/* 下方：控制企业 */}
                <div
                    className={`flex flex-wrap justify-center ${
                        compact ? "gap-1.5" : "gap-3"
                    }`}
                >
                    <Panel title="控制企业" tone="blue" compact={compact}>
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
                    <Panel
                        title={
                            compact ? "持股 5% 及以上" : "直接或间接持股 5% 及以上"
                        }
                        tone="blue"
                        compact={compact}
                    >
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

            <p
                className={`text-center text-slate-400 ${
                    compact ? "text-[8px] mt-2" : "text-[9px] mt-6"
                }`}
            >
                蓝线：控制关系 · 红线：影响关系 · 由公开工商数据整理
            </p>
        </div>
    );
}

export default RelatedPartyGraph;
