import {Position} from "../common/interfaces/position.interface";

export interface GetCharacterReturn {
    id: string;
    name: string;
    state: CharacterState;
    position: Position;
    bearing: number;
}

export enum CharacterState {
    Roam, Wait, CarArrived, Ride, TripFinished
}

export interface CreateCharacterReturn {
    id: string;
}

export interface CreateCharacter {
    name: string;
    bearing: number;
}

export interface EditLocation {
    characterId: string;
    position: Position;
    bearing: number;
}

export interface EditLocationReturn {
    success: boolean;
}