import {Position} from "../common/interfaces/position.interface";

export interface GetCar {
    id: string;
    position: Position;
    state: CarState;
    shortRoute: number[][];
}

export enum CarState {
    Free, PrivateRide, PublicRide, Arrived, WaitingForCustomer, DrivingToCustomer
}

export const UPDATE_DISTANCE = 75;