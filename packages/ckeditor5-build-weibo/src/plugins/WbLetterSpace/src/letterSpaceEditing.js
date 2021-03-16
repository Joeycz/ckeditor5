
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import WbLetterSpaceCommond from './letterSpaceCommond';
import { normalizeOptions } from './utils';
import { buildDefinition, LETTER_SPACE } from './utils';
import CKEditorError from '@ckeditor/ckeditor5-utils/src/ckeditorerror';


export default class WbLetterSpaceEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'WbLetterSpaceEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		// Define default configuration using named presets.
		editor.config.define( LETTER_SPACE, {
			options: [
				'default',
				0.5,
				1,
				2
			],
			supportAllValues: true
		} );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		// Allow fontSize attribute on text nodes.
		editor.model.schema.extend( '$text', { allowAttributes: LETTER_SPACE } );
		editor.model.schema.setAttributeProperties( LETTER_SPACE, {
			isFormatting: true,
			copyOnEnter: true
		} );

		const supportAllValues = editor.config.get( 'letterSpacing.supportAllValues' );

		// Define view to model conversion.
		const options = normalizeOptions( this.editor.config.get( 'letterSpacing.options' ) )
			.filter( item => item.model );
		const definition = buildDefinition( LETTER_SPACE, options );

		// Set-up the two-way conversion.
		if ( supportAllValues ) {
			this._prepareAnyValueConverters( definition );
		} else {
			editor.conversion.attributeToElement( definition );
		}

		// Add FontSize command.
		editor.commands.add( LETTER_SPACE, new WbLetterSpaceCommond( editor ) );
	}

	/**
	 * These converters enable keeping any value found as `style="letter-spacing: *"` as a value of an attribute on a text even
	 * if it is not defined in the plugin configuration.
	 *
	 * @param {Object} definition {@link module:engine/conversion/conversion~ConverterDefinition Converter definition} out of input data.
	 * @private
	 */
	_prepareAnyValueConverters( definition ) {
		const editor = this.editor;

		// If `letterSpace.supportAllValues=true`, we do not allow to use named presets in the plugin's configuration.
		const presets = definition.model.values.filter( value => !String( value ).match( /[\d.]+[\w%]+/ ) );

		if ( presets.length ) {
			throw new CKEditorError(
				'letter-spacing-invalid-use-of-named-presets',
				null, { presets }
			);
		}

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: LETTER_SPACE,
			view: ( attributeValue, { writer } ) => {
				if ( !attributeValue ) {
					return;
				}

				return writer.createAttributeElement( 'span', { style: 'letter-spacing:' + attributeValue }, { priority: 7 } );
			}
		} );

		editor.conversion.for( 'upcast' ).attributeToAttribute( {
			model: {
				key: LETTER_SPACE,
				value: viewElement => viewElement.getStyle( 'letter-spacing' )
			},
			view: {
				name: 'span',
				styles: {
					'letter-spacing': /.*/
				}
			}
		} );
	}
}
