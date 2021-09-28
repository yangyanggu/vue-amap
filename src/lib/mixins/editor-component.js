import eventHelper from '../utils/event-helper';

export default {
  props: {
    editable: {
      type: Boolean,
      default: undefined
    },
    editOptions: {
      type: Object
    }
  },
  data() {
    return {
    };
  },
  methods: {
    setEditorEvents() {
      if (!this.$amapComponent.editor) return;
      let filters = ['addnode', 'adjust', 'removenode', 'end', 'move', 'add'];
      let filterSet = {};
      Object.keys(this.$listeners).forEach(key => {
        if (filters.indexOf(key) !== -1) filterSet[key] = this.$listeners[key];
      });
      Object.keys(filterSet).forEach(key => {
        eventHelper.addListener(this.$amapComponent.editor, key, filterSet[key]);
      });
    }
  }
};
