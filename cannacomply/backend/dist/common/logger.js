"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = require("pino");
const isProd = process.env.NODE_ENV === 'production';
exports.logger = (0, pino_1.default)(isProd
    ? { level: 'info' }
    : {
        level: 'debug',
        transport: {
            target: 'pino-pretty',
            options: { colorize: true, translateTime: 'SYS:standard' },
        },
    });
//# sourceMappingURL=logger.js.map