import { WbImageUploadAdapter } from './WbImageUploadAdapter'

export default function WbImageUploadAdapterPlugin(editor) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			// Configure the URL to the upload script in your back-end here!
			return new WbImageUploadAdapter(loader);
	};
}