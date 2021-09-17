import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions, createConnections } from 'typeorm';

@Module({})
export class DatabaseModule {
    static register(options: ConnectionOptions[]) : DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: createConnections(options),
                }
            ]
        }
    }
}
