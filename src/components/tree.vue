<script>
export default {
  name: 'Tree',
  props: {
    tree: {
      type: Object,
      required: true,
    }
  },
  render(h) {
    return h(
      'div',
      [...this.renderChildRecursive(h, Object.values(this.tree))]
    );
  },
  methods: {
    renderChildRecursive(h, childs) {
      if (childs.length === 0) return [];
      const result = [];
      childs.forEach(el => {
        result.push(
          h(
            'div',
            {
              key: el.id,
              style: {
                'padding-left': `10px`,
                'border-left': '1px dotted black',
                'margin-bottom': '5px',
              },
            },
            [
              h(
                'span',
                {
                  style: {
                    border: '1px solid black',
                    padding: '0 3px',
                    margin: '0 5px 5px 0',
                    'display': el._childs.length ? 'inline' : 'none',
                    cursor: 'pointer',
                  },
                  on: {
                    click: (event) => {
                      const style = event.currentTarget.closest('div').querySelector('div').style;
                      if (style.display === 'none') {
                        style.display = 'block';
                      } else {
                        style.display = 'none';
                      }
                    }
                  },
                  domProps: {innerHTML: '&#43;'},
                }
              ),
              h('span', el.title),
              h(
                'div',
                {
                  style: {
                    'margin-top': '5px',
                  },
                },
                [...this.renderChildRecursive(h, el._childs)]
              )
            ]
          )
        )
      })
      return result;
    }
  }
}
</script>