# Dashboard Images Integration Examples

## Overview

This document shows how to integrate the generated dashboard images into your React components with optimal performance and accessibility.

## Basic Image Integration

### Simple Implementation

```jsx
// HeroSection.tsx
<img
  src="/images/mibbs-dashboard-budget-overview.png"
  alt="MIBBS Brand Budget Overview dashboard"
  className="w-full h-auto rounded-2xl shadow-2xl"
  width={1200}
  height={800}
/>
```

### With Retina Support

```jsx
<img
  src="/images/mibbs-dashboard-budget-overview.png"
  srcSet="
    /images/mibbs-dashboard-budget-overview.png 1x,
    /images/mibbs-dashboard-budget-overview@2x.png 2x
  "
  alt="MIBBS Brand Budget Overview dashboard"
  className="w-full h-auto rounded-2xl"
  width={1200}
  height={800}
/>
```

### With WebP Format Support

```jsx
<picture>
  <source
    srcSet="
      /images/mibbs-dashboard-budget-overview.webp 1x,
      /images/mibbs-dashboard-budget-overview@2x.webp 2x
    "
    type="image/webp"
  />
  <img
    src="/images/mibbs-dashboard-budget-overview.png"
    srcSet="/images/mibbs-dashboard-budget-overview@2x.png 2x"
    alt="MIBBS Brand Budget Overview dashboard"
    className="w-full h-auto rounded-2xl"
    width={1200}
    height={800}
  />
</picture>
```

## Performance Optimizations

### Lazy Loading

```jsx
// For images below the fold
<img
  src="/images/mibbs-dashboard-channel-breakdown.png"
  alt="Channel-wise spending breakdown"
  loading="lazy"
  className="w-full h-auto"
/>
```

### Priority Loading for Hero

```jsx
// For above-the-fold hero image
<img
  src="/images/mibbs-dashboard-budget-overview.png"
  alt="MIBBS Brand Budget Overview"
  loading="eager"
  fetchpriority="high"
  className="w-full h-auto"
/>
```

### With Blur Placeholder

```jsx
import { useState } from 'react';

function DashboardImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Blur placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl" />
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto rounded-2xl transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

// Usage
<DashboardImage
  src="/images/mibbs-dashboard-budget-overview.png"
  alt="MIBBS dashboard"
/>
```

## Component-Specific Examples

### 1. Hero Section (Image 1)

```jsx
// src/components/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="hero">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Text content */}
        <div>...</div>

        {/* Dashboard Preview */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-100 bg-white">
            <img
              src="/images/mibbs-dashboard-budget-overview.png"
              srcSet="/images/mibbs-dashboard-budget-overview@2x.png 2x"
              alt="MIBBS Brand Budget Overview showing ₹2.4L monthly budget with AI-optimized spending breakdown"
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto"
              width={1200}
              height={800}
            />
          </div>

          {/* Floating stats remain as overlay */}
          <div className="absolute top-[10%] -left-10 ...">
            Money Saved: ₹45,000
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 2. How It Works Section (Images 2-4)

```jsx
// src/components/HowItWorksSection.tsx
const steps = [
  {
    image: '/images/mibbs-dashboard-budget-overview.png',
    alt: 'Simple 4-field form to tell us about your business',
    title: 'Tell Us About Your Business'
  },
  {
    image: '/images/mibbs-dashboard-channel-breakdown.png',
    alt: 'Personalized budget breakdown by channel',
    title: 'Get Your Clear Budget Plan'
  },
  {
    image: '/images/mibbs-dashboard-agency-matches.png',
    alt: 'Verified agencies matched to your needs',
    title: 'Connect With Trusted Agencies'
  }
];

export function HowItWorksSection() {
  return (
    <section>
      {steps.map((step, index) => (
        <div key={index} className="grid lg:grid-cols-2 gap-12">
          <div className="relative">
            <img
              src={step.image}
              alt={step.alt}
              loading="lazy"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h3>{step.title}</h3>
            {/* ... */}
          </div>
        </div>
      ))}
    </section>
  );
}
```

### 3. Proof Section (All Images)

```jsx
// src/components/ProofSection.tsx
export function ProofSection() {
  const dashboardImages = [
    {
      src: '/images/mibbs-dashboard-budget-overview.png',
      alt: 'Budget Overview Dashboard',
      title: 'Complete Budget Breakdown'
    },
    {
      src: '/images/mibbs-dashboard-channel-breakdown.png',
      alt: 'Channel Spending Analysis',
      title: 'Channel-Wise ROI Tracking'
    },
    {
      src: '/images/mibbs-dashboard-growth-forecast.png',
      alt: '6-Month Growth Projection',
      title: 'AI-Powered Forecasting'
    }
  ];

  return (
    <section>
      {/* Main dashboard showcase */}
      <div className="mb-16">
        <img
          src="/images/mibbs-dashboard-budget-overview.png"
          srcSet="/images/mibbs-dashboard-budget-overview@2x.png 2x"
          alt="MIBBS dashboard showing personalized budget plan"
          className="w-full h-auto rounded-2xl shadow-2xl"
          loading="lazy"
        />
      </div>

      {/* Image gallery/carousel */}
      <div className="grid md:grid-cols-3 gap-8">
        {dashboardImages.map((img, i) => (
          <div key={i} className="group cursor-pointer">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
            />
            <h4 className="mt-4 text-center font-semibold">{img.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### 4. Comparison Section (Image 3)

```jsx
// Using the comparison image
<div className="my-16">
  <h2>The MIBBS Difference</h2>
  <img
    src="/images/mibbs-dashboard-comparison.png"
    srcSet="/images/mibbs-dashboard-comparison@2x.png 2x"
    alt="Before and after comparison showing dramatic improvements in budget clarity, ROI tracking, and money saved"
    loading="lazy"
    className="w-full h-auto rounded-2xl shadow-2xl mx-auto max-w-5xl"
  />
</div>
```

## Responsive Images

### Mobile-Optimized Versions

```jsx
function ResponsiveDashboard() {
  return (
    <picture>
      {/* Mobile: Use cropped/simplified version */}
      <source
        media="(max-width: 768px)"
        srcSet="/images/mibbs-dashboard-budget-overview-mobile.png"
      />

      {/* Desktop: Use full version */}
      <img
        src="/images/mibbs-dashboard-budget-overview.png"
        srcSet="/images/mibbs-dashboard-budget-overview@2x.png 2x"
        alt="MIBBS dashboard"
        className="w-full h-auto"
      />
    </picture>
  );
}
```

### Tailwind Responsive Classes

```jsx
<img
  src="/images/mibbs-dashboard-budget-overview.png"
  alt="Dashboard"
  className="
    w-full h-auto
    rounded-lg md:rounded-xl lg:rounded-2xl
    shadow-md md:shadow-lg lg:shadow-2xl
    max-w-full md:max-w-3xl lg:max-w-5xl
    mx-auto
  "
/>
```

## Accessibility Best Practices

### Descriptive Alt Text

```jsx
// ❌ Bad: Too generic
<img src="/images/dashboard.png" alt="Dashboard" />

// ✅ Good: Descriptive and informative
<img
  src="/images/mibbs-dashboard-budget-overview.png"
  alt="MIBBS Brand Budget Overview dashboard showing ₹2.4L monthly budget, 18% ROI growth, and spending breakdown across digital marketing (75%), brand identity (45%), content creation (60%), and offline marketing (35%) with AI optimization badge"
/>
```

### Long Descriptions for Complex Images

```jsx
<figure>
  <img
    src="/images/mibbs-dashboard-comparison.png"
    alt="Before and after comparison of MIBBS usage"
    aria-describedby="comparison-description"
  />
  <figcaption id="comparison-description" className="sr-only">
    Split-screen comparison showing improvements after using MIBBS:
    Budget clarity increased from 20% to 90%,
    ROI tracking improved from 25% to 88%,
    Agency trust rose from 15% to 92%,
    and monthly spending changed from wasting ₹45,000 to saving ₹45,000.
  </figcaption>
</figure>
```

## Image Carousel/Slider

```jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function DashboardCarousel() {
  const images = [
    {
      src: '/images/mibbs-dashboard-budget-overview.png',
      alt: 'Budget Overview',
      caption: 'Complete monthly budget breakdown'
    },
    {
      src: '/images/mibbs-dashboard-channel-breakdown.png',
      alt: 'Channel Analysis',
      caption: 'Track ROI by marketing channel'
    },
    {
      src: '/images/mibbs-dashboard-growth-forecast.png',
      alt: 'Growth Forecast',
      caption: 'AI-powered 6-month projections'
    }
  ];

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Caption */}
      <p className="text-center mt-4 text-gray-600">
        {images[current].caption}
      </p>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-purple-600 w-8' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

## SEO Optimization

### Open Graph Meta Tags

```jsx
// In your HTML head or using react-helmet
<meta property="og:image" content="https://mibbs.com/images/mibbs-dashboard-budget-overview.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="800" />
<meta property="og:image:alt" content="MIBBS Brand Budget Overview Dashboard" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://mibbs.com/images/mibbs-dashboard-budget-overview.png" />
```

### Structured Data

```jsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MIBBS",
  "image": "https://mibbs.com/images/mibbs-dashboard-budget-overview.png",
  "screenshot": [
    "https://mibbs.com/images/mibbs-dashboard-budget-overview.png",
    "https://mibbs.com/images/mibbs-dashboard-channel-breakdown.png",
    "https://mibbs.com/images/mibbs-dashboard-growth-forecast.png"
  ]
}
</script>
```

## Performance Monitoring

```jsx
function DashboardImageWithMetrics({ src, alt }) {
  useEffect(() => {
    const img = new Image();
    img.src = src;

    const startTime = performance.now();

    img.onload = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Image loaded in ${loadTime.toFixed(2)}ms`);

      // Send to analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'image_load', {
          image_url: src,
          load_time: loadTime
        });
      }
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
    };
  }, [src]);

  return <img src={src} alt={alt} className="w-full h-auto" />;
}
```

## Quick Reference

### Current Placeholder (Before Images)
```jsx
<div className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] rounded-2xl" />
```

### Replace With Real Image
```jsx
<img
  src="/images/mibbs-dashboard-budget-overview.png"
  srcSet="/images/mibbs-dashboard-budget-overview@2x.png 2x"
  alt="MIBBS dashboard"
  loading="lazy"
  className="w-full h-auto rounded-2xl"
/>
```

## Checklist for Production

- [ ] All 5 images generated and saved in `public/images/`
- [ ] @2x retina versions created
- [ ] File sizes optimized (<500KB each)
- [ ] Alt text is descriptive and meaningful
- [ ] `loading="lazy"` added to below-fold images
- [ ] `loading="eager"` and `fetchpriority="high"` on hero image
- [ ] Width and height attributes specified
- [ ] Responsive behavior tested on mobile/tablet/desktop
- [ ] WebP versions generated for modern browsers
- [ ] Images work when deployed (not just in dev)
- [ ] Performance metrics verified (Lighthouse >90)

---

For more details, see:
- `DASHBOARD_IMAGES_GUIDE.md` - Complete generation guide
- `QUICK_START_IMAGES.md` - Fast setup instructions
