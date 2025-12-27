import { useState, useEffect } from 'react';
import { Scanner } from './components/Scanner';
import { TradeIdea } from './components/TradeIdea';
import { ChartComponent } from './components/Chart';
import { Terminal } from 'lucide-react';
import { useBinanceData } from './hooks/useBinanceData';

function App() {
  const { tickers, getCandles } = useBinanceData();
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // Auto-select highest volume trend
  useEffect(() => {
    if (tickers.length > 0 && !activeSymbol) {
      const top = tickers.find(t => t.trend && t.trend !== 'NEUTRAL');
      if (top) setActiveSymbol(top.symbol);
    }
  }, [tickers]);

  // Fetch chart data when active symbol changes
  useEffect(() => {
    if (activeSymbol) {
      getCandles(activeSymbol).then(data => setChartData(data));
    }
  }, [activeSymbol]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Galactic Scalper</h1>
              <p className="text-slate-400 text-sm">Systematic Futures Radar</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs text-slate-500 uppercase tracking-widest">Status</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-green-400 font-bold text-sm">System Online</p>
            </div>
          </div>
        </header>

        {/* Highlight Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Scanner (4 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Chart Section */}
            {activeSymbol && chartData.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    {activeSymbol} <span className="text-slate-500 text-sm font-normal">15m Candles</span>
                  </h2>
                </div>
                <ChartComponent symbol={activeSymbol} data={chartData} />
              </div>
            )}

            <Scanner />
          </div>

          {/* Right: Trade Idea & Rules (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <TradeIdea />

            {/* Mini Guide */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-3">Quick Rules</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span> Never risk &gt; 2% per trade.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span> Wait for valid setup (Rejection/Breakout).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span> If BTC is ranging, avoid breakouts.
                </li>
              </ul>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

export default App;
