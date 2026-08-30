import { Language } from './types';

// ============================================================================
// Localization dictionary. Every user-facing string in the app is keyed here
// so AR/EN can be toggled instantly without re-fetching anything.
// ============================================================================

export const dictionary = {
  ar: {
    appName: 'المائدة الذهبية',
    table: 'طاولة',
    tableNumber: 'رقم الطاولة',

    // Screen 1 — Bill overview
    yourOrder: 'طلبك الحالي',
    liveStatus: 'حالة الطلب',
    statusOpen: 'الطلب مفتوح',
    statusAwaitingPayment: 'بانتظار الدفع',
    statusClosed: 'تم إغلاق الفاتورة',
    item: 'الصنف',
    qty: 'الكمية',
    unitPrice: 'سعر الوحدة',
    total: 'الإجمالي',
    subtotal: 'الإجمالي الفرعي',
    tax: 'ضريبة القيمة المضافة',
    serviceCharge: 'رسوم الخدمة',
    grandTotal: 'الإجمالي الكلي',
    payFullBill: 'الدفع الكامل',
    splitBill: 'تقسيم الفاتورة',
    addMoreItems: 'إضافة طلبات جديدة للمائدة',
    noItemsYet: 'لم يتم إضافة أي أصناف بعد',

    // Screen 2 — Split bill
    splitBillTitle: 'تقسيم الفاتورة',
    equalSplit: 'تقسيم متساوي',
    customSplit: 'تقسيم حسب الطلب',
    numberOfGuests: 'عدد الأشخاص',
    perPerson: 'نصيب الفرد',
    selectYourItems: 'اختر الأصناف الخاصة بك',
    yourShare: 'نصيبك من الفاتورة',
    confirmAndPay: 'تأكيد والدفع',
    back: 'رجوع',
    selectAtLeastOneItem: 'الرجاء اختيار صنف واحد على الأقل',

    // Screen 3 — Menu
    menuTitle: 'القائمة',
    searchPlaceholder: 'ابحث عن طبق أو مشروب...',
    appetizers: 'المقبلات',
    mains: 'الأطباق الرئيسية',
    drinks: 'المشروبات',
    desserts: 'الحلويات',
    addToOrder: 'إضافة للطلب',
    added: 'تمت الإضافة',
    noResults: 'لا توجد نتائج مطابقة',
    yourNewItems: 'الأصناف الجديدة',
    confirmOrder: 'تأكيد الطلب',
    itemsInCart: 'صنف في السلة',

    // Payment redirect
    redirectingTitle: 'جاري تحويلك لصفحة الدفع',
    redirectingSubtitle: 'برجاء الانتظار قليلاً، لن يستغرق الأمر وقتاً طويلاً',
    openPaymentPage: 'فتح صفحة الدفع',
    paymentSuccessNote: 'بعد إتمام الدفع بنجاح ستُحدَّث حالة طاولتك تلقائياً',

    // Common
    loading: 'جاري التحميل...',
    retry: 'إعادة المحاولة',
    close: 'إغلاق',
    currencyEGP: 'ج.م',
    genericError: 'حدث خطأ ما، برجاء المحاولة مرة أخرى',
    fetchTableError: 'تعذر تحميل بيانات الطاولة',
    submitPaymentError: 'تعذر إتمام عملية الدفع',
    submitOrderError: 'تعذر إرسال الطلب',
    orderAddedSuccess: 'تمت إضافة طلبك بنجاح',
    missingTableId: 'لم يتم العثور على رقم الطاولة في الرابط',
    guests: 'أشخاص',
  },
  en: {
    appName: 'The Golden Table',
    table: 'Table',
    tableNumber: 'Table No.',

    // Screen 1 — Bill overview
    yourOrder: 'Your Current Order',
    liveStatus: 'Order Status',
    statusOpen: 'Order in progress',
    statusAwaitingPayment: 'Awaiting payment',
    statusClosed: 'Bill closed',
    item: 'Item',
    qty: 'Qty',
    unitPrice: 'Unit Price',
    total: 'Total',
    subtotal: 'Subtotal',
    tax: 'VAT',
    serviceCharge: 'Service Charge',
    grandTotal: 'Grand Total',
    payFullBill: 'Pay Entire Bill',
    splitBill: 'Split Bill',
    addMoreItems: 'Add More Items',
    noItemsYet: 'No items added yet',

    // Screen 2 — Split bill
    splitBillTitle: 'Split the Bill',
    equalSplit: 'Equal Split',
    customSplit: 'Split by Item',
    numberOfGuests: 'Number of Guests',
    perPerson: 'Per Person',
    selectYourItems: 'Select your items',
    yourShare: 'Your Share',
    confirmAndPay: 'Confirm & Pay',
    back: 'Back',
    selectAtLeastOneItem: 'Please select at least one item',

    // Screen 3 — Menu
    menuTitle: 'Menu',
    searchPlaceholder: 'Search dishes or drinks...',
    appetizers: 'Appetizers',
    mains: 'Main Dishes',
    drinks: 'Drinks',
    desserts: 'Desserts',
    addToOrder: 'Add to Order',
    added: 'Added',
    noResults: 'No matching items',
    yourNewItems: 'New Items',
    confirmOrder: 'Confirm Order',
    itemsInCart: 'items in cart',

    // Payment redirect
    redirectingTitle: 'Redirecting to payment',
    redirectingSubtitle: 'Please wait a moment, this will only take a second',
    openPaymentPage: 'Open Payment Page',
    paymentSuccessNote: "Your table's status will update automatically once payment succeeds",

    // Common
    loading: 'Loading...',
    retry: 'Retry',
    close: 'Close',
    currencyEGP: 'EGP',
    genericError: 'Something went wrong, please try again',
    fetchTableError: 'Could not load table data',
    submitPaymentError: 'Could not process payment',
    submitOrderError: 'Could not submit order',
    orderAddedSuccess: 'Your order was added successfully',
    missingTableId: 'No table number found in the link',
    guests: 'guests',
  },
} as const;

export type DictionaryKey = keyof typeof dictionary.ar;

export function t(lang: Language, key: DictionaryKey): string {
  return dictionary[lang][key] ?? String(key);
}
