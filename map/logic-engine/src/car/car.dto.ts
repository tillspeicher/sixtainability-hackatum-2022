import {CarState, GetCar} from "./car.interface";
import {ApiProperty} from "@nestjs/swagger";
import {Position} from "../common/interfaces/position.interface";
import {Expose, Transform} from "class-transformer";
import {Prop} from "@nestjs/mongoose";

export class GetCarDto implements GetCar {

    @Transform(({value, key, obj, type}) => `${obj._id}`)
    @Expose()
    @ApiProperty()
    readonly id: string;

    @Expose()
    @ApiProperty()
    readonly position: Position;

    @Expose()
    @ApiProperty()
    readonly state: CarState;

    // @Transform(({value,key,obj,type}) => )
    @Expose()
    @ApiProperty()
    readonly shortRoute: number[][];

    @Expose()
    @ApiProperty()
    readonly assignedTo: string;

    @Expose()
    @ApiProperty()
    readonly assignedToId: string;

}