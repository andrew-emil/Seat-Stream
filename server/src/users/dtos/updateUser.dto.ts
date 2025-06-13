import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./createUser.dto";
import { ApiExtraModels, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@ApiExtraModels(CreateUserDto)
export class UpdateUserDto extends PartialType(CreateUserDto) {}
