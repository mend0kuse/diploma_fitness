import { NotFoundException } from '@nestjs/common/exceptions';
import {
    Body,
    Controller,
    Get,
    Param,
    ParseFilePipeBuilder,
    ParseIntPipe,
    Patch,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { RequestWithUser } from './user';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { makeImagePath } from '../shared/lib/makeImagePath';
import { Profile } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Patch('profile')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar', { dest: 'uploads/' }))
    updateProfile(
        @Req() request: RequestWithUser,
        @Body() dto: Profile,
        @UploadedFile(
            new ParseFilePipeBuilder().build({
                fileIsRequired: false,
            })
        )
        file?: Express.Multer.File
    ) {
        return this.userService.updateProfile({
            email: request.user?.email,
            profile: { ...dto, avatar: file ? makeImagePath(file) : undefined },
        });
    }

    @Get('trainer')
    async getTrainers() {
        return this.userService.getMany({ where: { role: { equals: 'trainer' } } });
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        const found = await this.userService.getOne({ id });

        if (!found) {
            throw new NotFoundException();
        }

        return excludeFields(found, ['password']);
    }
}
