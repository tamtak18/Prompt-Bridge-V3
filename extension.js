const vscode = require('vscode');
const ROO_EXTENSION_ID = 'RooVeterinaryInc.roo-cline';

async function sendToRoo(promptIndex) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    if (!text || text.trim().length === 0) {
        vscode.window.showWarningMessage('テキストを選択してから実行してください．');
        return;
    }
    
    const config = vscode.workspace.getConfiguration('promptBridgeV3');
    const allKeys = Object.keys(config).filter(k => k.startsWith('PB'));
    const sortedKeys = allKeys.sort();
    const targetKey = sortedKeys[promptIndex - 1];
    
    if (!targetKey) {
        vscode.window.showErrorMessage('設定が見つかりません．');
        return;
    }
    
    const customPrompt = config.get(targetKey);
    const finalText = customPrompt + "\n\n" + text;
    await vscode.env.clipboard.writeText(finalText);
    
    try {
        const rooExtension = vscode.extensions.getExtension(ROO_EXTENSION_ID);
        if (!rooExtension) {
            vscode.window.showInformationMessage('Roo Code未検出：コピーしました');
            return;
        }
        if (!rooExtension.isActive) await rooExtension.activate();
        const api = rooExtension.exports;
        if (api && typeof api.sendMessage === 'function') {
            await api.sendMessage(finalText);
            vscode.window.setStatusBarMessage('✓ Roo Codeへ送信完了', 3000);
        }
    } catch (error) {
        vscode.window.showErrorMessage('連携エラー：クリップボードを確認してください．');
    }
}

function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('prompt-bridge-v3.sendToRoo1', () => sendToRoo(1)),
        vscode.commands.registerCommand('prompt-bridge-v3.sendToRoo2', () => sendToRoo(2)),
        vscode.commands.registerCommand('prompt-bridge-v3.sendToRoo3', () => sendToRoo(3))
    );
}

module.exports = { activate, deactivate: () => {} };
