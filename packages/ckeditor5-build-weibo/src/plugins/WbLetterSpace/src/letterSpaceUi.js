import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import { normalizeOptions } from './utils';
import { LETTER_SPACE } from './utils';

import letterSpaceIcon from '../theme/icons/letter-space.svg';
// import '../../theme/fontsize.css';

const classnameDrop = ['wb-editor-letter-space-dropdown']
export default class WbLetterSpaceUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;

		const options = this._getLocalizedOptions();

		const command = editor.commands.get( LETTER_SPACE );

		// Register UI component.
		editor.ui.componentFactory.add( LETTER_SPACE, locale => {
			const dropdownView = createDropdown( locale );
			addListToDropdown( dropdownView, _prepareListOptions( options, command ) );

			// Create dropdown model.
			dropdownView.buttonView.set( {
				label: '字间距',
				icon: letterSpaceIcon,
				tooltip: true
			} );

			dropdownView.extendTemplate( {
				attributes: {
					class: classnameDrop
				}
			} );

			dropdownView.bind( 'isEnabled' ).to( command );

			// Execute command when an item from the dropdown is selected.
			this.listenTo( dropdownView, 'execute', evt => {
				editor.execute( evt.source.commandName, { value: evt.source.commandParam } );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}

	_getLocalizedOptions() {
		const editor = this.editor;
		const t = editor.t;

		const localizedTitles = {
			Default: '默认'
		};

		const options = normalizeOptions( editor.config.get( LETTER_SPACE ).options );

		return options.map( option => {
			const title = localizedTitles[ option.title ];

			if ( title && title != option.title ) {
				// Clone the option to avoid altering the original `namedPresets` from `./utils.js`.
				option = Object.assign( {}, option, { title } );
			}

			return option;
		} );
	}
}

function _prepareListOptions( options, command ) {
	const itemDefinitions = new Collection();

	for ( const option of options ) {
		const def = {
			type: 'button',
			model: new Model( {
				commandName: LETTER_SPACE,
				commandParam: option.model,
				label: option.title,
				class: 'wb-editor-letter-sapce-option',
				withText: true
			} )
		};

		if ( option.view && option.view.classes ) {
			def.model.set( 'class', `${ def.model.class } ${ option.view.classes }` );
		}

		def.model.bind( 'isOn' ).to( command, 'value', value => value === option.model );

		// Add the option to the collection.
		itemDefinitions.add( def );
	}

	return itemDefinitions;
}
