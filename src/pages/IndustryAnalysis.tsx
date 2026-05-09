import React, { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
    Network,
    MapPinned,
    Box,
    TrendingUp,
    UserSquare2,
    Building2,
} from "lucide-react";

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

const RelationshipGraph: React.FC = () => {
    const nodes = [
        {
            id: "core",
            label: "北京智车睿控",
            x: 350,
            y: 160,
            r: 36,
            color: "#2563eb",
        },

        {
            id: "upChip",
            label: "芯片/半导体",
            x: 120,
            y: 55,
            r: 18,
            color: "#0ea5e9",
        },
        {
            id: "upSensor",
            label: "传感器",
            x: 120,
            y: 120,
            r: 18,
            color: "#0ea5e9",
        },
        {
            id: "upDisplay",
            label: "显示面板",
            x: 120,
            y: 185,
            r: 18,
            color: "#0ea5e9",
        },
        {
            id: "upAlgo",
            label: "软件/算法",
            x: 120,
            y: 250,
            r: 18,
            color: "#0ea5e9",
        },

        {
            id: "midDomain",
            label: "域控制器集成",
            x: 350,
            y: 55,
            r: 18,
            color: "#6366f1",
        },
        {
            id: "midCockpit",
            label: "智能座舱方案",
            x: 350,
            y: 250,
            r: 18,
            color: "#6366f1",
        },

        {
            id: "downCar",
            label: "整车制造",
            x: 580,
            y: 95,
            r: 18,
            color: "#14b8a6",
        },
        {
            id: "downAfter",
            label: "后市场服务",
            x: 580,
            y: 220,
            r: 18,
            color: "#14b8a6",
        },

        {
            id: "support",
            label: "产业支撑体系",
            x: 350,
            y: 315,
            r: 16,
            color: "#64748b",
        },
    ];
    const links: Array<[string, string]> = [
        ["upChip", "core"],
        ["upSensor", "core"],
        ["upDisplay", "core"],
        ["upAlgo", "core"],

        ["core", "midDomain"],
        ["core", "midCockpit"],

        ["midDomain", "downCar"],
        ["midCockpit", "downCar"],
        ["midCockpit", "downAfter"],

        ["support", "upChip"],
        ["support", "midDomain"],
        ["support", "downCar"],
    ];

    const getNode = (id: string) => nodes.find((n) => n.id === id)!;

    return (
        <svg
            viewBox="0 0 700 360"
            className="w-full h-96 rounded-xl bg-white border border-slate-200"
        >
            {links.map(([from, to]) => {
                const a = getNode(from);
                const b = getNode(to);
                return (
                    <line
                        key={`${from}-${to}`}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke="#94a3b8"
                        strokeWidth={2}
                        strokeDasharray="5 4"
                    />
                );
            })}
            <rect x={58} y={8} width={188} height={20} rx={10} fill="#e0f2fe" />
            <text x={70} y={22} fontSize={11} fill="#0369a1" fontWeight={700}>
                上游：核心零部件与技术层
            </text>
            <rect
                x={288}
                y={8}
                width={188}
                height={20}
                rx={10}
                fill="#e0e7ff"
            />
            <text x={300} y={22} fontSize={11} fill="#4338ca" fontWeight={700}>
                中游：系统集成与解决方案层
            </text>
            <rect
                x={512}
                y={8}
                width={140}
                height={20}
                rx={10}
                fill="#ccfbf1"
            />
            <text x={525} y={22} fontSize={11} fill="#0f766e" fontWeight={700}>
                下游：应用与消费层
            </text>
            {nodes.map((n) => (
                <g key={n.id}>
                    <circle
                        cx={n.x}
                        cy={n.y}
                        r={n.r}
                        fill={n.color}
                        fillOpacity={0.12}
                    />
                    <circle cx={n.x} cy={n.y} r={n.r - 6} fill={n.color} />
                    {n.id === "core" ? (
                        <text
                            x={n.x}
                            y={n.y + 4}
                            textAnchor="middle"
                            fontSize={12}
                            fill="#fff"
                            fontWeight={700}
                        >
                            {n.label}
                        </text>
                    ) : (
                        <>
                            <text
                                x={n.x}
                                y={n.y + 4}
                                textAnchor="middle"
                                fontSize={11}
                                fill="#fff"
                                fontWeight={700}
                            >
                                {n.label.length > 4
                                    ? `${n.label.slice(0, 4)}…`
                                    : n.label}
                            </text>
                            <text
                                x={n.x}
                                y={n.y + n.r + 14}
                                textAnchor="middle"
                                fontSize={11}
                                fill="#334155"
                                fontWeight={600}
                            >
                                {n.label}
                            </text>
                        </>
                    )}
                </g>
            ))}
        </svg>
    );
};

const IndustryAnalysis: React.FC<IndustryAnalysisProps> = ({
    section,
    hideHeader = false,
}) => {
    const show = (id: IndustrySectionId) => !section || section === id;
    const overviewOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { trigger: "item" },
            legend: { bottom: 0 },
            series: [
                {
                    name: "产业占比",
                    type: "pie",
                    radius: ["45%", "70%"],
                    itemStyle: {
                        borderRadius: 6,
                        borderColor: "#fff",
                        borderWidth: 2,
                    },
                    label: { formatter: "{b}: {d}%" },
                    data: [
                        { value: 38, name: "上游" },
                        { value: 34, name: "中游" },
                        { value: 28, name: "下游" },
                    ],
                },
            ],
        }),
        []
    );

    const growthOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { trigger: "axis" },
            xAxis: {
                type: "category",
                data: ["2021", "2022", "2023", "2024", "2025", "2026E"],
            },
            yAxis: { type: "value", name: "企业数(千家)" },
            series: [
                {
                    type: "line",
                    smooth: true,
                    data: [12, 18, 26, 33, 45, 56],
                    areaStyle: {},
                    lineStyle: { width: 3, color: "#2563eb" },
                    itemStyle: { color: "#2563eb" },
                },
            ],
            grid: { left: 45, right: 12, top: 20, bottom: 30 },
        }),
        []
    );

    const portraitChainPieOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { trigger: "item" },
            legend: { bottom: 0 },
            series: [
                {
                    name: "产业链价值占比",
                    type: "pie",
                    radius: "65%",
                    label: { formatter: "{b} {d}%" },
                    data: [
                        { value: 35, name: "上游" },
                        { value: 45, name: "中游" },
                        { value: 20, name: "下游" },
                    ],
                },
            ],
        }),
        []
    );

    const portraitScalePieOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { trigger: "item" },
            legend: { bottom: 0 },
            series: [
                {
                    name: "细分赛道规模（2024）",
                    type: "pie",
                    radius: "65%",
                    label: { formatter: "{b} {c}亿元" },
                    data: [
                        { value: 680, name: "智能座舱" },
                        { value: 420, name: "智能驾驶" },
                        { value: 180, name: "车联网" },
                    ],
                },
            ],
        }),
        []
    );

    const chainEnterprisesOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { trigger: "axis" },
            legend: { top: 0, data: ["代表企业数量", "与智车睿控关联度"] },
            xAxis: {
                type: "category",
                data: [
                    "上游核心零部件",
                    "中游系统集成",
                    "下游整车应用",
                    "产业支撑体系",
                ],
                axisLabel: { interval: 0 },
            },
            yAxis: { type: "value", name: "数量 / 评分" },
            series: [
                {
                    name: "代表企业数量",
                    type: "bar",
                    data: [6, 6, 5, 5],
                    itemStyle: { color: "#7c3aed" },
                },
                {
                    name: "与智车睿控关联度",
                    type: "line",
                    smooth: true,
                    data: [72, 95, 68, 60],
                    lineStyle: { width: 3, color: "#2563eb" },
                    itemStyle: { color: "#2563eb" },
                },
            ],
            grid: { left: 45, right: 12, top: 30, bottom: 30 },
        }),
        []
    );

    const heatmapOption = useMemo<echarts.EChartsOption>(
        () => ({
            tooltip: { position: "top" },
            grid: { left: 65, right: 20, top: 30, bottom: 45 },
            xAxis: {
                type: "category",
                data: ["京津冀", "华北", "长三角", "粤港澳", "成渝", "中西部"],
                splitArea: { show: true },
            },
            yAxis: {
                type: "category",
                data: [
                    "智能座舱",
                    "智能驾驶",
                    "车联网",
                    "软件算法",
                    "芯片半导体",
                ],
                splitArea: { show: true },
            },
            visualMap: {
                min: 10,
                max: 95,
                calculable: true,
                orient: "horizontal",
                left: "center",
                bottom: 0,
            },
            series: [
                {
                    type: "heatmap",
                    label: { show: true, fontSize: 10 },
                    data: [
                        [0, 0, 72],
                        [1, 0, 66],
                        [2, 0, 89],
                        [3, 0, 83],
                        [4, 0, 58],
                        [5, 0, 49],
                        [0, 1, 68],
                        [1, 1, 61],
                        [2, 1, 92],
                        [3, 1, 86],
                        [4, 1, 63],
                        [5, 1, 55],
                        [0, 2, 64],
                        [1, 2, 57],
                        [2, 2, 84],
                        [3, 2, 78],
                        [4, 2, 60],
                        [5, 2, 52],
                        [0, 3, 76],
                        [1, 3, 69],
                        [2, 3, 88],
                        [3, 3, 82],
                        [4, 3, 65],
                        [5, 3, 56],
                        [0, 4, 59],
                        [1, 4, 54],
                        [2, 4, 81],
                        [3, 4, 74],
                        [4, 4, 57],
                        [5, 4, 50],
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: "rgba(0,0,0,0.25)",
                        },
                    },
                },
            ],
        }),
        []
    );

    const keyCompanies = [
        {
            name: "德赛西威",
            stage: "中游头部",
            score: 95,
            tag: "2024营收 276.2亿",
        },
        {
            name: "华为车BU",
            stage: "中游头部",
            score: 93,
            tag: "2024营收 约185亿",
        },
        {
            name: "中科创达",
            stage: "软件平台",
            score: 88,
            tag: "2024营收 52.8亿",
        },
        {
            name: "北京智车睿控信息技术有限公司",
            stage: "细分市场",
            score: 82,
            tag: "预估营收 <5亿",
        },
    ];

    const overviewRows = [
        {
            company: "北京智车睿控信息技术有限公司",
            summary: "智能座舱/智驾定制化方案商",
            chain: "中游",
            data: "招投标 41次 / 对外投资 1家 / 知识产权申请 22件",
            remark: "细分市场与区域市场定位",
        },
        {
            company: "智能座舱赛道",
            summary: "车载信息娱乐、数字仪表、HUD、多屏交互",
            chain: "上游",
            data: "2024年市场规模约 680 亿元",
            remark: "智能汽车电子核心赛道之一",
        },
        {
            company: "智能驾驶赛道",
            summary: "ADAS、L2+/L3级自动驾驶、泊车辅助",
            chain: "中游",
            data: "2024年市场规模约 420 亿元",
            remark: "受算法与芯片驱动增速快",
        },
        {
            company: "车联网赛道",
            summary: "T-Box、V2X通信、OTA升级、云平台",
            chain: "下游",
            data: "2024年市场规模约 180 亿元",
            remark: "车路云一体化持续推进",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
            {!hideHeader && (
            <div>
                <h1 className="text-3xl font-bold text-slate-900">产业分析</h1>
                <p className="text-slate-500 mt-2">
                    从产业概览到区域热力，按统一路径展示六个分析部分。
                </p>
            </div>
            )}

            {show("overview") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h2 className="font-semibold text-slate-900">
                        产业概览
                    </h2>
                </div>
                <div className="rounded-xl border border-slate-200 overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                        <thead className="bg-slate-100 text-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">
                                    企业名称
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    产业概括
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    产业链环节
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    产业数据
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    备注
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {overviewRows.map((row) => (
                                <tr
                                    key={row.company}
                                    className="border-t border-slate-200 hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3 font-medium text-slate-900">
                                        {row.company}
                                    </td>
                                    <td className="px-4 py-3 text-slate-700">
                                        {row.summary}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant="secondary">
                                            {row.chain}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-slate-700">
                                        {row.data}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">
                                        {row.remark}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>}

            {show("portrait") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <UserSquare2 className="w-5 h-5 text-cyan-600" />
                    <h2 className="font-semibold text-slate-900">
                        产业画像
                    </h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-200 p-3">
                        <div className="text-sm text-slate-500 px-2 pt-1">
                            1. 产业链价值占比分布（上35/中45/下20）
                        </div>
                        <EChartPanel
                            option={portraitChainPieOption}
                            className="h-72 w-full"
                        />
                    </div>
                    <div className="rounded-xl border border-slate-200 p-3">
                        <div className="text-sm text-slate-500 px-2 pt-1">
                            2. 智能汽车电子细分赛道规模（亿元）
                        </div>
                        <EChartPanel
                            option={portraitScalePieOption}
                            className="h-72 w-full"
                        />
                    </div>
                </div>
            </Card>}

            {show("chain-enterprises") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Box className="w-5 h-5 text-violet-600" />
                    <h2 className="font-semibold text-slate-900">
                        链上企业
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                        第三章分层企业图
                    </Badge>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                    基于第三章“链上企业”提取：上游（高通/英伟达/地平线/华为海思/瑞萨/恩智浦）、中游（德赛西威/均胜电子/经纬恒润/华为车BU/Momenta/中科创达）、下游（一汽/东风/上汽/广汽/长安）及产业支撑体系（中汽研/测试区/产业基金/云服务/政策监管）。
                </p>
                <EChartPanel option={chainEnterprisesOption} />
            </Card>}

            {show("key-companies") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <h2 className="font-semibold text-slate-900">
                        重点企业
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {keyCompanies.map((item, index) => (
                        <div
                            key={item.name}
                            className="rounded-xl border border-slate-200 p-4 bg-slate-50"
                        >
                            <div className="text-xs text-slate-400 mb-1">
                                TOP {index + 1}
                            </div>
                            <div className="text-sm font-semibold text-slate-900">
                                {item.name}
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-xs">
                                <Badge variant="secondary">{item.stage}</Badge>
                                <Badge variant="outline">{item.tag}</Badge>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                                <div
                                    className="h-full bg-amber-500"
                                    style={{ width: `${item.score}%` }}
                                />
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                                综合评分 {item.score}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>}

            {show("chain-map") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Network className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-semibold text-slate-900">
                        产业链图谱
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                        图谱组件
                    </Badge>
                </div>
                <RelationshipGraph />
            </Card>}

            {show("heatmap") && <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <MapPinned className="w-5 h-5 text-emerald-600" />
                    <h2 className="font-semibold text-slate-900">
                        区域产业热力图
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                        区域协同与赛道活跃度
                    </Badge>
                </div>
                <EChartPanel option={heatmapOption} className="h-96 w-full" />
            </Card>}
        </div>
    );
};

export default IndustryAnalysis;
