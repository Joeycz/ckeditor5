import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';
import { TEXT_INDENT_COMMAND } from './constants'

/**
 * The textindent command plugin.
 *
 * @extends module:core/command~Command
 */
export default class WbTextIndentCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const firstBlock = first(this.editor.model.document.selection.getSelectedBlocks());
		this.isEnabled = !!firstBlock && this._canBeAligned(firstBlock);

		// 设置按钮状态
		if (this.isEnabled && firstBlock.hasAttribute(TEXT_INDENT_COMMAND)) {
			this.value = firstBlock.getAttribute(TEXT_INDENT_COMMAND);
		} else {
			this.value = null;
		}
	}

	/**
	 * @inheritDoc
	 */
	execute() {
		//execute(options = {}) {
		const editor = this.editor;
		const model = editor.model;
		const doc = model.document;

		model.change(writer => {
			const blocks = Array.from(doc.selection.getSelectedBlocks()).filter(block => this._canBeAligned(block));
			const currentTextIndent = blocks[0].getAttribute(TEXT_INDENT_COMMAND);
			const removeTextIndent = currentTextIndent === TEXT_INDENT_COMMAND || !TEXT_INDENT_COMMAND;

			if (removeTextIndent) {
				removeTextIndentFromSelection(blocks, writer);
			} else {
				setTextIndentOnSelection(blocks, writer, TEXT_INDENT_COMMAND);
			}
		});
	}

	_canBeAligned(block) {
		return this.editor.model.schema.checkAttribute(block, TEXT_INDENT_COMMAND);
	}
}

// Removes the textindent attribute from blocks.
// @private
function removeTextIndentFromSelection(blocks, writer) {
	for (const block of blocks) {
		writer.removeAttribute(TEXT_INDENT_COMMAND, block);
	}
}

// Sets the textindent attribute on blocks.
// @private
function setTextIndentOnSelection(blocks, writer, textindent) {
	for (const block of blocks) {
		writer.setAttribute(TEXT_INDENT_COMMAND, textindent, block);
	}
}