import dotenv from 'dotenv';
dotenv.config();

const CORSsetting = () => {
    const corsOptions = {
        origin: process.env.REACTURL,
        methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        allowedHeaders: 'X-Requested-With,content-type, Authorization',
        credentials: true
    };
    return corsOptions;
}

export default {
    CORSsetting
}