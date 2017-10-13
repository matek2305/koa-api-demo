import { prop, arrayProp, Typegoose, Ref, pre } from "typegoose";

enum Status {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

class Score {

  @prop()
  homeTeam?: number;

  @prop()
  awayTeam?: number;
}

class ObjectMetadata {

  @prop({ required: true })
  createdAt: Date;

  @prop({ required: true })
  lastUpdateAt: Date;
}

class Prediction {

  @prop({ required: true })
  who: string;

  // @prop()
  // metadata?: ObjectMetadata;
}

@pre<Match>("save", function(next) {
  this.metadata.createdAt = new Date();
  this.metadata.lastUpdateAt = new Date();
  next();
})
export class Match extends Typegoose {

  @prop({ required: true })
  homeTeamName: string;

  @prop({ required: true })
  awayTeamName: string;

  @prop({ required: true })
  startDate: Date;

  @prop({ enum: Status, required: true, default: Status.NEW })
  status: Status;

  @prop()
  description?: string;

  @prop()
  result?: Score;

  @arrayProp({ items: Prediction })
  predictions: Ref<Prediction>[];

  @prop()
  metadata?: ObjectMetadata;
}

export const MatchModel = new Match().getModelForClass(Match);
