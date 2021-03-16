import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WbFontColorEditing from './fontcolorediting';
import WbFontColorUI from './fontcolorui';

export default class WbFontColor extends Plugin {
	static get requires() {
		return [WbFontColorEditing, WbFontColorUI];
	}

	static get pluginName() {
		return 'WbFontColor';
	}
}