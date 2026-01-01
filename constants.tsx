
import { Product } from './types';

export const CATEGORIES = [
  'Tất cả',
  'Điện thoại',
  'Máy tính',
  'Linh kiện',
  'Âm thanh',
  'Phụ kiện',
  'Gaming'
];

export const MOCK_PRODUCTS: Product[] = [
  // --- ASUS LAPTOPS ---
  {
    id: 'asus-rog-scar-18',
    name: 'ASUS ROG Strix SCAR 18 (2024)',
    price: 110000000,
    category: 'Gaming',
    description: 'Đỉnh cao laptop gaming với màn hình Nebula HDR Mini LED và cấu hình mạnh mẽ nhất hành tinh.',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000',
    rating: 5.0,
    reviews: 12,
    specs: {
      "CPU": "Intel Core i9-14900HX",
      "GPU": "RTX 4090 16GB (175W)",
      "Màn hình": "18-inch QHD+ 240Hz Mini LED",
      "RAM": "64GB DDR5"
    }
  },
  {
    id: 'asus-zenbook-duo',
    name: 'ASUS Zenbook Duo (2024)',
    price: 49990000,
    category: 'Máy tính',
    description: 'Laptop hai màn hình OLED 14 inch đột phá, định nghĩa lại khả năng đa nhiệm di động.',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    reviews: 25,
    specs: {
      "Màn hình": "2x 14-inch 3K OLED 120Hz",
      "CPU": "Intel Core Ultra 9",
      "Tính năng": "Bàn phím tháo rời"
    }
  },
  {
    id: 'asus-rog-g16',
    name: 'ASUS ROG Zephyrus G16',
    price: 64990000,
    category: 'Gaming',
    description: 'Laptop gaming mỏng nhẹ với thiết kế sang trọng, phù hợp cho cả làm việc và giải trí.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 42
  },

  // --- DELL LAPTOPS ---
  {
    id: 'dell-xps-13-plus',
    name: 'Dell XPS 13 Plus 9320',
    price: 42000000,
    category: 'Máy tính',
    description: 'Thiết kế tối giản đến từ tương lai với hàng phím chức năng cảm ứng và touchpad tàng hình.',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    reviews: 88,
    specs: {
      "CPU": "Intel Core i7-1360P",
      "Màn hình": "13.4-inch 3.5K OLED Touch",
      "Trọng lượng": "1.23 kg"
    }
  },
  {
    id: 'dell-alien-x16',
    name: 'Dell Alienware x16 R2',
    price: 85000000,
    category: 'Gaming',
    description: 'Dòng máy Alienware mỏng nhất hiện nay với hệ thống đèn Legend 3.0 cực kỳ ấn tượng.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 18,
    specs: {
      "CPU": "Intel Core Ultra 9",
      "GPU": "RTX 4080 12GB",
      "Vỏ": "Hợp kim nhôm & Magie"
    }
  },
  {
    id: 'dell-xps-15',
    name: 'Dell XPS 15 9530',
    price: 45500000,
    category: 'Máy tính',
    description: 'Sự cân bằng hoàn hảo giữa hiệu năng và màn hình InfinityEdge tuyệt đẹp.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    reviews: 128
  },

  // --- MSI LAPTOPS ---
  {
    id: 'msi-titan-18',
    name: 'MSI Titan 18 HX A14V',
    price: 135000000,
    category: 'Gaming',
    description: 'Kẻ thống trị phân khúc laptop gaming. Sức mạnh tương đương máy tính bàn trong một khối nhôm.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000',
    rating: 5.0,
    reviews: 8,
    specs: {
      "CPU": "Intel Core i9-14900HX",
      "Màn hình": "18-inch 4K+ Mini LED 120Hz",
      "Touchpad": "Haptic RGB tàng hình"
    }
  },
  {
    id: 'msi-prestige-16',
    name: 'MSI Prestige 16 AI Evo',
    price: 38000000,
    category: 'Máy tính',
    description: 'Laptop doanh nhân mỏng nhẹ tích hợp vi xử lý AI mới nhất và pin cực lâu.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
    rating: 4.6,
    reviews: 34,
    specs: {
      "CPU": "Intel Core Ultra 7",
      "Trọng lượng": "1.5 kg",
      "Pin": "99.9 Whr"
    }
  },
  {
    id: 'msi-raider-ge78',
    name: 'MSI Raider GE78 HX',
    price: 78990000,
    category: 'Gaming',
    description: 'Dải đèn Matrix Light Bar độc nhất vô nhị cùng hiệu năng không đối thủ.',
    image: 'https://images.unsplash.com/photo-1555533481-ac93502802f0?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    reviews: 24
  },

  // --- APPLE DEVICES ---
  {
    id: 'ip-16-pm',
    name: 'iPhone 16 Pro Max',
    price: 34990000,
    category: 'Điện thoại',
    description: 'Màn hình 6.9 inch lớn nhất, chip A18 Pro và nút Camera Control mới.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 156
  },
  {
    id: 'mac-m3-pro',
    name: 'MacBook Pro 14 M3 Pro',
    price: 49990000,
    category: 'Máy tính',
    description: 'Hiệu năng chuyên nghiệp cho coder và designer. Pin lên đến 22 giờ.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 312
  },
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro M4 (2024)',
    price: 28490000,
    category: 'Máy tính',
    description: 'Chip M4 cực mạnh trong thân máy mỏng nhất lịch sử Apple.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000',
    rating: 5.0,
    reviews: 45
  },

  // --- ACCESSORIES & AUDIO ---
  {
    id: 'marshall-stanmore-3',
    name: 'Marshall Stanmore III',
    price: 9490000,
    category: 'Âm thanh',
    description: 'Loa Bluetooth huyền thoại với chất âm rock đặc trưng.',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 142
  },
  {
    id: 'audio-sony-xm5',
    name: 'Sony WH-1000XM5',
    price: 7490000,
    category: 'Âm thanh',
    description: 'Đỉnh cao chống ồn và chất lượng âm thanh Hi-Res.',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    reviews: 890
  },
  {
    id: 'watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    price: 21990000,
    category: 'Phụ kiện',
    description: 'Đồng hồ thể thao chuyên nghiệp với độ sáng 3000 nits.',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 34
  },
  {
    id: 'gpu-rtx-4090',
    name: 'ROG Strix RTX 4090 OC',
    price: 56900000,
    category: 'Linh kiện',
    description: 'Card đồ họa mạnh nhất thế giới dành cho game thủ và chuyên gia đồ họa.',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 28
  }
];
