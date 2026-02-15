import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Settings, PenTool, BarChart3, Box, Award } from "lucide-react";
import { Link } from "wouter";

export default function Solutions() {
  const processSteps = [
    {
      icon: PenTool,
      title: "概念與設計",
      shortDesc: "根據客戶需求進行初步熱評估，提出多種可行的散熱方案。",
      fullDesc: "在專案初期，我們深入分析您的產品特性、應用場景與性能需求。通過詳細的熱評估，識別潛在的熱管理瓶頸。我們考量空間限制、成本預算、製造工藝與效能目標，為您規劃多個可行方案。每個方案都經過初步驗證，確保技術可行性與經濟合理性。我們的設計團隊將與您密切合作，選定最優方案作為後續開發的基礎。",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663272903053/jwHvyQoPhiZCFpvR.png",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      icon: BarChart3,
      title: "模擬與分析",
      shortDesc: "運用專業軟體進行詳細的熱模擬與結構分析，預測潛在問題。",
      fullDesc: "利用 Ansys、Flotherm 等業界領先的模擬軟體，我們進行多物理場耦合分析。通過三維熱流分析（CFD），精確預測溫度分佈、流場特性與熱應力。結合結構有限元分析（FEA），評估材料應力與變形。在開模前全面驗證設計，大幅降低試錯成本與開發週期。模擬結果包括詳細報告與可視化分析，為後續決策提供科學依據。",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663272903053/aApGfAiYqKtAClAW.png",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      icon: Box,
      title: "原型製作",
      shortDesc: "快速製作功能原型，進行實機測試與驗證結果準確性。",
      fullDesc: "基於優化設計，我們快速製作功能原型進行實驗驗證。通過精密測試設備（紅外熱像儀、溫度傳感器陣列），採集真實工況下的溫度數據。對比模擬結果與實測數據，驗證模型準確性。若發現偏差，我們進行根因分析並優化模型參數。原型測試涵蓋常溫、高溫、低溫等多種工況，確保產品在全工作範圍內表現穩定。",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663272903053/nyKeqrnFctawsDuA.png",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      icon: Settings,
      title: "生產與製造",
      shortDesc: "整合供應鏈資源，提供高品質、高效率的量產服務。",
      fullDesc: "我們與全球優質供應商建立長期合作關係，確保原材料穩定供應。從精密模具開發、注塑成型、機械加工到組裝測試，每個環節都遵循嚴格的質量標準。採用先進的自動化設備與工藝，提高生產效率與產品一致性。建立完善的物流體系，確保及時交付。我們可根據訂單量提供靈活的生產方案，從小批量試產到大規模量產。",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663272903053/qpUTxXKBwEihgzqL.png",
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20"
    },
    {
      icon: Award,
      title: "品質與優化",
      shortDesc: "持續追蹤產品質量，根據市場反饋進行設計優化。",
      fullDesc: "產品上市後，我們建立完整的品質追蹤機制。通過客戶反饋、現場測試與長期可靠性驗證，識別改進空間。根據實際運行數據與市場需求變化，進行持續的設計優化。優化內容包括材料選擇、工藝改進、成本降低與性能提升。我們致力於追求卓越，確保產品在整個生命週期內維持最佳效能與競爭力。定期提供技術支援與升級方案。",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663272903053/NkQoCIueOaVRewwB.png",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      
      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5" />
        </div>
        
        <div className="container relative z-10 text-center">
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6 animate-in slide-in-from-bottom-5 fade-in duration-700">
            解決方案
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100">
            從概念到量產，我們提供一站式的熱管理服務，助您縮短開發週期並提升產品競爭力。
          </p>
        </div>
      </section>

      {/* Process Timeline Section with Images */}
      <section className="py-20 relative">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-20">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot and Line */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${step.bg.replace('/10', '')} ring-4 ring-background`} />
                    {index < processSteps.length - 1 && (
                      <div className="w-0.5 h-32 bg-gradient-to-b from-white/20 to-transparent mt-4" />
                    )}
                  </div>

                  {/* Content Card with Image */}
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center pl-16 md:pl-0`}>
                    {/* Text Content */}
                    <div className="flex-1">
                      <div className="p-6 rounded-xl border border-white/5 bg-card/30 hover:bg-card/50 transition-all duration-500 hover:border-white/10 hover:shadow-lg">
                        <div className={`inline-flex items-center justify-center p-3 rounded-lg ${step.bg} ${step.border} border mb-4`}>
                          <step.icon className={`w-6 h-6 ${step.color}`} />
                        </div>
                        <h3 className="font-display font-bold text-2xl mb-3 text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.fullDesc}</p>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="flex-1">
                      <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-24 bg-secondary/5 border-y border-white/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">多元應用領域</h2>
            <p className="text-muted-foreground text-lg">我們的技術廣汎應用於各行各業，為不同場景提供定制化解決方案</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "消費性電子",
                items: ["筆記型電腦散熱", "智慧型手機散熱", "遊戲主機冷卻", "穿戴式裝置熱管理"],
                image: "/assets/thermal_module.jpg"
              },
              {
                title: "工業與通訊",
                items: ["伺服器機櫃散熱", "5G 基地台散熱", "工業電腦無風扇設計", "大功率電源散熱"],
                image: "/assets/thermal_analysis.jpg"
              },
              {
                title: "健康與生活",
                items: ["遠紅外線治療儀", "智慧保暖衣物", "健康寢具應用", "節能建築材料"],
                image: "/assets/far_infrared_tech.jpg"
              }
            ].map((app, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/50 hover:bg-card/80 transition-all duration-500">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <h3 className="absolute bottom-4 left-6 font-display font-bold text-2xl text-white">{app.title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {app.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container relative z-10 max-w-3xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">尋找客製化解決方案？</h2>
          <p className="text-muted-foreground text-lg mb-8">
            每個專案都是獨一無二的。告訴我們您的需求，我們將為您量身打造最適合的熱管理方案。
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8">
              開始您的專案 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
