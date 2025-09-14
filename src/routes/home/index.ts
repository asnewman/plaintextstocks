import type { RouteResponse } from '../../shared/types';
import { asyncPipe } from '../../shared/transformers/asyncPipe';
import { initializeContext } from './helpers/initializeContext';
import { fetchMarketData } from './helpers/fetchMarketData';
import { buildHeader } from './helpers/buildHeader';
import { buildMarketStats } from './helpers/buildMarketStats';
import { buildFooter } from './helpers/buildFooter';
import { generateResponse } from './helpers/generateResponse';

// Beautiful flat chaining - each function is completely self-contained
// No function calls another function - everything is inline
export const handleHomeRoute = (): Promise<RouteResponse> =>
  asyncPipe(
    initializeContext(),
    fetchMarketData,
    buildHeader,
    buildMarketStats,
    buildFooter,
    generateResponse
  )(null);