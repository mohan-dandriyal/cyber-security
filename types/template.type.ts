

import templateData from "@/data/template.json";

const { Header, Hero, AboutUs, Services, WhatWeDo, Testimonials, Faq, Contact } = templateData.categories.WedBliss.sections;

export const HeaderData = Header.variants.WedBlissHeader2;
export const FooterData = templateData.common.Footer;

export const HeroData = Hero.variants.WedBlissHero2;
export const AboutData = AboutUs.variants.WedBlissAboutUs2;
export const ServicesData = Services.variants.WedBlissServices2;
export const WhyChooseData = WhatWeDo.variants.WedBlissWhatWeDo2;
export const TestimonialsData = Testimonials.variants.WedBlissTestimonials2;
export const FAQsData = Faq.variants.WedBlissFaq2;
export const ContactData = Contact.variants.WedBlissContact2;

export type HeaderDataType = typeof Header;
export type FooterDataType = typeof FooterData;

export type HeroDataType = typeof HeroData;
export type AboutDataType = typeof AboutData;
export type ServicesDataType = typeof ServicesData;
export type WhyChooseDataType = typeof WhyChooseData;
export type TestimonialsDataType = typeof TestimonialsData;
export type FAQsDataType = typeof FAQsData;
export type ContactDataType = typeof ContactData;