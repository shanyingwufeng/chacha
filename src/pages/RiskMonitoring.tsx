import React from 'react';
import { ShieldAlert, AlertTriangle, Info, Scale, Gavel, Hammer, AlertCircle, Search, ChevronRight, FileWarning } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const RiskMonitoring: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-500" />
            风险监控中心
          </h1>
          <p className="text-slate-500 text-sm mt-1">监控对象：阿里巴巴（中国）网络技术有限公司</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileWarning className="w-4 h-4" /> 导出风险报告
          </Button>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white border-none">实时监控中</Button>
        </div>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-rose-100 bg-rose-50/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6 text-rose-500" />
          </div>
          <p className="text-sm text-slate-500">高风险信息</p>
          <h2 className="text-3xl font-bold text-rose-600 mt-1">2</h2>
          <p className="text-[10px] text-slate-600 mt-2">限制高消费、失信信息</p>
        </Card>
        
        <Card className="p-6 border-orange-100 bg-orange-50/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-sm text-slate-500">警示信息</p>
          <h2 className="text-3xl font-bold text-orange-600 mt-1">15</h2>
          <p className="text-[10px] text-slate-600 mt-2">被执行人、终本案件等</p>
        </Card>
        
        <Card className="p-6 border-orange-900/40 bg-orange-500/10/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-orange-900/40 flex items-center justify-center mb-3">
            <Info className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-sm text-slate-500">提示信息</p>
          <h2 className="text-3xl font-bold text-orange-500 mt-1">45</h2>
          <p className="text-[10px] text-slate-600 mt-2">开庭公告、司法变动</p>
        </Card>
        
        <Card className="p-6 border-slate-200 bg-card flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <ShieldAlert className="w-6 h-6 text-slate-600" />
          </div>
          <p className="text-sm text-slate-500">监控状态</p>
          <h2 className="text-3xl font-bold text-emerald-600 mt-1">健康</h2>
          <p className="text-[10px] text-slate-600 mt-2">上次扫描: 1小时前</p>
        </Card>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-6">
        {/* Lawsuits Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-slate-900">法律诉讼</h3>
              <Badge className="bg-slate-100 text-slate-500 border-none ml-2">42 条</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-600" />
                <input 
                  type="text" 
                  placeholder="搜索案号或案由" 
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { title: '侵害作品信息网络传播权纠纷', code: '(2026)京0491民初1234号', date: '2026-04-15', role: '被告', status: '审理中', amount: '-' },
              { title: '网络购物合同纠纷', code: '(2025)沪0115民初5678号', date: '2025-11-20', role: '被告', status: '已结案', amount: '2,450.00元' },
              { title: '不正当竞争纠纷', code: '(2025)浙0108民初9012号', date: '2025-09-05', role: '原告', status: '已结案', amount: '500,000.00元' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <Badge variant="outline" className={item.role === '被告' ? 'text-rose-500 border-rose-100' : 'text-emerald-500 border-emerald-100'}>{item.role}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 text-xs text-slate-500">
                    <span>案号：{item.code}</span>
                    <span>发布日期：{item.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-slate-600 text-xs">涉案金额</span>
                    <span className="text-slate-900 font-medium">{item.amount}</span>
                  </div>
                  <div className="flex flex-col items-end min-w-[80px]">
                    <span className="text-slate-600 text-xs">状态</span>
                    <Badge className={item.status === '审理中' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-slate-50 text-slate-500 border-slate-100'}>{item.status}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-600">
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-6 text-orange-500 text-sm">查看全部诉讼记录 <ChevronRight className="w-4 h-4" /></Button>
        </Card>

        {/* Operational Abnormalities Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <Hammer className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-slate-900">经营异常</h3>
              <Badge className="bg-emerald-50 text-emerald-600 border-none ml-2">无风险记录</Badge>
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShieldAlert className="w-8 h-8 text-slate-700" />
              </div>
              <p className="text-slate-500 text-sm">暂未发现相关经营异常公示</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <Gavel className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-slate-900">严重违法失信</h3>
              <Badge className="bg-emerald-50 text-emerald-600 border-none ml-2">无风险记录</Badge>
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShieldAlert className="w-8 h-8 text-slate-700" />
              </div>
              <p className="text-slate-500 text-sm">暂未发现相关失信名单公示</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RiskMonitoring;
