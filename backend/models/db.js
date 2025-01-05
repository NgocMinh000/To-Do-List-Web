import mongoose from 'mongoose';

const dbConfig = {
    connectionString: 'mongodb+srv://vuducluong12a:123@cluster0.kznsm.mongodb.net', 
    dbName: 'database',
};

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(`${dbConfig.connectionString}/${dbConfig.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        throw error;
    }
};

export { connectToMongoDB };
