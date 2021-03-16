// @ts-nocheck
import { uploadWithFile } from './utils/imageUpload';
import pidToImgs from './utils/pidToImgs';

export class WbImageUploadAdapter {
	constructor(loader) {
			// The file loader instance to use during the upload. It sounds scary but do not
			// worry — the loader will be passed into the adapter later on in this guide.
			this.loader = loader;
	}

	upload() {
		return this.loader.file
			.then( file => new Promise(async (resolve, reject) => {
				try {
					const { pid, source } = await uploadWithFile(file, {}, 1, 1, this._progress.bind(this))
					this.source = source
					this.pid = pid
					const urls = pidToImgs([pid])
					console.log(urls)
					resolve(this._formatUrl(urls[0]))
				} catch(err) {
					reject(err)
				}
			}));
	}

	abort() {
		if (this.source) {
			this.source.cancel()
		}
	}

	_formatUrl(url) {
		const img = url
		return {
			default: img.url,
			large: img.large.url,
			normal: img.normal.url
		}
	}

	_progress(evt) {
		console.log(evt)
		const loader = this.loader
		if (evt.lengthComputable) {
			loader.uploadTotal = evt.total;
			loader.uploaded = evt.loaded;
		}
	}
}