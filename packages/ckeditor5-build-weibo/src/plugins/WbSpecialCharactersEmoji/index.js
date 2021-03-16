export default function SpecialCharactersEmoji(editor) {
	editor.plugins.get('SpecialCharacters').addItems('Emoji', [
		{ title: 'smiley face', character: '😊' },
		{ title: 'rocket', character: '🚀' },
		{ title: 'wind blowing face', character: '🌬️' },
		{ title: 'floppy disk', character: '💾' },
		{ title: 'heart', character: '❤️' }
	]);
}