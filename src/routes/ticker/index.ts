import type { RouteResponse } from '../../shared/types';
import { asyncPipe } from '../../shared/transformers/asyncPipe';
import { initializeContext } from './helpers/initializeContext';
import { validateAndNormalize } from './helpers/validateAndNormalize';
import { fetchStockData } from './helpers/fetchStockData';
import { buildHeader } from './helpers/buildHeader';
import { buildPriceLine } from './helpers/buildPriceLine';
import { buildChangeLine } from './helpers/buildChangeLine';
import { buildPercentChangeLine } from './helpers/buildPercentChangeLine';
import { buildVolumeLine } from './helpers/buildVolumeLine';
import { buildDayRangeLine } from './helpers/buildDayRangeLine';
import { buildMarketCapLine } from './helpers/buildMarketCapLine';
import { buildPELine } from './helpers/buildPELine';
import { buildFiftyTwoWeekRangeLine } from './helpers/buildFiftyTwoWeekRangeLine';
import { generateResponse } from './helpers/generateResponse';

// Beautiful flat chaining - each function is completely self-contained
// No function calls another function - everything is inline
export const handleTickerRoute = (ticker: string): Promise<RouteResponse> =>
  asyncPipe(
    initializeContext(ticker),
    validateAndNormalize,
    fetchStockData,
    buildHeader,
    buildPriceLine,
    buildChangeLine,
    buildPercentChangeLine,
    buildVolumeLine,
    buildDayRangeLine,
    buildMarketCapLine,
    buildPELine,
    buildFiftyTwoWeekRangeLine,
    generateResponse
  )(null);
