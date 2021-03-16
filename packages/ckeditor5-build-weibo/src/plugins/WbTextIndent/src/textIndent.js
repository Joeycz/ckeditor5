import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { WbTextIndentEditing } from "./textIndentEditing";
import { WbTextIndentUi } from "./textIndentUi";

/**
 * Indent plugin
 */
export default class WbTextIndent extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'WbTextIndent';
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [ WbTextIndentEditing, WbTextIndentUi ];
    }
}