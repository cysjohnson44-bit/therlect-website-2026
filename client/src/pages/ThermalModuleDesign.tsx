import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Layers, TrendingUp, Cpu } from "lucide-react";
import { Link } from "wouter";

export default function ThermalModuleDesign() {
  const advantages = [
    {
      title: "結構緊湊設計",
      subtitle: "Compact Design",
      description: "針對空間受限的產品（如 AI 伺服器、行動裝置），我們利用 3D 堆疊與異質材料結合技術，在極小體積內實現最大散熱面積，解決高密度熱通量問題。",
      icon: Layers,
    },
    {
      title: "高效熱傳導技術",
      subtitle: "High Efficiency",
      description: "整合熱管 (Heat Pipe)、均溫板 (Vapor Chamber) 等相變化元件，並透過 Ansys/Flotherm 專業熱流軟體進行 CFD 模擬，確保在開模前即達到最佳散熱效能。",
      icon: Zap,
    },
    {
      title: "成本與量產優化",
      subtitle: "Cost Optimization",
      description: "導入 DFM (Design for Manufacturing) 設計思維，在設計初期即考量製程可行性與材料成本，提供最具市場競爭力且高品質的量產方案。",
      icon: TrendingUp,
    },
    {
      title: "高度客製化",
      subtitle: "Customization",
      description: "無論是消費性電子、車用電子或工業設備，我們均能根據您的特定規格與應用場景，提供靈活且精準的散熱解決方案。",
      icon: Cpu,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left-10 duration-1000 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-primary tracking-wider">散熱模組設計服務</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight">
                高效能 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                  散熱模組設計
                </span>
              </h1>
              <p className="text-xl text-primary font-semibold">Advanced Thermal Module Design & Optimization</p>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed border-l-2 border-primary/30 pl-6">
              面對電子產品日益輕薄化與高效能化的趨勢，汎海科技提供從熱模擬分析到模組量產的全方位服務。針對不同產業需求，我們致力於設計出兼具散熱效率與成本優勢的客製化模組，協助客戶突破熱設計瓶頸。
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8 group">
                  預約熱管理諮詢
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 hover:text-primary rounded-sm px-8">
                  了解更多成功案例
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in zoom-in-95 duration-1000 delay-300 fade-in">
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse-slow" />
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663272903053/FcttGesqhzGlYqqY.jpg"
                alt="高效能散熱模組設計"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,240,255,0.3)] rounded-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                核心優勢
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              從設計優化到量產實現，全方位的散熱模組解決方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h3 className="font-display font-bold text-xl">{advantage.title}</h3>
                        <p className="text-sm text-primary font-mono">{advantage.subtitle}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                完整的服務流程
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              從初期諮詢到量產交付，我們提供全程支持
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "需求分析與評估",
                  description: "深入了解您的產品特性、應用場景與散熱需求，進行初期的熱設計評估。",
                },
                {
                  step: "02",
                  title: "熱模擬與優化",
                  description: "運用 CFD 分析軟體進行詳細的熱流場模擬，並提供多個設計方案供選擇。",
                },
                {
                  step: "03",
                  title: "設計驗證與改進",
                  description: "根據模擬結果進行設計優化，確保散熱效能與製造可行性的完美平衡。",
                },
                {
                  step: "04",
                  title: "樣品製作與測試",
                  description: "製作樣品並進行實際熱測試，驗證設計的準確性與可靠性。",
                },
                {
                  step: "05",
                  title: "量產準備與支持",
                  description: "協助客戶完成模具開發、製程優化與品質控制，確保量產順利進行。",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600">
                      <span className="text-white font-bold text-sm">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-display font-bold text-lg text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Industries Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                應用產業
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              我們的散熱模組設計經驗涵蓋多個高科技產業
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* FOXCONN Logo */}
            <div className="group relative p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center min-h-[120px]">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663272903053/rvzHrwSXLQkRaKxO.jpg"
                alt="FOXCONN"
                className="max-h-16 max-w-full object-contain"
              />
            </div>
            {/* Other Industries */}
            {[
              "AI 伺服器",
              "車用電子",
              "工業設備",
            ].map((industry, index) => (
              <div
                key={index + 1}
                className="group relative p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 text-center"
              >
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        </div>

        <div className="container relative z-10 text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              準備好突破熱設計瓶頸嗎？
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            無論您的產品面臨什麼散熱挑戰，汎海科技都有經驗豐富的工程團隊準備為您提供最優化的解決方案。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-sm px-8 group">
                預約熱管理諮詢
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/solutions">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 hover:text-primary rounded-sm px-8">
                了解更多成功案例
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
