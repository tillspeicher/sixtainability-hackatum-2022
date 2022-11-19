import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Position} from "../interfaces/position.interface";
import {TripState} from "../../trip/trip.interface";

export type TripDocument = Trip & Document;

@Schema()
export class Trip {

    @Prop({ type: {}})
    start: Position;

    @Prop( { type : {}})
    destination: Position;

    @Prop( { type : {}})
    currentPosition: Position;

    @Prop()
    characterId: string;

    @Prop()
    carId: string;

    @Prop()
    tripState: TripState;

}

export const TripSchema = SchemaFactory.createForClass(Trip);