function toggleAccordion(elem) {
    elem.classList.toggle("active");
    var content = elem.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.padding = "0 30px";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "15px 30px 30px";
    }
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
    wrapper: '#wrapper',
    content: '#inner-content',
    smooth: 1.5,
    effects: true,
});

document.querySelectorAll('.scroll-section').forEach((section, index) => {
    gsap.fromTo(section,
        { opacity: 0, y: 100 },
        {
            opacity: 1, y: 0, duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 100%',
                end: 'top 80%',
                scrub: true
            }
        }
    );
});

const fadeElements = document.querySelectorAll(".fade-in");
fadeElements.forEach((element) => {
    gsap.set(element, { opacity: 0, y: 100, duration: 1 });
    gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: element,
            start: "top 100%",
            end: "bottom 100%",
            toggleActions: "play none none reverse",
        },
    });
});

$(".reveal-heading").each(function(index) {
    const textInstance = $(this);
    const text = new SplitType(this, {
        types: "lines, words",
        lineClass: "word-line"
    });

    const line = textInstance.find(".word-line");
    const word = line.find(".word");

    gsap.timeline({
        scrollTrigger: {
            trigger: this,
            start: "top 100%",
            end: "top 100%",
            toggleActions: "play none none reset", 
            onComplete: function() {
                textInstance.removeClass("skew-up");
            }
        }
    }).set(textInstance, {}).from(word, {
        y: "100%",
        skewX: "-6",
        duration: 1,
        stagger: 0.03,
        ease: "expo.out"
    });
});

$('.counter').each(function(index) {
    const targetElement = $(this);
    const counterValue = parseInt(targetElement.attr('data-count'));

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: $(this).closest('.scroll-section'),
            start: "top 100%",
            end: "bottom 100%",
            toggleActions: "play none none reset"
        }
    });

    tl.to(targetElement, {
        innerText: counterValue,
        duration: 1,
        snap: {
            innerText: 1
        },
        ease: "none"
    });
});

$('.progress-bar').each(function(index) {
    const targetElement = $(this);
    const targetWidth = parseInt(targetElement.attr('data-width'));

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: $(this).closest('.scroll-section'),
            start: "top 90%",
            end: "bottom 90%",
            toggleActions: "play none none reset"
        }
    });

    tl.to(targetElement, {
        width: targetWidth + '%',
        duration: 1,
        ease: "none"
    });
});
const zoomInSelector = ['.zoom-in, .circle-icons-wrapper > span, .analytics-services-anim, .action-btns-holder']; 
zoomInSelector.forEach(selector => {
$(selector).each(function(index) {
    const targetElement = $(this);
    let getDuration = $(this).attr('data-duration'); 
    let getTrigger = $(this).attr('data-trigger');
    let getStart = $(this).attr('data-start');

    if (!getTrigger) {
        getTrigger = 'div';
    }

    if (!getDuration) {
        getDuration = '0.5';
    }

    if (!getStart) {
        getStart = 'top center';
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: targetElement.closest(getTrigger),
            start: getStart,
            end: "bottom center",
            toggleActions: "play none none reset"
        }
    });

    tl.fromTo(targetElement, {
        scale: 0.5,
        opacity: 0
    }, {
        opacity: 1,
        scale: 1,
        duration: getDuration,
        ease: "power2.out"
    });
});
});


const zoomOut = ['.zoom-out']; 
zoomOut.forEach(selector => {
$(selector).each(function(index) {
    const targetElement = $(this);
    let getDuration = $(this).attr('data-duration'); 
    let getTrigger = $(this).attr('data-trigger');
    let getStart = $(this).attr('data-start');

    if (!getTrigger) {
        getTrigger = 'div';
    }

    if (!getDuration) {
        getDuration = '0.5';
    }

    if (!getStart) {
        getStart = 'top center';
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: targetElement.closest(getTrigger),
            start: getStart,
            end: "bottom center",
            toggleActions: "play none none reset"
        }
    });

    tl.fromTo(targetElement, {
        scale: 2,
        opacity: 0.5
    }, {
        opacity: 1,
        scale: 1,
        duration: getDuration,
        ease: "power2.out"
    });
});
});
const slideUpSelector = ['.slide-up, .accordion-item, .radius-box']; 

slideUpSelector.forEach(selector => {
    $(selector).each(function() {
        const targetElement = $(this);
        let getTrigger = $(this).attr('data-trigger');
        let getDuration = $(this).attr('data-duration');
        let getStart = $(this).attr('data-start');

        if (!getTrigger) {
            getTrigger = 'div';
        }

        if (!getDuration) {
            getDuration = '1';
        }
        if (!getStart) {
            getStart = 'top 100%';
        }
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: targetElement.closest(getTrigger),
                start: getStart,
                end: "bottom 100%",
                toggleActions: "play none none reset"
            }
        });

        tl.fromTo(targetElement, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: getDuration,
            ease: "power2.out"
        });
    });
});

function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
            timeline.progress(0);
            timeline.pause();
        }
    });
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 100%",
        onEnter: () => timeline.play()
    });
}

$(document).ready(function() {
    let typeSplit = new SplitType(".split-text", {
        types: "words, chars",
        tagName: "span"
    });

    $(".letters-animation").each(function() {
        let tl = gsap.timeline({ paused: true });
        let getDuration = $(this).attr('data-duration');
        let getStagger = $(this).attr('data-stagger');
        if (!getDuration) {
            getDuration = '0.5';
        }

        if (!getStagger) {
            getStagger = '0.6';
        }

        tl.from($(this).find(".char"), { 
            yPercent: 100, 
            duration: getDuration, 
            ease: "power1.out", 
            stagger: { amount: getStagger } 
        });
        createScrollTrigger($(this), tl);
    });

    $(".words-slide-up").each(function() {
        const words = $(this).find(".word");

        let tl = gsap.timeline({ paused: true });
        tl.from(words, { opacity: 0, y: "100%", duration: 0.5, ease: "power1.out", stagger: { amount: 0.1 } });
        createScrollTrigger($(this), tl);
    });

    $(".letters-fade-in").each(function (index) {
        let tl = gsap.timeline({ paused: true });
        tl.from($(this).find(".char"), { opacity: 0, duration: 0.5, ease: "power1.out", stagger: { amount: 0.4 } });
        createScrollTrigger($(this), tl);
      });
    
});
