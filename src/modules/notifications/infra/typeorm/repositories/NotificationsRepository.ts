import { MongoRepository } from "typeorm";

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";

import Notification from "../schemas/Notification";
import { MongoDataSource } from "@shared/infra/typeorm/index";

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = MongoDataSource.getMongoRepository(Notification);
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
