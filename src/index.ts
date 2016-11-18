import {
    Token
} from 'phosphor/lib/core/token';

import {
    h, VNode
} from 'phosphor/lib/ui/vdom';

import {
    VDomWidget, VDomModel
} from 'jupyterlab/lib/common/vdom';

import {
    ICommandLinker
} from 'jupyterlab/lib/commandlinker';

export
interface IRSLauncher {
}

export
const RS_LAUNCHER_ID = 'org.radiasoft.jupyterlab.launcher';

export
const IRSLauncher = new Token<IRSLauncher>(RS_LAUNCHER_ID);

export
class RSLauncherModel extends VDomModel implements IRSLauncher {
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
        return h.div('hello from radiasoft')
    }

    private _linker: ICommandLinker = null;
}

