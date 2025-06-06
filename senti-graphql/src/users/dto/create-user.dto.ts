import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
    @Field(() => String)
    name: string;
  
    @Field(() => String)
    email: string;
  
    @Field({ nullable: true })
    avatar?: string;
    
    @Field({ nullable: true })
    googleId?: string;
}