// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import axios from 'axios';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
            const response = await axios.get(`https://quran-api.santrikoding.com/surah/${surahNumber}`);
            const surah = response.data.data;

            // Format teks untuk ditampilkan
            const ayatTexts = surah.ayahs.map((ayah: any) => `${ayah.number}. ${ayah.text}`).join('\n');

            // Tampilkan di editor atau jendela informasi
            const doc = await vscode.workspace.openTextDocument({ content: ayatTexts, language: 'plaintext' });
            vscode.window.showTextDocument(doc);
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage('Gagal mengambil data dari API!');
        }
    });

    // Menambahkan perintah ke daftar subscriptions
    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
