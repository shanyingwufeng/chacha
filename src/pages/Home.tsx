import React, { useMemo, useState } from "react";
import {
    Search,
    Tag,
    TrendingUp,
    Database,
    Stamp,
    ShieldAlert,
    ScrollText,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

/** 演示用：输入「北京」「苏州」分别联想对应企业；北京走无参数详情，苏州走 id=2549 */
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
        // 演示：不从「查一下」跳转结果页，仅通过下拉选择进入详情
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative flex-1 pt-20 pb-32 overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-3xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        AI EASY
                        <span className="text-indigo-600"> 数据智能平台</span>
                    </h1>

                    <div className="max-w-3xl mx-auto mb-12">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-3"
                        >
                            <div className="relative group flex-1">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
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
                                        window.setTimeout(() => setSuggestOpen(false), 150);
                                    }}
                                    className="block w-full pl-16 pr-32 py-5 rounded-2xl border-2 border-slate-200 bg-white text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-xl shadow-indigo-500/5"
                                />
                                {suggestOpen && suggestions.length > 0 && (
                                    <ul
                                        className="absolute left-0 right-0 top-full mt-2 z-20 rounded-xl border border-slate-200 bg-white py-1 shadow-xl shadow-slate-200/80 text-left overflow-hidden"
                                        role="listbox"
                                    >
                                        {suggestions.map((c) => (
                                            <li key={c.name}>
                                                <button
                                                    type="button"
                                                    className="w-full px-5 py-3 text-left text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 text-base transition-colors"
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
                                        size="lg"
                                        className="h-full px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-lg font-semibold shadow-lg shadow-indigo-200"
                                    >
                                        查一下
                                    </Button>
                                </div>
                            </div>
                            <Button
                                type="button"
                                className="h-14 px-7 rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 text-lg font-semibold hover:bg-slate-200 hover:text-slate-900 shadow-none"
                            >
                                高级搜索
                            </Button>
                        </form>

                        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
                            <span>热搜：</span>
                            <button
                                onClick={() => navigate("/details")}
                                className="hover:text-indigo-600"
                            >
                                北京智车睿控
                            </button>
                            <button
                                onClick={() =>
                                    navigate("/details?id=2549")
                                }
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

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                        {[
                            {
                                to: "/enterprise-tags",
                                label: "企业标签管理",
                                icon: Tag,
                                color: "bg-blue-50 text-blue-600",
                            },
                            {
                                to: "/industry-analysis",
                                label: "产业分析",
                                icon: TrendingUp,
                                color: "bg-indigo-50 text-indigo-600",
                            },
                            {
                                to: "",
                                label: "信用大数据",
                                icon: Database,
                                color: "bg-cyan-50 text-cyan-600",
                            },
                            {
                                to: "",
                                label: "查商标",
                                icon: Stamp,
                                color: "bg-orange-50 text-orange-600",
                            },
                            {
                                to: "",
                                label: "风险排查",
                                icon: ShieldAlert,
                                color: "bg-rose-50 text-rose-600",
                            },
                            {
                                to: "",
                                label: "招投标查询",
                                icon: ScrollText,
                                color: "bg-emerald-50 text-emerald-600",
                            },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all group text-center"
                            >
                                <div
                                    className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}
                                >
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
