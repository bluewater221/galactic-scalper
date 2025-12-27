import { Target, Shield, ArrowRight, RefreshCw } from 'lucide-react';
import { useBinanceData } from '../hooks/useBinanceData';

export function TradeIdea() {
    const { tickers, loading } = useBinanceData();

    // Strategy: Find the highest volume coin (first in list) that has a confirmed trend
    const activeTrade = tickers.find(t => t.trend && t.trend !== 'NEUTRAL');

    if (loading || !activeTrade) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl animate-pulse h-64 flex items-center justify-center">
                <div className="text-center text-slate-500">
                    <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                    <p>Analyzing Matrix...</p>
                </div>
            </div>
        );
    }

    // Calculate Dynamic Zones based on EMA 20
    const isLong = activeTrade.trend === 'BULLISH';
    const ema = activeTrade.ema || parseFloat(activeTrade.lastPrice); // Fallback

    // Dynamic Strategy:
    // Long: Entry @ EMA, SL 1% below, TP 2% above
    // Short: Entry @ EMA, SL 1% above, TP 2% below

    const entryPrice = ema;
    const stopLoss = isLong ? ema * 0.99 : ema * 1.01;
    const takeProfit = isLong ? ema * 1.02 : ema * 0.98;

    const directionColor = isLong ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50';
    const textColor = isLong ? 'text-green-400' : 'text-red-400';
    const borderColor = isLong ? 'border-green-500/30' : 'border-red-500/30';
    const bgSoft = isLong ? 'bg-green-900/20' : 'bg-red-900/20';

    return (
        <div className="bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/20 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-20 ${isLong ? 'bg-green-500' : 'bg-red-500'}`}></div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span> Live Setup
                    </h2>
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-3xl font-black text-white">{activeTrade.symbol.replace('USDT', '')}</h1>
                        <span className={`px-3 py-1 text-white text-xs font-bold rounded uppercase shadow-lg ${directionColor}`}>
                            {isLong ? 'LONG' : 'SHORT'}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase">Current</p>
                    <p className="text-white font-mono font-bold">${parseFloat(activeTrade.lastPrice).toFixed(2)}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase mb-1">
                        <ArrowRight className="w-3 h-3" /> Entry (EMA)
                    </div>
                    <p className="text-white font-mono font-bold">${entryPrice.toFixed(4)}</p>
                </div>
                <div className={`p-3 rounded-lg border ${borderColor} ${bgSoft}`}>
                    <div className={`flex items-center gap-2 text-xs uppercase mb-1 ${textColor}`}>
                        <Shield className="w-3 h-3" /> Stop (1%)
                    </div>
                    <p className={`${textColor} font-mono font-bold`}>${stopLoss.toFixed(4)}</p>
                </div>
                <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs uppercase mb-1">
                        <Target className="w-3 h-3" /> Target (2%)
                    </div>
                    <p className="text-indigo-300 font-mono font-bold">${takeProfit.toFixed(4)}</p>
                </div>
            </div>

            <div className="text-sm text-slate-400 border-l-2 border-slate-600 pl-3 italic">
                "Auto-generated: {isLong ? 'Bullish' : 'Bearish'} structure above EMA 20. Wait for price to touch Entry."
            </div>
        </div>
    );
}
