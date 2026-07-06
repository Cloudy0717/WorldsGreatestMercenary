/*:
 * @plugindesc v1.0 - Automatically saves when transferring between maps.
 * @author OpenCode
 *
 * @help AutoSave 每次切換地圖時自動儲存到最後一個存檔格（不覆蓋手動存檔）。
 * 可透過插件參數設定自動存檔的欄位編號。
 * 預設使用欄位 4（索引 3），在手動存檔介面中顯示為第 4 格。
 *
 * @param saveSlotId
 * @text 自動存檔欄位
 * @desc 自動存檔使用的欄位編號（0-based）。預設 3 = 第 4 格。
 * @type number
 * @default 3
 *
 * @param notify
 * @text 顯示通知
 * @desc 自動存檔後是否顯示「已自動存檔」訊息。
 * @type boolean
 * @default true
 */

(function() {

    const parameters = PluginManager.parameters('AutoSave');
    const saveSlotId = Number(parameters['saveSlotId'] || 3);
    const showNotify = parameters['notify'] !== 'false';

    // Skip auto-save on first title → menu transition
    let isFirstMap = true;

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        if (isFirstMap) {
            isFirstMap = false;
            return;
        }
        this.autoSave();
    };

    Scene_Map.prototype.autoSave = function() {
        try {
            $gameSystem.onBeforeSave();
            DataManager.saveGame(saveSlotId);
            DataManager.saveGamefileInfo(saveSlotId);
            if (showNotify) {
                this._mapNameWindow && this._mapNameWindow.hide();
                $gameMessage.clear();
                $gameMessage.newPage();
                $gameMessage.add('已自動存檔');
            }
        } catch (e) {
            console.warn('AutoSave failed:', e);
        }
    };

    // Handle event-based transfers (code 201)
    const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function(params) {
        const result = _Game_Interpreter_command201.call(this, params);
        autoSaveDelayed();
        return result;
    };

    function autoSaveDelayed() {
        // Schedule save for next frame (after transfer completes)
        requestAnimationFrame(function() {
            try {
                $gameSystem.onBeforeSave();
                DataManager.saveGame(saveSlotId);
                DataManager.saveGamefileInfo(saveSlotId);
            } catch (e) {
                console.warn('AutoSave failed:', e);
            }
        });
    }

})();
