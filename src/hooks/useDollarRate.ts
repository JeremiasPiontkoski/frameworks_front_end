import { useState, useEffect } from 'react';

export const useDollarRate = () => {
  const [rate, setRate] = useState<number>(5.20);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  useEffect(() => {
    const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    ws.onopen = () => {
      setStatus('connected');
      
      const subscribeMessage = {
        type: 'subscribe',
        product_ids: ['BTC-USD'],
        channels: ['ticker']
      };
      
      ws.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'ticker' && data.price) {
        const currentPrice = parseFloat(data.price);
        const simulatedDollar = 5.0 + (currentPrice % 100) / 250; 
        
        setRate(simulatedDollar);
      }
    };

    ws.onerror = () => {
      setStatus('disconnected');
    };

    ws.onclose = () => {
      setStatus('disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  return { rate, status };
};