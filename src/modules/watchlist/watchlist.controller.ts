import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt_guard';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async creatAsset(@Body() assetDto: WatchlistDTO, @Req() req) {
    const user = req.user;
    return await this.watchlistService.createAsset(user, assetDto)
  }

  @Get('get_all')
  getAllAssets() {
    return;
  }

  @Patch('update')
  updateAsset() {
    return;
  }

  @Delete()
  deleteAsset(@Query('id') id: Number ) {
    return;
  }
}
