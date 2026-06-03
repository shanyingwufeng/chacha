import React from "react";
import {
    XINHEYIJIA_FULL,
    XINHEYIJIA_PROFILE,
} from "../data/xinheyijiaCompanyProfile";

const TARGET = XINHEYIJIA_FULL;

const CORE_TEAM = XINHEYIJIA_PROFILE.coreTeam;
const INVESTMENTS = XINHEYIJIA_PROFILE.investments;

function NodeBox({
    title,
    children,
    className = "",
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-xl border border-slate-200 bg-white p-3 ${className}`}
        >
            <p className="text-[10px] font-bold text-slate-500 mb-2">{title}</p>
            {children}
        </div>
    );
}

export function RelatedPartyGraph({ compact = false }: { compact?: boolean }) {
    const textSize = compact ? "text-[10px]" : "text-xs";
    return (
        <div
            className={`w-full ${compact ? "p-2" : "p-4"} space-y-3 max-w-2xl mx-auto`}
        >
            <div
                className={`rounded-xl border-2 border-orange-500 bg-orange-500 text-white text-center py-3 px-4 font-bold ${compact ? "text-xs" : "text-sm"}`}
            >
                {TARGET}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NodeBox title="核心团队">
                    <ul className={`space-y-1.5 ${textSize} text-slate-700`}>
                        {CORE_TEAM.map((m) => (
                            <li key={m.name}>
                                <span className="font-semibold text-slate-900">
                                    {m.name}
                                </span>
                                <span className="text-slate-500">
                                    {" "}
                                    · {m.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </NodeBox>
                <NodeBox title="实际控制人">
                    <p className={`${textSize} text-slate-700`}>
                        <span className="font-semibold text-slate-900">
                            {XINHEYIJIA_PROFILE.actualController.name}
                        </span>
                        <br />
                        总持股 {XINHEYIJIA_PROFILE.actualController.totalRatio}（间接）
                    </p>
                </NodeBox>
                <NodeBox title="股东">
                    <p className={`${textSize} text-slate-700`}>
                        <span className="font-semibold text-slate-900">
                            {XINHEYIJIA_PROFILE.shareholder.name}
                        </span>
                        <br />
                        认缴 / 实缴 {XINHEYIJIA_PROFILE.shareholder.subscribedWan}{" "}
                        万元（{XINHEYIJIA_PROFILE.shareholder.ratio}）
                    </p>
                </NodeBox>
                <NodeBox title="对外投资" className="sm:col-span-2">
                    <ul className={`space-y-1.5 ${textSize} text-slate-700`}>
                        {INVESTMENTS.map((inv) => (
                            <li key={inv.name}>
                                <span className="font-semibold text-slate-900">
                                    {inv.name}
                                </span>
                                <span className="text-slate-500">
                                    {" "}
                                    · {inv.ratio} · {inv.amountWan} 万元 ·{" "}
                                    {inv.investDate} · {inv.status}
                                </span>
                                {inv.associatedRisk && (
                                    <span className="block text-amber-700 mt-0.5">
                                        关联风险：{inv.associatedRisk}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </NodeBox>
            </div>
            <p className={`${textSize} text-slate-500 text-center`}>
                科创能力评级 {XINHEYIJIA_PROFILE.sciTechRating} · 专利{" "}
                {XINHEYIJIA_PROFILE.ip.patentTotal} 件 · 软著{" "}
                {XINHEYIJIA_PROFILE.ip.softwareCopyright} 项
            </p>
        </div>
    );
}
