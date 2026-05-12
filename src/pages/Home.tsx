import React, { useMemo, useState } from "react";
import {
    Search,
    Tag,
    TrendingUp,
    Database,
    Stamp,
    ShieldAlert,
    ScrollText,
    type LucideIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

type ServiceItem = {
    title: string;
    desc: string;
    to?: string;
    icon: LucideIcon;
};

/** 服务入口：左图标 + 右标题/描述 */
const SERVICE_GRID_ITEMS: ServiceItem[] = [
    {
        title: "企业标签管理",
        desc: "为企业档案维护分级标签体系，支撑客群分层与定向检索。",
        to: "/enterprise-tags",
        icon: Tag,
    },
    {
        title: "产业分析",
        desc: "梳理产业链上下游与区域分布，辅助研判赛道结构与景气变化。",
        to: "/industry-analysis",
        icon: TrendingUp,
    },
    {
        title: "信用大数据",
        desc: "整合授信、履约与公示等多维信号，勾勒经营主体信用轮廓。",
        to: "/financials",
        icon: Database,
    },
    {
        title: "查商标",
        desc: "按名称与类别开展近似比对，辅助评估注册可行性与冲突风险。",
        icon: Stamp,
    },
    {
        title: "风险排查",
        desc: "穿透股权关联与行政处罚等线索，及早识别潜在经营合规隐患。",
        to: "/risk",
        icon: ShieldAlert,
    },
    {
        title: "招投标查询",
        desc: "汇集招标公告与中标结果，便于跟踪采购动态与项目机会。",
        icon: ScrollText,
    },
];

/** 首页联想：输入「北京」「苏州」匹配对应企业 */
const DEMO_COMPANIES = [
    { keyword: "北京", name: "北京智车睿控" },
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
        navigate("/details");
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <section className="relative flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-slate-50">
                <div className="flex-1 flex flex-col justify-center py-8 md:py-10 pb-12 md:pb-16">
                    <div className="container mx-auto px-4 relative z-10 text-center max-w-7xl">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            AI EASY
                            <span className="text-indigo-600">
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
                                        <Search className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
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
                                        className="block w-full pl-14 pr-[8rem] py-3.5 rounded-2xl border-2 border-slate-200 bg-white text-base md:text-[17px] focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition-all shadow-md shadow-indigo-500/5"
                                    />
                                    {suggestOpen && suggestions.length > 0 && (
                                        <ul
                                            className="absolute left-0 right-0 top-full mt-1.5 z-20 rounded-lg border border-slate-200 bg-white py-0.5 shadow-lg shadow-slate-200/70 text-left overflow-hidden"
                                            role="listbox"
                                        >
                                            {suggestions.map((c) => (
                                                <li key={c.name}>
                                                    <button
                                                        type="button"
                                                        className="w-full px-4 py-3 text-left text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 text-base transition-colors"
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
                                            className="h-10 px-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-base font-semibold shadow-md shadow-indigo-200/80"
                                        >
                                            查一下
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 shrink-0 px-6 rounded-2xl border-slate-200 bg-slate-50 text-slate-700 text-base font-medium hover:bg-slate-100 hover:text-slate-900 shadow-none"
                                >
                                    高级搜索
                                </Button>
                            </form>

                            <div className="mt-4 flex flex-wrap justify-center gap-x-3.5 gap-y-2 text-sm text-slate-500">
                                <span>热搜：</span>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-indigo-600"
                                >
                                    北京智车睿控
                                </button>
                                <button
                                    onClick={() => navigate("/details?id=2549")}
                                    className="hover:text-indigo-600"
                                >
                                    苏州海鑫
                                </button>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-indigo-600"
                                >
                                    阿里巴巴
                                </button>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-indigo-600"
                                >
                                    腾讯科技
                                </button>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-indigo-600"
                                >
                                    华为
                                </button>
                                <button
                                    onClick={() => navigate("/details")}
                                    className="hover:text-indigo-600"
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
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100/80">
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
                                        "flex gap-3 rounded-xl p-2 -m-2 text-left transition-colors hover:bg-white/80 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30";

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
