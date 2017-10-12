import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as mongoose from "mongoose";

import { Match, MatchModel } from "./model/match";

const app = new Koa();
const router = new Router({ prefix: "/api" });

mongoose.connect("mongodb://localhost:27017/test", { useMongoClient: true });

mongoose.connection.once('open', () => {
  console.log('connection opened');
});

router
  .post("/match", ctx => {
    const match = new MatchModel(ctx.request.body);
    match.save();
    ctx.body = match;
  });

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

console.log('Application is up and running on port 3000');
