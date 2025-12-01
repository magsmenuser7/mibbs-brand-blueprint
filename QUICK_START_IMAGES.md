# Quick Start: Generate Dashboard Images

## 3 Easy Methods to Get Your Dashboard Images

### Method 1: Browser Screenshot (Fastest - 5 minutes) ⚡

1. **Open the generator**
   ```bash
   # Simply open this file in your browser:
   src/utils/generateDashboardImages.html
   ```

2. **Take screenshots**
   - Right-click each dashboard → "Save Image As..."
   - Or use your OS screenshot tool (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)

3. **Save to project**
   ```
   Save in: public/images/

   Files needed:
   ├── mibbs-dashboard-budget-overview.png
   ├── mibbs-dashboard-channel-breakdown.png
   ├── mibbs-dashboard-comparison.png
   ├── mibbs-dashboard-growth-forecast.png
   └── mibbs-dashboard-agency-matches.png
   ```

### Method 2: Automated Script (Recommended) 🤖

1. **Install Puppeteer** (one time only)
   ```bash
   npm install --save-dev puppeteer
   ```

2. **Run the generator**
   ```bash
   npm run generate:images
   ```

3. **Done!** Images are automatically saved to `public/images/`

### Method 3: Chrome DevTools (Most Control) 🎯

1. Open `src/utils/generateDashboardImages.html` in Chrome
2. Press `F12` to open DevTools
3. Click device toolbar icon (or `Ctrl/Cmd+Shift+M`)
4. Set viewport to `1200 x 800`
5. Click ⋮ menu → "Capture screenshot"
6. Repeat for each dashboard section
7. Save to `public/images/` with proper names

## What You Get

Each method generates 5 professional dashboard images:

1. **Budget Overview** - Hero section showcase
2. **Channel Breakdown** - Detailed spending analysis
3. **Before/After Comparison** - Social proof
4. **Growth Forecast** - AI predictions
5. **Agency Matches** - Trust building

## File Specifications

- **Dimensions:** 1200px × 800px
- **Format:** PNG
- **Size:** <500KB each
- **Retina:** @2x versions recommended

## After Generating

The homepage components will automatically use your images!

No code changes needed - just place the images in `public/images/` and refresh.

## Troubleshooting

**Images not showing?**
```bash
# Check they're in the right place
ls public/images/

# Restart dev server
npm run dev
```

**Need higher quality?**
- Use Method 2 (automated script) for @2x retina versions
- Or take screenshots at 200% browser zoom

**File too large?**
- Use [TinyPNG](https://tinypng.com/) to compress
- Or convert to WebP format

## Need Help?

See detailed guide: `DASHBOARD_IMAGES_GUIDE.md`
