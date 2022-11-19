import {Controller, Get, Param, Post} from '@nestjs/common';
import {GetCar} from "./car.interface";
import {CarService} from "./car.service";
import {GetCarDto} from "./car.dto";
import {ApiResponse} from "@nestjs/swagger";

@Controller('car')
export class CarController {

    constructor(private carService: CarService){}

    @ApiResponse({ status: 201, type:[GetCarDto] })
    @Get()
    getAll(): Promise<GetCarDto[]> {
        return this.carService.getAll()
    }

    @ApiResponse({ status: 201, type:GetCarDto })
    @Get(':id')
    get(@Param('id')id: string) : Promise<GetCarDto> {
        return this.carService.get(id);
    }

    @ApiResponse({ status: 201 })
    @Post("init-cars")
    addCars() {
        return this.carService.addRandomCars(1);
    }

    @ApiResponse( { status: 201 })
    @Post("update-cars")
    updateCars() {
        return this.carService.updateCars();
    }
}
