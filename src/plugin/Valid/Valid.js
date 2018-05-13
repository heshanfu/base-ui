/**
 * @author wsm
 * @date 2017/8/24-下午5:46
 * @file valid
 */

import {Toast} from '../Toast/Toast';

import {pickValue} from '../helper/helper';

const checkNotNull = (data) => {
    if (data === null || typeof data === 'undefined') return false;
    if (!data.toString()) return false;
    return true;
};

class Valid {

    constructor($toast, ruleMap) {
        this.ruleMap = ruleMap;

        Object.assign(this, {
            checkOptions(data = {}, options = []) {
                if (!options.length) return true;

                return options.every((option) => {
                    const {
                        field = '',
                        required = false,
                        selectable = false,
                        name = '',
                        rule = '',
                        message = '',
                        validate = null
                    } = option;

                    const fieldData = pickValue(data, field);

                    // check required
                    if (required && !checkNotNull(fieldData)) {
                        $toast.error(`${selectable ? '请选择' : '请输入'}${name}`);
                        return false;
                    }

                    // check rule
                    if (rule && !ruleMap[rule](fieldData)) {
                        $toast.error(message);
                        return false;
                    }

                    // check customized rule
                    if (validate && !validate(fieldData, field, data)) {
                        if (message) $toast.error(message);

                        return false;
                    }

                    return true;
                });
            }
        });
    }

}

export default {

    install(Vue, {ruleMap}) {
        const $toast = new Toast(Vue);
        const $valid = new Valid($toast, ruleMap);

        Object.assign(Vue.prototype, {$valid});
    }

};
