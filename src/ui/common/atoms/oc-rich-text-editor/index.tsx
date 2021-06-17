import * as React from 'react';
import { Editor, IAllProps } from '@tinymce/tinymce-react';

import './style.scss';

export interface OcRtfProps extends IAllProps {
	name?: string;
	/**
	 * Placeholder text to pass in text editor
	 */
	placeholderText: string | undefined;
	/**
	 * Text value which will be already typed in editor
	 */
	initialValue?: string;
	/**
	 * Current editor value
	 */
	value: string | undefined;
	/**
	 * Text value which will be already typed in editor
	 */
	onChange: any;
}

export const OcRichTextEditorComponent = (props: OcRtfProps) => {
	const { name, placeholderText, value, onChange, initialValue, onBlur } = props;

	const editorRef: any = React.useRef();

	const onInit = React.useCallback(
		(_e, editor) => {
			editorRef.current = editor;

			if (onBlur) {
				editor.on('blur', (event: any) => {
					onBlur(event, editor);
				});
			}
		},
		[onBlur],
	);

	return (
		<div className="rich-editor">
			<Editor
				id={name}
				onEditorChange={onChange}
				onInit={onInit}
				initialValue={initialValue}
				value={value}
				init={{
					suffix: '.min',
					menubar: false,
					resize: true,
					toolbar:
						' bold italic underline strikethrough subscript superscript fontselect fontsizeselect |' +
						'alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | link unlink | undo redo',
					plugins: 'lists link autoresize',
					placeholder: placeholderText,
					content_style: 'body { font-family: Arial; }',
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
