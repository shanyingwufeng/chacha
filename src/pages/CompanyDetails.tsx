import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as echarts from "echarts";
import { Badge } from "../components/ui/badge";
import {
    IndustryAnalysisContent as IndustryAnalysis,
    IndustrySectionId,
} from "./IndustryAnalysis";
import {
    MapPin,
    Building2,
    Share2,
    Star,
    Download,
    RefreshCw,
    Flame,
    BrainCircuit,
    Check,
    Layers,
    TrendingUp,
    Bookmark,
    ArrowRight,
    PieChart,
    Gavel,
    Network,
    Eye,
    FileText,
    Tags,
} from "lucide-react";

type KnowledgeModuleId =
    | "judicial"
    | "relation"
    | "monitoring"
    | "bidding"
    | "tags";

type MainDetailTab = "knowledge" | "industry" | "patent" | "risk";

const INDUSTRY_TABS: { id: IndustrySectionId; label: string }[] = [
    { id: "overview", label: "产业概览" },
    { id: "portrait", label: "产业画像" },
    { id: "chain-enterprises", label: "链上企业" },
    { id: "key-companies", label: "重点企业" },
    { id: "chain-map", label: "产业链图谱" },
    { id: "heatmap", label: "区域产业热力图" },
];

const KNOWLEDGE_NAV: {
    id: KnowledgeModuleId;
    sidebarLabel: string;
    chipLabel: string;
    Icon: React.ComponentType<{ className?: string }>;
}[] = [
    {
        id: "judicial",
        sidebarLabel: "司法风险监控",
        chipLabel: "司法风险",
        Icon: Gavel,
    },
    {
        id: "relation",
        sidebarLabel: "关联关系穿透",
        chipLabel: "关联关系穿透",
        Icon: Network,
    },
    {
        id: "monitoring",
        sidebarLabel: "经营动态监控",
        chipLabel: "经营动态监控",
        Icon: Eye,
    },
    {
        id: "bidding",
        sidebarLabel: "招投标追踪",
        chipLabel: "招投标追踪",
        Icon: FileText,
    },
];

const RELATION_TARGET_LABEL = "智车睿控 (目标企业)";

function RelationGraphSurface({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative bg-slate-50 rounded-2xl border border-dashed border-slate-200 min-h-[260px] sm:min-h-[300px] flex items-center justify-center overflow-hidden py-10 px-3 sm:px-4">
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(#64748b 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                }}
            />
            <div className="relative z-[1] w-full flex justify-center">
                {children}
            </div>
        </div>
    );
}

function RelationNodeCard({
    title,
    subtitle,
    compact,
}: {
    title: string;
    subtitle: string;
    compact?: boolean;
}) {
    return (
        <div
            className={
                compact
                    ? "bg-white border border-slate-200 p-2 rounded-lg shadow-sm text-[10px] text-center max-w-[92px] leading-tight"
                    : "bg-white border border-slate-200 p-3 rounded-xl shadow-sm text-xs text-center max-w-[140px]"
            }
        >
            <p className="font-bold text-slate-900">{title}</p>
            <p className="text-slate-400 mt-0.5">{subtitle}</p>
        </div>
    );
}

/** 两层：目标企业 → 两个并行节点 */
function SimpleEquityPenetrationGraph() {
    return (
        <RelationGraphSurface>
            <div className="flex flex-col items-center gap-10 sm:gap-12">
                <div className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-2xl shadow-xl font-bold text-sm sm:text-base text-center">
                    {RELATION_TARGET_LABEL}
                </div>
                <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-1.5 h-12 bg-slate-200 -mt-10 sm:-mt-12" />
                        <RelationNodeCard
                            title="于素华"
                            subtitle="大股东 (90%)"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-1.5 h-12 bg-slate-200 -mt-10 sm:-mt-12" />
                        <RelationNodeCard
                            title="北京车替达科技"
                            subtitle="参股 12%"
                        />
                    </div>
                </div>
            </div>
        </RelationGraphSurface>
    );
}

/** 三层：一侧单节点，一侧节点下再挂多个子节点（一致行动 / 董监高 / SPV 等复用） */
function DeepPenetrationGraph({
    midLabels = ["SPV-A", "SPV-B", "SPV-C"],
    midSubtitles = ["持股平台", "有限合伙", "信托架构"],
}: {
    midLabels?: [string, string, string];
    midSubtitles?: [string, string, string];
}) {
    return (
        <RelationGraphSurface>
            <div className="flex flex-col items-center gap-8 sm:gap-10 max-w-full">
                <div className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-2xl shadow-xl font-bold text-sm sm:text-base text-center">
                    {RELATION_TARGET_LABEL}
                </div>
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 items-start">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-1.5 h-10 bg-slate-200 -mt-8 sm:-mt-10" />
                        <RelationNodeCard
                            title="于素华"
                            subtitle="关键自然人"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-1.5 h-10 bg-slate-200 -mt-8 sm:-mt-10" />
                        <RelationNodeCard
                            title="北京车替达科技"
                            subtitle="关联交易方"
                        />
                        <div className="w-1.5 h-6 bg-slate-200 shrink-0" />
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-[340px]">
                            <RelationNodeCard
                                title={midLabels[0]}
                                subtitle={midSubtitles[0]}
                                compact
                            />
                            <RelationNodeCard
                                title={midLabels[1]}
                                subtitle={midSubtitles[1]}
                                compact
                            />
                            <RelationNodeCard
                                title={midLabels[2]}
                                subtitle={midSubtitles[2]}
                                compact
                            />
                        </div>
                    </div>
                </div>
            </div>
        </RelationGraphSurface>
    );
}

type BiddingStakeholderFilter =
    | "all"
    | "winner"
    | "bidder"
    | "tender"
    | "mentioned";

const BIDDING_FILTER_TABS: { id: BiddingStakeholderFilter; label: string }[] = [
    { id: "all", label: "全部" },
    { id: "winner", label: "中标方" },
    { id: "bidder", label: "投标方" },
    { id: "tender", label: "招标方" },
    { id: "mentioned", label: "被提及" },
];

type BiddingTableRow = {
    projectName: string;
    publishDate: string;
    tenderOrg: string;
    winnerOrg: string;
    amount: string;
    roles: Exclude<BiddingStakeholderFilter, "all">[];
};

const BIDDING_TABLE_MOCK: BiddingTableRow[] = [
    {
        projectName:
            "太平财险2026年疑似高风险车辆（新能源车）识别数据服务采购项目中标候选人公示",
        publishDate: "2026-04-23",
        tenderOrg: "太平财产保险有限公司",
        winnerOrg: "未披露",
        amount: "未披露",
        roles: ["bidder"],
    },
    {
        projectName: "中煤财产保险股份有限公司家用车里程评分项目中标结果公告",
        publishDate: "2026-03-24",
        tenderOrg: "中煤财产保险股份有限公司",
        winnerOrg: "北京智车睿控信息技术有限公司",
        amount: "51万元",
        roles: ["bidder"],
    },
    {
        projectName:
            "中国大地财产保险股份有限公司2025年新能源动态数据服务项目（增补项目）中标结果公告",
        publishDate: "2026-01-12",
        tenderOrg: "中国大地财产保险股份有限公司",
        winnerOrg: "北京智车睿控信息技术有限公司",
        amount: "0.2元",
        roles: ["tender"],
    },
    {
        projectName:
            "中国大地财产保险股份有限公司营业客车动态数据服务项目中标结果公告",
        publishDate: "2025-12-29",
        tenderOrg: "中国大地财产保险股份有限公司",
        winnerOrg: "北京智车睿控信息技术有限公司",
        amount: "0.64元",
        roles: ["winner"],
    },
    {
        projectName:
            "中国人寿财产保险股份有限公司外部车辆动态网联数据及风险评分服务项目中标结果公示",
        publishDate: "2024-05-27",
        tenderOrg: "中国人寿财产保险股份有限公司",
        winnerOrg: "北京智车睿控信息技术有限公司",
        amount: "未披露",
        roles: ["mentioned"],
    },
    {
        projectName:
            "中国大地财产保险股份有限公司家用车使用性质识别服务项目中标候选人公示",
        publishDate: "2026-04-01",
        tenderOrg: "中国大地财产保险股份有限公司",
        winnerOrg: "北京车慧达科技有限公司",
        amount: "0.25",
        roles: ["bidder"],
    },
    {
        projectName:
            "中国大地财产保险股份有限公司2025年新能源动态数据服务项目（增补项目）中标候选人公示",
        publishDate: "2026-01-07",
        tenderOrg: "中国大地财产保险股份有限公司",
        winnerOrg: "北京智车睿控信息技术有限公司",
        amount: "未披露",
        roles: ["winner"],
    },
    {
        projectName:
            "大家财险过户车风险评级和高风险车辆识别数据服务采购项目中标公示",
        publishDate: "2025-09-01",
        tenderOrg: "大家财产保险有限责任公司",
        winnerOrg: "北京智车睿控信息技术有限公司",
        amount: "未披露",
        roles: ["winner"],
    },
    {
        projectName:
            "浙江省交通投资集团有限公司高危车辆识别、家用车改变使用性质识别（浙商保险）直接采购项目成交公告",
        publishDate: "2025-08-11",
        tenderOrg: "浙江省交通投资集团有限公司",
        winnerOrg: "北京智车睿控信息技术有限公司",
        amount: "32万元",
        roles: ["winner", "tender"],
    },
    {
        projectName: "高风险车辆识别项目三次中标结果公告",
        publishDate: "2025-07-22",
        tenderOrg: "中路财产保险股份有限公司",
        winnerOrg: "北京智车睿控信息技术有限公司",
        amount: "13.68万元",
        roles: ["winner", "mentioned"],
    },
];

function BiddingTrackingModule() {
    const [stakeholderFilter, setStakeholderFilter] =
        useState<BiddingStakeholderFilter>("all");

    const filteredRows =
        stakeholderFilter === "all"
            ? BIDDING_TABLE_MOCK
            : BIDDING_TABLE_MOCK.filter((row) =>
                  row.roles.includes(stakeholderFilter)
              );

    return (
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm scroll-mt-24 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                    <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                    招投标追踪
                </h3>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-bold shrink-0">
                    累计招投标 42 次
                </span>
            </div>

            <div className="px-6 pt-5 pb-4 border-b border-slate-100">
                <div
                    className="flex flex-wrap gap-2"
                    role="tablist"
                    aria-label="招投标视角筛选"
                >
                    {BIDDING_FILTER_TABS.map(({ id, label }) => {
                        const active = stakeholderFilter === id;
                        return (
                            <button
                                key={id}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                onClick={() => setStakeholderFilter(id)}
                                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                                    active
                                        ? "border-blue-500 bg-blue-50 text-blue-900 shadow-sm"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="p-6 pt-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[900px] border-collapse text-sm text-slate-700 table-fixed">
                        <colgroup>
                            <col className="w-16" />
                            <col />
                            <col className="w-[7.5rem]" />
                            <col className="w-[11rem]" />
                            <col className="w-[11rem]" />
                            <col className="w-[7.5rem]" />
                        </colgroup>
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                <th
                                    scope="col"
                                    className="px-4 py-3 whitespace-nowrap"
                                >
                                    序号
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    项目名称
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 whitespace-nowrap"
                                >
                                    发布日期
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    招标单位
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    中标单位
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 whitespace-nowrap text-right"
                                >
                                    中标金额
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-10 text-center text-sm text-slate-500"
                                    >
                                        当前筛选条件下暂无记录
                                    </td>
                                </tr>
                            ) : (
                                filteredRows.map((row, i) => (
                                    <tr
                                        key={`${row.projectName}-${row.publishDate}`}
                                        className="bg-white hover:bg-slate-50/80"
                                    >
                                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums align-top">
                                            {i + 1}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-900 align-top break-words">
                                            {row.projectName}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap align-top">
                                            {row.publishDate}
                                        </td>
                                        <td className="px-4 py-3 text-slate-700 align-top break-words">
                                            {row.tenderOrg}
                                        </td>
                                        <td className="px-4 py-3 text-slate-700 align-top break-words">
                                            {row.winnerOrg}
                                        </td>
                                        <td className="px-4 py-3 text-slate-800 whitespace-nowrap text-right align-top tabular-nums">
                                            {row.amount}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <p className="mt-3 text-center text-xs text-slate-400">
                    共 {filteredRows.length}{" "}
                    条（数据依据《北京智车睿控信息技术有限公司.docx》）
                </p>
            </div>
        </section>
    );
}

function KnowledgeModuleContent({ module }: { module: KnowledgeModuleId }) {
    switch (module) {
        case "judicial":
            return (
                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
                    <div className="px-6 pt-6 pb-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <Gavel className="w-5 h-5 text-blue-600 shrink-0" />
                            司法风险
                        </h3>
                        <div className="mt-4 border-b border-slate-200" />
                    </div>

                    <div className="px-6 pb-6 pt-2 space-y-0">
                        <div className="py-5">
                            <h4 className="text-sm font-bold text-slate-800 mb-3">
                                司法案件
                            </h4>
                            <p className="text-sm text-slate-600">
                                文档披露：无司法案件、无被执行人记录，司法风险极低。
                            </p>
                            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                                <table className="w-full min-w-[980px] border-collapse text-sm text-slate-700 table-fixed">
                                    <colgroup>
                                        <col className="w-16" />
                                        <col className="w-[22rem]" />
                                        <col className="w-24" />
                                        <col className="w-28" />
                                        <col className="w-28" />
                                        <col className="w-40" />
                                        <col className="w-44" />
                                        <col className="w-28" />
                                        <col className="w-28" />
                                    </colgroup>
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                序号
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                案件名称
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                案件类型
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                案由
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                案件身份
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                案号
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                法院
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                案件金额(元)
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                最新案件进程
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-white hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums align-top">
                                                1
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-900 align-top break-words">
                                                暂无
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                -
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                -
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                -
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                -
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                -
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                -
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                -
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="border-b border-slate-100" />

                        <div className="py-5">
                            <h4 className="text-sm font-bold text-slate-800 mb-3">
                                被执行人
                            </h4>
                            <div className="overflow-x-auto rounded-xl border border-slate-200">
                                <table className="w-full min-w-[520px] border-collapse text-sm text-slate-700">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                            <th
                                                scope="col"
                                                className="px-4 py-3 w-16 whitespace-nowrap"
                                            >
                                                序号
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                案号
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                被执行人
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                执行标的
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                立案日期
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-white hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                1
                                            </td>
                                            <td className="px-4 py-3">无</td>
                                            <td className="px-4 py-3">
                                                北京智车睿控信息技术有限公司
                                            </td>
                                            <td className="px-4 py-3">无</td>
                                            <td className="px-4 py-3">无</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="border-b border-slate-100" />

                        <div className="py-5">
                            <h4 className="text-sm font-bold text-slate-800 mb-3">
                                立案信息
                            </h4>
                            <div className="overflow-x-auto rounded-xl border border-slate-200">
                                <table className="w-full min-w-[400px] border-collapse text-sm text-slate-700">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                            <th
                                                scope="col"
                                                className="px-4 py-3 w-16 whitespace-nowrap"
                                            >
                                                序号
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                案号
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                案由
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                法院
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-white hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                1
                                            </td>
                                            <td className="px-4 py-3">无</td>
                                            <td className="px-4 py-3">
                                                无立案记录
                                            </td>
                                            <td className="px-4 py-3">无</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            );
        case "relation":
            return (
                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm scroll-mt-24 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <Network className="w-5 h-5 text-blue-600 shrink-0" />
                            关联关系穿透
                        </h3>
                        <button
                            type="button"
                            className="text-xs text-blue-600 font-bold hover:underline shrink-0"
                        >
                            展开全图图谱
                        </button>
                    </div>
                    <div className="px-6 sm:px-8">
                        <div className="py-8">
                            <h4 className="sr-only">股权穿透</h4>
                            <div className="w-full min-w-0">
                                <SimpleEquityPenetrationGraph />
                            </div>
                        </div>
                    </div>
                </section>
            );
        case "monitoring":
            return (
                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <Eye className="w-5 h-5 text-blue-600 shrink-0" />
                            经营动态监控
                        </h3>
                        <span className="text-xs text-slate-400 shrink-0">
                            监控周期：近 12 个月
                        </span>
                    </div>
                    <div className="px-6 pb-6 pt-2 space-y-0">
                        <div className="py-5">
                            <h4 className="text-sm font-bold text-slate-800 mb-3">
                                财务经营监控
                            </h4>
                            <div className="overflow-x-auto rounded-xl border border-slate-200">
                                <table className="w-full min-w-[520px] border-collapse text-sm text-slate-700">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                            <th
                                                scope="col"
                                                className="px-4 py-3 w-16 whitespace-nowrap"
                                            >
                                                序号
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                分类
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                指标
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                监控值
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                备注
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-white hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                1
                                            </td>
                                            <td className="px-4 py-3">
                                                资本结构
                                            </td>
                                            <td className="px-4 py-3">
                                                注册资本
                                            </td>
                                            <td className="px-4 py-3">
                                                1000万元
                                            </td>
                                            <td className="px-4 py-3">
                                                工商信息
                                            </td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                2
                                            </td>
                                            <td className="px-4 py-3">
                                                资本结构
                                            </td>
                                            <td className="px-4 py-3">
                                                实缴资本
                                            </td>
                                            <td className="px-4 py-3">
                                                90万元（2024年报）
                                            </td>
                                            <td className="px-4 py-3">
                                                工商信息
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="border-b border-slate-100" />

                        <div className="py-5">
                            <h4 className="text-sm font-bold text-slate-800 mb-3">
                                业务运营监控
                            </h4>
                            <div className="overflow-x-auto rounded-xl border border-slate-200">
                                <table className="w-full min-w-[480px] border-collapse text-sm text-slate-700">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                            <th
                                                scope="col"
                                                className="px-4 py-3 w-16 whitespace-nowrap"
                                            >
                                                序号
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                业务域
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                运营指标
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                监控值
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-white hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                1
                                            </td>
                                            <td className="px-4 py-3">
                                                招投标
                                            </td>
                                            <td className="px-4 py-3">
                                                公开记录数
                                            </td>
                                            <td className="px-4 py-3">42条</td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                2
                                            </td>
                                            <td className="px-4 py-3">
                                                对外布局
                                            </td>
                                            <td className="px-4 py-3">
                                                对外投资企业数
                                            </td>
                                            <td className="px-4 py-3">1家</td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                3
                                            </td>
                                            <td className="px-4 py-3">
                                                治理结构
                                            </td>
                                            <td className="px-4 py-3">
                                                股东数量
                                            </td>
                                            <td className="px-4 py-3">3位</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="border-b border-slate-100" />
                    </div>
                </section>
            );
        case "bidding":
            return <BiddingTrackingModule />;
        case "tags":
            return (
                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <Tags className="w-5 h-5 text-blue-600 shrink-0" />
                            企业标签
                        </h3>
                        <span className="text-xs text-slate-400">
                            标签体系：行业 · 能力 · 风险
                        </span>
                    </div>
                    <div className="p-8 space-y-6">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-3">
                                已打标 (系统推荐)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    {
                                        label: "科学研究和技术服务业",
                                        weight: "高",
                                    },
                                    { label: "软件开发", weight: "高" },
                                    { label: "信息系统集成服务", weight: "中" },
                                    { label: "数据服务", weight: "中" },
                                ].map((t) => (
                                    <span
                                        key={t.label}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800"
                                    >
                                        {t.label}
                                        <span className="text-[10px] font-normal text-blue-500">
                                            权重 {t.weight}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-600">
                            标签用于知识检索与风险画像聚合，支持在图谱分析中与产业链节点联动展示。
                        </div>
                    </div>
                </section>
            );
        default:
            return null;
    }
}

const CompanyDetails: React.FC = () => {
    const radarRef = useRef<HTMLDivElement | null>(null);
    const [mainDetailTab, setMainDetailTab] =
        useState<MainDetailTab | null>("knowledge");
    const [activeKnowledgeModule, setActiveKnowledgeModule] =
        useState<KnowledgeModuleId>("judicial");
    const [activeIndustrySection, setActiveIndustrySection] =
        useState<IndustrySectionId>("overview");

    useEffect(() => {
        const el = radarRef.current;
        if (!el) return;

        const chart = echarts.init(el);
        chart.setOption({
            radar: {
                indicator: [
                    { name: "招投标(次)", max: 60 },
                    { name: "股东数量(位)", max: 10 },
                    { name: "变更记录(条)", max: 30 },
                    { name: "参保人数(人)", max: 100 },
                    { name: "对外投资(家)", max: 10 },
                ],
                splitNumber: 4,
                axisName: { color: "#94a3b8", fontSize: 10 },
                splitLine: { lineStyle: { color: "#f1f5f9" } },
                splitArea: { show: false },
                axisLine: { lineStyle: { color: "#f1f5f9" } },
            },
            series: [
                {
                    name: "企业能力分布",
                    type: "radar",
                    data: [
                        {
                            value: [42, 3, 13, 11, 1],
                            name: "北京智车睿控",
                            areaStyle: { color: "rgba(37, 99, 235, 0.2)" },
                            lineStyle: { color: "#2563eb", width: 2 },
                            symbolSize: 0,
                        },
                    ],
                },
            ],
        });

        const onResize = () => chart.resize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            chart.dispose();
        };
    }, []);

    return (
        <div className="bg-slate-50 text-slate-900 pb-12">
            <div className="container mx-auto max-w-7xl px-6 py-8 space-y-8">
                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                    <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-200 shrink-0">
                                    智
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-1">
                                        <h1 className="text-3xl font-bold text-slate-900">
                                            北京智车睿控信息技术有限公司
                                        </h1>
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-bold">
                                            存续
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            北京市朝阳区东三环北路甲19号楼14层1708
                                        </span>
                                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                            <Building2 className="w-3.5 h-3.5" />
                                            科学研究和技术服务业
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-100 mt-6">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        社会信用代码
                                    </p>
                                    <p className="text-sm font-semibold">
                                        91110108MA01PX7K22
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        法定代表人
                                    </p>
                                    <p className="text-sm font-semibold text-blue-600 cursor-pointer hover:underline">
                                        于素华
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        注册资本
                                    </p>
                                    <p className="text-sm font-semibold">
                                        1000万元
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        成立日期
                                    </p>
                                    <p className="text-sm font-semibold">
                                        2020-01-14
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        企业类型
                                    </p>
                                    <p className="text-sm font-semibold">
                                        有限责任公司（自然人投资或控股）
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        实缴资本
                                    </p>
                                    <p className="text-sm font-semibold">
                                        90万元（2024年报）
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        登记状态
                                    </p>
                                    <p className="text-sm font-semibold">
                                        存续（在营、开业、在册）
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        注册地址
                                    </p>
                                    <p className="text-sm font-semibold">
                                        北京市朝阳区东三环北路甲19号楼14层1708
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                联系信息：电话 13260126622 ｜ 邮箱
                                zhangxinmei@zcrk.net ｜ 网址 www.zcrk.net
                            </p>
                            <p className="mt-6 text-sm text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="font-bold text-slate-700">
                                    企业简介：
                                </span>
                                一般项目包括技术服务、软件开发、信息系统集成、数据处理与互联网数据服务等；许可项目包括第二类增值电信业务、机动车检验检测服务。
                            </p>
                        </div>
                        <div className="flex flex-col items-center lg:items-end gap-6">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl transition-colors"
                                    aria-label="分享"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl transition-colors"
                                    aria-label="收藏"
                                >
                                    <Star className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-200 transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    生成深度报告
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center w-32">
                                    <p className="text-[10px] text-blue-600 font-bold mb-1">
                                        招投标活跃度
                                    </p>
                                    <p className="text-3xl font-black text-blue-600">
                                        42
                                    </p>
                                    <p className="text-[10px] text-blue-400 mt-1">
                                        次公开记录（docx）
                                    </p>
                                </div>
                                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-center w-32">
                                    <p className="text-[10px] text-indigo-600 font-bold mb-1">
                                        参保人数
                                    </p>
                                    <p className="text-3xl font-black text-indigo-600">
                                        11
                                    </p>
                                    <p className="text-[10px] text-indigo-400 mt-1">
                                        人（2024年报）
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-dashed border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <RefreshCw className="w-3.5 h-3.5 animate-[spin_3s_linear_infinite]" />
                            系统同步于: 2026-05-08 10:24
                        </div>
                        <div className="flex flex-wrap gap-6 items-center">
                            <span className="flex items-center gap-2 text-xs font-bold text-red-500">
                                <Flame className="w-3.5 h-3.5" />
                                核准日期：2025-05-14（登记机关：北京市朝阳区市场监督管理局）
                            </span>
                            <Link
                                to="/deep-data"
                                className="text-xs font-bold text-blue-600 hover:underline whitespace-nowrap"
                            >
                                查看全部动态 →
                            </Link>
                        </div>
                    </div>
                </section>

                <section
                    className="rounded-3xl border border-slate-200 bg-white px-4 py-3 sm:px-6"
                    aria-label="详情模块导航"
                >
                    <div className="flex flex-wrap items-center gap-y-2">
                        <div className="inline-flex flex-wrap items-center gap-1 rounded-full px-1.5 py-1.5">
                            <button
                                type="button"
                                aria-expanded={mainDetailTab === "knowledge"}
                                onClick={() =>
                                    setMainDetailTab((prev) =>
                                        prev === "knowledge"
                                            ? null
                                            : "knowledge"
                                    )
                                }
                                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-all sm:px-4 ${
                                    mainDetailTab === "knowledge"
                                        ? "border-indigo-200 bg-indigo-50 text-indigo-900 shadow-sm"
                                        : "border-transparent text-slate-900 hover:bg-slate-50"
                                }`}
                            >
                                <BrainCircuit
                                    className="h-4 w-4 text-indigo-600 shrink-0"
                                    aria-hidden
                                />
                                企业知识管理
                            </button>
                            {/* <button
                                type="button"
                                aria-expanded={mainDetailTab === "industry"}
                                onClick={() =>
                                    setMainDetailTab((prev) =>
                                        prev === "industry" ? null : "industry"
                                    )
                                }
                                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-all sm:px-4 ${
                                    mainDetailTab === "industry"
                                        ? "border-emerald-200 bg-emerald-50 text-emerald-900 shadow-sm"
                                        : "border-transparent text-slate-900 hover:bg-slate-50"
                                }`}
                            >
                                <TrendingUp
                                    className="h-4 w-4 text-emerald-600 shrink-0"
                                    aria-hidden
                                />
                                产业分析
                            </button> */}
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full border border-transparent px-3.5 py-2 text-sm font-bold text-slate-900 transition-all sm:px-4 hover:bg-slate-50"
                            >
                                <PieChart
                                    className="h-4 w-4 text-violet-600 shrink-0"
                                    aria-hidden
                                />
                                企业发展
                            </button>
                            <button
                                type="button"
                                aria-expanded={mainDetailTab === "patent"}
                                onClick={() =>
                                    setMainDetailTab((prev) =>
                                        prev === "patent" ? null : "patent"
                                    )
                                }
                                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-all sm:px-4 ${
                                    mainDetailTab === "patent"
                                        ? "border-violet-200 bg-violet-50 text-violet-900 shadow-sm"
                                        : "border-transparent text-slate-900 hover:bg-slate-50"
                                }`}
                            >
                                <FileText
                                    className="h-4 w-4 text-violet-600 shrink-0"
                                    aria-hidden
                                />
                                专利
                            </button>
                            <button
                                type="button"
                                aria-expanded={mainDetailTab === "risk"}
                                onClick={() =>
                                    setMainDetailTab((prev) =>
                                        prev === "risk" ? null : "risk"
                                    )
                                }
                                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-all sm:px-4 ${
                                    mainDetailTab === "risk"
                                        ? "border-rose-200 bg-rose-50 text-rose-950 shadow-sm"
                                        : "border-transparent text-slate-900 hover:bg-slate-50"
                                }`}
                            >
                                <Flame
                                    className="h-4 w-4 text-rose-600 shrink-0"
                                    aria-hidden
                                />
                                风险画像
                            </button>
                        </div>
                    </div>
                </section>

                {mainDetailTab === "knowledge" && (
                    <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 lg:p-8">
                        <nav
                            className="mb-8 flex flex-wrap items-center gap-3"
                            aria-label="企业知识子模块"
                        >
                            {KNOWLEDGE_NAV.map(({ id, chipLabel, Icon }) => {
                                const isActive = activeKnowledgeModule === id;
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() =>
                                            setActiveKnowledgeModule(id)
                                        }
                                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                            isActive
                                                ? "border-indigo-300 bg-indigo-50 text-indigo-950 shadow-sm ring-1 ring-indigo-200/80"
                                                : "border-[#e8eef4] bg-[#f8f9fb] text-[#334155] hover:border-slate-300 hover:bg-slate-100"
                                        }`}
                                    >
                                        <Icon
                                            className={`h-4 w-4 shrink-0 ${
                                                isActive
                                                    ? "text-indigo-600"
                                                    : "text-slate-600"
                                            }`}
                                            aria-hidden
                                        />
                                        {chipLabel}
                                    </button>
                                );
                            })}
                        </nav>
                        <div
                            id="knowledge-module-panel"
                            role="tabpanel"
                            aria-label={
                                KNOWLEDGE_NAV.find(
                                    (m) => m.id === activeKnowledgeModule
                                )?.chipLabel
                            }
                            className="scroll-mt-24 md:scroll-mt-28"
                        >
                            <KnowledgeModuleContent
                                module={activeKnowledgeModule}
                            />
                        </div>
                    </div>
                )}

                {mainDetailTab === "industry" && (
                    <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 lg:p-8">
                        <nav
                            className="mb-8 flex flex-wrap items-center gap-3"
                            aria-label="产业分析子模块"
                        >
                            {INDUSTRY_TABS.map(({ id, label }) => {
                                const isActive = activeIndustrySection === id;
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() =>
                                            setActiveIndustrySection(id)
                                        }
                                        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                            isActive
                                                ? "border-emerald-300 bg-emerald-50 text-emerald-950 shadow-sm ring-1 ring-emerald-200/80"
                                                : "border-[#e8eef4] bg-[#f8f9fb] text-[#334155] hover:border-slate-300 hover:bg-slate-100"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </nav>
                        <div
                            id="industry-module-panel"
                            role="tabpanel"
                            aria-label={
                                INDUSTRY_TABS.find(
                                    (tab) => tab.id === activeIndustrySection
                                )?.label
                            }
                            className="scroll-mt-24 md:scroll-mt-28"
                        >
                            <IndustryAnalysis
                                section={activeIndustrySection}
                                hideHeader
                            />
                        </div>
                    </div>
                )}

                {mainDetailTab === "risk" && (
                    <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 lg:p-8">
                        <div className="flex items-center gap-2 mb-5">
                            <Flame className="h-5 w-5 text-rose-600" aria-hidden />
                            <h2 className="font-semibold text-slate-900">风险画像</h2>
                            <Badge variant="secondary" className="ml-2">
                                风险概览与预警
                            </Badge>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    label: "司法风险",
                                    value: "低",
                                    color: "text-emerald-700 bg-emerald-50 border-emerald-100",
                                },
                                {
                                    label: "经营异常",
                                    value: "无",
                                    color: "text-emerald-700 bg-emerald-50 border-emerald-100",
                                },
                                {
                                    label: "行政处罚",
                                    value: "0",
                                    color: "text-slate-700 bg-slate-50 border-slate-200",
                                },
                                {
                                    label: "舆情预警",
                                    value: "关注",
                                    color: "text-amber-800 bg-amber-50 border-amber-100",
                                },
                            ].map((x) => (
                                <div
                                    key={x.label}
                                    className={`rounded-2xl border p-4 ${x.color}`}
                                >
                                    <div className="text-xs font-bold opacity-80">
                                        {x.label}
                                    </div>
                                    <div className="mt-2 text-2xl font-black">
                                        {x.value}
                                    </div>
                                    <div className="mt-1 text-[11px] opacity-80">
                                        后续可接入实时监控数据源
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 group hover:border-blue-200 transition-all">
                        <div className="flex items-center justify-between mb-8 gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100 shrink-0">
                                    <BrainCircuit className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        企业知识管理看板
                                    </h2>
                                    <p className="text-xs text-slate-400">
                                        整合司法、股权、动态于一体的知识库
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/deep-data"
                                className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0"
                            >
                                进入详情中心{" "}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase">
                                        司法风险
                                    </span>
                                    <span className="p-1 bg-green-100 text-green-600 rounded-full">
                                        <Check className="w-3 h-3" />
                                    </span>
                                </div>
                                <p className="text-2xl font-black text-slate-900">
                                    0{" "}
                                    <span className="text-xs font-normal text-slate-400">
                                        件诉讼
                                    </span>
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1">
                                    目前处于全绿色安全状态
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase">
                                        股权穿透
                                    </span>
                                    <Layers className="w-5 h-5 text-indigo-400" />
                                </div>
                                <p className="text-2xl font-black text-slate-900">
                                    4{" "}
                                    <span className="text-xs font-normal text-slate-400">
                                        层深度
                                    </span>
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1">
                                    涉及3家核心关联企业
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase">
                                        中标动态
                                    </span>
                                    <TrendingUp className="w-5 h-5 text-red-400" />
                                </div>
                                <p className="text-2xl font-black text-slate-900">
                                    41{" "}
                                    <span className="text-xs font-normal text-slate-400">
                                        次招投标
                                    </span>
                                </p>
                                <p className="text-[10px] text-red-500 font-bold mt-1">
                                    共 42 条，覆盖中标/候选/投标等角色
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase">
                                        标签权重
                                    </span>
                                    <Bookmark className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    <span className="text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                                        科学研究和技术服务业
                                    </span>
                                    <span className="text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                                        软件开发
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 group hover:border-emerald-200 transition-all">
                        <div className="flex items-center justify-between mb-8 gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-100 shrink-0">
                                    <PieChart className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        产业地位深度分析
                                    </h2>
                                    <p className="text-xs text-slate-400">
                                        行业画像、链条位置及区域竞争力
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/deep-data"
                                className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0"
                            >
                                查看产业图谱{" "}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-end mb-3 gap-2">
                                    <span className="text-sm font-bold text-slate-700">
                                        工商画像：科技服务与软件能力
                                    </span>
                                    <span className="text-xs font-bold text-emerald-600 shrink-0">
                                        小型企业
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[42%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2">
                                    近年招投标活跃，公开招投标记录 42 条
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border border-emerald-50 bg-emerald-50/20 rounded-2xl">
                                    <h4 className="text-xs font-bold text-emerald-700 mb-2 italic">
                                        产业链位置
                                    </h4>
                                    <p className="text-sm font-bold text-slate-800">
                                        注册资本与治理结构
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        注册资本 1000 万元，3
                                        位股东，最大股东于素华（76%）
                                    </p>
                                </div>
                                <div className="p-4 border border-blue-50 bg-blue-50/20 rounded-2xl">
                                    <h4 className="text-xs font-bold text-blue-700 mb-2 italic">
                                        区域产业热力
                                    </h4>
                                    <p className="text-sm font-bold text-slate-800">
                                        区域与组织规模
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        朝阳区注册，人员规模少于 50 人，参保 11
                                        人
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div
                            ref={radarRef}
                            className="w-full md:w-1/3 h-64 shrink-0"
                        />
                        <div className="flex-1 space-y-6 w-full">
                            <h3 className="text-2xl font-bold text-slate-900">
                                风险与成长综合雷达
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold">
                                            合规记录 (0件风险事件)
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            成立至今无任何行政处罚记录
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold">
                                            股东结构 (3位股东)
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            最大股东于素华，持股比例 76.00%
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold">
                                            招投标活跃度 (42条)
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            覆盖中标单位、投标单位、提及单位等角色
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold">
                                            资本结构
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            注册资本1000万，实缴资本90万，最大股东持股76%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CompanyDetails;
