import React, { useMemo, useState } from "react";
import {
    Search,
    LayoutGrid,
    Radar,
    Share2,
    Activity,
    MessagesSquare,
    Gauge,
    type LucideIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { XINHEYIJIA_SHORT } from "../constants/demoCompany";

type ServiceItem = {
    title: string;
    desc: string;
    to?: string;
    icon: LucideIcon;
};

/** 服务入口：左图标 + 右标题/描述 */
const SERVICE_GRID_ITEMS: ServiceItem[] = [
    {
        title: "全景企业画像",
        desc: "贯通工商、股权与资质等维度，形成可检索、可对比的企业主体视图。",
        to: "/enterprise-tags",
        icon: LayoutGrid,
    },
    {
        title: "风险雷达扫描",
        desc: "对司法、处罚与经营异常等信号进行持续扫描，支持按主体聚合预警。",
        icon: Radar,
    },
    {
        title: "产业拓扑洞察",
        desc: "刻画产业链节点与关联强度，辅助识别关键环节与结构性机会。",
        to: "/industry-analysis",
        icon: Share2,
    },
    {
        title: "经营健康指数",
        desc: "将营收、现金流与负债等经营指标标准化，输出可追踪的健康度评估。",
        icon: Activity,
    },
    {
        title: "舆情情感引擎",
        desc: "对公开报道与社交声量做情感与主题抽取，辅助把握品牌与声誉走势。",
        icon: MessagesSquare,
    },
    {
        title: "决策驾驶舱",
        desc: "将核心指标与预警信息集中呈现，支撑管理层快速把握态势与优先级。",
        icon: Gauge,
    },
];

/** 首页联想：输入「鑫」「苏州」匹配对应企业 */
const DEMO_COMPANIES = [
    { keyword: "鑫", name: XINHEYIJIA_SHORT },
    { keyword: "苏州", name: "苏州海鑫" },
] as const;

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [suggestOpen, setSuggestOpen] = useState(false);

    const suggestions = useMemo(() => {
        const q = query;
        const list: { name: string }[] = [];
        if (q.includes(DEMO_COMPANIES[0].keyword)) {
            list.push({ name: DEMO_COMPANIES[0].name });
        }
        if (q.includes(DEMO_COMPANIES[1].keyword)) {
            list.push({ name: DEMO_COMPANIES[1].name });
        }
        return list;
    }, [query]);

    const pickCompany = (name: string) => {
        setQuery(name);
        setSuggestOpen(false);
        if (name === "苏州海鑫") {
            navigate("/details?id=2549");
            return;
        }
        if (name === XINHEYIJIA_SHORT) {
            navigate("/details");
            return;
        }
        navigate("/details");
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <section className="relative flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-orange-50 via-white to-slate-50">
                <div className="flex-1 flex flex-col justify-center py-8 md:py-10 pb-12 md:pb-16">
                    <div className="container mx-auto px-4 relative z-10 text-center max-w-7xl">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            鑫合易家
                            <span className="text-orange-500">
                                {" "}
                                数据智能平台
                            </span>
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 mb-9 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                            融通全域多维数据，构筑企业深度洞察的一体化智慧中枢平台
                        </p>

                        <div className="max-w-3xl mx-auto mb-11 md:mb-12">
                            <form
                                onSubmit={handleSearch}
                                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
                            >
                                <div className="relative group flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                        <Search className="h-6 w-6 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="请输入企业名称"
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                            setSuggestOpen(true);
                                        }}
                                        onFocus={() => setSuggestOpen(true)}
                                        onBlur={() => {
                                            window.setTimeout(
                                                () => setSuggestOpen(false),
                                                150
                                            );
                                        }}
                                        className="block w-full pl-14 pr-[8rem] py-3.5 rounded-2xl border-2 border-slate-200 bg-card text-base md:text-[17px] focus:outline-none focus:ring-2 focus:ring-ring/15 focus:border-orange-500 transition-all shadow-md shadow-orange-500/5"
                                    />
                                    {suggestOpen && suggestions.length > 0 && (
                                        <ul
                                            className="absolute left-0 right-0 top-full mt-1.5 z-20 rounded-lg border border-slate-200 bg-card py-0.5 shadow-lg shadow-slate-200/70 text-left overflow-hidden"
                                            role="listbox"
                                        >
                                            {suggestions.map((c) => (
                                                <li key={c.name}>
                                                    <button
                                                        type="button"
                                                        className="w-full px-4 py-3 text-left text-slate-800 hover:bg-orange-500/10 hover:text-orange-600 text-base transition-colors"
                                                        onMouseDown={(e) =>
                                                            e.preventDefault()
                                                        }
                                                        onClick={() =>
                                                            pickCompany(c.name)
                                                        }
                                                    >
                                                        {c.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="absolute inset-y-2 right-2 flex items-center">
                                        <Button
                                            type="submit"
                                            size="default"
                                            className="h-10 px-7 text-white rounded-xl bg-orange-500 hover:bg-orange-600 text-base font-semibold shadow-md shadow-orange-200/80"
                                        >
                                            查一下
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 shrink-0 px-6 rounded-2xl border-slate-200 bg-slate-50 text-slate-700 text-base font-medium hover:bg-slate-100 hover:text-slate-900 shadow-none"
                                    onClick={() => navigate("/advanced-search")}
                                >
                                    高级搜索
                                </Button>
                            </form>

                            <div className="mt-4 flex flex-wrap justify-center gap-x-3.5 gap-y-2 text-sm text-slate-500">
                                <span>热搜：</span>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-orange-500"
                                >
                                    鑫合易家
                                </button>
                                <button
                                    onClick={() => navigate("/details?id=2549")}
                                    className="hover:text-orange-500"
                                >
                                    苏州海鑫
                                </button>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-orange-500"
                                >
                                    阿里巴巴
                                </button>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-orange-500"
                                >
                                    腾讯科技
                                </button>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-orange-500"
                                >
                                    华为
                                </button>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-orange-500"
                                >
                                    比亚迪
                                </button>
                            </div>
                        </div>

                        <div className="w-full max-w-6xl mx-auto mt-2 text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-10 md:gap-y-8">
                                {SERVICE_GRID_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    const inner = (
                                        <>
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 ring-1 ring-orange-200/80">
                                                <Icon
                                                    className="h-5 w-5"
                                                    strokeWidth={2}
                                                />
                                            </div>
                                            <div className="min-w-0 flex flex-col gap-0.5 pt-0.5">
                                                <span className="text-sm md:text-[15px] font-semibold text-slate-900 leading-snug">
                                                    {item.title}
                                                </span>
                                                <span className="text-xs md:text-[13px] text-slate-500 leading-relaxed">
                                                    {item.desc}
                                                </span>
                                            </div>
                                        </>
                                    );
                                    const tileClass =
                                        "flex gap-3 rounded-xl p-2 -m-2 text-left transition-colors hover:bg-white/80 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30";

                                    if (item.to) {
                                        return (
                                            <Link
                                                key={item.title}
                                                to={item.to}
                                                className={tileClass}
                                            >
                                                {inner}
                                            </Link>
                                        );
                                    }
                                    return (
                                        <button
                                            key={item.title}
                                            type="button"
                                            className={tileClass}
                                        >
                                            {inner}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
