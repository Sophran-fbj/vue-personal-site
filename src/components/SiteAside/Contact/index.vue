<template>
    <div class="contact-container">
        <a class="contact-item">
            <Icon name="github"></Icon>
            <span>GitHub</span>
        </a>
        <a class="contact-item">
            <Icon name="mail"></Icon>
            <span>lzqgoogle@gmail.com</span>
        </a>
        <a class="contact-item">
            <Icon name="qq"></Icon>
            <span>2547698439</span>
            <div class="qrcode qq">
                <img src="../../../assets/qq-qrcode.png">
            </div>
        </a>
        <a class="contact-item">
            <Icon name="weixin"></Icon>
            <span>Sophran</span>
            <div class="qrcode wx">
                <img src="../../../assets/wx-qrcode.jpg">
            </div>
        </a>
    </div>  
</template>

<script>
import Icon from '@/components/Icon';
export default {
    name: 'Contact',
    components: {
        Icon
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.contact-container {
    width: 100%;
    position: relative;
    background-color: transparent;
    color: @lightWords;
    .contact-item {
        display: block;
        margin: 15px;
        cursor: pointer;
        &:last-child {
            margin-left: 13px;
            .iconfont {
                font-size: 24px;
            }
        }
        .iconfont {
            font-size: 20px;
        }
        span {
            margin-left: 5px;
            font-size: 12px;
            vertical-align: 3px;
        }
        &:hover {
            color: @primary;
            .qrcode {
                transform: scaleY(1);
            }
        }
        .qrcode {
            position: absolute;
            left: 10px;
            cursor: default;
            padding: 10px 0 0 5px;
            width: 150px;
            height: 150px;
            background-color: #fff;
            border-radius: 5px;
            transform: scaleY(0);
            transform-origin: center bottom;
            transition: 0.3s;
            img {
                width: 95%;
                height: 95%;
                border-radius: 5px;
            }
            &::after {
                content: '';
                position:absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -11px;
                border: 6px solid #fff;
                border-color: #fff transparent transparent transparent;
            }
        }
        .qq {
            bottom: calc(50%);
        }
        .wx {
            bottom: calc(20%);
        }
    }
}
</style>