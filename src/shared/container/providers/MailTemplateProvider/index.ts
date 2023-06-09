import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HbsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HbsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
