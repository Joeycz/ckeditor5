import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WbLetterSpaceEditing from './letterSpaceEditing';
import WbLetterSpaceUI from './letterSpaceUi';

export default class WbLetterSpace extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ WbLetterSpaceEditing, WbLetterSpaceUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'WbLetterSpace';
	}
}
