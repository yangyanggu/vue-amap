import {useAttrs} from "vue";
import {bindInstanceEvent, eventReg, convertEventToLowerCase} from "../utils";

export function useEditor (editor: any, attrs: any){
  if (!editor) return;
  const filters = ['addnode', 'adjust', 'removenode', 'end', 'move', 'add'];
  const filterSet: any = {};
  Object.keys(attrs).forEach(key => {
    if(eventReg.test(key)){
      const eventKey = convertEventToLowerCase(key);
      if (filters.indexOf(eventKey) !== -1) filterSet[eventKey] = attrs[key];
    }

  });
  Object.keys(filterSet).forEach(key => {
    bindInstanceEvent(editor, key, filterSet[key]);
  });
}