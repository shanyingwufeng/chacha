import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Download, ChevronRight, Info, ShieldAlert } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const FinancialAnalysis: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-orange-500" />
            财务分析面板
          </h1>
          <p className="text-slate-500 text-sm mt-1">分析对象：阿里巴巴（中国）网络技术有限公司</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> 财务报表下载
          </Button>
          <Button size="sm" className="bg-orange-500">申请专业版分析报告</Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: '营业收入 (估)', value: '￥23,124亿', trend: '+12.5%', isUp: true, icon: TrendingUp, color: 'text-emerald-600' },
          { label: '净利润 (估)', value: '￥458.2亿', trend: '+8.2%', isUp: true, icon: TrendingUp, color: 'text-emerald-600' },
          { label: '资产负债率', value: '42.5%', trend: '-2.1%', isUp: false, icon: TrendingDown, color: 'text-emerald-600' },
          { label: '纳税评级', value: 'A级', trend: '连续3年', isUp: true, icon: Activity, color: 'text-orange-500' },
        ].map((kpi, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-slate-600 font-medium">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.isUp ? 'text-emerald-500' : 'text-rose-500'}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-bold text-slate-900">{kpi.value}</h3>
              <span className={`text-xs font-bold ${kpi.color}`}>{kpi.trend}</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className={`h-full ${kpi.isUp ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: '70%' }}></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Trend Chart (SVG) */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              营业收入趋势 (近5年)
            </h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer">年度</Badge>
              <Badge variant="outline" className="text-slate-600 cursor-pointer border-transparent">季度</Badge>
            </div>
          </div>
          
          <div className="relative h-64 w-full">
            {/* Simple SVG Chart */}
            <svg viewBox="0 0 1000 300" className="w-full h-full">
              {/* Grid lines */}
              <line x1="0" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="125" x2="1000" y2="125" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="200" x2="1000" y2="200" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="275" x2="1000" y2="275" stroke="#f1f5f9" strokeWidth="1" />
              
              {/* Line path */}
              <path 
                d="M 50 250 L 250 200 L 450 150 L 650 100 L 850 50" 
                fill="none" 
                stroke="#ea580c" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              
              {/* Points */}
              <circle cx="50" cy="250" r="6" fill="white" stroke="#ea580c" strokeWidth="3" />
              <circle cx="250" cy="200" r="6" fill="white" stroke="#ea580c" strokeWidth="3" />
              <circle cx="450" cy="150" r="6" fill="white" stroke="#ea580c" strokeWidth="3" />
              <circle cx="650" cy="100" r="6" fill="white" stroke="#ea580c" strokeWidth="3" />
              <circle cx="850" cy="50" r="6" fill="white" stroke="#ea580c" strokeWidth="3" />

              {/* X Axis Labels */}
              <text x="50" y="295" fontSize="14" fill="#94a3b8" textAnchor="middle">2022</text>
              <text x="250" y="295" fontSize="14" fill="#94a3b8" textAnchor="middle">2023</text>
              <text x="450" y="295" fontSize="14" fill="#94a3b8" textAnchor="middle">2024</text>
              <text x="650" y="295" fontSize="14" fill="#94a3b8" textAnchor="middle">2025</text>
              <text x="850" y="295" fontSize="14" fill="#94a3b8" textAnchor="middle">2026(预测)</text>
            </svg>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-[10px] text-slate-600 mb-1 uppercase tracking-wider">复合增长率</p>
              <p className="font-bold text-slate-900">18.4%</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-[10px] text-slate-600 mb-1 uppercase tracking-wider">行业分位</p>
              <p className="font-bold text-orange-500">前 1%</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-[10px] text-slate-600 mb-1 uppercase tracking-wider">现金流状态</p>
              <p className="font-bold text-emerald-600">极充沛</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-[10px] text-slate-600 mb-1 uppercase tracking-wider">速动比率</p>
              <p className="font-bold text-slate-900">1.25</p>
            </div>
          </div>
        </Card>

        {/* Financial Rating & Risk */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              财务信用评分
            </h3>
            <div className="flex items-center justify-center py-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                  <circle cx="64" cy="64" r="58" stroke="#ea580c" strokeWidth="8" fill="none" strokeDasharray="364.4" strokeDashoffset="36.4" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-orange-500">92</span>
                  <span className="text-[10px] text-slate-600 font-bold uppercase">极好</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center px-4">
              基于 20 余项财务指标综合评分，该企业财务状况极其稳健，信用等级极高。
            </p>
            <Button variant="outline" size="sm" className="w-full mt-6 text-xs">查看评分详情</Button>
          </Card>

          <Card className="p-6 bg-white text-white border-none">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-orange-400" />
              深度尽调提示
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></div>
                <span className="text-slate-700">经营性现金流连续 12 个季度为正</span>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></div>
                <span className="text-slate-700">主要子公司业绩承诺均已达成</span>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></div>
                <span className="text-slate-700">注意其在云计算领域的研发投入占比变化</span>
              </li>
            </ul>
            <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">咨询分析师</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;
