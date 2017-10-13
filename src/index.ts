import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as mongoose from "mongoose";

import { Match, MatchModel } from "./model";

const app = new Koa();
const router = new Router({ prefix: "/api" });

(<any>mongoose).Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test", { useMongoClient: true });

mongoose.connection.once('open', () => {
  console.log('connection opened');
});

router

  .post("/match", async ctx => {
    console.log("Received request:\n" + JSON.stringify(ctx.request.body, null, 2));

    const match = new MatchModel(ctx.request.body);
    console.log("\nAfter mapping:\n" + JSON.stringify(match, null, 2));

    await match.save();
    ctx.body = match;
    ctx.status = 201;
  })

  .get("/match/:id", async ctx => {
    const match = await MatchModel.findById(ctx.params.id);
    ctx.body = match;
  })

  .put("/match/:id", async ctx => {
    await MatchModel.update({ _id: ctx.params.id }, ctx.request.body);
    ctx.body = await MatchModel.findById(ctx.params.id);
  });

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

console.log('Application is up and running on port 3000');
