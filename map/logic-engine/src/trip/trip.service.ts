import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTripDto, CreateTripReturnDto, GetInDto, GetOutDto, GetTripReturnDto} from "./trip.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Trip, TripDocument} from "../common/schemas/trip.schema";
import {Model} from "mongoose";
import {Character, CharacterDocument} from "../common/schemas/character.schema";
import {TripState} from "./trip.interface";
import {plainToClass} from "class-transformer";
import {Position} from "../common/interfaces/position.interface";
import {HttpService} from "@nestjs/axios";
import {Car, CarDocument} from "../common/schemas/car.schema";
import {CarState} from "../car/car.interface";
import {CharacterState} from "../character/character.interface";
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class TripService {

    private RoutingEngineURL = "http://127.0.0.1:5000" //"http://20.79.222.49:5000/"

    constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>,
                @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
                @InjectModel(Car.name) private carModel: Model<CarDocument>,
                private httpService: HttpService) {
    }

    public async createTrip(dto: CreateTripDto): Promise<CreateTripReturnDto> {
        const passenger = await this.characterModel.findOne({_id: dto.characterId});
        const chosenCarId = await this.findClosestCar(dto.destination)
        const createdTrip = new this.tripModel({
            characterId: dto.characterId,
            destination: dto.destination,
            carId: chosenCarId,
            currentPosition: passenger.position,
            start: passenger.position,
            tripState: TripState.Booked
        });
        const result = await createdTrip.save()
        const chosenCar = await this.carModel.findOne({ _id : chosenCarId });
        const routeData = await this.getRoute(chosenCar.position, passenger.position);
        chosenCar.route = routeData.route;
        chosenCar.state = CarState.DrivingToCustomer;
        chosenCar.distance = 0;
        chosenCar.routeDistance = routeData.routeDistance;
        await chosenCar.save();
        passenger.state = CharacterState.Wait;
        await passenger.save();
        return {
            estimatedTime: 0,
            id: result._id
        }
    }

    public async getTrip(id: string): Promise<GetTripReturnDto> {
        const model = await this.tripModel.findOne({_id: id})
        return plainToClass(GetTripReturnDto, model, {excludeExtraneousValues: true});
    }

    public async getAllTrips(): Promise<GetTripReturnDto[]> {
        const models = await this.tripModel.find().lean();
        return models.map(model => plainToClass(GetTripReturnDto, model, {excludeExtraneousValues: true}));
    }

    private async getRoute(start: Position, destination: Position) {
        const response = await lastValueFrom(this.httpService.post(this.RoutingEngineURL + "route_a_b",
            { start: [ start.latitude, start.longitude ], destination: [ destination.latitude, destination.longitude ]}).pipe(
                map(res => {return res})
            ));
        return response.data;
    }

    private async findClosestCar(destination: Position) {
        const models = await this.carModel.find({ state: CarState.Free }).lean();
        if(models.length == 0) throw new NotFoundException()
        const cars = []
        for(let i = 0; i < models.length; i++) {
            cars.push({ id: models[i]._id , position: [models[i].position.latitude, models[i].position.longitude] })
        }
        const body = {
            cars: cars, destination: [destination.latitude, destination.longitude]
        }
        const response = await lastValueFrom(this.httpService.post(this.RoutingEngineURL + "choose_car", body).pipe(
            map(res => {return res})
        ));
        return response.data;
    }

    public async getIn(dto: GetInDto) {
        const trip = await this.tripModel.findOne({ _id : dto.tripId }).lean();
        const carId = trip.carId;
        const car = await this.carModel.findOne({ _id: carId });
        car.state = CarState.PrivateRide;
        const routeData = await this.getRoute(car.position, trip.destination);
        car.route = routeData.route;
        car.distance = 0;
        car.routeDistance = routeData.routeDistance;
        const character = await this.characterModel.findOne( { _id: dto.characterId });
        car.assignedTo = character.name;
        car.assignedToId = character._id;
        character.state = CharacterState.Ride;
        await character.save();
        await car.save();
        return { success: true };
    }

    public async getOut(dto : GetOutDto) {
        const trip = await this.tripModel.findOne({ _id : dto.tripId }).lean();
        const carId = trip.carId;
        const car = await this.carModel.findOne({ _id: carId });
        car.state = CarState.Free;
        car.route = null;
        const character = await this.characterModel.findOne( { _id: dto.characterId });
        car.assignedTo = null;
        car.assignedToId = null;
        character.state = CharacterState.Roam;
        character.position = car.position;
        await character.save();
        await car.save();
        return { success: true };
    }
}
