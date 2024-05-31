import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodObject<any>) {}

    transform(value: unknown) {
        const parsed = this.schema.safeParse(value);

        if (!parsed.success) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            throw new BadRequestException(parsed.error.issues.map((issue) => issue.message).join('; '));
        }

        return parsed.data;
    }
}
