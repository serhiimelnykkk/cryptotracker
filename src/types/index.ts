export interface ExchangeInfo {
  exchangeFilters: string[];
  rateLimits: RateLimit[];
  serverTime: number;
  assets: ExchangeInfoAsset[];
  symbols: Symbol[];
  timezone: string;
}

export interface Symbol {
  symbol: string;
  pair: string;
  contractType: string;
  deliveryDate: number;
  onboardDate: number;
  status: string;
  maintMarginPercent: string;
  requiredMarginPercent: string;
  baseAsset: string;
  quoteAsset: string;
  marginAsset: string;
  pricePrecision: number;
  quantityPrecision: number;
  baseAssetPrecision: number;
  quotePrecision: number;
  underlyingType: string;
  underlyingSubType: string[];
  settlePlan: number;
  triggerProtect: string;
  filters: Filter[];
  OrderType: string[];
  timeInForce: string[];
  liquidationFee: string;
  marketTakeBound: string;
}

interface Filter {
  filterType: string;
  maxPrice?: string;
  minPrice?: string;
  tickSize?: string;
  maxQty?: string;
  minQty?: string;
  stepSize?: string;
  limit?: number;
  notional?: string;
  multiplierUp?: string;
  multiplierDown?: string;
  multiplierDecimal?: string;
}

interface ExchangeInfoAsset {
  asset: string;
  marginAvailable: boolean;
  autoAssetExchange?: string;
}

interface RateLimit {
  interval: string;
  intervalNum: number;
  limit: number;
  rateLimitType: string;
}

export interface Asset {
  coin: string;
  quantity: number;
}
