'use client';

import React, { useCallback, useState } from 'react';

type Props = {
  symbol: string;
  company: string;
  isInWatchlist?: boolean;
  showTrashIcon?: boolean;
  type?: 'button' | 'icon';
  onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
};

const WatchlistButton: React.FC<Props> = ({ symbol, company, isInWatchlist = false, onWatchlistChange }) => {
  const [added, setAdded] = useState<boolean>(isInWatchlist);

  const toggle = useCallback(() => {
    const next = !added;
    setAdded(next);
    try {
      onWatchlistChange?.(symbol, next);
    } catch (e) {
      // swallow — parent can handle errors
      console.error('WatchlistButton onWatchlistChange error', e);
    }
  }, [added, onWatchlistChange, symbol]);

  return (
    <div className="w-full flex items-center justify-between">
        <div className='flex-1'>
            <div className="text-sm text-zinc-400">{company}</div>
            <div className="font-semibold text-lg">{symbol.toUpperCase()}</div>
        </div>

        <div className="flex-1 flex justify-end">
            <button
                type="button"
                onClick={toggle}
                className={`watchlist-icon-btn inline-flex gap-2 px-20 py-2 rounded-md text-sm font-medium transition-colors 
                ${added ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}`}
                aria-pressed={added}
            >
                {added ? 'In Watchlist' : 'Add'}
            </button>
        </div>

    </div>
  );
};

export default WatchlistButton;
