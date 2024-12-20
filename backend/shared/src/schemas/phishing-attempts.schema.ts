import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhishingAttemptDocument = PhishingAttempt & Document;

export enum PhishingAttemptStatus {
  Failed = 'failed',
  Pending = 'pending',
  Sent = 'sent',
  Clicked = 'clicked',
}

@Schema({
  collection: 'phishingAttempts',
})
export class PhishingAttempt {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  emailContent: string;
  @Prop({
    required: true,
    enum: PhishingAttemptStatus,
    default: PhishingAttemptStatus.Pending,
  })
  status: PhishingAttemptStatus;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);
