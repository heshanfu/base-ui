<!-- @author Rain -->
<!-- @email yutiangan@yangqianguan.com -->
<!-- @date 2018-06-29 11:12:07.835 -->
<!-- @desc generated by yqg-cli@0.2.0 -->

<template>
    <div class="component">
        <h4 class="heading">Markdown Editor</h4>

        <div class="card">
            <div class="comp-md-editor">
                <b-md-editor
                    v-model="mdText"
                    :options="options"
                    :customized-style="customizedStyle"/>
            </div>
        </div>

        <pre class="json-preview">{{ $j(mdText) }}</pre>

    </div>

</template>

<script type="text/babel">
    import mdSampleText from './sample.md';

    const options = {
        actionList: [{
            name: 'header',
            description: 'header',
            methodName: 'onHeader'
        }, {
            name: 'bold',
            description: 'bold',
            methodName: 'onBold'
        }, {
            name: 'italic',
            description: 'italic',
            methodName: 'onItalic'
        }, {
            name: 'link',
            description: 'link',
            methodName: 'onLink'
        }, {
            name: 'quote',
            description: 'quote',
            methodName: 'onQuote'
        }, {
            name: 'code',
            description: 'code',
            methodName: 'onCode'
        }, {
            name: 'image',
            description: 'image',
            methodName: 'onImage',
            method: (mdText, textarea) => {
                const result = {
                    mdText,
                    leftSelectionChange: 0,
                    rightSelectionChange: 0
                };
                if ('selectionStart' in textarea) {
                    const {selectionStart, selectionEnd} = textarea;
                    if (selectionStart === selectionEnd) {
                        result.mdText = `${mdText.substring(0, selectionStart)
                            }![image_info](http://ww1.sinaimg.cn/mw690/005ODVHQly1fsxwxh2607j30o10ecq4n.jpg)
                            ${mdText.substring(selectionStart, selectionEnd)
                            }${mdText.substring(selectionEnd)}`;
                        result.leftSelectionChange = 2;
                        result.rightSelectionChange = 12;
                    } else {
                        result.mdText = `${mdText.substring(0, selectionStart)
                            }![${mdText.substring(selectionStart, selectionEnd)
                            }](http://ww1.sinaimg.cn/mw690/005ODVHQly1fsxwxh2607j30o10ecq4n.jpg)
                            ${mdText.substring(selectionEnd)}`;
                        result.leftSelectionChange = 2;
                        result.rightSelectionChange = 2;
                    }
                }
                return result;
            }
        }]
    };

    export default {
        name: 'CompMdEditor',

        data() {
            return {
                options,
                mdText: mdSampleText,
                customizedStyle: {
                    height: '1000px'
                }
            };
        }
    };

</script>
