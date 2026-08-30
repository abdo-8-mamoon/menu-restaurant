import { MenuItem } from './types';

// ============================================================================
// Static menu catalog for Screen 3 (Add Extra Items).
//
// The brief's n8n contract doesn't define a "get menu" webhook, only
// add-order — so this catalog is local for now. Swap `MENU_CATALOG` for a
// `getMenu()` call in lib/api.ts the moment you expose a menu webhook; every
// component here already reads through this one array, so nothing else
// needs to change.
// ============================================================================

export const MENU_CATALOG: MenuItem[] = [
  {
    id: 'menu-001',
    category: 'appetizers',
    name_ar: 'حمص بالطحينة',
    name_en: 'Hummus with Tahini',
    description_ar: 'حمص كريمي مع زيت زيتون وصنوبر محمص',
    description_en: 'Creamy hummus with olive oil and toasted pine nuts',
    price: 65,
    image: 'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=400&q=80',
  },
  {
    id: 'menu-002',
    category: 'appetizers',
    name_ar: 'بابا غنوج',
    name_en: 'Baba Ghanoush',
    description_ar: 'باذنجان مشوي مهروس مع الثوم والطحينة',
    description_en: 'Smoky grilled eggplant mashed with garlic and tahini',
    price: 60,
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&q=80',
  },
  {
    id: 'menu-003',
    category: 'appetizers',
    name_ar: 'سلطة فتوش',
    name_en: 'Fattoush Salad',
    description_ar: 'خضار طازجة مع خبز محمص ودبس الرمان',
    description_en: 'Fresh vegetables with crispy bread and pomegranate molasses',
    price: 70,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
  },
  {
    id: 'menu-004',
    category: 'mains',
    name_ar: 'مشاوي مشكلة',
    name_en: 'Mixed Grill',
    description_ar: 'تشكيلة من اللحوم المشوية على الفحم مع أرز',
    description_en: 'Assorted charcoal-grilled meats served with rice',
    price: 285,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
  },
  {
    id: 'menu-005',
    category: 'mains',
    name_ar: 'كبسة دجاج',
    name_en: 'Chicken Kabsa',
    description_ar: 'أرز بسمتي معطر بالبهارات مع قطع دجاج مشوية',
    description_en: 'Fragrant spiced basmati rice with grilled chicken',
    price: 210,
    image: 'https://images.unsplash.com/photo-1633945274309-2c1a1e6ec5f9?w=400&q=80',
  },
  {
    id: 'menu-006',
    category: 'mains',
    name_ar: 'باستا الفريدو بالدجاج',
    name_en: 'Chicken Alfredo Pasta',
    description_ar: 'باستا كريمية مع قطع دجاج وجبن البارميزان',
    description_en: 'Creamy pasta with chicken breast and parmesan',
    price: 195,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&q=80',
  },
  {
    id: 'menu-007',
    category: 'drinks',
    name_ar: 'عصير مانجو طازج',
    name_en: 'Fresh Mango Juice',
    description_ar: 'عصير مانجو طبيعي 100%',
    description_en: '100% natural mango juice',
    price: 55,
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80',
  },
  {
    id: 'menu-008',
    category: 'drinks',
    name_ar: 'قهوة عربية',
    name_en: 'Arabic Coffee',
    description_ar: 'قهوة عربية أصيلة بالهيل',
    description_en: 'Authentic cardamom-spiced Arabic coffee',
    price: 40,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80',
  },
  {
    id: 'menu-009',
    category: 'drinks',
    name_ar: 'ليمون بالنعناع',
    name_en: 'Lemon Mint',
    description_ar: 'ليمون طازج بالنعناع مع الثلج',
    description_en: 'Fresh lemonade with mint over ice',
    price: 45,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80',
  },
  {
    id: 'menu-010',
    category: 'desserts',
    name_ar: 'كنافة بالجبن',
    name_en: 'Cheese Kunafa',
    description_ar: 'كنافة ساخنة محشوة بالجبن مع القطر',
    description_en: 'Warm shredded pastry filled with cheese and syrup',
    price: 85,
    image: 'https://images.unsplash.com/photo-1615887023544-9f14a4b8c93c?w=400&q=80',
  },
  {
    id: 'menu-011',
    category: 'desserts',
    name_ar: 'أم علي',
    name_en: 'Om Ali',
    description_ar: 'حلى مصري تقليدي بالمكسرات والكريمة',
    description_en: 'Traditional Egyptian bread pudding with nuts and cream',
    price: 75,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80',
  },
  {
    id: 'menu-012',
    category: 'desserts',
    name_ar: 'تشيز كيك بالتوت',
    name_en: 'Berry Cheesecake',
    description_ar: 'تشيز كيك كريمي مع صوص التوت الطازج',
    description_en: 'Creamy cheesecake topped with fresh berry sauce',
    price: 95,
    image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=400&q=80',
  },
];
