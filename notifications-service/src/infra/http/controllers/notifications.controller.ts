import { Body, Controller, Post, Param, Patch, Get } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/errors/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/errors/cancel-notification';
import { ReadNotification } from '@application/use-cases/errors/read-notification';
import { UnreadNotification } from '@application/use-cases/errors/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/errors/count-recipient-notifications';
import { GetRecipientNotification } from '@application/use-cases/errors/get-recipient-notifications';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}

    @Patch(':id/cancel')
    async cancel(@Param('id') id: string) {
      await this.cancelNotification.execute({
        notificationId: id,
      })
    }

    @Get('count/from/:recipientId')
    async countFromRecipient(@Param('recipientId') recipientId: string): Promise<{ count: number}> {
      const { count } = await this.countRecipientNotifications.execute({
        recipientId,
      })

      return {
        count,
      }
    }

    @Get('from/:recipientId')
    async getFromRecipient(@Param('recipientId') recipientId: string) {
      const { notifications } = await this.getRecipientNotification.execute({
        recipientId,
      })

      return {
        notifications: notifications.map(NotificationViewModel.toHTTP),
      }
    }

    @Patch(':id/read')
    async read(@Param('id') id: string) {
      await this.readNotification.execute({
        notificationId: id,
      });
    }

    @Patch(':id/unread')
    async unread(@Param('id') id: string) {
      await this.unreadNotification.execute({
        notificationId: id,
      });
    }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })

    return { 
      notification: NotificationViewModel.toHTTP(notification),
      

    };


  }
}


