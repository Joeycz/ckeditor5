import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import indentRight from "../theme/icons/indent-firstline.svg";
import { TEXT_INDENT_COMMAND } from "./constants";

/**
 * Indent text ui plugin
 */
export class WbTextIndentUi extends Plugin {
    /**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'WbTextIndentUI';
	}
    /**
     * Init plugin
     */
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add(TEXT_INDENT_COMMAND, locale => {
            const command = editor.commands.get( TEXT_INDENT_COMMAND );
            const view = new ButtonView(locale);

            view.set({
                label: '首行缩进',
                icon: indentRight,
                tooltip: true,
                isToggleable: true,
                class: 'wb-text-indent'
            });

            view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute command.
			this.listenTo( view, 'execute', () => {
				editor.execute(TEXT_INDENT_COMMAND);
				editor.editing.view.focus();
			} );

            return view;
        });
    }
}