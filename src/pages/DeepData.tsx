import React from 'react';
import { Network, FileText, PieChart, Globe, BarChart, Search, ChevronRight, Zap, Download, Layers } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const DeepData: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">深度数据与产业洞察</h1>
        <p className="text-slate-500">基于大数据与 AI 算法，提供超越工商层面的深度商业情报</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Industry Chain */}
        <Card className="col-span-1 md:col-span-2 p-8 border-none bg-gradient-to-br from-slate-900 to-indigo-950 text-white overflow-hidden relative group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all"></div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-500/20 rounded-2xl backdrop-blur-sm">
                <Network className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold">产业图谱分析</h2>
            </div>
            <p className="text-slate-300 mb-8 max-w-md">
              深度挖掘产业链上下游、竞争对手、合作伙伴及潜在替代品。看清企业在生态系统中的真实位置。
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
              {['上游供应', '中游制造', '下游分销', '竞争情报'].map(tag => (
                <div key={tag} className="px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 text-center text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer">
                  {tag}
                </div>
              ))}
            </div>
            <Button className="w-fit mt-8 bg-indigo-500 hover:bg-indigo-600 border-none px-8 rounded-xl font-bold">
              开始产业探索
            </Button>
          </div>
        </Card>

        {/* Global Data */}
        <Card className="p-8 border-none bg-white shadow-xl hover:shadow-2xl transition-all">
          <div className="p-3 bg-cyan-50 rounded-2xl w-fit mb-6">
            <Globe className="w-6 h-6 text-cyan-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">全球商业数据库</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            覆盖全球 200+ 国家和地区，对接 70 余个国家级商业登记中心。提供离岸公司、海外投资及国际贸易合规查询。
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600">北美/欧洲企业</span>
              <span className="font-bold text-indigo-600">8,500万+</span>
            </div>
            <div className="flex justify-between items-center text-xs p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600">东南亚/一带一路</span>
              <span className="font-bold text-indigo-600">3,200万+</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6 border-slate-200 text-slate-600 font-bold rounded-xl">访问全球版</Button>
        </Card>

        {/* Industry Reports */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="flex items-center justify-between mb-8 mt-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              精选行业分析报告
            </h3>
            <Button variant="ghost" className="text-indigo-600 font-bold">查看全部报告</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '2026年中国新能源汽车全产业链深度研究报告', category: '汽车工业', date: '2026-05-01', size: '12.5MB' },
              { title: '半导体国产替代核心环节与重点公司价值分析', category: '电子科技', date: '2026-04-28', size: '8.2MB' },
              { title: '生成式 AI 产业应用场景与市场空间测算', category: '人工智能', date: '2026-05-05', size: '15.1MB' },
              { title: '跨境电商 2026 趋势展望与物流格局演变', category: '电子商务', date: '2026-04-12', size: '9.4MB' },
            ].map((report, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all group border-slate-100">
                <Badge className="mb-4 bg-slate-100 text-slate-500 border-none group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {report.category}
                </Badge>
                <h4 className="font-bold text-slate-900 mb-4 line-clamp-2 min-h-[3rem]">{report.title}</h4>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-6">
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 最新发布</span>
                  <span>{report.date}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2 border-slate-200 hover:border-indigo-500 hover:text-indigo-600 rounded-lg">
                  <Download className="w-4 h-4" /> 下载报告 ({report.size})
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Data API Section */}
        <Card className="md:col-span-2 lg:col-span-3 p-8 border-none bg-indigo-50 flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Enterprise API</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">为企业提供自动化数据集成</h3>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              将企查查的海量商业数据无缝集成到您的 CRM、ERP 或内部风控系统中。支持高并发、毫秒级响应，助力数字化转型。
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-10">获取 API 文档</Button>
            <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 font-bold rounded-xl px-10">联系技术支持</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeepData;
