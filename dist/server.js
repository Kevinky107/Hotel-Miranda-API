"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app_1.app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
