import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {TripService} from "./trip.service";
import {CreateTripDto, CreateTripReturnDto, GetInDto, GetOutDto, GetTripReturnDto} from "./trip.dto";
import {ApiResponse} from "@nestjs/swagger";

@Controller('trip')
export class TripController {
    constructor(private tripService: TripService) {}


    @ApiResponse({ status: 201, type: CreateTripReturnDto })
    @Post()
    createTrip(@Body() body: CreateTripDto ): Promise<CreateTripReturnDto> {
        return this.tripService.createTrip(body);
    }

    @ApiResponse( { status: 201, type: [GetTripReturnDto] })
    @Get()
    getAll(): Promise<GetTripReturnDto[]> {
        return this.tripService.getAllTrips();
    }

    @ApiResponse( { status: 201, type: GetTripReturnDto })
    @Get(':id')
    get(@Param('id') id: string) : Promise<GetTripReturnDto> {
        return this.tripService.getTrip(id);
    }

    @ApiResponse( { status: 201 })
    @Post("get-in")
    getIn(@Body() getInDto : GetInDto) {
        return this.tripService.getIn(getInDto);
    }

    @ApiResponse( { status: 201 })
    @Post("get-out")
    getOut(@Body() getOutDto : GetOutDto) {
        return this.tripService.getOut(getOutDto);
    }

}
