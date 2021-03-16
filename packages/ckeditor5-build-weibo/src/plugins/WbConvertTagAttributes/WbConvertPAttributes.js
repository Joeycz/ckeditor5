export default function WbConvertPAttributes(editor) {
	const tag = 'p'
	// Allow <tag> elements in the model.
	editor.model.schema.register(tag, {
		allowWhere: '$block',
		allowContentOf: '$root'
	});

	// Allow <tag> elements in the model to have all attributes.
	editor.model.schema.addAttributeCheck(context => {
		if (context.endsWith(tag)) {
			return true;
		}
	});

	// The view-to-model converter converting a view <tag> with all its attributes to the model.
	editor.conversion.for('upcast').elementToElement({
		view: tag,
		model: (viewElement, {writer: modelWriter}) => {
			return modelWriter.createElement(tag, viewElement.getAttributes());
		}
	});
	// The model-to-view converter for the <tag> element (attributes are converted separately).
	editor.conversion.for('downcast').elementToElement( {
		model: tag,
		view: tag
	});

	// The model-to-view converter for <tag> attributes.
	// Note that a lower-level, event-based API is used here.
	editor.conversion.for('downcast').add(dispatcher => {
		dispatcher.on('attribute', (evt, data, conversionApi) => {
				// Convert <tag> attributes only.
				if (data.item.name != tag) {
					return;
				}

				const viewWriter = conversionApi.writer;
				const viewtag = conversionApi.mapper.toViewElement(data.item);

				// In the model-to-view conversion we convert changes.
				// An attribute can be added or removed or changed.
				// The below code handles all 3 cases.
				if (data.attributeNewValue) {
					viewWriter.setAttribute(data.attributeKey, data.attributeNewValue, viewtag );
				} else {
					viewWriter.removeAttribute(data.attributeKey, viewtag);
				}
		} );
	} );
}