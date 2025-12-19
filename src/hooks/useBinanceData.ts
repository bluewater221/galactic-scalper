import { useState, useEffect } from 'react';

export interface TickerData {
    symbol: string;
    lastPrice: string;
    priceChangePercent: string;
    quoteVolume: string;
    trend?: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

const BASE_URL = 'https://fapi.binance.com/fapi/v1';

export function useBinanceData() {
    const [tickers, setTickers] = useState<TickerData[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch Trends (EMA Check)
    const checkTrend = async (symbol: string): Promise<'BULLISH' | 'BEARISH' | 'NEUTRAL'> => {
        try {
            const res = await fetch(`${BASE_URL}/klines?symbol=${symbol}&interval=1h&limit=50`);
            const data = await res.json();
            // data[x][4] is closing price
            const closes = data.map((k: any) => parseFloat(k[4]));

            if (closes.length < 20) return 'NEUTRAL';

            // Calc EMA 20
            const period = 20;
            const k = 2 / (period + 1);
            let ema = closes.slice(0, period).reduce((a: number, b: number) => a + b, 0) / period;

            for (let i = period; i < closes.length; i++) {
                ema = (closes[i] - ema) * k + ema;
            }

            const currentPrice = closes[closes.length - 1];
            return currentPrice > ema ? 'BULLISH' : 'BEARISH';
        } catch (e) {
            console.error(e);
            return 'NEUTRAL';
        }
    };

    const fetchData = async () => {
        try {
            const res = await fetch(`${BASE_URL}/ticker/24hr`);
            const data = await res.json();

            const usdtPairs = data
                .filter((t: any) => t.symbol.endsWith('USDT'))
                .sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
                .slice(0, 5);

            // Enhance with trend data
            const enhancedData = await Promise.all(usdtPairs.map(async (t: any) => {
                const trend = await checkTrend(t.symbol);
                return { ...t, trend };
            }));

            setTickers(enhancedData);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // 30s refresh
        return () => clearInterval(interval);
    }, []);

    return { tickers, loading };
}
