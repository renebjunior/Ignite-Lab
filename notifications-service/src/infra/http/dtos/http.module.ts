import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/errors/send-notification';
import { DatabaseModule } from 'src/infra/database/database.module';
import { NotificationController } from '@infra/http/controllers/notifications.controller';
import { CancelNotification } from '@application/use-cases/errors/cancel-notification';
import { CountRecipientNotification } from '@application/use-cases/errors/count-recipient-notifications';
import { GetRecipientNotification } from '@application/use-cases/errors/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/errors/read-notification';
import { UnreadNotification } from '@application/use-cases/errors/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotification, CancelNotification, CountRecipientNotification, GetRecipientNotification, ReadNotification, UnreadNotification,
  ],
})
export class HttpModule {}
