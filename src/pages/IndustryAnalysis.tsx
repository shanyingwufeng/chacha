import React, { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
    Network,
    MapPinned,
    Box,
    TrendingUp,
    UserSquare2,
    Building2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    CHAIN_ENTERPRISES_MOCK,
    type ChainEnterprise,
    type ChainEnterpriseListResponse,
} from "../data/chainEnterprisesMock";
import { KEY_COMPANIES_MOCK } from "../data/keyCompaniesMock";
import { IndustryChainMap } from "../components/IndustryChainMap";
import { RegionalIndustryHeatmap } from "../components/RegionalIndustryHeatmap";
import {
    CAPITAL_DISTRIBUTION,
    ENTERPRISE_TOTAL,
    ENTERPRISE_TREND_COUNTS,
    ENTERPRISE_TREND_YEARS,
    SCI_TECH_ENTERPRISE_METRICS,
} from "../data/industryOverviewMock";
import {
    ESTABLISHMENT_YEARS_DISTRIBUTION,
    INTELLECTUAL_PROPERTY_DISTRIBUTION,
    INTELLECTUAL_PROPERTY_TOTAL,
} from "../data/industryPortraitMock";

export type IndustrySectionId =
    | "overview"
    | "portrait"
    | "chain-enterprises"
    | "key-companies"
    | "chain-map"
    | "heatmap";

type IndustryAnalysisProps = {
    section?: IndustrySectionId;
    hideHeader?: boolean;
};

type EChartPanelProps = {
    option: echarts.EChartsOption;
    className?: string;
};

const EChartPanel: React.FC<EChartPanelProps> = ({ option, className }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const chart = echarts.init(containerRef.current);
        chart.setOption(option);
        const onResize = () => chart.resize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            chart.dispose();
        };
    }, [option]);

    return <div ref={containerRef} className={className ?? "h-72 w-full"} />;
};

const DEFAULT_PAGE_SIZE = 10;
const CHAIN_PAGE_SIZE = 20;
const KEY_PAGE_SIZE = 50;

function formatCapital(val: number): string {
    if (!val || val <= 0) return "—";
    if (val >= 10000) return `${(val / 10000).toFixed(2)}亿元`;
    return `${val.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}万元`;
}

function formatCapitalWan(val: number): string {
    if (!val || val <= 0) return "—";
    return val.toLocaleString("zh-CN", { maximumFractionDigits: 2 });
}

function riskLevelClass(level: string): string {
    switch (level) {
        case "S":
            return "text-emerald-700 bg-emerald-50 border-emerald-100";
        case "A":
            return "text-orange-600 bg-orange-500/10 border-orange-900/40";
        case "B":
            return "text-amber-700 bg-amber-50 border-amber-100";
        case "C":
            return "text-orange-700 bg-orange-50 border-orange-100";
        case "D":
            return "text-rose-700 bg-rose-50 border-rose-100";
        default:
            return "text-slate-600 bg-slate-50 border-slate-100";
    }
}

type IndustryCompanyTableProps = {
    data: ChainEnterpriseListResponse;
    /** 链上企业：与参考表一致的列与分页 */
    variant?: "full" | "chain";
    pageSize?: number;
};

const IndustryCompanyTable: React.FC<IndustryCompanyTableProps> = ({
    data,
    variant = "full",
    pageSize: pageSizeProp,
}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { rows } = data;
    const pageSize =
        pageSizeProp ?? (variant === "chain" ? CHAIN_PAGE_SIZE : DEFAULT_PAGE_SIZE);
    const totalCount = data.total ?? rows.length;

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const pageRows = useMemo(() => {
        const start = (page - 1) * pageSize;
        return rows.slice(start, start + pageSize);
    }, [page, pageSize, rows]);

    const rowIndex = (index: number) => (page - 1) * pageSize + index + 1;

    const renderChainRow = (company: ChainEnterprise, index: number) => (
        <tr
            key={company.companyId}
            className="border-t border-slate-200 hover:bg-slate-50 align-top"
        >
            <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums">
                {rowIndex(index)}
            </td>
            <td className="px-4 py-3 min-w-[240px]">
                <button
                    type="button"
                    className="font-medium text-slate-900 hover:text-orange-500 text-left"
                    onClick={() => navigate("/details")}
                >
                    {company.companyName}
                </button>
            </td>
            <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                {company.legalPerson}
            </td>
            <td className="px-4 py-3 text-slate-700 min-w-[160px] whitespace-nowrap">
                {company.location}
            </td>
            <td className="px-4 py-3 text-slate-700 whitespace-nowrap tabular-nums">
                {company.establishDate}
            </td>
            <td className="px-4 py-3 text-slate-700 whitespace-nowrap tabular-nums text-right">
                {formatCapitalWan(company.capital)}
            </td>
            <td className="px-4 py-3 text-slate-700 max-w-[200px]">
                <span className="block truncate" title={company.industryL4Name}>
                    {company.industryL4Name}
                </span>
            </td>
        </tr>
    );

    const renderCompanyRow = (company: ChainEnterprise, index: number) => (
        <tr
            key={company.companyId}
            className="border-t border-slate-200 hover:bg-slate-50 align-top"
        >
            <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                {rowIndex(index)}
            </td>
            <td className="px-4 py-3 min-w-[280px]">
                <div className="flex items-start gap-2">
                    {company.logoUrl ? (
                        <img
                            src={company.logoUrl}
                            alt=""
                            className="w-8 h-8 rounded border border-slate-200 object-contain bg-card shrink-0"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-violet-600" />
                        </div>
                    )}
                    <div>
                        <button
                            type="button"
                            className="font-medium text-slate-900 hover:text-orange-500 text-left"
                            onClick={() => navigate("/details")}
                        >
                            {company.companyName}
                        </button>
                        <div className="text-xs text-slate-600 mt-0.5">
                            {company.creditNo}
                        </div>
                        {company.techCertificationList.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {company.techCertificationList.slice(0, 3).map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-[10px] px-1.5 py-0 font-normal"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                                {company.techCertificationList.length > 3 && (
                                    <Badge
                                        variant="outline"
                                        className="text-[10px] px-1.5 py-0 font-normal"
                                    >
                                        +{company.techCertificationList.length - 3}
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{company.legalPerson}</td>
            <td className="px-4 py-3 whitespace-nowrap">
                <Badge
                    variant="outline"
                    className="text-emerald-600 bg-emerald-50 border-emerald-100 whitespace-nowrap"
                >
                    {company.companyStatus}
                </Badge>
            </td>
            <td className="px-4 py-3 text-slate-700 min-w-[160px] whitespace-nowrap">
                {company.location}
            </td>
            <td className="px-4 py-3 text-slate-700 min-w-[140px] whitespace-nowrap">
                {company.industryL4Name}
            </td>
            <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                {formatCapital(company.capital)}
            </td>
            <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                {company.establishDate}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
                <Badge variant="secondary" className="whitespace-nowrap">{company.majorEntLevel}</Badge>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
                {company.sciTechLevel ? (
                    <span className="text-sm text-slate-700">
                        {company.sciTechLevel}
                        {company.sciTechScore > 0 && (
                            <span className="text-slate-600 ml-1">
                                ({company.sciTechScore})
                            </span>
                        )}
                    </span>
                ) : (
                    <span className="text-slate-600">—</span>
                )}
            </td>
            <td className="px-4 py-3 min-w-[200px]">
                <div className="text-xs text-slate-600 whitespace-nowrap" title={company.fieldL1Name}>
                    {company.fieldL1Name || "—"}
                </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex flex-col gap-1">
                    {company.finStageStr && (
                        <Badge variant="outline" className="w-fit text-xs">
                            {company.finStageStr}
                            {company.listedAll.trim() && ` · ${company.listedAll.trim()}`}
                        </Badge>
                    )}
                    {company.riskAccessLevel && (
                        <Badge
                            variant="outline"
                            className={`w-fit text-xs ${riskLevelClass(company.riskAccessLevel)}`}
                        >
                            风险 {company.riskAccessLevel}
                        </Badge>
                    )}
                </div>
            </td>
        </tr>
    );

    const colSpan = variant === "chain" ? 7 : 12;

    return (
        <div className="space-y-4 min-w-0">
            <div className="w-full max-w-full overflow-x-auto overscroll-x-contain rounded-xl border border-slate-200">
                <table className="w-max min-w-full text-sm border-collapse">
                    <thead className="bg-slate-100 text-slate-700">
                        {variant === "chain" ? (
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap w-14">
                                    序号
                                </th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[240px]">
                                    企业名称
                                </th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[96px]">
                                    法定代表人
                                </th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[160px]">
                                    省市
                                </th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[108px]">
                                    成立时间
                                </th>
                                <th className="px-4 py-3 text-right font-semibold whitespace-nowrap min-w-[100px]">
                                    注册资本(万元)
                                </th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[180px]">
                                    国标行业
                                </th>
                            </tr>
                        ) : (
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap w-14">序号</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[280px]">企业名称</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[96px]">法定代表人</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[88px]">经营状态</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[160px]">所属地区</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[140px]">行业</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[100px]">注册资本</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[108px]">成立日期</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[96px]">企业层级</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[96px]">科创等级</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[200px]">产业领域</th>
                                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[120px]">标签</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {pageRows.length > 0 ? (
                            pageRows.map(
                                variant === "chain" ? renderChainRow : renderCompanyRow
                            )
                        ) : (
                            <tr>
                                <td
                                    colSpan={colSpan}
                                    className="px-4 py-12 text-center text-slate-600"
                                >
                                    暂无数据
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                <span>
                    共 {totalCount.toLocaleString("zh-CN")} 条 · {pageSize} 条/页
                </span>
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            上一页
                        </Button>
                        <span className="text-xs tabular-nums px-2">
                            {page} / {totalPages}
                        </span>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            下一页
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export const IndustryAnalysisContent: React.FC<IndustryAnalysisProps> = ({
    section,
    hideHeader = false,
}) => {
    const show = (id: IndustrySectionId) => !section || section === id;

    const enterpriseTrendOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { trigger: "axis" },
            grid: { left: 40, right: 16, top: 24, bottom: 28 },
            xAxis: {
                type: "category",
                data: ENTERPRISE_TREND_YEARS,
                boundaryGap: false,
                axisLabel: { fontSize: 11, color: "#64748b" },
                axisLine: { lineStyle: { color: "#e2e8f0" } },
            },
            yAxis: {
                type: "value",
                min: 0,
                max: 15000,
                splitNumber: 5,
                splitLine: { lineStyle: { type: "dashed", color: "#f1f5f9" } },
                axisLabel: {
                    fontSize: 11,
                    color: "#64748b",
                    formatter: (v: number) =>
                        v >= 1000 ? `${v / 1000}k` : `${v}`,
                },
            },
            series: [
                {
                    name: "企业数量",
                    type: "line",
                    smooth: true,
                    symbol: "circle",
                    symbolSize: 6,
                    data: ENTERPRISE_TREND_COUNTS,
                    lineStyle: { width: 2, color: "#ea580c" },
                    itemStyle: { color: "#ea580c" },
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: "rgba(99, 102, 241, 0.35)" },
                                { offset: 1, color: "rgba(99, 102, 241, 0.02)" },
                            ],
                        },
                    },
                },
            ],
        }),
        []
    );

    const capitalDistributionOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: {
                trigger: "item",
                formatter: (params) => {
                    const p = Array.isArray(params) ? params[0] : params;
                    if (!p || typeof p.value !== "number") return "";
                    const pct = ((p.value / ENTERPRISE_TOTAL) * 100).toFixed(1);
                    return `${p.name}<br/>${Number(p.value).toLocaleString("zh-CN")} 家 (${pct}%)`;
                },
            },
            legend: { bottom: 0, itemWidth: 10, itemHeight: 10, textStyle: { fontSize: 11 } },
            series: [
                {
                    name: "注册资本",
                    type: "pie",
                    radius: ["38%", "68%"],
                    center: ["50%", "44%"],
                    label: {
                        formatter: "{b}\n{c}家",
                        fontSize: 11,
                    },
                    data: CAPITAL_DISTRIBUTION.map((d, i) => ({
                        ...d,
                        itemStyle: {
                            color: ["#fb923c", "#f97316", "#34d399", "#fbbf24", "#f472b6"][i],
                        },
                    })),
                },
            ],
        }),
        []
    );

    const establishmentYearsOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
            grid: { left: 40, right: 16, top: 24, bottom: 48 },
            xAxis: {
                type: "category",
                data: ESTABLISHMENT_YEARS_DISTRIBUTION.map((d) => d.name),
                axisLabel: { fontSize: 10, color: "#64748b", interval: 0, rotate: 20 },
                axisLine: { lineStyle: { color: "#e2e8f0" } },
            },
            yAxis: {
                type: "value",
                splitLine: { lineStyle: { type: "dashed", color: "#f1f5f9" } },
                axisLabel: { fontSize: 11, color: "#64748b" },
            },
            series: [
                {
                    name: "企业数",
                    type: "bar",
                    barWidth: "50%",
                    data: ESTABLISHMENT_YEARS_DISTRIBUTION.map((d, i) => ({
                        value: d.value,
                        itemStyle: {
                            borderRadius: [6, 6, 0, 0],
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: ["#f97316", "#fb923c", "#fbbf24", "#2dd4bf", "#94a3b8", "#cbd5e1", "#e2e8f0"][i] },
                                    { offset: 1, color: ["#c2410c", "#f97316", "#ea580c", "#14b8a6", "#64748b", "#94a3b8", "#cbd5e1"][i] },
                                ],
                            },
                        },
                    })),
                    label: {
                        show: true,
                        position: "top",
                        formatter: (p) =>
                            p.value
                                ? Number(p.value).toLocaleString("zh-CN")
                                : "",
                        fontSize: 11,
                        color: "#64748b",
                    },
                },
            ],
        }),
        []
    );

    const intellectualPropertyOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: {
                trigger: "item",
                formatter: (params) => {
                    const p = Array.isArray(params) ? params[0] : params;
                    if (!p || typeof p.value !== "number") return "";
                    const pct = ((p.value / INTELLECTUAL_PROPERTY_TOTAL) * 100).toFixed(1);
                    return `${p.name}<br/>${Number(p.value).toLocaleString("zh-CN")} 件 (${pct}%)`;
                },
            },
            legend: { orient: "vertical", right: 8, top: "middle", itemWidth: 10, itemHeight: 10 },
            series: [
                {
                    name: "知识产权",
                    type: "pie",
                    roseType: "radius",
                    radius: ["18%", "62%"],
                    center: ["38%", "50%"],
                    label: { show: false },
                    data: INTELLECTUAL_PROPERTY_DISTRIBUTION.map((d, i) => ({
                        ...d,
                        itemStyle: {
                            color: ["#ea580c", "#f97316", "#f59e0b"][i],
                        },
                    })),
                },
            ],
        }),
        []
    );

    return (
        <div className="container mx-auto py-8 max-w-7xl space-y-8">
            {!hideHeader && (
            <div>
                <h1 className="text-3xl font-bold text-slate-900">产业分析</h1>
                <p className="text-slate-500 mt-2">
                    从产业概览到区域热力，按统一路径展示六个分析部分。
                </p>
            </div>
            )}

            {show("overview") && <Card className="p-5 space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        <h2 className="font-semibold text-slate-900">产业概览</h2>
                    </div>
                </div>

                <section className="space-y-3">
                    <h3 className="text-sm font-medium text-slate-700">科创企业分布</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                        {SCI_TECH_ENTERPRISE_METRICS.map((item) => (
                            <div
                                key={item.label}
                                className={`rounded-xl bg-gradient-to-br ${item.accent} ring-1 px-3 py-3 transition-shadow hover:shadow-sm`}
                            >
                                <div className="text-[11px] text-slate-500 leading-snug min-h-[2rem]">
                                    {item.label}
                                </div>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-slate-900 tabular-nums">
                                        {item.value.toLocaleString("zh-CN")}
                                    </span>
                                    <span className="text-xs text-slate-600">家</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Card>}

            {show("portrait") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <UserSquare2 className="w-5 h-5 text-cyan-600" />
                    <h2 className="font-semibold text-slate-900">
                        产业画像
                    </h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                        <h3 className="text-sm font-medium text-slate-700 mb-1">
                            企业数量趋势
                        </h3>
                        <p className="text-xs text-slate-600 mb-3">2015 — 2025 年新设企业数量</p>
                        <EChartPanel
                            option={enterpriseTrendOption}
                            className="h-64 w-full"
                        />
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                        <div className="flex items-end justify-between gap-2 mb-3">
                            <div>
                                <h3 className="text-sm font-medium text-slate-700">
                                    企业注册资本分布
                                </h3>
                                <p className="text-xs text-slate-600 mt-1">按注册资本区间统计</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-slate-900 tabular-nums">
                                    {ENTERPRISE_TOTAL.toLocaleString("zh-CN")}
                                </div>
                                <div className="text-xs text-slate-600">企业总数</div>
                            </div>
                        </div>
                        <EChartPanel
                            option={capitalDistributionOption}
                            className="h-64 w-full"
                        />
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                        <h3 className="text-sm font-medium text-slate-700 mb-1">
                            企业成立年限分布
                        </h3>
                        <p className="text-xs text-slate-600 mb-3">按成立时间区间统计企业数量</p>
                        <EChartPanel
                            option={establishmentYearsOption}
                            className="h-64 w-full"
                        />
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                        <div className="flex items-end justify-between gap-2 mb-3">
                            <div>
                                <h3 className="text-sm font-medium text-slate-700">
                                    知识产权分布
                                </h3>
                                <p className="text-xs text-slate-600 mt-1">专利类型构成</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-slate-900 tabular-nums">
                                    {INTELLECTUAL_PROPERTY_TOTAL.toLocaleString()}
                                </div>
                                <div className="text-xs text-slate-600">知识产权总数</div>
                            </div>
                        </div>
                        <EChartPanel
                            option={intellectualPropertyOption}
                            className="h-64 w-full"
                        />
                    </div>
                </div>
            </Card>}

            {show("chain-enterprises") && <Card className="p-5 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <Box className="w-5 h-5 text-violet-600" />
                    <h2 className="font-semibold text-slate-900">
                        链上企业
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                        企业列表
                    </Badge>
                </div>
                <IndustryCompanyTable
                    data={CHAIN_ENTERPRISES_MOCK}
                    variant="chain"
                    pageSize={CHAIN_PAGE_SIZE}
                />
            </Card>}

            {show("key-companies") && <Card className="p-5 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <h2 className="font-semibold text-slate-900">
                        重点企业
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                        企业列表
                    </Badge>
                </div>
                <IndustryCompanyTable
                    data={KEY_COMPANIES_MOCK}
                    variant="chain"
                    pageSize={KEY_PAGE_SIZE}
                />
            </Card>}

            {show("chain-map") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Network className="w-5 h-5 text-orange-500" />
                    <h2 className="font-semibold text-slate-900">
                        产业链图谱
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                        产业结构
                    </Badge>
                </div>
                <IndustryChainMap />
            </Card>}

            {show("heatmap") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <MapPinned className="w-5 h-5 text-emerald-600" />
                    <h2 className="font-semibold text-slate-900">
                        区域产业热力图
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                        产业节点分布
                    </Badge>
                </div>
                <RegionalIndustryHeatmap />
            </Card>}
        </div>
    );
};

type IndustryModule = {
    id: string;
    name: string;
    submodules: Array<{
        id: string;
        name: string;
        icon: React.ComponentType<{ className?: string }>;
        metricLabel: string;
        metricValue: string;
    }>;
};

const INDUSTRY_MODULES: IndustryModule[] = [
    {
        id: "new-energy-vehicle",
        name: "新能源汽车",
        submodules: [
            {
                id: "battery-industry",
                name: "电池产业",
                icon: Box,
                metricLabel: "产业链企业",
                metricValue: "1,052家",
            },
            {
                id: "new-energy-vehicle",
                name: "新能源汽车",
                icon: Building2,
                metricLabel: "重点企业",
                metricValue: "231家",
            },
        ],
    },
    {
        id: "next-gen-it",
        name: "新一代信息技术",
        submodules: [
            {
                id: "cloud-computing",
                name: "云计算",
                icon: Network,
                metricLabel: "产业链企业",
                metricValue: "2,028家",
            },
            {
                id: "big-data",
                name: "大数据",
                icon: TrendingUp,
                metricLabel: "近三年增速",
                metricValue: "18%",
            },
            {
                id: "smart-terminal",
                name: "智能终端",
                icon: Building2,
                metricLabel: "重点企业",
                metricValue: "96家",
            },
            {
                id: "info-software",
                name: "软件和信息技术服务",
                icon: Box,
                metricLabel: "产业链企业",
                metricValue: "3,412家",
            },
        ],
    },
    {
        id: "ai",
        name: "人工智能",
        submodules: [
            {
                id: "ai",
                name: "人工智能",
                icon: UserSquare2,
                metricLabel: "产业链企业",
                metricValue: "18546家",
            },
        ],
    },
    {
        id: "high-end-equipment",
        name: "高端装备制造",
        submodules: [
            {
                id: "rail-transport-equipment",
                name: "轨道交通装备",
                icon: Box,
                metricLabel: "重点企业",
                metricValue: "31家",
            },
            {
                id: "smart-manufacturing-equipment",
                name: "智能制造装备",
                icon: Network,
                metricLabel: "产业链企业",
                metricValue: "1,744家",
            },
        ],
    },
    {
        id: "green-low-carbon",
        name: "新能源及绿色低碳",
        submodules: [
            {
                id: "wind",
                name: "风电",
                icon: TrendingUp,
                metricLabel: "产业链企业",
                metricValue: "928家",
            },
            {
                id: "pv",
                name: "光伏",
                icon: Box,
                metricLabel: "产业链企业",
                metricValue: "1,367家",
            },
            {
                id: "energy-saving",
                name: "节能环保",
                icon: UserSquare2,
                metricLabel: "产业链企业",
                metricValue: "1,105家",
            },
            {
                id: "green-hydrogen",
                name: "氢能",
                icon: Network,
                metricLabel: "产业链企业",
                metricValue: "516家",
            },
            {
                id: "clean-energy",
                name: "清洁能源",
                icon: MapPinned,
                metricLabel: "活跃区域",
                metricValue: "19个",
            },
        ],
    },
    {
        id: "new-material",
        name: "新材料",
        submodules: [
            {
                id: "new-materials",
                name: "新材料",
                icon: Box,
                metricLabel: "产业链企业",
                metricValue: "2,479家",
            },
        ],
    },
    {
        id: "low-altitude-aerospace",
        name: "低空经济和商业航天",
        submodules: [
            {
                id: "uav",
                name: "低空经济",
                icon: MapPinned,
                metricLabel: "产业链企业",
                metricValue: "684家",
            },
            {
                id: "commercial-space",
                name: "商业航天",
                icon: Network,
                metricLabel: "重点企业",
                metricValue: "41家",
            },
            {
                id: "low-altitude-flight",
                name: "低空飞行",
                icon: TrendingUp,
                metricLabel: "活跃区域",
                metricValue: "17个",
            },
            {
                id: "aerospace-manufacturing",
                name: "航天制造",
                icon: Box,
                metricLabel: "产业链企业",
                metricValue: "236家",
            },
        ],
    },
    {
        id: "smart-home",
        name: "智能家居",
        submodules: [
            {
                id: "smart-home",
                name: "智能家居",
                icon: Building2,
                metricLabel: "产业链企业",
                metricValue: "1,007家",
            },
        ],
    },
    {
        id: "biomedicine",
        name: "生物医药",
        submodules: [
            {
                id: "biopharma",
                name: "医疗器械",
                icon: UserSquare2,
                metricLabel: "产业链企业",
                metricValue: "1,370家",
            },
            {
                id: "biotech",
                name: "生物科技",
                icon: Network,
                metricLabel: "重点企业",
                metricValue: "91家",
            },
        ],
    },
    {
        id: "future-industry",
        name: "未来产业",
        submodules: [
            {
                id: "quantum",
                name: "量子科技",
                icon: Network,
                metricLabel: "重点企业",
                metricValue: "27家",
            },
            {
                id: "life-science",
                name: "生命科学",
                icon: UserSquare2,
                metricLabel: "产业链企业",
                metricValue: "1,126家",
            },
            {
                id: "future-network",
                name: "未来网络",
                icon: Box,
                metricLabel: "产业链企业",
                metricValue: "812家",
            },
        ],
    },
    {
        id: "featured-industry",
        name: "特色产业",
        submodules: [
            {
                id: "regional-feature",
                name: "特色产业",
                icon: MapPinned,
                metricLabel: "重点企业",
                metricValue: "68家",
            },
        ],
    },
];

function sectionLabel(id: IndustrySectionId): string {
    switch (id) {
        case "overview":
            return "产业概览";
        case "portrait":
            return "产业画像";
        case "chain-enterprises":
            return "链上企业";
        case "key-companies":
            return "重点企业";
        case "chain-map":
            return "产业链图谱";
        case "heatmap":
            return "区域产业热力图";
        default:
            return "产业概览";
    }
}

function normalizeSection(s: string | null): IndustrySectionId {
    const v = (s ?? "").trim();
    const allowed: IndustrySectionId[] = [
        "overview",
        "portrait",
        "chain-enterprises",
        "key-companies",
        "chain-map",
        "heatmap",
    ];
    return (allowed.includes(v as IndustrySectionId)
        ? (v as IndustrySectionId)
        : "overview");
}

const IndustryAnalysis: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const sp = useMemo(
        () => new URLSearchParams(location.search),
        [location.search]
    );
    const moduleId = sp.get("module") || "";
    const subId = sp.get("sub") || "";
    const section = normalizeSection(sp.get("section"));

    const selectedModule = useMemo(
        () => INDUSTRY_MODULES.find((m) => m.id === moduleId),
        [moduleId]
    );
    const selectedSub = useMemo(
        () => selectedModule?.submodules.find((s) => s.id === subId),
        [selectedModule, subId]
    );

    const go = (next: Record<string, string | undefined>) => {
        const nextSp = new URLSearchParams(location.search);
        Object.entries(next).forEach(([k, v]) => {
            if (!v) nextSp.delete(k);
            else nextSp.set(k, v);
        });
        navigate({
            pathname: location.pathname,
            search: `?${nextSp.toString()}`,
        });
    };

    const inDetail = Boolean(selectedModule && selectedSub);

    if (!selectedModule) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">产业分析</h1>
                    <p className="text-slate-500 mt-2">
                        先选择一个产业模块，再进入子模块查看六大分析页签。
                    </p>
                </div>

                <Card className="p-5 border-slate-200 shadow-sm">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {INDUSTRY_MODULES.map((m) => (
                            <button
                                key={m.id}
                                type="button"
                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-card px-4 py-4 text-left hover:bg-slate-50"
                                onClick={() => go({ module: m.id, sub: undefined, section: undefined })}
                            >
                                <div className="font-semibold text-slate-900">{m.name}</div>
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                            </button>
                        ))}
                    </div>
                </Card>
            </div>
        );
    }

    if (!inDetail) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => go({ module: undefined, sub: undefined, section: undefined })}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        返回模块列表
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{selectedModule.name}</h1>
                        <p className="text-slate-500 text-sm mt-1">
                            点击子模块进入详情（产业概览/画像/链上企业/重点企业/图谱/热力图）。
                        </p>
                    </div>
                </div>

                <Card className="p-5 border-slate-200 shadow-sm">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {selectedModule.submodules.map((s) => {
                            const Icon = s.icon;
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    className="group rounded-xl border border-slate-200 bg-card p-4 text-left hover:shadow-md transition-shadow"
                                    onClick={() => go({ sub: s.id, section: "overview" })}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div className="font-semibold text-slate-900">{s.name}</div>
                                    </div>
                                    <div className="mt-3 text-xs text-slate-500">
                                        {s.metricLabel}
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-slate-900">
                                        {s.metricValue}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <button
                            type="button"
                            className="hover:text-orange-500"
                            onClick={() => go({ sub: undefined, section: undefined })}
                        >
                            {selectedModule.name}
                        </button>
                        <span>/</span>
                        <span className="text-slate-900 font-semibold">{selectedSub?.name}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {selectedSub?.name} · {sectionLabel(section)}
                    </h1>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => go({ sub: undefined, section: undefined })}
                >
                    <ChevronLeft className="w-4 h-4" />
                    返回子模块
                </Button>
            </div>

            <Card className="p-3 border-slate-200 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    {(
                        [
                            "overview",
                            "portrait",
                            "chain-enterprises",
                            "key-companies",
                            "chain-map",
                            "heatmap",
                        ] as IndustrySectionId[]
                    ).map((id) => (
                        <Button
                            key={id}
                            type="button"
                            variant={section === id ? "default" : "outline"}
                            className={
                                section === id
                                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                                    : ""
                            }
                            onClick={() => go({ section: id })}
                        >
                            {sectionLabel(id)}
                        </Button>
                    ))}
                </div>
            </Card>

            <IndustryAnalysisContent section={section} hideHeader />
        </div>
    );
};

export default IndustryAnalysis;
