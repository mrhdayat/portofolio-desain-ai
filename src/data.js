// Dynamic Streetwear Campaign Database & Filesystem Glob Scan
// This module automatically scans, indexes, and imports all streetwear photoshoot images
// from the workspace folders using Vite's relative dynamic glob compiler.

// 1. Scan filesystem assets inside the internal media-database folder
const rawBaju = import.meta.glob('./media-database/baju/*.{jpg,jpeg,png,webp}', { eager: true });
const rawSkincare = import.meta.glob('./media-database/skincare/*.{jpg,jpeg,png,webp}', { eager: true });
const rawBrand1 = import.meta.glob('./media-database/photoshoot brand/*.{jpg,jpeg,png,webp}', { eager: true });
const rawBrand2 = import.meta.glob('./media-database/photoshoot brand2/*.{jpg,jpeg,png,webp}', { eager: true });
const rawBrand3 = import.meta.glob('./media-database/photoshoot brand3/*.{jpg,jpeg,png,webp}', { eager: true });
const rawBrand4 = import.meta.glob('./media-database/photoshoot brand4/*.{jpg,jpeg,png,webp}', { eager: true });
const rawBrand5 = import.meta.glob('./media-database/photoshoot brand5/*.{jpg,jpeg,png,webp}', { eager: true });
const rawBrand6 = import.meta.glob('./media-database/photoshoot brand6/*.{jpg,jpeg,png,webp}', { eager: true });
const rawBrand7 = import.meta.glob('./media-database/photoshoot brand7/*.{jpg,jpeg,png,webp}', { eager: true });
const rawBrand8 = import.meta.glob('./media-database/photoshoot brand8/*.{jpg,jpeg,png,webp}', { eager: true });

// Helper to map and compile raw glob files into indexed media objects
const compileGlob = (globObj, folderKey) => {
  return Object.entries(globObj).map(([key, value]) => {
    const filename = key.split('/').pop();
    const cleanName = filename
      .replace(/\.[^/.]+$/, "")
      .replace(/(_|-)/g, " ")
      .trim();

    return {
      id: `${folderKey}-${filename.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-").toLowerCase()}`,
      filename,
      name: cleanName,
      src: value.default || value,
      folder: folderKey,
      path: key
    };
  });
};

// 2. Assemble Master Media Index Array
export const allMediaAssets = [
  ...compileGlob(rawBrand1, 'photoshoot-brand'),
  ...compileGlob(rawBrand2, 'photoshoot-brand2'),
  ...compileGlob(rawBrand3, 'photoshoot-brand3'),
  ...compileGlob(rawBrand4, 'photoshoot-brand4'),
  ...compileGlob(rawBrand5, 'photoshoot-brand5'),
  ...compileGlob(rawBrand6, 'photoshoot-brand6'),
  ...compileGlob(rawBrand7, 'photoshoot-brand7'),
  ...compileGlob(rawBrand8, 'photoshoot-brand8'),
  ...compileGlob(rawSkincare, 'skincare'),
  ...compileGlob(rawBaju, 'baju')
];

// Helper to extract clean sub-arrays for campaigns
const getAssetsByFolder = (folderKey) => {
  return allMediaAssets.filter(asset => asset.folder === folderKey);
};

// 3. Structured Streetwear Campaigns & Lookbooks Mapping
// Built dynamically off filesystem assets, providing resilient fallback titles and concept logs.
export const campaigns = [
  {
    id: "dvtst-01-monolith",
    title: "DVTST-01 // MONOLITH CORE",
    subtitle: "Heavy Architectural Outerwear Campaign",
    category: "Streetwear // Campaign",
    year: "2026",
    folder: "photoshoot-brand",
    concept: "Architecting geometric alignment against monolithic concrete blocks. The collection maps structured black tactical wear against mineral-dusted high-contrast studio scales.",
    overview: "A highly structured visual sequence emphasizing absolute material consistency, protective geometries, and deep graphite shadow balances on heavy canvas textures.",
    client: "DVTST Studio",
    role: "Lead Creative Producer & Visual Architect",
    details: {
      location: "Concrete Vault Area A",
      lighting: "High-Contrast Solar Mimicry",
      textiles: "Waterproof Cordura & Graphite Wool",
      lockStatus: "Deterministic Face & Environment Lock"
    },
    challenges: [
      "Retaining high-definition fiber weave details across dark graphite garment shadows.",
      "Synchronizing severe concrete geometry with biological human posture curves.",
      "Enforcing precise fabric texture values without artificial smoothing."
    ],
    results: [
      "Clean visual identity alignment across 29 high-fidelity campaign assets.",
      "Elimination of generic plastic AI surface finishes, replacing with organic fiber grain.",
      "Asymmetric double-bordered editorial grid mapping."
    ]
  },
  {
    id: "dvtst-02-utility",
    title: "DVTST-02 // TECHNICAL SILHOUETTE",
    subtitle: "Underground Movement & Active Wear Drop",
    category: "Utility // Techwear",
    year: "2026",
    folder: "photoshoot-brand2",
    concept: "Dynamic running models and aggressive motion silhouettes. Capturing active physical stress states while preserving face consistency under rapid speed shifts.",
    overview: "Underground tactical athletic wear engineered for hyper-mobile urban operations. Spooled inside raw industrial parking basements and concrete underpasses.",
    client: "Devetesion Utility Labs",
    role: "Director of Motion Design & Styling",
    details: {
      location: "Subterranean Bypass B",
      lighting: "Sodium Vapor Fluorescents",
      textiles: "Ribbed Ripstop & Translucent Glaze Nylon",
      lockStatus: "Active Dynamic Pose Lock"
    },
    challenges: [
      "Managing high-velocity motion blur while maintaining facial identity registration.",
      "Combating harsh yellow-green color shifts under sodium vapor lights."
    ],
    results: [
      "High-speed action sequence showing 19 authentic technical poses.",
      "Volumetric nylon layers captured with physical wet glaze reflections."
    ]
  },
  {
    id: "dvtst-03-cyberpunk",
    title: "DVTST-03 // TRANSIT FLUIDITY",
    subtitle: "Streetwear Utility Campaign & Techwear",
    category: "Tactical // Streetwear",
    year: "2026",
    folder: "photoshoot-brand3",
    concept: "Fusing technical outerwear with neon-reflected wet streets. Visual system highlights protective, modular layering systems.",
    overview: "Transit-focused campaign capturing multi-functional modular cargo structures and reinforced utility harnesses for cross-city commuting environments.",
    client: "Transit Wear System",
    role: "Creative Director",
    details: {
      location: "Metropolitan Grid Junction 4",
      lighting: "Cyberpunk Ambient Cyan & Red Accent",
      textiles: "Gore-Tex Shells & Matte Polymer Seals",
      lockStatus: "Environment & Palette Lock"
    },
    challenges: [
      "Resolving deep shadow details against high-glare neon environments.",
      "Securing consistent harness structural layouts across different pose angles."
    ],
    results: [
      "Cohesive 23-piece campaign capturing matte tactical layering.",
      "Fluid integration of cybernetic elements and high-fashion crop grids."
    ]
  },
  {
    id: "dvtst-04-modular",
    title: "DVTST-04 // MODULAR WEAPONRY",
    subtitle: "High-Fashion Outerwear Layering Systems",
    category: "Luxury // Outerwear",
    year: "2026",
    folder: "photoshoot-brand4",
    concept: "Multi-layered modular garment breakdown. Visual highlights interactive webbing, modular pouches, and layered storm cuffs.",
    overview: "An editorial sequence documenting modular garment architecture. Models assemble, strip, and combine modular tech components in micro-gravity studio atmospheres.",
    client: "DVTST Apparel",
    role: "Lead Concept Architect",
    details: {
      location: "Studio Hanger C",
      lighting: "Cold Shadow Diffusers",
      textiles: "Ballistic Polyester & Matte Steel Hardware",
      lockStatus: "Garment Detail Integrity Lock"
    },
    challenges: [
      "Representing complex buckle mechanisms in extreme micro-crops.",
      "Controlling light reflections on highly polished hardware components."
    ],
    results: [
      "18 detailed modular wear compositions displaying multi-layered capability.",
      "Highly premium, asymmetrical technical specs cards."
    ]
  },
  {
    id: "dvtst-05-obsidian",
    title: "DVTST-05 // OBSIDIAN SHADOWS",
    subtitle: "Deep Graphite Street Studio Shoot",
    category: "Underground // Editorial",
    year: "2026",
    folder: "photoshoot-brand5",
    concept: "A comprehensive, extreme-crop portrait study in deep graphite. The interface isolates human eye detail and dark outerwear seams.",
    overview: "Exploring the boundaries of high-contrast monochrome design. Highlighting raw fabric edges, biological wrinkles, and extreme asymmetrical composition styles.",
    client: "Independent Street Culture Group",
    role: "Editorial Fashion Photographer",
    details: {
      location: "Blackout Vault D",
      lighting: "Single-Source Stark Xenon Strobe",
      textiles: "Dense Cotton Jersey & Brushed Obsidian Wool",
      lockStatus: "Micro-Portrait Detailing Lock"
    },
    challenges: [
      "Preserving deep black skin tones and charcoal fabrics without flattening visual depth.",
      "Retaining absolute pose stability across a massive 66-shot lookbook array."
    ],
    results: [
      "66 detailed monochrome campaign assets, creating our largest creative asset database.",
      "Tactile, human-designed compositions prioritizing negative space and geometric edges."
    ]
  },
  {
    id: "dvtst-06-anatomy",
    title: "DVTST-06 // TWISTED ANATOMY",
    subtitle: "Avant-Garde Pose Sequence Studies",
    category: "Experimental // Fashion",
    year: "2026",
    folder: "photoshoot-brand6",
    concept: "A sequence-based motion design tracking extreme poses. The apparel shifts shapes, following dynamic joint angles.",
    overview: "High-contrast streetwear set exploring body contortion aesthetics, elastic textile strains, and dynamic asymmetric joint-bending visual frames.",
    client: "Avant-Garde Movement Society",
    role: "Lead Motion Choreographer",
    details: {
      location: "White Cyc Studio E",
      lighting: "Soft Overhead Daylight Scrims",
      textiles: "Elastic Tech Spandex & Matte Rubber Sheaths",
      lockStatus: "Skeletal Alignment Tracking Lock"
    },
    challenges: [
      "Maintaining joint consistency on spandex panels across extreme rotation states.",
      "Achieving high frame-rate rendering for custom spring elastic UI layers."
    ],
    results: [
      "22 avant-garde skeletal sequence images.",
      "Cinematic micro-interactions responding dynamically to mouse proximity."
    ]
  },
  {
    id: "dvtst-07-steps",
    title: "DVTST-07 // MUSEUM STEPS",
    subtitle: "Monolithic Architectural Outerwear",
    category: "Streetwear // Campaign",
    year: "2026",
    folder: "photoshoot-brand7",
    concept: "Placing brutalist structured outerwear in classic museum environments. Highlighting contrasting historical steps with modern technical gear.",
    overview: "A spatial study exploring the dialogue between classic columns, concrete steps, and protective black streetwear shells. Editorial magazine grid styling.",
    client: "Metropolitan Modern Council",
    role: "Lead Visual Curator",
    details: {
      location: "Museum Plazas & Outer Colonnades",
      lighting: "Natural Overhead Midday Shadows",
      textiles: "Heavy Duty Twill & Raw Denim Shells",
      lockStatus: "Spatial Proportion Lock"
    },
    challenges: [
      "Controlling light blowouts on white marble surfaces while maintaining dark tactical detail.",
      "Balancing historical scale with streetwear graphic elements."
    ],
    results: [
      "20 premium public-space architectural streetwear campaign assets.",
      "Beautiful magazine-style asymmetrical collage grids."
    ]
  },
  {
    id: "dvtst-08-concrete",
    title: "DVTST-08 // URBAN MONUMENTS",
    subtitle: "Concrete Intimacy & Urban Studies",
    category: "Brutalist // Streetwear",
    year: "2026",
    folder: "photoshoot-brand8",
    concept: "Tactile garment interaction against raw concrete interfaces. Capturing physical contact points, texture friction, and dust marks.",
    overview: "Streetwear lookbook investigating surface friction. Models lean against aggregate concrete blocks, highlighting rough plaster dust against slick tactical fabrics.",
    client: "Concrete Architectural Society",
    role: "Material Director & Stylist",
    details: {
      location: "Brutalist Plaza Center",
      lighting: "Indirect Overcast Ambient Shadowing",
      textiles: "Waxed Canvas & Coated Ripstop Cotton",
      lockStatus: "Friction Point Detail Lock"
    },
    challenges: [
      "Resolving micro-level dust transfers and fabric scratches.",
      "Enforcing natural, non-plastic concrete skin integration."
    ],
    results: [
      "21 high-definition urban Monument lookbook images.",
      "Clean, readable neo-brutalist card states with block shadow details."
    ]
  },
  {
    id: "ghost-organic",
    title: "GHOST ORGANIC // FLUID SKINCARE",
    subtitle: "Avant-Garde Fluid Cosmetics Presentation",
    category: "Cosmetics // Skincare",
    year: "2026",
    folder: "skincare",
    concept: "Fusing organic liquid glazes with scientific glass volumetrics. The visual focus is on thick glossy textures, glass refracting neon, and oil-suspended drops.",
    overview: "Next-generation fluid cosmetics campaign. The design focuses on physical glass containers, thick glossy layers, and biological ingredient transparency.",
    client: "Ghost Organic Labs",
    role: "Product Designer & Visual Director",
    details: {
      location: "Refraction Studio F",
      lighting: "Biomorphic Light Halos & Liquid Refractions",
      textiles: "Liquid Glazes & Borosilicate Glassware",
      lockStatus: "Volumetric Refraction Lock"
    },
    challenges: [
      "Representing light paths accurately through thick glass curvatures.",
      "Excluding synthetic glowing vectors to preserve realistic oil transparency."
    ],
    results: [
      "18 dynamic fluid cosmetics assets featuring thick, premium glazes.",
      "Volumetric glass card modules reflecting genuine light refraction patterns."
    ]
  },
  {
    id: "streetwear-core",
    title: "UNDERGROUND BAJU // CORE SERIES",
    subtitle: "Everyday Domestic Streetwear Drops",
    category: "Streetwear // Core",
    year: "2026",
    folder: "baju",
    concept: "Sanitizing streetwear presentation by grounding garments in mundane, everyday objects and domestic concrete environments.",
    overview: "A series of raw clothing drops presented in flat-lays and domestic concrete corners, avoiding standard fake futuristic UI clichés.",
    client: "Baju Group",
    role: "Lead Flat-Lay Stylist",
    details: {
      location: "Studio Domestic C1",
      lighting: "Raw Industrial Skylight Diffusers",
      textiles: "Heavyweight French Terry & Brushed Cotton",
      lockStatus: "Domestic Space Texture Lock"
    },
    challenges: [
      "Accurately documenting dense, heavyweight cotton drape details in natural lighting.",
      "Avoiding typical robotic modeling poses in favor of authentic domestic environments."
    ],
    results: [
      "11 streetwear lookbook files highlighting real, premium heavy-cotton hoodies.",
      "Integrated virtual care labels and barcodes."
    ]
  }
];

// Helper to compile final campaigns with active dynamic filesystem image references
export const projects = campaigns.map(camp => {
  const images = getAssetsByFolder(camp.folder);
  const heroImage = images[0] ? images[0].src : null;
  const remainingImages = images.slice(1).map(img => img.src);

  return {
    ...camp,
    heroImage,
    images: remainingImages,
    assetCount: images.length,
    rawAssets: images
  };
});