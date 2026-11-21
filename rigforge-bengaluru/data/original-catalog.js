// Additional product catalog migrated from the original outputs/app.js.
const ORIGINAL_CATALOG_PRODUCTS = [
  {
    "id": "original-asus-4060",
    "name": "ASUS Dual RTX 4060 OC",
    "detail": "8GB · GDDR6 · dual-fan",
    "category": "gpu",
    "categoryName": "Graphics card",
    "image": "images/catalog/original-asus-4060.png",
    "priceINR": 32000,
    "retailerOnly": true,
    "alt": "ASUS Dual RTX 4060 OC",
    "imageSource": "MDComputers product listing",
    "specs": "8GB · GDDR6 · dual-fan"
  },
  {
    "id": "original-msi-4090",
    "name": "MSI RTX 4090 Gaming X Trio",
    "detail": "24GB · GDDR6X · triple-fan",
    "category": "gpu",
    "categoryName": "Graphics card",
    "image": "images/catalog/original-msi-4090.png",
    "priceINR": 572799,
    "retailerOnly": true,
    "alt": "MSI RTX 4090 Gaming X Trio",
    "imageSource": "MDComputers product listing",
    "specs": "24GB · GDDR6X · triple-fan"
  },
  {
    "id": "original-kingston-fury-32gb",
    "name": "Kingston FURY Beast 32GB DDR5",
    "detail": "5200MHz · CL40 · 1×32GB",
    "category": "memory",
    "categoryName": "Memory",
    "image": "images/catalog/original-kingston-fury-beast-32gb-ddr5.jpg",
    "priceINR": 53299,
    "retailerOnly": true,
    "alt": "Kingston FURY Beast 32GB DDR5",
    "imageSource": "MDComputers product listing",
    "specs": "5200MHz · CL40 · 1×32GB"
  },
  {
    "name": "Intel Core i3-12100F",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Entry-level",
    "use": "Office tasks, home media, budget 1080p gaming",
    "image": "images/catalog/original-intel-core-i3-12100f.webp"
  },
  {
    "name": "Intel Core i3-14100F",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Entry-level",
    "use": "Office tasks, home media, budget 1080p gaming",
    "image": "images/catalog/original-intel-core-i3-14100f.jpg"
  },
  {
    "name": "AMD Ryzen 5 8500G",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Entry-level",
    "use": "Office tasks, home media, budget 1080p gaming",
    "image": "images/catalog/original-amd-ryzen-5-8500g.jpg"
  },
  {
    "name": "AMD Ryzen 5 8600G",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Entry-level",
    "use": "Office tasks, home media, budget 1080p gaming",
    "image": "images/catalog/original-amd-ryzen-5-8600g.webp"
  },
  {
    "name": "Intel Core i5-14400F",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Mid-range",
    "use": "Mainstream 1080p/1440p gaming, streaming, productivity",
    "image": "images/catalog/original-intel-core-i5-14400f.jpg"
  },
  {
    "name": "Intel Core Ultra 5 225F",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Mid-range",
    "use": "Mainstream 1080p/1440p gaming, streaming, productivity",
    "image": "images/catalog/original-intel-core-ultra-5-250k-plus.jpg"
  },
  {
    "name": "Intel Core Ultra 5 250K Plus",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Mid-range",
    "use": "Mainstream 1080p/1440p gaming, streaming, productivity",
    "image": "images/catalog/original-intel-core-ultra-5-250k-plus.jpg"
  },
  {
    "name": "AMD Ryzen 5 9600X",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Mid-range",
    "use": "Mainstream 1080p/1440p gaming, streaming, productivity",
    "image": "images/catalog/original-amd-ryzen-5-9600x.jpg"
  },
  {
    "name": "AMD Ryzen 7 9700X",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "Mid-range",
    "use": "Mainstream 1080p/1440p gaming, streaming, productivity",
    "image": "images/catalog/original-amd-ryzen-7-9700x.jpg"
  },
  {
    "name": "Intel Core Ultra 7 265K",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "High-end / enthusiast",
    "use": "Competitive high-FPS gaming, 3D and video rendering",
    "image": "images/catalog/original-intel-core-ultra-7-265k.jpg"
  },
  {
    "name": "Intel Core Ultra 9 285K",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "High-end / enthusiast",
    "use": "Competitive high-FPS gaming, 3D and video rendering",
    "image": "images/catalog/original-intel-core-ultra-7-265k.jpg"
  },
  {
    "name": "AMD Ryzen 7 9800X3D",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "High-end / enthusiast",
    "use": "Competitive high-FPS gaming, 3D and video rendering",
    "image": "images/catalog/original-amd-ryzen-7-9800x3d.jpg"
  },
  {
    "name": "AMD Ryzen 9 9950X",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "High-end / enthusiast",
    "use": "Competitive high-FPS gaming, 3D and video rendering",
    "image": "images/catalog/original-amd-ryzen-9-9950x.jpg"
  },
  {
    "name": "AMD Ryzen 9 9950X3D",
    "category": "cpu",
    "categoryName": "Processor",
    "tier": "High-end / enthusiast",
    "use": "Competitive high-FPS gaming, 3D and video rendering",
    "image": "images/catalog/original-amd-ryzen-9-9950x3d.jpg"
  },
  {
    "name": "NVIDIA GeForce RTX 4060",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Entry-level",
    "use": "1080p gaming and esports",
    "image": "images/catalog/original-nvidia-geforce-rtx-4060.png"
  },
  {
    "name": "NVIDIA GeForce RTX 5060",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Entry-level",
    "use": "1080p gaming and esports",
    "image": "images/catalog/original-nvidia-geforce-rtx-5060.png"
  },
  {
    "name": "AMD Radeon RX 7600",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Entry-level",
    "use": "1080p gaming and esports",
    "image": "images/catalog/original-amd-radeon-rx-7600.png"
  },
  {
    "name": "AMD Radeon RX 8600",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Entry-level",
    "use": "1080p gaming and esports",
    "image": "images/catalog/rep-amd-radeon-rx-8600.png"
  },
  {
    "name": "NVIDIA GeForce RTX 4070 Super",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Mid-range",
    "use": "1440p gaming, ray tracing and video editing",
    "image": "images/catalog/rep-nvidia-geforce-rtx-4070-super.png"
  },
  {
    "name": "NVIDIA GeForce RTX 5070",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Mid-range",
    "use": "1440p gaming, ray tracing and video editing",
    "image": "images/catalog/original-nvidia-geforce-rtx-5070.png"
  },
  {
    "name": "NVIDIA GeForce RTX 5070 Ti",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Mid-range",
    "use": "1440p gaming, ray tracing and video editing",
    "image": "images/catalog/original-nvidia-geforce-rtx-5070-ti.png"
  },
  {
    "name": "AMD Radeon RX 7800 XT",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Mid-range",
    "use": "1440p gaming, ray tracing and video editing",
    "image": "images/catalog/original-amd-radeon-rx-7900-xtx.jpg"
  },
  {
    "name": "AMD Radeon RX 8800 XT",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "Mid-range",
    "use": "1440p gaming, ray tracing and video editing",
    "image": "images/catalog/rep-amd-radeon-rx-8800-xt.png"
  },
  {
    "name": "NVIDIA GeForce RTX 5080",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "High-end / flagship",
    "use": "4K gaming, path tracing and local AI/ML",
    "image": "images/catalog/original-nvidia-geforce-rtx-5080.jpg"
  },
  {
    "name": "NVIDIA GeForce RTX 5090",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "High-end / flagship",
    "use": "4K gaming, path tracing and local AI/ML",
    "image": "images/catalog/original-nvidia-geforce-rtx-5090.png"
  },
  {
    "name": "AMD Radeon RX 7900 XTX",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "High-end / flagship",
    "use": "4K gaming, path tracing and local AI/ML",
    "image": "images/catalog/original-amd-radeon-rx-7900-xtx.jpg"
  },
  {
    "name": "AMD Radeon RX 9900 XTX",
    "category": "gpu",
    "categoryName": "Graphics card",
    "tier": "High-end / flagship",
    "use": "4K gaming, path tracing and local AI/ML",
    "image": "images/catalog/rep-amd-radeon-rx-9900-xtx.png"
  },
  {
    "name": "Kingston NV3",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Budget",
    "use": "Everyday responsiveness and secondary game libraries",
    "image": "images/catalog/original-kingston-nv3.jpg"
  },
  {
    "name": "Crucial P310",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Budget",
    "use": "Everyday responsiveness and secondary game libraries",
    "image": "images/catalog/original-crucial-p310.jpg"
  },
  {
    "name": "Crucial BX500",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Budget",
    "use": "Everyday responsiveness and secondary game libraries",
    "image": "images/catalog/original-crucial-bx500.jpg"
  },
  {
    "name": "WD Black SN7100",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Mainstream",
    "use": "Primary OS and gaming drive",
    "image": "images/catalog/original-wd-black-sn7100.jpg"
  },
  {
    "name": "Samsung 990 PRO",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Mainstream",
    "use": "Primary OS and gaming drive",
    "image": null
  },
  {
    "name": "WD Blue SN5100",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Mainstream",
    "use": "Primary OS and gaming drive",
    "image": "images/catalog/original-wd-blue-sn5100.png"
  },
  {
    "name": "Samsung 9100 PRO",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Enthusiast",
    "use": "Large video projects and data transfers",
    "image": "images/catalog/original-samsung-9100-pro.webp"
  },
  {
    "name": "Crucial T705",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Enthusiast",
    "use": "Large video projects and data transfers",
    "image": "images/catalog/original-crucial-t705.png"
  },
  {
    "name": "Crucial T710",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Enthusiast",
    "use": "Large video projects and data transfers",
    "image": "images/catalog/original-crucial-t710.png"
  },
  {
    "name": "WD Black SN8100",
    "category": "storage",
    "categoryName": "Storage",
    "tier": "Enthusiast",
    "use": "Large video projects and data transfers",
    "image": "images/catalog/original-wd-black-sn8100.jpg"
  },
  {
    "name": "G.Skill Ripjaws V DDR4 3200 CL16",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Budget / legacy",
    "use": "Older AM4 and DDR4 LGA1700 builds",
    "image": "images/catalog/original-g-skill-ripjaws-v-ddr4-3200-cl16.png"
  },
  {
    "name": "Corsair Vengeance LPX DDR4 3200 CL16",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Budget / legacy",
    "use": "Older AM4 and DDR4 LGA1700 builds",
    "image": "images/catalog/original-corsair-vengeance-lpx-ddr4-3200-cl16.jpg"
  },
  {
    "name": "Adata XPG Gammix D30 DDR4 3200 CL16",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Budget / legacy",
    "use": "Older AM4 and DDR4 LGA1700 builds",
    "image": "images/catalog/original-adata-xpg-gammix-d30-ddr4-3200-cl16.jpg"
  },
  {
    "name": "Corsair Vengeance DDR5 5600",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Mainstream",
    "use": "AM5 and Intel LGA1700/LGA1851 builds",
    "image": "images/catalog/original-corsair-vengeance-ddr5-5600.webp"
  },
  {
    "name": "Crucial Pro DDR5",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Mainstream",
    "use": "AM5 and Intel LGA1700/LGA1851 builds",
    "image": "images/catalog/original-crucial-pro-ddr5.jpg"
  },
  {
    "name": "G.Skill Ripjaws S5 DDR5",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Mainstream",
    "use": "AM5 and Intel LGA1700/LGA1851 builds",
    "image": "images/catalog/original-g-skill-ripjaws-s5-ddr5.jpg"
  },
  {
    "name": "G.Skill Trident Z5 Neo DDR5",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Enthusiast",
    "use": "Low-latency gaming and overclocked builds",
    "image": "images/catalog/original-g-skill-trident-z5-neo-ddr5.webp"
  },
  {
    "name": "Klevv CRAS V RGB DDR5",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Enthusiast",
    "use": "Low-latency gaming and overclocked builds",
    "image": "images/catalog/original-klevv-cras-v-rgb-ddr5.jpg"
  },
  {
    "name": "Adata XPG Lancer RGB DDR5",
    "category": "memory",
    "categoryName": "Memory",
    "tier": "Enthusiast",
    "use": "Low-latency gaming and overclocked builds",
    "image": "images/catalog/original-adata-xpg-lancer-rgb-ddr5.jpg"
  }
];

(function mergeOriginalCatalog(){
  const norm = value => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const duplicateModelKeys = ['amd ryzen 7 7800x3d', 'samsung 990 pro', 'crucial t705'];
  for (const item of ORIGINAL_CATALOG_PRODUCTS) {
    const key = norm(item.name);
    const knownDuplicate = duplicateModelKeys.some(model => key.includes(model) && PC_PARTS_DATA.some(p => norm(p.name).includes(model)));
    const exactDuplicate = PC_PARTS_DATA.some(p => norm(p.name) === key);
    if (knownDuplicate || exactDuplicate) continue;
    const categoryKey = item.category === 'memory' ? 'ram' : item.category;
    const brand = item.name.match(/^(NVIDIA|AMD|Intel|ASUS|MSI|Sapphire|Kingston|Corsair|G\.SKILL|G\.Skill|Adata|ADATA|Crucial|WD|Western Digital)/i)?.[1] || 'Component';
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    PC_PARTS_DATA.push({
      id: `original-${slug}`, name: item.name, category: item.categoryName, categoryKey, brand,
      releaseDate: 'See manufacturer specifications', manufacturingDate: 'Manufacturer batch varies',
      priceUSD: 0, priceINR: null, msrpUSD: 0, inStock: true, stockCount: 0,
      stockLockState: 'retailer-check', rating: 0, reviewsCount: 0,
      warranty: 'Check manufacturer and retailer terms',
      manufacturerDetails: { headquarters: 'See manufacturer website', foundry: 'See product specifications', assemblyPlant: 'Varies by product', batchCode: 'Not provided', compliance: 'See product documentation' },
      keySpecs: [item.detail || item.tier || 'Catalog product', item.use || 'Check retailer listing'],
      detailedSpecs: { 'Catalog tier': item.tier || 'Featured listing', 'Product details': item.detail || item.use || 'See retailer listing', 'Price status': 'Check current retailer offer' },
      compatibility: { retailerPrice: 'Open retailer listing to verify current price, stock and exact variant.' },
      description: item.detail || `${item.tier} ${item.categoryName.toLowerCase()} listing from the original RigForge catalog. Check manufacturer specifications for exact variant details.`,
      accentColor: '#38bdf8', svgType: categoryKey === 'gpu' ? 'gpu' : categoryKey === 'cpu' ? 'cpu' : categoryKey === 'ram' ? 'ram' : 'ssd',
      image: item.image || null, retailerOnly: true, originalCatalogAmountINR: item.priceINR || null
    });
  }
})();

