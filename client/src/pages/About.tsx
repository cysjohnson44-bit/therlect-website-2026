import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Lightbulb, History } from "lucide-react";
import { Link } from "wouter";

export default function About() {
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
            關於我們
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100">
            一群對熱力學充滿熱情的工程師，致力於將複雜的理論轉化為優雅的解決方案。
          </p>
        </div>
      </section>

      {/* Company Intro Section */}
      <section className="py-20 relative">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663272903053/6a2H4uYcRvYtNrWj4wnxzN/therlect_team_research-8qedcTBkV5kL8w2eHjnHq3.webp" 
                  alt="Therlect Team" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
              </div>
              {/* Stats Card */}
              <div className="absolute -bottom-8 -right-8 bg-card border border-white/10 p-6 rounded-xl shadow-xl hidden md:block">
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-1">15+</div>
                    <div className="text-xs text-muted-foreground font-mono uppercase">Years Exp.</div>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-1">2019</div>
                    <div className="text-xs text-muted-foreground font-mono uppercase">Founded</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="font-display font-bold text-3xl md:text-4xl">我們的故事</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Therlect 汗海科技成立於 2019 年，由一群資深熱流工程師所創立。我們深信，熱管理不僅是一門科學，更是一門藝術。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                在過去的十多年裡，我們見證了電子產品效能的快速發展，也解決了隨之而來的散熱挑戰。從早期的被動散熱到現在的主動式液冷與相變技術，我們始終走在技術的最前沿。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                除了熱管理，我們更將視野拓展至遠紅外線技術，探索熱能對人體健康與工業應用的廣泛應用。我們不僅是您的供應商，更是您在熱能領域最值得信賴的策略夥伴。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-secondary/5 border-y border-white/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">核心價值</h2>
            <p className="text-muted-foreground text-lg">指引我們前進的信念與原則</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "創新 (Innovation)",
                desc: "不滿足於現狀，持續探索熱力學的邊界，將新技術應用於更多可能性。",
                color: "text-yellow-400",
                bg: "bg-yellow-500/10"
              },
              {
                icon: Target,
                title: "精準 (Precision)",
                desc: "從模擬分析到生產製造，我們對每一個數據、每一個公差都力求完美。",
                color: "text-red-400",
                bg: "bg-red-500/10"
              },
              {
                icon: Users,
                title: "夥伴 (Partnership)",
                desc: "與客戶緊密合作，共同面對挑戰。您的成功，就是我們最大的成就。",
                color: "text-blue-400",
                bg: "bg-blue-500/10"
              }
            ].map((value, i) => (
              <div key={i} className="bg-card/50 border border-white/5 p-8 rounded-xl hover:bg-card/80 transition-all hover:-translate-y-1 hover:shadow-lg group">
                <div className={`w-14 h-14 rounded-xl ${value.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-7 h-7 ${value.color}`} />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partner Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-transparent border-t border-white/5">
        <div className="container">
          <div className="text-center space-y-6 mb-12">
            <h2 className="font-display font-bold text-4xl md:text-5xl">值得信賴的合作夥伴</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">我們有幸與眾多國際知名企業合作，共同創造價值</p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-sm px-8 group">
                立即預約洽談
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Logo Grid */}
      <section className="py-24 relative overflow-hidden" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663272903053/6a2H4uYcRvYtNrWj4wnxzN/clients_background_grid-aHbK8dLqMnPxYzJwKvRsT2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">我們的客戶</h2>
            <p className="text-muted-foreground text-lg">感謝這些優秀企業選擇汎海作為合作夥伴</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Foxconn", logo: "/manus-storage/0_MdlgAUJ6zzdMHbI29eVyc9_1778551196542_na1fn_L2hvbWUvdWJ1bnR1L2ZveGNvbm5fbG9nb190cmFuc3BhcmVudA_36bf9803.png" },
              { name: "C&T", logo: "/manus-storage/1_oL6rPQtyXmxrsictHsmSYK_1778551285848_na1fn_L2hvbWUvdWJ1bnR1L0MmVF9sb2dvX3RyYW5zcGFyZW50_cdb64e9b.png" },
              { name: "Tailyn", logo: "/manus-storage/2_vv0ZuuBlPV8jBh6gTeHd9U_1778551177634_na1fn_L2hvbWUvdWJ1bnR1L1RhaWx5bl9sb2dvX3RyYW5zcGFyZW50_064feacd.png" },
              { name: "NTIS", logo: "/manus-storage/3_HoRSMn9wkopu6tnBN6quPv_1778551228069_na1fn_L2hvbWUvdWJ1bnR1L250aXNfbG9nb190cmFuc3BhcmVudA_d681239e.png" },
              { name: "Google", logo: "/manus-storage/4_lU2PvXkOV1ELrGXJ2E9g0Z_1778551253423_na1fn_L2hvbWUvdWJ1bnR1L2dvb2dsZV9sb2dvX3RyYW5zcGFyZW50_a6eb4bd8.png" },
              { name: "Meta", logo: "/manus-storage/5_Uq3zVTeD4sck8gOs6Y8pe0_1778551272838_na1fn_L2hvbWUvdWJ1bnR1L21ldGFfbG9nb190cmFuc3BhcmVudA_d1d4c01d.png" },
              { name: "MaxLinear", logo: "/manus-storage/6_WbxLIH4CXEL6CSW5AUkrxF_1778551204471_na1fn_L2hvbWUvdWJ1bnR1L01heExpbmVhcl9sb2dvX3RyYW5zcGFyZW50_7453d7b4.png" },
              { name: "WinWay", logo: "/manus-storage/7_xQipshHa6hrcqNC2zqdHYc_1778551179523_na1fn_L2hvbWUvdWJ1bnR1L3dpbndheV9sb2dvX3RyYW5zcGFyZW50_f3131aa7.png" },
              { name: "Onyx", logo: "/manus-storage/8_I9GgCwUpJuJwxs1XD2UFDl_1778551277996_na1fn_L2hvbWUvdWJ1bnR1L29ueXhfbG9nb190cmFuc3BhcmVudA_6fead5e2.png" },
              { name: "PAN", logo: "/manus-storage/9_eeBIgiKrtOwIFmxl3WEklB_1778551196409_na1fn_L2hvbWUvdWJ1bnR1L1BBTl9sb2dvX3RyYW5zcGFyZW50_a46247e0.png" },
              { name: "Broadcom", logo: "/manus-storage/10_L3m61W3zzRtCTxhC2HTccF_1778551187115_na1fn_L2hvbWUvdWJ1bnR1L2Jyb2FkY29tX2xvZ29fdHJhbnNwYXJlbnQ_ae365e9c.png" },
              { name: "Marvell", logo: "/manus-storage/11_eND1JI4zBHO7R8hMKPdfE5_1778551172897_na1fn_L2hvbWUvdWJ1bnR1L21hcnZlbGxfbG9nb190cmFuc3BhcmVudA_fb73d34d.png" },
              { name: "FIH", logo: "/manus-storage/12_Z0doYTzAMJDxx1XTuRWLU4_1778551270916_na1fn_L2hvbWUvdWJ1bnR1L0ZJSF9sb2dvX3RyYW5zcGFyZW50_f4cb01da.png" },
              { name: "Kenmec", logo: "/manus-storage/13_HnSiO7TgGYmEnNgNPacmP2_1778551199339_na1fn_L2hvbWUvdWJ1bnR1L0tlbm1lY19sb2dvX3RyYW5zcGFyZW50_bfc21f0d.png" },
              { name: "MobiShow", logo: "/manus-storage/14_hh9RvbNSDXH5EQ0gShPd45_1778551184454_na1fn_L2hvbWUvdWJ1bnR1L01vYmlTaG93X3RyYW5zcGFyZW50_40955c09.png" },
              { name: "RapidTek", logo: "/manus-storage/15_FDKX4ATZSlWStChnpYGmU2_1778551186541_na1fn_L2hvbWUvdWJ1bnR1L1JhcGlkVGVrX2xvZ29fdHJhbnNwYXJlbnQ_902cf733.png" },
              { name: "Catapult", logo: "/manus-storage/16_1Rn6HZpH6sZ5uXbW6G8rJN_1778551181713_na1fn_L2hvbWUvdWJ1bnR1L2NhdGFwdWx0X2xvZ29fdHJhbnNwYXJlbnQ_fb4d0fe0.png" }
            ].map((client, i) => (
              <div key={i} className="h-40 flex items-center justify-center border border-blue-400/30 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-blue-600/10 hover:border-blue-400/50 transition-all cursor-default group shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="w-24 h-24 object-contain group-hover:scale-110 transition-transform drop-shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
        <div className="container relative z-10 max-w-3xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">加入我們的行列</h2>
          <p className="text-muted-foreground text-lg mb-8">
            我們始終在尋找對熱力學充滿熱情的人才。如果您也想推動技術進步，歡迎加入 Therlect。
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8">
              聯絡我們 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
