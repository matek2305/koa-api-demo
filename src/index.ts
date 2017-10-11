import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

router
  .get("/", ctx => {
    ctx.body = "Hello World";
  });

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

console.log('Application is up and running on port 3000');
