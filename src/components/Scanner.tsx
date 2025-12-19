import { ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { useBinanceData } from '../hooks/useBinanceData';

export function Scanner() {
    const { tickers, loading } = useBinanceData();

    if (loading) return <div className="p-4 text-cyan-400 animate-pulse">Scanning Markets...</div>;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-6 text-cyan-400">
                <Activity className="w-5 h-5" />
                <h2 className="text-xl font-bold tracking-wider uppercase">Market Scanner (Top Vol)</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 text-sm uppercase tracking-widest border-b border-slate-800">
                            <th className="pb-3 px-2">Pair</th>
                            <th className="pb-3 px-2">Price</th>
                            <th className="pb-3 px-2">24h %</th>
                            <th className="pb-3 px-2 text-right">Trend (1H)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {tickers.map((t) => (
                            <tr key={t.symbol} className="hover:bg-slate-800/50 transition-colors">
                                <td className="py-4 px-2 font-medium text-white">{t.symbol.replace('USDT', '')}</td>
                                <td className="py-4 px-2 text-slate-300">${parseFloat(t.lastPrice).toFixed(t.lastPrice < 1 ? 4 : 2)}</td>
                                <td className={`py-4 px-2 font-bold ${parseFloat(t.priceChangePercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {parseFloat(t.priceChangePercent) > 0 ? '+' : ''}{parseFloat(t.priceChangePercent).toFixed(2)}%
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${t.trend === 'BULLISH' ? 'bg-green-500/10 text-green-400' :
                                            t.trend === 'BEARISH' ? 'bg-red-500/10 text-red-400' : 'bg-slate-700 text-slate-400'
                                        }`}>
                                        {t.trend === 'BULLISH' && <ArrowUp className="w-3 h-3" />}
                                        {t.trend === 'BEARISH' && <ArrowDown className="w-3 h-3" />}
                                        {t.trend}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
