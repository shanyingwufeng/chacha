import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import CompanyDetails from "./pages/CompanyDetails";
import SuzhouCompanyDetails from "./pages/SuzhouCompanyDetails";
import DetailsEntry from "./pages/DetailsEntry";
import RiskMonitoring from "./pages/RiskMonitoring";
import FinancialAnalysis from "./pages/FinancialAnalysis";
// @ts-ignore - IDE occasionally reports stale module resolution here
import IndustryAnalysis from "./pages/IndustryAnalysis";
import EnterpriseTagManagement from "./pages/EnterpriseTagManagement";

function RouteScrollTop() {
    const location = useLocation();

    React.useEffect(() => {
        window.requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, [location.pathname, location.search]);

    return null;
}

const App: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const demoUserName = "admin";

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <RouteScrollTop />
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
                <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
                    <div className="flex min-w-0 flex-1 items-center gap-6 md:gap-8">
                        <Link
                            to="/"
                            className="flex shrink-0 items-center gap-2"
                        >
                            <img
                                src={`${
                                    import.meta.env.BASE_URL
                                }header-logo.jpg`}
                                alt=""
                                className="h-6 w-6 shrink-0 rounded-lg object-contain"
                            />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                AI EASY 数据智能平台
                            </span>
                        </Link>
                        <nav className="hidden md:flex min-w-0 flex-1 flex-row-reverse flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="mr-6 text-sm font-medium text-slate-600 py-2 cursor-default select-none">
                                全景企业画像
                            </span>
                        </nav>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                        {!isHomePage && (
                            <div className="relative hidden sm:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all"
                                    placeholder="搜企业、搜品牌、搜老板..."
                                    type="text"
                                />
                            </div>
                        )}
                        <button
                            type="button"
                            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-100"
                        >
                            {demoUserName}
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/results" element={<SearchResults />} />
                    <Route path="/details" element={<DetailsEntry />} />
                    <Route
                        path="/details-suzhou"
                        element={<SuzhouCompanyDetails />}
                    />
                    <Route path="/risk" element={<RiskMonitoring />} />
                    <Route path="/financials" element={<FinancialAnalysis />} />
                    <Route
                        path="/industry-analysis"
                        element={<IndustryAnalysis />}
                    />
                    <Route path="/deep-data" element={<IndustryAnalysis />} />
                    <Route
                        path="/enterprise-tags"
                        element={<EnterpriseTagManagement />}
                    />
                </Routes>
            </main>
            {/* 
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-indigo-500 p-1 rounded">
                                    <Search className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">
                                    企查查
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed max-w-xs">
                                全球领先的企业信息查询平台，覆盖超3亿家企业信息，提供实时、权威、多维的商业数据服务。
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                产品服务
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        to="/results"
                                        className="hover:text-indigo-400"
                                    >
                                        企业查询
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/risk"
                                        className="hover:text-indigo-400"
                                    >
                                        风险监控
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/financials"
                                        className="hover:text-indigo-400"
                                    >
                                        财务报告
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/deep-data"
                                        className="hover:text-indigo-400"
                                    >
                                        产业地图
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                关于我们
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        公司简介
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        新闻中心
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        诚聘英才
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        联系我们
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                帮助中心
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        常见问题
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        服务协议
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        隐私政策
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        发票申请
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                官方微信
                            </h4>
                            <div className="bg-slate-800 w-24 h-24 rounded flex items-center justify-center border border-slate-700">
                                <span className="text-[10px] text-slate-500">
                                    二维码占位
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 text-xs text-center">
                        <p>
                            © 2026 企查查企业信息查询平台. 版权所有. 当前日期:
                            2026年05月08日
                        </p>
                    </div>
                </div>
            </footer> */}
        </div>
    );
};

export default App;
