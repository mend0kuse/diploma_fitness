import { PipeTransform } from '@nestjs/common';
import { ZodObject } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodObject<any>);
    transform(value: unknown): {
        [x: string]: any;
    };
}
