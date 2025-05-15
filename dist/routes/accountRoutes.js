"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController_1 = require("../controllers/accountController");
const router = express_1.default.Router();
router.post('/accounts', accountController_1.registerAccount);
router.get('/accounts/:id/balance', accountController_1.checkBalance);
router.post('/accounts/:id/deposit', accountController_1.deposit);
router.post('/accounts/:id/withdraw', accountController_1.withdraw);
router.post('/accounts/:id/transfer', accountController_1.transfer);
router.get('/accounts/:id/transactions', accountController_1.transactionHistory);
exports.default = router;
