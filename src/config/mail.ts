interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER,
    defaults: {
        from: {
            email: 'humberto.araripe12@gmail.com',
            name: 'Humberto Henrique',
        },
    },
} as IMailConfig;
