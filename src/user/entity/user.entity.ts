import { IsEmail, IsString } from "class-validator";
import { BaseModel } from "src/common/base/entity.base";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Entity()
export class UserModel extends BaseModel {

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    profileImg: string;

    @Column()
    @IsString()
    accessToken: string;


}