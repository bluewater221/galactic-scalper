import { Target, Shield, ArrowRight } from 'lucide-react';

export function TradeIdea() {
    // Hardcoded for the example as per user request to "show the idea"
    // In a real app, this could be dynamic or editable.
    const trade = {
        pair: 'SOL/USDT',
        direction: 'SHORT',
        entry: '125.50 - 126.50',
        sl: '128.20',
        tp: '122.50',
        leverage: '3x - 5x',
        reason: 'Rejection at EMA 50 (1H). Market Structure Bearish.'
    };

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-1">Active Setup</h2>
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-3xl font-black text-white">{trade.pair}</h1>
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                            {trade.direction}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase">Leverage</p>
                    <p className="text-white font-mono font-bold">{trade.leverage}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase mb-1">
                        <ArrowRight className="w-3 h-3" /> Entry
                    </div>
                    <p className="text-white font-mono font-bold">{trade.entry}</p>
                </div>
                <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                    <div className="flex items-center gap-2 text-red-400 text-xs uppercase mb-1">
                        <Shield className="w-3 h-3" /> Stop
                    </div>
                    <p className="text-red-300 font-mono font-bold">{trade.sl}</p>
                </div>
                <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-2 text-green-400 text-xs uppercase mb-1">
                        <Target className="w-3 h-3" /> Target
                    </div>
                    <p className="text-green-300 font-mono font-bold">{trade.tp}</p>
                </div>
            </div>

            <div className="text-sm text-indigo-200/80 italic border-l-2 border-indigo-500 pl-3">
                "{trade.reason}"
            </div>
        </div>
    );
}
