"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const axios_1 = __importDefault(require("axios"));
const vscode = __importStar(require("vscode"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Daftarkan perintah untuk membaca ayat
    let disposable = vscode.commands.registerCommand('alquran.read', async () => {
        // Meminta input dari pengguna untuk nomor surah
        const surahNumber = await vscode.window.showInputBox({
            placeHolder: 'Masukkan nomor surah (1-114)',
            prompt: 'Contoh: 1 untuk Al-Fatihah'
        });
        if (!surahNumber || isNaN(Number(surahNumber))) {
            vscode.window.showErrorMessage('Nomor surah tidak valid!');
            return;
        }
        try {
            // Memanggil API untuk mendapatkan ayat
            const response = await axios_1.default.get(`https://quran-api.santrikoding.com/surah/${surahNumber}`);
            const surah = response.data.data;
            // Format teks untuk ditampilkan
            const ayatTexts = surah.ayahs.map((ayah) => `${ayah.number}. ${ayah.text}`).join('\n');
            // Tampilkan di editor atau jendela informasi
            const doc = await vscode.workspace.openTextDocument({ content: ayatTexts, language: 'plaintext' });
            vscode.window.showTextDocument(doc);
        }
        catch (error) {
            console.error(error);
            vscode.window.showErrorMessage('Gagal mengambil data dari API!');
        }
    });
    // Menambahkan perintah ke daftar subscriptions
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map