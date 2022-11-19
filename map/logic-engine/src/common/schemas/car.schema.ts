import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {CarState} from "../../car/car.interface";
import {Position} from "../interfaces/position.interface";

export type CarDocument = Car & Document;

@Schema()
export class Car {

    @Prop({ type: {}})
    position: Position;

    @Prop()
    state: CarState;

    @Prop({ type: [{}]})
    route: Position[]

    @Prop()
    distance: number;

    @Prop()
    routeDistance: number;

    @Prop()
    assignedTo: string;

    @Prop({ type : [{}]})
    shortRoute: Position[]

    @Prop()
    assignedToId: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);