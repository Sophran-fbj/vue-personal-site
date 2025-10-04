import loadingUrl from '@/assets/loading.svg';
import styles from './loading.module.less';
export default function (el, binding) {
    let img = el.querySelector('img[data-role="loading"]');
    if (binding.value) {
        if (!img) {
            img = document.createElement('img');
            img.src = loadingUrl;
            img.dataset.role = 'loading';
            img.classList.add(styles.loading);
            el.appendChild(img);
        }
    } else {
        if (img) {
            img.remove();
        }
    }
}

