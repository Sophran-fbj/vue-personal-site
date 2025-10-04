import getComponentRootDom from './getComponentRootDom'
import Icon from '@/components/Icon'
import styles from './showMessage.module.less'

/**
 * 
 * @param {String} content 消息内容
 * @param {String} type 消息类型
 * @param {Number} duration 多久消失
 * @param {HTMLElement} container 消息显示基于容器
 */
export default function showMessage(options = {}) {
    const content = options.content || '';
    const type = options.type || 'info';
    const duration = options.duration || 2000;
    const container = options.container || document.body;
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
    
    const div = document.createElement('div');
    const iconDom = getComponentRootDom(Icon, {
        name: type
    });
    div.innerHTML = `
        ${iconDom.outerHTML}
        <span>${content}</span>
    `;
    div.classList.add(styles.message, styles[`message-${type}`]);
    container.appendChild(div);
    div.clientHeight; // 导致reflow
    div.style.opacity = 1;
    div.style.transform = `translate(-50%, -50%)`;

    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%, -50%) translateY(-30px)`;
        div.addEventListener('transitionend', () => {
            div.remove();
            options.callback && options.callback();
        })
    }, duration);
}