export interface IConfig {
    port: number;
    prettyLog: boolean;
}

const config = {
    port: process.env.NODE_PORT || 3000,
    prettyLog: process.env.NODE_ENV === 'development',
    knex: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_DATABASE || 'test',
        },
        useNullAsDefault: true,
        migrations: {
            directory: './migrations',
        },
    },
};

export { config };
