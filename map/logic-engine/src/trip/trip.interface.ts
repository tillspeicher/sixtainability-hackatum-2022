import {Position} from "../common/interfaces/position.interface";

export interface CreateTrip {
    characterId: string;
    destination: Position;
}

export interface CreateTripReturn {
    id: string;
    estimatedTime: number;
}

export interface GetTripReturn {
    id: string;
    characterId: string;
    start:Position;
    destination:Position;
    currentPosition: Position;
    tripState: TripState

}

export enum TripState {
    Booked, InProgress, Complete
}

export interface GetIn {
    characterId: string;
    tripId: string;
}

export interface GetOut {
    characterId: string;
    tripId:string
}