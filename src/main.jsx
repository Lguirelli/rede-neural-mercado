import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Activity, ArrowDownRight, ArrowUpRight, Brain, ChevronRight, CircleDollarSign, Clock3, Gauge, Globe2, Layers3, Menu, ShieldCheck, Sparkles, TrendingUp, X } from 'lucide-react';
import './styles.css';

const stocks = [
  ['PETR4', 'Petrobras', 'Petróleo e gás', 38.42, 2.35, 78, 'alta', 'médio'],
  ['VALE3', 'Vale', 'Mineração', 64.18, -1.12, 71, 'queda', 'médio'],
  ['ITUB4', 'Itaú Unibanco', 'Bancos', 33.87, 0.84, 74, 'alta', 'baixo'],
  ['BBAS3', 'Banco do Brasil', 'Bancos', 28.51, 1.46, 69, 'alta', 'médio'],
  ['BBDC4', 'Bradesco', 'Bancos', 13.22, -0.64, 62, 'queda', 'alto'],
  ['ABEV3', 'Ambev', 'Consumo', 12.10, 0.28, 58, 'alta', 'baixo'],
  ['MGLU3', 'Magazine Luiza', 'Varejo', 9.43, -2.72, 67, 'queda', 'alto'],
  ['LREN3', 'Lojas Renner', 'Varejo', 17.84, 1.19, 64, 'alta', 'médio'],
  ['TOTS3', 'Totvs', 'Tecnologia', 31.25, 1.82, 76, 'alta', 'médio'],
  ['ELET3', 'Eletrobras', 'Energia', 43.90, -0.35, 61, 'queda', 'médio'],
  ['RDOR3', 'Rede D’Or', 'Saúde', 27.48, 0.91, 60, 'alta', 'médio'],
  ['RADL3', 'Raia Drogasil', 'Saúde', 24.72, 0.52, 66, 'alta', 'baixo'],
  ['CYRE3', 'Cyrela', 'Construção', 22.15, -1.43, 63, 'queda', 'alto'],
  ['RAIL3', 'Rumo', 'Logística', 20.58, 0.74, 59, 'alta', 'médio'],
  ['SUZB3', 'Suzano', 'Papel e celulose', 55.34, -0.86, 68, 'queda', 'médio']
].map(([ticker, company, sector, price, forecast, confidence, direction, risk], index) => ({
  ticker, company, sector, price, forecast, confidence, direction, risk,
  volume: `${(Math.random() * 9 + 1).toFixed(1)}M`,
  sentiment: direction === 'alta' ? 'positivo' : 'pressionado',
  modelScore: Math.round(confidence * 0.72 + Math.random() * 18),
  updated: '10:45',
  data: Array.from({ length: 18 }, (_, i) => ({
    name: i,
    value: Number((price + Math.sin(i / 2 + index) * 1.8 + (direction === 'alta' ? i * 0.08 : -i * 0.06)).toFixed(2)),
    volume: Math.round(40 + Math.random() * 90)
  }))
}));

const market = [
  ['IBOV', '+0,82%', 'positivo'],
  ['DÓLAR', '-0,31%', 'positivo'],
  ['S&P 500', '+0,44%', 'positivo'],
  ['NASDAQ', '+0,67%', 'positivo'],
  ['PETRÓLEO', '+1,21%', 'positivo'],
  ['MINÉRIO', '-0,48%', 'negativo']
];

const factorsBase = [
  ['Preço histórico ajustado', 31, 'positivo', 'O comportamento recente mostrou recuperação após queda anterior.'],
  ['Volume negociado', 22, 'positivo', 'O aumento no volume reforçou a força do movimento projetado.'],
  ['Ibovespa e setor', 14, 'positivo', 'O índice e o setor apresentaram leitura favorável no período.'],
  ['Gatilhos externos', 18, 'neutro', 'Não houve evento negativo relevante no intervalo analisado.'],
  ['Volatilidade recente', 15, 'risco', 'A oscilação ainda exige cautela na leitura da previsão.']
];

function App() {
  const [selected, setSelected] = useState(stocks[0]);
  const [view, setView] = useState('dashboard');
  const [filter, setFilter] = useState('todos');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState(null);

  const filteredStocks = useMemo(() => stocks.filter(s => filter === 'todos' || s.direction === filter), [filter]);
  const positives = stocks.filter(s => s.direction === 'alta').length;
  const negatives = stocks.length - positives;

  function openDetail(stock) {
    setSelected(stock);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openExplanation(stock, explanation) {
    setSelected(stock);
    setActiveExplanation(explanation);
    setView('explanation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="app-shell">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="grid-glow" />

      <aside className={`sidebar ${mobileMenu ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-icon"><Brain size={22} /></div>
          <div>
            <strong>Neo Quant</strong>
            <span>Glass AI</span>
          </div>
        </div>
        <nav>
          <button className={view === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}><Layers3 size={18}/> Dashboard</button>
          <button className={view === 'detail' ? 'active' : ''} onClick={() => setView('detail')}><Sparkles size={18}/> Análise detalhada</button>
          <button><Globe2 size={18}/> Mercado global</button>
          <button><ShieldCheck size={18}/> Validação</button>
        </nav>
        <div className="side-panel">
          <span>Modelo placeholder</span>
          <strong>Rede neural em construção</strong>
          <p>Dados simulados para validar layout, navegação, leitura dos cards e estrutura da análise.</p>
        </div>
      </aside>

      <section className="content">
        <header className="topbar glass">
          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
          <div>
            <p className="eyebrow">painel de previsão</p>
            <h1>{view === 'dashboard' ? 'Dashboard Geral' : view === 'detail' ? `Análise detalhada ${selected.ticker}` : `${selected.ticker} · Explicação completa`}</h1>
          </div>
          <div className="top-actions">
            <span><Clock3 size={16}/> Atualizado 10:45</span>
            <button className="primary-btn">Sincronizar dados</button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div key="dashboard" initial={{opacity:0, y:14}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-14}}>
              <section className="hero-grid">
                <div className="hero-card glass">
                  <p className="eyebrow">leitura geral da IA</p>
                  <h2>Mercado com viés levemente positivo no curto prazo.</h2>
                  <p>O modelo simulado identifica {positives} ações com maior probabilidade de alta e {negatives} com risco de queda no próximo pregão.</p>
                  <div className="hero-metrics">
                    <Metric label="Ações monitoradas" value="15" />
                    <Metric label="Alta prevista" value={`${positives}`} positive />
                    <Metric label="Queda prevista" value={`${negatives}`} negative />
                    <Metric label="Confiança média" value="68%" />
                  </div>
                </div>
                <div className="market-panel glass">
                  <p className="eyebrow">mercado global</p>
                  {market.map(([name, value, status]) => <div className="market-row" key={name}><span>{name}</span><strong className={status}>{value}</strong></div>)}
                </div>
              </section>

              <section className="toolbar glass">
                <div>
                  <p className="eyebrow">ativos monitorados</p>
                  <h3>15 ações brasileiras</h3>
                </div>
                <div className="filters">
                  {['todos','alta','queda'].map(f => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}
                </div>
              </section>

              <section className="stocks-grid">
                {filteredStocks.map(stock => <StockCard key={stock.ticker} stock={stock} onOpen={() => openDetail(stock)} />)}
              </section>
            </motion.div>
          ) : (
            view === 'detail' ? (
            <Detail key="detail" stock={selected} onBack={() => setView('dashboard')} onOpenExplanation={(item) => openExplanation(selected, item)} />
          ) : (
            <ExplanationDetail key="explanation" stock={selected} explanation={activeExplanation || factorsBase[0]} onBack={() => setView('detail')} />
          )
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

function Metric({ label, value, positive, negative }) {
  return <div className="metric"><span>{label}</span><strong className={positive ? 'up' : negative ? 'down' : ''}>{value}</strong></div>;
}

function StockCard({ stock, onOpen }) {
  const isUp = stock.direction === 'alta';
  return <motion.article whileHover={{ y: -8, scale: 1.01 }} className={`stock-card glass ${isUp ? 'up-card' : 'down-card'}`}>
    <div className="stock-head">
      <div><strong>{stock.ticker}</strong><span>{stock.company}</span></div>
      <div className={`direction ${isUp ? 'up' : 'down'}`}>{isUp ? <ArrowUpRight/> : <ArrowDownRight/>}</div>
    </div>
    <div className="chart-mini">
      <ResponsiveContainer width="100%" height={70}>
        <AreaChart data={stock.data}>
          <Area type="monotone" dataKey="value" stroke="currentColor" fill="currentColor" fillOpacity={0.12} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="price-row"><span>Preço atual</span><strong>R$ {stock.price.toFixed(2).replace('.', ',')}</strong></div>
    <div className="forecast-row"><span>Previsão IA</span><strong className={isUp ? 'up' : 'down'}>{isUp ? '+' : ''}{stock.forecast.toFixed(2).replace('.', ',')}%</strong></div>
    <div className="confidence"><span>Confiança</span><div><i style={{width: `${stock.confidence}%`}} /></div><strong>{stock.confidence}%</strong></div>
    <button className="detail-btn" onClick={onOpen}>Análise detalhada <ChevronRight size={16}/></button>
  </motion.article>;
}

function Detail({ stock, onBack, onOpenExplanation }) {
  const isUp = stock.direction === 'alta';
  const radar = [
    { subject: 'Preço', value: 82 }, { subject: 'Volume', value: 68 }, { subject: 'Setor', value: 74 }, { subject: 'Macro', value: 57 }, { subject: 'Sentimento', value: 63 }
  ];
  return <motion.section initial={{opacity:0, y:14}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-14}} className="detail-layout">
    <button className="back-btn" onClick={onBack}>← Voltar ao dashboard</button>
    <div className="detail-hero glass">
      <div>
        <p className="eyebrow">previsão da rede neural</p>
        <h2>{stock.ticker} · {stock.company}</h2>
        <p>A rede neural prevê <strong className={isUp ? 'up' : 'down'}>{stock.direction}</strong> de {Math.abs(stock.forecast).toFixed(2).replace('.', ',')}% para o próximo pregão, com confiança simulada de {stock.confidence}%.</p>
      </div>
      <div className={`confidence-ring ${isUp ? 'ring-up' : 'ring-down'}`} style={{'--score': `${stock.confidence * 3.6}deg`}}>
        <strong>{stock.confidence}%</strong><span>confiança</span>
      </div>
    </div>

    <div className="detail-grid">
      <div className="main-chart glass">
        <div className="section-head"><div><p className="eyebrow">gráfico principal</p><h3>Preço, tendência e projeção</h3></div><Activity/></div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stock.data}>
            <XAxis dataKey="name" stroke="rgba(255,255,255,.35)" />
            <YAxis stroke="rgba(255,255,255,.35)" />
            <Tooltip contentStyle={{background:'#101827', border:'1px solid rgba(255,255,255,.12)', borderRadius:14, color:'#fff'}} />
            <Line type="monotone" dataKey="value" stroke="currentColor" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="ai-explain glass">
        <p className="eyebrow">explicações principais</p>
        <h3>Títulos que resumem a previsão</h3>
        <p>Esta tela mostra apenas os principais motivos da previsão. Cada título abre uma terceira tela com a explicação completa, mantendo a leitura limpa.</p>
        <div className="explanation-shortcuts">
          {factorsBase.slice(0, 4).map(item => (
            <button key={item[0]} onClick={() => onOpenExplanation(item)}>
              <span>{item[0]}</span>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="detail-grid second">
      <div className="factors glass">
        <p className="eyebrow">fatores de influência</p>
        <h3>Pesos da previsão</h3>
        {factorsBase.map((item) => {
          const [name, weight, impact, desc] = item;
          return <button className="factor factor-button" key={name} onClick={() => onOpenExplanation(item)}>
            <div><strong>{name}</strong><span>{desc}</span></div>
            <b>{weight}%</b>
            <i><em style={{width:`${weight * 2.3}%`}} /></i>
            <small>Ver explicação completa</small>
          </button>;
        })}
      </div>
      <div className="score-card glass">
        <p className="eyebrow">score da rede neural</p>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={radar}>
            <PolarGrid stroke="rgba(255,255,255,.14)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,.65)', fontSize: 11 }} />
            <Radar dataKey="value" stroke="currentColor" fill="currentColor" fillOpacity={0.16} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="history glass">
      <p className="eyebrow">histórico de previsão</p>
      <h3>Validação simulada dos últimos dias</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={stock.data.slice(0, 10)}>
          <XAxis dataKey="name" stroke="rgba(255,255,255,.35)" />
          <YAxis stroke="rgba(255,255,255,.35)" />
          <Tooltip contentStyle={{background:'#101827', border:'1px solid rgba(255,255,255,.12)', borderRadius:14, color:'#fff'}} />
          <Bar dataKey="volume" fill="currentColor" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.section>;
}


function ExplanationDetail({ stock, explanation, onBack }) {
  const [name, weight, impact, desc] = explanation;
  const isPositive = impact === 'positivo';
  return <motion.section initial={{opacity:0, y:14}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-14}} className="explanation-page">
    <button className="back-btn" onClick={onBack}>← Voltar para análise detalhada</button>
    <div className="explanation-hero glass">
      <p className="eyebrow">explicação completa</p>
      <h2>{name}</h2>
      <p>{desc}</p>
      <div className="explanation-meta">
        <span>Ação: <strong>{stock.ticker}</strong></span>
        <span>Peso na previsão: <strong>{weight}%</strong></span>
        <span>Impacto: <strong className={isPositive ? 'up' : impact === 'risco' ? 'down' : ''}>{impact}</strong></span>
      </div>
    </div>

    <div className="explanation-grid">
      <div className="glass explanation-block">
        <p className="eyebrow">leitura em linguagem simples</p>
        <h3>O que isso significa?</h3>
        <p>Este fator representa uma parte da decisão da rede neural. Quando os dados reais forem conectados, esta área vai explicar como esse indicador se comportou, se ele reforçou alta, queda ou cautela, e qual foi sua distância em relação ao padrão histórico.</p>
      </div>
      <div className="glass explanation-block">
        <p className="eyebrow">como influenciou</p>
        <h3>Influência na previsão</h3>
        <p>O modelo cruza este dado com preço, volume, volatilidade, setor, mercado externo e gatilhos recentes. O peso de {weight}% indica que esse foi um dos elementos relevantes para a leitura atual de {stock.ticker}.</p>
      </div>
      <div className="glass explanation-block wide">
        <p className="eyebrow">dados que entrarão aqui</p>
        <h3>Base técnica da explicação</h3>
        <ul>
          <li>Valor atual do indicador.</li>
          <li>Comparação com médias anteriores.</li>
          <li>Impacto positivo, negativo ou neutro.</li>
          <li>Eventos externos relacionados.</li>
          <li>Exemplos históricos semelhantes encontrados pelo modelo.</li>
        </ul>
      </div>
    </div>
  </motion.section>;
}

createRoot(document.getElementById('root')).render(<App />);
