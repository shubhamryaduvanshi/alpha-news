import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { USER_ROLE } from "../enums/user.enums";
import mongoose from "mongoose";

@Schema()
export class User {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ unique: true })
    mobileNumber?: string;

    @Prop()
    profilePictureUrl?: string;

    @Prop()
    address?: string;

    @Prop({ enum: Object.values(USER_ROLE), default: USER_ROLE.JOURNALIST })
    role?: USER_ROLE;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
