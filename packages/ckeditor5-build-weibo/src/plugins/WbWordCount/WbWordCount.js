import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Template from '@ckeditor/ckeditor5-ui/src/template';
import View from '@ckeditor/ckeditor5-ui/src/view';
import env from '@ckeditor/ckeditor5-utils/src/env';
import { throttle, isElement } from 'lodash-es';
import { modelElementToPlainText } from './utils';

export default class WbWordCount extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		/**
		 * The number of characters in the editor.
		 *
		 * @observable
		 * @readonly
		 * @member {Number} module:word-count/wordcount~WordCount#characters
		 */
		this.set( 'characters', 0 );

		/**
		 * The number of words in the editor.
		 *
		 * @observable
		 * @readonly
		 * @member {Number} module:word-count/wordcount~WordCount#words
		 */
		this.set( 'words', 0 );

		// Don't wait for the #update event to set the value of the properties but obtain it right away.
		// This way, accessing the properties directly returns precise numbers, e.g. for validation, etc.
		// If not accessed directly, the properties will be refreshed upon #update anyway.
		Object.defineProperties( this, {
			characters: {
				get() {
					return ( this.characters = this._getCharacters() );
				}
			},
			words: {
				get() {
					return ( this.words = this._getWords() );
				}
			}
		} );

		/**
		 * The label used to display the words value in the {@link #wordCountContainer output container}.
		 *
		 * @observable
		 * @private
		 * @readonly
		 * @member {String} module:word-count/wordcount~WordCount#_wordsLabel
		 */
		this.set( '_wordsLabel' );

		/**
		 * The label used to display the characters value in the {@link #wordCountContainer output container}.
		 *
		 * @observable
		 * @private
		 * @readonly
		 * @member {String} module:word-count/wordcount~WordCount#_charactersLabel
		 */
		this.set( '_charactersLabel' );

		/**
		 * The configuration of this plugin.
		 *
		 * @private
		 * @type {Object}
		 */
		this._config = editor.config.get( 'wbWordCount' ) || {};

		/**
		 * The reference to a {@link module:ui/view~View view object} that contains the self-updating HTML container.
		 *
		 * @private
		 * @readonly
		 * @type {module:ui/view~View}
		 */
		this._outputView = undefined;

		/**
		 * A regular expression used to recognize words in the editor's content.
		 *
		 * @readonly
		 * @private
		 * @type {RegExp}
		 */
		this._wordsMatchRegExp = env.features.isRegExpUnicodePropertySupported ?
			// Usage of regular expression literal cause error during build (ckeditor/ckeditor5-dev#534).
			// Groups:
			// {L} - Any kind of letter from any language.
			// {N} - Any kind of numeric character in any script.
			// JavaScript 正则表达式匹配汉字 https://zhuanlan.zhihu.com/p/33335629
			new RegExp( '\\p{Unified_Ideograph}|\\S+', 'gu' ) :
			/[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\S+/gu;
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'WbWordCount';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		editor.model.document.on( 'change:data', throttle( this._refreshStats.bind( this ), 250 ) );

		if ( typeof this._config.onUpdate == 'function' ) {
			this.on( 'update', ( evt, data ) => {
				this._config.onUpdate( data );
			} );
		}

		if ( isElement( this._config.container ) ) {
			this._config.container.appendChild( this.wbWordCountContainer );
		}
	}

	/**
	 * @inheritDoc
	 */
	destroy() {
		if ( this._outputView ) {
			this._outputView.element.remove();
			this._outputView.destroy();
		}

		super.destroy();
	}

	/**
	 * Creates a self-updating HTML element. Repeated executions return the same element.
	 * The returned element has the following HTML structure:
	 *
	 * 		<div class="ck ck-word-count">
	 * 			<div class="ck-word-count__words">Words: 4</div>
	 * 			<div class="ck-word-count__characters">Characters: 28</div>
	 * 		</div>
	 *
	 * @type {HTMLElement}
	 */
	get wbWordCountContainer() {
		const editor = this.editor;
		const t = editor.t;
		const displayWords = editor.config.get( 'wbWordCount.displayWords' );
		const displayCharacters = editor.config.get( 'wbWordCount.displayCharacters' );
		const bind = Template.bind( this, this );
		const children = [];

		if ( !this._outputView ) {
			this._outputView = new View();

			if ( displayWords || displayWords === undefined ) {
				this.bind( '_wordsLabel' ).to( this, 'words', words => {
					return t( 'Words: %0', words );
				} );

				children.push( {
					tag: 'div',
					children: [
						{
							text: [ bind.to( '_wordsLabel' ) ]
						}
					],
					attributes: {
						class: 'ck-word-count__words'
					}
				} );
			}

			if ( displayCharacters || displayCharacters === undefined ) {
				this.bind( '_charactersLabel' ).to( this, 'characters', words => {
					return t( 'Characters: %0', words );
				} );

				children.push( {
					tag: 'div',
					children: [
						{
							text: [ bind.to( '_charactersLabel' ) ]
						}
					],
					attributes: {
						class: 'ck-word-count__characters'
					}
				} );
			}

			this._outputView.setTemplate( {
				tag: 'div',
				attributes: {
					class: [
						'ck',
						'ck-word-count'
					]
				},
				children
			} );

			this._outputView.render();
		}

		return this._outputView.element;
	}

	/**
	 * Determines the number of characters in the current editor's model.
	 *
	 * @private
	 * @returns {Number}
	 */
	_getCharacters() {
		const txt = modelElementToPlainText( this.editor.model.document.getRoot() );

		return txt.replace( /\n/g, '' ).length;
	}

	/**
	 * Determines the number of words in the current editor's model.
	 *
	 * @private
	 * @returns {Number}
	 */
	_getWords() {
		const txt = modelElementToPlainText( this.editor.model.document.getRoot() );
		const detectedWords = txt.match( this._wordsMatchRegExp ) || [];

		return detectedWords.length;
	}

	/**
	 * Determines the number of words and characters in the current editor's model and assigns it to {@link #characters} and {@link #words}.
	 * It also fires the {@link #event:update}.
	 *
	 * @private
	 * @fires update
	 */
	_refreshStats() {
		const words = this.words = this._getWords();
		const characters = this.characters = this._getCharacters();

		this.fire( 'update', {
			words,
			characters
		} );
	}
}