import React, { useMemo, useState } from 'react';
import { Tags, Sparkles, RotateCcw, Building2, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

type CompanyRecord = {
  id: string;
  name: string;
  industry: string;
  businessScale: string;
  techCert: string[];
  province: string;
  nationalIndustry: string;
  strategicEmerging: string;
  foundedYear: number;
  regStatus: string;
  listingStatus: string;
  registrationType: string;
  taxCreditLevel: string;
  customsCredit: string;
  tenderActivity: string;
  capitalBackground: string;
  regCapitalWan: number;
  paidInCapitalWan: number;
  employeeScale: string;
  phone: string;
  email: string;
  website: string;
};

const CURRENT_YEAR = 2026;

const MOCK_COMPANIES: CompanyRecord[] = [
  {
    id: '1',
    name: '北京智车睿控信息技术有限公司',
    industry: '软件和信息技术服务业',
    businessScale: '中型',
    techCert: ['高新技术企业', '科技型中小企业'],
    province: '北京市',
    nationalIndustry: 'I6510 软件开发',
    strategicEmerging: '新一代信息技术',
    foundedYear: 2021,
    regStatus: '存续',
    listingStatus: '未上市',
    registrationType: '有限责任公司',
    taxCreditLevel: 'A级',
    customsCredit: '高级认证企业',
    tenderActivity: '高',
    capitalBackground: '民营主导',
    regCapitalWan: 1000,
    paidInCapitalWan: 380,
    employeeScale: '100-499人',
    phone: '010-82345678',
    email: 'contact@zhiche.com',
    website: 'https://www.zhiche.example',
  },
  {
    id: '2',
    name: '杭州云链精密制造有限公司',
    industry: '制造业',
    businessScale: '大型',
    techCert: ['高新技术企业', '专精特新小巨人'],
    province: '浙江省',
    nationalIndustry: 'C3670 汽车零部件及配件制造',
    strategicEmerging: '高端装备制造',
    foundedYear: 2012,
    regStatus: '存续',
    listingStatus: '已上市',
    registrationType: '股份有限公司',
    taxCreditLevel: 'A级',
    customsCredit: '一般信用企业',
    tenderActivity: '高',
    capitalBackground: '国有控股或参股',
    regCapitalWan: 8000,
    paidInCapitalWan: 8000,
    employeeScale: '500-999人',
    phone: '0571-88881234',
    email: 'bd@yunlian-mfg.example',
    website: 'https://www.yunlian.example',
  },
  {
    id: '3',
    name: '苏州芯源半导体材料有限公司',
    industry: '制造业',
    businessScale: '中型',
    techCert: ['高新技术企业'],
    province: '江苏省',
    nationalIndustry: 'C3985 电子专用材料制造',
    strategicEmerging: '新材料',
    foundedYear: 2018,
    regStatus: '存续',
    listingStatus: '未上市',
    registrationType: '有限责任公司',
    taxCreditLevel: 'B级',
    customsCredit: '暂无公开等级',
    tenderActivity: '中',
    capitalBackground: '民营主导',
    regCapitalWan: 2500,
    paidInCapitalWan: 900,
    employeeScale: '100-499人',
    phone: '',
    email: 'hello@xinyuan-semi.example',
    website: '',
  },
  {
    id: '4',
    name: '上海澜图数据服务有限公司',
    industry: '互联网和相关服务',
    businessScale: '小型',
    techCert: [],
    province: '上海市',
    nationalIndustry: 'I6490 其他互联网服务',
    strategicEmerging: '数字创意',
    foundedYear: 2024,
    regStatus: '存续',
    listingStatus: '未上市',
    registrationType: '有限责任公司',
    taxCreditLevel: 'M级',
    customsCredit: '暂无公开等级',
    tenderActivity: '低',
    capitalBackground: '民营主导',
    regCapitalWan: 200,
    paidInCapitalWan: 50,
    employeeScale: '1-49人',
    phone: '021-66000000',
    email: '',
    website: 'https://lantu-data.example',
  },
  {
    id: '5',
    name: '广州绿能电池科技有限公司',
    industry: '电气机械和器材制造业',
    businessScale: '大型',
    techCert: ['高新技术企业', '省级企业技术中心'],
    province: '广东省',
    nationalIndustry: 'C3841 锂离子电池制造',
    strategicEmerging: '新能源',
    foundedYear: 2015,
    regStatus: '存续',
    listingStatus: '新三板',
    registrationType: '股份有限公司',
    taxCreditLevel: 'A级',
    customsCredit: '高级认证企业',
    tenderActivity: '中',
    capitalBackground: '港澳台及外商参股',
    regCapitalWan: 12000,
    paidInCapitalWan: 4500,
    employeeScale: '1000人以上',
    phone: '020-33334444',
    email: 'pr@lvneng.example',
    website: 'https://www.lvneng.example',
  },
  {
    id: '6',
    name: '成都慧农智慧农业有限公司',
    industry: '农、林、牧、渔专业及辅助性活动',
    businessScale: '小型',
    techCert: ['科技型中小企业'],
    province: '四川省',
    nationalIndustry: 'A0511 种子种苗培育活动',
    strategicEmerging: '生物产业',
    foundedYear: 2019,
    regStatus: '存续',
    listingStatus: '未上市',
    registrationType: '有限责任公司',
    taxCreditLevel: 'B级',
    customsCredit: '一般信用企业',
    tenderActivity: '中',
    capitalBackground: '民营主导',
    regCapitalWan: 500,
    paidInCapitalWan: 120,
    employeeScale: '50-99人',
    phone: '028-61234567',
    email: 'service@hui-nong.example',
    website: '',
  },
  {
    id: '7',
    name: '武汉市博验医学检验实验室有限公司',
    industry: '卫生和社会工作',
    businessScale: '中型',
    techCert: ['高新技术企业', '科技型中小企业'],
    province: '湖北省',
    nationalIndustry: 'Q8499 其他卫生活动',
    strategicEmerging: '生物产业',
    foundedYear: 2017,
    regStatus: '存续',
    listingStatus: '未上市',
    registrationType: '有限责任公司',
    taxCreditLevel: '未纳入近年公示',
    customsCredit: '暂无公开等级',
    tenderActivity: '低',
    capitalBackground: '民营主导',
    regCapitalWan: 3200,
    paidInCapitalWan: 2100,
    employeeScale: '100-499人',
    phone: '',
    email: '',
    website: '',
  },
  {
    id: '8',
    name: '天津远航物流控股有限公司',
    industry: '交通运输、仓储和邮政业',
    businessScale: '大型',
    techCert: [],
    province: '天津市',
    nationalIndustry: 'G5821 货物运输代理',
    strategicEmerging: '相关服务业',
    foundedYear: 2008,
    regStatus: '存续',
    listingStatus: '已上市',
    registrationType: '股份有限公司',
    taxCreditLevel: 'A级',
    customsCredit: '高级认证企业',
    tenderActivity: '高',
    capitalBackground: '国有控股或参股',
    regCapitalWan: 25000,
    paidInCapitalWan: 10000,
    employeeScale: '1000人以上',
    phone: '022-23338888',
    email: 'group@yuanhang-log.example',
    website: 'https://yuanhang.example',
  },
  {
    id: '9',
    name: '西安古盾网络安全有限公司',
    industry: '软件和信息技术服务业',
    businessScale: '中型',
    techCert: ['高新技术企业', '创新型中小企业'],
    province: '陕西省',
    nationalIndustry: 'I6520 信息系统集成服务',
    strategicEmerging: '新一代信息技术',
    foundedYear: 2020,
    regStatus: '在业',
    listingStatus: '未上市',
    registrationType: '有限责任公司',
    taxCreditLevel: 'B级',
    customsCredit: '一般信用企业',
    tenderActivity: '中',
    capitalBackground: '民营主导',
    regCapitalWan: 1600,
    paidInCapitalWan: 400,
    employeeScale: '100-499人',
    phone: '029-88990011',
    email: 'security@gudun.example',
    website: '',
  },
  {
    id: '10',
    name: '福建海盛新材料股份有限公司',
    industry: '化学原料和化学制品制造业',
    businessScale: '大型',
    techCert: ['高新技术企业', '专精特新中小企业'],
    province: '福建省',
    nationalIndustry: 'C2659 其他合成材料制造',
    strategicEmerging: '新材料',
    foundedYear: 2011,
    regStatus: '存续',
    listingStatus: '已上市',
    registrationType: '股份有限公司',
    taxCreditLevel: 'A级',
    customsCredit: '高级认证企业',
    tenderActivity: '高',
    capitalBackground: '港澳台及外商参股',
    regCapitalWan: 8800,
    paidInCapitalWan: 8200,
    employeeScale: '500-999人',
    phone: '',
    email: 'ir@haisheng-mat.example',
    website: 'https://haisheng-mat.example',
  },
];

const INDUSTRIES = [
  '软件和信息技术服务业',
  '制造业',
  '互联网和相关服务',
  '电气机械和器材制造业',
  '农、林、牧、渔专业及辅助性活动',
  '卫生和社会工作',
  '交通运输、仓储和邮政业',
  '化学原料和化学制品制造业',
] as const;

const TECH_CERTS_OPTIONS = [
  '高新技术企业',
  '科技型中小企业',
  '专精特新小巨人',
  '专精特新中小企业',
  '省级企业技术中心',
  '创新型中小企业',
];

const INITIAL_FILTERS = {
  industry: '',
  businessScale: '',
  techCert: '',
  province: '',
  nationalIndustry: '',
  strategicEmerging: '',
  ageBucket: '',
  regStatus: '',
  listingStatus: '',
  registrationType: '',
  taxCreditLevel: '',
  customsCredit: '',
  tenderActivity: '',
  capitalBackground: '',
  regCapitalMin: '',
  paidInMin: '',
  employeeScale: '',
  phoneKeyword: '',
  emailKeyword: '',
  websiteKeyword: '',
};

function companyAgeYears(c: CompanyRecord): number {
  return Math.max(0, CURRENT_YEAR - c.foundedYear);
}

function ageBucketOf(c: CompanyRecord): string {
  const y = companyAgeYears(c);
  if (y <= 2) return '2年以内';
  if (y <= 5) return '2-5年';
  if (y <= 10) return '5-10年';
  return '10年以上';
}

function capitalBucket(wan: number): string {
  if (wan < 100) return '100万以下';
  if (wan < 500) return '100-500万';
  if (wan < 1000) return '500-1000万';
  return '1000万及以上';
}

function presence(v: string): 'has' | 'none' {
  return v.trim().length > 0 ? 'has' : 'none';
}

function companyMatches(
  c: CompanyRecord,
  f: typeof INITIAL_FILTERS
): boolean {
  if (f.industry && c.industry !== f.industry) return false;
  if (f.businessScale && c.businessScale !== f.businessScale) return false;
  if (f.techCert && !c.techCert.includes(f.techCert)) return false;
  if (f.province && c.province !== f.province) return false;
  if (f.nationalIndustry && c.nationalIndustry !== f.nationalIndustry) return false;
  if (f.strategicEmerging && c.strategicEmerging !== f.strategicEmerging) return false;
  if (f.ageBucket && ageBucketOf(c) !== f.ageBucket) return false;
  if (f.regStatus && c.regStatus !== f.regStatus) return false;
  if (f.listingStatus && c.listingStatus !== f.listingStatus) return false;
  if (f.registrationType && c.registrationType !== f.registrationType) return false;
  if (f.taxCreditLevel && c.taxCreditLevel !== f.taxCreditLevel) return false;
  if (f.customsCredit && c.customsCredit !== f.customsCredit) return false;
  if (f.tenderActivity && c.tenderActivity !== f.tenderActivity) return false;
  if (f.capitalBackground && c.capitalBackground !== f.capitalBackground) return false;
  if (f.regCapitalMin && c.regCapitalWan < Number(f.regCapitalMin)) return false;
  if (f.paidInMin && c.paidInCapitalWan < Number(f.paidInMin)) return false;
  if (f.employeeScale && c.employeeScale !== f.employeeScale) return false;
  if (f.phoneKeyword && !c.phone.includes(f.phoneKeyword)) return false;
  if (f.emailKeyword && !c.email.includes(f.emailKeyword)) return false;
  if (f.websiteKeyword && !c.website.includes(f.websiteKeyword)) return false;
  return true;
}

function labelForFilter(f: typeof INITIAL_FILTERS): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  if (f.industry) out.push({ key: 'industry', label: `行业：${f.industry}` });
  if (f.businessScale) out.push({ key: 'businessScale', label: `规模：${f.businessScale}` });
  if (f.techCert) out.push({ key: 'techCert', label: `科技认定：${f.techCert}` });
  if (f.province) out.push({ key: 'province', label: `省份地区：${f.province}` });
  if (f.nationalIndustry) out.push({ key: 'nationalIndustry', label: `国标行业：${f.nationalIndustry}` });
  if (f.strategicEmerging) out.push({ key: 'strategicEmerging', label: `战略新兴产业：${f.strategicEmerging}` });
  if (f.ageBucket) out.push({ key: 'ageBucket', label: `成立年限：${f.ageBucket}` });
  if (f.regStatus) out.push({ key: 'regStatus', label: `登记状态：${f.regStatus}` });
  if (f.listingStatus) out.push({ key: 'listingStatus', label: `上市状态：${f.listingStatus}` });
  if (f.registrationType) out.push({ key: 'registrationType', label: `登记类型：${f.registrationType}` });
  if (f.taxCreditLevel) out.push({ key: 'taxCreditLevel', label: `纳税信用等级：${f.taxCreditLevel}` });
  if (f.customsCredit) out.push({ key: 'customsCredit', label: `海关企业信用：${f.customsCredit}` });
  if (f.tenderActivity) out.push({ key: 'tenderActivity', label: `招投标活跃档：${f.tenderActivity}` });
  if (f.capitalBackground) out.push({ key: 'capitalBackground', label: `资本背景：${f.capitalBackground}` });
  if (f.regCapitalMin) out.push({ key: 'regCapitalMin', label: `注册资本≥${f.regCapitalMin}万` });
  if (f.paidInMin) out.push({ key: 'paidInMin', label: `实缴资本≥${f.paidInMin}万` });
  if (f.employeeScale) out.push({ key: 'employeeScale', label: `企业规模（人员）：${f.employeeScale}` });
  if (f.phoneKeyword) out.push({ key: 'phoneKeyword', label: `联系电话：${f.phoneKeyword}` });
  if (f.emailKeyword) out.push({ key: 'emailKeyword', label: `电子邮件：${f.emailKeyword}` });
  if (f.websiteKeyword) out.push({ key: 'websiteKeyword', label: `公司官网：${f.websiteKeyword}` });
  return out;
}

function companyDisplayTags(c: CompanyRecord): string[] {
  const tags: string[] = [
    c.industry,
    `经营规模·${c.businessScale}`,
    `人员规模·${c.employeeScale}`,
    c.province,
    c.nationalIndustry.split(' ')[0],
    c.strategicEmerging,
    `成立${companyAgeYears(c)}年`,
    c.regStatus,
    `注册资本·${capitalBucket(c.regCapitalWan)}`,
    `实缴·${capitalBucket(c.paidInCapitalWan)}`,
  ];
  tags.push(...c.techCert);
  if (c.phone) tags.push('电话已登记');
  if (c.email) tags.push('邮箱已登记');
  if (c.website) tags.push('官网已登记');
  return tags;
}

const selectClass =
  'w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500';

const EnterpriseTagManagement: React.FC = () => {
  const [draft, setDraft] = useState(INITIAL_FILTERS);
  const [applied, setApplied] = useState(INITIAL_FILTERS);

  const filtered = useMemo(
    () => MOCK_COMPANIES.filter((c) => companyMatches(c, applied)),
    [applied]
  );

  const ruleTags = useMemo(() => labelForFilter(applied), [applied]);

  const apply = () => setApplied({ ...draft });
  const reset = () => {
    setDraft(INITIAL_FILTERS);
    setApplied(INITIAL_FILTERS);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Tags className="w-7 h-7 text-blue-600" />
            企业标签管理
          </h1>
          <p className="text-slate-500 mt-1 max-w-2xl">
            按行业、规模、科技认定、地区与国标行业等多维条件组合，生成标准化标签规则，并查看符合条件的企业清单与对应标签。
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="gap-2" onClick={reset}>
            <RotateCcw className="w-4 h-4" />
            重置
          </Button>
          <Button
            type="button"
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={apply}
          >
            <Sparkles className="w-4 h-4" />
            生成企业列表
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <Card className="p-5 border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4">筛选维度</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">招投标活跃档</label>
                <select
                  className={selectClass}
                  value={draft.tenderActivity}
                  onChange={(e) => setDraft((d) => ({ ...d, tenderActivity: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="高">高</option>
                  <option value="中">中</option>
                  <option value="低">低</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">资本背景</label>
                <select
                  className={selectClass}
                  value={draft.capitalBackground}
                  onChange={(e) => setDraft((d) => ({ ...d, capitalBackground: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="民营主导">民营主导</option>
                  <option value="国有控股或参股">国有控股或参股</option>
                  <option value="港澳台及外商参股">港澳台及外商参股</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">行业</label>
                <select
                  className={selectClass}
                  value={draft.industry}
                  onChange={(e) => setDraft((d) => ({ ...d, industry: e.target.value }))}
                >
                  <option value="">全部</option>
                  {INDUSTRIES.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">规模</label>
                <select
                  className={selectClass}
                  value={draft.businessScale}
                  onChange={(e) => setDraft((d) => ({ ...d, businessScale: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="大型">大型</option>
                  <option value="中型">中型</option>
                  <option value="小型">小型</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">科技认定</label>
                <select
                  className={selectClass}
                  value={draft.techCert}
                  onChange={(e) => setDraft((d) => ({ ...d, techCert: e.target.value }))}
                >
                  <option value="">全部</option>
                  {TECH_CERTS_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">省份地区</label>
                <select
                  className={selectClass}
                  value={draft.province}
                  onChange={(e) => setDraft((d) => ({ ...d, province: e.target.value }))}
                >
                  <option value="">全部</option>
                  {[
                    '北京市',
                    '上海市',
                    '天津市',
                    '浙江省',
                    '江苏省',
                    '广东省',
                    '四川省',
                    '湖北省',
                    '陕西省',
                    '福建省',
                  ].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">战略新兴产业</label>
                <select
                  className={selectClass}
                  value={draft.strategicEmerging}
                  onChange={(e) => setDraft((d) => ({ ...d, strategicEmerging: e.target.value }))}
                >
                  <option value="">全部</option>
                  {[...new Set(MOCK_COMPANIES.map((c) => c.strategicEmerging))].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">成立年限</label>
                <select
                  className={selectClass}
                  value={draft.ageBucket}
                  onChange={(e) => setDraft((d) => ({ ...d, ageBucket: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="2年以内">2年以内</option>
                  <option value="2-5年">2-5年</option>
                  <option value="5-10年">5-10年</option>
                  <option value="10年以上">10年以上</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">登记状态</label>
                <select
                  className={selectClass}
                  value={draft.regStatus}
                  onChange={(e) => setDraft((d) => ({ ...d, regStatus: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="存续">存续</option>
                  <option value="在业">在业</option>
                  <option value="注销">注销</option>
                  <option value="吊销">吊销</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">上市状态</label>
                <select
                  className={selectClass}
                  value={draft.listingStatus}
                  onChange={(e) => setDraft((d) => ({ ...d, listingStatus: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="已上市">已上市</option>
                  <option value="未上市">未上市</option>
                  <option value="新三板">新三板</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">登记类型</label>
                <select
                  className={selectClass}
                  value={draft.registrationType}
                  onChange={(e) => setDraft((d) => ({ ...d, registrationType: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="有限责任公司">有限责任公司</option>
                  <option value="股份有限公司">股份有限公司</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">纳税信用等级</label>
                <select
                  className={selectClass}
                  value={draft.taxCreditLevel}
                  onChange={(e) => setDraft((d) => ({ ...d, taxCreditLevel: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="A级">A级</option>
                  <option value="B级">B级</option>
                  <option value="M级">M级</option>
                  <option value="未纳入近年公示">未纳入近年公示</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">注册资本（万）≥</label>
                <input
                  className={selectClass}
                  value={draft.regCapitalMin}
                  onChange={(e) => setDraft((d) => ({ ...d, regCapitalMin: e.target.value.replace(/[^\d]/g, '') }))}
                  placeholder="如：5000"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">实缴资本（万）≥</label>
                <input
                  className={selectClass}
                  value={draft.paidInMin}
                  onChange={(e) => setDraft((d) => ({ ...d, paidInMin: e.target.value.replace(/[^\d]/g, '') }))}
                  placeholder="如：3000"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">企业规模（人员）</label>
                <select
                  className={selectClass}
                  value={draft.employeeScale}
                  onChange={(e) => setDraft((d) => ({ ...d, employeeScale: e.target.value }))}
                >
                  <option value="">全部</option>
                  <option value="1-49人">1-49人</option>
                  <option value="50-99人">50-99人</option>
                  <option value="100-499人">100-499人</option>
                  <option value="500-999人">500-999人</option>
                  <option value="1000人以上">1000人以上</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">电子邮件</label>
                <input
                  className={selectClass}
                  value={draft.emailKeyword}
                  onChange={(e) => setDraft((d) => ({ ...d, emailKeyword: e.target.value }))}
                  placeholder="邮箱片段"
                />
              </div>
            </div>
          </Card>
        </aside>

        <section className="lg:col-span-8 space-y-6">
          <Card className="p-5 border-slate-200 shadow-sm">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                标准化标签（当前规则）
              </h2>
              <span className="text-xs text-slate-500">
                共 {filtered.length} 家企业符合条件
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 min-h-[2rem]">
              {ruleTags.length === 0 ? (
                <span className="text-sm text-slate-400">未选择条件时展示全部示例企业；选择后点击「生成企业列表」应用规则。</span>
              ) : (
                ruleTags.map((t) => (
                  <Badge
                    key={t.key + t.label}
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-800 border-indigo-100"
                  >
                    {t.label}
                  </Badge>
                ))
              )}
            </div>
          </Card>

          <div className="space-y-4">
            {filtered.map((c) => (
              <Card
                key={c.id}
                className="p-5 border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <h3 className="text-base font-semibold text-slate-900">{c.name}</h3>
                    </div>
                    <div className="mt-2 flex items-start gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>
                        {c.province} · {c.strategicEmerging} · {c.regStatus}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {companyDisplayTags(c).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 grid sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400">电话：</span>
                    {c.phone || '—'}
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400">邮箱：</span>
                    {c.email || '—'}
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400">官网：</span>
                    {c.website || '—'}
                  </div>
                </div>
              </Card>
            ))}
            {filtered.length === 0 && (
              <Card className="p-12 text-center border-dashed border-slate-300 text-slate-500 text-sm">
                没有符合当前规则的企业，请放宽条件后重试。
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EnterpriseTagManagement;
