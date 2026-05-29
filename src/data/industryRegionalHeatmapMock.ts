export const NODE_CATEGORIES = [
    "数据服务",
    "软件平台",
    "硬件设备",
    "通用技术",
    "领域技术",
] as const;

export type NodeCategory = (typeof NODE_CATEGORIES)[number];

export type ProvinceNodeRow = {
    region: string;
    values: Record<NodeCategory, number>;
};

/** 省级产业节点分布（来源参考表） */
export const PROVINCE_NODE_ROWS: ProvinceNodeRow[] = [
    { region: "北京市", values: { 数据服务: 1, 软件平台: 2, 硬件设备: 3, 通用技术: 2, 领域技术: 4 } },
    { region: "天津市", values: { 数据服务: 1, 软件平台: 2, 硬件设备: 2, 通用技术: 0, 领域技术: 0 } },
    { region: "河北省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 1, 通用技术: 0, 领域技术: 1 } },
    { region: "山西省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "内蒙古自治区", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 3 } },
    { region: "辽宁省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 1, 通用技术: 0, 领域技术: 1 } },
    { region: "吉林省", values: { 数据服务: 0, 软件平台: 1, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "黑龙江省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "上海市", values: { 数据服务: 0, 软件平台: 4, 硬件设备: 9, 通用技术: 0, 领域技术: 2 } },
    { region: "江苏省", values: { 数据服务: 0, 软件平台: 3, 硬件设备: 18, 通用技术: 0, 领域技术: 7 } },
    { region: "浙江省", values: { 数据服务: 0, 软件平台: 2, 硬件设备: 11, 通用技术: 2, 领域技术: 3 } },
    { region: "安徽省", values: { 数据服务: 1, 软件平台: 1, 硬件设备: 6, 通用技术: 1, 领域技术: 12 } },
    { region: "福建省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 3, 通用技术: 0, 领域技术: 4 } },
    { region: "江西省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 2, 通用技术: 0, 领域技术: 0 } },
    { region: "山东省", values: { 数据服务: 2, 软件平台: 2, 硬件设备: 1, 通用技术: 0, 领域技术: 5 } },
    { region: "河南省", values: { 数据服务: 0, 软件平台: 3, 硬件设备: 5, 通用技术: 0, 领域技术: 4 } },
    { region: "湖北省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 6, 通用技术: 0, 领域技术: 4 } },
    { region: "湖南省", values: { 数据服务: 0, 软件平台: 2, 硬件设备: 2, 通用技术: 0, 领域技术: 1 } },
    { region: "广东省", values: { 数据服务: 0, 软件平台: 7, 硬件设备: 46, 通用技术: 1, 领域技术: 19 } },
    { region: "广西壮族自治区", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 3, 通用技术: 0, 领域技术: 1 } },
    { region: "海南省", values: { 数据服务: 0, 软件平台: 1, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "重庆市", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 1, 通用技术: 0, 领域技术: 1 } },
    { region: "四川省", values: { 数据服务: 1, 软件平台: 2, 硬件设备: 2, 通用技术: 0, 领域技术: 1 } },
    { region: "贵州省", values: { 数据服务: 0, 软件平台: 1, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "云南省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 1, 通用技术: 0, 领域技术: 0 } },
    { region: "西藏自治区", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "陕西省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 2, 通用技术: 1, 领域技术: 0 } },
    { region: "甘肃省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 1, 通用技术: 0, 领域技术: 0 } },
    { region: "青海省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "宁夏回族自治区", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "新疆维吾尔自治区", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 1, 通用技术: 0, 领域技术: 1 } },
];

const PROVINCE_TO_MACRO_REGION: Record<string, string> = {
    北京市: "华北",
    天津市: "华北",
    河北省: "华北",
    山西省: "华北",
    内蒙古自治区: "华北",
    上海市: "华东",
    江苏省: "华东",
    浙江省: "华东",
    安徽省: "华东",
    福建省: "华东",
    江西省: "华东",
    山东省: "华东",
    广东省: "华南",
    广西壮族自治区: "华南",
    海南省: "华南",
    河南省: "华中",
    湖北省: "华中",
    湖南省: "华中",
    重庆市: "西南",
    四川省: "西南",
    贵州省: "西南",
    云南省: "西南",
    西藏自治区: "西南",
    陕西省: "西北",
    甘肃省: "西北",
    青海省: "西北",
    宁夏回族自治区: "西北",
    新疆维吾尔自治区: "西北",
    辽宁省: "东北",
    吉林省: "东北",
    黑龙江省: "东北",
};

export const MACRO_REGIONS = ["华东", "华南", "华北", "华中", "西南", "西北", "东北"] as const;

export type MacroRegionRow = {
    region: string;
    values: Record<NodeCategory, number>;
    total: number;
};

function sumCategory(
    rows: ProvinceNodeRow[],
    category: NodeCategory
): number {
    return rows.reduce((sum, row) => sum + row.values[category], 0);
}

export const REGIONAL_NODE_ROWS: MacroRegionRow[] = MACRO_REGIONS.map((region) => {
    const provinces = PROVINCE_NODE_ROWS.filter(
        (row) => PROVINCE_TO_MACRO_REGION[row.region] === region
    );
    const values = Object.fromEntries(
        NODE_CATEGORIES.map((cat) => [cat, sumCategory(provinces, cat)])
    ) as Record<NodeCategory, number>;
    const total = NODE_CATEGORIES.reduce((sum, cat) => sum + values[cat], 0);
    return { region, values, total };
});

export const NODE_CATEGORY_TOTALS = Object.fromEntries(
    NODE_CATEGORIES.map((cat) => [
        cat,
        PROVINCE_NODE_ROWS.reduce((sum, row) => sum + row.values[cat], 0),
    ])
) as Record<NodeCategory, number>;

export const NODE_GRAND_TOTAL = NODE_CATEGORIES.reduce(
    (sum, cat) => sum + NODE_CATEGORY_TOTALS[cat],
    0
);
