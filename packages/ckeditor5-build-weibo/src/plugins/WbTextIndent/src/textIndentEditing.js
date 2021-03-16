import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import WbIndentTextCommand from "./textIndentCommand";
import { TEXT_INDENT_COMMAND } from './constants';

/**
 * Indent text editing plugin
 */
export class WbTextIndentEditing extends Plugin {

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'WbTextIndentEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor(editor) {
		super(editor);
		editor.config.define('textIndentValue', '2em');
	}

	/**
	 * Initialize
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		const indentValue = editor.config.get('textIndentValue');

		// Allow textindent attribute on all blocks.
		schema.extend('$block', { allowAttributes: TEXT_INDENT_COMMAND });
		schema.setAttributeProperties( TEXT_INDENT_COMMAND, { isFormatting: true } );

		const definition = {
			model: {
				key: TEXT_INDENT_COMMAND,
				values: [TEXT_INDENT_COMMAND]
			},
			view: {
				[TEXT_INDENT_COMMAND]: {
					key: 'style',
					value: {
						'text-indent': indentValue
					}
				}
			}
		};

		editor.conversion.attributeToAttribute(definition);
		editor.commands.add(TEXT_INDENT_COMMAND, new WbIndentTextCommand(editor));
	}
}