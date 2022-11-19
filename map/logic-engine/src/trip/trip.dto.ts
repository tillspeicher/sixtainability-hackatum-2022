import {CreateTrip, CreateTripReturn, GetIn, GetTripReturn, TripState} from "./trip.interface";
import {Position} from "../common/interfaces/position.interface";
import {ApiProperty} from "@nestjs/swagger";
import {Expose, Transform} from "class-transformer";

export class CreateTripDto implements CreateTrip {
    @ApiProperty()
    readonly characterId: string;
    @ApiProperty()
    readonly destination: Position;

}

export class CreateTripReturnDto implements CreateTripReturn {

    @ApiProperty()
    readonly estimatedTime: number;

    @ApiProperty()
    readonly id: string;

}

export class GetTripReturnDto implements GetTripReturn {
    @ApiProperty()
    @Expose()
    @Transform(({value,key,obj, type}) => `${obj._id}`)
    id: string;

    @ApiProperty()
    @Expose()
    currentPosition: Position;

    @ApiProperty()
    @Expose()
    destination: Position;

    @ApiProperty()
    @Expose()
    characterId: string;

    @ApiProperty()
    @Expose()
    start: Position;

    @ApiProperty()
    @Expose()
    tripState: TripState;

}

export class GetInDto implements  GetIn {

    @ApiProperty()
    @Expose()
    readonly characterId: string;

    @ApiProperty()
    @Expose()
    readonly tripId: string;

}

export class GetOutDto implements GetIn {

    @ApiProperty()
    @Expose()
    readonly characterId: string;


    @ApiProperty()
    @Expose()
    readonly tripId: string;

}