declare const _default: __VLS_WithTemplateSlots<import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    currentPage: {
        type: import('./vue/dist/vue.esm-bundler.js').PropType<number>;
        required: true;
    };
    pageCount: {
        type: import('./vue/dist/vue.esm-bundler.js').PropType<number>;
        required: true;
    };
}, {}, unknown, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    next: (index: number) => void;
    previous: (index: number) => void;
}, string, import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    currentPage: {
        type: import('./vue/dist/vue.esm-bundler.js').PropType<number>;
        required: true;
    };
    pageCount: {
        type: import('./vue/dist/vue.esm-bundler.js').PropType<number>;
        required: true;
    };
}>> & {
    onNext?: ((index: number) => any) | undefined;
    onPrevious?: ((index: number) => any) | undefined;
}, {}, {}>, {
    previous?(_: {}): any;
    current?(_: {}): any;
    next?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
