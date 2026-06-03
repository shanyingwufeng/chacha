import React, { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import {
    INDUSTRY_CHAIN_LAYERS,
    INDUSTRY_CHAIN_SEGMENT_COUNT,
    type ChainLayer,
} from "../data/industryChainMapMock";

const layerItemCount = (layer: ChainLayer) =>
    layer.categories.reduce((sum, c) => sum + c.items.length, 0);

export const IndustryChainMap: React.FC = () => {
    const [activeId, setActiveId] = useState<ChainLayer["id"]>("upstream");

    const activeLayer = useMemo(
        () => INDUSTRY_CHAIN_LAYERS.find((l) => l.id === activeId) ?? INDUSTRY_CHAIN_LAYERS[0],
        [activeId]
    );

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>共 {INDUSTRY_CHAIN_SEGMENT_COUNT} 个产业环节</span>
                <span className="text-slate-700">|</span>
                <span>上中下游三层结构</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-0">
                {INDUSTRY_CHAIN_LAYERS.map((layer, index) => {
                    const selected = layer.id === activeId;
                    const count = layerItemCount(layer);
                    return (
                        <React.Fragment key={layer.id}>
                            <button
                                type="button"
                                onClick={() => setActiveId(layer.id)}
                                className={`flex-1 rounded-xl border px-4 py-3 text-left transition-all ${
                                    selected
                                        ? `border-slate-300 bg-gradient-to-br ${layer.bg} shadow-sm ring-1 ${layer.ring}`
                                        : "border-slate-200 bg-card hover:border-slate-300 hover:bg-slate-50"
                                }`}
                            >
                                <div className={`text-xs font-medium ${selected ? layer.accent : "text-slate-600"}`}>
                                    {layer.label} · {layer.subtitle}
                                </div>
                                <div className="mt-1 flex items-baseline justify-between gap-2">
                                    <span className={`text-sm font-semibold ${selected ? "text-slate-900" : "text-slate-600"}`}>
                                        {layer.categories.length} 大类
                                    </span>
                                    <Badge variant="secondary" className="tabular-nums">
                                        {count} 项
                                    </Badge>
                                </div>
                            </button>
                            {index < INDUSTRY_CHAIN_LAYERS.length - 1 && (
                                <div className="hidden sm:flex items-center px-1 text-slate-700">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {activeLayer.categories.map((category) => (
                    <div
                        key={category.name}
                        className="rounded-xl border border-slate-200 bg-card p-4 space-y-3"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-semibold text-slate-900">{category.name}</h3>
                            <span className="text-xs text-slate-600 tabular-nums">{category.items.length} 项</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.items.map((item) => (
                                <span
                                    key={item}
                                    className={`inline-flex items-center rounded-lg bg-gradient-to-br ${activeLayer.bg} ring-1 ${activeLayer.ring} px-2.5 py-1 text-xs text-slate-700`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
