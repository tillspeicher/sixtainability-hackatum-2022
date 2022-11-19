import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { CharacterModule } from './character/character.module';
import {MongooseModule} from "@nestjs/mongoose";
import { TripModule } from './trip/trip.module';
@Module({
  imports: [CarModule, CharacterModule, MongooseModule.forRoot('mongodb://localhost/test'), TripModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
