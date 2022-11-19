import { Injectable } from '@nestjs/common';
import {GetCarDto} from "./car.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Car, CarDocument} from "../common/schemas/car.schema";
import {Model} from "mongoose";
import {plainToClass} from "class-transformer";
import {HttpService} from "@nestjs/axios";
import {CarState, UPDATE_DISTANCE} from "./car.interface";
import {Position} from "../common/interfaces/position.interface";
import {Trip, TripDocument} from "../common/schemas/trip.schema";
import {Character, CharacterDocument} from "../common/schemas/character.schema";
import {CharacterState} from "../character/character.interface";
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class CarService {
    constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>,
                @InjectModel(Trip.name) private  tripModel: Model<TripDocument>,
                @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
                private httpService: HttpService) {}


    private RoutingEngineURL = "http://127.0.0.1:5000/" //"http://20.79.222.49:5000/"

    public async getAll() : Promise<GetCarDto[]> {
        const models = await this.carModel.find().lean();

        return models.map(model => plainToClass(GetCarDto, model, { excludeExtraneousValues: true }));
    }

    public async get(id: string): Promise<GetCarDto> {
        const model = await this.carModel.findOne({ _id: id });
        return plainToClass(GetCarDto, model, { excludeExtraneousValues: true });
    }

    public async addRandomCars(n : number) {
        const options = {
            headers: {'Content-Type': 'application/json'}
        }
        const res = await lastValueFrom(this.httpService.post(this.RoutingEngineURL + "get_random_car_positions", JSON.stringify(n), options).pipe(
            map(res => {return res})
        ))
        for(let pos of res.data) {
            const model = new this.carModel({ position: { latitude: pos[0], longitude: pos[1] }, state: CarState.Free, distance: 0 });
            await model.save();
        }
    }

    public async updateCars() {
        const models = await this.carModel.find();
        for(const car of models) {
            if(car.state == CarState.Free && (!car.route || car.route.length === 0 || car.distance >= car.routeDistance)) {
                const routeData = await this.getRandomRoute(car.position);
                car.route = routeData.route;
                car.distance = 0;
                car.routeDistance = routeData.routeDistance;
                await car.save();
            }
            if(car.state == CarState.DrivingToCustomer) {
                console.log(car.distance + " " + car.routeDistance);
            }
            if(car.state == CarState.DrivingToCustomer && car.distance >= car.routeDistance) {
                const trip = await this.tripModel.findOne({carId: car._id}).lean();
                const characterId = trip.characterId;
                const character = await this.characterModel.findOne({_id : characterId});
                console.log(character._id);
                console.log(car.state);
                console.log(character.state)
                car.state = CarState.WaitingForCustomer;
                character.state = CharacterState.CarArrived;
                await character.save();
                await car.save();
                console.log(character.state);
                console.log(car.state);
            }
            if(car.state == CarState.PrivateRide && car.distance >= car.routeDistance) {
                const trip = await this.tripModel.findOne({carId: car._id}).lean();
                const characterId = trip.characterId;
                const character = await this.characterModel.findOne({_id : characterId});
                car.state = CarState.Arrived;
                character.state = CharacterState.TripFinished;
                await character.save();
                await car.save();
            }
        }
        await this.getPositionAlongRoute(models)
    }

    private async getRandomRoute(current: Position): Promise<{route : Position[], routeDistance: number}> {
        const options = {
            headers: {'Content-Type': 'application/json'}
        }
        const response = await lastValueFrom(this.httpService.post(this.RoutingEngineURL + "route_a_random",
            [current.latitude, current.longitude], options).pipe(
                map(res => {return res})
            ));
        return { route: response.data.route, routeDistance: response.data.routeDistance };
    }

    private async getPositionAlongRoute(models) : Promise<Position> {
        const options = {
            headers: {'Content-Type': 'application/json'}
        }
        let data = [];
        let shortRouteData = [];
        for(let i = 0 ; i < models.length; i++) {
            if(models[i].state == CarState.DrivingToCustomer || models[i].state == CarState.PrivateRide) {
                shortRouteData.push( { route: models[i].route, distanceFrom: models[i].distance,
                    distanceTo: models[i].routeDistance } );
            }
            data.push({route : models[i].route, distance: models[i].distance});
        }
        const response = await lastValueFrom(this.httpService.post(this.RoutingEngineURL + "get_position_along_route",
            data, options).pipe(
                map(res => {return res})
            ));

        const cutRouteResponse = await lastValueFrom(this.httpService.post(this.RoutingEngineURL + "cut_route",
            shortRouteData, options).pipe(
                map(res => {return res})
            ));
        models.map(model => model.distance += UPDATE_DISTANCE);
        let j = 0;
        for(let i = 0; i < models.length; ++i ) {
            models[i].position = { latitude: response.data[i][0], longitude: response.data[i][1] }
            if(models[i].state == CarState.DrivingToCustomer || models[i].state == CarState.PrivateRide) {
                models[i].shortRoute = cutRouteResponse.data[j];
                j++;
            }

            await models[i].save();
        }
        return { latitude: response.data[0], longitude: response.data[1] }
    }

}
