/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';

import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';

import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';

// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';

import Heading from '@ckeditor/ckeditor5-heading/src/heading';
// // import Title from '@ckeditor/ckeditor5-heading/src/title';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

import Font from '@ckeditor/ckeditor5-font/src/font';

import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';

import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';


import List from '@ckeditor/ckeditor5-list/src/list';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';

import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import ParagraphButtonUI from '@ckeditor/ckeditor5-paragraph/src/paragraphbuttonui';

import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';

import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';

import Mention from '@ckeditor/ckeditor5-mention/src/mention';

import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';

import { WbImageUploadAdapterPlugin } from './plugins/WbImageUploadAdapterPlugin';
import WbSpecialCharactersEmoji from './plugins/WbSpecialCharactersEmoji';
import { 
	// WbConvertPAttributes,
	WbConvertSectionAttributes
} from './plugins/WbConvertTagAttributes';
import { WbFontColor } from './plugins/WbFontColor';
import { WbWordCount } from './plugins/WbWordCount';
import WbLineHeight from './plugins/WbLineHeight/src/lineheight';
import WbLetterSpace from './plugins/WbLetterSpace/src/letterSpace';
import WbTextIndent from './plugins/WbTextIndent/src/textIndent';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	// UploadAdapter,
	Autoformat,

	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Subscript,
	Superscript,

	BlockQuote,
	// CKFinder,
	// EasyImage,

	Heading,
	// Title,

	Alignment,

	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	ImageInsert,
	AutoImage,
	ImageResize,

	Font,

	Indent,
	IndentBlock,

	Link,
	AutoLink,
	LinkImage,

	List,
	TodoList,
	ListStyle,

	MediaEmbed,
	Paragraph,
	ParagraphButtonUI,
	PasteFromOffice,
	TableCellProperties,

	Table,
	TableToolbar,
	TableProperties,

	TextTransformation,

	Mention,

	CodeBlock,

	RemoveFormat,

	HorizontalLine,

	SpecialCharacters,
	SpecialCharactersEssentials,

	WbImageUploadAdapterPlugin,
	WbSpecialCharactersEmoji,
	// WbConvertPAttributes,
	WbConvertSectionAttributes,
	WbFontColor,
	WbWordCount,
	WbLineHeight,
	WbLetterSpace,
	WbTextIndent
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'undo', 'redo', '|',
			'heading', '|',
			'removeFormat', '|',
			'fontfamily', 'fontsize',
			'wbFontColor',
			'fontBackgroundColor', '|',
			'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
			'alignment', '|',
			'paragraph',
			'lineHeight', 'letterSpacing', 'textIndent', '|',
			'link', '|',
			'code', 'codeBlock', '|',
			'bulletedList', 'numberedList', 'todoList', '|',
			'indent', 'outdent', '|',
			'imageInsert', '|', 'imageStyle:full', 'imageStyle:side', 'imageTextAlternative', 'linkImage', '|',
			'blockQuote', '|',
			'horizontalLine', '|',
			'insertTable',
			'mediaEmbed'
		],
		shouldNotGroupWhenFull: true
	},
	image: {
		toolbar: [
			'imageResize', '|',
			'imageTextAlternative', '|',
			'imageStyle:full', 'imageStyle:side', '|',
			'linkImage'
		],
		styles: ['full', 'side'],
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties',
			'tableCellProperties'
		]
	},
	// The Mention feature brings support for smart autocompletion based on user input. When a user types a pre-configured marker, such as @ or #, they get autocomplete suggestions in a panel displayed next to the caret. The selected suggestion is then inserted into the content.
	// https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html
	mention: {
		feeds: [
			{
				marker: '@',
				feed: [ '@来去之间', '@马伯庸', '@张艺谋', '@易烊千玺', '@人民日报' ],
				minimumCharacters: 0
			},
			{
				marker: '#',
				feed: [ '#来去之间#', '#马伯庸#', '#张艺谋#', '#易烊千玺#', '#人民日报#' ],
				minimumCharacters: 0
			}
		]
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
		]
	},
	mediaEmbed: {
		// providers: [],
		extraProviders:[
			{
				name: 'weiboTVShow',
				url: /^weibo\.com\/tv\/show\/(\S+)/,
				// html: match => {
				// 	return `<div style="height: 400px">
				// 		<iframe src="//${match}" style="width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
				// 	</div>`
				// }
			}
		],
		removeProviders: [ 'instagram', 'twitter', 'googleMaps', 'flickr', 'facebook' ]
	},
	typing: {
		transformations: {
			extra: [
				{ from: 'wb', to: 'https://weibo.com' },
				{ from: ':)', to: '🙂' },
				{ from: ':tada:', to: '🎉' }
			]
		}
	},
	link: {
		addTargetToExternalLinks: true,
		decorators: [
			{
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'download'
				}
			}
		]
	},
	fontSize: {
		options: [
			'default',
			9,
			11,
			13,
			17,
			19,
			21
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'zh-cn'
};
