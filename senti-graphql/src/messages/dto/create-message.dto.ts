import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMessageDto {
    @Field(() => ID)
    sessionId: string;

    @Field(() => String)
    content: string;

    @Field(() => String)
    model: string;
}