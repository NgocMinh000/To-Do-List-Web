import mongoose from 'mongoose';

const dbConfig = {
    connectionString: 'mongodb+srv://vuducluong12a:123@cluster0.kznsm.mongodb.net', // Địa chỉ MongoDB Atlas của bạn
    dbName: 'database', // Tên cơ sở dữ liệu bạn muốn kết nối
};

// const dbConfig = {
//     connectionString: 'mongodb://localhost:27017',
//     dbName: 'ToDoListDB',
// }; 

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
