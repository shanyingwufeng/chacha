import React, { useState } from "react";
import {
    ArrowLeft,
    Building2,
    Calendar,
    MapPin,
    Search,
    Sparkles,
    Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
    AGE_BUCKET_OPTIONS,
    BUSINESS_SCALE_OPTIONS,
    CAPITAL_BACKGROUND_OPTIONS,
    EMPLOYEE_SCALE_OPTIONS,
    ENTERPRISE_TAG_INDUSTRIES,
    LISTING_STATUS_OPTIONS,
    PROVINCE_OPTIONS,
    REG_STATUS_OPTIONS,
    STRATEGIC_EMERGING_OPTIONS,
    TAX_CREDIT_LEVEL_OPTIONS,
    TECH_CERTS_OPTIONS,
    TENDER_ACTIVITY_OPTIONS,
} from "../constants/enterpriseFilters";

type FormState = {
    companyName: string;
    legalRep: string;
    province: string;
    industry: string;
    status: string;
    capitalMin: string;
    capitalMax: string;
    foundedFrom: string;
    foundedTo: string;
    employeeScale: string;
    techCert: string;
    businessScale: string;
    listingStatus: string;
    strategicEmerging: string;
    ageBucket: string;
    taxCreditLevel: string;
    tenderActivity: string;
    capitalBackground: string;
};

const INITIAL_FORM: FormState = {
    companyName: "",
    legalRep: "",
    province: "",
    industry: "",
    status: "",
    capitalMin: "",
    capitalMax: "",
    foundedFrom: "",
    foundedTo: "",
    employeeScale: "",
    techCert: "",
    businessScale: "",
    listingStatus: "",
    strategicEmerging: "",
    ageBucket: "",
    taxCreditLevel: "",
    tenderActivity: "",
    capitalBackground: "",
};

const selectClass =
    "flex h-10 w-full rounded-md border border-slate-200 bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500";

const AdvancedSearch: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormState>(INITIAL_FORM);

    const updateField = (key: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
        setForm(INITIAL_FORM);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/results");
    };

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8 md:py-10">
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-500 transition-colors mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    返回首页
                </Link>
                <h1 className="text-2xl font-bold text-slate-900">高级搜索</h1>
                <p className="mt-2 text-sm text-slate-500">
                    按企业名称、地区、行业、注册资本及科技认定、上市状态等企业标签维度组合筛选
                </p>
            </div>

            <form
                onSubmit={handleSearch}
                className="rounded-2xl border border-slate-200 bg-card shadow-sm overflow-hidden"
            >
                <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4">
                    <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <Search className="h-4 w-4 text-orange-500" />
                        搜索条件
                    </h2>
                </div>

                <div className="p-6 space-y-8">
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-orange-500" />
                            基本信息
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">企业名称</span>
                                <Input
                                    placeholder="支持模糊匹配"
                                    value={form.companyName}
                                    onChange={(e) =>
                                        updateField("companyName", e.target.value)
                                    }
                                />
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">法定代表人</span>
                                <Input
                                    placeholder="请输入姓名"
                                    value={form.legalRep}
                                    onChange={(e) =>
                                        updateField("legalRep", e.target.value)
                                    }
                                />
                            </label>
                            <label className="space-y-1.5 sm:col-span-2">
                                <span className="text-xs text-slate-500">登记状态</span>
                                <select
                                    className={selectClass}
                                    value={form.status}
                                    onChange={(e) =>
                                        updateField("status", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {REG_STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-orange-500" />
                            地区与行业
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">省份地区</span>
                                <select
                                    className={selectClass}
                                    value={form.province}
                                    onChange={(e) =>
                                        updateField("province", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {PROVINCE_OPTIONS.map((p) => (
                                        <option key={p} value={p}>
                                            {p}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">行业分类</span>
                                <select
                                    className={selectClass}
                                    value={form.industry}
                                    onChange={(e) =>
                                        updateField("industry", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {ENTERPRISE_TAG_INDUSTRIES.map((i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-orange-500" />
                            成立与资本
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">成立日期起</span>
                                <Input
                                    type="date"
                                    value={form.foundedFrom}
                                    onChange={(e) =>
                                        updateField("foundedFrom", e.target.value)
                                    }
                                />
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">成立日期止</span>
                                <Input
                                    type="date"
                                    value={form.foundedTo}
                                    onChange={(e) =>
                                        updateField("foundedTo", e.target.value)
                                    }
                                />
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">注册资本（万元）最低</span>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    value={form.capitalMin}
                                    onChange={(e) =>
                                        updateField("capitalMin", e.target.value)
                                    }
                                />
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">注册资本（万元）最高</span>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="不限"
                                    value={form.capitalMax}
                                    onChange={(e) =>
                                        updateField("capitalMax", e.target.value)
                                    }
                                />
                            </label>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Users className="h-4 w-4 text-orange-500" />
                            人员规模
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {EMPLOYEE_SCALE_OPTIONS.map((scale) => (
                                <button
                                    key={scale}
                                    type="button"
                                    onClick={() =>
                                        updateField(
                                            "employeeScale",
                                            form.employeeScale === scale ? "" : scale
                                        )
                                    }
                                    className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                                        form.employeeScale === scale
                                            ? "bg-orange-500/10 border-orange-500 text-orange-600"
                                            : "bg-slate-50 border-slate-200 text-slate-600 hover:border-orange-600"
                                    }`}
                                >
                                    {scale}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-orange-500" />
                            企业标签与认定
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">科技认定</span>
                                <select
                                    className={selectClass}
                                    value={form.techCert}
                                    onChange={(e) =>
                                        updateField("techCert", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {TECH_CERTS_OPTIONS.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">经营规模</span>
                                <select
                                    className={selectClass}
                                    value={form.businessScale}
                                    onChange={(e) =>
                                        updateField("businessScale", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {BUSINESS_SCALE_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">上市状态</span>
                                <select
                                    className={selectClass}
                                    value={form.listingStatus}
                                    onChange={(e) =>
                                        updateField("listingStatus", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {LISTING_STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">战略新兴产业</span>
                                <select
                                    className={selectClass}
                                    value={form.strategicEmerging}
                                    onChange={(e) =>
                                        updateField(
                                            "strategicEmerging",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">不限</option>
                                    {STRATEGIC_EMERGING_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">成立年限</span>
                                <select
                                    className={selectClass}
                                    value={form.ageBucket}
                                    onChange={(e) =>
                                        updateField("ageBucket", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {AGE_BUCKET_OPTIONS.map((a) => (
                                        <option key={a} value={a}>
                                            {a}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">纳税信用等级</span>
                                <select
                                    className={selectClass}
                                    value={form.taxCreditLevel}
                                    onChange={(e) =>
                                        updateField("taxCreditLevel", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {TAX_CREDIT_LEVEL_OPTIONS.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">招投标活跃档</span>
                                <select
                                    className={selectClass}
                                    value={form.tenderActivity}
                                    onChange={(e) =>
                                        updateField("tenderActivity", e.target.value)
                                    }
                                >
                                    <option value="">不限</option>
                                    {TENDER_ACTIVITY_OPTIONS.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs text-slate-500">资本背景</span>
                                <select
                                    className={selectClass}
                                    value={form.capitalBackground}
                                    onChange={(e) =>
                                        updateField(
                                            "capitalBackground",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">不限</option>
                                    {CAPITAL_BACKGROUND_OPTIONS.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </section>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 py-5 border-t border-slate-100 bg-slate-50/50">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="sm:min-w-[100px]"
                    >
                        重置
                    </Button>
                    <Button
                        type="submit"
                        className="sm:min-w-[120px] bg-orange-500 hover:bg-orange-600 gap-2"
                    >
                        <Search className="h-4 w-4" />
                        开始搜索
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdvancedSearch;
