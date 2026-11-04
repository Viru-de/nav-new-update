import {
  Product,
  CompanySettings,
  CategoryBasicRates,
  CompanyGradeBasicRates,
  NanoBananaPostType,
  NanoBananaVerifiedItem,
  NanoBananaGeneratedPost,
} from '../types';
import {
  calculateSimpleFinalRate,
  normalizeGrade,
  resolveProductCategoryBasicRate,
} from '../utils/rateCalculator';
import maaDurgaPortraitUrl from '../assets/images/maa_durga_lion_portrait_1790863911321.jpg';
import steelBuildingUrl from '../assets/images/steel_building_construction_1790863925525.jpg';
import steelPipesUrl from '../assets/images/steel_square_pipes_1790863937734.jpg';
import steelTmtUrl from '../assets/images/steel_tmt_bars_1790863948524.jpg';
import steelChannelsTopUrl from '../assets/images/steel_channels_bundle_top_1790865061499.jpg';
import steelChannelsGreenUrl from '../assets/images/steel_channels_green_ends_1790865075262.jpg';
import steelUChannelsUrl from '../assets/images/steel_uchannels_closeup_1790865086930.jpg';

const NANO_BANANA_HISTORY_KEY = 'navdurga_nano_banana_posts_v1';

export const NANO_BANANA_POST_TYPES: {
  id: NanoBananaPostType;
  label: string;
  shortDesc: string;
}[] = [
  {
    id: 'base-rate',
    label: '1. Medium + SL Base Rate',
    shortDesc:
      'Professional daily price update showing ONLY Medium Base Rate & SL Base Rate (no individual product list).',
  },
  {
    id: 'all-products-price-update',
    label: '2. All Medium + SL Products',
    shortDesc:
      'Complete product price list separated into Medium and SL (Super Light) sections with S.No, Size, Gauge Diff & Final Rate.',
  },
  {
    id: 'festival-price-update',
    label: '3. Festival + Product',
    shortDesc:
      'Recognizable festival theme (Diwali, Ganesh, Holi, Patriotic, Navratri, etc.) combined with verified ERP prices.',
  },
  {
    id: 'medium-price-update',
    label: 'Medium Section Products Only',
    shortDesc:
      'All Medium grade structural steel products with verified Basic Rate + Gauge Diff.',
  },
  {
    id: 'sl-price-update',
    label: 'SL Section Products Only',
    shortDesc:
      'All SL (Super Light) steel channels & structural products with latest ERP rates.',
  },
  {
    id: 'product-update',
    label: 'Single Product Spotlight',
    shortDesc:
      'Dedicated spotlight post for a specific ERP steel product with full rate breakdown.',
  },
  {
    id: 'custom-product-post',
    label: 'Custom Product Bulletin',
    shortDesc:
      'Select custom ERP products & headline while strictly using verified ERP prices.',
  },
];

export type SceneCompositionType =
  | 'molten_furnace_monolith'
  | 'gantry_crane_blueprint'
  | 'royal_arch_stockyard'
  | 'diagonal_forge_cascade'
  | 'skyscraper_truss_command'
  | 'ceremonial_mandap_pavilion'
  | 'twin_pillar_industrial'
  | 'isometric_mill_horizon';

export interface NanoBananaVisualVariation {
  index: number;
  id: string;
  name: string;
  sceneType: SceneCompositionType;
  cardArrangement: 'stacked' | 'side_by_side' | 'staggered_arch' | 'command_vault';
  bgTop: string;
  bgMid: string;
  bgBottom: string;
  headerBg: string;
  accentPrimary: string;
  accentSecondary: string;
  cardBg: string;
  cardBorder: string;
  tableHeaderBg: string;
  tableHeaderText: string;
  rowEvenBg: string;
  rowOddBg: string;
  textPrimary: string;
  textMuted: string;
  priceHighlight: string;
  badgeBg: string;
  badgeText: string;
  isLightMode?: boolean;
}

export const NANO_BANANA_VARIATIONS: NanoBananaVisualVariation[] = [
  {
    index: 0,
    id: 'molten_furnace_monolith',
    name: 'Concept 1: Molten Furnace Pour & Twin Monoliths',
    sceneType: 'molten_furnace_monolith',
    cardArrangement: 'stacked',
    bgTop: '#08142c',
    bgMid: '#0f2547',
    bgBottom: '#060e1f',
    headerBg: '#102a56',
    accentPrimary: '#f59e0b',
    accentSecondary: '#38bdf8',
    cardBg: 'rgba(15, 32, 67, 0.94)',
    cardBorder: '#f59e0b',
    tableHeaderBg: '#1e3a8a',
    tableHeaderText: '#fef08a',
    rowEvenBg: 'rgba(30, 58, 138, 0.36)',
    rowOddBg: 'rgba(15, 23, 42, 0.58)',
    textPrimary: '#ffffff',
    textMuted: '#cbd5e1',
    priceHighlight: '#fde047',
    badgeBg: '#dc2626',
    badgeText: '#ffffff',
  },
  {
    index: 1,
    id: 'gantry_crane_blueprint',
    name: 'Concept 2: Overhead Gantry Crane & Engineering Rig',
    sceneType: 'gantry_crane_blueprint',
    cardArrangement: 'side_by_side',
    bgTop: '#07192f',
    bgMid: '#0c2d48',
    bgBottom: '#051324',
    headerBg: '#0284c7',
    accentPrimary: '#38bdf8',
    accentSecondary: '#facc15',
    cardBg: 'rgba(12, 34, 60, 0.94)',
    cardBorder: '#38bdf8',
    tableHeaderBg: '#0369a1',
    tableHeaderText: '#ffffff',
    rowEvenBg: 'rgba(2, 132, 199, 0.25)',
    rowOddBg: 'rgba(7, 25, 47, 0.62)',
    textPrimary: '#ffffff',
    textMuted: '#bae6fd',
    priceHighlight: '#facc15',
    badgeBg: '#f59e0b',
    badgeText: '#0f172a',
  },
  {
    index: 2,
    id: 'royal_arch_stockyard',
    name: 'Concept 3: Royal Mill Crest Arch & Stockyard Showcase',
    sceneType: 'royal_arch_stockyard',
    cardArrangement: 'staggered_arch',
    bgTop: '#3b0711',
    bgMid: '#5c0c1b',
    bgBottom: '#1f0409',
    headerBg: '#7f1d1d',
    accentPrimary: '#fbbf24',
    accentSecondary: '#fde047',
    cardBg: 'rgba(69, 10, 10, 0.94)',
    cardBorder: '#fbbf24',
    tableHeaderBg: '#991b1b',
    tableHeaderText: '#fef9c3',
    rowEvenBg: 'rgba(127, 29, 29, 0.45)',
    rowOddBg: 'rgba(45, 7, 12, 0.65)',
    textPrimary: '#ffffff',
    textMuted: '#fecaca',
    priceHighlight: '#fde047',
    badgeBg: '#f59e0b',
    badgeText: '#1c1917',
  },
  {
    index: 3,
    id: 'diagonal_forge_cascade',
    name: 'Concept 4: Diagonal Steel Girder Forge & Spark Cascade',
    sceneType: 'diagonal_forge_cascade',
    cardArrangement: 'command_vault',
    bgTop: '#0f172a',
    bgMid: '#1e293b',
    bgBottom: '#090d16',
    headerBg: '#1e293b',
    accentPrimary: '#f97316',
    accentSecondary: '#fbbf24',
    cardBg: 'rgba(15, 23, 42, 0.95)',
    cardBorder: '#f97316',
    tableHeaderBg: '#334155',
    tableHeaderText: '#fed7aa',
    rowEvenBg: 'rgba(51, 65, 85, 0.45)',
    rowOddBg: 'rgba(15, 23, 42, 0.65)',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8',
    priceHighlight: '#fb923c',
    badgeBg: '#ea580c',
    badgeText: '#ffffff',
  },
  {
    index: 4,
    id: 'skyscraper_truss_command',
    name: 'Concept 5: High-Rise Structural Truss & Daylight Bulletin',
    sceneType: 'skyscraper_truss_command',
    cardArrangement: 'stacked',
    bgTop: '#fffbeb',
    bgMid: '#fef3c7',
    bgBottom: '#fde68a',
    headerBg: '#881337',
    accentPrimary: '#b91c1c',
    accentSecondary: '#1d4ed8',
    cardBg: 'rgba(255, 255, 255, 0.97)',
    cardBorder: '#dc2626',
    tableHeaderBg: '#1e293b',
    tableHeaderText: '#facc15',
    rowEvenBg: '#f8fafc',
    rowOddBg: '#ffffff',
    textPrimary: '#0f172a',
    textMuted: '#475569',
    priceHighlight: '#b91c1c',
    badgeBg: '#1e3a8a',
    badgeText: '#ffffff',
    isLightMode: true,
  },
  {
    index: 5,
    id: 'twin_pillar_industrial',
    name: 'Concept 6: Prime Mill Emerald & Twin Pillar Vault',
    sceneType: 'twin_pillar_industrial',
    cardArrangement: 'side_by_side',
    bgTop: '#042f2e',
    bgMid: '#064e3b',
    bgBottom: '#021f1e',
    headerBg: '#047857',
    accentPrimary: '#fbbf24',
    accentSecondary: '#34d399',
    cardBg: 'rgba(6, 55, 48, 0.94)',
    cardBorder: '#fbbf24',
    tableHeaderBg: '#065f46',
    tableHeaderText: '#fef08a',
    rowEvenBg: 'rgba(5, 150, 105, 0.28)',
    rowOddBg: 'rgba(4, 47, 46, 0.65)',
    textPrimary: '#ffffff',
    textMuted: '#a7f3d0',
    priceHighlight: '#fde047',
    badgeBg: '#eab308',
    badgeText: '#064e3b',
  },
  {
    index: 6,
    id: 'isometric_mill_horizon',
    name: 'Concept 7: Architectural Steel Horizon & Platinum Grid',
    sceneType: 'isometric_mill_horizon',
    cardArrangement: 'staggered_arch',
    bgTop: '#f1f5f9',
    bgMid: '#e2e8f0',
    bgBottom: '#cbd5e1',
    headerBg: '#0f172a',
    accentPrimary: '#1d4ed8',
    accentSecondary: '#dc2626',
    cardBg: 'rgba(255, 255, 255, 0.98)',
    cardBorder: '#1e3a8a',
    tableHeaderBg: '#1e3a8a',
    tableHeaderText: '#ffffff',
    rowEvenBg: '#eff6ff',
    rowOddBg: '#ffffff',
    textPrimary: '#0f172a',
    textMuted: '#475569',
    priceHighlight: '#1d4ed8',
    badgeBg: '#dc2626',
    badgeText: '#ffffff',
    isLightMode: true,
  },
  {
    index: 7,
    id: 'ceremonial_mandap_pavilion',
    name: 'Concept 8: Ceremonial Festive Mandap & Golden Toran',
    sceneType: 'ceremonial_mandap_pavilion',
    cardArrangement: 'command_vault',
    bgTop: '#451a03',
    bgMid: '#78350f',
    bgBottom: '#290f02',
    headerBg: '#9a3412',
    accentPrimary: '#fde047',
    accentSecondary: '#fbbf24',
    cardBg: 'rgba(69, 26, 3, 0.94)',
    cardBorder: '#fde047',
    tableHeaderBg: '#b45309',
    tableHeaderText: '#fef9c3',
    rowEvenBg: 'rgba(180, 83, 9, 0.38)',
    rowOddBg: 'rgba(69, 26, 3, 0.65)',
    textPrimary: '#ffffff',
    textMuted: '#fde68a',
    priceHighlight: '#fde047',
    badgeBg: '#dc2626',
    badgeText: '#ffffff',
  },
];

const imageCache: Record<string, HTMLImageElement> = {};
const ASSET_URLS: Record<string, string> = {
  masterOfficialLogo: '/assets/nav_durga_logo.png',
  maaDurga: maaDurgaPortraitUrl,
  steelBuilding: steelBuildingUrl,
  steelPipes: steelPipesUrl,
  steelTmt: steelTmtUrl,
  steelChannelsTop: steelChannelsTopUrl,
  steelChannelsGreen: steelChannelsGreenUrl,
  steelUChannels: steelUChannelsUrl,
};

export type FestivalThemeCategory =
  | 'diwali'
  | 'holi'
  | 'ganesh'
  | 'navratri'
  | 'national'
  | 'vishwakarma'
  | 'dussehra'
  | 'sankranti'
  | 'new_year'
  | 'akshaya_tritiya'
  | 'ram_navami'
  | 'mahashivratri'
  | 'engineers'
  | 'teachers'
  | 'rakhi'
  | 'generic_festival';

export class NanoBananaPostService {
  private static lastVariationIndex = -1;
  private static generationCounter = 0;

  public static async preloadAssets(): Promise<void> {
    const promises = Object.entries(ASSET_URLS).map(([key, url]) => {
      if (imageCache[key]?.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imageCache[key] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = url;
      });
    });
    await Promise.all(promises);
  }

  public static detectFestivalCategory(festivalName?: string): FestivalThemeCategory {
    const lower = (festivalName || '').toLowerCase();
    if (lower.includes('diwali') || lower.includes('deepawali') || lower.includes('deepavali') || lower.includes('dhanteras')) {
      return 'diwali';
    }
    if (lower.includes('holi') || lower.includes('dhuleti') || lower.includes('color') || lower.includes('rang')) {
      return 'holi';
    }
    if (lower.includes('ganesh') || lower.includes('ganpati') || lower.includes('vinayak') || lower.includes('bappa')) {
      return 'ganesh';
    }
    if (lower.includes('republic') || lower.includes('independence') || lower.includes('tiranga') || lower.includes('flag') || lower.includes('national')) {
      return 'national';
    }
    if (lower.includes('engineer') || lower.includes('technical') || lower.includes('architect')) {
      return 'engineers';
    }
    if (lower.includes('teacher') || lower.includes('guru') || lower.includes('mentor')) {
      return 'teachers';
    }
    if (lower.includes('raksha') || lower.includes('bandhan') || lower.includes('rakhi')) {
      return 'rakhi';
    }
    if (lower.includes('vishwakarma') || lower.includes('biswakarma') || lower.includes('workshop')) {
      return 'vishwakarma';
    }
    if (lower.includes('navratri') || lower.includes('mata') || lower.includes('durga') || lower.includes('garba')) {
      return 'navratri';
    }
    if (lower.includes('dussehra') || lower.includes('vijayadashami')) {
      return 'dussehra';
    }
    if (lower.includes('sankranti') || lower.includes('uttarayan') || lower.includes('pongal')) {
      return 'sankranti';
    }
    if (lower.includes('akshaya') || lower.includes('tritiya')) {
      return 'akshaya_tritiya';
    }
    if (lower.includes('ram') || lower.includes('navami')) {
      return 'ram_navami';
    }
    if (lower.includes('shivratri') || lower.includes('mahadev') || lower.includes('shiva')) {
      return 'mahashivratri';
    }
    if (lower.includes('financial year') || lower.includes('new year') || lower.includes('opening')) {
      return 'new_year';
    }
    return 'generic_festival';
  }

  public static computeVerifiedProductItem(
    product: Product,
    categoryBasicRates?: CategoryBasicRates,
    gradeBasicRates?: CompanyGradeBasicRates,
    effectiveDate?: string
  ): NanoBananaVerifiedItem {
    const normGrade = normalizeGrade(product.grade || product.gaugeType);
    const section =
      product.section ||
      (product.rateSource?.includes('NS ISPAT') ? 'LIGHT SECTION' : 'MEDIUM SECTION');
    const rateSource =
      product.rateSource ||
      (section === 'LIGHT SECTION'
        ? 'UNIT-2 - NS ISPAT (I) PVT. LTD.'
        : 'NAVDURGA ISPAT PVT. LTD.');
    const gaugeDifference = Number(product.gaugeDifference) || 0;
    let basicRate = resolveProductCategoryBasicRate(product, categoryBasicRates);

    const slExplicitRate = gradeBasicRates?.['NAVDURGA ISPAT PVT. LTD.']?.SL;
    const medExplicitRate =
      categoryBasicRates?.['MEDIUM SECTION'] ??
      gradeBasicRates?.['NAVDURGA ISPAT PVT. LTD.']?.Medium;
    const lightExplicitRate = categoryBasicRates?.['LIGHT SECTION'];

    if (
      product.baseRate &&
      product.baseRate > 0 &&
      product.currentPrice === product.baseRate + gaugeDifference
    ) {
      basicRate = product.baseRate;
    } else if (section === 'LIGHT SECTION' && lightExplicitRate !== undefined) {
      basicRate = lightExplicitRate;
    } else if (normGrade === 'SL' && slExplicitRate !== undefined) {
      basicRate = slExplicitRate;
    } else if (section === 'MEDIUM SECTION' && medExplicitRate !== undefined) {
      basicRate = medExplicitRate;
    } else if (product.baseRate && product.baseRate > 0) {
      basicRate = product.baseRate;
    }

    const finalRate = calculateSimpleFinalRate(basicRate, gaugeDifference);
    const previousRate =
      product.previousPrice && product.previousPrice > 0 ? product.previousPrice : finalRate;
    const priceChange =
      product.priceChange !== undefined ? product.priceChange : finalRate - previousRate;

    return {
      id: product.id,
      productName: product.productName || product.name,
      code: product.code || 'ND-01',
      size: product.size || product.grade || '',
      gauge: product.gaugeType || normGrade,
      grade: normGrade,
      section,
      rateSource,
      basicRate,
      gaugeDifference,
      finalRate,
      previousRate,
      priceChange,
      effectiveDate:
        effectiveDate ||
        product.effectiveFrom ||
        new Date().toISOString().split('T')[0],
      unit: product.unit || 'MT',
    };
  }

  public static getVerifiedItemsForPostType(params: {
    postType: NanoBananaPostType;
    products: Product[];
    categoryBasicRates?: CategoryBasicRates;
    gradeBasicRates?: CompanyGradeBasicRates;
    selectedProductId?: string;
    selectedCustomProductIds?: string[];
    festivalSectionFilter?: 'MEDIUM' | 'SL' | 'ALL' | 'CUSTOM';
    effectiveDate?: string;
  }): {
    items: NanoBananaVerifiedItem[];
    mediumBasicRate: number;
    slBasicRate: number;
    lightBasicRate: number;
  } {
    const {
      postType,
      products,
      categoryBasicRates,
      gradeBasicRates,
      selectedProductId,
      selectedCustomProductIds,
      festivalSectionFilter = 'ALL',
      effectiveDate,
    } = params;

    const activeProducts = products.filter((p) => p.status === 'Active' || !p.status);
    const allVerified = activeProducts.map((p) =>
      this.computeVerifiedProductItem(p, categoryBasicRates, gradeBasicRates, effectiveDate)
    );

    const medItems = allVerified.filter(
      (i) => i.section === 'MEDIUM SECTION' && i.grade === 'Medium'
    );
    const slMedItems = allVerified.filter((i) => i.grade === 'SL');
    const lightItems = allVerified.filter((i) => i.section === 'LIGHT SECTION');

    const mediumBasicRate =
      categoryBasicRates?.['MEDIUM SECTION'] ??
      gradeBasicRates?.['NAVDURGA ISPAT PVT. LTD.']?.Medium ??
      medItems[0]?.basicRate ??
      49711;

    const lightBasicRate =
      categoryBasicRates?.['LIGHT SECTION'] ??
      lightItems[0]?.basicRate ??
      42211;

    const slBasicRate =
      gradeBasicRates?.['NAVDURGA ISPAT PVT. LTD.']?.SL ??
      slMedItems[0]?.basicRate ??
      mediumBasicRate;

    let filtered: NanoBananaVerifiedItem[] = [];

    switch (postType) {
      case 'base-rate':
        filtered = [];
        break;
      case 'all-product':
      case 'all-products-price-update':
        filtered = allVerified;
        break;
      case 'medium-price-update':
        filtered = allVerified.filter(
          (item) => item.section === 'MEDIUM SECTION' && item.grade === 'Medium'
        );
        if (filtered.length === 0) {
          filtered = allVerified.filter((item) => item.grade === 'Medium');
        }
        break;
      case 'sl-price-update':
        filtered = allVerified.filter((item) => item.grade === 'SL');
        break;
      case 'product-update':
        if (selectedProductId) {
          filtered = allVerified.filter((item) => item.id === selectedProductId);
        }
        if (filtered.length === 0 && allVerified.length > 0) {
          filtered = [allVerified[0]];
        }
        break;
      case 'festival-price-update':
        if (festivalSectionFilter === 'CUSTOM' && selectedCustomProductIds && selectedCustomProductIds.length > 0) {
          const idSet = new Set(selectedCustomProductIds);
          filtered = allVerified.filter((item) => idSet.has(item.id));
        } else if (festivalSectionFilter === 'MEDIUM') {
          filtered = allVerified.filter(
            (item) => item.section === 'MEDIUM SECTION' && item.grade === 'Medium'
          );
        } else if (festivalSectionFilter === 'SL') {
          filtered = allVerified.filter((item) => item.grade === 'SL');
        } else {
          filtered = allVerified;
        }
        break;
      case 'custom-product-post':
        if (selectedCustomProductIds && selectedCustomProductIds.length > 0) {
          const idSet = new Set(selectedCustomProductIds);
          filtered = allVerified.filter((item) => idSet.has(item.id));
        }
        if (filtered.length === 0) {
          filtered = allVerified.slice(0, 6);
        }
        break;
    }

    return {
      items: filtered,
      mediumBasicRate,
      slBasicRate,
      lightBasicRate,
    };
  }

  public static buildNanoBananaPrompt(params: {
    postType: NanoBananaPostType;
    items: NanoBananaVerifiedItem[];
    company: CompanySettings;
    mediumBasicRate: number;
    slBasicRate: number;
    lightBasicRate: number;
    effectiveDate: string;
    variation: NanoBananaVisualVariation;
    conceptIndex: number;
    festivalName?: string;
    customHeadline?: string;
    customNote?: string;
  }): string {
    const {
      postType,
      items,
      mediumBasicRate,
      slBasicRate,
      effectiveDate,
      variation,
      conceptIndex,
      festivalName,
    } = params;

    let generatedPrompt = '';
    if (postType === 'base-rate') {
      generatedPrompt = `Create a fresh visual concept (Concept #${conceptIndex + 1}: ${variation.name}) for NAV DURGA ISPAT Base Rate announcement poster. Effective Date: ${effectiveDate}, MEDIUM BASE RATE: ₹ ${mediumBasicRate.toLocaleString('en-IN')}/MT, SL BASE RATE: ₹ ${slBasicRate.toLocaleString('en-IN')}/MT. Festival: ${festivalName || 'Industrial Steel'}`;
    } else {
      generatedPrompt = `Create a fresh visual concept for NAV DURGA ISPAT (Type: ${postType}, Effective Date: ${effectiveDate}, Products: ${items.length}).`;
    }
    return generatedPrompt;
  }

  public static buildWhatsAppCaption(params: {
    postType: NanoBananaPostType;
    postTypeLabel: string;
    items: NanoBananaVerifiedItem[];
    company: CompanySettings;
    mediumBasicRate: number;
    slBasicRate: number;
    lightBasicRate: number;
    effectiveDate: string;
    festivalName?: string;
    customHeadline?: string;
    customNote?: string;
  }): string {
    const {
      postType,
      items,
      mediumBasicRate,
      slBasicRate,
      effectiveDate,
      festivalName,
      customHeadline,
      customNote,
    } = params;

    if (postType === 'base-rate') {
      return [
        `🏢 *NAV DURGA ISPAT PRIVATE LIMITED*`,
        `📅 *Effective Date:* ${effectiveDate}`,
        ``,
        `📌 *MEDIUM BASE RATE*`,
        `*₹ ${mediumBasicRate.toLocaleString('en-IN')} / MT*`,
        ``,
        `📌 *SL BASE RATE*`,
        `*₹ ${slBasicRate.toLocaleString('en-IN')} / MT*`,
      ].join('\n');
    }

    if (postType === 'product-update' && items[0]) {
      const it = items[0];
      return [
        `🏢 *NAV DURGA ISPAT PRIVATE LIMITED*`,
        `_Urla Industrial Area, Raipur (C.G.)_`,
        ``,
        `📌 *PRODUCT RATE SPOTLIGHT*`,
        `📅 *Effective Date:* ${effectiveDate}`,
        ``,
        `*${it.productName}* [Size: ${it.size}]`,
        `Grade: ${it.grade} | Mill: ${it.rateSource}`,
        `💵 Basic Rate: ₹ ${it.basicRate.toLocaleString('en-IN')}/MT`,
        `⚖️ Gauge Difference: + ₹ ${it.gaugeDifference.toLocaleString('en-IN')}/MT`,
        `*FINAL RATE: ₹ ${it.finalRate.toLocaleString('en-IN')}/${it.unit}*`,
        ``,
        `_Formula: Final Rate = Basic Rate + Gauge Difference_`,
        `📞 *Orders & Booking:* 9009544333 | 7000923464 | 9713144333`,
      ].join('\n');
    }

    const lines: string[] = [];
    lines.push(`🏢 *NAV DURGA ISPAT PRIVATE LIMITED*`);
    if (postType === 'festival-price-update' && festivalName) {
      lines.push(`✨ *${festivalName.toUpperCase()}* ✨`);
    } else if (postType === 'custom-product-post' && customHeadline) {
      lines.push(`✨ *${customHeadline.toUpperCase()}*`);
    }
    lines.push(`📅 *Effective Date:* ${effectiveDate}`);
    lines.push('');
    lines.push(
      `*MEDIUM BASE RATE:* ₹ ${mediumBasicRate.toLocaleString('en-IN')} / MT  |  *SL BASE RATE:* ₹ ${slBasicRate.toLocaleString('en-IN')} / MT`
    );
    lines.push('─────────────────────────────');

    items.forEach((it, idx) => {
      const sign = it.gaugeDifference >= 0 ? '+' : '-';
      lines.push(
        `${idx + 1}. *${it.productName}* | Size: *${it.size}* | Gauge Diff: ${sign} ₹ ${Math.abs(it.gaugeDifference).toLocaleString('en-IN')} ➔ *Final Rate: ₹ ${it.finalRate.toLocaleString('en-IN')}/${it.unit}*`
      );
    });

    if (customNote && postType === 'custom-product-post') {
      lines.push('');
      lines.push(`📝 *Note:* ${customNote}`);
    }

    lines.push('─────────────────────────────');
    lines.push(`📞 *Contact:* 9009544333 | 7000923464 | 9713144333`);
    return lines.join('\n');
  }

  public static pickNextVariation(
    postType: NanoBananaPostType,
    preferredVariationId?: string
  ): { variation: NanoBananaVisualVariation; conceptIndex: number } {
    this.generationCounter += 1;
    if (preferredVariationId && preferredVariationId !== 'auto') {
      const found = NANO_BANANA_VARIATIONS.find((v) => v.id === preferredVariationId);
      if (found) {
        this.lastVariationIndex = found.index;
        return { variation: found, conceptIndex: this.generationCounter };
      }
    }

    const candidates = NANO_BANANA_VARIATIONS.filter(
      (v) => v.index !== this.lastVariationIndex
    );
    const picked =
      candidates[(this.generationCounter + Math.floor(Math.random() * candidates.length)) % candidates.length] ||
      NANO_BANANA_VARIATIONS[0];
    this.lastVariationIndex = picked.index;
    return { variation: picked, conceptIndex: this.generationCounter };
  }

  public static async generateNewPost(params: {
    postType: NanoBananaPostType;
    products: Product[];
    company: CompanySettings;
    categoryBasicRates?: CategoryBasicRates;
    gradeBasicRates?: CompanyGradeBasicRates;
    selectedProductId?: string;
    selectedCustomProductIds?: string[];
    festivalName?: string;
    festivalLogoUrl?: string;
    festivalSectionFilter?: 'MEDIUM' | 'SL' | 'ALL' | 'CUSTOM';
    customHeadline?: string;
    customNote?: string;
    preferredVariationId?: string;
    effectiveDate?: string;
    language?: 'English' | 'Hindi' | 'Hinglish';
    aspectRatio?: '1:1' | '4:5' | '3:4';
    includePricing?: boolean;
    skipRemoteApi?: boolean;
    overrideMediumRate?: number;
    overrideSlRate?: number;
  }): Promise<NanoBananaGeneratedPost> {
    await this.preloadAssets();
    const effectiveDate =
      params.effectiveDate || new Date().toISOString().split('T')[0];

    const verified =
      this.getVerifiedItemsForPostType({
        postType: params.postType,
        products: params.products,
        categoryBasicRates: params.categoryBasicRates,
        gradeBasicRates: params.gradeBasicRates,
        selectedProductId: params.selectedProductId,
        selectedCustomProductIds: params.selectedCustomProductIds,
        festivalSectionFilter: params.festivalSectionFilter,
        effectiveDate,
      });

    const items = verified.items;
    const mediumBasicRate = params.overrideMediumRate ?? verified.mediumBasicRate;
    const slBasicRate = params.overrideSlRate ?? verified.slBasicRate;
    const lightBasicRate = verified.lightBasicRate;

    const postTypeMeta =
      NANO_BANANA_POST_TYPES.find((t) => t.id === params.postType) || {
        id: params.postType,
        label:
          params.postType === 'base-rate'
            ? 'Base Rate'
            : params.postType === 'all-product'
            ? 'All Product'
            : params.postType === 'festival-price-update'
            ? 'Festival + Price Update'
            : 'Price Update',
        shortDesc: '',
      };

    const { variation, conceptIndex } = this.pickNextVariation(
      params.postType,
      'auto'
    );

    const seed = Date.now() + Math.floor(Math.random() * 90000) + conceptIndex * 137;
    const prompt = this.buildNanoBananaPrompt({
      postType: params.postType,
      items,
      company: params.company,
      mediumBasicRate,
      slBasicRate,
      lightBasicRate,
      effectiveDate,
      variation,
      conceptIndex,
      festivalName: params.festivalName,
      customHeadline: params.customHeadline,
      customNote: params.customNote,
    });

    let rawAiImageDataUrl: string | undefined;
    let modelUsed = 'Gemini AI Studio Engine';
    let dynamicTagline = 'Stronger Steel For A Brighter Tomorrow | IS:2062 Certified';

    const canvas = document.createElement('canvas');
    await this.renderVerifiedPostToCanvas({
      canvas,
      postType: params.postType,
      postTypeLabel: postTypeMeta.label,
      items,
      company: params.company,
      mediumBasicRate,
      slBasicRate,
      lightBasicRate,
      effectiveDate,
      variation,
      conceptIndex,
      seed,
      rawAiImageDataUrl,
      festivalName: params.festivalName,
      festivalLogoUrl: params.festivalLogoUrl,
      customHeadline: params.customHeadline,
      customNote: params.customNote,
      dynamicTagline,
    });

    const imageDataUrl = canvas.toDataURL('image/png');
    const whatsappCaption = this.buildWhatsAppCaption({
      postType: params.postType,
      postTypeLabel: postTypeMeta.label,
      items,
      company: params.company,
      mediumBasicRate,
      slBasicRate,
      lightBasicRate,
      effectiveDate,
      festivalName: params.festivalName,
      customHeadline: params.customHeadline,
      customNote: params.customNote,
    });

    const generatedPost: NanoBananaGeneratedPost = {
      id: `nb-post-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      postType: params.postType,
      postTypeLabel: postTypeMeta.label,
      title:
        params.postType === 'festival-price-update' && params.festivalName
          ? `${params.festivalName} - Steel Rate Update`
          : params.postType === 'base-rate'
          ? `Nav Durga Base Rate Update`
          : `Nav Durga ${postTypeMeta.label}`,
      subtitle: dynamicTagline,
      effectiveDate,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      prompt,
      seed,
      variationIndex: variation.index,
      variationName: variation.name,
      colorScheme: variation.id,
      imageDataUrl,
      rawAiImageDataUrl,
      whatsappCaption,
      verifiedItems: items,
      mediumBasicRate,
      slBasicRate,
      lightBasicRate,
      festivalName: params.festivalName,
      customHeadline: params.customHeadline,
      customNote: params.customNote,
      modelUsed,
    };

    this.savePostToHistory(generatedPost);
    return generatedPost;
  }

  public static async renderVerifiedPostToCanvas(params: {
    canvas: HTMLCanvasElement;
    postType: NanoBananaPostType;
    postTypeLabel: string;
    items: NanoBananaVerifiedItem[];
    company: CompanySettings;
    mediumBasicRate: number;
    slBasicRate: number;
    lightBasicRate: number;
    effectiveDate: string;
    variation: NanoBananaVisualVariation;
    conceptIndex?: number;
    seed: number;
    rawAiImageDataUrl?: string;
    festivalName?: string;
    festivalLogoUrl?: string;
    customHeadline?: string;
    customNote?: string;
    dynamicTagline?: string;
    dynamicBadge?: string;
  }): Promise<void> {
    const { canvas, mediumBasicRate, slBasicRate, effectiveDate, festivalName } = params;
    const W = 1200;
    const H = params.postType === 'base-rate' ? 1250 : params.items.length > 14 ? 1620 : 1400;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 6;
    this.roundRect(ctx, 24, 24, W - 48, H - 48, 20);
    ctx.stroke();

    const headerX = 48;
    const headerY = 42;
    const headerW = 1104;
    const headerH = 168;

    this.roundRect(ctx, headerX, headerY, headerW, headerH, 16);
    ctx.fillStyle = '#1e3a8a';
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('NAVDURGA GROUP', headerX + 40, headerY + 68);

    ctx.fillStyle = '#fde047';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(festivalName ? `✨ ${festivalName.toUpperCase()} ✨` : 'NAV DURGA ISPAT PRIVATE LIMITED', headerX + 40, headerY + 106);

    ctx.fillStyle = '#93c5fd';
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`URLA INDUSTRIAL AREA, RAIPUR (C.G.) | EFFECTIVE DATE: ${effectiveDate}`, headerX + 40, headerY + 140);

    const dateBarY = 230;
    const dateBarH = 50;
    this.roundRect(ctx, headerX, dateBarY, headerW, dateBarH, 8);
    ctx.fillStyle = '#111827';
    ctx.fill();
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fde047';
    ctx.font = '800 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`DAILY PRICE UPDATE | DATE: ${effectiveDate} | EX-PLANT URLA, RAIPUR`, headerX + headerW / 2, dateBarY + 32);
    ctx.textAlign = 'left';

    const cardY = 300;
    const gap = 24;
    const cardW = (headerW - gap) / 2;

    this.roundRect(ctx, headerX, cardY, cardW, 160, 16);
    ctx.fillStyle = '#eff6ff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#1d4ed8';
    ctx.stroke();

    ctx.fillStyle = '#1e40af';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('MEDIUM SECTION BASE RATE', headerX + 24, cardY + 44);
    ctx.fillStyle = '#1e3a8a';
    ctx.font = '900 52px "JetBrains Mono", monospace';
    ctx.fillText(`₹ ${mediumBasicRate.toLocaleString('en-IN')} / MT`, headerX + 24, cardY + 110);

    const rightCardX = headerX + cardW + gap;
    this.roundRect(ctx, rightCardX, cardY, cardW, 160, 16);
    ctx.fillStyle = '#fffbeb';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#d97706';
    ctx.stroke();

    ctx.fillStyle = '#92400e';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SL / LIGHT SECTION BASE RATE', rightCardX + 24, cardY + 44);
    ctx.fillStyle = '#b45309';
    ctx.font = '900 52px "JetBrains Mono", monospace';
    ctx.fillText(`₹ ${slBasicRate.toLocaleString('en-IN')} / MT`, rightCardX + 24, cardY + 110);

    if (params.postType !== 'base-rate' && params.items.length > 0) {
      const tableY = 485;
      const thH = 48;
      this.roundRect(ctx, headerX, tableY, headerW, thH, 10);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('S.No', headerX + 20, tableY + 30);
      ctx.fillText('Product', headerX + 100, tableY + 30);
      ctx.fillText('Size', headerX + 420, tableY + 30);
      ctx.fillText('Gauge Diff', headerX + 680, tableY + 30);
      ctx.fillText('Final Rate', headerX + 900, tableY + 30);

      const maxRows = Math.min(params.items.length, 18);
      const rowH = 46;
      for (let i = 0; i < maxRows; i++) {
        const it = params.items[i];
        const ry = tableY + thH + i * rowH;
        ctx.fillStyle = i % 2 === 0 ? '#f8fafc' : '#ffffff';
        ctx.fillRect(headerX, ry, headerW, rowH);

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(headerX, ry + rowH);
        ctx.lineTo(headerX + headerW, ry + rowH);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '700 14px "JetBrains Mono", monospace';
        ctx.fillText(String(i + 1).padStart(2, '0'), headerX + 20, ry + 28);

        ctx.fillStyle = '#0f172a';
        ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(it.productName, headerX + 100, ry + 28);

        ctx.fillStyle = '#1e3a8a';
        ctx.font = '700 14px "JetBrains Mono", monospace';
        ctx.fillText(it.size, headerX + 420, ry + 28);

        ctx.fillStyle = '#d97706';
        ctx.font = '800 15px "JetBrains Mono", monospace';
        const sign = it.gaugeDifference >= 0 ? '+' : '-';
        ctx.fillText(`${sign} ₹ ${Math.abs(it.gaugeDifference).toLocaleString('en-IN')}`, headerX + 680, ry + 28);

        ctx.fillStyle = '#1e3a8a';
        ctx.font = '900 17px "JetBrains Mono", monospace';
        ctx.fillText(`₹ ${it.finalRate.toLocaleString('en-IN')}/MT`, headerX + 900, ry + 28);
      }
    }

    const footerY = H - 120;
    this.roundRect(ctx, headerX, footerY, headerW, 80, 14);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    ctx.fillStyle = '#fde047';
    ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📞 ORDERS & BOOKING: 9009544333  |  7000923464  |  9713144333', headerX + headerW / 2, footerY + 34);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Terms: 100% Advance Payment | GST 18% Extra | Ex-Works Raipur Mill Gate', headerX + headerW / 2, footerY + 60);
    ctx.textAlign = 'left';
  }

  private static roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  public static getGeneratedPostsHistory(): NanoBananaGeneratedPost[] {
    try {
      const raw = localStorage.getItem(NANO_BANANA_HISTORY_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as NanoBananaGeneratedPost[];
    } catch {
      return [];
    }
  }

  public static savePostToHistory(post: NanoBananaGeneratedPost): void {
    try {
      const existing = this.getGeneratedPostsHistory().filter((p) => p.id !== post.id);
      const updated = [post, ...existing].slice(0, 12);
      localStorage.setItem(NANO_BANANA_HISTORY_KEY, JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent('navdurga_nano_banana_post_generated', { detail: post })
      );
    } catch (err) {
      console.warn('Could not save post to history:', err);
    }
  }
}
