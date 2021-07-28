document.addEventListener('DOMContentLoaded', onchange, false);

function onchange () {
    var envTip = document.createElement('div');
    envTip.id = 'envTip';
    envTip.innerHTML = '我要改标题';
    document.body.appendChild(envTip);
    const envMark = document.getElementById('envTip');
    envMark.style.cssText = `
        position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    pointer-events: none;
    color: red;
    background: rgba(0,0,0,.5);
    font-size: 24px;
    line-height: 48px;
    text-align: center;
    z-index: 9999;
    `;
    document.title = '我要改标题';
    notifyMe('这是通知的标题', options);
}
console.log('ceshj');

function show () {
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
     var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
    new Notification(hour + time[2] + ' ' + period, {
    icon: 'icon.png',
    body: 'Time to make the toast.'
     });
}

function notify(){
    var opt = {
        type: "list",
        title: "桌面提醒",
        message: "msg",
        iconUrl: "icon.png",
        items: [{ title: "1.", message: "下班了"},
            { title: "2.", message: "吃饭了."},
            { title: "3.", message: "中奖了."}]
    }
    chrome.notifications.create('',opt,function(id){
    })
}

var options = {
    dir: "auto", // 文字方向
    body: "通知：OBKoro1评论了你的朋友圈", // 通知主体
    requireInteraction: true, // 不自动关闭通知
    // 通知图标
    icon: "icon.png"
};

function notifyMe(title, options) {
    // 先检查浏览器是否支持
    if (!window.Notification) {
        console.log('浏览器不支持通知');
    } else {
        // 检查用户曾经是否同意接受通知
        console.log(Notification.permission)
        if (Notification.permission === 'granted') {
            var notification = new Notification(title, options); // 显示通知
        } else if (Notification.permission === 'default') {
            // 用户还未选择，可以询问用户是否同意发送通知
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('用户同意授权');
                    var notification = new Notification(title, options); // 显示通知
                } else if (permission === 'default') {
                    console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
                } else {
                    // denied
                    console.log('用户拒绝授权 不能显示通知');
                }
            });
        } else {
            // denied 用户拒绝
            console.log('用户曾经拒绝显示通知');
        }
    }
}