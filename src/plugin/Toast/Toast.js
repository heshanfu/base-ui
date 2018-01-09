import Vue from 'vue';
import {createVueInstanceEle} from '../helper/helper';
import ToastComponent from './component/toast';
import ToastType from './constant/ToastType';

const ToastEleId = 'toast';

class Toast {

    constructor() {
        const self = this;
        createVueInstanceEle(ToastEleId);
        self.toastInstance = new Vue(ToastComponent);

        self.toastInstance.$mount(`#${ToastEleId}`);
    }

    toast(type, message = '', duration = 2000) {
        const self = this;
        self.toastInstance.visible = true;
        self.toastInstance.message = message;
        self.toastInstance.type = type;

        if (self.toastTimer) clearTimeout(self.toastTimer);
        self.toastTimer = setTimeout(() => {
            self.toastInstance.visible = false;
        }, duration);
    }

    info(...arg) {
        const self = this;
        self.toast(ToastType.INFO, ...arg);
    }

    success(...arg) {
        const self = this;
        self.toast(ToastType.SUCCESS, ...arg);
    }

    error(...arg) {
        const self = this;
        self.toast(ToastType.ERROR, ...arg);
    }

}

export default Toast;