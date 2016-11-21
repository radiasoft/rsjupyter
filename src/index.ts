import {
    IIterator, map, toArray
} from 'phosphor/lib/algorithm/iteration';


import {
    Token
} from 'phosphor/lib/core/token';

import {
    h, VNode
} from 'phosphor/lib/ui/vdom';

import {
    Vector
} from 'phosphor/lib/collections/vector';


import {
    VDomWidget, VDomModel
} from 'jupyterlab/lib/common/vdom';

import {
    ICommandLinker
} from 'jupyterlab/lib/commandlinker';

const LAUNCHER_CLASS = 'jp-LauncherWidget';

const IMAGE_CLASS = 'jp-LauncherWidget-image';

const TEXT_CLASS = 'jp-LauncherWidget-text';

const ITEM_CLASS = 'jp-LauncherWidget-item';

const FOLDER_CLASS = 'jp-LauncherWidget-folder';

const FOLDER_ICON_CLASS = 'jp-FolderIcon';

const PATH_CLASS = 'jp-LauncherWidget-path';

const CWD_CLASS = 'jp-LauncherWidget-cwd';

const BODY_CLASS = 'jp-LauncherWidget-body';

const DIALOG_CLASS = 'jp-LauncherWidget-dialog';

export 
const RS_LAUNCH_COMMAND = 'rs:launcher:launch'

export
interface IRSLauncherItem {
    name: string;
    url: string;
    imgClass: string;
}

export
interface IRSLauncher {
    add(item: IRSLauncherItem): void;
}

export
const RS_LAUNCHER_ID = 'org.radiasoft.jupyterlab.launcher';

export
const IRSLauncher = new Token<IRSLauncher>(RS_LAUNCHER_ID);

export
class RSLauncherModel extends VDomModel implements IRSLauncher {
    constructor() {
        super();
        this._items = new Vector<IRSLauncherItem>();
    }

    add(item: IRSLauncherItem): void {
        this._items.pushBack(item);
        this.stateChanged.emit(void 0);
    }

    items(): IIterator<IRSLauncherItem> {
        return this._items.iter();    
    }

    private _items: Vector<IRSLauncherItem> = null;
}

export
class RSLauncherWidget extends VDomWidget<RSLauncherModel> {
    constructor(linker: ICommandLinker, model: RSLauncherModel, id: string, label: string) {
        super();
        this._linker = linker;
        this.addClass(LAUNCHER_CLASS);
        this.id = id;
        this.model = model
        this.title.label = label;

    }

    protected render(): VNode | VNode[] {
        let children = map(
            this.model.items(),
            item => {
                let icon = h.div(
                    { className: item.imgClass + ' ' + IMAGE_CLASS }
                );
                let label = h.div(
                    { className: TEXT_CLASS },
                    item.name
                );


                let launch_attrs = this._linker.populateVNodeAttrs(
                    { className: ITEM_CLASS },
                    RS_LAUNCH_COMMAND,
                    { url: item.url }
                );

                let child = h.div(
                    launch_attrs,
                    [icon, label]
                );

                return child; 
            }
        );

        return h.div(
            { className: DIALOG_CLASS }, 
            h.div(
                { className: BODY_CLASS  },
                toArray(children)
            )
        );
    }

    private _linker: ICommandLinker = null;
}
