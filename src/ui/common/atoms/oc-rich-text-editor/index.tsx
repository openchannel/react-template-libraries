import * as React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import './style.scss';

export const OcRichTextEditorComponent = (props: any) => {
  const editorRef: any = React.useRef();
  const { placeholderText, initialContent } = props;

  return (
    <div className="rich-editor">
      <Editor
        onInit={(e, editor) => ((editorRef.current = editor), console.log(e))}
        initialValue={initialContent}
        init={{
          suffix: '.min',
          menubar: false,
          toolbar:
            ' bold italic underline strikethrough subscript superscript fontselect fontsizeselect |' +
            'alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | link unlink | undo redo',
          plugins: 'lists link',
          placeholder: placeholderText,
          max_height: 150,
          content_style: 'body { font-family: Arial; }',
          // content_css: 'src/ui/styles/styles.scss',
          mobile: {
            toolbar_mode: 'sliding',
            max_height: 300,
            height: 220,
            toolbar:
              'bold italic underline strikethrough | undo redo | fontselect fontsizeselect | numlist bullist | ' +
              ' alignleft aligncenter alignright alignjustify | outdent indent | subscript superscript | link unlink |',
          },
        }}
      />
    </div>
  );
};
