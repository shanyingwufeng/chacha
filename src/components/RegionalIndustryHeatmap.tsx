import React, { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";
import {
    MACRO_REGIONS,
    NODE_CATEGORIES,
    NODE_CATEGORY_TOTALS,
    NODE_GRAND_TOTAL,
    REGIONAL_NODE_ROWS,
} from "../data/industryRegionalHeatmapMock";

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

const CATEGORY_COLORS = ["#fb923c", "#ea580c", "#22c55e", "#f59e0b", "#f472b6"];

export const RegionalIndustryHeatmap: React.FC = () => {
    const heatmapMax = useMemo(
        () =>
            Math.max(
                ...REGIONAL_NODE_ROWS.flatMap((row) =>
                    NODE_CATEGORIES.map((cat) => row.values[cat])
                ),
                1
            ),
        []
    );

    const heatmapOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: {
                position: "top",
                formatter: (params) => {
                    const p = Array.isArray(params) ? params[0] : params;
                    if (!p || !Array.isArray(p.value)) return "";
                    const [x, y, value] = p.value as [number, number, number];
                    return `${MACRO_REGIONS[y]} · ${NODE_CATEGORIES[x]}<br/>节点数：<b>${value}</b>`;
                },
            },
            grid: { left: 72, right: 24, top: 16, bottom: 72 },
            xAxis: {
                type: "category",
                data: [...NODE_CATEGORIES],
                splitArea: { show: true },
                axisLabel: { fontSize: 11, color: "#475569" },
            },
            yAxis: {
                type: "category",
                data: [...MACRO_REGIONS],
                splitArea: { show: true },
                axisLabel: { fontSize: 11, color: "#475569" },
            },
            visualMap: {
                min: 0,
                max: heatmapMax,
                calculable: true,
                orient: "horizontal",
                left: "center",
                bottom: 8,
                inRange: {
                    color: ["#f8fafc", "#bae6fd", "#fb923c", "#c2410c", "#075985"],
                },
                text: ["高", "低"],
                textStyle: { fontSize: 11, color: "#64748b" },
            },
            series: [
                {
                    type: "heatmap",
                    label: {
                        show: true,
                        fontSize: 11,
                        color: "#f1f5f9",
                        formatter: (p) => {
                            const raw = Array.isArray(p.value) ? p.value[2] : 0;
                            const value = typeof raw === "number" ? raw : 0;
                            return value > 0 ? String(value) : "";
                        },
                    },
                    data: REGIONAL_NODE_ROWS.flatMap((row, y) =>
                        NODE_CATEGORIES.map((cat, x) => [x, y, row.values[cat]])
                    ),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 8,
                            shadowColor: "rgba(0,0,0,0.15)",
                        },
                    },
                },
            ],
        }),
        [heatmapMax]
    );

    const stackedBarOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
            legend: {
                bottom: 0,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: { fontSize: 11 },
            },
            grid: { left: 56, right: 16, top: 16, bottom: 48 },
            xAxis: {
                type: "value",
                splitLine: { lineStyle: { type: "dashed", color: "#f1f5f9" } },
                axisLabel: { fontSize: 11, color: "#64748b" },
            },
            yAxis: {
                type: "category",
                data: [...MACRO_REGIONS].reverse(),
                axisLabel: { fontSize: 11, color: "#475569" },
                axisLine: { show: false },
                axisTick: { show: false },
            },
            series: NODE_CATEGORIES.map((cat, i) => ({
                name: cat,
                type: "bar",
                stack: "total",
                barWidth: 16,
                emphasis: { focus: "series" },
                itemStyle: { color: CATEGORY_COLORS[i] },
                data: [...MACRO_REGIONS]
                    .reverse()
                    .map(
                        (region) =>
                            REGIONAL_NODE_ROWS.find((r) => r.region === region)?.values[cat] ?? 0
                    ),
            })),
        }),
        []
    );

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>产业节点合计 {NODE_GRAND_TOTAL} 个</span>
                <span className="text-slate-700">|</span>
                <span>省级数据归纳为大区展示</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {NODE_CATEGORIES.map((cat, i) => (
                    <div
                        key={cat}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5"
                    >
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: CATEGORY_COLORS[i] }}
                        />
                        <span className="text-xs text-slate-600">{cat}</span>
                        <span className="text-sm font-semibold text-slate-900 tabular-nums">
                            {NODE_CATEGORY_TOTALS[cat]}
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <h3 className="text-sm font-medium text-slate-700 mb-1">大区 × 节点热力</h3>
                    <p className="text-xs text-slate-600 mb-3">颜色越深表示节点数量越多</p>
                    <EChartPanel option={heatmapOption} className="h-80 w-full" />
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <h3 className="text-sm font-medium text-slate-700 mb-1">大区节点构成</h3>
                    <p className="text-xs text-slate-600 mb-3">五类节点在各区域的堆叠分布</p>
                    <EChartPanel option={stackedBarOption} className="h-80 w-full" />
                </div>
            </div>
        </div>
    );
};
