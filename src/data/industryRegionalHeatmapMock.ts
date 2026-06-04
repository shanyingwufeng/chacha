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
    { region: "北京市", values: { 数据服务: 4528, 软件平台: 6431, 硬件设备: 4581, 通用技术: 3333, 领域技术: 5132 } },
    { region: "天津市", values: { 数据服务: 508, 软件平台: 1151, 硬件设备: 1174, 通用技术: 392, 领域技术: 813 } },
    { region: "河北省", values: { 数据服务: 553, 软件平台: 1597, 硬件设备: 1070, 通用技术: 229, 领域技术: 873 } },
    { region: "山西省", values: { 数据服务: 311, 软件平台: 927, 硬件设备: 452, 通用技术: 159, 领域技术: 533 } },
    { region: "内蒙古自治区", values: { 数据服务: 633, 软件平台: 1760, 硬件设备: 702, 通用技术: 368, 领域技术: 965 } },
    { region: "辽宁省", values: { 数据服务: 554, 软件平台: 2079, 硬件设备: 1215, 通用技术: 391, 领域技术: 903 } },
    { region: "吉林省", values: { 数据服务: 171, 软件平台: 537, 硬件设备: 245, 通用技术: 87, 领域技术: 268 } },
    { region: "黑龙江省", values: { 数据服务: 260, 软件平台: 1012, 硬件设备: 379, 通用技术: 132, 领域技术: 497 } },
    { region: "上海市", values: { 数据服务: 2768, 软件平台: 4661, 硬件设备: 4447, 通用技术: 2313, 领域技术: 3603 } },
    { region: "江苏省", values: { 数据服务: 2581, 软件平台: 6265, 硬件设备: 8276, 通用技术: 2502, 领域技术: 5365 } },
    { region: "浙江省", values: { 数据服务: 2339, 软件平台: 4654, 硬件设备: 4963, 通用技术: 2384, 领域技术: 3970 } },
    { region: "安徽省", values: { 数据服务: 2149, 软件平台: 5944, 硬件设备: 5079, 通用技术: 2044, 领域技术: 4596 } },
    { region: "福建省", values: { 数据服务: 1020, 软件平台: 2314, 硬件设备: 1541, 通用技术: 840, 领域技术: 1565 } },
    { region: "江西省", values: { 数据服务: 532, 软件平台: 1456, 硬件设备: 979, 通用技术: 351, 领域技术: 1120 } },
    { region: "山东省", values: { 数据服务: 1495, 软件平台: 2926, 硬件设备: 2557, 通用技术: 1084, 领域技术: 2056 } },
    { region: "河南省", values: { 数据服务: 714, 软件平台: 1830, 硬件设备: 961, 通用技术: 402, 领域技术: 923 } },
    { region: "湖北省", values: { 数据服务: 989, 软件平台: 1999, 硬件设备: 1668, 通用技术: 692, 领域技术: 1510 } },
    { region: "湖南省", values: { 数据服务: 704, 软件平台: 1737, 硬件设备: 1106, 通用技术: 550, 领域技术: 1280 } },
    { region: "广东省", values: { 数据服务: 4373, 软件平台: 10021, 硬件设备: 11576, 通用技术: 4149, 领域技术: 9709 } },
    { region: "广西壮族自治区", values: { 数据服务: 368, 软件平台: 932, 硬件设备: 464, 通用技术: 257, 领域技术: 718 } },
    { region: "海南省", values: { 数据服务: 332, 软件平台: 686, 硬件设备: 184, 通用技术: 246, 领域技术: 348 } },
    { region: "重庆市", values: { 数据服务: 645, 软件平台: 1551, 硬件设备: 997, 通用技术: 478, 领域技术: 1010 } },
    { region: "四川省", values: { 数据服务: 1481, 软件平台: 3697, 硬件设备: 1899, 通用技术: 1125, 领域技术: 1864 } },
    { region: "贵州省", values: { 数据服务: 734, 软件平台: 1178, 硬件设备: 469, 通用技术: 284, 领域技术: 596 } },
    { region: "云南省", values: { 数据服务: 318, 软件平台: 1046, 硬件设备: 300, 通用技术: 140, 领域技术: 483 } },
    { region: "西藏自治区", values: { 数据服务: 50, 软件平台: 95, 硬件设备: 27, 通用技术: 17, 领域技术: 63 } },
    { region: "陕西省", values: { 数据服务: 779, 软件平台: 1376, 硬件设备: 1140, 通用技术: 504, 领域技术: 1059 } },
    { region: "甘肃省", values: { 数据服务: 208, 软件平台: 497, 硬件设备: 195, 通用技术: 101, 领域技术: 415 } },
    { region: "青海省", values: { 数据服务: 54, 软件平台: 137, 硬件设备: 43, 通用技术: 30, 领域技术: 82 } },
    { region: "宁夏回族自治区", values: { 数据服务: 98, 软件平台: 207, 硬件设备: 120, 通用技术: 51, 领域技术: 143 } },
    { region: "新疆维吾尔自治区", values: { 数据服务: 284, 软件平台: 636, 硬件设备: 232, 通用技术: 125, 领域技术: 390 } },
    { region: "台湾省", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "香港特别行政区", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
    { region: "澳门特别行政区", values: { 数据服务: 0, 软件平台: 0, 硬件设备: 0, 通用技术: 0, 领域技术: 0 } },
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
