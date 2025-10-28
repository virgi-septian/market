import { connectToDatabase } from "./mongoose";

(async () => {
  try {
    await connectToDatabase();
    console.log('✅ MongoDB connection successful');
    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB connection failed', err);
    process.exit(1);
  }
})();