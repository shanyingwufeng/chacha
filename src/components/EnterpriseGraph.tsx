import React from "react";
import {
    XINHEYIJIA_FULL,
    XINHEYIJIA_PROFILE,
} from "../data/xinheyijiaCompanyProfile";

const TARGET = XINHEYIJIA_FULL;

export function EnterpriseGraph({ compact = false }: { compact?: boolean }) {
    const box = compact ? "text-[10px] p-2" : "text-xs p-3";
    return (
        <div className={`w-full space-y-4 ${compact ? "py-2" : "py-4"}`}>
            <div className="flex justify-center">
                <div
                    className={`rounded-xl border-2 border-orange-500 bg-orange-500 text-white font-bold text-center ${box}`}
                >
                    {TARGET}
                    <div className="font-normal opacity-90 mt-1">
                        {XINHEYIJIA_PROFILE.sciTechRating}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <div className={`rounded-lg border border-slate-200 bg-slate-50 ${box}`}>
                    <p className="font-bold text-slate-600 mb-1">股东</p>
                    <p className="text-slate-800">
                        {XINHEYIJIA_PROFILE.shareholder.name}（
                        {XINHEYIJIA_PROFILE.shareholder.ratio}）
                    </p>
                </div>
                <div className={`rounded-lg border border-slate-200 bg-slate-50 ${box}`}>
                    <p className="font-bold text-slate-600 mb-1">对外投资</p>
                    {XINHEYIJIA_PROFILE.investments.map((inv) => (
                        <p key={inv.name} className="text-slate-800 mt-1">
                            {inv.name} · {inv.ratio}
                        </p>
                    ))}
                </div>
                <div className={`rounded-lg border border-slate-200 bg-slate-50 ${box}`}>
                    <p className="font-bold text-slate-600 mb-1">知识产权（节选）</p>
                    <p className="text-slate-800">
                        专利 {XINHEYIJIA_PROFILE.ip.patentTotal} 件 · 发明申请{" "}
                        {XINHEYIJIA_PROFILE.ip.inventionApply} · 发明授权{" "}
                        {XINHEYIJIA_PROFILE.ip.inventionGrant} · 软著{" "}
                        {XINHEYIJIA_PROFILE.ip.softwareCopyright}
                    </p>
                </div>
            </div>
        </div>
    );
}
