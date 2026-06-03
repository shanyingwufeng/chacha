import React from "react";
import { XINHEYIJIA_FULL, XINHEYIJIA_PROFILE } from "../data/xinheyijiaCompanyProfile";

const TARGET = XINHEYIJIA_FULL;

const SHAREHOLDER = XINHEYIJIA_PROFILE.shareholder;

const INVESTMENTS = XINHEYIJIA_PROFILE.investments;

function NodeCard({
    name,
    sub,
    variant = "company",
    badge,
}: {
    name: string;
    sub?: string;
    variant?: "company" | "person" | "target" | "muted";
    badge?: string;
}) {
    const styles = {
        person: "border-red-300 bg-red-50 text-slate-900",
        company: "border-orange-200 bg-white text-slate-900",
        target: "border-orange-600 bg-orange-500 text-white shadow-md",
        muted: "border-slate-200 bg-slate-50 text-slate-600",
    };
    return (
        <div
            className={`relative rounded-xl border px-3 py-2 text-center min-w-[100px] max-w-[160px] ${styles[variant]}`}
        >
            {badge && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-orange-100 px-1.5 py-0.5 text-[9px] font-bold text-orange-700">
                    {badge}
                </span>
            )}
            <p className="text-[11px] font-bold leading-tight">{name}</p>
            {sub && (
                <p className="text-[10px] mt-0.5 opacity-80 leading-tight">{sub}</p>
            )}
        </div>
    );
}

export function EquityPenetrationGraph() {
    const ac = XINHEYIJIA_PROFILE.actualController;
    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto py-2">
            <NodeCard
                name={ac.name}
                sub={`实际控制人 · 间接持股 ${ac.indirectRatio}`}
                variant="muted"
                badge="实控"
            />
            <div className="flex flex-col items-center text-slate-400">
                <div className="w-px h-4 bg-slate-300" />
                <span className="text-[9px] text-slate-500">100%</span>
                <div className="w-px h-4 bg-slate-300" />
            </div>
            <NodeCard
                name={SHAREHOLDER.name}
                sub={`认缴 ${SHAREHOLDER.subscribedWan} 万 · ${SHAREHOLDER.ratio}`}
                variant="company"
            />
            <div className="flex flex-col items-center text-orange-500">
                <div className="w-px h-6 bg-orange-300" />
                <span className="text-[10px] font-bold">100%</span>
                <div className="w-px h-6 bg-orange-300" />
            </div>
            <NodeCard name={TARGET} variant="target" badge="主体企业" />
            <div className="flex flex-col items-center text-slate-400 w-full">
                <div className="w-px h-5 bg-slate-300" />
                <span className="text-[10px] font-medium text-slate-500 mb-2">
                    对外投资
                </span>
                <div className="flex flex-wrap justify-center gap-3">
                    {INVESTMENTS.map((inv) => (
                        <NodeCard
                            key={inv.name}
                            name={inv.name}
                            sub={`${inv.ratio} · ${inv.amountWan}万 · ${inv.investDate}`}
                            variant="company"
                        />
                    ))}
                </div>
            </div>
            <p className="text-[10px] text-slate-500 text-center max-w-md mt-2">
                {ac.chain}
            </p>
        </div>
    );
}
