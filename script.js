window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

const parallax = document.querySelector('.parallax')
const parallaxLayers = parallax.querySelectorAll('.parallax__layer')

window.addEventListener('scroll', (e) => {
    let scrollValue = window.scrollY
    parallaxLayers.forEach(layer => {
        layer.style.top = (scrollValue * layer.dataset.parallaxrate * (-1)) + 'px'
    })
})

window.addEventListener('mousemove', (e) => {
    parallaxLayers.forEach(layer => {
        const direction = layer.hasAttribute('data-inverse') ? 1 : -1
        if (!layer.dataset.mousemove) {
            layer.style.transform = `translate(
            ${((window.innerWidth / 2 - e.clientX) * layer.dataset.parallaxrate / 20) * direction}px, 
            ${((window.innerHeight / 2 - e.clientY) * layer.dataset.parallaxrate / 20) * direction}px
        )`
        }
    })
})

const animatedBlocks = document.querySelectorAll('.animated-block');

const isElementInViewport = (element) => {
    const { top, bottom } = element.getBoundingClientRect();
    const vHeight = (window.innerHeight || document.documentElement.clientHeight);
    return ((top > 0 || bottom > 0) && top < vHeight);
};

const animateInView = () => {
    animatedBlocks.forEach(block => {
        if (isElementInViewport(block)) {
            const animatedItems = block.querySelectorAll('.animated-item');
            animatedItems.forEach(item => {
                const animationClass = 'animate__' + item.getAttribute('data-animation');
                const animationDelay = item.getAttribute('data-delay') + 's';
                item.style.animationDelay = animationDelay;
                item.classList.add('animate__animated', animationClass);
                item.classList.remove('animated-item')
            })
        }
    });
};

animateInView();
document.addEventListener('scroll', animateInView);

const scrollToPosition = (position, duration) => {
    const startPosition = window.pageYOffset;
    const distance = position - startPosition;
    const startTime = performance.now();
    const easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const step = (timestamp) => {
        const timeElapsed = timestamp - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * easeProgress);
        if (timeElapsed < duration) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};

const contentBlocks = document.querySelectorAll('.content__block')
const scrollLink = document.getElementById('scroll-down')
scrollLink.addEventListener('click', () => {
    const firstContentBlock = contentBlocks[0]
    const topPosition = firstContentBlock.getBoundingClientRect().top + window.pageYOffset;
    scrollToPosition(topPosition, 1000);
})

const menuLinks = document.querySelectorAll('#head-arkhyz, #head-dombai, #head-elbrus')

menuLinks.forEach((link, i) => {
    link.addEventListener('click', () => {
        const targetBlock = contentBlocks[i]
        const topPosition = targetBlock.getBoundingClientRect().top + window.pageYOffset;
        scrollToPosition(topPosition, 1000);
    })
});

const footerLinks = document.querySelectorAll('#footer-arkhyz, #footer-dombai, #footer-elbrus')


footerLinks.forEach((link, i) => {
    link.addEventListener('click', () => {
        const targetBlock = contentBlocks[i]
        const topPosition = targetBlock.getBoundingClientRect().top + window.pageYOffset;
        scrollToPosition(topPosition, 1000);
    })
});

