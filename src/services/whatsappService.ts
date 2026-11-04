import {
  DailyUpdate,
  CompanySettings,
  Customer,
  SalesEnquiry,
  WhatsAppMessageRecord,
  WhatsAppConfig,
  WhatsAppTestActivity,
  CustomWhatsAppPost,
  CustomPostRecipient,
  Product,
  WhatsAppThemeName,
  CommonProductImage,
  CompanyGradeBasicRates,
  CategoryBasicRates,
  WhatsAppOrderEnquiryParsed,
} from '../types';
import { NAV_DURGA_TEST_CUSTOMER } from '../data/demoData';
import { PosterRenderer, PosterRenderOptions } from './posterRenderer';
import { normalizeGrade } from '../utils/rateCalculator';
import {
  parseWhatsAppCustomerMessage,
  buildSalesEnquiryFromWhatsAppParsed,
} from '../utils/whatsappOrderHelper';

const TEST_ACTIVITY_STORAGE_KEY = 'navdurga_whatsapp_test_activities_v1';
const CUSTOM_POSTS_STORAGE_KEY = 'navdurga_custom_whatsapp_posts_v1';

const DEMO_GANESH_POST_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="50%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#fed7aa"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="50%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bgGrad)"/>
  <rect x="25" y="25" width="750" height="750" rx="20" fill="none" stroke="url(#borderGrad)" stroke-width="4"/>
  <rect x="40" y="40" width="720" height="720" rx="14" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="8 6"/>
  <circle cx="400" cy="240" r="110" fill="#fbbf24" opacity="0.25"/>
  <circle cx="400" cy="240" r="85" fill="#f59e0b" opacity="0.3"/>
  <text x="400" y="270" font-family="sans-serif" font-size="90" text-anchor="middle" fill="#b45309">🕉️</text>
  <text x="400" y="410" font-family="sans-serif" font-weight="900" font-size="38" text-anchor="middle" fill="#78350f" letter-spacing="1">HAPPY GANESH CHATURTHI</text>
  <text x="400" y="450" font-family="sans-serif" font-weight="600" font-size="19" text-anchor="middle" fill="#92400e">May Lord Ganesha Bless Your Projects with Strength &amp; Success</text>
  <line x1="200" y1="485" x2="600" y2="485" stroke="#d97706" stroke-width="2"/>
  <text x="400" y="530" font-family="sans-serif" font-weight="700" font-size="22" text-anchor="middle" fill="#1e293b">NAV DURGA ISPAT</text>
  <text x="400" y="560" font-family="sans-serif" font-weight="500" font-size="16" text-anchor="middle" fill="#475569">Raipur, Chhattisgarh | Fe 500D TMT &amp; Structural Steel</text>
  <rect x="180" y="610" width="440" height="56" rx="28" fill="#b45309"/>
  <text x="400" y="645" font-family="sans-serif" font-weight="700" font-size="17" text-anchor="middle" fill="#ffffff">WISHING YOU PROSPERITY &amp; GROWTH</text>
  <text x="400" y="725" font-family="sans-serif" font-weight="600" font-size="14" text-anchor="middle" fill="#64748b">📞 +91 771 4208900 | 📲 +91 97521 83053</text>
</svg>
`)}`;

const DEMO_OFFER_POST_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#blueGrad)"/>
  <rect x="25" y="25" width="750" height="750" rx="20" fill="none" stroke="#3b82f6" stroke-width="3"/>
  <text x="400" y="140" font-family="sans-serif" font-weight="900" font-size="34" text-anchor="middle" fill="#fbbf24">NAV DURGA ISPAT - SPECIAL OFFER</text>
  <text x="400" y="190" font-family="sans-serif" font-weight="600" font-size="18" text-anchor="middle" fill="#93c5fd">DIRECT FACTORY DISPATCH - URLA, RAIPUR</text>
  <rect x="80" y="240" width="640" height="260" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
  <text x="120" y="300" font-family="sans-serif" font-weight="800" font-size="26" fill="#ffffff">Fe 500D TMT REBARS (8mm - 32mm)</text>
  <text x="120" y="340" font-family="sans-serif" font-size="18" fill="#cbd5e1">Special Project Booking Rates for Infrastructure &amp; Commercial</text>
  <text x="120" y="390" font-family="sans-serif" font-weight="900" font-size="36" fill="#22c55e">₹ 52,800 / MT</text>
  <text x="360" y="390" font-family="sans-serif" font-size="16" fill="#94a3b8">Ex-Plant Urla | Loading Free | BIS Certified</text>
  <text x="120" y="440" font-family="sans-serif" font-size="16" fill="#f59e0b">⏳ Valid for orders confirmed this week only</text>
  <text x="400" y="580" font-family="sans-serif" font-weight="700" font-size="22" text-anchor="middle" fill="#ffffff">For Inquiries &amp; Instant Booking:</text>
  <text x="400" y="630" font-family="sans-serif" font-weight="800" font-size="28" text-anchor="middle" fill="#38bdf8">📲 WhatsApp: +91 97521 83053</text>
  <text x="400" y="700" font-family="sans-serif" font-size="15" text-anchor="middle" fill="#64748b">Nav Durga Ispat - Plot No. 42-45, Phase II, Urla, Raipur</text>
</svg>
`)}`;

export const INITIAL_CUSTOM_POSTS: CustomWhatsAppPost[] = [
  {
    id: 'post-1',
    imageName: 'ganesh_chaturthi_wishes_navdurga.png',
    imageUrl: DEMO_GANESH_POST_IMG,
    imageSize: 48200,
    message: 'Happy Ganesh Chaturthi from Nav Durga Ispat.\n\nWishing you and your family happiness, prosperity, and great success in all your construction and steel projects.\n\nWarm regards,\nNav Durga Ispat, Raipur',
    recipients: [
      {
        customerId: 'cust-test-01',
        customerName: 'Nav Durga Test Customer',
        companyName: 'Nav Durga Test',
        phoneNumber: '+91 97521 83053',
        status: 'Opened',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    type: 'Custom Image',
    status: 'Manual Test',
    category: 'Festival Greeting',
  },
  {
    id: 'post-2',
    imageName: 'monsoon_tmt_special_offer.png',
    imageUrl: DEMO_OFFER_POST_IMG,
    imageSize: 62400,
    message: '🔥 SPECIAL STEEL BOOKING OFFER - NAV DURGA ISPAT\n\nDear Partner,\nWe are pleased to offer prime Fe 500D TMT Rebars (8mm - 32mm) at special factory-direct rates for immediate delivery from our Urla Raipur plant.\n\nRate: ₹ 52,800/MT (Ex-Plant)\nValidity: This week only\n\nTo book, reply directly to this message.\nNav Durga Ispat, Raipur\nHotline: +91 771 4208900',
    recipients: [
      {
        customerId: 'cust-test-01',
        customerName: 'Nav Durga Test Customer',
        companyName: 'Nav Durga Test',
        phoneNumber: '+91 97521 83053',
        status: 'Opened',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    type: 'Custom Image',
    status: 'Manual Test',
    category: 'Special Offer',
  },
];

export const INITIAL_TEST_ACTIVITIES: WhatsAppTestActivity[] = [
  {
    id: 'act-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    customerName: 'Nav Durga Test Customer',
    phoneNumber: '+91 97521 83053',
    action: 'Test Update Prepared',
    details: 'Raipur Market Daily Steel Rate sheet formatted for Fe 500D & structural items.',
    status: 'Manual Action',
  },
  {
    id: 'act-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    customerName: 'Nav Durga Test Customer',
    phoneNumber: '+91 97521 83053',
    action: 'Message Copied',
    details: 'Broadcast text copied to clipboard for WhatsApp manual pasting.',
    status: 'Manual Action',
  },
  {
    id: 'act-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    customerName: 'Nav Durga Test Customer',
    phoneNumber: '+91 97521 83053',
    action: 'WhatsApp Opened',
    details: 'Opened web intent (wa.me/919752183053) in browser tab.',
    status: 'Manual Action',
  },
];

export interface WhatsAppSendResult {
  success: boolean;
  mode: 'manual' | 'cloud_api';
  messageId: string;
  shareUrl?: string;
  notes: string;
}

export interface InboundParsedData {
  detectedCustomer?: string;
  detectedProduct?: string;
  detectedQuantity?: number;
  detectedUnit: string;
  intent: 'Purchase Enquiry' | 'Price Request' | 'Delivery Status' | 'General Query';
  rawText: string;
  confidence: number;
}

export class WhatsAppService {
  static formatDailyUpdate(
    update: DailyUpdate,
    company: CompanySettings,
    customerName?: string
  ): string {
    return this.formatDailyUpdateMessage(update, company, customerName);
  }

  static getTestCustomer(customers?: Customer[]): Customer {
    if (customers && customers.length > 0) {
      const cleanPhone = (p: string) => (p || '').replace(/[^0-9]/g, '');
      const testPhone = cleanPhone(NAV_DURGA_TEST_CUSTOMER.mobile);
      const found = customers.find(
        (c) =>
          c.id === NAV_DURGA_TEST_CUSTOMER.id ||
          cleanPhone(c.whatsapp) === testPhone ||
          cleanPhone(c.mobile) === testPhone ||
          c.companyName.toLowerCase() === NAV_DURGA_TEST_CUSTOMER.companyName.toLowerCase() ||
          c.name.toLowerCase() === NAV_DURGA_TEST_CUSTOMER.name.toLowerCase()
      );
      if (found) return found;
    }
    return NAV_DURGA_TEST_CUSTOMER;
  }

  static openChat(phoneNumber: string, message: string, customerName: string = 'Nav Durga Test Customer'): string {
    const url = this.buildWhatsAppWebUrl(phoneNumber, message);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    this.logActivity({
      customerName,
      phoneNumber,
      action: 'WhatsApp Opened',
      details: `Opened chat via wa.me intent with pre-filled text (${message.length} chars).`,
    });
    return url;
  }

  static async copyMessage(
    message: string,
    customerName: string = 'Nav Durga Test Customer',
    phoneNumber: string = '+91 97521 83053'
  ): Promise<boolean> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(message);
        this.logActivity({
          customerName,
          phoneNumber,
          action: 'Message Copied',
          details: `Copied message text (${message.length} chars) to system clipboard.`,
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  }

  static getActivities(): WhatsAppTestActivity[] {
    try {
      if (typeof localStorage === 'undefined') return INITIAL_TEST_ACTIVITIES;
      const stored = localStorage.getItem(TEST_ACTIVITY_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(TEST_ACTIVITY_STORAGE_KEY, JSON.stringify(INITIAL_TEST_ACTIVITIES));
        return INITIAL_TEST_ACTIVITIES;
      }
      return JSON.parse(stored) as WhatsAppTestActivity[];
    } catch {
      return INITIAL_TEST_ACTIVITIES;
    }
  }

  static logActivity(
    record: Omit<WhatsAppTestActivity, 'id' | 'timestamp' | 'status'> & {
      id?: string;
      timestamp?: string;
      status?: 'Manual Action';
    }
  ): WhatsAppTestActivity {
    const newEntry: WhatsAppTestActivity = {
      id: record.id || `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: record.timestamp || new Date().toISOString(),
      customerName: record.customerName || 'Nav Durga Test Customer',
      phoneNumber: record.phoneNumber || '+91 97521 83053',
      action: (record.action as WhatsAppTestActivity['action']) || 'Manual Action',
      details: record.details || '',
      status: 'Manual Action',
    };
    try {
      const current = this.getActivities();
      const updated = [newEntry, ...current].slice(0, 50);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(TEST_ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('navdurga_whatsapp_activity_logged', { detail: newEntry }));
      }
    } catch (err) {
      console.error('Error persisting test activity:', err);
    }
    return newEntry;
  }

  static clearActivities(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(TEST_ACTIVITY_STORAGE_KEY, JSON.stringify([]));
        window.dispatchEvent(new CustomEvent('navdurga_whatsapp_activity_logged'));
      }
    } catch (err) {
      console.error('Error clearing test activity:', err);
    }
  }

  static getCustomPosts(): CustomWhatsAppPost[] {
    try {
      if (typeof localStorage === 'undefined') return INITIAL_CUSTOM_POSTS;
      const stored = localStorage.getItem(CUSTOM_POSTS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(CUSTOM_POSTS_STORAGE_KEY, JSON.stringify(INITIAL_CUSTOM_POSTS));
        return INITIAL_CUSTOM_POSTS;
      }
      return JSON.parse(stored) as CustomWhatsAppPost[];
    } catch (err) {
      console.error('Error fetching custom WhatsApp posts:', err);
      return INITIAL_CUSTOM_POSTS;
    }
  }

  static saveCustomPost(post: CustomWhatsAppPost): CustomWhatsAppPost {
    try {
      const current = this.getCustomPosts();
      const existingIdx = current.findIndex((p) => p.id === post.id);
      let updated: CustomWhatsAppPost[];
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = post;
      } else {
        updated = [post, ...current];
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(CUSTOM_POSTS_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('navdurga_custom_posts_updated', { detail: post }));
      }
      return post;
    } catch (err) {
      console.error('Error saving custom WhatsApp post:', err);
      return post;
    }
  }

  static deleteCustomPost(id: string): void {
    try {
      const current = this.getCustomPosts();
      const updated = current.filter((p) => p.id !== id);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(CUSTOM_POSTS_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('navdurga_custom_posts_updated'));
      }
    } catch (err) {
      console.error('Error deleting custom WhatsApp post:', err);
    }
  }

  static formatDailyUpdateMessage(
    update: DailyUpdate,
    company: CompanySettings,
    customerName?: string
  ): string {
    const greeting = customerName ? `Dear ${customerName},\n\n` : '';
    const header = `*${company.companyName.toUpperCase()}*\n_${company.tagline}_\n\n`;
    const title = `📊 *DAILY STEEL PRICE UPDATE*\n📅 *Date:* ${update.date}\n\n`;

    const productLines = update.items
      .map((item) => {
        const changeStr = item.changeNote ? ` (${item.changeNote})` : '';
        const availBadge = item.availability !== 'Available' ? ` [${item.availability}]` : '';
        return `📌 *${item.productName} - ${item.grade}*\n   ₹ ${item.price.toLocaleString('en-IN')} / ${item.unit}${changeStr}${availBadge}`;
      })
      .join('\n\n');

    const remarks = update.remarks ? `\n\n📝 *Notes:* ${update.remarks}` : '';
    const footer = `\n\n📍 *Plant:* ${company.address}, ${company.city}, ${company.state}\n📞 *Sales Hotline:* ${company.phone} | *WhatsApp:* ${company.whatsapp}\n\n_To place an order or enquire about quantities, reply directly to this message._\n\n_Powered by ${company.poweredBy}_`;

    return `${greeting}${header}${title}${productLines}${remarks}${footer}`;
  }

  static buildWhatsAppWebUrl(phoneNumber: string, text: string): string {
    let cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length === 10) {
      cleanNumber = `91${cleanNumber}`;
    }
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  }

  static async sendMessage(
    customer: Customer,
    messageText: string,
    config: WhatsAppConfig,
    imageUrl?: string
  ): Promise<WhatsAppSendResult> {
    const messageId = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    if (config.status === 'Connected') {
      return {
        success: true,
        mode: 'cloud_api',
        messageId,
        notes: 'Dispatched via Meta WhatsApp Business Platform API',
      };
    }

    const shareUrl = this.buildWhatsAppWebUrl(customer.whatsapp || customer.mobile, messageText);
    return {
      success: true,
      mode: 'manual',
      messageId,
      shareUrl,
      notes: 'Prepared manual WhatsApp conversation URL for staff testing',
    };
  }

  static formatCompleteSteelRatePostText(
    products: Product[],
    company: CompanySettings,
    dateStr?: string,
    gradeBasicRates?: CompanyGradeBasicRates,
    categoryBasicRates?: CategoryBasicRates
  ): string {
    const todayStr =
      dateStr ||
      new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

    const mediumSectionProducts = products.filter(
      (p) =>
        p.status === 'Active' &&
        (p.section === 'MEDIUM SECTION' ||
          (!p.section && (!p.rateSource || p.rateSource.includes('NAV DURGA'))))
    );

    const lightSectionProducts = products.filter(
      (p) =>
        p.status === 'Active' &&
        (p.section === 'LIGHT SECTION' ||
          (!p.section && p.rateSource && p.rateSource.includes('NS ISPAT')))
    );

    const formatProductGroup = (prods: Product[]) => {
      const map = new Map<string, Product[]>();
      prods.forEach((p) => {
        const cat = p.productName || p.name || 'STEEL PRODUCTS';
        if (!map.has(cat)) map.set(cat, []);
        map.get(cat)!.push(p);
      });

      let res = '';
      map.forEach((items, catName) => {
        res += `*${catName.toUpperCase()}*\n`;
        items.forEach((item) => {
          const normGrd = normalizeGrade(item.grade || item.gaugeType);
          const gaugeDiff = item.gaugeDifference !== undefined ? item.gaugeDifference : 0;
          const rate = item.finalRate ?? item.currentPrice ?? 0;
          res += `  • ${item.size} | Grade: ${normGrd}\n  Gauge Diff: ₹ ${gaugeDiff.toLocaleString('en-IN')}/MT | Final Rate: *₹ ${rate.toLocaleString('en-IN')}/MT*\n`;
        });
        res += `\n`;
      });
      return res;
    };

    let text = '';

    if (mediumSectionProducts.length > 0) {
      const ndMedBase =
        categoryBasicRates?.['MEDIUM SECTION'] ??
        gradeBasicRates?.['NAV DURGA ISPAT PVT. LTD.']?.['Medium'] ??
        49711;
      text += `*NAVDURGA ISPAT PVT. LTD.*\n`;
      text += `*Category: MEDIUM SECTION*\n`;
      text += `📅 Date: *${todayStr}*\n`;
      text += `*BASIC RATE: ₹ ${ndMedBase.toLocaleString('en-IN')}/MT*\n\n`;
      text += formatProductGroup(mediumSectionProducts);
    }

    if (lightSectionProducts.length > 0) {
      if (mediumSectionProducts.length > 0) {
        text += `═══════════════════════════════════\n\n`;
      }
      const nsLightBase =
        categoryBasicRates?.['LIGHT SECTION'] ??
        gradeBasicRates?.['NS ISPAT (INDIA) PVT. LTD. UNIT-II']?.['Medium'] ??
        42211;
      text += `*UNIT-2 - NS ISPAT (I) PVT. LTD.*\n`;
      text += `*Category: LIGHT SECTION*\n`;
      text += `*BASIC RATE: ₹ ${nsLightBase.toLocaleString('en-IN')}/MT*\n\n`;
      text += formatProductGroup(lightSectionProducts);
    }

    text += `═══════════════════════════════════\n`;
    text += `📞 *Contact for Inquiry & Booking:*\n`;
    text += `📲 *9009544333* | *7000923464* | *9713144333*\n\n`;
    text += `⚖️ _Formula: FINAL RATE = BASIC RATE + GAUGE DIFFERENCE_\n`;
    text += `📍 _GST 18% Extra | Ex-Plant Urla, Raipur_\n`;
    text += `═══════════════════════════════════\n`;
    text += `_Powered by Nav Durga ERP_`;

    return text;
  }

  static renderThemedPostToCanvas(
    canvas: HTMLCanvasElement,
    products: Product[],
    company: CompanySettings,
    theme: WhatsAppThemeName = 'premium-industrial',
    options?: PosterRenderOptions & {
      selectedImageUrls?: string[];
    }
  ): void {
    PosterRenderer.render(canvas, products, company, theme, options);
  }

  static renderPostToCanvas(
    canvas: HTMLCanvasElement,
    update: DailyUpdate,
    company: CompanySettings,
    theme: 'industrial-blue' | 'clean-white' | 'steel-accent' = 'industrial-blue'
  ): void {
    const themeMap: Record<string, WhatsAppThemeName> = {
      'industrial-blue': 'premium-industrial',
      'clean-white': 'clean-white-steel',
      'steel-accent': 'modern-steel',
    };
    const mappedTheme = themeMap[theme] || 'premium-industrial';
    this.renderThemedPostToCanvas(canvas, update.items as any, company, mappedTheme, {
      dateStr: update.date,
      remarks: update.remarks,
    });
  }
}
