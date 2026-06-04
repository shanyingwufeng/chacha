export type ChainEnterprise = {
    companyId: string;
    companyName: string;
    creditNo: string;
    legalPerson: string;
    companyStatus: string;
    location: string;
    industryL4Name: string;
    capital: number;
    establishDate: string;
    majorEntLevel: string;
    sciTechLevel: string;
    sciTechScore: number;
    techCertificationList: string[];
    fieldL1Name: string;
    companyScale: string;
    finStageStr: string;
    listedAll: string;
    riskAccessLevel: string;
    logoUrl: string;
};

export type ChainEnterpriseListResponse = {
    total: number;
    rows: ChainEnterprise[];
    code: number;
    msg: string;
};

const IT_INDUSTRY = "信息传输、软件和信息技术服务业";
const SCIENCE_INDUSTRY = "科学研究和技术服务业";
const MANUFACTURING = "制造业";

export type ChainRowInput = {
    companyName: string;
    legalPerson: string;
    location: string;
    establishDate: string;
    capital: number;
    industryL4Name: string;
};

export function makeChainEnterprise(
    index: number,
    input: ChainRowInput,
    idPrefix = "chain"
): ChainEnterprise {
    return {
        companyId: `${idPrefix}-${String(index).padStart(4, "0")}`,
        companyName: input.companyName,
        creditNo: `91310000MA${String(index).padStart(10, "0")}`,
        legalPerson: input.legalPerson,
        companyStatus: "在业",
        location: input.location,
        industryL4Name: input.industryL4Name,
        capital: input.capital,
        establishDate: input.establishDate,
        majorEntLevel: "",
        sciTechLevel: "",
        sciTechScore: 0,
        techCertificationList: [],
        fieldL1Name: "",
        companyScale: "",
        finStageStr: "",
        listedAll: "",
        riskAccessLevel: "",
        logoUrl: "",
    };
}

/** 链上企业（参考科企查列表真实企业名称） */
const CHAIN_ROWS: ChainRowInput[] = [
    {
        companyName: "合肥霍因科技有限公司",
        legalPerson: "吕颖轩",
        location: "安徽省合肥市蜀山区",
        establishDate: "2021-07-02",
        capital: 1360.03,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "中国电信股份有限公司商丘分公司",
        legalPerson: "郭栋",
        location: "河南省商丘市睢阳区",
        establishDate: "2008-09-01",
        capital: 0,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "四川迪恩斯达类脑智能技术有限公司",
        legalPerson: "肖红",
        location: "四川省成都市金牛区",
        establishDate: "2021-10-18",
        capital: 1000,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "成都鸣火互动科技有限公司",
        legalPerson: "钟朝霞",
        location: "四川省成都市武侯区",
        establishDate: "2022-10-10",
        capital: 50,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "苏州宝迪海斯医疗器械技术开发有限公司",
        legalPerson: "徐志锋",
        location: "江苏省苏州市虎丘区",
        establishDate: "2015-03-10",
        capital: 1000,
        industryL4Name: MANUFACTURING,
    },
    {
        companyName: "敏讯通通信技术（武汉）有限公司",
        legalPerson: "郑兆祥",
        location: "湖北省武汉市洪山区",
        establishDate: "2015-08-11",
        capital: 100,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "翼方健数（北京）信息科技有限公司",
        legalPerson: "檀苏琴",
        location: "北京市北京市朝阳区",
        establishDate: "2020-11-18",
        capital: 3000,
        industryL4Name: SCIENCE_INDUSTRY,
    },
    {
        companyName: "山西天渊科技有限公司",
        legalPerson: "郗雁斌",
        location: "山西省太原市小店区",
        establishDate: "2018-11-16",
        capital: 500,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "天津市津荣医疗科技有限公司",
        legalPerson: "孙博炜",
        location: "天津市天津市滨海新区",
        establishDate: "2022-06-30",
        capital: 2000,
        industryL4Name: SCIENCE_INDUSTRY,
    },
    {
        companyName: "湖北风源信息技术有限公司",
        legalPerson: "廖风雷",
        location: "湖北省恩施土家族苗族自治州",
        establishDate: "2019-09-16",
        capital: 190,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "四川电消安智能科技有限公司",
        legalPerson: "高杨",
        location: "四川省成都市郫都区",
        establishDate: "2015-12-09",
        capital: 500,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "合肥凯盟新材料科技有限公司",
        legalPerson: "任勇",
        location: "安徽省合肥市蜀山区",
        establishDate: "2025-04-09",
        capital: 200,
        industryL4Name: SCIENCE_INDUSTRY,
    },
    {
        companyName: "天津中汽技研检测技术有限公司",
        legalPerson: "左成",
        location: "天津市天津市津南区",
        establishDate: "2019-02-26",
        capital: 1000,
        industryL4Name: SCIENCE_INDUSTRY,
    },
    {
        companyName: "四川龙控科技有限公司",
        legalPerson: "王华",
        location: "四川省成都市武侯区",
        establishDate: "2013-02-04",
        capital: 200,
        industryL4Name: SCIENCE_INDUSTRY,
    },
    {
        companyName: "杭州聚英联合科技有限公司",
        legalPerson: "詹坤龙",
        location: "浙江省杭州市西湖区",
        establishDate: "2020-03-30",
        capital: 200,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "中公高科（霸州）养护科技产业有限公司",
        legalPerson: "扈书光",
        location: "河北省廊坊市霸州市",
        establishDate: "2015-09-16",
        capital: 4000,
        industryL4Name: SCIENCE_INDUSTRY,
    },
    {
        companyName: "海南睿视智能技术开发有限公司",
        legalPerson: "唐廷福",
        location: "海南省海口市美兰区",
        establishDate: "2010-07-02",
        capital: 1000,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "兰州成佳信息科技有限公司",
        legalPerson: "白敏",
        location: "甘肃省兰州市七里河区",
        establishDate: "2016-01-18",
        capital: 200,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "上海量昌信息科技有限公司",
        legalPerson: "辜熙康",
        location: "上海市上海市闵行区",
        establishDate: "2006-06-30",
        capital: 300,
        industryL4Name: IT_INDUSTRY,
    },
    {
        companyName: "北京明略软件系统有限公司",
        legalPerson: "宫毅军",
        location: "北京市北京市海淀区",
        establishDate: "2014-04-03",
        capital: 1491.68,
        industryL4Name: IT_INDUSTRY,
    },
];

const chainRows: ChainEnterprise[] = CHAIN_ROWS.map((row, i) =>
    makeChainEnterprise(i + 1, row)
);

export const CHAIN_ENTERPRISES_MOCK: ChainEnterpriseListResponse = {
    total: chainRows.length,
    code: 200,
    msg: "查询成功",
    rows: chainRows,
};
