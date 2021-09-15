<script>
export default {
  name: "SubComponents",
  functional: true,
  props: {
    com: {
      type: String,
      required: true,
    },
    dataList: {
      type: [Array, Number],
      required: true,
      default: 1,
    },
    dataType: {
      type: String,
      default: "data",
    },
    range: {
      type: Array,
      validator: function (arr) {
        if (arr.length !== 2) return false;
        // 默认情况跳出验证
        if (arr[0] === undefined && arr[1] === undefined) return true;
        if (arr.some((value) => typeof value !== "number")) return false;
        if (arr[1] < arr[0]) return false;
        return true;
      },
      default: () => (new Array(2)),
    },
    levelControl: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => ({}),
    }
  },
  render(h, context) {
    const vm = context;
    const com = vm.parent.$options.components[vm.props.com] || "div";
    const dataList = vm.props.dataList;
    const len = typeof dataList === "number" ? dataList : dataList.length;
    let [min = len, max = len] = vm.props.range;  

    const createChildren = (index = 0) => {
      if (index >= len) {
        const children = [vm.slots().default];
        if (index >= max || index <= min) {
          console.warn('[Level Error]: Abnormal level, Not in range!')
        }
        if (vm.props.levelControl) {
          children.push(vm.scopedSlots.levelControl({
            increase: index < max,
            decrease: index > min,
            level: index,
          }));
        }
        return h('div', { class: "sub-components-content_container" }, children);
      }

      return h(
        com,
        {
          props: {
            [vm.props.dataType]: dataList[index],
            ...(vm.props.config[index] ? vm.props.config[index] : {})
          },
          on: vm.listeners,
        },
        [createChildren(index + 1)]
      );
    };

    return h("div", { class: "sub-components_container" }, [createChildren(0)]);
  },
};
</script>