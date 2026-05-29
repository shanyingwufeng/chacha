export type DistributionItem = {
    name: string;
    value: number;
};

/** 企业成立年限分布 */
export const ESTABLISHMENT_YEARS_DISTRIBUTION: DistributionItem[] = [
    { name: "10年以上", value: 104 },
    { name: "5-10年", value: 84 },
    { name: "3-5年内", value: 15 },
    { name: "1-3年内", value: 9 },
    { name: "1年内", value: 0 },
    { name: "半年内", value: 0 },
    { name: "3个月内", value: 0 },
];

/** 知识产权分布 */
export const INTELLECTUAL_PROPERTY_DISTRIBUTION: DistributionItem[] = [
    { name: "发明专利", value: 2295 },
    { name: "实用新型", value: 4207 },
    { name: "外观设计", value: 1056 },
];

export const INTELLECTUAL_PROPERTY_TOTAL = 7558;
