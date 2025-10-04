import defaultGif from '@/assets/default.gif';
export default {
    inserted(el, binding) {
        el.src = defaultGif;
        const observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                el.src = binding.value;
                observer.disconnect();
            }
        });
        observer.observe(el);
    }
}