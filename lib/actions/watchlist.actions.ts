'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/model/watchlist.model';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  try {
    // Connect to database
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    
    if (!db) throw new Error('Database connection failed');

    // Find user by email
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return [];
    }

    // Query watchlist items for user
    const watchlistItems = await Watchlist.find({ userId: user.id }, { symbol: 1, _id: 0 });
    
    // Extract and return just the symbols
    return watchlistItems.map(item => item.symbol);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
}