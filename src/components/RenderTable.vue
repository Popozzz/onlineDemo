
<script>
import throttle from "lodash/throttle";
export default {
  name: "RenderTable",
  props: {
    fixedTop: {
      type: Boolean,
      default: false,
    },
    topDistance: {
      type: Number,
      default: 0,
    },
    columns: {
      type: Array,
      default: () => [],
      require: true,
    },
  },
  data() {
    return {
      hasFixedCol: false,
    };
  },
  watch: {},
  mounted() {
    this.initFixedHeaderWrapperElement();
  },
  beforeDestroy() {
    if (this.hasFixedCol) {
      window.removeEventListener("resize", this.handleResize);
    }
  },
  methods: {
    initFixedHeaderWrapperElement() {
      if (this.fixedTop) {
        const tableEl = this.$refs.table.$el
        const headerWrapperEl = tableEl?.querySelector('.el-table__header-wrapper')
        headerWrapperEl.style.position = 'sticky'
        headerWrapperEl.style.top = `${this.topDistance}px`
        const headerEl = headerWrapperEl.querySelector('.el-table__header')
        this.tableHeaderEl = headerEl

        if (!tableEl || !headerWrapperEl) return

        setTimeout(() => {
          const fixHeaderRightWrap = tableEl?.querySelector('.el-table__fixed-right')
          const fixHeaderLeftWrap = tableEl?.querySelector('.el-table__fixed')
          this.hasFixedCol = [fixHeaderLeftWrap, fixHeaderRightWrap].some(el => !!el);

          [fixHeaderLeftWrap, fixHeaderRightWrap].forEach((fixHeaderWrap, index) => {
            if (!fixHeaderWrap) return
            const cloneHeaderContainerEl = fixHeaderWrap.cloneNode(false)
            cloneHeaderContainerEl.style.height = 'auto'
            const fixedHeaderWrapperEl = fixHeaderWrap.querySelector('.el-table__fixed-header-wrapper')
            cloneHeaderContainerEl.appendChild(fixedHeaderWrapperEl)

            if (index === 0) {
              headerWrapperEl.insertBefore(cloneHeaderContainerEl, headerWrapperEl.firstChild)
              headerEl.style['margin-left'] = `-${cloneHeaderContainerEl.style.width}`
              this.fixedLeftEl = cloneHeaderContainerEl
            } else {
              headerWrapperEl.appendChild(cloneHeaderContainerEl)
              this.fixedRightEl = cloneHeaderContainerEl
            }
          })

          if (this.hasFixedCol) {
            headerWrapperEl.style.display = 'flex'
            window.addEventListener('resize', this.handleResize)
          }
        }, 0)
      }
    },
    handleResize: throttle(function() {
      const tableEl = this.$refs.table.$el;
      [this.fixedLeftEl, this.fixedRightEl].forEach((fixedEl, index) => {
        if (!fixedEl) return

        let fixWrapper = null
        if (index === 0) {
          fixWrapper = tableEl?.querySelector(':scope >.el-table__fixed')
        } else {
          fixWrapper = tableEl?.querySelector(':scope >.el-table__fixed-right')
        }

        if (!fixWrapper) return
        const currentWidth = fixedEl.style.width
        const wrapperWidth = fixWrapper?.style.width
        if (!!wrapperWidth && wrapperWidth !== currentWidth) {
          fixedEl.style.width = wrapperWidth
          if (index === 0 && this.tableHeaderEl) {
            this.tableHeaderEl.style['margin-left'] = `-${wrapperWidth}`
          }
        }
      })
    }, 500, {
      leading: false,
      trailing: true
    })
  },
  render() {
    const { columns } = this.$props;

    if (!columns?.length) {
      return (
        <el-table
          ref={"table"}
          size="middle"
          {...{
            props: this.$attrs,
            on: this.$listeners,
            slots: this.$slots,
            scopedSlots: this.$scopedSlots,
          }}
        />
      );
    }

    const slotsMap =
      this.$slots.default?.reduce((result, slot) => {
        const { componentOptions } = slot;
        const { propsData } = componentOptions;

        result[propsData.prop] = slot;

        return result;
      }, {}) || {};

    const renderColumns = columns.map((col) => {
      const { render, emptyText = "", ...otherProps } = col;
      const renderFunction =
        render || ((row) => row[otherProps.prop] || emptyText);

      // 在有slot的情况下优先使用slot
      return (
        slotsMap[otherProps.prop] || (
          <el-table-column
            {...{
              props: otherProps,
              scopedSlots: {
                default: (scope) => renderFunction(scope.row, scope.$index),
              },
            }}
          ></el-table-column>
        )
      );
    });

    return (
      <el-table ref={"table"} {...{ props: this.$attrs, on: this.$listeners }}>
        {renderColumns.map((col) => col)}
      </el-table>
    );
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  border-top: none;
  overflow: initial;
}

.el-table--border {
  ::v-deep {
    .el-table__header-wrapper {
      box-sizing: border-box;
      border-right: 1px solid #e9ecef;

      .el-table__fixed-right {
        right: -1px;
        left: auto;
      }
    }
  }
}

::v-deep {
  .el-table__fixed {
    box-shadow: 3px 0 5px rgb(0 0 0 / 12%);
  }
  .el-table__fixed-right {
    box-shadow: -3px 0 5px rgb(0 0 0 / 12%);
  }

  .el-table__header-wrapper {
    position: static;
    border-top: 1px solid #e9ecef;
    z-index: 5;

    .el-table__fixed, .el-table__fixed-right {
      position: sticky;
      height: auto;
      flex-shrink: 0;
      z-index: 9;
    }
  }

  .el-table__header-wrapper:has(+.is-scrolling-right, +.is-scrolling-none) {
    .el-table__fixed-right {
      box-shadow: none;
    }
  }

  .el-table__header-wrapper:has(+.is-scrolling-left, +.is-scrolling-none) {
    .el-table__fixed{
      box-shadow: none;
    }
  }
}
</style>
