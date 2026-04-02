

## Problem

When the user selects white as the QR code color, the generated PNG has white pixels on a **transparent** background (`#00000000`). When downloaded and viewed on a white background, the QR code is invisible.

## Solution

When the selected color is white (`#FFFFFF`), use a **dark background** (e.g., `#000000`) instead of transparent so the white QR code remains visible. For all other colors, keep the transparent background.

### Changes

**File: `src/components/QRCodeGenerator.tsx`**

- In the `generateQR` function, dynamically set the `light` (background) color:
  - If `selectedColor` is `#FFFFFF` → set `light` to `#000000` (black background)
  - Otherwise → keep `light` as `#00000000` (transparent)

This is a one-line logic change in the QRCode options.

