export type ChainCategory = {
    name: string;
    items: string[];
};

export type ChainLayer = {
    id: "upstream" | "midstream" | "downstream";
    label: string;
    subtitle: string;
    accent: string;
    ring: string;
    bg: string;
    categories: ChainCategory[];
};

export const INDUSTRY_CHAIN_LAYERS: ChainLayer[] = [
    {
        id: "upstream",
        label: "上游",
        subtitle: "基础层",
        accent: "text-sky-700",
        ring: "ring-sky-200",
        bg: "from-sky-500/10 to-sky-500/5",
        categories: [
            {
                name: "数据服务",
                items: ["基础数据服务", "大数据服务"],
            },
            {
                name: "软件平台",
                items: ["系统软件", "AI框架"],
            },
            {
                name: "硬件设备",
                items: [
                    "计算设备",
                    "算力中心",
                    "AI加速卡",
                    "算力芯片",
                    "触控芯片",
                    "摄像头模组",
                    "电子传感器",
                    "工业传感器",
                    "智能传感器",
                ],
            },
        ],
    },
    {
        id: "midstream",
        label: "中游",
        subtitle: "技术层",
        accent: "text-indigo-700",
        ring: "ring-indigo-200",
        bg: "from-indigo-500/10 to-indigo-500/5",
        categories: [
            {
                name: "通用技术",
                items: ["机器学习", "知识图谱", "大模型", "类脑算法"],
            },
            {
                name: "领域技术",
                items: ["智能语音", "计算机视觉", "自然语言处理", "生物特征识别"],
            },
        ],
    },
    {
        id: "downstream",
        label: "下游",
        subtitle: "应用层",
        accent: "text-emerald-700",
        ring: "ring-emerald-200",
        bg: "from-emerald-500/10 to-emerald-500/5",
        categories: [
            {
                name: "智能产品",
                items: [
                    "服务机器人",
                    "工业机器人",
                    "机械臂及机器人",
                    "智能穿戴设备",
                    "自动化生产设备",
                    "医疗影像诊断设备",
                    "机器视觉检测设备",
                    "智能终端设备",
                    "安防视频监控设备",
                    "数字人",
                    "智能运载工具",
                    "汽车辅助驾驶系统",
                    "商业智能分析系统",
                    "金融科技服务",
                ],
            },
            {
                name: "智慧行业",
                items: [
                    "智慧城市",
                    "智慧农业",
                    "智慧医疗",
                    "智慧办公",
                    "智慧制造",
                    "智慧交通",
                    "智慧金融",
                    "智慧教育",
                    "智慧物流",
                    "智慧家居",
                    "智慧能源",
                ],
            },
        ],
    },
];

export const INDUSTRY_CHAIN_SEGMENT_COUNT = INDUSTRY_CHAIN_LAYERS.reduce(
    (sum, layer) => sum + layer.categories.reduce((s, c) => s + c.items.length, 0),
    0
);
