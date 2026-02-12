import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';

@Module({
    imports: [],
    providers: [CommunicationService],
    controllers: [],
    exports: [CommunicationService]
})
export class CommunicationModule {}
