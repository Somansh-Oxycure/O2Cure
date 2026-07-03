Hero Layout (Implementation Rules)
Root Container
Height: 100vh
Width: 100vw
Position: relative
Overflow: hidden
Display: flex
Split into exactly 50% / 50%
No container max-width.
Hero always spans edge-to-edge.
Layer Order (z-index)
Backgrounds
↓

Particles

↓

Green Beam

↓

Content

↓

Navbar

Nothing should ever appear above the navbar.

Hero Structure
Hero

├── Left Panel
│
│ ├── Eyebrow
│ ├── Heading
│ ├── Description
│ └── CTA
│
├── Center Beam
│
├── Right Panel
│
│ ├── Heading
│ ├── Description
│ └── CTA
│
└── Center Tagline

Nothing else.

No product.

No purifier.

No icons.

No illustrations.

No floating cards.

No decorative graphics.

Left Panel

Width

50%

Background

Pure White
#FFFFFF

Layout

display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;
padding-left:8vw;
padding-right:6vw;

Content order

Eyebrow

↓

Inside

↓

O2Cure.

↓

CTA

Everything vertically centered.

Right Panel

Width

50%

Background

#09111E

Same flex layout as left.

Everything mirrors the left side.

No images.

No graphics.

Only particles.

Center Beam

Exactly centered.

position:absolute;

left:50%;

transform:translateX(-50%);

Width

2px

Height

100%

Soft green glow.

Never thicker.

Never animated aggressively.

Only a slow breathing pulse.

Center Tagline

Absolutely positioned.

left:50%

top:58%

transform:
translate(-50%,-50%)

Maximum width

700px

Text aligned center.

Must overlap both panels.

Navbar

Absolutely positioned.

Top

32px

Never boxed.

Never inside a card.

Transparent.

Full width.

Logo on left.

Links centered.

CTA right.
