import {
    JupyterLabPlugin, JupyterLab
} from 'jupyterlab/lib/application';

import {
    ICommandPalette
} from 'jupyterlab/lib/commandpalette';

import {
    ICommandLinker
} from 'jupyterlab/lib/commandlinker';


import {
    IRSLauncher, RSLauncherModel, RSLauncherWidget, RS_LAUNCHER_ID
} from './';

import './index.css';

export
const rslaunchProvider: JupyterLabPlugin<IRSLauncher> = {
    id: RS_LAUNCHER_ID,
    activate: activateLauncher,
    requires: [ICommandPalette, ICommandLinker],
    autoStart: true,
    provides: IRSLauncher
}

export default rslaunchProvider;

function activateLauncher(app: JupyterLab, palette: ICommandPalette, linker: ICommandLinker): IRSLauncher {
    let model = new RSLauncherModel();
    let widget = new RSLauncherWidget(linker, model, 'rs-launcher', 'radiasoft');

    app.commands.addCommand('rslauncher:show', {
        label: 'Show RSLauncher',
        execute: () => {
            if (!widget.isAttached) {
                app.shell.addToLeftArea(widget);
            }
            app.shell.activateLeft(widget.id);
        }
    });
    palette.addItem({ command: 'rslauncher:show', category: 'Help' });

    app.shell.addToLeftArea(widget);

    return model;
}
