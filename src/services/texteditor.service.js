import { EditorStore, posts, timeout } from "./store";
import { get } from "svelte/store";
import { InitFireBase, InitFireBaseBackup } from "./firebase.service";



export const InitEditor = (id) => {
  let editor = CodeMirror(document.getElementById(id), {
    theme: "elegant",
  });

  editor.setSize("100%", "100%");

  let dbRef = InitFireBase();
  Firepad.fromCodeMirror(dbRef, editor, {
    defaultText: "Write your document ",
    richTextToolbar: true
  });
  InitFireBaseBackup() = InitFireBase();

  EditorStore.set(editor); 
};

export const downloadCodeFromEditor = (fileName) => {
  let anchor = document.createElement("a");
  anchor.style.display = "none";

  let editor = get(EditorStore);

  anchor.setAttribute(
    "href",
    "data:text/plan;charset=utf-8," + editor.getValue()
  );
  anchor.setAttribute("download", fileName);

  document.body.appendChild(anchor);

  anchor.click();
  document.body.removeChild(anchor);
};
