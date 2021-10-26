import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { Clients } from "./clients.entity";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  index(): Promise<Clients[]> {
    return this.clientsService.findAll();
  }

  @Get(":id")
  async get(@Param("id") id, @Body() clientData: Clients): Promise<any> {
    return this.clientsService.findOne(id);
  }

  @Post("create")
  async create(@Body() clientData: Clients): Promise<any> {
    return this.clientsService.create(clientData);
  }

  @Put(":id")
  async update(@Param("id") id, @Body() clientData: Clients): Promise<any> {
    clientData.clientsId = Number(id);
    return this.clientsService.update(clientData);
  }

  @Delete(":id")
  async delete(@Param("id") id): Promise<any> {
    return this.clientsService.delete(id);
  }
}
