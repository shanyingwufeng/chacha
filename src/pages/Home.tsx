import React from "react";
import {
    Search,
    Building2,
    UserCircle,
    Briefcase,
    FileText,
    Globe,
    ArrowRight,
    ShieldCheck,
    Zap,
    Database,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/results");
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        查企业，上
                        <span className="text-indigo-600">企查查</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                        汇集全球 3 亿+ 企业实时数据，为您的商业决策保驾护航
                    </p>

                    <div className="max-w-3xl mx-auto mb-12">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-3"
                        >
                            <div className="relative group flex-1">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Search className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="请输入企业名称"
                                    className="block w-full pl-16 pr-32 py-5 rounded-2xl border-2 border-slate-200 bg-white text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-xl shadow-indigo-500/5"
                                />
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
                                onClick={() => navigate("/details?id=1001")}
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

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Building2,
                                label: "查企业",
                                color: "bg-blue-50 text-blue-600",
                            },
                            {
                                icon: UserCircle,
                                label: "查老板",
                                color: "bg-orange-50 text-orange-600",
                            },
                            {
                                icon: ShieldCheck,
                                label: "查风险",
                                color: "bg-rose-50 text-rose-600",
                            },
                            {
                                icon: Briefcase,
                                label: "查招聘",
                                color: "bg-emerald-50 text-emerald-600",
                            },
                            {
                                icon: FileText,
                                label: "查年报",
                                color: "bg-indigo-50 text-indigo-600",
                            },
                            {
                                icon: Globe,
                                label: "查海外",
                                color: "bg-cyan-50 text-cyan-600",
                            },
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                            >
                                <div
                                    className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}
                                >
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            为什么选择企查查？
                        </h2>
                        <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-8 border-none bg-slate-50 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <Database className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                权威数据源
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                整合 20
                                余类政务数据源，同步市场监管部门最新公示，确保每一条数据都真实、准确、权威。
                            </p>
                        </Card>
                        <Card className="p-8 border-none bg-slate-50 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                多维穿透分析
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                基于股权穿透、控制人识别等核心技术，助您看透复杂的商业网络与资本关系。
                            </p>
                        </Card>
                        <Card className="p-8 border-none bg-slate-50 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                智能风险预警
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                实时监控目标企业动态，覆盖司法风险、经营异常、行政处罚等全方位预警信息。
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Recent Records Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold text-slate-900">
                            近期热门查询
                        </h2>
                        <Link
                            to="/results"
                            className="text-indigo-600 flex items-center gap-1 font-medium hover:underline"
                        >
                            查看更多 <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "北京智车睿控信息技术有限公司",
                                city: "北京市 海淀区",
                                status: "存续",
                                rep: "李志强",
                                capital: "1,000万",
                            },
                            {
                                name: "阿里巴巴(中国)网络技术有限公司",
                                city: "浙江省 杭州市",
                                status: "存续",
                                rep: "张勇",
                                capital: "1,000,000万",
                            },
                            {
                                name: "深圳市腾讯计算机系统有限公司",
                                city: "广东省 深圳市",
                                status: "存续",
                                rep: "马化腾",
                                capital: "6,500万",
                            },
                            {
                                name: "小米通讯技术有限公司",
                                city: "北京市",
                                status: "存续",
                                rep: "屈恒",
                                capital: "32,000万美元",
                            },
                        ].map((company, idx) => (
                            <Card
                                key={idx}
                                className="p-5 hover:border-indigo-300 transition-colors cursor-pointer group"
                                onClick={() => navigate("/details")}
                            >
                                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-1">
                                    {company.name}
                                </h4>
                                <div className="space-y-2 text-sm text-slate-500">
                                    <div className="flex justify-between">
                                        <span>法定代表人：</span>
                                        <span className="text-slate-900">
                                            {company.rep}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>注册资本：</span>
                                        <span className="text-slate-900">
                                            {company.capital}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                                        <span>{company.city}</span>
                                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded border border-emerald-100">
                                            {company.status}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-indigo-600 overflow-hidden relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        开启高效商业查询之旅
                    </h2>
                    <p className="text-indigo-100 mb-10 max-w-xl mx-auto">
                        立即注册企查查账号，解锁更多高级功能，包括批量查询、深度报告导出及实时监控服务。
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            className="bg-white text-indigo-600 hover:bg-slate-100 px-10 rounded-xl font-bold"
                        >
                            免费注册
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-white border-white hover:bg-indigo-700 px-10 rounded-xl font-bold"
                        >
                            咨询客服
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
