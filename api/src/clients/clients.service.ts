import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients } from "./clients.entity";
import { UpdateResult, DeleteResult } from "typeorm";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private clientRepository: Repository<Clients>,
  ) {}

  async create(client: Clients): Promise<Clients> {
    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Clients[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number) {
    return await this.clientRepository.findOne(id);
  }

  async update(client: Clients): Promise<UpdateResult> {
    return await this.clientRepository.update(client.clientsId, client);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.clientRepository.delete(id);
  }
}
