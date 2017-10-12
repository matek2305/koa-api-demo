import { prop, Typegoose } from "typegoose";

export class Match extends Typegoose {

  @prop({ required: true })
  homeTeamName: string;

  @prop({ required: true })
  awayTeamName: string;

  @prop({ required: true })
  startDate: Date;

  @prop()
  homeTeamScore?: number;

  @prop()
  awayTeamScore?: number;
}

export const MatchModel = new Match().getModelForClass(Match);
