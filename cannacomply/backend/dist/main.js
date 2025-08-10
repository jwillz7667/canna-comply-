"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
        .split(',')
        .map(s => s.trim());
    app.enableCors({
        origin: allowed,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant'],
        exposedHeaders: [],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new http_exception_filter_1.HttpErrorFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    const port = Number(process.env.PORT || 4000);
    await app.listen(port);
    process.stdout.write(`API listening on http://localhost:${port}\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map