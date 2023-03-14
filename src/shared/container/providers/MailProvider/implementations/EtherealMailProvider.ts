import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import { text } from 'express';
import AppError from '@shared/errors/AppError';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail(to: string, body: string): Promise<string> {
        const message = await this.client.sendMail({
            from: 'Equipe Virtumed  <humberto.araripe12@gmail.com>',
            to,
            subject: 'Recupração de senha',
            text: body,
        });

        console.log(message.messageId);
        const value = nodemailer.getTestMessageUrl(message);

        if(!value){
            throw new AppError("Ocoreu um erro")
        }

        return value
    }
}
