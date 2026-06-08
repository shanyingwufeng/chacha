import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as echarts from "echarts";
import {
    MapPin,
    Building2,
    Share2,
    Star,
    Download,
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
    CircleDollarSign,
    X,
} from "lucide-react";
import { EquityPenetrationGraph } from "../components/EquityPenetrationGraph";
import { RelatedPartyGraph } from "../components/RelatedPartyGraph";
import { EnterpriseGraph } from "../components/EnterpriseGraph";
import {
    XINHEYIJIA_FULL,
    XINHEYIJIA_PROFILE,
} from "../data/xinheyijiaCompanyProfile";

type KnowledgeModuleId =
    | "judicial"
    | "relation"
    | "monitoring"
    | "bidding"
    | "creditPortrait"
    | "investmentTrace"
    | "tags";

const KNOWLEDGE_NAV: {
    id: KnowledgeModuleId;
    sidebarLabel: string;
    chipLabel: string;
    Icon: React.ComponentType<{ className?: string }>;
}[] = [
    {
        id: "judicial",
        sidebarLabel: "司法风险全景视图",
        chipLabel: "司法风险全景视图",
        Icon: Gavel,
    },
    {
        id: "relation",
        sidebarLabel: "关联关系穿透图谱",
        chipLabel: "关联关系穿透图谱",
        Icon: Network,
    },
    {
        id: "monitoring",
        sidebarLabel: "经营动态监控看板",
        chipLabel: "经营动态监控看板",
        Icon: Eye,
    },
    {
        id: "bidding",
        sidebarLabel: "招投标智能追踪",
        chipLabel: "招投标智能追踪",
        Icon: FileText,
    },
    {
        id: "creditPortrait",
        sidebarLabel: "信用评分动态画像",
        chipLabel: "信用评分动态画像",
        Icon: PieChart,
    },
    {
        id: "investmentTrace",
        sidebarLabel: "投融资关系溯源",
        chipLabel: "投融资关系溯源",
        Icon: CircleDollarSign,
    },
];

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

function SimpleEquityPenetrationGraph() {
    return (
        <RelationGraphSurface>
            <EquityPenetrationGraph />
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
        projectName: "2026年度虚拟权益采购中标公示",
        publishDate: "2026-04-22",
        tenderOrg: "上海星图金融服务集团有限公司",
        winnerOrg: "江苏鑫合易家信息技术有限责任公司（联合中标之一）",
        amount: "未披露",
        roles: ["winner"],
    },
    {
        projectName: "青岛澳柯玛智慧冷链有限公司关于图像标注的询价项目中标公告",
        publishDate: "2026-04-08",
        tenderOrg: "青岛澳柯玛智慧冷链有限公司",
        winnerOrg: "江苏鑫合易家信息技术有限责任公司",
        amount: "未披露",
        roles: ["winner"],
    },
    {
        projectName:
            "兴业银行石家庄分行2026年借记卡客户线上权益采购项目中标候选人公示",
        publishDate: "2026-03-27",
        tenderOrg: "兴业银行股份有限公司石家庄分行",
        winnerOrg: "南京飞翰网络科技有限公司",
        amount: "283.0605万元",
        roles: ["bidder"],
    },
    {
        projectName:
            "江西明台项目咨询管理有限公司关于丰城农商银行2026年度信用卡营销活动服务商采购项目（JXMT20260203B-02）竞争性磋商成交公告",
        publishDate: "2026-03-11",
        tenderOrg: "丰城农商银行",
        winnerOrg: "江苏鑫合易家信息技术有限责任公司",
        amount: "未披露",
        roles: ["winner"],
    },
    {
        projectName:
            "广发银行昆明分行2026年零售条线市场活动第三方渠道支付券配置服务项目-结果公示",
        publishDate: "2025-12-31",
        tenderOrg: "广发银行股份有限公司昆明分行",
        winnerOrg: "深圳赛迪文信息科技有限公司",
        amount: "未披露",
        roles: ["mentioned"],
    },
    {
        projectName:
            "关于招商银行南京分行2025年快捷支付平台立减金项目采购结果公告",
        publishDate: "2025-11-20",
        tenderOrg: "招商银行股份有限公司南京分行",
        winnerOrg: "北京环球永佳电信科技有限公司",
        amount: "未披露",
        roles: ["bidder"],
    },
    {
        projectName:
            "中国医学科学院医学信息研究所人口健康科学数据标准注册和共享系统（二期）开发服务采购项目成交公告",
        publishDate: "2025-09-08",
        tenderOrg: "中国医学科学院医学信息研究所",
        winnerOrg: "江苏鑫合易家信息技术有限责任公司",
        amount: "30万元",
        roles: ["winner"],
    },
    {
        projectName: "数字人民币移动支付营销服务选型入围项目中标候选人公示",
        publishDate: "2025-07-18",
        tenderOrg: "中国银行股份有限公司陕西省分行",
        winnerOrg: "北京六一六信息技术有限公司",
        amount: "未披露",
        roles: ["bidder"],
    },
    {
        projectName:
            "2025-2026年联通（山东）产业互联网有限公司AI眼镜产品服务询比采购项目中选候选人公示",
        publishDate: "2025-07-08",
        tenderOrg: "联通（山东）产业互联网有限公司",
        winnerOrg: "江苏鑫合易家信息技术有限责任公司",
        amount: "62.54万元",
        roles: ["winner"],
    },
    {
        projectName:
            "广发银行昆明分行二至四季度借记卡市场活动第三方渠道支付券配置服务项目中选结果公示",
        publishDate: "2025-06-25",
        tenderOrg: "广发银行股份有限公司昆明分行",
        winnerOrg: "江苏鑫合易家信息技术有限责任公司",
        amount: "未披露",
        roles: ["winner"],
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
        <section className="bg-card rounded-3xl border border-slate-200 shadow-sm scroll-mt-24 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                    <FileText className="w-5 h-5 text-orange-500 shrink-0" />
                    招投标智能追踪
                </h3>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-bold shrink-0">
                        科创评级 {XINHEYIJIA_PROFILE.sciTechRating}
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold shrink-0">
                        招投标 {XINHEYIJIA_PROFILE.overviewStats.biddingEvents}{" "}
                        条
                    </span>
                </div>
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
                                        ? "border-orange-500 bg-orange-500/10 text-orange-800 shadow-sm"
                                        : "border-slate-200 bg-card text-slate-700 hover:border-slate-300 hover:bg-slate-50"
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
                                        className="bg-card hover:bg-slate-50/80"
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
                <p className="mt-3 text-center text-xs text-slate-600">
                    共 {filteredRows.length} 条
                </p>
            </div>
        </section>
    );
}

function KnowledgeModuleContent({ module }: { module: KnowledgeModuleId }) {
    switch (module) {
        case "judicial":
            return (
                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
                    <div className="px-6 pt-6 pb-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <Gavel className="w-5 h-5 text-orange-500 shrink-0" />
                            司法风险全景视图
                        </h3>
                        <div className="mt-4 border-b border-slate-200" />
                    </div>

                    <div className="px-6 pb-6 pt-2 space-y-0">
                        <div className="py-5">
                            <h4 className="text-sm font-bold text-slate-800 mb-3">
                                司法案件
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                文档披露：截至报告快照，无在办或未结民事案件登记；无处于公示状态的「被执行人」在办记录。历史信息维度中存在
                                1
                                条被执行人记录（已归档至「历史被执行人」），执行标的合计
                                4.90
                                万元，整体司法风险可控，但建议结合执行结案情况及后续公示复核。
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
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                案件名称
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                案件类型
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
                                                案件身份
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
                                                法院
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 whitespace-nowrap"
                                            >
                                                案件金额(元)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                最新案件进程
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-card hover:bg-slate-50/80">
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
                            <p className="mt-3 text-xs text-slate-500">
                                其他历史司法维度请以各主管部门及官方网站公示为准。
                            </p>
                        </div>
                        <div className="border-b border-slate-100" />

                        <div className="py-5">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">
                                被执行人（当前公示）
                            </h4>
                            <p className="text-sm text-slate-600 mb-3">
                                当前公示口径下无在办被执行人条目；下列为与主体关联的历史被执行人摘录，便于与「司法案件」空白状态对照理解。
                            </p>
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
                                        <tr className="bg-card hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                1
                                            </td>
                                            <td className="px-4 py-3">—</td>
                                            <td className="px-4 py-3">
                                                江苏鑫合易家信息技术有限责任公司
                                            </td>
                                            <td className="px-4 py-3">
                                                无在办
                                            </td>
                                            <td className="px-4 py-3">—</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h4 className="text-sm font-bold text-slate-800 mt-8 mb-2">
                                风险概览
                            </h4>
                            <p className="text-sm font-semibold text-slate-700 mb-1">
                                主体自身风险
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                {XINHEYIJIA_PROFILE.riskSummary.subjectNote}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                                {(
                                    [
                                        [
                                            "被执行人",
                                            XINHEYIJIA_PROFILE.riskSummary
                                                .executed,
                                        ],
                                        [
                                            "失信被执行",
                                            XINHEYIJIA_PROFILE.riskSummary
                                                .dishonest,
                                        ],
                                        [
                                            "行政处罚",
                                            XINHEYIJIA_PROFILE.riskSummary
                                                .adminPenalty,
                                        ],
                                        [
                                            "欠税公告",
                                            XINHEYIJIA_PROFILE.riskSummary
                                                .taxArrears,
                                        ],
                                        [
                                            "税务违法",
                                            XINHEYIJIA_PROFILE.riskSummary
                                                .taxViolation,
                                        ],
                                        [
                                            "专利诉讼",
                                            XINHEYIJIA_PROFILE.riskSummary
                                                .patentLitigation,
                                        ],
                                    ] as const
                                ).map(([label, count]) => (
                                    <div
                                        key={label}
                                        className="rounded-lg border border-emerald-100 bg-emerald-50/50 px-3 py-2 text-center"
                                    >
                                        <p className="text-[10px] text-slate-500">
                                            {label}
                                        </p>
                                        <p className="text-lg font-bold text-emerald-600">
                                            {count}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-semibold text-slate-700 mb-1">
                                关联企业风险
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                {XINHEYIJIA_PROFILE.riskSummary.associatedNote}
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-amber-200 mb-6">
                                <table className="w-full min-w-[560px] border-collapse text-sm text-slate-700">
                                    <thead>
                                        <tr className="border-b border-amber-100 bg-amber-50/80 text-left text-xs font-semibold text-slate-600">
                                            <th className="px-4 py-3 w-16">
                                                序号
                                            </th>
                                            <th className="px-4 py-3">
                                                关联企业
                                            </th>
                                            <th className="px-4 py-3">关系</th>
                                            <th className="px-4 py-3">
                                                风险类型
                                            </th>
                                            <th className="px-4 py-3 w-16">
                                                数量
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-amber-50">
                                        {XINHEYIJIA_PROFILE.associatedRisks.map(
                                            (row, i) => (
                                                <tr
                                                    key={row.company}
                                                    className="bg-card hover:bg-amber-50/30"
                                                >
                                                    <td className="px-4 py-3">
                                                        {i + 1}
                                                    </td>
                                                    <td className="px-4 py-3 font-medium">
                                                        {row.company}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-600">
                                                        {row.relation}
                                                    </td>
                                                    <td className="px-4 py-3 text-amber-800">
                                                        {row.riskType}
                                                    </td>
                                                    <td className="px-4 py-3 font-bold text-amber-600">
                                                        {row.count}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 mb-2">
                                工商变更记录（
                                {
                                    XINHEYIJIA_PROFILE.overviewStats
                                        .changeRecords
                                }{" "}
                                条）
                            </h4>
                            <div className="overflow-x-auto rounded-xl border border-slate-200">
                                <table className="w-full min-w-[640px] border-collapse text-sm text-slate-700">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                            <th className="px-4 py-3 w-16">
                                                序号
                                            </th>
                                            <th className="px-4 py-3">
                                                变更日期
                                            </th>
                                            <th className="px-4 py-3">
                                                变更事项
                                            </th>
                                            <th className="px-4 py-3">
                                                变更前
                                            </th>
                                            <th className="px-4 py-3">
                                                变更后
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {XINHEYIJIA_PROFILE.changeRecords.map(
                                            (row, i) => (
                                                <tr
                                                    key={row.date + row.item}
                                                    className="bg-card hover:bg-slate-50/80"
                                                >
                                                    <td className="px-4 py-3">
                                                        {i + 1}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        {row.date}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {row.item}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-600">
                                                        {row.before}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {row.after}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                                历史环保处罚、历史终本案件、历史诉前调解、历史立案信息、历史法院公告、历史送达公告、历史裁判文书、历史动产抵押、历史开庭公告、历史股权出质、历史行政许可、历史股权冻结、历史知产出质、历史土地抵押，请登录官方网站进行查询。
                            </p>
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
                                        <tr className="bg-card hover:bg-slate-50/80">
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
                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm scroll-mt-24 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <Network className="w-5 h-5 text-orange-500 shrink-0" />
                            关联关系穿透图谱
                        </h3>
                        <button
                            type="button"
                            className="text-xs text-orange-500 font-bold hover:underline shrink-0"
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
                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <Eye className="w-5 h-5 text-orange-500 shrink-0" />
                            经营动态监控看板
                        </h3>
                        <span className="text-xs text-slate-600 shrink-0">
                            监控周期：近 12 个月
                        </span>
                    </div>
                    <div className="px-6 pb-6 pt-2 space-y-0">
                        <div className="py-5">
                            <h4 className="text-sm font-bold text-slate-800 mb-3">
                                财务总览
                            </h4>
                            <p className="text-xs text-slate-500 mb-3">
                                {XINHEYIJIA_PROFILE.finance.dataNote}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                {(
                                    [
                                        [
                                            "销售收入",
                                            XINHEYIJIA_PROFILE.finance
                                                .salesRange,
                                        ],
                                        [
                                            "利润规模",
                                            XINHEYIJIA_PROFILE.finance
                                                .profitRange,
                                        ],
                                        [
                                            "资产总额",
                                            XINHEYIJIA_PROFILE.finance
                                                .assetsRange,
                                        ],
                                        [
                                            "资产负债率",
                                            XINHEYIJIA_PROFILE.finance
                                                .debtRatioRange,
                                        ],
                                    ] as const
                                ).map(([k, v]) => (
                                    <div
                                        key={k}
                                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                                    >
                                        <p className="text-[10px] text-slate-500">
                                            {k}
                                        </p>
                                        <p className="text-sm font-bold text-slate-800">
                                            {v}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                                <table className="w-full min-w-[560px] border-collapse text-sm text-slate-700">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                            <th className="px-4 py-3">年度</th>
                                            <th className="px-4 py-3">
                                                销售收入增长率
                                            </th>
                                            <th className="px-4 py-3">
                                                利润增长率
                                            </th>
                                            <th className="px-4 py-3">
                                                资产增长率
                                            </th>
                                            <th className="px-4 py-3">
                                                资产负债率变化
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {XINHEYIJIA_PROFILE.finance.growthHistory.map(
                                            (row) => (
                                                <tr
                                                    key={row.year}
                                                    className="bg-card"
                                                >
                                                    <td className="px-4 py-3 font-medium">
                                                        {row.year}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {row.sales}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {row.profit}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {row.assets}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {row.debtRatio}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 mb-3">
                                资本与知识产权
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
                                        <tr className="bg-card hover:bg-slate-50/80">
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
                                                {XINHEYIJIA_PROFILE.regCapital}
                                            </td>
                                            <td className="px-4 py-3">
                                                公开数据
                                            </td>
                                        </tr>
                                        <tr className="bg-card hover:bg-slate-50/80">
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
                                                {
                                                    XINHEYIJIA_PROFILE.paidInCapital
                                                }
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
                                经营活跃度
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                {(
                                    [
                                        [
                                            "招投标",
                                            `${XINHEYIJIA_PROFILE.overviewStats.biddingEvents} 条`,
                                        ],
                                        [
                                            "主要客户",
                                            `${XINHEYIJIA_PROFILE.overviewStats.keyCustomers} 家`,
                                        ],
                                        [
                                            "招聘信息",
                                            `${XINHEYIJIA_PROFILE.overviewStats.recruitmentPosts} 条`,
                                        ],
                                        [
                                            "社保参保",
                                            `${XINHEYIJIA_PROFILE.operations.socialInsuranceEmployees} 人`,
                                        ],
                                    ] as const
                                ).map(([k, v]) => (
                                    <div
                                        key={k}
                                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                                    >
                                        <p className="text-[10px] text-slate-500">
                                            {k}
                                        </p>
                                        <p className="text-sm font-bold text-slate-800">
                                            {v}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 mb-3">
                                社保人数为
                                {
                                    XINHEYIJIA_PROFILE.operations
                                        .socialInsuranceYear
                                }
                                年度报告城镇职工基本养老保险参保人数；控制企业{" "}
                                {
                                    XINHEYIJIA_PROFILE.overviewStats
                                        .controlledCompanies
                                }{" "}
                                家。
                            </p>
                            <h4 className="text-sm font-bold text-slate-800 mb-2">
                                重点客户（摘录）
                            </h4>
                            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                                <table className="w-full min-w-[480px] border-collapse text-sm text-slate-700">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                            <th className="px-4 py-3">客户</th>
                                            <th className="px-4 py-3">
                                                公开日期
                                            </th>
                                            <th className="px-4 py-3">来源</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {XINHEYIJIA_PROFILE.operations.keyCustomers.map(
                                            (c) => (
                                                <tr
                                                    key={c.name}
                                                    className="bg-card"
                                                >
                                                    <td className="px-4 py-3 font-medium">
                                                        {c.name}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        {c.date}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {"source" in c
                                                            ? c.source
                                                            : "招投标"}
                                                        {"amountWan" in c &&
                                                        c.amountWan != null
                                                            ? ` · ${c.amountWan} 万元`
                                                            : ""}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
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
                                        <tr className="bg-card hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                1
                                            </td>
                                            <td className="px-4 py-3">
                                                知识产权
                                            </td>
                                            <td className="px-4 py-3">
                                                专利 / 软著
                                            </td>
                                            <td className="px-4 py-3">
                                                {
                                                    XINHEYIJIA_PROFILE.ip
                                                        .patentTotal
                                                }{" "}
                                                件 /{" "}
                                                {
                                                    XINHEYIJIA_PROFILE.ip
                                                        .softwareCopyright
                                                }{" "}
                                                项
                                            </td>
                                        </tr>
                                        <tr className="bg-card hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                2
                                            </td>
                                            <td className="px-4 py-3">
                                                对外布局
                                            </td>
                                            <td className="px-4 py-3">
                                                对外投资企业数
                                            </td>
                                            <td className="px-4 py-3">
                                                {
                                                    XINHEYIJIA_PROFILE
                                                        .investments.length
                                                }{" "}
                                                家
                                            </td>
                                        </tr>
                                        <tr className="bg-card hover:bg-slate-50/80">
                                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums w-16">
                                                3
                                            </td>
                                            <td className="px-4 py-3">
                                                治理结构
                                            </td>
                                            <td className="px-4 py-3">
                                                股东数量
                                            </td>
                                            <td className="px-4 py-3">
                                                {
                                                    XINHEYIJIA_PROFILE
                                                        .overviewStats
                                                        .shareholders
                                                }{" "}
                                                位
                                            </td>
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
        case "creditPortrait":
            return (
                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <PieChart className="w-5 h-5 text-orange-500 shrink-0" />
                            信用评分动态画像
                        </h3>
                    </div>
                    <div className="px-6 pb-6 pt-2 space-y-4">
                        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 text-sm text-slate-700">
                            <p className="font-semibold text-blue-800 mb-2">
                                企查分：
                                {XINHEYIJIA_PROFILE.qichachaCredit.level}（
                                {XINHEYIJIA_PROFILE.qichachaCredit.scoreRange}{" "}
                                分）
                            </p>
                            <p className="text-slate-600">
                                {XINHEYIJIA_PROFILE.qichachaCredit.description}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                                {XINHEYIJIA_PROFILE.qichachaCredit.note}
                            </p>
                        </div>
                        <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-5 text-sm text-slate-700">
                            <p className="font-semibold text-orange-800 mb-2">
                                科创信用：{XINHEYIJIA_PROFILE.sciTechRating}
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                <li>
                                    同行业排名{" "}
                                    {XINHEYIJIA_PROFILE.sciTechRankIndustry}
                                </li>
                                <li>
                                    江苏省同行业排名{" "}
                                    {XINHEYIJIA_PROFILE.sciTechRankRegion}
                                </li>
                                <li>{XINHEYIJIA_PROFILE.scaleRankNote}</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-700">
                            <p className="font-semibold text-slate-800 mb-2">
                                财务与纳税
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                <li>
                                    纳税等级{" "}
                                    {XINHEYIJIA_PROFILE.finance.taxGrade}（
                                    {XINHEYIJIA_PROFILE.finance.taxpayerType}）
                                </li>
                                <li>
                                    {XINHEYIJIA_PROFILE.finance.taxGradeNote}
                                </li>
                                <li>
                                    销售收入{" "}
                                    {XINHEYIJIA_PROFILE.finance.salesRange}
                                    ，利润{" "}
                                    {XINHEYIJIA_PROFILE.finance.profitRange}
                                </li>
                                <li>
                                    资产{" "}
                                    {XINHEYIJIA_PROFILE.finance.assetsRange}
                                    ，资产负债率{" "}
                                    {XINHEYIJIA_PROFILE.finance.debtRatioRange}
                                </li>
                                <li>
                                    融资记录{" "}
                                    {
                                        XINHEYIJIA_PROFILE.overviewStats
                                            .financingEvents
                                    }{" "}
                                    次
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 text-sm text-slate-700">
                            <p className="font-semibold text-emerald-800 mb-2">
                                主体风险（均为 0）
                            </p>
                            <p className="text-slate-600">
                                {XINHEYIJIA_PROFILE.riskSummary.subjectNote}
                            </p>
                        </div>
                        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 text-sm text-slate-700">
                            <p className="font-semibold text-amber-800 mb-2">
                                关联风险
                            </p>
                            <p className="text-slate-600 mb-3">
                                {XINHEYIJIA_PROFILE.riskSummary.associatedNote}
                            </p>
                            <ul className="space-y-2">
                                {XINHEYIJIA_PROFILE.associatedRisks.map((r) => (
                                    <li
                                        key={r.company}
                                        className="rounded-lg border border-amber-100 bg-card px-3 py-2 text-slate-700"
                                    >
                                        <span className="font-medium">
                                            {r.company}
                                        </span>
                                        <span className="text-slate-500">
                                            {" "}
                                            · {r.riskType} ×{r.count}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            );
        case "investmentTrace":
            return (
                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <CircleDollarSign className="w-5 h-5 text-orange-500 shrink-0" />
                            投融资关系溯源
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                            融资历史{" "}
                            {XINHEYIJIA_PROFILE.overviewStats.financingEvents}{" "}
                            次；对外投资 {XINHEYIJIA_PROFILE.investments.length}{" "}
                            家。
                        </p>
                    </div>
                    <div className="px-6 pb-6 pt-2 overflow-x-auto">
                        <table className="w-full min-w-[720px] border-collapse text-sm text-slate-700 rounded-xl border border-slate-200 overflow-hidden">
                            <thead>
                                <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-600">
                                    <th className="px-4 py-3">被投企业</th>
                                    <th className="px-4 py-3">状态</th>
                                    <th className="px-4 py-3">出资比例</th>
                                    <th className="px-4 py-3">出资额</th>
                                    <th className="px-4 py-3">出资时间</th>
                                    <th className="px-4 py-3">关联风险</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {XINHEYIJIA_PROFILE.investments.map((inv) => (
                                    <tr key={inv.name} className="bg-card">
                                        <td className="px-4 py-3 font-medium">
                                            {inv.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {inv.status}
                                        </td>
                                        <td className="px-4 py-3">
                                            {inv.ratio}
                                        </td>
                                        <td className="px-4 py-3">
                                            {inv.amountWan} 万元
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {inv.investDate}
                                        </td>
                                        <td className="px-4 py-3 text-amber-700 text-xs">
                                            {inv.associatedRisk ?? "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600">
                            <p className="font-semibold text-slate-800 mb-2">
                                资质证书（
                                {XINHEYIJIA_PROFILE.qualifications.length} 项）
                            </p>
                            <ul className="space-y-2 max-h-64 overflow-y-auto">
                                {XINHEYIJIA_PROFILE.qualifications.map((q) => (
                                    <li
                                        key={`${q.no}-${q.productName}`}
                                        className="flex flex-wrap items-center gap-2"
                                    >
                                        <span>
                                            {q.name}
                                            {q.productName !== "—" &&
                                            q.productName !== q.name
                                                ? ` · ${q.productName}`
                                                : ""}
                                            {q.no !== "—" ? `（${q.no}）` : ""}
                                        </span>
                                        <span
                                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                                q.status === "有效"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-slate-200 text-slate-600"
                                            }`}
                                        >
                                            {q.status}
                                        </span>
                                        {q.to !== "—" && (
                                            <span className="text-xs text-slate-500">
                                                至 {q.to}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            );
        case "tags":
            return (
                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                            <Tags className="w-5 h-5 text-orange-500 shrink-0" />
                            企业标签
                        </h3>
                        <span className="text-xs text-slate-600">
                            标签体系：行业 · 能力 · 风险
                        </span>
                    </div>
                    <div className="p-8 space-y-6">
                        <div>
                            <p className="text-xs font-bold text-slate-600 uppercase mb-3">
                                已打标 (系统推荐)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    ...XINHEYIJIA_PROFILE.techCertifications.map(
                                        (label) => ({
                                            label,
                                            weight: "高" as const,
                                        })
                                    ),
                                    ...XINHEYIJIA_PROFILE.emergingIndustries.map(
                                        (label) => ({
                                            label,
                                            weight: "中" as const,
                                        })
                                    ),
                                ].map((t) => (
                                    <span
                                        key={t.label}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-200 text-xs font-semibold text-orange-800"
                                    >
                                        {t.label}
                                        <span className="text-[10px] font-normal text-orange-500">
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

type GraphImagePreview = "relatedParty" | "enterprise" | null;

const CompanyDetails: React.FC = () => {
    const radarRef = useRef<HTMLDivElement | null>(null);
    const [activeKnowledgeModule, setActiveKnowledgeModule] =
        useState<KnowledgeModuleId>("judicial");
    const [graphImagePreview, setGraphImagePreview] =
        useState<GraphImagePreview>(null);

    useEffect(() => {
        if (!graphImagePreview) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setGraphImagePreview(null);
        };
        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [graphImagePreview]);

    useEffect(() => {
        const el = radarRef.current;
        if (!el) return;

        const chart = echarts.init(el);
        chart.setOption({
            radar: {
                indicator: [
                    { name: "市场竞争力", max: 1000 },
                    { name: "研发实力", max: 1000 },
                    { name: "技术转化力", max: 1000 },
                    { name: "技术先进性", max: 1000 },
                    { name: "行业潜力", max: 1000 },
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
                            value: [
                                XINHEYIJIA_PROFILE.sciTechScores.market,
                                XINHEYIJIA_PROFILE.sciTechScores.rnd,
                                XINHEYIJIA_PROFILE.sciTechScores.transform,
                                XINHEYIJIA_PROFILE.sciTechScores.advanced,
                                XINHEYIJIA_PROFILE.sciTechScores.industry,
                            ],
                            name: "企业分值",
                            areaStyle: { color: "rgba(234, 88, 12, 0.2)" },
                            lineStyle: { color: "#ea580c", width: 2 },
                            symbolSize: 4,
                        },
                        {
                            value: [
                                XINHEYIJIA_PROFILE.sciTechScoresRegionAvg
                                    .market,
                                XINHEYIJIA_PROFILE.sciTechScoresRegionAvg.rnd,
                                XINHEYIJIA_PROFILE.sciTechScoresRegionAvg
                                    .transform,
                                XINHEYIJIA_PROFILE.sciTechScoresRegionAvg
                                    .advanced,
                                XINHEYIJIA_PROFILE.sciTechScoresRegionAvg
                                    .industry,
                            ],
                            name: "江苏省同行业均值",
                            lineStyle: {
                                color: "#22c55e",
                                width: 2,
                                type: "dashed",
                            },
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
                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm p-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                    <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-orange-800 shrink-0">
                                    鑫
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-1">
                                        <h1 className="text-3xl font-bold text-slate-900">
                                            {XINHEYIJIA_FULL}
                                        </h1>
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-bold">
                                            {XINHEYIJIA_PROFILE.statusLabel}
                                        </span>
                                        <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-bold">
                                            科创{" "}
                                            {XINHEYIJIA_PROFILE.sciTechRating}
                                        </span>
                                        <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">
                                            企查分{" "}
                                            {
                                                XINHEYIJIA_PROFILE
                                                    .qichachaCredit.level
                                            }
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {XINHEYIJIA_PROFILE.regAddress}
                                        </span>
                                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                            <Building2 className="w-3.5 h-3.5" />
                                            {XINHEYIJIA_PROFILE.industryShort}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-100 mt-6">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        社会信用代码
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {XINHEYIJIA_PROFILE.creditCode}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        法定代表人
                                    </p>
                                    <p className="text-sm font-semibold text-orange-500 cursor-pointer hover:underline">
                                        {XINHEYIJIA_PROFILE.legalRepresentative}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        注册资本
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {XINHEYIJIA_PROFILE.regCapital}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        成立日期
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {XINHEYIJIA_PROFILE.foundedDate}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        企业类型
                                    </p>
                                    <p className="text-sm font-semibold leading-snug">
                                        {XINHEYIJIA_PROFILE.companyType}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        纳税信用
                                    </p>
                                    <p className="text-sm font-semibold text-emerald-600">
                                        {XINHEYIJIA_PROFILE.finance.taxGrade}（
                                        {
                                            XINHEYIJIA_PROFILE.finance
                                                .taxpayerType
                                        }
                                        ）
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        实缴资本
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {XINHEYIJIA_PROFILE.paidInCapital}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        登记状态
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {XINHEYIJIA_PROFILE.statusLabel}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-600 mb-1">
                                        注册地址
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {XINHEYIJIA_PROFILE.regAddress}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                所属园区：
                                {XINHEYIJIA_PROFILE.parks.join("；")}
                            </p>
                            <p className="mt-2 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                联系：{XINHEYIJIA_PROFILE.contact.phone} ·{" "}
                                {XINHEYIJIA_PROFILE.contact.email} ·{" "}
                                <a
                                    href={XINHEYIJIA_PROFILE.contact.website}
                                    className="text-orange-600 hover:underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    官网
                                </a>
                            </p>
                            <p className="mt-2 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                实际控制人：
                                {XINHEYIJIA_PROFILE.actualController.name}（
                                {XINHEYIJIA_PROFILE.actualController.totalRatio}
                                ）
                            </p>
                            <p className="mt-2 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                科技认定：
                                {XINHEYIJIA_PROFILE.techCertifications.join(
                                    "、"
                                )}
                            </p>
                            <p className="mt-6 text-sm text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="font-bold text-slate-700">
                                    经营范围：
                                </span>
                                {XINHEYIJIA_PROFILE.businessScope}
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
                                    className="bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-orange-800 transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    生成深度报告
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-orange-500/10 border border-orange-900/40 p-4 rounded-2xl text-center w-32">
                                    <p className="text-[10px] text-orange-500 font-bold mb-1">
                                        专利总量
                                    </p>
                                    <p className="text-3xl font-black text-orange-500">
                                        {XINHEYIJIA_PROFILE.ip.patentTotal}
                                    </p>
                                    <p className="text-[10px] text-orange-400 mt-1">
                                        件
                                    </p>
                                </div>
                                <div className="bg-orange-500/10 border border-orange-900/40 p-4 rounded-2xl text-center w-32">
                                    <p className="text-[10px] text-orange-500 font-bold mb-1">
                                        销售收入区间
                                    </p>
                                    <p className="text-lg font-black text-orange-500 leading-tight">
                                        {XINHEYIJIA_PROFILE.finance.salesRange}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-dashed border-slate-200 flex flex-wrap gap-4 items-center justify-end">
                        <div className="flex flex-wrap gap-6 items-center">
                            <span className="flex items-center gap-2 text-xs font-bold text-red-500">
                                <Flame className="w-3.5 h-3.5" />
                                核准日期：{XINHEYIJIA_PROFILE.approvalDate}（
                                {XINHEYIJIA_PROFILE.regAuthority}）
                            </span>
                            <Link
                                to="/deep-data"
                                className="text-xs font-bold text-orange-500 hover:underline whitespace-nowrap"
                            >
                                查看全部动态 →
                            </Link>
                        </div>
                    </div>
                </section>

                <div
                    className="text-2xl  font-bold text-slate-900"
                    style={{ marginTop: "20px", marginBottom: "0" }}
                >
                    企业知识管理
                </div>

                <div
                    className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 lg:p-8"
                    style={{ marginTop: "16px" }}
                >
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
                                    onClick={() => setActiveKnowledgeModule(id)}
                                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "border-orange-600 bg-orange-500/10 text-orange-800 shadow-sm ring-1 ring-orange-800/80"
                                            : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                                    }`}
                                >
                                    <Icon
                                        className={`h-4 w-4 shrink-0 ${
                                            isActive
                                                ? "text-orange-500"
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="bg-card rounded-3xl border border-slate-200 shadow-sm p-8 group hover:border-orange-800 transition-all">
                        <div className="flex items-center justify-between mb-8 gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-900/40 shrink-0">
                                    <BrainCircuit className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        企业知识管理看板
                                    </h2>
                                    <p className="text-xs text-slate-600">
                                        整合司法、股权、动态于一体的知识库
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/deep-data"
                                className="text-xs font-bold text-orange-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0"
                            >
                                进入详情中心{" "}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-600 uppercase">
                                        司法风险
                                    </span>
                                    <span className="p-1 bg-green-100 text-green-600 rounded-full">
                                        <Check className="w-3 h-3" />
                                    </span>
                                </div>
                                <p className="text-2xl font-black text-slate-900">
                                    0{" "}
                                    <span className="text-xs font-normal text-slate-600">
                                        件诉讼
                                    </span>
                                </p>
                                <p className="text-[10px] text-slate-600 mt-1">
                                    目前处于全绿色安全状态
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-600 uppercase">
                                        股权穿透
                                    </span>
                                    <Layers className="w-5 h-5 text-orange-400" />
                                </div>
                                <p className="text-2xl font-black text-slate-900">
                                    3{" "}
                                    <span className="text-xs font-normal text-slate-600">
                                        层深度
                                    </span>
                                </p>
                                <p className="text-[10px] text-slate-600 mt-1">
                                    含母公司、有限合伙及对外投资链路
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-600 uppercase">
                                        中标动态
                                    </span>
                                    <TrendingUp className="w-5 h-5 text-red-400" />
                                </div>
                                <p className="text-2xl font-black text-slate-900">
                                    48{" "}
                                    <span className="text-xs font-normal text-slate-600">
                                        次招投标
                                    </span>
                                </p>
                                <p className="text-[10px] text-red-500 font-bold mt-1">
                                    科创评级 {XINHEYIJIA_PROFILE.sciTechRating}
                                    ，同行业排名前{" "}
                                    {XINHEYIJIA_PROFILE.sciTechRankIndustry}
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-600 uppercase">
                                        标签权重
                                    </span>
                                    <Bookmark className="w-5 h-5 text-orange-400" />
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {XINHEYIJIA_PROFILE.techCertifications.map(
                                        (tag) => (
                                            <span
                                                key={tag}
                                                className="text-[9px] px-1.5 py-0.5 bg-orange-900/40 text-orange-500 rounded"
                                            >
                                                {tag}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-card rounded-3xl border border-slate-200 shadow-sm p-8 group hover:border-emerald-200 transition-all">
                        <div className="flex items-center justify-between mb-8 gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-100 shrink-0">
                                    <PieChart className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        产业地位深度分析
                                    </h2>
                                    <p className="text-xs text-slate-600">
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
                                    <div className="bg-emerald-500 h-full w-[55%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                </div>
                                <p className="text-[10px] text-slate-600 mt-2">
                                    专利 {XINHEYIJIA_PROFILE.ip.patentTotal}{" "}
                                    件，有效专利{" "}
                                    {XINHEYIJIA_PROFILE.ip.validPatent} 件，软著{" "}
                                    {XINHEYIJIA_PROFILE.ip.softwareCopyright} 项
                                </p>
                            </div>
                            <div className="p-4 border border-emerald-50 bg-emerald-50/20 rounded-2xl">
                                <h4 className="text-xs font-bold text-emerald-700 mb-2 italic">
                                    产业链位置
                                </h4>
                                <p className="text-sm font-bold text-slate-800">
                                    注册资本与治理结构
                                </p>
                                <p className="text-[10px] text-slate-600 mt-1">
                                    注册资本 {XINHEYIJIA_PROFILE.regCapital}
                                    ，股东为
                                    {XINHEYIJIA_PROFILE.shareholder.name}（
                                    {XINHEYIJIA_PROFILE.shareholder.ratio}）
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="bg-sky-600 p-3 rounded-2xl text-white shadow-lg shadow-sky-100 shrink-0">
                                <Network className="w-8 h-8" aria-hidden />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    关联方认定与企业图谱
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="rounded-2xl border border-orange-900/40 bg-orange-500/10/30 p-5">
                            <h3 className="text-sm font-bold text-slate-800 mb-3">
                                关联方认定
                            </h3>
                            <button
                                type="button"
                                onClick={() =>
                                    setGraphImagePreview("relatedParty")
                                }
                                className="group relative w-full rounded-xl border border-orange-900/40 bg-card p-0 overflow-hidden text-left transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 cursor-zoom-in"
                                aria-label="关联方认定图：点击放大预览"
                            >
                                <div className="pointer-events-none w-full overflow-visible">
                                    <RelatedPartyGraph compact />
                                </div>
                                <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-white/70 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    点击预览
                                </span>
                            </button>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                            <h3 className="text-sm font-bold text-slate-800 mb-3">
                                企业图谱
                            </h3>
                            <button
                                type="button"
                                onClick={() =>
                                    setGraphImagePreview("enterprise")
                                }
                                className="group relative w-full rounded-xl border border-slate-200 bg-card p-0 overflow-hidden text-left transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 cursor-zoom-in"
                                aria-label="企业图谱：点击放大预览"
                            >
                                <div className="pointer-events-none w-full overflow-visible">
                                    <EnterpriseGraph compact />
                                </div>
                                <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-white/70 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    点击预览
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="bg-card rounded-3xl border border-slate-200 shadow-sm p-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div
                            ref={radarRef}
                            className="w-full md:w-1/3 h-64 shrink-0"
                        />
                        <div className="flex-1 space-y-6 w-full">
                            <h3 className="text-2xl font-bold text-slate-900">
                                科创能力五维雷达
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold">
                                            合规记录 (0件风险事件)
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            暂无行政处罚记录
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold">
                                            股东结构 (1位股东)
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            {
                                                XINHEYIJIA_PROFILE.shareholder
                                                    .name
                                            }
                                            ，持股比例
                                            {
                                                XINHEYIJIA_PROFILE.shareholder
                                                    .ratio
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold">
                                            知识产权 (
                                            {XINHEYIJIA_PROFILE.ip.patentTotal}
                                            件专利)
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            发明申请{" "}
                                            {
                                                XINHEYIJIA_PROFILE.ip
                                                    .inventionApply
                                            }{" "}
                                            · 发明授权{" "}
                                            {
                                                XINHEYIJIA_PROFILE.ip
                                                    .inventionGrant
                                            }{" "}
                                            · 外观设计{" "}
                                            {XINHEYIJIA_PROFILE.ip.designPatent}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold">
                                            资本结构
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            注册资本
                                            {XINHEYIJIA_PROFILE.regCapital}
                                            ，实缴
                                            {XINHEYIJIA_PROFILE.paidInCapital}
                                            ，对外投资
                                            {
                                                XINHEYIJIA_PROFILE.investments
                                                    .length
                                            }
                                            家
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {graphImagePreview && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
                    role="presentation"
                    onClick={() => setGraphImagePreview(null)}
                >
                    <div
                        className="relative max-h-[92vh] max-w-[min(96vw,1400px)]"
                        role="dialog"
                        aria-modal="true"
                        aria-label={
                            graphImagePreview === "relatedParty"
                                ? "关联方认定图预览"
                                : "企业图谱预览"
                        }
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setGraphImagePreview(null)}
                            className="absolute -right-1 -top-1 z-[1] rounded-full bg-card p-2 text-slate-700 shadow-lg ring-1 ring-slate-200 transition-colors hover:bg-slate-50 sm:-right-3 sm:-top-3"
                            aria-label="关闭预览"
                        >
                            <X className="h-5 w-5" aria-hidden />
                        </button>
                        <div className="max-h-[92vh] w-full min-w-[min(96vw,960px)] overflow-auto rounded-lg bg-card shadow-2xl p-2 sm:p-4">
                            {graphImagePreview === "relatedParty" ? (
                                <RelatedPartyGraph />
                            ) : (
                                <EnterpriseGraph />
                            )}
                        </div>
                        <p className="mt-2 text-center text-xs text-slate-700">
                            按 Esc 或点击空白处关闭
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyDetails;
