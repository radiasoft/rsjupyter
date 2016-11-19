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

const BODY_CLASS = 'rs-LauncherWidget-body';

const DIALOG_CLASS = 'rs-LauncherWidget-dialog';

const CHILD_CLASS = 'rs-LauncherWidget-child';

const LINK_CLASS = 'rs-LauncherWidget-link';

export
interface IRSLauncherItem {
    name: string;
    url: string;
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
        this.model = model
        this.id = id;
        this.title.label = label;
    }

    protected render(): VNode | VNode[] {
        let children = map(
            this.model.items(),
            item => {
                let child = h.div(
                    { className: CHILD_CLASS },
                    h.a(
                        { className: LINK_CLASS, target: '_blank', href: item.url },
                        item.name
                    )
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

