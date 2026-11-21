/**
 * RIGFORGE - The Event-Driven PC Builder's Hub
 * Comprehensive catalog containing GPUs, CPUs, Motherboards, RAM, Storage (NVMe), and PSUs.
 * Synced with Aiven OpenSearch (Fuzzy Match) & Aiven PostgreSQL (ACID Row-Lock).
 */

const PC_PARTS_DATA = [
  // ==========================================
  // GRAPHICS CARDS (GPUs)
  // ==========================================
  {
    id: "gpu-rtx4090-fe",
    name: "NVIDIA GeForce RTX 4090 Founders Edition",
    category: "Graphics Card / GPU",
    categoryKey: "gpu",
    brand: "NVIDIA",
    releaseDate: "October 2022 (Q4 2022)",
    manufacturingDate: "October 2024 (Batch #NV-24Q4)",
    priceUSD: 1699,
    priceINR: 154999,
    msrpUSD: 1799,
    inStock: true,
    stockCount: 6,
    stockLockState: "auto-sync",
    rating: 4.9,
    reviewsCount: 312,
    warranty: "3 Years Standard Manufacturer Warranty",
    manufacturerDetails: {
      headquarters: "Santa Clara, California, USA",
      foundry: "TSMC 4N Custom Process (Taiwan)",
      assemblyPlant: "Hsinchu Science Park, Taiwan",
      batchCode: "NV-AD102-300-A1-2442",
      compliance: "CE, FCC, RoHS, REACH, WEEE"
    },
    keySpecs: [
      "24 GB GDDR6X VRAM",
      "Ada Lovelace Architecture",
      "16,384 CUDA Cores",
      "450W TGP (12VHPWR)"
    ],
    detailedSpecs: {
      "GPU Engine": "AD102-300 Extreme",
      "CUDA Cores": "16,384",
      "Base Clock": "2235 MHz",
      "Boost Clock": "2520 MHz",
      "Memory Size": "24 GB",
      "Memory Type": "GDDR6X (Micron)",
      "Memory Bus Width": "384-bit",
      "Memory Bandwidth": "1,008 GB/s",
      "Interface": "PCI Express 4.0 x16",
      "Ray Tracing Cores": "3rd Generation (128 Cores)",
      "Tensor Cores": "4th Generation (512 Cores)",
      "Outputs": "3x DisplayPort 1.4a, 1x HDMI 2.1a",
      "Power Connectors": "1x 16-Pin (12VHPWR) or 3x 8-Pin PCIe Adapter",
      "Recommended PSU": "850W minimum (1000W recommended)",
      "Card Dimensions": "304 mm x 137 mm x 61 mm (3-Slot)"
    },
    compatibility: {
      pcieSlot: "PCIe 4.0 / 5.0 x16 slot",
      clearanceLength: "310 mm minimum case clearance",
      powerRequirement: "12V-2x6 or 3x 8-Pin PCIe cables",
      recommendation: "Full Tower or spacious Mid Tower chassis"
    },
    description: "The pinnacle of desktop graphics power. Featuring the cutting-edge NVIDIA Ada Lovelace architecture, DLSS 3.5 Frame Generation, dual AV1 encoders, and revolutionary full ray tracing performance. Engineered for 4K/8K ultra gaming, 3D photorealistic rendering, and deep learning compute workloads.",
    accentColor: "#00f2fe",
    svgType: "gpu",
    image: "images/gpu-rtx4090.jpg"
  },
  {
    id: "gpu-rog-rtx4080s",
    name: "ASUS ROG Strix GeForce RTX 4080 Super OC",
    category: "Graphics Card / GPU",
    categoryKey: "gpu",
    brand: "ASUS",
    releaseDate: "January 2024 (Q1 2024)",
    manufacturingDate: "September 2024 (Batch #AS-2409)",
    priceUSD: 1149,
    priceINR: 104999,
    msrpUSD: 1199,
    inStock: true,
    stockCount: 11,
    stockLockState: "auto-sync",
    rating: 4.8,
    reviewsCount: 184,
    warranty: "3+1 Years Extended ASUS ROG Warranty",
    manufacturerDetails: {
      headquarters: "Beitou District, Taipei, Taiwan",
      foundry: "TSMC 4N Process (Taiwan)",
      assemblyPlant: "Taoyuan Manufacturing Center, Taiwan",
      batchCode: "ROG-4080S-O16G-GAMING-0924",
      compliance: "CE, FCC, RoHS, BSMI, VCCI"
    },
    keySpecs: [
      "16 GB GDDR6X 23 Gbps",
      "2670 MHz Factory OC",
      "Axial-tech Fans + Vapor Chamber",
      "AURA Sync ARGB Lighting"
    ],
    detailedSpecs: {
      "GPU Engine": "AD103-400-A1",
      "CUDA Cores": "10,240",
      "Boost Clock": "2670 MHz (OC Mode)",
      "Memory Size": "16 GB",
      "Memory Type": "GDDR6X (Ultra High Speed 23 Gbps)",
      "Memory Bus Width": "256-bit",
      "Cooling Solution": "Vapor Chamber + 3x Reversed Axial Fans",
      "Interface": "PCIe 4.0 x16",
      "Display Outputs": "2x Native HDMI 2.1a, 3x DisplayPort 1.4a",
      "Power Connectors": "1x 16-Pin (12VHPWR)",
      "Card Dimensions": "357.6 mm x 149.3 mm x 70.1 mm (3.5-Slot)"
    },
    compatibility: {
      pcieSlot: "PCIe 4.0 / 5.0 x16",
      clearanceLength: "360 mm case clearance required",
      powerRequirement: "750W - 850W PSU with 16-pin 12VHPWR",
      recommendation: "GPU anti-sag bracket included and recommended"
    },
    description: "Built for hardcore enthusiasts who refuse to compromise. Features a patented vapor chamber with milled heatspreader, massive vented die-cast shroud, Aura Sync RGB lighting, and dual BIOS switch for whisper-quiet or maximum performance modes.",
    accentColor: "#f43f5e",
    svgType: "gpu",
    image: "images/gpu-rog-rtx4080s.jpg"
  },
  {
    id: "gpu-rx7900xtx-sapphire",
    name: "Sapphire Nitro+ AMD Radeon RX 7900 XTX 24GB",
    category: "Graphics Card / GPU",
    categoryKey: "gpu",
    brand: "AMD",
    releaseDate: "December 2022 (Q4 2022)",
    manufacturingDate: "August 2024 (Batch #SP-2408)",
    priceUSD: 999,
    priceINR: 92499,
    msrpUSD: 1049,
    inStock: true,
    stockCount: 8,
    stockLockState: "auto-sync",
    rating: 4.8,
    reviewsCount: 147,
    warranty: "3 Years Sapphire Warranty",
    manufacturerDetails: {
      headquarters: "Sha Tin, Hong Kong / AMD Austin, TX",
      foundry: "TSMC 5nm & 6nm Chiplet Architecture",
      assemblyPlant: "Dongguan Industrial Park, China",
      batchCode: "NITRO-7900XTX-VAPORX-2435",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "24 GB GDDR6 High-Speed",
      "Vapor-X Chamber Cooling",
      "AMD RDNA 3 Chiplet Tech",
      "3x 8-Pin Power (Standard)"
    ],
    detailedSpecs: {
      "GPU Engine": "Navi 31 XTX Chiplet",
      "Stream Processors": "6,144 (96 Compute Units)",
      "Boost Clock": "Up to 2680 MHz",
      "Game Clock": "2510 MHz",
      "Memory Size": "24 GB GDDR6",
      "Memory Bus Width": "384-bit",
      "Infinity Cache": "96 MB 2nd Gen",
      "Cooling": "Vapor-X chamber with composite heatpipes",
      "Interface": "PCIe 4.0 x16",
      "Display Outputs": "2x HDMI 2.1a, 2x DisplayPort 2.1 (UHBR13.5)",
      "Power Connectors": "3x Standard 8-Pin PCIe",
      "Dimensions": "320 mm x 135.75 mm x 71.6 mm"
    },
    compatibility: {
      pcieSlot: "PCIe 4.0 x16 slot",
      clearanceLength: "325 mm clearance",
      powerRequirement: "800W PSU with 3x dedicated 8-pin cables",
      recommendation: "DP 2.1 supports up to 8K 165Hz displays"
    },
    description: "The crown jewel of AMD RDNA 3 architecture. Features Vapor-X cooling, magnesium-aluminum alloy frame, dual ARGB light bars with external 5V header sync, and robust 3x 8-pin power delivery that avoids 12VHPWR adapters entirely.",
    accentColor: "#ef4444",
    svgType: "gpu",
    image: "images/gpu-rog-rtx4080s.jpg"
  },

  // ==========================================
  // PROCESSORS (CPUs)
  // ==========================================
  {
    id: "cpu-ryzen-threadripper-7980x",
    name: "AMD Ryzen Threadripper 7980X 64-Core",
    category: "Processor / CPU",
    categoryKey: "cpu",
    brand: "AMD",
    releaseDate: "November 2023 (Q4 2023)",
    manufacturingDate: "October 2024 (Batch #AMD-TR7980-2442)",
    priceUSD: 4999,
    priceINR: 429999,
    msrpUSD: 5299,
    inStock: true,
    stockCount: 2,
    stockLockState: "row-lock",
    rating: 5.0,
    reviewsCount: 46,
    warranty: "3 Years AMD Official Commercial Warranty",
    manufacturerDetails: {
      headquarters: "Santa Clara, California, USA",
      foundry: "TSMC 5nm Core Dies + TSMC 6nm I/O Die",
      assemblyPlant: "Penang Assembly Facility, Malaysia",
      batchCode: "100-100001351WOF-2442TR",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "64 Cores / 128 Threads",
      "320 MB Total Cache (256MB L3)",
      "Up to 5.1 GHz Max Boost",
      "Socket sTR5 (TRX50 / WRX90)"
    ],
    detailedSpecs: {
      "Architecture": "Zen 4 High-End Desktop / Workstation",
      "Core Count": "64 Cores, 128 Threads",
      "Base Clock": "3.2 GHz",
      "Max Boost Clock": "5.1 GHz",
      "L3 Cache": "256 MB",
      "Total Cache": "320 MB",
      "Socket": "Socket sTR5 (LGA 4844)",
      "Memory Channels": "Quad-Channel DDR5 RDIMM ECC",
      "PCI Express": "PCIe 5.0 (up to 128 lanes available)",
      "TDP": "350W",
      "Overclocking": "Unlocked for overclocking"
    },
    compatibility: {
      socket: "AMD TRX50 or WRX90 Motherboards only",
      memoryType: "DDR5 Registered ECC Memory (RDIMM) required",
      cooling: "Heavy-duty custom loop or 360mm sTR5 AIO liquid cooler"
    },
    description: "The monstrous titan of computational rendering, simulation, and compiled builds. 64 Zen 4 cores and 128 threads provide unmatched workstation rendering, AI model training, and parallel scientific computing throughput.",
    accentColor: "#ea580c",
    svgType: "cpu",
    image: "images/cpu-threadripper.jpg"
  },
  {
    id: "cpu-ryzen-7800x3d",
    name: "AMD Ryzen 7 7800X3D Gaming Processor",
    category: "Processor / CPU",
    categoryKey: "cpu",
    brand: "AMD",
    releaseDate: "April 2023 (Q2 2023)",
    manufacturingDate: "October 2024 (Batch #AMD-2441)",
    priceUSD: 419,
    priceINR: 37999,
    msrpUSD: 449,
    inStock: true,
    stockCount: 19,
    stockLockState: "auto-sync",
    rating: 4.9,
    reviewsCount: 524,
    warranty: "3 Years AMD Official Boxed Processor Warranty",
    manufacturerDetails: {
      headquarters: "Santa Clara, California, USA",
      foundry: "TSMC 5nm FinFET (CCD) + 6nm (IOD), Taiwan",
      assemblyPlant: "Penang Assembly Facility, Malaysia",
      batchCode: "100-100000910WOF-2441PNT",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "8 Cores / 16 Threads",
      "104 MB Total Cache (3D V-Cache)",
      "Up to 5.0 GHz Max Boost",
      "120W TDP (Socket AM5)"
    ],
    detailedSpecs: {
      "Architecture": "Zen 4 with 2nd Gen 3D V-Cache",
      "CPU Cores": "8 Cores, 16 Threads",
      "Base Clock": "4.2 GHz",
      "Max Boost Clock": "5.0 GHz",
      "L2 Cache": "8 MB",
      "L3 Cache": "96 MB 3D V-Cache (104 MB total)",
      "Socket": "Socket AM5 (LGA1718)",
      "PCI Express": "PCIe 5.0 (28 total lanes)",
      "Memory Support": "DDR5-5200 / DDR5-6000 EXPO Sweet Spot",
      "Default TDP": "120W"
    },
    compatibility: {
      socket: "AMD AM5 (B650, B650E, X670, X670E, X870)",
      memoryType: "DDR5 RAM only (dual channel)",
      coolerRequirement: "Liquid cooler 240mm+ or dual-tower air cooler"
    },
    description: "The world's undisputed ultimate PC gaming processor. With AMD's breakthrough 3D V-Cache technology stacking 96MB of high-speed L3 cache directly onto the compute die, the 7800X3D delivers peerless frame rates and minimum latency in modern titles while consuming remarkably low power.",
    accentColor: "#f97316",
    svgType: "cpu",
    image: "images/cpu-ryzen7800x3d.jpg"
  },
  {
    id: "cpu-ryzen-7950x3d",
    name: "AMD Ryzen 9 7950X3D Flagship CPU",
    category: "Processor / CPU",
    categoryKey: "cpu",
    brand: "AMD",
    releaseDate: "February 2023 (Q1 2023)",
    manufacturingDate: "September 2024 (Batch #AMD-2437)",
    priceUSD: 599,
    priceINR: 52999,
    msrpUSD: 699,
    inStock: true,
    stockCount: 1,
    stockLockState: "row-lock",
    rating: 4.8,
    reviewsCount: 219,
    warranty: "3 Years Boxed Processor Warranty",
    manufacturerDetails: {
      headquarters: "Santa Clara, California, USA",
      foundry: "TSMC 5nm Core Dies + TSMC 6nm I/O Die",
      assemblyPlant: "Suzhou Facility, China",
      batchCode: "100-100000908WOF-2437SUZ",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "16 Cores / 32 Threads",
      "144 MB Total Cache",
      "Up to 5.7 GHz Max Boost",
      "Asymmetric Dual-CCD Design"
    ],
    detailedSpecs: {
      "Architecture": "Zen 4 with 3D V-Cache CCD + Frequency CCD",
      "CPU Cores": "16 Cores (8x 3D V-Cache, 8x Frequency), 32 Threads",
      "Base Clock": "4.2 GHz",
      "Max Boost Clock": "5.7 GHz",
      "Total L2 + L3 Cache": "144 MB (128 MB L3 + 16 MB L2)",
      "Socket": "Socket AM5",
      "TDP": "120W"
    },
    compatibility: {
      socket: "Socket AM5 Motherboards",
      memoryType: "DDR5 (AMD EXPO Recommended)",
      coolerRequirement: "360mm AIO Liquid Cooler Recommended"
    },
    description: "The do-it-all juggernaut. 16 cores and 32 threads deliver supreme workstation rendering, video encoding, code compilation, and simulation power, combined with stacked 3D V-Cache for world-class tier-1 gaming frame rates.",
    accentColor: "#ea580c",
    svgType: "cpu",
    image: "images/cpu-ryzen7800x3d.jpg"
  },
  {
    id: "cpu-intel-14900ks",
    name: "Intel Core i9-14900KS Special Edition 6.2GHz",
    category: "Processor / CPU",
    categoryKey: "cpu",
    brand: "Intel",
    releaseDate: "March 2024 (Q1 2024)",
    manufacturingDate: "October 2024 (Batch #INT-2442)",
    priceUSD: 669,
    priceINR: 59999,
    msrpUSD: 699,
    inStock: true,
    stockCount: 5,
    stockLockState: "auto-sync",
    rating: 4.7,
    reviewsCount: 165,
    warranty: "3 Years Boxed Intel Warranty",
    manufacturerDetails: {
      headquarters: "Santa Clara, California, USA",
      foundry: "Intel Fab 34 (Leixlip, Ireland) & Fab 42 (Arizona, USA)",
      assemblyPlant: "Intel Kulim Assembly Test, Malaysia",
      batchCode: "BX8071514900KS-L442E810",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "24 Cores (8P + 16E) / 32 Threads",
      "Record-Breaking 6.2 GHz Max Turbo",
      "36 MB Intel Smart Cache",
      "Intel Thermal Velocity Boost"
    ],
    detailedSpecs: {
      "Architecture": "Raptor Lake Refresh (Intel 7 Process)",
      "Core Count": "24 (8 Performance-cores + 16 Efficient-cores)",
      "Thread Count": "32 Threads",
      "Max Turbo Frequency": "6.20 GHz",
      "P-Core Boost Clock": "5.90 GHz / 6.20 GHz TVB",
      "E-Core Boost Clock": "4.50 GHz",
      "Intel Smart Cache (L3)": "36 MB",
      "Socket": "LGA1700",
      "Base Power": "150W (Max Turbo Power 253W - 320W Extreme Profile)"
    },
    compatibility: {
      socket: "Intel LGA1700 (Z790 / Z690 chipsets with updated BIOS)",
      coolerRequirement: "High-end 360mm or 420mm AIO cooler essential",
      powerRequirement: "Requires dual 8-pin EPS 12V CPU power headers"
    },
    description: "The fastest desktop processor Intel has ever manufactured. Hand-binned silicon pushing up to 6.2 GHz straight out of the box. Engineered for elite overclockers, hardcore gamers, and professionals needing maximum single-threaded and multi-threaded throughput.",
    accentColor: "#0284c7",
    svgType: "cpu",
    image: "images/cpu-intel14900ks.jpg"
  },

  // ==========================================
  // MOTHERBOARDS
  // ==========================================
  {
    id: "mobo-asus-x670e-hero",
    name: "ASUS ROG Crosshair X670E Hero Gaming Motherboard",
    category: "Motherboard",
    categoryKey: "motherboard",
    brand: "ASUS",
    releaseDate: "September 2022 (Rev 2024)",
    manufacturingDate: "August 2024 (Batch #AS-X670E-2432)",
    priceUSD: 649,
    priceINR: 57999,
    msrpUSD: 699,
    inStock: true,
    stockCount: 9,
    stockLockState: "auto-sync",
    rating: 4.8,
    reviewsCount: 142,
    warranty: "3 Years ASUS ROG Warranty",
    manufacturerDetails: {
      headquarters: "Taipei, Taiwan",
      foundry: "ASUSTeK SMT Manufacturing, Taiwan",
      assemblyPlant: "Suzhou Plant, China",
      batchCode: "CROSSHAIR-X670E-HERO-REV1.2-2432",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "AMD Socket AM5 (PCIe 5.0 Ready)",
      "18+2 Teamed Power Stages (110A)",
      "Dual USB4 40Gbps Type-C Ports",
      "Wi-Fi 6E & 2.5 Gb Ethernet"
    ],
    detailedSpecs: {
      "Form Factor": "ATX (30.5 cm x 24.4 cm)",
      "CPU Socket": "Socket AM5 for AMD Ryzen 7000 / 8000 / 9000 Series",
      "Chipset": "AMD X670E Dual Chipset",
      "Memory Slots": "4x DDR5 DIMMs, up to 192GB, DDR5-6400+ (OC), EXPO",
      "PCIe Slots": "2x PCIe 5.0 x16 slots (support x16 or x8/x8)",
      "Storage M.2": "5x M.2 slots (2x PCIe 5.0 x4, 3x PCIe 4.0 x4) + 6x SATA 6Gb/s",
      "Audio": "ROG SupremeFX ALC4082 with ESS ES9218 QUAD DAC",
      "Networking": "Intel 2.5Gb Ethernet, Wi-Fi 6E 2x2, Bluetooth 5.3"
    },
    compatibility: {
      cpuSupported: "AMD Ryzen 7000 / 8000 / 9000 Series CPUs",
      ramSupported: "DDR5 Only (Dual Channel, AMD EXPO certified)",
      chassisSupport: "Standard ATX or E-ATX compatible chassis"
    },
    description: "An unyielding foundation for your flagship AM5 gaming rig. Furnished with robust 18+2 stage 110A VRMs, Polymo Lighting animated I/O shroud, dual onboard USB4 40Gbps ports, and blazing PCIe 5.0 NVMe support.",
    accentColor: "#ef4444",
    svgType: "motherboard",
    image: "images/mobo-asus-x670e.jpg"
  },
  {
    id: "mobo-msi-z790-godlike",
    name: "MSI MEG Z790 GODLIKE MAX E-ATX Motherboard",
    category: "Motherboard",
    categoryKey: "motherboard",
    brand: "MSI",
    releaseDate: "October 2023 (Q4 2023)",
    manufacturingDate: "July 2024 (Batch #MSI-GLMAX-2428)",
    priceUSD: 1199,
    priceINR: 104999,
    msrpUSD: 1299,
    inStock: true,
    stockCount: 4,
    stockLockState: "auto-sync",
    rating: 4.9,
    reviewsCount: 88,
    warranty: "3 Years MSI Prestige Replacement Warranty",
    manufacturerDetails: {
      headquarters: "New Taipei City, Taiwan",
      foundry: "MSI Advanced PCB Technology Center",
      assemblyPlant: "Shenzhen High-Tech Complex, China",
      batchCode: "MEG-Z790-GODLIKE-MAX-REV1.0",
      compliance: "CE, FCC, RoHS, BSMI, VCCI"
    },
    keySpecs: [
      "4.0\" Dynamic Dashboard III OLED",
      "26+2 Direct Power Phases (105A SPS)",
      "Wi-Fi 7 + 10Gb Super LAN + 2.5Gb LAN",
      "7x M.2 Connectors (PCIe 5.0 Ready)"
    ],
    detailedSpecs: {
      "Form Factor": "E-ATX (30.5 cm x 28.8 cm)",
      "CPU Socket": "LGA1700 (14th, 13th & 12th Gen Intel Core)",
      "Chipset": "Intel Z790 Express",
      "Memory Slots": "4x DDR5 DIMMs, up to 256GB, DDR5-7800+ MHz (OC), XMP 3.0",
      "Expansion Slots": "2x PCIe 5.0 x16 slots",
      "Storage": "7x M.2 slots (1x PCIe 5.0 x4, 6x PCIe 4.0 x4) + M.2 Xpander card",
      "Display / Control": "4.0-inch detachable full-color touch OLED Dynamic Dashboard",
      "Networking": "Aquantia AQC113CS 10Gbps LAN + Intel 2.5Gbps LAN + Wi-Fi 7"
    },
    compatibility: {
      cpuSupported: "Intel Core i9 / i7 / i5 (LGA1700)",
      ramSupported: "DDR5 non-ECC unbuffered memory",
      chassisSupport: "Requires E-ATX compatible PC case with width clearance"
    },
    description: "The ultimate expression of motherboard engineering. Featuring an unprecedented 26+2 direct power phase VRM, a detachable 4-inch full color touch OLED Dynamic Dashboard, cutting-edge Wi-Fi 7 wireless, 10Gbps Ethernet, and dual Thunderbolt 4 connectivity.",
    accentColor: "#eab308",
    svgType: "motherboard",
    image: "images/mobo-asus-x670e.jpg"
  },
  {
    id: "mobo-msi-b650-tomahawk",
    name: "MSI MAG B650 Tomahawk WiFi Motherboard",
    category: "Motherboard",
    categoryKey: "motherboard",
    brand: "MSI",
    releaseDate: "October 2022 (Rev 2024)",
    manufacturingDate: "September 2024 (Batch #MSI-B650T-2438)",
    priceUSD: 199,
    priceINR: 18499,
    msrpUSD: 219,
    inStock: true,
    stockCount: 21,
    stockLockState: "auto-sync",
    rating: 4.8,
    reviewsCount: 367,
    warranty: "3 Years MSI Warranty",
    manufacturerDetails: {
      headquarters: "New Taipei City, Taiwan",
      foundry: "MSI Advanced PCB Line, Taiwan",
      assemblyPlant: "Kunshan Plant, China",
      batchCode: "MAG-B650-TOMAHAWK-WIFI-2438",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "14+2+1 Duet Rail Power System (80A)",
      "DDR5 Memory Boost (6600+ MHz OC)",
      "Wi-Fi 6E + 2.5G High Speed LAN",
      "3x M.2 Slots with Shield Frozr"
    ],
    detailedSpecs: {
      "Form Factor": "ATX (30.5 cm x 24.4 cm)",
      "Socket": "Socket AM5 for AMD Ryzen 7000 / 8000 / 9000 Series",
      "VRM Design": "14+2+1 Phases 80A Smart Power Stage",
      "Memory": "4x DDR5 DIMM, max 192GB, up to 6600+ MT/s (EXPO)",
      "PCIe Slots": "1x PCIe 4.0 x16 (steel armor), 1x PCIe 4.0 x4, 1x PCIe 3.0 x1"
    },
    compatibility: {
      cpuSupported: "AMD Ryzen 7000 / 8000 / 9000 Series processors",
      ramSupported: "DDR5 memory kits (Dual-channel EXPO)"
    },
    description: "The undisputed bang-for-the-buck champion of AM5 motherboards. Featuring heavyweight military-grade heatsinks, an 80A duet rail power delivery system, lightning-fast 2.5G LAN, and triple M.2 Shield Frozr cooling.",
    accentColor: "#38bdf8",
    svgType: "motherboard",
    image: "images/mobo-asus-x670e.jpg"
  },

  // ==========================================
  // MEMORY (RAM)
  // ==========================================
  {
    id: "ram-corsair-vengeance-32gb",
    name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5-6000",
    category: "Memory / RAM",
    categoryKey: "ram",
    brand: "Corsair",
    releaseDate: "June 2023 (Rev 2024)",
    manufacturingDate: "October 2024 (Batch #CS-VENG-2442)",
    priceUSD: 125,
    priceINR: 10999,
    msrpUSD: 145,
    inStock: true,
    stockCount: 28,
    stockLockState: "auto-sync",
    rating: 4.8,
    reviewsCount: 640,
    warranty: "Lifetime Limited Warranty",
    manufacturerDetails: {
      headquarters: "Milpitas, California, USA",
      foundry: "SK Hynix / Micron DRAM Foundry",
      assemblyPlant: "Taoyuan Production Center, Taiwan",
      batchCode: "CMH32GX5M2B6000C30-2442",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "32 GB Kit (2x 16GB)",
      "DDR5-6000 MT/s CL30-36-36-76",
      "Dynamic Ten-Zone RGB Lighting",
      "AMD EXPO & Intel XMP 3.0"
    ],
    detailedSpecs: {
      "Memory Type": "DDR5 UDIMM 288-Pin",
      "Tested Speed": "6000 MT/s",
      "Tested Latency": "CL30 Low-Latency",
      "Voltage": "1.35V",
      "Profile": "AMD EXPO & Intel XMP 3.0"
    },
    compatibility: {
      motherboardSupport: "Intel Z790/B760 & AMD X670E/B650 DDR5",
      clearanceHeight: "44 mm standard clearance"
    },
    description: "The gold standard of high-speed gaming memory featured on RigForge. Delivering 6000 MT/s at razor-sharp CL30 timings with ten-zone addressable RGB illumination and solid aluminum cooling.",
    accentColor: "#38bdf8",
    svgType: "ram",
    image: "images/ram-corsair-vengeance.jpg"
  },
  {
    id: "ram-corsair-dominator-64gb",
    name: "Corsair Dominator Titanium RGB 64GB (2x32GB) DDR5-6600",
    category: "Memory / RAM",
    categoryKey: "ram",
    brand: "Corsair",
    releaseDate: "October 2023 (Q4 2023)",
    manufacturingDate: "October 2024 (Batch #CS-DT-2441)",
    priceUSD: 319,
    priceINR: 27999,
    msrpUSD: 349,
    inStock: true,
    stockCount: 14,
    stockLockState: "auto-sync",
    rating: 4.9,
    reviewsCount: 198,
    warranty: "Limited Lifetime Corsair Manufacturer Warranty",
    manufacturerDetails: {
      headquarters: "Milpitas, California, USA",
      foundry: "SK Hynix A-Die ICs (Icheon, South Korea)",
      assemblyPlant: "Corsair Memory Assembly Center, Taiwan",
      batchCode: "CMP64GX5M2B6600C32-2441",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "64 GB Kit (2x 32GB Modules)",
      "DDR5-6600 MHz Speed (CL32-39-39-76)",
      "Patented DHX Cooling Technology",
      "11 Individually Addressable RGB LEDs"
    ],
    detailedSpecs: {
      "Memory Type": "DDR5 UDIMM 288-Pin",
      "Tested Speed": "6600 MT/s",
      "Tested Latency": "CL32-39-39-76",
      "Tested Voltage": "1.40V"
    },
    compatibility: {
      motherboardSupport: "Intel Z790/Z690 and AMD X670E/B650 series DDR5 boards",
      clearanceHeight: "56.3 mm (fits beneath most dual tower air coolers or AIOs)"
    },
    description: "Dominator Titanium combines clean, refined styling with superior forged aluminum construction and vibrant Capellix RGB lighting. Hand-sorted, tightly-screened SK Hynix A-die memory chips ensure high-frequency performance and generous overclocking headroom.",
    accentColor: "#06b6d4",
    svgType: "ram",
    image: "images/ram-corsair-vengeance.jpg"
  },
  {
    id: "ram-gskill-trident-royal-32gb",
    name: "G.SKILL Trident Z5 Royal Neo 32GB (2x16GB) DDR5-6000 CL28",
    category: "Memory / RAM",
    categoryKey: "ram",
    brand: "G.SKILL",
    releaseDate: "June 2024 (Q2 2024)",
    manufacturingDate: "October 2024 (Batch #GS-ROYAL-2443)",
    priceUSD: 189,
    priceINR: 16499,
    msrpUSD: 209,
    inStock: true,
    stockCount: 16,
    stockLockState: "auto-sync",
    rating: 4.9,
    reviewsCount: 112,
    warranty: "Limited Lifetime G.SKILL Warranty",
    manufacturerDetails: {
      headquarters: "Taipei, Taiwan",
      foundry: "SK Hynix High-Speed DRAM ICs (South Korea)",
      assemblyPlant: "G.Skill SMT Facility, Taipei, Taiwan",
      batchCode: "F5-6000J2836G16GX2-TR5NG-2443",
      compliance: "CE, FCC, RoHS, WEEE"
    },
    keySpecs: [
      "Ultra-Low Latency CL28-36-36-96",
      "6000 MT/s AMD EXPO Sweet Spot",
      "Crystalline Light Bar & Mirror Finish",
      "CNC-Cut Polished Gold/Silver Aluminum"
    ],
    detailedSpecs: {
      "Capacity": "32 GB (2x 16GB)",
      "Speed": "DDR5-6000 MT/s",
      "Latency Timings": "CL28-36-36-96",
      "Voltage": "1.40V"
    },
    compatibility: {
      motherboardSupport: "AMD Socket AM5 (Optimal 6000 CL28) and Intel LGA1700",
      clearanceHeight: "44 mm standard profile"
    },
    description: "The crown jewel of luxury performance memory. Trident Z5 Royal Neo features a crystalline light bar engineered to refract RGB lighting into a radiant display, complemented by electroplated mirror-finish aluminum heatspreaders and blistering low-latency CL28 timings.",
    accentColor: "#facc15",
    svgType: "ram",
    image: "images/ram-corsair-vengeance.jpg"
  },

  // ==========================================
  // STORAGE (NVMe SSDs)
  // ==========================================
  {
    id: "ssd-samsung-990pro-2tb",
    name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD",
    category: "Storage / NVMe SSD",
    categoryKey: "storage",
    brand: "Samsung",
    releaseDate: "October 2022 (Rev 2024)",
    manufacturingDate: "October 2024 (Batch #SEC-990P2T-2441)",
    priceUSD: 169,
    priceINR: 15499,
    msrpUSD: 199,
    inStock: true,
    stockCount: 22,
    stockLockState: "auto-sync",
    rating: 4.9,
    reviewsCount: 780,
    warranty: "5 Years Limited Warranty or 1,200 TBW",
    manufacturerDetails: {
      headquarters: "Suwon-si, Gyeonggi-do, South Korea",
      foundry: "Samsung V-NAND Fab 1 (Pyeongtaek, South Korea)",
      assemblyPlant: "Samsung Electronics Semiconductor, Korea",
      batchCode: "MZ-V9P2T0B-2441KR",
      compliance: "CE, FCC, VCCI, RCM, BSMI, RoHS"
    },
    keySpecs: [
      "2,000 GB (2TB) Capacity",
      "7,450 MB/s Read / 6,900 MB/s Write",
      "Samsung Pascal In-House Controller",
      "1,400,000 IOPS Random Read"
    ],
    detailedSpecs: {
      "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
      "Form Factor": "M.2 2280 Single-Sided",
      "Sequential Read": "Up to 7,450 MB/s",
      "Sequential Write": "Up to 6,900 MB/s"
    },
    compatibility: {
      slot: "M.2 2280 Key M (PCIe 4.0 / 3.0)",
      consoleCompatibility: "PS5 Compatible with heatsink"
    },
    description: "The benchmark PCIe 4.0 NVMe drive featured in RigForge builds. Reaches maximum bandwidth limits of PCIe 4.0 with lightning random access IOPS and power-saving Pascal architecture.",
    accentColor: "#0284c7",
    svgType: "storage",
    image: "images/ssd-samsung-990pro.jpg"
  },
  {
    id: "ssd-samsung-990pro-4tb",
    name: "Samsung 990 PRO with Heatsink 4TB PCIe 4.0 NVMe SSD",
    category: "Storage / NVMe SSD",
    categoryKey: "storage",
    brand: "Samsung",
    releaseDate: "October 2023 (Q4 2023)",
    manufacturingDate: "September 2024 (Batch #SEC-990P-2438)",
    priceUSD: 349,
    priceINR: 31499,
    msrpUSD: 379,
    inStock: true,
    stockCount: 18,
    stockLockState: "auto-sync",
    rating: 4.9,
    reviewsCount: 438,
    warranty: "5 Years Limited Warranty or 2,400 TBW",
    manufacturerDetails: {
      headquarters: "Suwon-si, Gyeonggi-do, South Korea",
      foundry: "Samsung V-NAND Fab 1 (Pyeongtaek, South Korea)",
      assemblyPlant: "Samsung Electronics Semiconductor, Korea",
      batchCode: "MZ-V9P4T0CW-2438KR",
      compliance: "CE, FCC, VCCI, RCM, BSMI, RoHS"
    },
    keySpecs: [
      "4,000 GB (4TB) High Capacity",
      "7,450 MB/s Read / 6,900 MB/s Write",
      "Slim Integrated Heatsink with RGB",
      "Samsung Pascal In-House Controller"
    ],
    detailedSpecs: {
      "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
      "Form Factor": "M.2 2280 with low-profile heatsink",
      "Sequential Read": "Up to 7,450 MB/s",
      "Sequential Write": "Up to 6,900 MB/s"
    },
    compatibility: {
      slot: "M.2 2280 Key M slot",
      consoleCompatibility: "100% PS5 Expansion Slot compliant"
    },
    description: "Reach near-maximum PCIe 4.0 speeds. Built with custom in-house Pascal controller and nickel coating for smart thermal management with integrated futuristic heatsink.",
    accentColor: "#0284c7",
    svgType: "storage",
    image: "images/ssd-samsung-990pro.jpg"
  },
  {
    id: "ssd-crucial-t705-2tb",
    name: "Crucial T705 2TB PCIe Gen5 NVMe M.2 SSD",
    category: "Storage / NVMe SSD",
    categoryKey: "storage",
    brand: "Crucial",
    releaseDate: "March 2024 (Q1 2024)",
    manufacturingDate: "October 2024 (Batch #CR-T705-2441)",
    priceUSD: 299,
    priceINR: 26999,
    msrpUSD: 339,
    inStock: true,
    stockCount: 12,
    stockLockState: "auto-sync",
    rating: 4.8,
    reviewsCount: 106,
    warranty: "5 Years Limited Crucial Warranty or 1,200 TBW",
    manufacturerDetails: {
      headquarters: "Boise, Idaho, USA (Micron Technology)",
      foundry: "Micron 232-Layer 3D TLC NAND (Singapore)",
      assemblyPlant: "Micron Semiconductor Assembly, Penang, Malaysia",
      batchCode: "CT2000T705SSD3-2441MY",
      compliance: "CE, FCC, RoHS, WEEE, VCCI"
    },
    keySpecs: [
      "Blistering 14,500 MB/s Sequential Read",
      "12,700 MB/s Sequential Write",
      "Next-Gen PCIe Gen5 x4 Technology",
      "Micron 232-Layer B58R 3D TLC"
    ],
    detailedSpecs: {
      "Interface": "PCIe Gen 5.0 x4, NVMe 2.0",
      "Form Factor": "M.2 2280 with premium copper/aluminum heatsink",
      "Sequential Read": "Up to 14,500 MB/s",
      "Sequential Write": "Up to 12,700 MB/s"
    },
    compatibility: {
      slot: "Requires PCIe 5.0 M.2 slot for full 14.5 GB/s speeds",
      cooling: "Thermal heatsink included"
    },
    description: "Enter the stratosphere of computing speed. Delivering an astonishing 14,500 MB/s sequential throughput, the Crucial T705 renders game asset loading instantaneous and handles uncompressed 8K video timelines.",
    accentColor: "#10b981",
    svgType: "storage",
    image: "images/ssd-samsung-990pro.jpg"
  },
  {
    id: "ssd-wd-black-sn850x-2tb",
    name: "WD_BLACK SN850X 2TB NVMe PCIe 4.0 Gaming SSD",
    category: "Storage / NVMe SSD",
    categoryKey: "storage",
    brand: "Western Digital",
    releaseDate: "August 2022 (Rev 2024)",
    manufacturingDate: "October 2024 (Batch #WD-SN850X-2442)",
    priceUSD: 169,
    priceINR: 14999,
    msrpUSD: 189,
    inStock: true,
    stockCount: 24,
    stockLockState: "auto-sync",
    rating: 4.8,
    reviewsCount: 512,
    warranty: "5 Years Western Digital Limited Warranty",
    manufacturerDetails: {
      headquarters: "San Jose, California, USA",
      foundry: "Kioxia / WD BiCS5 Flash Foundry (Yokkaichi, Japan)",
      assemblyPlant: "Western Digital Storage Facility, Bang Pa-in, Thailand",
      batchCode: "WDS200T2X0E-00BCA0-2442",
      compliance: "CE, FCC, RoHS, WEEE, KCC"
    },
    keySpecs: [
      "7,300 MB/s Read / 6,600 MB/s Write",
      "Game Mode 2.0 with Predictive Loading",
      "1,200,000 IOPS Random Read",
      "Western Digital G2 Custom Controller"
    ],
    detailedSpecs: {
      "Interface": "PCIe Gen4 x4, NVMe 1.4",
      "Capacity": "2,000 GB (2TB)",
      "Sequential Read Speed": "Up to 7,300 MB/s"
    },
    compatibility: {
      slot: "M.2 2280 Key M (PCIe 4.0 x4 / PCIe 3.0 x4)",
      consoleCompatibility: "PS5 Compatible"
    },
    description: "Engineered specifically for low-latency gaming and instantaneous load screens with Game Mode 2.0 predictive caching.",
    accentColor: "#f59e0b",
    svgType: "storage",
    image: "images/ssd-samsung-990pro.jpg"
  },

  // ==========================================
  // POWER SUPPLIES (PSUs)
  // ==========================================
  {
    id: "psu-seasonic-tx1300",
    name: "Seasonic PRIME TX-1300 ATX 3.0 1300W Titanium",
    category: "Power Supply / PSU",
    categoryKey: "psu",
    brand: "Seasonic",
    releaseDate: "November 2023 (Q4 2023)",
    manufacturingDate: "September 2024 (Batch #SS-TX1300-2436)",
    priceUSD: 469,
    priceINR: 41999,
    msrpUSD: 499,
    inStock: true,
    stockCount: 8,
    stockLockState: "auto-sync",
    rating: 5.0,
    reviewsCount: 94,
    warranty: "12 Years Industry-Leading Seasonic Global Warranty",
    manufacturerDetails: {
      headquarters: "Taipei, Taiwan",
      foundry: "Sea Sonic Electronics Precision Power Lab, Taiwan",
      assemblyPlant: "Dongguan Seasonic Facility, China",
      batchCode: "PRIME-TX-1300-ATX30-2436",
      compliance: "CE, FCC, RoHS, 80 PLUS Titanium, Cybenetics Titanium"
    },
    keySpecs: [
      "1300W Continuous Clean Power",
      "80 PLUS Titanium & Cybenetics Titanium",
      "Native ATX 3.0 & PCIe 5.0 12V-2x6",
      "135mm Fluid Dynamic Bearing Fan"
    ],
    detailedSpecs: {
      "Total Wattage": "1300 Watts",
      "Efficiency Rating": "80 PLUS Titanium (94% efficiency at 50% system load)",
      "ATX Specification": "Intel ATX 3.0 / PCIe 5.0 compliant with 200% power excursion handling",
      "Modularity": "100% Fully Modular with individually sleeved embossed cables"
    },
    compatibility: {
      chassisSupport: "Requires 210mm PSU clearance (Full Tower / large Mid-Tower)",
      gpuSupport: "Fully supports RTX 4090 / 50-series next-gen 600W power spikes"
    },
    description: "The gold standard of power engineering with Cybenetics Titanium acoustic and electrical efficiency backed by an unprecedented 12-year warranty.",
    accentColor: "#38bdf8",
    svgType: "psu",
    image: "images/psu-seasonic-tx1300.jpg"
  },
  {
    id: "psu-corsair-rm1000x-shift",
    name: "Corsair RM1000x Shift Fully Modular ATX 3.0 1000W",
    category: "Power Supply / PSU",
    categoryKey: "psu",
    brand: "Corsair",
    releaseDate: "January 2023 (Rev 2024)",
    manufacturingDate: "October 2024 (Batch #CS-RM1000X-2440)",
    priceUSD: 199,
    priceINR: 17999,
    msrpUSD: 219,
    inStock: true,
    stockCount: 15,
    stockLockState: "auto-sync",
    rating: 4.8,
    reviewsCount: 284,
    warranty: "10 Years Corsair Manufacturer Warranty",
    manufacturerDetails: {
      headquarters: "Milpitas, California, USA",
      foundry: "Channel Well Technology (CWT OEM) High Efficiency Lines",
      assemblyPlant: "Guangdong Production Zone, China",
      batchCode: "CP-9020253-NA-2440",
      compliance: "CE, FCC, RoHS, 80 PLUS Gold, Cybenetics Gold"
    },
    keySpecs: [
      "1000W 80 PLUS Gold Certified",
      "Revolutionary Side-Mounted Cable Interface",
      "ATX 3.0 & PCIe 5.0 12VHPWR Cable Included",
      "Zero RPM Fan Mode at Low-Medium Loads"
    ],
    detailedSpecs: {
      "Total Wattage": "1000 Watts",
      "Efficiency Rating": "80 PLUS Gold Certified (Up to 90% efficiency)",
      "Form Factor": "ATX with Side-Access modular panel"
    },
    compatibility: {
      chassisSupport: "Requires case with at least 30mm clearance behind PSU compartment",
      powerRequirement: "Universal AC Input 100-240V"
    },
    description: "A ground-up reimagining of PC cable management. Side-mounted connectors provide unobstructed access in high-airflow modern PC chassis.",
    accentColor: "#fbbf24",
    svgType: "psu",
    image: "images/psu-seasonic-tx1300.jpg"
  }
];

// Helper to get category metadata
const CATEGORIES_METADATA = [
  { key: "all", label: "All Components", count: 16 },
  { key: "gpu", label: "Graphics Cards (GPU)", count: 3 },
  { key: "cpu", label: "Processors (CPU)", count: 4 },
  { key: "motherboard", label: "Motherboards", count: 3 },
  { key: "ram", label: "Memory (RAM)", count: 3 },
  { key: "storage", label: "Storage (NVMe SSD)", count: 3 },
  { key: "psu", label: "Power Supplies (PSU)", count: 2 }
];

const BRANDS_LIST = [
  "All Brands",
  "NVIDIA",
  "AMD",
  "Intel",
  "ASUS",
  "MSI",
  "Corsair",
  "G.SKILL",
  "Samsung",
  "Crucial",
  "Seasonic",
  "Western Digital"
];

function getHardwareGraphic(type, accent = "#00f2fe", name = "") {
  return `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="hw-svg">
      <rect x="50" y="40" width="300" height="160" rx="12" fill="#111827" stroke="#334155" stroke-width="2"/>
      <circle cx="200" cy="120" r="40" fill="#1f2937" stroke="${accent}" stroke-width="2"/>
      <text x="200" y="125" fill="#f8fafc" font-family="'Orbitron', sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="2">RIGFORGE</text>
    </svg>
  `;
}
