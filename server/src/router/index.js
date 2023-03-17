import borrowerRouter from "./borrower-router.js";
import loanRouter from "./loan-router.js";
import userRouter from "./user-router.js";

const routers = [userRouter, loanRouter, borrowerRouter];
export default routers;
