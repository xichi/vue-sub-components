<script>
export default {
  name: "SubComponents",
  functional: true,
  props: {
    com: {
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
      required: true,
      validator: function (arr) {
        if (arr.length !== 2) return false;
        if (arr.some((value) => typeof value !== "number")) return false;
        if (arr[1] < arr[0]) return false;
        return true;
      },
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
    const [min, max] = vm.props.range;
    const len = typeof dataList === "number" ? dataList : dataList.length;

    const createChildren = (index = 0) => {
      if (index >= len) {
        if (vm.props.levelControl) {
          return vm.scopedSlots.levelControl({
            increase: index < max,
            decrease: index >= min,
          });
        } else {
          return vm.slots().default;
        }
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