import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import route  from './src/routes/router.ts';



const app = new Application();
const port = 3000;

app.use(route.routes());
app.use(route.allowedMethods());

console.log(`Server is running : http://localhost:${port} `);
await app.listen({ port });