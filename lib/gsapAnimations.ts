import { gsap } from 'gsap';

// Staggered entrance animation for lists
export const animateStaggerEntrance = (selector: string, options = {}) => {
    return gsap.fromTo(selector,
        { opacity: 0, y: 20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            ease: 'power3.out', 
            stagger: 0.08,
            ...options
        }
    );
};

// Glitch effect on hover
export const animateGlitchHover = (element: HTMLElement) => {
    const timeline = gsap.timeline();
    timeline
        .to(element, { skewX: 2, duration: 0.05, ease: 'power4.inOut' })
        .to(element, { skewX: -2, duration: 0.05, ease: 'power4.inOut' })
        .to(element, { skewX: 0, duration: 0.05, ease: 'power4.inOut' });
    return timeline;
};

// Card hover lift effect
export const animateCardHover = (element: HTMLElement) => {
    gsap.to(element, {
        y: -4,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
    });
};

export const animateCardLeave = (element: HTMLElement) => {
    gsap.to(element, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
};

// Progress bar animation
export const animateProgress = (selector: string, percentage: number) => {
    return gsap.to(selector, {
        width: `${percentage}%`,
        duration: 1.5,
        ease: 'power2.out'
    });
};

// Fade in from bottom
export const fadeInFromBottom = (selector: string, delay = 0) => {
    return gsap.fromTo(selector,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power3.out' }
    );
};

// Typewriter effect
export const animateTypewriter = (selector: string, text: string, speed = 0.05) => {
    const element = document.querySelector(selector);
    if (!element) return;
    
    element.textContent = '';
    const chars = text.split('');
    
    chars.forEach((char, i) => {
        setTimeout(() => {
            element.textContent = (element.textContent || '') + char;
        }, i * speed * 1000);
    });
};

// Shake animation for errors
export const animateShake = (selector: string) => {
    return gsap.timeline()
        .to(selector, { x: -10, duration: 0.08, ease: 'power2.inOut' })
        .to(selector, { x: 10, duration: 0.08, ease: 'power2.inOut' })
        .to(selector, { x: -10, duration: 0.08, ease: 'power2.inOut' })
        .to(selector, { x: 10, duration: 0.08, ease: 'power2.inOut' })
        .to(selector, { x: 0, duration: 0.08, ease: 'power2.inOut' });
};

// Pulse animation
export const animatePulse = (selector: string, duration = 1.5) => {
    return gsap.to(selector, {
        scale: 1.05,
        opacity: 0.8,
        duration: duration / 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });
};
