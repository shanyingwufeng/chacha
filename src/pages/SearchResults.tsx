import React, { useState } from 'react';
import { Search, Filter, SortAsc, MapPin, Building, Calendar, Users, ChevronDown, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { XINHEYIJIA_FULL, XINHEYIJIA_PROFILE } from '../data/xinheyijiaCompanyProfile';

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const companies = [
    {
      id: 1,
      name: XINHEYIJIA_FULL,
      rep: XINHEYIJIA_PROFILE.legalRepresentative,
      capital: XINHEYIJIA_PROFILE.regCapital,
      date: XINHEYIJIA_PROFILE.foundedDate,
      status: XINHEYIJIA_PROFILE.status,
      address: XINHEYIJIA_PROFILE.regAddress,
      tags: [...XINHEYIJIA_PROFILE.techCertifications].slice(0, 4),
      riskCount: 0
    },
    {
      id: 2,
      name: '阿里巴巴（中国）网络技术有限公司',
      rep: '张勇',
      capital: '1000000万人民币',
      date: '1999-09-09',
      status: '存续',
      address: '浙江省杭州市滨江区网商路699号',
      tags: ['高新企业', '独角兽', '互联网'],
      riskCount: 2
    },
    {
      id: 3,
      name: '阿里巴巴（上海）网络技术有限公司',
      rep: '胡喜',
      capital: '1000万人民币',
      date: '2015-01-20',
      status: '存续',
      address: '中国(上海)自由贸易试验区盛夏路169号',
      tags: ['互联网服务'],
      riskCount: 5
    },
    {
      id: 4,
      name: '阿里巴巴文化娱乐有限公司',
      rep: '樊路远',
      capital: '50000万人民币',
      date: '2017-03-13',
      status: '存续',
      address: '北京市朝阳区望京东园四区9号楼',
      tags: ['文化艺术'],
      riskCount: 1
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            搜索结果: <span className="text-orange-500">"江苏鑫合易家"</span>
            <span className="text-sm font-normal text-slate-500 ml-2">找到约 36 条相关企业</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <SortAsc className="w-4 h-4" /> 默认排序
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            导出搜索结果
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          <div className="bg-card rounded-xl border border-slate-200 p-5 space-y-6 sticky top-24">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" /> 省份地区
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['浙江省', '上海市', '北京市', '广东省', '江苏省', '山东省'].map(area => (
                  <button 
                    key={area}
                    onClick={() => toggleFilter(area)}
                    className={`px-2 py-1.5 rounded border text-left transition-colors ${activeFilters.includes(area) ? 'bg-orange-500/10 border-orange-500 text-orange-600' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-orange-600'}`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-orange-500" /> 行业分类
              </h3>
              <div className="space-y-2 text-xs">
                {['信息传输、软件和信息技术服务业', '批发和零售业', '租赁和商务服务业', '科学研究和技术服务业'].map(industry => (
                  <div key={industry} className="flex items-center gap-2">
                    <input type="checkbox" id={industry} className="rounded text-orange-500 focus:ring-ring" />
                    <label htmlFor={industry} className="text-slate-600 cursor-pointer hover:text-orange-500">{industry}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" /> 成立年限
              </h3>
              <div className="space-y-2 text-xs">
                {['1年以内', '1-5年', '5-10年', '10年以上'].map(year => (
                  <div key={year} className="flex items-center gap-2">
                    <input type="checkbox" id={year} className="rounded text-orange-500 focus:ring-ring" />
                    <label htmlFor={year} className="text-slate-600 cursor-pointer">{year}</label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600">确定筛选</Button>
            <Button variant="ghost" className="w-full text-xs text-slate-600">重置所有筛选项</Button>
          </div>
        </aside>

        {/* Results List */}
        <main className="lg:col-span-3 space-y-4">
          {companies.map(company => (
            <Card key={company.id} className="p-6 hover:shadow-lg transition-all border-slate-200 group">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 
                      onClick={() => navigate('/details')}
                      className="text-lg font-bold text-slate-900 group-hover:text-orange-500 cursor-pointer transition-colors"
                    >
                      {company.name}
                    </h2>
                    <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-100">{company.status}</Badge>
                    {company.riskCount > 0 && (
                      <Badge variant="outline" className="text-rose-600 bg-rose-50 border-rose-100 flex gap-1">
                        风险 {company.riskCount}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-6 text-sm">
                    <div className="flex flex-col">
                      <span className="text-slate-600 text-xs">法定代表人</span>
                      <span className="text-orange-500 font-medium cursor-pointer hover:underline">{company.rep}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-600 text-xs">注册资本</span>
                      <span className="text-slate-900">{company.capital}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-600 text-xs">成立日期</span>
                      <span className="text-slate-900">{company.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-600 text-xs">所在地区</span>
                      <span className="text-slate-900 truncate">{company.address.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden sm:flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate('/details')}>查看详情</Button>
                  <Button variant="outline" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-100" onClick={() => navigate('/risk')}>监控风险</Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                {company.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded uppercase font-bold tracking-wider">
                    {tag}
                  </span>
                ))}
                <div className="ml-auto text-xs text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {company.address}
                </div>
              </div>
            </Card>
          ))}

          {/* Pagination */}
          <div className="flex justify-center pt-8">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>上一页</Button>
              <Button size="sm" className="bg-orange-500">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="px-2 text-slate-600">...</span>
              <Button variant="outline" size="sm">50</Button>
              <Button variant="outline" size="sm">下一页</Button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
