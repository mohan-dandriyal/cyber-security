# Landing page animation review

Reference HTML, animation scripts (`js/function.js`), and styles (`css/custom.css`) were inspected on these public demos:

- [Firevall](https://html.awaikenthemes.com/firevall/index.html)
- [Proshield](https://html.awaikenthemes.com/proshield/index.html)
- [Netzon](https://html.awaikenthemes.com/netzon/index.html)

The references use GSAP/ScrollTrigger, WOW, counterUp, Swiper, Lenis, and desktop parallax. Netzon also defines staggered split-word and split-character heading effects. Image reveals slide a masked container and its image in opposing directions. Card backgrounds fill on hover, images receive a light sweep, and counters animate when scrolled into view.

## Applied to this project

| Pattern | Implementation |
| --- | --- |
| Staggered heading entrance | Shared word reveals in the hero and section headings; 45 ms stagger and 700 ms easing. |
| Masked image entrance | About and Why Choose images reveal horizontally with a subtle zoom; the intersection observer watches an unclipped wrapper. |
| Image light sweep | Pointer hover on the revealed images. |
| Service card fill | Gradient rises from the bottom on hover or keyboard focus, alongside existing lift and arrow rotation. |
| Counters | Testimonial rating and trusted-business count animate once; the accessible label keeps the final value. |
| Navigation | Smooth anchor scrolling with a fixed-header offset; mobile menu fades and slides, closes on Escape and desktop resize. |
| Existing motion | Retained staggered cards, hero light trails, testimonial transitions, floating FAQ art, and accordion expansion. |

Effects are adapted to the existing Framer Motion components and branding. This is not a pixel-for-pixel reproduction. No reference images, proprietary scripts, or additional animation dependencies were added. Native smooth scrolling preserves touch and keyboard scrolling. No custom cursor or scroll hijacking was introduced.

Reduced-motion settings disable smooth scrolling and transform effects, keep headings and images readable, and stop the existing testimonial autoplay. The preference hook preserves identical server and hydration markup.

## Validation

- Production build, including TypeScript and static page generation.
- Chrome viewport checks at 320, 375, 768, 1024, 1280, and 1440 px: no horizontal overflow; headings and image reveals become visible.
- Mobile menu open/close, FAQ expansion, testimonial next button, and reduced-motion rendering.
- Missing testimonial photos use named initials instead of broken image placeholders. Original photo URLs are preserved so adding the missing assets restores the photographs.

Local browser evidence and the QA runner are under ignored `.tmp/`. The contact form backend was outside this animation and layout task; no successful submission is claimed.
