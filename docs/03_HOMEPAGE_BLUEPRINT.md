Homepage Blueprint

├── Global Rules
├── Hero
├── Environment
├── AQI
├── Technology
├── Products
├── Trust
├── CTA
└── Footer

# O2Cure Homepage Blueprint v1.0

## Purpose

The homepage is the first impression of the O2Cure brand.

It should not behave like a traditional ecommerce homepage.

Instead, it should guide visitors through a cinematic, story-driven experience that gradually builds trust, demonstrates expertise, and naturally leads users toward exploring O2Cure's solutions.

The homepage should communicate one message:

"Whatever your indoor air quality challenge is, O2Cure has a solution designed for your environment."

---

## Primary Goals

1. Create a memorable first impression.
2. Build trust before selling products.
3. Help visitors quickly recognize their environment.
4. Demonstrate O2Cure's expertise through interaction rather than long explanations.
5. Encourage exploration instead of immediate purchasing.
6. Achieve excellent Core Web Vitals and SEO performance.

---

## Homepage Story

The homepage should feel like one continuous journey.

The visitor should experience the following progression:

Curiosity
↓

Recognition
↓

Interaction
↓

Understanding
↓

Confidence
↓

Exploration

Every section must naturally transition into the next.

Avoid making sections feel isolated or disconnected.

---

## Homepage Sections

1. Hero
2. Where do you breathe?
3. Experience the O2Cure Difference
4. Technology Preview
5. Find the Right Solution
6. Trusted by Leading Organizations
7. Why O2Cure
8. Final CTA
9. Footer

## Global Homepage Rules

• Mobile-first.

• Every section should occupy enough space to breathe.

• Avoid clutter.

• Never overload users with information.

• Every section should answer one question while creating curiosity for the next section.

• Every major interaction should feel intentional.

• Use premium imagery and renders.

• Use placeholder content where final content is unavailable.

• Placeholder content should remain professional.

• Never use Lorem Ipsum.

• Every CTA should encourage exploration rather than immediate purchasing.

• Motion should enhance storytelling.

• Respect reduced-motion accessibility preferences.

• Target 60 FPS on modern devices.

• Maintain Lighthouse score above 95.

---

# Section 1 — Hero

## Purpose

The Hero section is the most important part of the entire website.

It should immediately establish O2Cure as a premium technology brand rather than a traditional air purifier company.

Within the first 5 seconds, visitors should understand that O2Cure is different.

The Hero should create curiosity, build trust through design quality, and encourage the user to continue scrolling.

This section is the visual identity of the website.

---

## User Emotion

The user should feel:

• Impressed
• Curious
• Calm
• Safe
• Confident

The Hero should never feel overwhelming.

It should communicate through visuals more than text.

---

## Story

The Hero represents two worlds.

Outside O2Cure

and

Inside O2Cure.

The purifier is positioned between these worlds and acts as the transition between polluted air and purified air.

The purifier itself becomes the visual centerpiece.

---

## Layout

Desktop

Top navigation

↓

Large cinematic Hero

↓

3D Purifier positioned slightly below the center

↓

Minimal headline

↓

Subtle CTA

↓

Scroll indicator

---

Mobile

Navigation remains compact.

The purifier becomes the primary focus.

Typography scales down.

The split-world concept remains visible.

No horizontal scrolling.

---

## Components

Navigation

Logo

Minimal navigation links

Primary CTA

3D purifier

Particle system

Headline

Supporting text

Primary CTA

Secondary CTA

Scroll indicator

---

## Visual Direction

The page should feel premium.

Think Apple-level cleanliness with Dyson-inspired engineering.

Avoid excessive effects.

Large areas of negative space are encouraged.

## Split World

The Hero is divided into two visual environments.

LEFT SIDE

Represents purified air.

Characteristics

• White
• Soft blue tones
• Calm atmosphere
• Light volumetric glow
• Gentle airflow
• Minimal floating particles

RIGHT SIDE

Represents polluted air.

Characteristics

• Warm brown
• Dust
• Fine suspended particles
• Soft haze
• Polluted atmosphere

The split should not feel like a hard vertical line.

The purifier naturally creates the transition between the two worlds.

## 3D Purifier

A high-quality 3D model of the flagship O2Cure purifier will be used.

Placement

Bottom center of the Hero.

The purifier should slightly overlap the lower portion of the Hero to create depth.

Interaction

Desktop

• Mouse movement creates subtle parallax.

• Purifier rotates only 2–5 degrees.

• Rotation must feel natural.

Mobile

Very subtle floating animation only.

No gyroscope for Version 1.

Future enhancement

Background cinematic video can be added later without changing the layout.

## Particle System

Particles are one of the Hero's signature elements.

Polluted particles

Located primarily on the right.

Brown and warm grey.

Slowly move toward the purifier.

Purified particles

Located primarily on the left.

White.

Very soft blue.

Very subtle motion.

Particles should never distract from the purifier.

They exist to reinforce the story.

## Typography

Headline

Very large.

Minimal.

Maximum two lines.

Example

Inside O₂Cure.

Outside It.

Supporting text

Maximum two lines.

Simple.

No marketing buzzwords.

The Hero should communicate visually before users read anything.

## Buttons

Buttons should feel premium.

Rounded corners.

Subtle hover.

No aggressive animations.

Primary

Explore Solutions

Secondary

Learn More

Buttons may remain non-functional during prototype development.

## Scroll Behaviour

The Hero should smoothly transition into the next section.

Avoid abrupt cuts.

As the Hero scrolls away

Particles reduce.

Purifier gently moves upward.

Background subtly fades.

The transition should feel cinematic.

## Performance Requirements

The Hero must maintain smooth performance.

Requirements

• Lazy load heavy assets.

• Compress the 3D model.

• Avoid unnecessary lighting.

• Keep animation smooth.

• No layout shifts.

• Respect prefers-reduced-motion.

## Acceptance Criteria

The Hero is complete only if:

✓ The purifier is the first visual focus.

✓ Users immediately understand the clean vs polluted concept.

✓ Motion feels premium.

✓ Typography is minimal.

✓ Mobile experience feels intentional.

✓ Desktop feels immersive.

✓ Performance remains smooth.

✓ Visitors naturally continue scrolling.

---

---

# Chapter 2 — Where Do You Breathe?

## Purpose

The purpose of this section is to immediately help visitors identify the environment that best represents them.

Unlike traditional websites, O2Cure does not ask users to browse products first.

Instead, users begin by selecting the type of environment they want to protect.

The interaction should feel premium, effortless and memorable.

---

## Story Transition

This chapter begins immediately after the Hero.

The transition should feel like a continuation of the same cinematic experience.

### Hero → Chapter 2 Transition

As the user scrolls:

• The Hero headline slowly fades upward.

• The purifier gently moves downward and exits the viewport.

• The clean air particles continue drifting upward.

• Polluted particles completely disappear.

• The background gradually becomes brighter.

• A large amount of whitespace appears before any new content.

The visitor should feel like they have entered the clean world created by O2Cure.

Only then does the next chapter begin.

---

## Opening Scene

Large centered heading

Where do you breathe?

Supporting text

Choose the environment that best represents your space.

No cards should be visible immediately.

The heading should breathe.

Large whitespace is intentional.

---

## Environment Selector

Instead of a traditional grid, this section uses a stack of interactive horizontal panels.

Each panel represents one environment.

All panels are visible simultaneously.

The user immediately understands every solution O2Cure provides without excessive scrolling.

---

## Environments

Residential

Corporate

Industrial

Healthcare

Education

Government

Airports & Transit

---

## Panel Layout

Initial Height

Approximately 110–130px.

Panels span nearly the full content width.

Panels are separated by generous spacing.

Each panel contains:

• Environment icon

• Environment title

• Very subtle blurred preview of that environment

Nothing else.

The initial state should feel calm and minimal.

---

## Expanded State

Hovering (Desktop) or tapping (Mobile) expands the selected panel.

Expanded height

Approximately 320–420px.

Inside the expanded panel:

• Premium environment visual fades in.

• Glass overlay appears.

• Short one-line description.

• Explore Solutions button fades upward.

The remaining panels smoothly compress but remain visible.

The user should always understand there are additional environments.

---

## Motion

Panel expansion

600ms

Ease Out

Image fades

400ms

CTA

Slides upward

No abrupt transitions.

Everything should feel premium and physical.

---

## Mobile

Behaves like an accordion.

Only one panel expands at a time.

Expansion animation remains identical.

---

## Future Content

Current implementation may use premium placeholder visuals.

These visuals will later be replaced with cinematic looping videos without changing the layout.

---

## Acceptance Criteria

✓ Entire section fits within approximately one viewport.

✓ Users immediately identify their environment.

✓ No traditional card grid.

✓ Premium animations.

✓ Minimal text.

✓ Easy mobile interaction.

✓ Smooth cinematic transition from Hero.

# Chapter 3 — Experience the O₂Cure Effect

## Purpose

This chapter demonstrates O₂Cure's impact through interaction instead of explanation.

Visitors should instantly understand how O₂Cure transforms polluted air into clean air.

The experience should be memorable, satisfying and playful while remaining scientifically premium.

---

## Story Transition

As the user scrolls away from the Environment Selector, the expanded panel gently collapses.

The page returns to a calm state.

A large amount of whitespace appears.

The next chapter fades upward naturally.

---

## Opening Scene

Large heading

Experience the O₂Cure Effect

Supporting text

See how cleaner air changes your environment.

Minimal text.

Large spacing.

---

## AQI Display

Detect the visitor's approximate location.

Display

Current City

Current AQI

AQI Category

Current Air Quality Status

If location permission is unavailable, show a default demonstration city.

---

### Experience Layout

This is NOT an analytics dashboard.

This is NOT a collection of statistics.

The interactive experience is the primary focus.

The AQI information only supports the interaction.

---

## Visual Composition

The centre of the section contains a large circular O₂Cure activation button.

Around the button, polluted particles naturally float through the environment.

These particles should visually resemble airborne pollution rather than abstract circles.

Examples include:

• PM2.5
• PM10
• Dust
• Smoke
• VOC inspired particles

These labels are optional and should never dominate the interface.

The particles themselves tell the story.

---

## Initial State

The environment appears polluted.

Brown and amber particles drift across the section using the same particle system established in the Hero.

Movement should feel natural and slow.

The AQI displays a polluted value.

Example:

AQI 186

Category

Poor

The activation button displays

O₂Cure Effect

The interface should subtly encourage interaction through a slow pulsing ring around the button.

No text should explicitly instruct the visitor to click.

The motion itself should invite interaction.

---

## Activation Sequence

When the visitor activates O₂Cure, every animation follows a cinematic sequence.

### Phase 1

The activation button rotates slightly.

A soft circular pulse expands outward.

The pulse illuminates the surrounding area.

---

### Phase 2

Nearby polluted particles begin changing direction.

Instead of floating randomly, they are gradually attracted toward the O₂Cure button.

The attraction begins gently before accelerating.

Particles travel along curved paths.

The motion should feel physical rather than scripted.

---

### Phase 3

As particles reach the button,

they dissolve naturally.

No explosions.

No flashes.

No disappearing instantly.

Each particle fades as if being purified.

---

### Phase 4

Immediately after polluted particles disappear,

soft blue-white purified particles emerge from the centre.

These particles travel outward.

Their motion should match the clean-air particle behaviour established in the Hero.

The visual language should remain consistent across the homepage.

---

### Phase 5

As purified particles spread,

the background gradually becomes brighter.

Warm polluted tones disappear.

Soft blue and white lighting replaces them.

The atmosphere should visibly become calmer.

---

### Phase 6

Only after the environment visually changes

does the AQI animate.

Example

186

↓

38

The AQI animation should be the final confirmation,

not the primary animation.

---

## Motion Principles

Never animate everything simultaneously.

The visitor should experience a chain reaction.

Button

↓

Particles become attracted

↓

Particles disappear

↓

Fresh particles emerge

↓

Lighting changes

↓

AQI improves

↓

Clean idle animation continues

---

## Particle Behaviour

The clean particle system should reuse the same visual language created in the Hero.

This creates continuity across the homepage.

The user subconsciously recognises

"this is the purified air."

---

## Performance

Use GPU-friendly animations.

Particles should be rendered efficiently.

Reduce particle count on mobile while preserving the same behaviour.

---

## Acceptance Criteria

✓ Visitor immediately understands polluted air becoming clean.

✓ Particle motion tells the entire story.

✓ AQI supports the animation rather than leading it.

✓ The experience feels relaxing.

✓ The Hero and AQI sections share one consistent visual language.

## Motion Style

Elegant.

Premium.

Relaxing.

No gaming effects.

No explosions.

No excessive glow.

The visitor should feel relief after activation.

---

## Mobile

The interaction remains identical.

Particle count may reduce for performance.

The button remains central.

---

## Future Integration

Current implementation may simulate AQI values.

Production will use a live AQI API.

The architecture should allow replacing simulated values without redesigning the component.

---

"Every chapter of the homepage must feel like the next scene of the same cinematic story. No section should resemble an independent landing page or dashboard."

## SECTION 4 — Powered by TriCure™ Technology

### Objective

Introduce O₂Cure's proprietary TriCure™ Technology in a simple, memorable and premium way.

This section should explain that indoor air pollution consists of three major categories, and TriCure™ Technology is designed to address all three within one integrated purification system.

The goal is curiosity, credibility and differentiation—not a deep technical explanation.

### Layout

Headline centered.

Supporting copy below.

Three horizontally aligned premium glass cards:

1. Particulate Matter
2. Microbial Protection
3. Gas & Odor Control

Each card contains:

- Large sequence number
- Minimal premium icon
- Short title
- One-line description

Below the cards, a horizontal animated connector leads into a central "TriCure™ Technology" badge, ending with "Cleaner Indoor Air."

Finish with a concise statement explaining that healthier indoor air requires addressing all three pollutant categories together.

### Animation

Cards reveal sequentially.

A subtle animated pulse travels through each connector toward the TriCure™ badge.

Hover interactions gently highlight each protection layer and its connection to the center.

Animations remain calm, premium and continuous.

### Design Language

Minimal.

Large whitespace.

Soft glass surfaces.

Subtle green-blue highlights.

Premium typography.

No excessive technical diagrams.

Avoid paragraphs longer than two lines.

This section should communicate trust through clarity rather than complexity.

# Chapter 5 — Find Your O₂Cure

## Purpose

After understanding the science, visitors are ready to discover the products.

The goal of this chapter is not to sell specifications.

The goal is to help visitors quickly understand the product family.

Every product should feel like part of one premium ecosystem rather than individual products competing for attention.

---

## Story Transition

As the Technology section leaves the viewport,

its abstract airflow visualization slowly transforms into clean floating particles.

These particles gently dissolve.

The page becomes brighter.

The first product slowly rises into view.

The transition should feel continuous.

---

## Opening

Eyebrow

OUR PRODUCTS

Headline

Find Your O₂Cure

Supporting Text

Designed for every environment.
Built with the same trusted purification technology.

Minimal copy.

Large whitespace.

---

## Layout

Do NOT build a product grid.

Do NOT build ecommerce cards.

Instead create a horizontal product showcase.

Only one product is featured prominently at a time.

The visitor naturally browses the lineup.

---

## Product Carousel

Desktop

The active product remains centred.

Neighbouring products remain partially visible.

This encourages exploration.

Each product card contains

• Premium product render
• Product name
• Short one-line purpose
• Environment tag
• Explore Product button (inactive)

No pricing.

No specifications.

No comparison tables.

---

## Navigation

Users can navigate using

• Arrow buttons

• Mouse drag

• Trackpad swipe

• Touch swipe

Animation should feel smooth and physical.

---

## Active Product

The centred product becomes the visual focus.

Slightly larger.

Higher elevation.

Brighter lighting.

Neighbouring products remain slightly blurred and scaled down.

---

## Motion

When changing products

The outgoing product slides naturally.

The incoming product eases into the centre.

Duration

500–700ms.

No snapping.

---

## Placeholder Assets

Use premium placeholder renders for now.

Each product render should later be replaceable without changing layout.

---

## Mobile

Carousel becomes full-width swipe cards.

One product per view.

Maintain the same interaction.

---

## Acceptance Criteria

✓ Product discovery feels effortless.

✓ Premium presentation.

✓ No ecommerce appearance.

✓ No specifications.

✓ No pricing.

✓ Smooth physical motion.

✓ Easy future replacement with final renders.

# Chapter 6 — Trusted Where Air Quality Matters Most

## Purpose

After discovering the products, visitors naturally seek reassurance.

This chapter builds trust through real-world credibility rather than marketing claims.

The emphasis is on recognition, partnerships and proof.

The section should feel quiet, confident and premium.

---

## Story Transition

As the Product Stage leaves the viewport,

the lighting gradually softens.

The rotating stage fades into a clean white background.

A subtle divider created by floating clean-air particles separates the previous chapter.

The visitor enters a calm credibility section.

---

## Opening

Eyebrow

TRUSTED BY

Headline

Trusted Where Air Quality Matters Most

Supporting Text

O₂Cure solutions protect homes, businesses and critical environments across India.

(Placeholder copy. Replace before production.)

---

## Client Logo Showcase

The primary element of this chapter is a premium logo wall.

Display client and partner logos in monochrome.

Each logo becomes full colour only on hover.

The layout should feel balanced with generous spacing.

No borders.

No logo cards.

No carousel.

The logos themselves should create the visual rhythm.

---

## Recognition Strip

Below the logos display a simple horizontal strip containing future achievements.

Examples

• Years of Innovation

• Installations

• Cities Served

• Projects Completed

Current values should be realistic placeholders.

Animate numbers only once when entering the viewport.

Keep the animation subtle.

---

## Testimonials Preview

Display two premium testimonial cards.

Each contains

• Client quote

• Client name

• Company

• Small circular avatar placeholder

Keep quotations short.

Maximum three lines.

These are placeholders until real testimonials are available.

---

## Certifications

Display certification badges in a clean horizontal layout.

Examples

ISO

CE

RoHS

Other future certifications

Keep them monochrome.

Avoid oversized graphics.

---

## Motion

Logos fade upward.

Statistics count smoothly.

Testimonials reveal one after another.

Hovering a logo slightly increases brightness.

No excessive animation.

Trust should feel calm.

---

## Mobile

Logos become a responsive grid.

Testimonials stack vertically.

Recognition strip becomes two rows if required.

---

## Future Content

All logos, testimonials and certifications should be data-driven and easily replaceable from the CMS.

No hardcoded content.

---

## Acceptance Criteria

✓ Immediately builds credibility.

✓ Feels premium.

✓ Minimal motion.

✓ No marketing overload.

✓ Easy CMS integration.

✓ Strong visual balance.

# Chapter 7 — Let's Build a Healthier Space Together

## Purpose

This is the final chapter of the homepage.

Its purpose is to convert interested visitors into enquiries while maintaining the premium experience established throughout the homepage.

Visitors should feel invited rather than pressured.

This chapter should feel calm, optimistic and trustworthy.

---

## Story Transition

As the Trust section leaves the viewport,

the client logos gently fade away.

A few remaining clean-air particles continue drifting upward.

The background gradually becomes brighter.

The floating particles slowly dissolve into soft ambient light.

The homepage reaches its cleanest visual state.

This represents the healthiest environment created by O₂Cure.

---

## Opening

Eyebrow

GET IN TOUCH

Headline

Let's Build a Healthier Space Together

Supporting Text

Whether you're protecting a home, workplace or critical facility, our team is ready to help you choose the right solution.

Keep copy short.

Maximum three lines.

---

## Layout

Create a premium two-column editorial layout.

Desktop

Left Side

• Headline

• Supporting text

• Contact information

• Consultation highlights

Right Side

• Premium enquiry form

The layout should breathe.

Large whitespace.

No visible section container.

The background itself becomes the experience.

---

## Left Column

Display:

Phone

Email

Office Location

Business Hours

Below this, add three consultation highlights.

Examples

✓ Expert guidance

✓ Tailored recommendations

✓ Fast response

These are simple text rows with subtle icons.

Do not use feature cards.

---

## Right Column

Create a premium enquiry form.

Fields

Name

Company (optional)

Email

Phone Number

Environment

Dropdown

Residential

Corporate

Industrial

Healthcare

Education

Government

Airports & Transit

Message

Large textarea

Primary Button

Request Consultation

---

## Form Behaviour

All fields should animate subtly on focus.

Labels float smoothly.

Validation messages remain minimal.

The submit button has a premium hover animation.

No actual backend submission is required.

Simulate a successful submission state.

---

## Success State

After submission

The form transitions into a thank-you message.

Example

Thank you.

Our team will contact you shortly.

A small clean-air animation continues behind the message.

---

## Motion

The text reveals first.

The form fades upward slightly later.

Input fields animate independently.

No dramatic motion.

The section should feel calm and reassuring.

---

## Mobile

Stack vertically.

Contact information first.

Form second.

Maintain generous spacing.

The form should remain easy to complete with one hand.

---

## Future Integration

The form should be architected so it can later connect to:

Sanity

CRM

Email automation

Lead management

without redesigning the UI.

---

## Acceptance Criteria

✓ Premium editorial layout.

✓ Elegant enquiry form.

✓ No visible container.

✓ Large whitespace.

✓ Mobile friendly.

✓ Ready for backend integration.

✓ Feels like a natural conclusion to the homepage journey.

# Final Chapter — Premium Footer

## Purpose

The footer is the final chapter of the homepage.

It should not feel like a traditional corporate footer.

Instead, it should feel like the quiet ending of the journey.

The visitor has travelled from polluted air to clean air.

The final screen should reinforce O₂Cure's mission before presenting navigation and legal information.

---

## Story Transition

As the CTA section leaves the viewport,

the remaining clean-air particles continue drifting upward.

The particles slowly become fewer.

The background becomes almost completely white with a soft blue tint.

The homepage reaches its calmest visual state.

Only then does the footer content fade into view.

---

## Hero Statement

The very first thing visitors see is not navigation.

It is one final message.

Large centered typography.

Headline

Every Breath Matters.

Supporting Text

Creating healthier indoor spaces through intelligent air purification for homes, workplaces and critical environments.

Maximum three lines.

Very generous whitespace.

---

## Final Call To Action

Below the message place one premium secondary button.

Get Consultation

This button navigates to the Contact page in the future.

For now it remains inactive.

The hover animation should match the Hero buttons.

---

## Divider

A thin animated gradient line separates the emotional message from the navigation.

The gradient should slowly move from soft blue to white.

The animation must be almost imperceptible.

---

## Footer Navigation

Create four balanced columns.

### Solutions

Residential

Corporate

Industrial

Healthcare

Education

Government

Airports & Transit

---

### Company

About

Technology

Products

Resources

Careers (placeholder)

---

### Support

Contact

FAQs (placeholder)

Privacy Policy

Terms & Conditions

---

### Connect

Phone

Email

LinkedIn

Instagram

YouTube

(Use placeholder links.)

---

## Newsletter

Below the navigation create a premium newsletter section.

Heading

Stay Updated

Supporting Text

Receive updates on healthier indoor environments, product launches and air quality insights.

Email Field

Subscribe Button

No backend required.

Simulate success state.

This section should feel lightweight and elegant.

---

## Bottom Bar

A thin divider.

Left

© 2026 O₂Cure. All rights reserved.

Centre

Made with care for healthier living.

Right

Small social icons.

Keep icons monochrome.

Hover changes them to brand blue.

---

## Motion

The Hero Statement fades first.

Then the CTA.

Then each navigation column reveals sequentially.

Finally the bottom bar fades upward.

Everything should feel calm.

No dramatic animation.

---

## Background

Very subtle clean-air particles continue drifting upward behind the footer.

Reduce particle density compared to the Hero.

The animation should be almost invisible.

The footer should feel peaceful.

---

## Mobile

Everything stacks vertically.

Hero statement remains centred.

Navigation becomes accordions.

Newsletter spans full width.

Bottom bar stacks naturally.

---

## Future CMS

Navigation groups

Newsletter

Social links

Company information

Legal links

All should later be driven from Sanity CMS.

Do not hardcode architecture.

---

## Acceptance Criteria

✓ Premium editorial footer.

✓ Emotional ending.

✓ Navigation remains easy.

✓ CMS ready.

✓ Responsive.

✓ Consistent with the homepage story.

✓ Feels like the conclusion rather than an afterthought.
